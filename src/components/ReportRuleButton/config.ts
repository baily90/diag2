import thyroid_jiankang from '@/assets/images/reportRule/thyroid-jiankang.jpg';
import thyroid_difenxian from '@/assets/images/reportRule/thyroid-difenxian.jpg';
import thyroid_zhongfenxian from '@/assets/images/reportRule/thyroid-zhongfenxian.jpg';
import thyroid_gaofenxian from '@/assets/images/reportRule/thyroid-gaofenxian.jpg';

import artery_jiankang from '@/assets/images/reportRule/artery-jiankang.jpg';
import artery_difenxian from '@/assets/images/reportRule/artery-difenxian.jpg';
import artery_zhongfenxian from '@/assets/images/reportRule/artery-zhongfenxian.jpg';
import artery_gaofenxian from '@/assets/images/reportRule/artery-gaofenxian.jpg';

import liverCourage_jiankang from '@/assets/images/reportRule/liverCourage-jiankang.jpg';
import liverCourage_difenxian from '@/assets/images/reportRule/liverCourage-difenxian.jpg';
import liverCourage_zhongfenxian from '@/assets/images/reportRule/liverCourage-zhongfenxian.jpg';
import liverCourage_gaofenxian from '@/assets/images/reportRule/liverCourage-gaofenxian.jpg';

import breast_jiankang from '@/assets/images/reportRule/breast-jiankang.jpg';
import breast_difenxian from '@/assets/images/reportRule/breast-difenxian.jpg';
import breast_zhongfenxian from '@/assets/images/reportRule/breast-zhongfenxian.jpg';
import breast_gaofenxian from '@/assets/images/reportRule/breast-gaofenxian.jpg';

export default [
  {
    tabName: '甲状腺',
    tabKey: 1,
    standards: [
      {
        key: 1,
        values: ['甲状腺弥漫性病变', '不分类', '中风险'],
      },
      {
        key: 2,
        values: ['甲状腺囊肿', 'TI-RADS 2类', '低风险'],
      },
      {
        key: 3,
        values: ['甲状腺实性/混合性结节', 'TI-RADS 3类', '<=20mm 低风险'],
      },
      {
        key: 4,
        values: ['甲状腺实性/混合性结节', 'TI-RADS 3类', '>20mm 中风险'],
      },
      {
        key: 5,
        values: ['甲状腺恶性结节', 'TI-RADS 4类', '高风险'],
      },
    ],
    templates: [
      {
        tabName: '健康',
        tabKey: 1,
        templateImg: thyroid_jiankang,
      },
      {
        tabName: '低风险',
        tabKey: 2,
        templateImg: thyroid_difenxian,
      },
      {
        tabName: '中风险',
        tabKey: 3,
        templateImg: thyroid_zhongfenxian,
      },
      {
        tabName: '高风险',
        tabKey: 4,
        templateImg: thyroid_gaofenxian,
      },
    ],
  },
  {
    tabName: '颈动脉',
    tabKey: 2,
    standards: [
      {
        key: 1,
        values: ['内中膜增厚>1mm', '低风险'],
      },
      {
        key: 2,
        values: ['点状强回声', '低风险'],
      },
      {
        key: 3,
        values: ['斑块长径<=10mm', '低风险'],
      },
      {
        key: 4,
        values: ['斑块长径>10mm', '中风险'],
      },
      {
        key: 5,
        values: ['血管腔狭窄率>50%', '高风险'],
      },
    ],
    templates: [
      {
        tabName: '健康',
        tabKey: 1,
        templateImg: artery_jiankang,
      },
      {
        tabName: '低风险',
        tabKey: 2,
        templateImg: artery_difenxian,
      },
      {
        tabName: '中风险',
        tabKey: 3,
        templateImg: artery_zhongfenxian,
      },
      {
        tabName: '高风险',
        tabKey: 4,
        templateImg: artery_gaofenxian,
      },
    ],
  },
  {
    tabName: '肝脏',
    tabKey: 3,
    standards: [
      {
        key: 1,
        values: ['①肝区近场回声弥漫性增强，远场回声衰减'],
      },
      {
        key: 2,
        values: ['②肝内管道结构显示不清'],
      },
      {
        key: 3,
        values: ['③肝脏轻中度肿大，边缘圆钝'],
      },
      {
        key: 4,
        values: ['④血流不易显示，但肝内血管走行正常'],
      },
      {
        key: 5,
        values: ['⑤肝右叶包膜及横膈显示不清'],
      },
      {
        key: 6,
        values: ['具备第1项及2~4中一项---轻度脂肪肝'],
      },
      {
        key: 7,
        values: ['具备第1项及2~4中两项---中度脂肪肝'],
      },
      {
        key: 8,
        values: ['具备第1项及2~4中两项和第5项---重度脂肪肝'],
      },
    ],
    templates: [
      {
        tabName: '健康',
        tabKey: 1,
        templateImg: liverCourage_jiankang,
      },
      {
        tabName: '低风险',
        tabKey: 2,
        templateImg: liverCourage_difenxian,
      },
      {
        tabName: '中风险',
        tabKey: 3,
        templateImg: liverCourage_zhongfenxian,
      },
      {
        tabName: '高风险',
        tabKey: 4,
        templateImg: liverCourage_gaofenxian,
      },
    ],
  },
  {
    tabName: '乳腺',
    tabKey: 4,
    standards: [
      {
        key: 1,
        values: ['「健康」正常乳腺'],
      },
      {
        key: 2,
        values: ['「低风险」乳腺增生，乳腺结节，<10mm，良性'],
      },
      {
        key: 3,
        values: ['「中风险」乳腺结节，≥10mm，良性'],
      },
      {
        key: 4,
        values: ['「高风险」乳腺结节，恶性风险'],
      },
      {
        key: 5,
        values: ['注意：良恶性均由诊断医生根据影像判定'],
      },
    ],
    templates: [
      {
        tabName: '健康',
        tabKey: 1,
        templateImg: breast_jiankang,
      },
      {
        tabName: '低风险',
        tabKey: 2,
        templateImg: breast_difenxian,
      },
      {
        tabName: '中风险',
        tabKey: 3,
        templateImg: breast_zhongfenxian,
      },
      {
        tabName: '高风险',
        tabKey: 4,
        templateImg: breast_gaofenxian,
      },
    ],
  },
  {
    tabName: '肠系膜淋巴结',
    tabKey: 5,
    standards: [
      {
        key: 1,
        values: ['「健康」肠系膜未见淋巴结'],
      },
      {
        key: 2,
        values: ['「低风险」肠系膜淋巴结', '长径≤10mm', '淋巴结可见'],
      },
      {
        key: 3,
        values: ['「中风险」肠系膜淋巴结', '长径>10mm', '淋巴结肿大'],
      },
      {
        key: 4,
        values: ['「高风险」转移性淋巴结'],
      },
    ],
  },
];
