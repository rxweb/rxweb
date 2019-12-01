import { FormProvider } from "./form-provider";
import { RegexValidator } from "./regex-validator";
import { AbstractControl } from "../abstract/abstract-control";

export class ValidatorValueChecker {

  static pass(control: AbstractControl, config: any): boolean {
    if (FormProvider.ProcessRule(control, config))
      return RegexValidator.isNotBlank(control.value)
    else
      return false;
  }

  static passArrayValue(control: AbstractControl, config: any) {
    if (FormProvider.ProcessRule(control, config))
      return control.value instanceof Array;
    else
      return false;
  }
}
