import { DateConfig } from './date-config'
export interface MinDateConfig extends DateConfig{
    operator?:">" | ">="
}