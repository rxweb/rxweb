import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function escape(config?:BaseConfig) {
    return baseFunction('escape', config)
}