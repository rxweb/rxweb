import { Injectable } from "@angular/core"
import { AbstractControl } from "@angular/forms"
import { DecimalPipe } from "@angular/common"
import { RegexValidator } from '../../util/regex-validator';
import { BLANK } from "../../const"

@Injectable()
export class DecimalProvider {

    constructor(
        private decimalPipe: DecimalPipe
        ) {
    }

    replacer(control:any): void {
        if (control.value) {
            let value = control.value;
            value = value.replace(RegexValidator.commaRegex(), BLANK);
            var splitValue = value.split(".");
            value = (splitValue.length > 1 && splitValue[1] && RegexValidator.isZero(splitValue[1])) ? splitValue[0] : value;
            return value;
        }
        return control.value;
    }
    
    transFormDecimal(control:any): string {
        if (!(control.errors && control.errors.numeric)) {
            return this.decimalPipe.transform(control.value, control.config.digits);
      } 
    }
}
