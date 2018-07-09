import { DefaultConfig } from "./config/default-config";
import { PatternConfig } from "./config/pattern-config";
import { CompareConfig } from "./config/compare-config";
import { AlphaConfig } from "./config/alpha-config";
import { RangeConfig } from "./config/range-config";
import { NumberConfig } from "./config/number-config";
import { DateConfig } from "./config/date-config";
import { DigitConfig } from "./config/digit-config";
import { EmailConfig } from "./config/email-config";
import { MessageConfig } from "./config/message-config";
import { ValidatorFn } from "@angular/forms";

export interface PropValidationConfig {
    required?: boolean;
    minLength?: NumberConfig ;
    maxLength?: NumberConfig ;
    pattern?: PatternConfig ;
    compare?: CompareConfig ;
    contains?: DefaultConfig;
    alpha?: AlphaConfig | boolean;
    digit?: DigitConfig | boolean;
    alphaNumeric?: AlphaConfig | boolean;
    email?: EmailConfig | boolean;
    hexColor?: MessageConfig | boolean;
    lowercase?: MessageConfig | boolean;
    maxDate?: DateConfig;
    maxNumber?: NumberConfig;
    minDate?: DateConfig;
    minNumber?: NumberConfig;
    uppercase?: MessageConfig | boolean;
    range?: RangeConfig;
    custom?: ValidatorFn;
}
