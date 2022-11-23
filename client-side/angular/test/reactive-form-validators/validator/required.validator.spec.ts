import {FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "required": "This field is required",
        }
      });
    });

    describe('requiredValidator', () => {

	      it("Should not error, required validator If you want to apply conditional validation on 'Middle Name' or 'Last Name', then you need to add 'First Name' input as 'Bharat'",
        () => { 
          expect(RxwebValidators.required()(new FormControl('Bharat'))).toBeNull(); 
        });


      it("Should error, required validator If you want to apply conditional validation on 'Middle Name' or 'Last Name', then you need to add 'First Name' input as 'Bharat'",
        () => { 
          expect(RxwebValidators.required()(new FormControl(''))).toEqual({'required':{ message: 'This field is required', refValues: [  ] } }); 
        });


      it("Should not error, required validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Bharat'],
            'middleName':'Raj'
          });
          expect(RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat" })(formGroup.controls.middleName)).toBeNull()
        });

      it("Should not error, required validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Mukesh'],
            'middleName':''
          });
          expect(RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat" })(formGroup.controls.middleName)).toBeNull()
        });


      it("Should error,  required validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'firstName':['Bharat'],
            'middleName':''
          });
          expect(RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat" })(formGroup.controls.middleName)).toEqual({'required':{ message: 'This field is required', refValues: [  ] } }); 
        });


      it("Should not error, required validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Bharat'],
            'lastName':'Shah'
          });
          expect(RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toBeNull()
        });

      it("Should not error, required validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Mukesh'],
            'lastName':''
          });
          expect(RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toBeNull()
        });


      it("Should error,  required validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'firstName':['Bharat'],
            'lastName':''
          });
          expect(RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toEqual({'required':{ message: 'This field is required', refValues: [  ] } }); 
        });



      it("Should error, required validator Shows Custom Validation Message.",
        () => { 
          expect(RxwebValidators.required({message:'Username cannot be blank.'})(new FormControl(''))).toEqual({'required':{ message: 'Username cannot be blank.', refValues: [  ] } }); 
        });

      it("Should not error, once reset the FormControl with value of '0'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			        'amount':[1,RxwebValidators.required()],
          });
          formGroup.reset({amount:'0'})
          expect(formGroup.controls.amount.errors).toBeNull(); 
        });


        it("Should not error, FormControl value is '0'",
        () => { 
          expect(RxwebValidators.required()(new FormControl(0))).toBeNull(); 
        });

        it("Should not error, FormControl value is 'false'",
        () => { 
          expect(RxwebValidators.required()(new FormControl(false))).toBeNull(); 
        });


	//end
    });
  });
