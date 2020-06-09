import { Validator, AsyncValidatorFn, ValidatorFn, FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

// todo: доработать ConditionalValidator, чтобы он работал в связке с асинхронным валидатором (сейчас валится)

/* usage

this.formBuilder.group({
    vehicleType: ['', Validators.required],
    licencePlate: [
        '',
        ConditionalValidator.apply(
            group => group.controls.vehicleType.value === 'car',
            Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ])
        ),
    ]
});


this.formBuilder.group({
    country: ['', Validators.required],
    vehicleType: ['', Validators.required],
    licencePlate: [
        '',
        Validators.compose([
            ConditionalValidator.apply(
                group => group.controls.vehicleType.value === 'car',
                Validators.required
            ),
            ConditionalValidator.apply(
                group => group.controls.country.value === 'sweden',
                Validators.minLength(6)
            ),
        ])
    ]
});

*/


interface ConditionalFunc {
  (rootGroup: FormGroup | FormArray): Boolean;
}


export class ConditionalValidator {
  /**
  *  Валидатор, который применяет валидатор при некотором заданом условии.
  * @param {ConditionalFunc} conditional Условие для применения валидатора
  * @param {ValidatorFn} validator Валидатор, который будет применен
  * @param {Boolean} trackParentOnly Подписка только на изменение значения родителя (По-умолчанию подписка на root)
  */
  static set(conditional: ConditionalFunc, validator: ValidatorFn, trackParentOnly: Boolean = null): ValidatorFn {
    let revalidateSub: Boolean;
    return (control: FormControl) => {
      if (control && control.parent) {
        if (!revalidateSub) {
          revalidateOnChanges(control, trackParentOnly);
          revalidateSub = true;
        }
        if (conditional(<FormGroup|FormArray>control.root)) {
          return validator(control);
        }
      }
      return null;
    };
  }

  /* Не реализован */
  static setAsync(conditional: Function, validator: AsyncValidatorFn): AsyncValidatorFn {
    throw new Error('Not implemented'); // todo: implement
  }

  static equivalent(controlKey: string, expectedValue: any): ConditionalFunc {
    return (rootGroup: FormGroup|FormArray) => {
      let control = rootGroup.get(controlKey);
      if (!control)
        return expectedValue === undefined;
      return expectedValue === control.value;
    }
  }
}

function revalidateOnChanges(control: AbstractControl, trackParentOnly: Boolean = null): void {
  let parentControl = trackParentOnly ? control.parent : control.root;
  parentControl.valueChanges
    .pipe(
        distinctUntilChanged((a, b) => {
          // These will always be plain objects coming from the form, do a simple comparison
          if (a && !b || !a && b) {
            return false;
          } else if (a && b && Object.keys(a).length !== Object.keys(b).length) {
            return false;
          } else if (a && b) {
            for (let i in a) {
              if (a[i] !== b[i]) {
                return false;
              }
            }
          }
          return true;
        })
    )
    .subscribe(() => {
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });
}

