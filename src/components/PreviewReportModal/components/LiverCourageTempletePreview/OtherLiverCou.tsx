import React from 'react';
import isUndefined from 'lodash/isUndefined';

import {
  lcIsShow,
  lcSize,
  lcFocus,
  lcFocusNum,
  courageSound,
  couGalWall,
  couAfterBackSound,
  couAfterSound,
} from '@/constants/liverCourageOptions';

import styles from '../index.less';

interface OtherLiverCouProps {
  templateData: DEFINE.GlobalTyps;
}

const OtherLiverCou: React.FC<OtherLiverCouProps> = (props) => {
  const { templateData } = props;
  const {
    tabs: { gallbladder },
    gallbladder_remark,
  } = templateData;

  // 胆囊
  const LineElemet = (pm: {
    name: string;
    list?: DEFINE.radioListTypes[];
    label?: string;
  }): React.ReactNode => {
    const { name, list, label } = pm;
    if (Object.keys(gallbladder).length === 0) {
      return null;
    }

    const abel = Array.isArray(list)
      && list.find((s: any) => s.value === gallbladder[name])?.label;

    if (name === 'gall_wall_thickness') {
      return (
        <div className={styles.line}>
          {!isUndefined(gallbladder[name]) && (
            <ul>
              <li>{label}</li>
              <li>
                {gallbladder[name]}
                mm
              </li>
              <li />
            </ul>
          )}
        </div>
      );
    }

    // 特殊展示 结节大小
    if (name === 'focus_size_x/focus_size_y') {
      const [isthmus_f_s_x, isthmus_f_s_y] = [
        gallbladder.focus_size_x,
        gallbladder.focus_size_y,
      ];

      const IsShow = isUndefined(isthmus_f_s_x) && isUndefined(isthmus_f_s_y);
      return (
        <div className={styles.line}>
          {!IsShow && (
            <ul>
              <li>{label}</li>
              <li>
                {gallbladder.focus_num === 2 ? '大者' : ''}
                约长
                {isthmus_f_s_x}
                {isthmus_f_s_x && ' mm'}
                * 宽
                {isthmus_f_s_y}
                {isthmus_f_s_y && ' mm'}
              </li>
              <li />
            </ul>
          )}
        </div>
      );
    }

    const IsShow = isUndefined(abel);

    if (abel === '显示') {
      return null;
    }

    return (
      <div className={styles.line}>
        {!IsShow && (
          <ul>
            <li>{label || ''}</li>
            <li>{abel}</li>
            <li />
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      {LineElemet({
        name: 'not_show',
        list: lcIsShow,
      })}
      {LineElemet({
        name: 'size',
        list: lcSize,
        label: '大小',
      })}
      {LineElemet({
        name: 'echo',
        list: courageSound,
        label: '回声',
      })}
      {LineElemet({
        name: 'gall_wall',
        list: couGalWall,
        label: '胆壁',
      })}
      {LineElemet({
        name: 'gall_wall_thickness',
        label: '胆壁厚度',
      })}
      {LineElemet({
        name: 'exist_focus',
        list: lcFocus,
        label: '有无病灶',
      })}
      {LineElemet({
        name: 'focus_num',
        list: lcFocusNum,
        label: '病灶数目',
      })}
      {LineElemet({
        name: 'focus_size_x/focus_size_y',
        label: '病灶大小',
      })}
      {LineElemet({
        name: 'focus_echo',
        list: couAfterBackSound,
        label: '病灶回声',
      })}
      {LineElemet({
        name: 'back_echo',
        list: couAfterSound,
        label: '后方回声',
      })}
      {gallbladder_remark && gallbladder_remark?.length > 0 && (
        <div>
          注：
          {gallbladder_remark}
        </div>
      )}
    </>
  );
};

export default OtherLiverCou;
