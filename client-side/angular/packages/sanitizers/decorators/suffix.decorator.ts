import { baseFunction } from "./base.function"
import { BaseConfig } from '../interface/base-config'
export function suffix(text: string, config?: BaseConfig) {
    return baseFunction('suffix', { ...config, ...{ text: text } })
}