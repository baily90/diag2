import React from 'react';
import isUndefined from 'lodash/isUndefined';

import {
  IsShow,
  glandThickness,
  glandEcho,
  echoUniformity,
  breastDuct,
  isNodule,
  noduleNum,
  noduleCho,
  noduleForm,
  noduleBorder,
  noduleCalcification,
  backEcho,
} from '@/constants/breastOptions';

import styles from '../index.less';

interface BreastTempletePreviewProps {
  templateData: any;
}

const BreastTempletePreview: React.FC<BreastTempletePreviewProps> = (props) => {
  const { templateData } = props;
  const {
    tabs: { left, right },
    remark,
  } = templateData;

  // 乳腺
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
    if (name === 'tuber_size_x/tuber_size_y') {
      const [left_t_s_x, right_t_s_x, left_t_s_y, right_t_s_y] = [
        left.tuber_size_x,
        right.tuber_size_x,
        left.tuber_size_y,
        right.tuber_size_y,
      ];

      const IsShow = isUndefined(left_t_s_x)
        && isUndefined(right_t_s_x)
        && isUndefined(left_t_s_y)
        && isUndefined(right_t_s_y);

      const [txt_1] = ['大者'];

      return (
        <div className={styles.line}>
          {!IsShow && (
            <>
              <ul>
                <li>{label}</li>
                <li>
                  {`${left.tuber_num === 2 && left_t_s_x ? txt_1 : ''}`}
                  {left_t_s_x && '约长'}
                  {left_t_s_x}
                  {left_t_s_x && ' mm'}
                </li>
                <li>
                  {`${right.tuber_num === 2 && right_t_s_x ? txt_1 : ''}`}
                  {right_t_s_x && '约长'}
                  {right_t_s_x}
                  {right_t_s_x && ' mm'}
                </li>
              </ul>
              <ul>
                <li />
                <li>
                  {left_t_s_y && '宽'}
                  {left_t_s_y}
                  {left_t_s_y && ' mm'}
                </li>
                <li>
                  {right_t_s_y && '宽'}
                  {right_t_s_y}
                  {right_t_s_y && ' mm'}
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
          <li>左侧</li>
          <li>右侧</li>
        </ul>
      </div>
      {LineElemet({
        name: 'not_show',
        list: IsShow,
      })}
      {LineElemet({
        name: 'gland_thickness',
        list: glandThickness,
        label: '腺体厚度',
      })}
      {LineElemet({
        name: 'gland_echo',
        list: glandEcho,
        label: '腺体回声',
      })}
      {LineElemet({
        name: 'echo_uniformity',
        list: echoUniformity,
        label: '回声均匀性',
      })}
      {LineElemet({
        name: 'breast_duct',
        list: breastDuct,
        label: '乳腺导管',
      })}
      {LineElemet({
        name: 'exist_tuber',
        list: isNodule,
        label: '有无结节',
      })}
      {LineElemet({
        name: 'tuber_num',
        list: noduleNum,
        label: '结节数目',
      })}
      {LineElemet({
        name: 'tuber_size_x/tuber_size_y',
        label: '结节大小',
      })}
      {LineElemet({
        name: 'tuber_echo',
        list: noduleCho,
        label: '结节回声',
      })}
      {LineElemet({
        name: 'tuber_shape',
        list: noduleForm,
        label: '结节形态',
      })}
      {LineElemet({
        name: 'tuber_edge',
        list: noduleBorder,
        label: '结节边界',
      })}
      {LineElemet({
        name: 'tuber_calcification',
        list: noduleCalcification,
        label: '结节钙化',
      })}
      {LineElemet({
        name: 'back_echo',
        list: backEcho,
        label: '后方回声',
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

export default BreastTempletePreview;
