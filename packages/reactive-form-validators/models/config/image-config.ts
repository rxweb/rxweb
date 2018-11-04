import { FileConfig } from './base-config'
export interface ImageConfig extends FileConfig {
  maxWidth?:number;
  maxHeight?:number;
  width?:number;
  height?:number;
}
