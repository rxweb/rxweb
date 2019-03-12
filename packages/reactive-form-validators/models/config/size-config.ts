import { BaseConfigFn } from './base-config-fn';
export interface SizeConfig extends BaseConfigFn<SizeConfig> {
  maxSize?: number;
  minSize?:number;
}
