import { BaseConfigFn } from './base-config-fn';
import { NumericValueType } from '../../enums'

export interface NumericConfig extends BaseConfigFn<NumericConfig> {
  allowDecimal?:boolean;
  acceptValue?:NumericValueType;
  isFormat?:boolean;
  digitsInfo?:string;
}
