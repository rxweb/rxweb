import { DateConfig } from './date-config'
export interface MaxDateConfig extends DateConfig {
    operator?:"<" | "<="
}