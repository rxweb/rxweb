import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function blacklist(chars: string,config?:BaseConfig) {
        return baseFunction('blacklist', { ...config, ...{ chars: chars } })
}