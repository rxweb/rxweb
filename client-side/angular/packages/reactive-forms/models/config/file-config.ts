import { BaseConfigFn } from './base-config-fn';
export interface FileConfig extends BaseConfigFn<FileConfig> {
  maxFiles?:number;
  minFiles?:number;
}
