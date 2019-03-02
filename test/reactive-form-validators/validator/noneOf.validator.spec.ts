import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
    describe('Validator', () => {
      let formbuilder = new FormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "noneOf": "No field should be selected",
          }
        });
      });

      it('should not error, noneOf validator with matchValues .',
      () => {   
      let employeeFormGroup = formbuilder.group({
          department:[''],
          projectDomains:['', RxwebValidators.noneOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})],                
      })
      employeeFormGroup.controls.projectDomains.setValue([]);
      expect(employeeFormGroup.controls.projectDomains.errors).toBeNull();
      });

      it('should error, noneOf validator with matchValues .',
      () => {   
      let employeeFormGroup = formbuilder.group({
          department:[''],
          projectDomains:['', RxwebValidators.noneOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})],                
      })
      employeeFormGroup.controls.projectDomains.setValue(["ECommerce"]);
      expect(employeeFormGroup.controls.projectDomains.errors).toEqual({'noneOf':{ message: 'No field should be selected', refValues: [ ["ECommerce"] ] } });
      });

      it("Should not error, noneOf validator Conditional Expression with type 'function'",
      () => {
     
        let employeeFormGroup = formbuilder.group({
          department:[''],
          qualifications:['',RxwebValidators.noneOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})],
        });
        employeeFormGroup.controls.department.setValue('DotNet');
        employeeFormGroup.controls.qualifications.setValue([]);
        expect(employeeFormGroup.controls.qualifications.errors).toBeNull();
      });
      it("Should not error, noneOf validator Conditional Expression with type 'function'",
      () => {     
        let employeeFormGroup = formbuilder.group({
          department:[''],
          qualifications:['',RxwebValidators.noneOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})],
        });
        employeeFormGroup.controls.department.setValue('PHP');
        employeeFormGroup.controls.qualifications.setValue(["Secondary","Senior Secondary","B.Tech","M.Tech"]);
        expect(employeeFormGroup.controls.qualifications.errors).toBeNull();
      });

      it("Should error, noneOf validator Conditional Expression with type 'function'",
      () => {    
        let employeeFormGroup = formbuilder.group({
          department:[''],
          qualifications:['',RxwebValidators.noneOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})],
        });
        employeeFormGroup.controls.department.setValue('DotNet');
        employeeFormGroup.controls.qualifications.setValue(["Secondary","Senior Secondary","B.Tech","M.Tech"]);
        expect(employeeFormGroup.controls.qualifications.errors).toEqual({'noneOf':{ message: 'No field should be selected', refValues: [ ["Secondary","Senior Secondary","B.Tech","M.Tech"] ] } });
      });

      it("Should not error, noneOf validator Conditional Expression with type 'string'",
      () => {       
        let employeeFormGroup = formbuilder.group({
          department:[''],
          skills:['',RxwebValidators.noneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})]
        });
        employeeFormGroup.controls.department.setValue('DotNet');
        employeeFormGroup.controls.skills.setValue([]);
        expect(employeeFormGroup.controls.skills.errors).toBeNull();
      });

      it("Should not error, noneOf validator Conditional Expression with type 'string'",
      () => {     
        let employeeFormGroup = formbuilder.group({
          department:[''],
          skills:['',RxwebValidators.noneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})]
        });
        employeeFormGroup.controls.department.setValue('PHP');
        employeeFormGroup.controls.skills.setValue(["MVC", "AngularJS","Angular 5"]);
        expect(employeeFormGroup.controls.skills.errors).toBeNull();
      });

      it("Should error, noneOf validator Conditional Expression with type 'string'",
      () => {   
        let employeeFormGroup = formbuilder.group({
          department:[''],
          skills:['',RxwebValidators.noneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})]
        });
        employeeFormGroup.controls.department.setValue('DotNet');
        employeeFormGroup.controls.skills.setValue(["MVC", "AngularJS","Angular 5"]);
        expect(employeeFormGroup.controls.skills.errors).toEqual({'noneOf':{ message: 'No field should be selected', refValues: [ ["MVC", "AngularJS","Angular 5"] ] } });
      });

      it("Should error, noneOf validator Shows custom message",
      () => {
          let employeeFormGroup = formbuilder.group({
              hobbies:['',RxwebValidators.noneOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please select no hobbies"})]
            });
            employeeFormGroup.controls.hobbies.setValue(["Drawing", "Singing"])
            expect(employeeFormGroup.controls.hobbies.errors).toEqual({'noneOf':{ message: 'Please select no hobbies', refValues: [ ["Drawing", "Singing"] ] } });
            });

        it("Should not error with value as string.",
            () => {
                let employeeFormGroup = formbuilder.group({
                    hobbies: ['', RxwebValidators.noneOf({ matchValues: ["Drawing", "Singing", "Dancing", "Travelling", "Sports"], message: "Please select no hobbies" })]
                });
                employeeFormGroup.controls.hobbies.setValue("Chess")
                expect(employeeFormGroup.controls.hobbies.errors).toBeNull();
            });

        it("Should error with value as string with duplicate value.",
            () => {
                let employeeFormGroup = formbuilder.group({
                    hobbies: ['', RxwebValidators.noneOf({ matchValues: ["Drawing", "Singing", "Dancing", "Travelling", "Sports"]})]
                });
                
                employeeFormGroup.controls.hobbies.setValue("Drawing")
                expect(employeeFormGroup.controls.hobbies.errors).toEqual({ 'noneOf': { message: 'No field should be selected', refValues: ["Drawing"] } });
            });

    })
})();