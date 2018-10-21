import {
    ValidatorFn
} from "@angular/forms";

export interface ComposeConfig {
  validators:ValidatorFn[];
  conditionalExpression?: Function;
}
