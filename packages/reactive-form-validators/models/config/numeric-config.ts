import { BaseConfig } from './base-config'
import { NumericValueType } from '../../enums'

export interface NumericConfig extends BaseConfig {
  allowDecimal?:boolean;
  acceptValue?:NumericValueType;
}
