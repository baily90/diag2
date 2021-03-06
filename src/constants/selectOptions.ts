// 甲状腺 未见明显异常
const soundThyNormal: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '51',
    txt: '左侧甲状腺超声检查未见明显异常',
  },
  {
    label: '右侧',
    value: '52',
    txt: '右侧甲状腺超声检查未见明显异常',
  },
  {
    label: '峡部',
    value: '53',
    txt: '峡部甲状腺超声检查未见明显异常',
  },
  {
    label: '双侧',
    value: '54',
    txt: '双侧甲状腺超声检查未见明显异常',
  },
];

// 甲状腺 结节伴钙化
const soundThyAndNodule: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '101',
    txt: '左侧甲状腺结节伴钙化',
  },
  {
    label: '右侧',
    value: '102',
    txt: '右侧甲状腺结节伴钙化',
  },
  {
    label: '峡部',
    value: '103',
    txt: '峡部甲状腺结节伴钙化',
  },
  {
    label: '双侧',
    value: '104',
    txt: '双侧甲状腺结节伴钙化',
  },
];

// 结节 nodule value
const soundThyNodule: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '61',
    txt: '左侧甲状腺结节',
  },
  {
    label: '右侧',
    value: '62',
    txt: '右侧甲状腺结节',
  },
  {
    label: '峡部',
    value: '63',
    txt: '峡部甲状腺结节',
  },
  {
    label: '双侧',
    value: '64',
    txt: '双侧甲状腺结节',
  },
];

// 甲状腺弥漫性病变
const soundThyChange: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '71',
    txt: '左侧甲状腺弥漫性病变，结合甲状腺功能检查',
  },
  {
    label: '右侧',
    value: '72',
    txt: '右侧甲状腺弥漫性病变，结合甲状腺功能检查',
  },
  {
    label: '双侧',
    value: '73',
    txt: '双侧甲状腺弥漫性病变，结合甲状腺功能检查',
  },
];

// 甲状腺肿大
const soundThyBig: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '81',
    txt: '左侧甲状腺肿大',
  },
  {
    label: '右侧',
    value: '82',
    txt: '右侧甲状腺肿大',
  },
  {
    label: '双侧',
    value: '83',
    txt: '双侧甲状腺肿大',
  },
];

// 甲状腺甲状腺钙化灶
const soundThyKit: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '91',
    txt: '左侧甲状腺钙化灶',
  },
  {
    label: '右侧',
    value: '92',
    txt: '右侧甲状腺钙化灶',
  },
  {
    label: '双侧',
    value: '93',
    txt: '双侧甲状腺钙化灶',
  },
];

// 等级
const soundThyLevel: DEFINE.radioListTypes[] = [
  {
    label: 'TI-RADS 2类',
    value: '111',
    txt: 'TI-RADS 2类',
  },
  {
    label: 'TI-RADS 3类',
    value: '112',
    txt: 'TI-RADS 3类',
  },
  {
    label: 'TI-RADS 4类',
    value: '113',
    txt: 'TI-RADS 4类',
  },
];

