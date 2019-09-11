import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function prefix(text:string,config?: BaseConfig) {
    return baseFunction('prefix', { ...config, ...{ text: text } })
}