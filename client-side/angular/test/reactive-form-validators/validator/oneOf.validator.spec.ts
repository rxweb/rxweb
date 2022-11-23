import {FormBuilder} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

    describe('Validator', () => {
      let formbuilder = new FormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "oneOf": "One of the fields should be selected",
          }
        });
      });

      it('should not error, oneOf validator with matchValues .',
      () => {   
      let employeeFormGroup = formbuilder.group({
          department:[''],
          projectDomains:['', RxwebValidators.oneOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})],                
      })
      employeeFormGroup.controls.projectDomains.setValue(["ECommerce"]);
      expect(employeeFormGroup.controls.projectDomains.errors).toBeNull();
      });

      it('should error, oneOf validator with matchValues .',
      () => {   
      let employeeFormGroup = formbuilder.group({
          department:[''],
          projectDomains:['', RxwebValidators.oneOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})],                
      })
      employeeFormGroup.controls.projectDomains.setValue([]);
      expect(employeeFormGroup.controls.projectDomains.errors).toEqual({'oneOf':{ message: 'One of the fields should be selected', refValues: [[]] } });
      });

      it("Should not error, oneOf validator Conditional Expression with type 'function'",
      () => {     
        let employeeFormGroup = formbuilder.group({
          department:[''],
          qualifications:['',RxwebValidators.oneOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})],
        });
        employeeFormGroup.controls.department.setValue('DotNet');
        employeeFormGroup.controls.qualifications.setValue(["Secondary"]);
        expect(employeeFormGroup.controls.qualifications.errors).toBeNull();
      });

      it("Should not error, oneOf validator Conditional Expression with type 'function'",
      () => {     
        let employeeFormGroup = formbuilder.group({
          department:[''],
          qualifications:['',RxwebValidators.oneOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})],
        });
        employeeFormGroup.controls.department.setValue('PHP');
        employeeFormGroup.controls.qualifications.setValue([]);
        expect(employeeFormGroup.controls.qualifications.errors).toBeNull();
      });

      it("Should error, oneOf validator Conditional Expression with type 'function'",
      () => {    
        let employeeFormGroup = formbuilder.group({
          department:[''],
          qualifications:['',RxwebValidators.oneOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})],
        });
        employeeFormGroup.controls.department.setValue('DotNet');
        employeeFormGroup.controls.qualifications.setValue([]);
        expect(employeeFormGroup.controls.qualifications.errors).toEqual({'oneOf':{ message: 'One of the fields should be selected', refValues: [ [] ] } });
      });

      it("Should not error, oneOf validator Conditional Expression with type 'string'",
      () => {       
        let employeeFormGroup = formbuilder.group({
          department:[''],
          skills:['',RxwebValidators.oneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})]
        });
        employeeFormGroup.controls.department.setValue('DotNet');
        employeeFormGroup.controls.skills.setValue(["MVC"]);
        expect(employeeFormGroup.controls.skills.errors).toBeNull();
      });

      it("Should not error, oneOf validator Conditional Expression with type 'string'",
      () => {     
        let employeeFormGroup = formbuilder.group({
          department:[''],
          skills:['',RxwebValidators.oneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})]
        });
        employeeFormGroup.controls.department.setValue('PHP');
        employeeFormGroup.controls.skills.setValue(["MVC", "AngularJS","Angular 5"]);
        expect(employeeFormGroup.controls.skills.errors).toBeNull();
      });
      
      it("Should error, oneOf validator Conditional Expression with type 'string'",
      () => {   
        let employeeFormGroup = formbuilder.group({
          department:[''],
          skills:['',RxwebValidators.oneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})]
        });
        employeeFormGroup.controls.department.setValue('DotNet');
        employeeFormGroup.controls.skills.setValue([]);
        expect(employeeFormGroup.controls.skills.errors).toEqual({'oneOf':{ message: 'One of the fields should be selected', refValues: [[]] } });
      });

      it("Should error, oneOf validator Shows custom message",
      () => {
          let employeeFormGroup = formbuilder.group({
              hobbies:['',RxwebValidators.oneOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please select atleast 1 hobby"})]
            });
            employeeFormGroup.controls.hobbies.setValue([])
            expect(employeeFormGroup.controls.hobbies.errors).toEqual({'oneOf':{ message: 'Please select atleast 1 hobby', refValues: [[]] } });
      });
    })