// 结节、钙化等级合成映射关系，用于预览报告
const soundComplex: DEFINE.radioListTypes[] = [
  {
    label: '',
    value: '120',
    txt: '左侧甲状腺结节TI-RADS 2类',
  },
  {
    label: '',
    value: '121',
    txt: '左侧甲状腺结节TI-RADS 3类',
  },
  {
    label: '',
    value: '122',
    txt: '左侧甲状腺结节TI-RADS 4类',
  },
  {
    label: '',
    value: '123',
    txt: '右侧甲状腺结节TI-RADS 2类',
  },
  {
    label: '',
    value: '124',
    txt: '右侧甲状腺结节TI-RADS 3类',
  },
  {
    label: '',
    value: '125',
    txt: '右侧甲状腺结节TI-RADS 4类',
  },
  {
    label: '',
    value: '126',
    txt: '峡部甲状腺结节TI-RADS 2类',
  },
  {
    label: '',
    value: '127',
    txt: '峡部甲状腺结节TI-RADS 3类',
  },
  {
    label: '',
    value: '128',
    txt: '峡部甲状腺结节TI-RADS 4类',
  },
  {
    label: '',
    value: '129',
    txt: '双侧甲状腺结节TI-RADS 2类',
  },
  {
    label: '',
    value: '130',
    txt: '双侧甲状腺结节TI-RADS 3类',
  },
  {
    label: '',
    value: '131',
    txt: '双侧甲状腺结节TI-RADS 4类',
  },
  {
    label: '',
    value: '140',
    txt: '左侧甲状腺结节伴钙化TI-RADS 2类',
  },
  {
    label: '',
    value: '141',
    txt: '左侧甲状腺结节伴钙化TI-RADS 3类',
  },
  {
    label: '',
    value: '142',
    txt: '左侧甲状腺结节伴钙化TI-RADS 4类',
  },
  {
    label: '',
    value: '143',
    txt: '右侧甲状腺结节伴钙化TI-RADS 2类',
  },
  {
    label: '',
    value: '144',
    txt: '右侧甲状腺结节伴钙化TI-RADS 3类',
  },
  {
    label: '',
    value: '145',
    txt: '右侧甲状腺结节伴钙化TI-RADS 4类',
  },
  {
    label: '',
    value: '146',
    txt: '峡部甲状腺结节伴钙化TI-RADS 2类',
  },
  {
    label: '',
    value: '147',
    txt: '峡部甲状腺结节伴钙化TI-RADS 3类',
  },
  {
    label: '',
    value: '148',
    txt: '峡部甲状腺结节伴钙化TI-RADS 4类',
  },
  {
    label: '',
    value: '149',
    txt: '双侧甲状腺结节伴钙化TI-RADS 2类',
  },
  {
    label: '',
    value: '150',
    txt: '双侧甲状腺结节伴钙化TI-RADS 3类',
  },
  {
    label: '',
    value: '151',
    txt: '双侧甲状腺结节伴钙化TI-RADS 4类',
  },
];

// 颈动脉 未见明显异常
const soundCarNormal: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '61',
    txt: '左侧颈动脉超声检查未见明显异常',
  },
  {
    label: '右侧',
    value: '62',
    txt: '右侧颈动脉超声检查未见明显异常',
  },
  {
    label: '双侧',
    value: '63',
    txt: '双侧颈动脉超声检查未见明显异常',
  },
];

// 颈动脉未显示
// const soundCarIsShow: DEFINE.radioListTypes[] = [
//   {
//     label: '左侧',
//     value: '54',
//     txt: '左侧颈动脉未显示，请结合临床',
//   },
//   {
//     label: '右侧',
//     value: '55',
//     txt: '右侧颈动脉未显示，请结合临床',
//   },
//   {
//     label: '双侧',
//     value: '56',
//     txt: '双侧颈动脉未显示，请结合临床',
//   },
//   {
//     label: '左侧窦部',
//     value: '57',
//     txt: '左侧窦部颈动脉未显示，请结合临床',
//   },
//   {
//     label: '右侧窦部',
//     value: '58',
//     txt: '右侧窦部颈动脉未显示，请结合临床',
//   },
//   {
//     label: '双侧窦部',
//     value: '59',
//     txt: '双侧窦部颈动脉未显示，请结合临床',
//   },
// ];

// 颈动脉内中膜增厚风险
const soundCarFilm: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '81',
    txt: '左侧颈动脉内中膜增厚风险增加',
  },
  {
    label: '右侧',
    value: '82',
    txt: '右侧颈动脉内中膜增厚风险增加',
  },
  {
    label: '双侧',
    value: '83',
    txt: '双侧颈动脉内中膜增厚风险增加',
  },
  {
    label: '左侧窦部',
    value: '84',
    txt: '左侧窦部颈动脉内中膜增厚风险增加',
  },
  {
    label: '右侧窦部',
    value: '85',
    txt: '右侧窦部颈动脉内中膜增厚风险增加',
  },
  {
    label: '双侧窦部',
    value: '86',
    txt: '双侧窦部颈动脉内中膜增厚风险增加',
  },
];

