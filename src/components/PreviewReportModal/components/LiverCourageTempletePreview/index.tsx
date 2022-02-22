import React from 'react';
import isUndefined from 'lodash/isUndefined';

import {
  lcSize,
  lcSound,
  lcSoundEven,
  lcPipe,
  lcFilm,
  lcBold,
  lcLiquid,
  lcFocus,
  lcFocusNum,
  lcEcho,
  lcForm,
  lcBorder,
  lcAfterSound,
  lcIsShow,
} from '@/constants/liverCourageOptions';

import styles from '../index.less';

interface LiverCourageTempletePreviewProps {
  templateData: DEFINE.GlobalTyps;
}

const LiverCourageTempletePreview: React.FC<LiverCourageTempletePreviewProps> = (
  props,
) => {
  const { templateData } = props;

  const {
    tabs: { left, right },
    liver_remark,
  } = templateData;

  const LineElemet = (pm: {
    name: string;
    list?: DEFINE.radioListTypes[];
    label?: string;
  }): React.ReactNode => {
    const { name, list, label } = pm;
    if (Object.keys(left).length === 0 && Object.keys(right).length === 0) {
      return null;
    }

    // 特殊展示 结节大小
    if (name === 'focus_size_x/focus_size_y') {
      const [left_p_s_l, right_p_s_l, left_p_s_t, right_p_s_t] = [
        left.focus_size_x,
        right.focus_size_x,
        left.focus_size_y,
        right.focus_size_y,
      ];

      const IsShow = isUndefined(left_p_s_l)
        && isUndefined(right_p_s_l)
        && isUndefined(left_p_s_t)
        && isUndefined(right_p_s_t);

      const [txt_1] = ['大者'];

      return (
        <div className={styles.line}>
          {!IsShow && (
            <>
              <ul>
                <li>{label}</li>
                <li>
                  {`${left.focus_num === 2 && left_p_s_l ? txt_1 : ''}`}
                  {left_p_s_l && '约长'}
                  {left_p_s_l}
                  {left_p_s_l && ' mm'}
                </li>
                <li>
                  {`${right.focus_num === 2 && right_p_s_l ? txt_1 : ''}`}
                  {right_p_s_l && '约长'}
                  {right_p_s_l}
                  {right_p_s_l && ' mm'}
                </li>
              </ul>
              <ul>
                <li />
                <li>
                  {left_p_s_t && '宽'}
                  {left_p_s_t}
                  {left_p_s_t && ' mm'}
                </li>
                <li>
                  {right_p_s_t && '宽'}
                  {right_p_s_t}
                  {right_p_s_t && ' mm'}
                </li>
              </ul>
            </>
          )}
        </div>
      );
    }

    const l_label = Array.isArray(list)
      && list.find((s: any) => s.value === left[name])?.label;

    const r_label = Array.isArray(list)
      && list.find((s: any) => s.value === right[name])?.label;

    const IsShow = isUndefined(l_label) && isUndefined(r_label);

    const havShow: string[] = ['显示', '未显示'];

    // 都为未显示字段
    if (l_label === havShow[0] && r_label === havShow[0]) {
      return null;
    }

    return (
      <div className={styles.line}>
        {!IsShow && (
          <ul>
            <li>{label || ''}</li>
            <li>{l_label === havShow[0] ? '' : l_label}</li>
            <li>{r_label === havShow[0] ? '' : r_label}</li>
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.line}>
        <ul>
          <li />
          <li>左叶</li>
          <li>右叶</li>
        </ul>
      </div>
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
        list: lcSound,
        label: '回声',
      })}
      {LineElemet({
        name: 'echo_uniformity',
        list: lcSoundEven,
        label: '回声均匀性',
      })}
      {LineElemet({
        name: 'intrahepatic_duct',
        list: lcPipe,
        label: '肝内管道',
      })}
      {LineElemet({
        name: 'liver_capsule',
        list: lcFilm,
        label: '肝包膜',
      })}
      {LineElemet({
        name: 'intrahepatic_blood_flow',
        list: lcBold,
        label: '肝内血流',
      })}
      {LineElemet({
        name: 'perihepatic_effusion',
        list: lcLiquid,
        label: '肝周积液',
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
        list: lcEcho,
        label: '病灶回声',
      })}
      {LineElemet({
        name: 'focus_form',
        list: lcForm,
        label: '病灶形态',
      })}
      {LineElemet({
        name: 'focus_boundary',
        list: lcBorder,
        label: '病灶边界',
      })}
      {LineElemet({
        name: 'back_echo',
        list: lcAfterSound,
        label: '后方回声',
      })}
      {liver_remark && liver_remark?.length > 0 && (
        <div>
          注：
          {liver_remark}
        </div>
      )}
    </>
  );
};

export default LiverCourageTempletePreview;
