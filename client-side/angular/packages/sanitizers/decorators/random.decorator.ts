import { baseFunction } from "./base.function"
import { RandomConfig } from '../interface/random-config'
export function random(config?: RandomConfig) {
    return baseFunction("random",config)
}