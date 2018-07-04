import { DefaultConfig } from "./config/default-config";
import { PatternConfig } from "./config/pattern-config";
import { CompareConfig } from "./config/compare-config";
import { AlphaConfig } from "./config/alpha-config";
import { RangeConfig } from "./config/range-config";
import { NumberConfig } from "./config/number-config";
import { DateConfig } from "./config/date-config";
import { ValidatorFn } from "@angular/forms";

export interface PropValidationConfig {
    required?: boolean;
    minLength?: NumberConfig;
    maxLength?: NumberConfig;
    pattern?: PatternConfig;
    compare?: CompareConfig;
    contains?: DefaultConfig;
    alpha?: AlphaConfig;
    numeric?: boolean;
    alphaNumeric?: AlphaConfig;
    email?: boolean;
    hexColor?: boolean;
    lowercase?: boolean;
    maxDate?: DateConfig;
    maxNumber?: NumberConfig;
    minDate?: DateConfig;
    minNumber?: NumberConfig;
    uppercase?: boolean;
    range?: RangeConfig;
    custom?: ValidatorFn;
}
