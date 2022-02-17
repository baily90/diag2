import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Slider } from 'antd';
import { memo } from 'react';
import { SliderMarks } from 'antd/es/slider';

const PlayAndParse = ({
  numberOfFrames,
  onResetPlay,
  isPlay,
  onPlay,
  currentFrame,
  onChangeFrame,
  marks,
}: {
  numberOfFrames: number;
  onResetPlay: () => void;
  isPlay: number;
  marks: SliderMarks;
  onPlay: () => void;
  currentFrame: number;
  onChangeFrame: (e: number) => void;
}) => (
  <>
    {numberOfFrames > 1 ? (
      <div className="mediaControl">
        <div className="buttonOperate">
          {currentFrame === numberOfFrames ? (
            <RedoOutlined
              onClick={onResetPlay}
              style={{ fontSize: 30, color: '#007FFE' }}
            />
          ) : (
            <>
              {isPlay === 0 ? (
                <PlayCircleOutlined
                  onClick={onPlay}
                  style={{ fontSize: 30, color: '#007FFE' }}
                />
              ) : (
                <PauseCircleOutlined
                  onClick={onPlay}
                  style={{ fontSize: 30, color: '#007FFE' }}
                />
              )}
            </>
          )}
        </div>
        <div className="scrollProcess">
          <Slider
            marks={marks}
            step={1}
            onChange={onChangeFrame}
            max={numberOfFrames}
            value={currentFrame}
          />
        </div>
      </div>
    ) : null}
  </>
);

export default memo(PlayAndParse);
