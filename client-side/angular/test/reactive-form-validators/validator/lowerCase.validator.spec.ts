import {FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "lowerCase": "Only lower case are allowed.",
        }
      });
    });

    describe('lowerCaseValidator', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.lowerCase()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.lowerCase()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.lowerCase()(new FormControl(undefined))).toBeNull(); 
        });

      it("Should not error, lowerCase validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'username':['jonathan.feldman'],
            'firstName':'bharat'
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman" })(formGroup.controls.firstName)).toBeNull()
        });

      it("Should not error, lowerCase validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'username':['bharat.patel'],
            'firstName':'BHARAT'
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman" })(formGroup.controls.firstName)).toBeNull()
        });


      it("Should error,  lowerCase validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'username':['jonathan.feldman'],
            'firstName':'BHARAT'
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman" })(formGroup.controls.firstName)).toEqual({'lowerCase':{ message: 'Only lower case are allowed.', refValues: [ 'BHARAT' ] } }); 
        });


      it("Should not error, lowerCase validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'username':['jonathan.feldman'],
            'middleName':'bharat'
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"'})(formGroup.controls.middleName)).toBeNull()
        });

      it("Should not error, lowerCase validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'username':['bharat.patel'],
            'middleName':'BHARAT'
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"'})(formGroup.controls.middleName)).toBeNull()
        });


      it("Should error,  lowerCase validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'username':['jonathan.feldman'],
            'middleName':'BHARAT'
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"'})(formGroup.controls.middleName)).toEqual({'lowerCase':{ message: 'Only lower case are allowed.', refValues: [ 'BHARAT' ] } }); 
        });



      it("Should error, lowerCase validator ",
        () => { 
          expect(RxwebValidators.lowerCase({message:'You can enter only lowerCase letters.'})(new FormControl('BHARAT'))).toEqual({'lowerCase':{ message: 'You can enter only lowerCase letters.', refValues: [ 'BHARAT' ] } }); 
        });




	//end
    });
  });