// 颈动脉内中膜增厚
const soundCarFilmGred: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '91',
    txt: '左侧颈动脉内中膜增厚',
  },
  {
    label: '右侧',
    value: '92',
    txt: '右侧颈动脉内中膜增厚',
  },
  {
    label: '双侧',
    value: '93',
    txt: '双侧颈动脉内中膜增厚',
  },
  {
    label: '左侧窦部',
    value: '94',
    txt: '左侧窦部颈动脉内中膜增厚',
  },
  {
    label: '右侧窦部',
    value: '95',
    txt: '右侧窦部颈动脉内中膜增厚',
  },
  {
    label: '双侧窦部',
    value: '96',
    txt: '双侧窦部颈动脉内中膜增厚',
  },
];

// 颈动脉可见斑块
const soundCarPlaQue: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '101',
    txt: '左侧颈动脉可见斑块',
  },
  {
    label: '右侧',
    value: '102',
    txt: '右侧颈动脉可见斑块',
  },
  {
    label: '双侧',
    value: '103',
    txt: '双侧颈动脉可见斑块',
  },
  {
    label: '左侧窦部',
    value: '104',
    txt: '左侧窦部颈动脉可见斑块',
  },
  {
    label: '右侧窦部',
    value: '105',
    txt: '右侧窦部颈动脉可见斑块',
  },
  {
    label: '双侧窦部',
    value: '106',
    txt: '双侧窦部颈动脉可见斑块',
  },
];

// 颈动脉 左右窦部
const soundCarStenosisPart: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '201',
    txt: '左侧颈动脉斑块形成伴局部管腔狭窄',
  },
  {
    label: '右侧',
    value: '202',
    txt: '右侧颈动脉斑块形成伴局部管腔狭窄',
  },
  {
    label: '双侧',
    value: '203',
    txt: '双侧颈动脉斑块形成伴局部管腔狭窄',
  },
  {
    label: '左侧窦部',
    value: '204',
    txt: '左侧窦部颈动脉斑块形成伴局部管腔狭窄',
  },
  {
    label: '右侧窦部',
    value: '205',
    txt: '右侧窦部颈动脉斑块形成伴局部管腔狭窄',
  },
];

// 颈动脉 局部管腔狭窄
const soundCarStenosis: DEFINE.radioListTypes[] = [
  {
    label: '< 50%',
    value: '111',
    txt: '颈动脉斑块形成伴局部管腔狭窄，面积狭窄率约 < 50%',
  },
  {
    label: '50%-69%',
    value: '112',
    txt: '颈动脉斑块形成伴局部管腔狭窄，面积狭窄率约 50%-69%',
  },
  {
    label: '70%-99%',
    value: '113',
    txt: '颈动脉斑块形成伴局部管腔狭窄，面积狭窄率约 70%-99%',
  },
];

