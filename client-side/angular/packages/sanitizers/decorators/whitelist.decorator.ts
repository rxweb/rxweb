import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function whitelist(chars: string, config?: BaseConfig) {
    return baseFunction('whitelist', { ...config, ...{ chars: chars } })
}