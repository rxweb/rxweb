import { BaseConfigFn } from './base-config-fn';
export interface ImageConfig extends BaseConfigFn<ImageConfig> {
  maxWidth?:number;
  maxHeight?:number;
  minWidth?:number;
  minHeight?:number;
}
