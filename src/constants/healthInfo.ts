// 甲状腺
const thyroidHealthInfo: DEFINE.healthTypes[] = [
  {
    value: 0,
    label: '健康',
    desc: '定期（半年）进行健康体检，超声随访。',
  },
  {
    value: 1,
    label: '低风险',
    desc: '遵医嘱结合相关治疗，超声随访（3-6个月复查甲状腺超声检查）。',
  },
  {
    value: 2,
    label: '中风险',
    desc: '遵医嘱结合实验室检查及相关治疗，如有必要到上级医院进一步检查，定期（1-3个月）进行健康检查及超声随访。',
  },
  {
    value: 3,
    label: '高风险',
    desc: '建议到上级医院进一步检查，如有必要请结合临床进行穿刺活检，定期（1-3个月）进行健康检查及超声随访。',
  },
];

// 颈动脉
const carotidArteryHealthInfo: DEFINE.healthTypes[] = [
  {
    value: 0,
    label: '健康',
    desc: '建议定期（半年）进行健康体检，超声随访，保持健康的生活习惯',
  },
  {
    value: 1,
    label: '低风险',
    desc: '颈动脉硬化和有斑块形成（长径<=10mm），建议遵医嘱预防性服用降脂药物，控制体重，低盐低脂饮食，戒烟、限酒，定期（3-6个月）进行健康复查，超声随访。',
  },
  {
    value: 2,
    label: '中风险',
    desc: '斑块较大（长径>10mm），建议遵医嘱服用降脂、溶栓类药物，加强饮食和体重管理，低盐低脂饮食，戒烟、限酒，定期（1-3个月）进行健康检查及超声随访。尽早干预和合理治疗可以有效降低脑中风等心脑血管疾病发生的风险。',
  },
  {
    value: 3,
    label: '高风险',
    desc: '斑块已引起血管腔明显狭窄（狭窄率>50%)，建议遵医嘱服用降压、降脂、溶栓类药物，控制“三高症”（高血压、高血糖、高血脂），加强体重管理，低盐低脂饮食，戒烟、限酒，如有必要上级医院进一步检查，定期（1-3个月）进行健康检查及超声随访。尽早干预和合理治疗可以有效降低脑中风等心脑血管疾病发生的风险。',
  },
];

// 肝胆健康建议
const LiverCourageHealthInfo: DEFINE.healthTypes[] = [
  {
    value: 0,
    label: '健康',
    desc: '建议定期(半年)进行健康体检，超声随访，保持健康的生活习惯。',
  },
  {
    value: 1,
    label: '低风险',
    desc: '轻度脂肪肝或肝脏回声增粗，建议结合肝功能指标，遵医嘱针对病因治疗，服用抗炎保肝、降脂类药物及中医中药调理，加强体重管理，低脂、低热量膳食。胆囊小结石或小息肉(<5mm)，胆壁胆固醇结晶，遵医嘱促消化、抗感染治疗，定期(3-6个月)进行健康检查及超声随访。',
  },
  {
    value: 2,
    label: '中风险',
    desc: '中度脂肪肝或肝纤维化，建议结合肝功能指标，遵医嘱针对病因治疗，服用抗炎保肝、降脂类药物及中医中药调理，加强饮食和体重管理，改善生活方式，尽早干预和合理治疗可以有效降低肝硬化等肝脏疾病发生的风险。已有胆囊结石或息肉(<10mm)无法消除或逆转，遵医嘱溶石、促消化、抗感染治疗，定期 (1-3个月)进行健康检查及超声随访。',
  },
  {
    value: 3,
    label: '高风险',
    desc: '重度脂肪肝或肝硬化，建议结合肝功能指标，遵医嘱针对病因治疗，服用抗炎保肝、降脂类药物及中医中药调理，合理膳食，减轻肝损害，改善肝功能，定期（1-3个月）进行健康检查及超声随访。尽早干预和合理治疗可以有效降低肝肿瘤等肝脏疾病发生的风险。胆囊结石或息肉范围较大(≥10mm)，遵医嘱溶石、促消化、抗感染治疗，如症状无缓解、结石明显增大、息肉直径≥10mm，建议外科处理。',
  },
];

// 乳腺健康建议
const BreastHealthInfo: DEFINE.healthTypes[] = [
  {
    value: 0,
    label: '健康',
    desc: '建议定期(半年)进行健康体检，超声随访，保持健康的生活习惯。',
  },
  {
    value: 1,
    label: '低风险',
    desc: '乳腺增生性病变、乳腺囊肿或乳腺结节较小（<=20mm）建议遵医嘱随访观察或结合相关治疗，服用调节内分泌的药物及消淤散结类中医中药调理，控制结节生长，维持良好的生活和饮食习惯，定期(3-6个月)进行健康检查及超声随访。',
  },
  {
    value: 2,
    label: '中风险',
    desc: '乳腺结节较大(>20mm)，变大的风险增加，较易出现出血、压迫周边组织的情况，建议遵医嘱结合实验室检查及相关治疗，服用调节内分泌的药物及消淤散结类中医中药调理，控制结节生长，如有必要到上级医院进一步检查，定期 (1-3个月)进行健康检查及超声随访。',
  },
  {
    value: 3,
    label: '高风险',
    desc: '乳腺结节有恶性的风险，建议到上级医院进一步检查，如有必要请结合临床进行穿刺活检，定期 (1-3个月)进行健康检查及超声随访。',
  },
];

// 肠系膜淋巴结健康建议
const mesareicHealthInfo: DEFINE.healthTypes[] = [
  {
    value: 0,
    label: '健康',
    desc: '建议定期(半年)进行健康体检，超声随访，保持健康的生活习惯。',
  },
  {
    value: 1,
    label: '低风险',
    desc: '建议结合中医中药调理，保持健康的生活方式，定期(3-6个月)进行健康检查及超声随访。',
  },
  {
    value: 2,
    label: '中风险',
    desc: '建议遵医嘱结合实验室检查及相关治疗，结合中医中药调理，改善生活方式，定期 (1-3个月)进行健康检查及超声随访。',
  },
  {
    value: 3,
    label: '高风险',
    desc: '建议到上级医院进一步检查，如有必要请结合临床进行穿刺活检，定期 (1-3个月)进行健康检查及超声随访。',
  },
];

// 公共健康建议
const commonSuggestList: DEFINE.healthTypes[] = [
  {
    value: 0,
    label: '健康',
  },
  {
    value: 1,
    label: '低风险',
  },
  {
    value: 2,
    label: '中风险',
  },
  {
    value: 3,
    label: '高风险',
  },
];

export {
  thyroidHealthInfo,
  carotidArteryHealthInfo,
  LiverCourageHealthInfo,
  BreastHealthInfo,
  mesareicHealthInfo,
  commonSuggestList,
};
