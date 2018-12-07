import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "ascii": "Please enter a valid ascii code",
        }
      });
    });

    describe('ascii', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.ascii()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.ascii()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.ascii()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on any ascii code.',
        () => { 
          expect(RxwebValidators.ascii()(new FormControl('Java'))).toBeNull(); 
        });

      it('should give error if the control contains value other than ascii code.',
        () => { 
          expect(RxwebValidators.ascii()(new FormControl('ʋè'))).toEqual({'ascii':{ message: 'Please enter a valid ascii code', refValues: [ 'ʋè' ] } }); 
        });


	      it('should not give error if the language value is Java and ascii value in numberAsciiCode FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'language':['Java'],
            'numberAsciiCode':[49],
          });
          expect(RxwebValidators.ascii({conditionalExpression:(x,y) => x.language == "Java" })(formGroup.controls.numberAsciiCode)).toBeNull();

        });

	      it('should not give error if the language value is Java and ascii value in alphabetAsciiCode FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'language':['Java'],
            'alphabetAsciiCode':[69],
          });
          expect(RxwebValidators.ascii({conditionalExpression:'x => x.language =="Java"'})(formGroup.controls.alphabetAsciiCode)).toBeNull();

        });

	      it('should not give error if the language value is Angular and non ascii value in alphabetAsciiCode FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'language':['Japanese'],
            'alphabetAsciiCode':['日本語'],
          });
          expect(RxwebValidators.ascii({conditionalExpression:'x => x.language =="Java"'})(formGroup.controls.alphabetAsciiCode)).toBeNull();

        });

	      it('should not give error if the language value is Angular and non ascii value in numberAsciiCode FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'language':['Japanese'],
            'numberAsciiCode':['日本語'],
          });
          expect(RxwebValidators.ascii({conditionalExpression:(x,y) => x.language == "Java" })(formGroup.controls.numberAsciiCode)).toBeNull();

        });


	      it('should give error if the language value is Java and non ascii value in numberAsciiCode FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'language':['Java'],
            'numberAsciiCode':['日本語'],
          });
          expect(RxwebValidators.ascii({conditionalExpression:(x,y) => x.language == "Java" })(formGroup.controls.numberAsciiCode)).toEqual({'ascii':{ message: 'Please enter a valid ascii code', refValues: [ '日本語' ] } });

        });

	      it('should give error if the language value is Java and non ascii value in alphabetAsciiCode FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'language':['Java'],
            'alphabetAsciiCode':['日本語'],
          });
          expect(RxwebValidators.ascii({conditionalExpression:'x => x.language =="Java"'})(formGroup.controls.alphabetAsciiCode)).toEqual({'ascii':{ message: 'Please enter a valid ascii code', refValues: [ '日本語' ] } });

        });




	      it('should give error, if the contained value is non ascii.',
        () => {
          expect(RxwebValidators.ascii({message:'value is not an Ascii Code'})(new FormControl('ʋè'))).toEqual({'ascii':{ message: 'value is not an Ascii Code', refValues: [ 'ʋè' ] } });

        });



//end
    });
  });
})();
