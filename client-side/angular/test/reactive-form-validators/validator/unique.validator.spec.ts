import {FormBuilder, FormArray,FormGroup} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';


  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "unique": "value should be unique",
        }
      });
    });

    describe('uniqueValidator', () => {

	      it('should error. same value but second value first letter is capital',
        () => {
          let formBuilder = new FormBuilder();
          let userFormGroup = formBuilder.group({
            hobbies:formBuilder.array([
              formBuilder.group({
                  name:['cricket',RxwebValidators.unique()]
              }),
              formBuilder.group({
                  name:['',RxwebValidators.unique()]
              }),
            ])
        });
          let hobbiesFormArray = <FormArray>userFormGroup.controls.hobbies;
          let hobbyFormGroup = <FormGroup>hobbiesFormArray.controls[1];
          hobbyFormGroup.controls.name.setValue('Cricket');
          expect(hobbyFormGroup.controls.name.errors).toEqual({ "unique": { "message": "value should be unique", "refValues": [ "Cricket" ] } })
        });

    it('should not error. both values are different',
        () => {
          let formBuilder = new FormBuilder();
          let userFormGroup = formBuilder.group({
            hobbies:formBuilder.array([
              formBuilder.group({
                  name:['cricket',RxwebValidators.unique()]
              }),
              formBuilder.group({
                  name:['',RxwebValidators.unique()]
              }),
            ])
        });
          let hobbiesFormArray = <FormArray>userFormGroup.controls.hobbies;
          let hobbyFormGroup = <FormGroup>hobbiesFormArray.controls[1];
          hobbyFormGroup.controls.name.setValue('chess');
          expect(hobbyFormGroup.controls.name.errors).toBeNull();
        });
     
	   

        it('should error. custom message in unique validator.',
        () => {
          let formBuilder = new FormBuilder();
          let userFormGroup = formBuilder.group({
            hobbies:formBuilder.array([
              formBuilder.group({
                  name:['cricket',RxwebValidators.unique({message: 'You must enter a unique value'})]
              }),
              formBuilder.group({
                  name:['',RxwebValidators.unique({message: 'You must enter a unique value'})]
              }),
            ])
        });
          let hobbiesFormArray = <FormArray>userFormGroup.controls.hobbies;
          let hobbyFormGroup = <FormGroup>hobbiesFormArray.controls[1];
          hobbyFormGroup.controls.name.setValue('Cricket');
          expect(hobbyFormGroup.controls.name.errors).toEqual({ "unique": { "message": "You must enter a unique value", "refValues": [ "Cricket" ] } })
        });

	//end
    });
  });
