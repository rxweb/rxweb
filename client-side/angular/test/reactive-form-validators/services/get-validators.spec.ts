import { IFormGroup, RxFormBuilder, required,prop, RxwebValidators } from '@rxweb/reactive-form-validators';

export class User {
    @required()
    userName: string;

    @prop()
    password: string;
}

describe('get validators', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => { });
    it('decorator based validators', () => {
        let user = new User();
        let userFormGroup = <IFormGroup<User>>formBuilder.formGroup(user);
        let validators = userFormGroup.controls.userName.getValidators();
        
        validators.push(RxwebValidators.alpha());
        userFormGroup.controls.password.setValidators(validators);
        console.log(validators)
        expect(userFormGroup.controls.userName.getValidators().length).toEqual(1);
        expect(userFormGroup.controls.password.getValidators().length).toEqual(2);
        userFormGroup.controls.password.setValue("@");
        expect(userFormGroup.controls.password.invalid).toBe(true);

    })

    it('standard validators approach', () => {
        let userFormGroup = <IFormGroup<User>>formBuilder.group({
            userName: ['', RxwebValidators.required()],
            password:['']
        });
        let validators = userFormGroup.controls.userName.getValidators();
        validators.push(RxwebValidators.alpha());
        userFormGroup.controls.password.setValidators(validators);
        expect(userFormGroup.controls.userName.getValidators().length).toEqual(1);
        expect(userFormGroup.controls.password.getValidators().length).toEqual(2);
        userFormGroup.controls.password.setValue("@");
        expect(userFormGroup.controls.password.invalid).toBe(true);
    })
})
