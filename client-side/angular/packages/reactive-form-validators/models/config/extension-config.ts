import { BaseConfigFn } from './base-config-fn';
export interface ExtensionConfig extends BaseConfigFn<ExtensionConfig> {
    extensions?: string[];
    isExcludeExtensions?: boolean;
}
