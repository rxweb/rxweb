import { BaseConfig } from './base-config'
export interface SizeConfig extends BaseConfig {
  maxSize: number;
  minSize?:number;
}
