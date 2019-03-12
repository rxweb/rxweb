import { BaseConfigFn } from './base-config-fn'
export interface AlphaConfig extends BaseConfigFn<AlphaConfig> {
  allowWhiteSpace?: boolean;
}
