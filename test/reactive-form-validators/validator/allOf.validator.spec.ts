import { FormBuilder } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';



describe('Validator', () => {
    let formbuilder = new FormBuilder();
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "allOf": "All fields must be selected.",
            }
        });
    });
    it('should not error, allOf validator with matchValues .',
        () => {

            let employeeFormGroup = formbuilder.group({
                department: [''],
                projectDomains: ['', RxwebValidators.allOf({ matchValues: ["ECommerce", "Banking", "Educational", "Gaming"] })],
            })
            employeeFormGroup.controls.projectDomains.setValue(['ECommerce', 'Banking', 'Educational', 'Gaming']);
            expect(employeeFormGroup.controls.projectDomains.errors).toBeNull();
        });

    it('should  error, allOf validator with matchValues.',
        () => {

            let employeeFormGroup = formbuilder.group({
                department: [''],
                projectDomains: ['', RxwebValidators.allOf({ matchValues: ["ECommerce", "Banking", "Educational", "Gaming"] })],
            })
            employeeFormGroup.controls.projectDomains.setValue(["ECommerce", "Banking", "Educational"]);
            expect(employeeFormGroup.controls.projectDomains.errors).toEqual({ 'allOf': { message: 'All fields must be selected.', refValues: [["ECommerce", "Banking", "Educational"]] } });
        });

    it("Should not error, allOf validator Conditional Expression with type 'function'",
        () => {

            let employeeFormGroup = formbuilder.group({
                department: [''],
                qualifications: ['', RxwebValidators.allOf({ matchValues: ["Secondary", "Senior Secondary", "B.Tech", "M.Tech", "B.C.A.", "M.C.A."], conditionalExpression: (x, y) => x.department == 'DotNet' })],
            });
            employeeFormGroup.controls.department.setValue('DotNet');
            employeeFormGroup.controls.qualifications.setValue(["Secondary", "Senior Secondary", "B.Tech.", "M.Tech.", "B.C.A.", "M.C.A."]);
            expect(employeeFormGroup.controls.qualifications.errors).toBeNull();
        });
    it("Should not error, allOf validator Conditional Expression with type 'function'",
        () => {

            let employeeFormGroup = formbuilder.group({
                department: [''],
                qualifications: ['', RxwebValidators.allOf({ matchValues: ["Secondary", "Senior Secondary", "B.Tech", "M.Tech", "B.C.A.", "M.C.A."], conditionalExpression: (x, y) => x.department == 'DotNet' })],
            });
            employeeFormGroup.controls.department.setValue('PHP');
            employeeFormGroup.controls.qualifications.setValue(["Secondary", "Senior Secondary", "B.Tech", "M.Tech"]);
            expect(employeeFormGroup.controls.qualifications.errors).toBeNull();
        });

    it("Should error, allOf validator Conditional Expression with type 'function'",
        () => {

            let employeeFormGroup = formbuilder.group({
                department: [''],
                qualifications: ['', RxwebValidators.allOf({ matchValues: ["Secondary", "Senior Secondary", "B.Tech", "M.Tech", "B.C.A.", "M.C.A."], conditionalExpression: (x, y) => x.department == 'DotNet' })],
            });
            employeeFormGroup.controls.department.setValue('DotNet');
            employeeFormGroup.controls.qualifications.setValue(["Secondary", "Senior Secondary", "B.Tech", "M.Tech"]);
            expect(employeeFormGroup.controls.qualifications.errors).toEqual({ 'allOf': { message: 'All fields must be selected.', refValues: [["Secondary", "Senior Secondary", "B.Tech", "M.Tech"]] } });
        });

    it("Should not error, allOf validator Conditional Expression with type 'string'",
        () => {

            let employeeFormGroup = formbuilder.group({
                department: [''],
                skills: ['', RxwebValidators.allOf({ matchValues: ["MVC", "AngularJS", "Angular 5", "C#", "Web Api", "SQL Server"], conditionalExpression: "x => x.department =='DotNet'" })]
            });
            employeeFormGroup.controls.department.setValue('DotNet');
            employeeFormGroup.controls.skills.setValue(["MVC", "AngularJS", "Angular 5", "C#", "Web Api", "SQL Server"]);
            expect(employeeFormGroup.controls.skills.errors).toBeNull();
        });

    it("Should not error, allOf validator Conditional Expression with type 'string'",
        () => {

            let employeeFormGroup = formbuilder.group({
                department: [''],
                skills: ['', RxwebValidators.allOf({ matchValues: ["MVC", "AngularJS", "Angular 5", "C#", "Web Api", "SQL Server"], conditionalExpression: "x => x.department =='DotNet'" })]
            });
            employeeFormGroup.controls.department.setValue('PHP');
            employeeFormGroup.controls.skills.setValue(["MVC", "AngularJS", "Angular 5"]);
            expect(employeeFormGroup.controls.skills.errors).toBeNull();
        });

    it("Should error, allOf validator Conditional Expression with type 'string'",
        () => {

            let employeeFormGroup = formbuilder.group({
                department: [''],
                skills: ['', RxwebValidators.allOf({ matchValues: ["MVC", "AngularJS", "Angular 5", "C#", "Web Api", "SQL Server"], conditionalExpression: "x => x.department =='DotNet'" })]
            });
            employeeFormGroup.controls.department.setValue('DotNet');
            employeeFormGroup.controls.skills.setValue(["MVC", "AngularJS", "Angular 5"]);
            expect(employeeFormGroup.controls.skills.errors).toEqual({ 'allOf': { message: 'All fields must be selected.', refValues: [["MVC", "AngularJS", "Angular 5"]] } });
        });

    it("Should error, allOf validator Shows custom message",
        () => {
            let employeeFormGroup = formbuilder.group({
                hobbies: ['', RxwebValidators.allOf({ matchValues: ["Drawing", "Singing", "Dancing", "Travelling", "Sports"], message: "Please select all hobbies" })]
            });
            employeeFormGroup.controls.hobbies.setValue(["Drawing", "Singing"])
            expect(employeeFormGroup.controls.hobbies.errors).toEqual({ 'allOf': { message: 'Please select all hobbies', refValues: [["Drawing", "Singing"]] } });
        });
});

