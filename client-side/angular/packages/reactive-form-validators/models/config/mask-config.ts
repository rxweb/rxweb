import { BaseConfigFn } from './base-config-fn'
export interface MaskConfig extends BaseConfigFn<MaskConfig> {
    mask: string;
    minLength?: number;
    valueWithMask?: boolean;
    customPlaceholder?: string;
    clearOnInvalid?: boolean;
}