// 颈动脉混合
const soundCarComplex: DEFINE.radioListTypes[] = [
  {
    label: '',
    value: '121',
    txt: '左侧颈动脉斑块形成伴局部管腔狭窄，狭窄率约 < 50%',
  },
  {
    label: '',
    value: '122',
    txt: '右侧颈动脉斑块形成伴局部管腔狭窄，狭窄率约 < 50%',
  },
  {
    label: '',
    value: '123',
    txt: '双侧颈动脉斑块形成伴局部管腔狭窄，狭窄率约 < 50%',
  },
  {
    label: '',
    value: '124',
    txt: '左侧窦部颈动脉斑块形成伴局部管腔狭窄，狭窄率约 < 50%',
  },
  {
    label: '',
    value: '125',
    txt: '右侧窦部颈动脉斑块形成伴局部管腔狭窄，狭窄率约 < 50%',
  },
  {
    label: '',
    value: '126',
    txt: '左侧颈动脉斑块形成伴局部管腔狭窄，狭窄率约 50%-69%',
  },
  {
    label: '',
    value: '127',
    txt: '右侧颈动脉斑块形成伴局部管腔狭窄，狭窄率约 50%-69%',
  },
  {
    label: '',
    value: '128',
    txt: '双侧颈动脉斑块形成伴局部管腔狭窄，狭窄率约 50%-69%',
  },
  {
    label: '',
    value: '129',
    txt: '左侧窦部颈动脉斑块形成伴局部管腔狭窄，狭窄率约 50%-69%',
  },
  {
    label: '',
    value: '130',
    txt: '右侧窦部颈动脉斑块形成伴局部管腔狭窄，狭窄率约 50%-69%',
  },
  {
    label: '',
    value: '131',
    txt: '左侧颈动脉斑块形成伴局部管腔狭窄，狭窄率约 70%-99%',
  },
  {
    label: '',
    value: '132',
    txt: '右侧颈动脉斑块形成伴局部管腔狭窄，狭窄率约 70%-99%',
  },
  {
    label: '',
    value: '133',
    txt: '双侧颈动脉斑块形成伴局部管腔狭窄，狭窄率约 70%-99%',
  },
  {
    label: '',
    value: '134',
    txt: '左侧窦部颈动脉斑块形成伴局部管腔狭窄，狭窄率约 70%-99%',
  },
  {
    label: '',
    value: '135',
    txt: '右侧窦部颈动脉斑块形成伴局部管腔狭窄，狭窄率约 70%-99%',
  },
];

// 肝脏 未见明显异常
const soundLiverNormal: DEFINE.radioListTypes[] = [
  {
    label: '左叶肝脏',
    value: '11',
    txt: '左叶肝脏超声检查未见明显异常',
  },
  {
    label: '右叶肝脏',
    value: '12',
    txt: '右叶肝脏超声检查未见明显异常',
  },
  {
    label: '胆囊',
    value: '13',
    txt: '胆囊超声检查未见明显异常',
  },
  {
    label: '肝胆',
    value: '14',
    txt: '肝胆超声检查未见明显异常',
  },
];

// 肝脏 脂肪肝
const soundLiverCou: DEFINE.radioListTypes[] = [
  {
    label: '轻度',
    value: '16',
    txt: '轻度脂肪肝',
  },
  {
    label: '中度',
    value: '17',
    txt: '中度脂肪肝',
  },
  {
    label: '重度',
    value: '18',
    txt: '重度脂肪肝',
  },
];

// 乳腺 乳腺结节
const breastNodule: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '24',
    txt: '左侧乳腺结节',
  },
  {
    label: '右侧',
    value: '25',
    txt: '右侧乳腺结节',
  },
  {
    label: '双侧',
    value: '26',
    txt: '双侧乳腺结节',
  },
];

// 乳腺 未见明显异常
const breastNormal: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '21',
    txt: '左侧乳腺超声检查未见明显异常',
  },
  {
    label: '右侧',
    value: '22',
    txt: '右侧乳腺超声检查未见明显异常',
  },
  {
    label: '双侧',
    value: '23',
    txt: '双侧乳腺超声检查未见明显异常',
  },
];

// 乳腺 乳腺增生性病变
const breastLesion: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '27',
    txt: '左侧乳腺增生性病变',
  },
  {
    label: '右侧',
    value: '28',
    txt: '右侧乳腺增生性病变',
  },
  {
    label: '双侧',
    value: '29',
    txt: '双侧乳腺增生性病变',
  },
];

// 乳腺 乳腺增生性病变
const breastExpands: DEFINE.radioListTypes[] = [
  {
    label: '左侧',
    value: '30',
    txt: '左侧乳腺导管扩张',
  },
  {
    label: '右侧',
    value: '31',
    txt: '右侧乳腺导管扩张',
  },
  {
    label: '双侧',
    value: '32',
    txt: '双侧乳腺导管扩张',
  },
];

// 乳腺等级
const breastLevel: DEFINE.radioListTypes[] = [
  {
    label: 'BI-RADS 2类',
    value: '41',
    txt: 'BI-RADS 2类',
  },
  {
    label: 'BI-RADS 3类',
    value: '42',
    txt: 'BI-RADS 3类',
  },
  {
    label: 'BI-RADS 4类',
    value: '43',
    txt: 'BI-RADS 4类',
  },
];

