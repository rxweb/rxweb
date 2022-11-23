import { choice,  ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

export class EmployeeInfo {

    @choice({ minLength: 2, maxLength: 4, messageKey: 'choiceMessageKey' })
    certifications: string;

    @choice({ minLength: 2 })
    skills: string;
}

describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "choiceMessageKey": "Please choose options according to minLength and maxLength.",
                "choice": "Please choose options according to minLength and maxLength."
            }
        });
    });
    describe('choiceDecorator', () => {
        it("Should not error, choice decorator.",
            () => {
                let employeeInfo = new EmployeeInfo();
                let formGroup = formBuilder.formGroup(employeeInfo);
                formGroup.controls.certifications.setValue(["Microsoft certified", "Google certified", "Oracle certified"]);
                expect(formGroup.controls.certifications.errors).toBeNull();
            });

        it('Should error, choice decorator.',
            () => {
                let employeeInfo = new EmployeeInfo();
                let formGroup = formBuilder.formGroup(employeeInfo);
                formGroup.controls.certifications.setValue(["Microsoft certified"]);
                expect(formGroup.controls.certifications.errors).toEqual({ 'choice': { message: 'Please choose options according to minLength and maxLength.', refValues: [["Microsoft certified"]] } });
            });

        it("Should not error, if only applied min length and min length condition matched",
            () => {
                let employeeInfo = new EmployeeInfo();
                let formGroup = formBuilder.formGroup(employeeInfo);
                formGroup.controls.skills.setValue(["Angular", "SQL Server", "MVC"])
                expect(formGroup.controls.skills.errors).toBeNull();
            });

        it("Should error, if only applied min length and min length condition is not matched",
            () => {
                let employeeInfo = new EmployeeInfo();
                let formGroup = formBuilder.formGroup(employeeInfo);
                formGroup.controls.skills.setValue(["Angular"])
                expect(formGroup.controls.skills.errors).toEqual({ 'choice': { message: 'Please choose options according to minLength and maxLength.', refValues: [["Angular"]] } });
            });
    })
})
