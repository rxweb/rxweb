import { BaseConfig } from './base-config'
export interface FileConfig extends BaseConfig {
  maxFiles?:number;
  minFiles?:number;
}
