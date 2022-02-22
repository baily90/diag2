import React from 'react';
import isUndefined from 'lodash/isUndefined';

import {
  caInner,
  caInnerSurface,
  caInnerSound,
  caPipeSound,
  caPlaqueSound,
  caPlaqueLose,
  specialList,
  IsShow,
} from '@/constants/carotidArteryOptions';

import '../index.less';

interface CaroTidTempletePreviewProps {
  templateData: any;
}

const CaroTidTempletePreview: React.FC<CaroTidTempletePreviewProps> = (
  props,
) => {
  const { templateData } = props;
  const {
    tabs: { left, right },
    remark,
  } = templateData;

  // 甲状腺
  const LineElemet = (pm: {
    name: string;
    list?: DEFINE.radioListTypes[];
    label?: string;
  }): React.ReactNode => {
    const { name, list, label } = pm;

    if (Object.keys(left).length === 0 && Object.keys(right).length === 0) {
      return null;
    }

    // 特殊展示 斑块大小
    if (name === 'patch_size_long/patch_size_thick') {
      const [left_p_s_l, right_p_s_l, left_p_s_t, right_p_s_t] = [
        left.patch_size_long,
        right.patch_size_long,
        left.patch_size_thick,
        right.patch_size_thick,
      ];

      const IsShow = isUndefined(left_p_s_l)
        && isUndefined(right_p_s_l)
        && isUndefined(left_p_s_t)
        && isUndefined(right_p_s_t);

      const [txt_1] = ['大者'];

      return (
        <div className="line">
          {!IsShow && (
            <>
              <ul>
                <li>{label}</li>
                <li>
                  {`${left.luminal_patch === 3 && left_p_s_l ? txt_1 : ''}`}
                  {left_p_s_l && '约长'}
                  {left_p_s_l}
                  {left_p_s_l && ' mm'}
                </li>
                <li>
                  {`${
                    right.luminal_patch === 3 && right_p_s_l ? txt_1 : ''
                  }`}
                  {right_p_s_l && '约长'}
                  {right_p_s_l}
                  {right_p_s_l && ' mm'}
                </li>
              </ul>
              <ul>
                <li />
                <li>
                  {left_p_s_t && '厚'}
                  {left_p_s_t}
                  {left_p_s_t && ' mm'}
                </li>
                <li>
                  {right_p_s_t && '厚'}
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

    if (specialList.some((s: any) => s.name === name)) {
      const unit = specialList.find((s: any) => s.name === name)?.unit;
      if (!left[name] && !right[name]) {
        return null;
      }

      return (
        <div className="line">
          <ul>
            <li>{label}</li>
            <li>
              {left[name]}
              {left[name] ? unit : ''}
            </li>
            <li>
              {right[name]}
              {right[name] ? unit : ''}
            </li>
          </ul>
        </div>
      );
    }

    const havShow: string[] = ['显示', '未显示'];

    // 都为未显示字段
    if (l_label === havShow[0] && r_label === havShow[0]) {
      return null;
    }

    return (
      <div className="line">
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
      <div className="line">
        <ul>
          <li />
          <li>左侧</li>
          <li>右侧</li>
        </ul>
      </div>
      {LineElemet({
        name: 'not_show',
        list: IsShow,
      })}
      {LineElemet({
        name: 'inside_diameter',
        list: caInner,
        label: '内径',
      })}
      {LineElemet({
        name: 'intimal_surface',
        list: caInnerSurface,
        label: '内膜表面',
      })}
      {LineElemet({
        name: 'intimal_thickness',
        label: '内中膜厚度',
      })}
      {LineElemet({
        name: 'intimal_echoes',
        list: caInnerSound,
        label: '内中膜回声',
      })}
      {LineElemet({
        name: 'luminal_patch',
        list: caPipeSound,
        label: '管腔斑块',
      })}
      {LineElemet({
        name: 'patch_size_long/patch_size_thick',
        label: '斑块大小',
      })}
      {LineElemet({
        name: 'patch_echoes',
        list: caPlaqueSound,
        label: '斑块回声',
      })}
      {LineElemet({
        name: 'blood_flow',
        list: caPlaqueLose,
        label: '血流信号',
      })}
      {LineElemet({
        name: 'peak_systolic_velocity',
        label: '收缩期峰值流速',
      })}
      {LineElemet({
        name: 'pulsatility_index',
        label: '搏动指数',
      })}
      {LineElemet({
        name: 'resistance_index',
        label: '阻力指数',
      })}
      {LineElemet({
        name: 'heart_rate',
        label: '心率',
      })}
      {remark?.length > 0 && (
      <div>
        注：
        {remark}
      </div>
      )}
    </>
  );
};

export default CaroTidTempletePreview;
