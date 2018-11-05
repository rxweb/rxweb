import { BaseConfig } from './base-config'
export interface FileConfig extends BaseConfig {
  maxFileSize?:number;
  minFileSize?:number;
  allowedExtensions?:string[]
  acceptMaxFiles?:number;
}
