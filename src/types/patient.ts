export enum GenderEnum {
  "男" = 1,
  "女",
}

export enum AgeUnitEnum {
  "岁" = 0,
  "月",
  "天"
}

export interface Patient {
  id: number
  name: string,
  gender: number // 1:男,2:女
  age: number
  age_unit: number // 0:岁,1:月,2:天
  product_name: string,
  create_time: number
}
