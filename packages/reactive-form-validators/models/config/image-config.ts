import { BaseConfig } from './base-config'
export interface ImageConfig extends BaseConfig {
  maxWidth:number;
  maxHeight:number;
  minWidth?:number;
  minHeight?:number;
}
