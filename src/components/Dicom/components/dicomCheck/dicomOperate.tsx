import {
  Button, Dropdown, Menu, message, Space, Spin, Tooltip,
} from 'antd';
import { ColumnHeightOutlined, ClearOutlined } from '@ant-design/icons';
import React, {
  Dispatch,
  FormEvent,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  memo,
} from 'react';
import clone from 'lodash/clone';
import html2canvas from 'html2canvas';
import { useDispatch, useSelector } from 'react-redux';
import { saveImageToOss } from '@/utils/oss';
import { useCheckImageContext } from '../../context/checkImageProvider';
import { RootState } from '@/store';
import { updateState } from '@/store/reducers/reportReducer';

const ButtonJsx = ({
  activeMode,
  modeType,
  children,
  onClickImpl,
  dataMode,
  icon,
  keyDownImpl,
  isDisableMeasured,
}: {
  activeMode: string;
  onClickImpl: (e: unknown) => void;
  modeType: Array<string>;
  children: ReactNode;
  dataMode?: string;
  icon?: ReactNode;
  isDisableMeasured: boolean;
  keyDownImpl: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  const color = isDisableMeasured ? '#ccc' : '#299bff';
  const defaultValue = isDisableMeasured ? 0.25 : 0.85;
  return (
    <Button
      disabled={isDisableMeasured}
      onKeyDown={keyDownImpl}
      icon={icon}
      data-mode={dataMode}
      style={{
        border: modeType.includes(activeMode)
          ? `1px solid ${color}`
          : '1px solid #d9d9d9',
        color: modeType.includes(activeMode)
          ? color
          : `rgba(0, 0, 0, ${defaultValue})`,
      }}
      onClick={onClickImpl}
    >
      {children}
    </Button>
  );
};

const DicomOperate = ({
  activeMode,
  setPlayImpl,
  setActiveMode,
  disabled,
  onReset,
  isDisableMeasured,
}: {
  isDisableMeasured: boolean;
  activeMode: string;
  onSwitch: (event: any) => void;
  setActiveMode: Dispatch<string>;
  toolsName: MutableRefObject<Array<string>>;
  disabled: boolean;
  onReset: () => void;
  setPlayImpl: Dispatch<number>;
}) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState('');
  const [tagDes, setTagDes] = useState('');

  const {
    sources,
    scan_comment,
    mesareicTemplateData,
    body_region_id,
  } = useSelector((state: RootState) => state.report);
  const dispatch = useDispatch();

  const { activedDicomId } = useCheckImageContext();

  // ??????????????????
  const getScanTags = (scan_comment: any) => {
    const { tags } = scan_comment;
    let text = '';
    if (tags && tags.length) {
      tags.map((item: any) => {
        if (text) text += ',';
        text += item.tag_name;
      });
    }
    return text;
  };

  // ??????????????????
  const getScanDes = (scan_comment: any) => {
    const { title, tag_des } = scan_comment;
    let text = '';
    if (title && tag_des) {
      text = `${title}???${tag_des}`;
    }
    return text;
  };

  useEffect(() => {
    if (scan_comment) {
      setTags(getScanTags(scan_comment));
      setTagDes(getScanDes(scan_comment));
    }
  }, [scan_comment]);

  const onScreenShot = async () => {
    setPlayImpl(0);
    setLoading(true);
    const canvas: HTMLCanvasElement = await html2canvas(
      document.querySelector('.actived .layerContainer') as HTMLElement,
    );

    const imgBase64 = canvas.toDataURL({ format: 'png' });

    saveImageToOss(imgBase64, (res) => {
      const currentSource = sources.filter((item) => {
        if (item.id === activedDicomId) {
          return item;
        }
      })?.[0];
      let source = {};
      if (currentSource) {
        source = { ...currentSource };
      }

      source = {
        ...source,
        id: new Date().getTime(),
        parent_id: currentSource?.id,
        mm_per_pixel: 0,
        source_type: 1,
        source_url: res,
        source_url_snapshot: res,
        littleImg: res,
        isScreenShot: true,
      };
      dispatch(updateState({ sources: [...sources, source] }));

      setLoading(false);
      message.success('????????????');
    });
  };

  const onClickImpl = useCallback(
    (e) => {
      const button = e.target.closest('button');
      setActiveMode(button.dataset.mode);
    },
    [setActiveMode],
  );

  const keyDownImpl = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const selectTemplateHandler = (key: number) => {
    const temp = mesareicTemplateData.map((item) => {
      const obj = clone(item);
      obj.selected = false;
      if (key === obj.key) {
        obj.selected = true;
      }
      return obj;
    });
    dispatch(updateState({ mesareicTemplateData: temp }));
  };

  const getTemplateMenu = () => (
    <Menu style={{ width: 300 }}>
      {mesareicTemplateData?.map((item: any) => (
        <Menu.Item
          key={item.key}
          className="drowDownMenu"
          onClick={() => selectTemplateHandler(item.key)}
        >
          {item.title}
          <Button type="link">??????</Button>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Space>
      <ButtonJsx
        isDisableMeasured={isDisableMeasured}
        dataMode={activeMode === 'Draw' ? 'ZoomAndPan' : 'Draw'}
        icon={activeMode === 'Draw' ? <ColumnHeightOutlined /> : ''}
        activeMode={activeMode}
        keyDownImpl={keyDownImpl}
        onClickImpl={onClickImpl}
        modeType={['ZoomAndPan', 'Draw', 'WindowLevel']}
      >
        {activeMode === 'Draw' ? '????????????' : '??????'}
      </ButtonJsx>
      <Spin spinning={loading}>
        <Button
          disabled={disabled}
          onKeyDown={keyDownImpl}
          onClick={onScreenShot}
        >
          ??????
        </Button>
      </Spin>
      <Button
        icon={<ClearOutlined />}
        onClick={onReset}
        onKeyDown={keyDownImpl}
      >
        ??????
      </Button>

      {/* ????????????????????????????????? */}
      {!disabled && tags && (
        <div className="message">
          <Tooltip placement="top" title={tagDes}>
            <Button type="dashed">
              <div className="tags">
                ?????????
                {tags}
              </div>
            </Button>
          </Tooltip>
        </div>
      )}
      {!disabled && body_region_id === 7 && (
      <div style={{ marginLeft: '7%' }}>
        <Dropdown overlay={getTemplateMenu()} trigger={['click']}>
          <Button type="dashed">????????????</Button>
        </Dropdown>
      </div>
      )}
    </Space>
  );
};

export default memo(DicomOperate);
