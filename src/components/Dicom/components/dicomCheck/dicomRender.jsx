import {
  useRef, useState, useEffect, useCallback, memo,
} from 'react';
import dwv from 'dwv-sz';
import { Spin, message, Progress } from 'antd';
import { isEmpty } from 'lodash';
import SliderControl from './SliderControl';
import DicomOperate from './dicomOperate';
import PlayAndParse from './playAndParse';
import { useRecordDicomPaint } from '../../context/recordDicomPaint';

dwv.gui.getElement = dwv.gui.base.getElement;

// Image decoders (for web workers)
dwv.image.decoderScripts = {
  jpeg2000: '/ass/dwv/decoders/pdfjs/decode-jpeg2000.js',
  'jpeg-lossless': '/ass/dwv/decoders/rii-mango/decode-jpegloss.js',
  'jpeg-baseline': '/ass/dwv/decoders/pdfjs/decode-jpegbaseline.js',
  rle: '/ass/dwv/decoders/dwv/decode-rle.js',
};

const DicomRender = ({
  url,
  id,
  disabled,
  index,
  loadSuccess,
  devicePixelRatio,
  isShow,
  ext,
  markData,
}) => {
  const animationId = useRef(0); // 动画Id
  const scale = useRef(1); // 显示比例
  const canvasStyle = useRef(null); // 获取canvas对象
  const tools = useRef({
    Scroll: {},
    ZoomAndPan: {},
    WindowLevel: {},
    Draw: {
      options: ['Ruler'],
      type: 'factory',
      events: ['drawcreate', 'drawchange', 'drawmove', 'drawdelete'],
    },
  }); // 设置dcm配置
  const toolsName = useRef([]); // dcm文件所有模式
  const activedFrame = useRef(null); // 正在活动画布对象
  const dwvApp = useRef(null); // 当前dcm对象

  const [activeMode, setActiveMode] = useState(''); // 活动dcm模式
  const [isPlay, setPlayStatus] = useState(0); // 是否在播放
  const [currentFrame, setCurrentFrame] = useState(0); // 正在活动画布对象当前帧
  const [numberOfFrames, setNumberOfFrames] = useState(0); // dcm总帧数
  const [scrollValue, setScrollValue] = useState(100); // 显示比例
  const [loadProgress, setLoadProgress] = useState(0); // 加载进度
  const [marks, setMarks] = useState({}); // 某些帧被校正测量过
  const prevMarksLength = useRef(0); // 标记的数量
  const [loadStatus, setLoadStatus] = useState('active'); // 加载dcm文件的状态

  const { setRecordDicoms } = useRecordDicomPaint(); // 诊断报告记录标记， 查看报告查看记录
  const [recordMarks, setRecordMarks] = useState(0);
  // 加载进度配置加载显示加载状态
  useEffect(() => {
    setLoadStatus(loadProgress === 100 ? 'success' : 'active');
    if (loadProgress === 100) {
      // 编辑状态
      const dicomState = new dwv.State();
      if (!disabled && devicePixelRatio > 0) {
        setRecordDicoms((prev) => {
          prev[index] = {
            app: dwvApp.current,
            dicomState,
          };
          return prev;
        });
      }
      // 查看状态
      if (disabled && devicePixelRatio > 0 && !isEmpty(markData)) {
        dicomState.apply(dwvApp.current, JSON.parse(markData));
        setRecordMarks(1);
      }
    }
  }, [loadProgress]);

  useEffect(() => {
    if (isShow) {
      document.addEventListener('keydown', keyDownImpl, false);
    }
    return () => document.removeEventListener('keydown', keyDownImpl, false);
  });

  useEffect(() => {
    if (dwvApp.current) {
      const draws = dwvApp.current.getDrawDisplayDetails();
      // 当前绘制条数没有变化，没有改编mark状态
      if (draws.length === prevMarksLength.current) return;
      prevMarksLength.current = draws.length;

      const marksObj = {};
      draws.forEach(({ frame }) => {
        marksObj[frame] = marksObj[frame] ? marksObj[frame] + 1 : 1;
      });
      setMarks(marksObj);
    }
  }, [currentFrame, recordMarks]);

  // dcm文件变化初始化
  useEffect(() => {
    // create app
    const app = new dwv.App();
    // initialise app
    app.init({
      containerDivId: `dwv${id}`,
      tools: tools.current,
    });
    dwvApp.current = app;

    let nReceivedError = null;
    let nReceivedAbort = null;

    // 显示比例事件
    app.addEventListener('zoomchange', (event) => {
      const { value } = event;
      const num = (value[0] / scale.current) * 100;
      setScrollValue(num);
    });

    // 进度变化事件
    app.addEventListener('loadprogress', (event) => {
      setLoadProgress(event.loaded);
    });

    // 失败事件
    app.addEventListener('error', (event) => {
      console.error(event.error);
      ++nReceivedError;
    });

    // 终止事件
    app.addEventListener('abort', (event) => {
      ++nReceivedAbort;
    });

    // 加载完成事件
    app.addEventListener('loadend', (/* event */) => {
      if (nReceivedError > 2) {
        setLoadStatus('exception');
        message.error('Received errors during load. Check log for details.');
      }
      if (nReceivedAbort > 2) {
        message.error('Load was aborted.');
        setLoadStatus('exception');
      }
    });

    // 加载过程中事件回调
    function loadImplement(/* event */) {
      // available tools
      const names = [];
      for (const key in tools.current) {
        if (
          (key === 'Scroll' && app.canScroll())
          || (key === 'WindowLevel' && app.canWindowLevel())
          || (key !== 'Scroll' && key !== 'WindowLevel')
        ) {
          names.push(key);
        }
      }
      // 设置画布对象
      const canvas = document
        .querySelectorAll('.dicom-container .renderItem')
        [index].querySelector('canvas');
      canvasStyle.current = {
        x: canvas.width / 2,
        y: canvas.height / 2,
      };
      // 获取所有
      setNumberOfFrames(app.getImage().getNumberOfFrames());
      activedFrame.current = app
        .getLayerController()
        .getActiveViewLayer()
        .getViewController();
      scale.current = app.getLayerController().getScale().x;

      // 设置所有的功能模块
      toolsName.current = names;
      // 设置当前默认模式
      setActiveMode(names[0]);
      // onChangeTool(names[0]);
      // dcm 根据容器大小显示
      app.fitToContainer();
      // 加载下一个
      loadSuccess(index + 1);
    }
    app.addEventListener('load', loadImplement);
    // window.addEventListener('resize', app.onResize)
    // set data loaded flag
    app.loadURLs([url], {
      devicePixelRatio,
      ext,
    });
    return () => {
      app.removeEventListener('load', loadImplement);
    };
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    if (isPlay === 0) {
      // 暂停播放
      cancelAnimationFrame(animationId.current);
    } else {
      // 开始播放
      onStepAction(0);
    }
  }, [isPlay]);

  /**
   * 当前播放切换到另一个dcm文件
   * 暂停播放，重置播放按钮状态
   */
  useEffect(() => {
    if (!isShow && isPlay === 1) {
      setPlayStatus(0);
      cancelAnimationFrame(animationId.current);
    }
  }, [isShow]);

  useEffect(() => {
    const onChangeTool = (tool) => {
      // Dcm 对象存在及获取到一个模式
      if (dwvApp.current && activeMode) {
        dwvApp.current.setTool(tool);

        // activeMode 切换到绘制模式
        if (tool === 'Draw') {
          onChangeShape(tools.current.Draw.options[0]);
        }

        // activeMode 切换到非播放模式
        if (tool !== 'Scroll') {
          setPlayStatus(0);
        }
      }
    };
    onChangeTool(activeMode);
  }, [activeMode]);

  // 鼠标按下模式从播放 => 缩放
  const mouseDownImpl = () => {
    if (activeMode === 'Scroll') {
      cancelAnimationFrame(animationId.current);
      setActiveMode('ZoomAndPan');
    }
  };

  const keyDownImpl = (e) => {
    if (e.keyCode !== 32) return;
    if (numberOfFrames < 1) {
      // 不做任何处理
    } else if (currentFrame === numberOfFrames) {
      // 重播
      onResetPlay();
    } else {
      // 播放或者暂停
      onPlay();
    }
  };

  const wheelImpl = () => {
    if (activeMode === 'Scroll' && isPlay === 1) {
      setCurrentFrame(activedFrame.current.getCurrentFrame() + 1);
    } else {
      setActiveMode('ZoomAndPan');
    }
  };

  // 默认绘制：Ruler
  const onChangeShape = (shape) => {
    if (dwvApp.current) {
      dwvApp.current.setDrawShape(shape);
    }
  };

  /**
   * 重置
   * 未播放状态
   * 重置显示图层 / 比例
   * 删除绘制标注及marks
   */
  const onReset = useCallback(() => {
    if (dwvApp.current) {
      setMarks({});
      setPlayStatus(0);
      dwvApp.current.deleteDraws();
      dwvApp.current.resetZoom();
      setScrollValue(100);
    }
  }, [isPlay]);

  const onChangeValue = (value) => {
    // 设置为放大缩小模式
    setActiveMode('ZoomAndPan');

    const i = parseInt((scale.current - 0.1) * 10) / 100;
    const num = scrollValue < value ? i : -i;
    dwvApp.current.getLayerController().addScale(num, canvasStyle.current);
    dwvApp.current.render();
  };

  const onPlay = useCallback(() => {
    cancelAnimationFrame(animationId.current);
    // 设置播放器 显示播放 / 暂停
    setPlayStatus((prev) => (prev === 0 ? 1 : 0));
    // 设置为DiCOM模式
    setActiveMode('Scroll');
  }, [isPlay, activeMode]);

  /**
   * 重播
   * 恢复到播放模式
   * 当前帧切到0
   * 开始动画方法调用
   */
  const onResetPlay = useCallback(() => {
    setActiveMode('Scroll');
    setPlayStatus(1);
    activedFrame.current.setCurrentFrame(0);
  }, [isPlay, activeMode]);

  /**
   * 手工改播放进度
   * 暂停播放
   * 设置播放进度
   */
  const onChangeFrame = (e) => {
    cancelAnimationFrame(animationId.current);
    setPlayStatus(0);
    activedFrame.current.setCurrentFrame(e);
    setCurrentFrame(e);
  };

  const onStepAction = (num) => {
    ++num;
    let currentFrameValue = activedFrame.current.getCurrentFrame();
    if (num === 7) {
      num = 0;
      currentFrameValue = activedFrame.current.getCurrentFrame() + 1;
      setCurrentFrame(currentFrameValue);
      activedFrame.current.incrementFrameNb();
    }

    if (numberOfFrames > currentFrameValue) {
      cancelAnimationFrame(animationId.current);
      animationId.current = requestAnimationFrame(onStepAction.bind(null, num));
    } else {
      setPlayStatus(0);
    }
  };

  return (
    <Spin
      tip={loadProgress}
      spinning={isShow && ['active'].includes(loadStatus)}
    >
      <div className="renderInner">
        <div className="mainView">
          <div className="operate">
            {isShow && (
              <DicomOperate
                isDisableMeasured={[0, '0'].includes(devicePixelRatio)}
                setPlayImpl={setPlayStatus}
                activeMode={activeMode}
                setActiveMode={setActiveMode}
                toolsName={toolsName}
                disabled={disabled}
                onReset={onReset}
              />
            )}
          </div>
          {loadStatus !== 'success' && isShow ? (
            <Progress percent={loadProgress} status={loadStatus} />
          ) : null}
          <div
            tabIndex="1"
            onMouseDown={mouseDownImpl}
            onWheel={wheelImpl}
            id={`dwv${id}`}
            className="dwvContainer"
          >
            <div className="layerContainer" />
          </div>
        </div>
        {isShow && (
          <SliderControl
            onChangeValue={onChangeValue}
            scrollValue={scrollValue}
          />
        )}
      </div>
      {isShow && (
        <PlayAndParse
          marks={marks}
          numberOfFrames={numberOfFrames}
          isPlay={isPlay}
          currentFrame={currentFrame}
          onResetPlay={onResetPlay}
          onPlay={onPlay}
          onChangeFrame={onChangeFrame}
        />
      )}
    </Spin>
  );
};

export default memo(DicomRender);
