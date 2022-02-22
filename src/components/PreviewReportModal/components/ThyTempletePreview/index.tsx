import React from 'react';
import isUndefined from 'lodash/isUndefined';

import {
  thyroidSize,
  thyroidEcho,
  echoesUniformity,
  existTuber,
  tuberNum,
  tuberEchoes,
  tuberShape,
  tuberEdge,
  tuberCalcification,
} from '@/constants/thyroidOptions';

import styles from '../index.less';

interface ThyTempletePreviewProps {
  templateData: any;
}

const ThyTempletePreview: React.FC<ThyTempletePreviewProps> = (props) => {
  const { templateData } = props;
  const {
    tabs: { left, right, isthmus },
    remark,
  } = templateData;
  console.log(templateData);

  // 甲状腺
  const LineElemet = (pm: {
    name: string;
    list?: DEFINE.radioListTypes[];
    label: string;
  }): React.ReactNode => {
    const { name, list, label } = pm;
    if (
      Object.keys(left).length === 0
      && Object.keys(right).length === 0
      && Object.keys(isthmus).length === 0
    ) {
      return null;
    }

    // 特殊展示 结节大小
    if (name === 'tuber_size_x/tuber_size_y') {
      const IsShow = isUndefined(left.tuber_size_x)
        && isUndefined(right.tuber_size_x)
        && isUndefined(isthmus.tuber_size_x)
        && isUndefined(left.tuber_size_y)
        && isUndefined(right.tuber_size_y)
        && isUndefined(isthmus.tuber_size_y);

      const [txt_1] = ['大者'];

      return (
        <div className={styles.line}>
          {!IsShow && (
            <>
              <ul>
                <li>{label}</li>
                <li>
                  {`${
                    left.tuber_num === 1 && left.tuber_size_x ? txt_1 : ''
                  }`}
                  {left.tuber_size_x && '约横'}
                  {left.tuber_size_x}
                  {left.tuber_size_x && ' mm'}
                </li>
                <li>
                  {`${
                    right.tuber_num === 1 && right.tuber_size_x
                      ? txt_1
                      : ''
                  }`}
                  {right.tuber_size_x && '约横'}
                  {right.tuber_size_x}
                  {right.tuber_size_x && ' mm'}
                </li>
                <li>
                  {`${
                    isthmus.tuber_num === 1 && isthmus.tuber_size_x
                      ? txt_1
                      : ''
                  }`}
                  {isthmus.tuber_size_x && '约横'}
                  {isthmus.tuber_size_x}
                  {isthmus.tuber_size_x && ' mm'}
                </li>
              </ul>
              <ul>
                <li />
                <li>
                  {left.tuber_size_y && '纵'}
                  {left.tuber_size_y}
                  {left.tuber_size_y && ' mm'}
                </li>
                <li>
                  {right.tuber_size_y && '纵'}
                  {right.tuber_size_y}
                  {right.tuber_size_y && ' mm'}
                </li>
                <li>
                  {isthmus.tuber_size_y && '纵'}
                  {isthmus.tuber_size_y}
                  {isthmus.tuber_size_y && ' mm'}
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

    const i_label = Array.isArray(list)
      && list.find((s: any) => s.value === isthmus[name])?.label;

    const IsShow = isUndefined(l_label) && isUndefined(r_label) && isUndefined(i_label);

    return (
      <div className={styles.line}>
        {!IsShow && (
          <ul>
            <li>{label}</li>
            <li>{l_label}</li>
            <li>{r_label}</li>
            <li>{i_label}</li>
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
          <li>峡部</li>
        </ul>
      </div>
      {LineElemet({
        name: 'thyroid_size',
        list: thyroidSize,
        label: '大小',
      })}
      {LineElemet({
        name: 'thyroid_echoes',
        list: thyroidEcho,
        label: '回声',
      })}
      {LineElemet({
        name: 'echoes_uniformity',
        list: echoesUniformity,
        label: '回声均匀性',
      })}
      {LineElemet({
        name: 'exist_tuber',
        list: existTuber,
        label: '有无结节',
      })}
      {LineElemet({
        name: 'tuber_num',
        list: tuberNum,
        label: '结节数目',
      })}
      {LineElemet({
        name: 'tuber_size_x/tuber_size_y',
        label: '结节大小',
      })}
      {LineElemet({
        name: 'tuber_echoes',
        list: tuberEchoes,
        label: '结节回声',
      })}
      {LineElemet({
        name: 'tuber_shape',
        list: tuberShape,
        label: '结节形态',
      })}
      {LineElemet({
        name: 'tuber_edge',
        list: tuberEdge,
        label: '结节边界',
      })}
      {LineElemet({
        name: 'tuber_calcification',
        list: tuberCalcification,
        label: '结节钙化',
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

export default ThyTempletePreview;
