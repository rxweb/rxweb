import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function stripLow(keepNewLines?: boolean, config?: BaseConfig) {
    return baseFunction('stripLow', { ...config, ...{ keepNewLines: keepNewLines } })
}