// 结节等级合成映射关系，用于预览报告
const breastComplex: DEFINE.radioListTypes[] = [
  {
    label: '',
    value: '51',
    txt: '左侧乳腺结节BI-RADS 2类',
  },
  {
    label: '',
    value: '52',
    txt: '左侧乳腺结节BI-RADS 3类',
  },
  {
    label: '',
    value: '53',
    txt: '左侧乳腺结节BI-RADS 4类',
  },
  {
    label: '',
    value: '54',
    txt: '右侧乳腺结节BI-RADS 2类',
  },
  {
    label: '',
    value: '55',
    txt: '右侧乳腺结节BI-RADS 3类',
  },
  {
    label: '',
    value: '56',
    txt: '右侧乳腺结节BI-RADS 4类',
  },
  {
    label: '',
    value: '57',
    txt: '双侧乳腺结节BI-RADS 2类',
  },
  {
    label: '',
    value: '58',
    txt: '双侧乳腺结节BI-RADS 3类',
  },
  {
    label: '',
    value: '59',
    txt: '双侧乳腺结节BI-RADS 4类',
  },
];

// 甲状腺合并
export const thyList = [
  ...soundThyNormal,
  // ...soundThyClinic,
  ...soundThyAndNodule,
  // ...soundThyNodule,
  ...soundThyChange,
  ...soundThyBig,
  ...soundThyKit,
  // ...soundThyLevel,
  ...soundComplex,
];

// 颈动脉合并
export const carFilmList = [
  ...soundCarNormal,
  ...soundCarFilm,
  ...soundCarFilmGred,
  ...soundCarPlaQue,
  ...soundCarComplex,
];

// 肝胆文字额外配置
const soundThyCalci: DEFINE.radioListTypes[] = [
  {
    label: '',
    value: '15',
    txt: '肝内脂肪浸润',
  },
  {
    label: '',
    value: '19',
    txt: '局限性脂肪肝',
  },
  {
    label: '',
    value: '20',
    txt: '慢性肝病，考虑肝纤维化，请结合肝功能检查',
  },
  {
    label: '',
    value: '21',
    txt: '慢性肝病，考虑肝硬化，请结合肝功能检查',
  },
  {
    label: '',
    value: '2001',
    txt: '胆囊炎',
  },
  {
    label: '',
    value: '2002',
    txt: '胆囊结石',
  },
  {
    label: '',
    value: '2003',
    txt: '胆壁胆固醇结晶',
  },
  {
    label: '',
    value: '2004',
    txt: '胆囊息肉',
  },
];

// 肝胆合并
export const liverCouList = [
  ...soundLiverNormal,
  ...soundLiverCou,
  ...soundThyCalci,
];

// 乳腺合并
export const BreastCouList = [
  ...breastNormal,
  ...breastLesion,
  ...breastExpands,
  ...breastComplex,
];

// 肠系膜淋巴结超声提示
export const mesareicList = [
  {
    label: '',
    value: '1',
    txt: '肠系膜未见明显淋巴结回声',
  },
  {
    label: '',
    value: '2',
    txt: '肠系膜淋巴结可见',
  },
  {
    label: '',
    value: '3',
    txt: '肠系膜淋巴结肿大',
  },
  {
    label: '',
    value: '4',
    txt: '恶性肠系膜淋巴结',
  },
];

export {
  soundThyNormal,
  soundThyAndNodule,
  soundThyNodule,
  soundThyChange,
  soundThyBig,
  soundThyKit,
  soundThyLevel,
  soundCarNormal,
  soundCarFilm,
  soundCarFilmGred,
  soundCarPlaQue,
  soundCarStenosisPart,
  soundCarStenosis,
  soundLiverNormal,
  soundLiverCou,
  breastNormal,
  breastNodule,
  breastLesion,
  breastExpands,
  breastLevel,
};
