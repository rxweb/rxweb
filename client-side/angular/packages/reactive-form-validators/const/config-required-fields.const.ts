import { ARRAY_CONFIG,FIELD_CONFIG,IP_CONFIG,PASSWORD_CONFIG,NUMBER_CONFIG,PATTERN_CONFIG,
    RANGE_CONFIG
} from './config-names.const'

export const CONFIG_REQUIRED_FIELDS :{[key:string]:string[]} = {
    [ARRAY_CONFIG]:["matchValues"],

    [FIELD_CONFIG]:["fieldName"],

    [IP_CONFIG]:["version"],

    [PASSWORD_CONFIG]:["validation"],

    [NUMBER_CONFIG]:["value"],

    [PATTERN_CONFIG]:["expression"],

    [RANGE_CONFIG]:["minimumNumber","maximumNumber"],
}