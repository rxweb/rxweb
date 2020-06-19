import { IntConfig, BaseConfig,RandomConfig,StoreConfig, PrefixConfig, StripLowConfig, BooleanConfig, WhitelistConfig } from "@rxweb/sanitizers"
export interface SanitizerConfig {
    blacklist?: BaseConfig | boolean;
    escape?: BaseConfig | boolean;
    lowercase?: BaseConfig | boolean;
    ltrim?: BaseConfig | boolean;
    prefix?: PrefixConfig | boolean;
    random?: RandomConfig | boolean;
    rtrim?: BaseConfig | boolean;
    sanitize?: BaseConfig | boolean;
    stripLow?: StripLowConfig | boolean;
    suffix?: PrefixConfig | boolean;
    toBoolean?: BooleanConfig | boolean;
    toDouble?: BaseConfig | boolean;
    toFloat?: BaseConfig | boolean;
    toInt?: IntConfig | boolean;
    toString?: BaseConfig | boolean;
    trim?: BaseConfig | boolean;
    uppercase?: BaseConfig | boolean;
    whitelist?: WhitelistConfig | boolean;
}