import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "hexColor": "Invalid Hex Color format",
        }
      });
    });

    describe('hexColorValidator', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.hexColor()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.hexColor()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.hexColor()(new FormControl(undefined))).toBeNull(); 
        });

      it("Should not error, hexColor validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'color':['#AFAFAF'],
            'footerHexCode':'#008083'
          });
          expect(RxwebValidators.hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF"})(formGroup.controls.footerHexCode)).toBeNull()
        });

      it("Should not error, hexColor validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'color':['#e33514'],
            'footerHexCode':'#08083'
          });
          expect(RxwebValidators.hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF"})(formGroup.controls.footerHexCode)).toBeNull()
        });


      it("Should error,  hexColor validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'color':['#AFAFAF'],
            'footerHexCode':'#08083'
          });
          expect(RxwebValidators.hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF"})(formGroup.controls.footerHexCode)).toEqual({'hexColor':{ message: 'Invalid Hex Color format', refValues: [ '#08083' ] } }); 
        });


      it("Should not error, hexColor validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'color':['#AFAFAF'],
            'headerHexcolorCode':'#008083'
          });
          expect(RxwebValidators.hexColor({conditionalExpression:'x => x.color == "#AFAFAF"'})(formGroup.controls.headerHexcolorCode)).toBeNull()
        });

      it("Should not error, hexColor validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'color':['#e33514'],
            'headerHexcolorCode':'#08083'
          });
          expect(RxwebValidators.hexColor({conditionalExpression:'x => x.color == "#AFAFAF"'})(formGroup.controls.headerHexcolorCode)).toBeNull()
        });


      it("Should error,  hexColor validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'color':['#AFAFAF'],
            'headerHexcolorCode':'#08083'
          });
          expect(RxwebValidators.hexColor({conditionalExpression:'x => x.color == "#AFAFAF"'})(formGroup.controls.headerHexcolorCode)).toEqual({'hexColor':{ message: 'Invalid Hex Color format', refValues: [ '#08083' ] } }); 
        });



      it("Should error, hexColor validator Shows custom message",
        () => { 
          expect(RxwebValidators.hexColor({message:'Please enter the right format of hexcode for body like "#AFAFAF"'})(new FormControl('#08083'))).toEqual({'hexColor':{ message: 'Please enter the right format of hexcode for body like "#AFAFAF"', refValues: [ '#08083' ] } }); 
        });




	//end
    });
  });
})();
