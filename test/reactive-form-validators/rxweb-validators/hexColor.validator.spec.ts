import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "hexColor": "Invalid Hex Color format",
        }
      });
    });

    describe('hexColor', () => {
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

      it('should not give error if the color value is proper hexColor',
        () => { 
          expect(RxwebValidators.hexColor()(new FormControl('#AFAFAF'))).toBeNull(); 
        });

      it('should give error if the color value is not proper hexColor',
        () => { 
          expect(RxwebValidators.hexColor()(new FormControl('AFAF'))).toEqual({'hexColor':{ message: 'Invalid Hex Color format', refValues: [ 'AFAF' ] } }); 
        });


	      it('should not give error if the color is #AFAFAF in footerHexCode  FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'color':['#AFAFAF'],
            'footerHexCode':['#FF0000'],
          });
          expect(RxwebValidators.hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF"})(formGroup.controls.footerHexCode)).toBeNull();

        });

	      it('should not give error if the color is #AFAFAF in headerHexcolorCode FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'color':['#AFAFAF'],
            'headerHexcolorCode':['#000000'],
          });
          expect(RxwebValidators.hexColor({conditionalExpression:'x => x.color == "#AFAFAF"'})(formGroup.controls.headerHexcolorCode)).toBeNull();

        });

	      it('should not give error if the color is #FFFF00 in footerHexCode FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'color':['#FFFF00'],
            'footerHexCode':['AFAF'],
          });
          expect(RxwebValidators.hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF"})(formGroup.controls.footerHexCode)).toBeNull();

        });

	      it('should not give error if the color is #FFFF00 in headerHexcolorCode FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'color':['#FFFF00'],
            'headerHexcolorCode':['000'],
          });
          expect(RxwebValidators.hexColor({conditionalExpression:'x => x.color == "#AFAFAF"'})(formGroup.controls.headerHexcolorCode)).toBeNull();

        });


	      it('should give error if the color is #AFAFAF value in footerHexCode is not proper hexcolor FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'color':['#AFAFAF'],
            'footerHexCode':['@000'],
          });
          expect(RxwebValidators.hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF"})(formGroup.controls.footerHexCode)).toEqual({'hexColor':{ message: 'Invalid Hex Color format', refValues: [ '@000' ] } });

        });

	      it('should give error if the color is #AFAFAF and value in headerHexcolorCode is not proper hexcolor FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'color':['#AFAFAF'],
            'headerHexcolorCode':['AFAF'],
          });
          expect(RxwebValidators.hexColor({conditionalExpression:'x => x.color == "#AFAFAF"'})(formGroup.controls.headerHexcolorCode)).toEqual({'hexColor':{ message: 'Invalid Hex Color format', refValues: [ 'AFAF' ] } });

        });




	      it('should give error if the bodyHexcolorCode value is not proper hexColor',
        () => {
          expect(RxwebValidators.hexColor({message:'Please enter the right format of hexcode for body like "#AFAFAF"'})(new FormControl('AFAF'))).toEqual({'hexColor':{ message: 'Please enter the right format of hexcode for body like "#AFAFAF"', refValues: [ 'AFAF' ] } });

        });



//end
    });
  });
})();
