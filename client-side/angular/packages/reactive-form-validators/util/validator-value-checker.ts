import { AbstractControl } from "@angular/forms";
import { FormProvider } from "./form-provider";
import { RegexValidator } from "./regex-validator";

export class ValidatorValueChecker {

  static pass(control: AbstractControl, config: any): boolean {
    if (FormProvider.ProcessRule(control, config))
      return RegexValidator.isNotBlank(control.value)
    else
      return false;
  }

  static passArrayValue(control: AbstractControl, config: any) {
    if (FormProvider.ProcessRule(control, config))
        return typeof control.value === "string" ? RegexValidator.isNotBlank(control.value) : control.value instanceof Array;
    else
      return false;
  }
}
