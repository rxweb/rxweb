
import { RxFormControl, required, RxFormBuilder, RxwebValidators, compose} from '@rxweb/reactive-form-validators';


export class Record {
    @required()
    name: string;
}

export class Order extends Record {
    id: number;
    tenantId: number;
    @required() lineItem: string;
}

export class User {

    @compose({ validators: [RxwebValidators.alpha(), RxwebValidators.required()] })
    firstName: string;

}
export class Model extends User {

    @required()
    lastName: string;
}



describe('class abstraction', () => {
    let formbuilder = new RxFormBuilder();

    it('should pass, current class property should be defined as RxFormControl', () => {
        let userFormGroup = formbuilder.formGroup(Order)

        expect(userFormGroup.controls.lineItem instanceof RxFormControl).toBe(true);
    })

    it('should pass, extended class property should be defined as RxFormControl', () => {
        let userFormGroup = formbuilder.formGroup(Order)
        expect(userFormGroup.controls.name instanceof RxFormControl).toBe(true);
    })

    it('should work compose validation on extended class property.', () => {
        let userFormGroup = formbuilder.formGroup(Model)
        expect(userFormGroup.controls.firstName.valid).toBeFalsy();
    })
})
