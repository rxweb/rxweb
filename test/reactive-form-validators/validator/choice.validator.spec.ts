import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';


(function() {
    describe('Validator', () => {
      let formbuilder = new FormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "choice": "Please choose options according to minLength and maxLength",
          }
        });
      });
      it('should not error, choice validator.',
          () => {
            let employeeFormGroup = formbuilder.group({
                department:[''],
                projectDomains:['', RxwebValidators.choice({maxLength:5,minLength:2})],                
            })
            employeeFormGroup.controls.projectDomains.setValue(['ECommerce','Banking','Educational','Gaming','EExamPortal']);
            expect(employeeFormGroup.controls.projectDomains.errors).toBeNull();
          })

          it('should error, choice validator.',
          () => {
            let employeeFormGroup = formbuilder.group({
                department:[''],
                projectDomains:['', RxwebValidators.choice({maxLength:5,minLength:2})],                
            })
            employeeFormGroup.controls.projectDomains.setValue(['ECommerce','ECommerce','Banking','Educational','Gaming','EExamPortal']);
            expect(employeeFormGroup.controls.projectDomains.errors).toEqual({ "choice": { "message": "Please choose options according to minLength and maxLength", "refValues": [["ECommerce",'ECommerce','Banking','Educational','Gaming','EExamPortal'] ]} })
          })

          it("Should not error, choice validator Conditional Expression with type 'function'",
          () => {
         
            let employeeFormGroup = formbuilder.group({
              department:[''],
              qualifications:['',RxwebValidators.choice({minLength:4,maxLength:5, conditionalExpression: (x,y) => x.department =='DotNet'})],
            });
            employeeFormGroup.controls.department.setValue('DotNet');
            employeeFormGroup.controls.qualifications.setValue(["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A."]);
            expect(employeeFormGroup.controls.qualifications.errors).toBeNull();
          });
          it("Should not error, choice validator Conditional Expression with type 'function'",
          () => {
         
            let employeeFormGroup = formbuilder.group({
              department:[''],
              qualifications:['',RxwebValidators.choice({minLength:4,maxLength:5, conditionalExpression: (x,y) => x.department =='DotNet'})],
            });
            employeeFormGroup.controls.department.setValue('PHP');
            employeeFormGroup.controls.qualifications.setValue([]);
            expect(employeeFormGroup.controls.qualifications.errors).toBeNull();
          });
  
          it("Should error, choice validator Conditional Expression with type 'function'",
          () => {
        
            let employeeFormGroup = formbuilder.group({
              department:[''],
              qualifications:['',RxwebValidators.choice({minLength:4,maxLength:5, conditionalExpression: (x,y) => x.department =='DotNet'})],
            });
            employeeFormGroup.controls.department.setValue('DotNet');
            employeeFormGroup.controls.qualifications.setValue(["Secondary","Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A."]);
            expect(employeeFormGroup.controls.qualifications.errors).toEqual({'choice':{ message: 'Please choose options according to minLength and maxLength', refValues: [ ["Secondary","Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A."] ] } });
          });

    
        })
    })();