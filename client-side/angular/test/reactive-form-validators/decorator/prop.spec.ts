import {prop,RxFormBuilder,FormBuilderConfiguration,RxFormGroup} from '../../../packages/reactive-form-validators';

export class Employee{
    @prop()
    firstName:string;

    email : string;
}

export class User {


    type: string;

    @prop({ ignore: function () { return this.type == "Master"; } })
    userName: string;

    @prop()
    password: string;

}

    describe('prop', () => {
        let formBuilder = new RxFormBuilder();
        var formBuilderConfig = new FormBuilderConfiguration();
    it('should not error, firstName control must be exits',
    () => {
        let formGroup = <RxFormGroup>formBuilder.formGroup(Employee,formBuilderConfig);
        expect(formGroup.controls.firstName.value).toBeNull();
        let exitsFirstName = (formGroup.controls.firstName != undefined);
        expect(exitsFirstName).toBe(true);
        
    });
    
    it('should not error, email control should not exits',
    () => {
        let formGroup = <RxFormGroup>formBuilder.formGroup(Employee,formBuilderConfig);
        let isNotExits = (formGroup.controls.email == undefined);
        expect(isNotExits).toBe(true);
    });

    it('should not error, firstName value should be "Ushmi"',
    () => {
        var employee = new Employee();
        employee.firstName = "Ushmi";
        let formGroup = <RxFormGroup>formBuilder.formGroup(employee,formBuilderConfig);
        expect(formGroup.controls.firstName.value).toEqual("Ushmi");
     });

    it('should not error, should not define "userName" FormControl',
    () => {
        var user = new User();
        user.type = "Master";
        let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfig);
        expect(formGroup.controls.userName).toEqual(undefined);
        expect(formGroup.controls.password != undefined).toBe(true);
     });
    });
