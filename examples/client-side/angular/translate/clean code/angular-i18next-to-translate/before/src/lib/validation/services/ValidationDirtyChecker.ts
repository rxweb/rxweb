import { Injectable } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationDirtyChecker {
  markControlsDirty(group: FormGroup | FormArray) {
    let controls = group.controls;
    for (let ck in controls) {
      if (controls.hasOwnProperty(ck)) {
        let c: AbstractControl = controls[ck];
        c.markAsDirty({ onlySelf: true });
        if (c instanceof FormGroup || c instanceof FormArray)
          this.markControlsDirty(c);
      }
    }
  }
}
