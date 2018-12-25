import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';


(function() {
    describe('Validator', () => {
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "factor": "Enter valid factors.",
          }
        });
      });  
      
      describe('factorValidator', () => {

        it('should not error ,apply dividend.',
      () => { 
        expect(RxwebValidators.factor({dividend:50 })(new FormControl('1'))).toBeNull();
      });
      it('should error ,apply dividend.',
      () => { 
        expect(RxwebValidators.factor({dividend:50 })(new FormControl('0'))).toEqual({'factor':{ message: 'Enter valid factors.', refValues: [ '0' ] } }); 
      });

      
      it("Should not error, factor validator based on fieldName",
      () => {
       let formBuilder = new FormBuilder();
       let formGroup = formBuilder.group({
         'firstNumber':'25',
         'fifthNumber':'1'
       });
       expect(RxwebValidators.factor({fieldName:'firstNumber'})(formGroup.controls.fifthNumber)).toBeNull()
     });

  
    it("Should error, factor validator based on fieldName",
       () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
          'firstNumber':'25',
          'fifthNumber':'0'
        });
        expect(RxwebValidators.factor({fieldName:'firstNumber'})(formGroup.controls.fifthNumber)).toEqual({'factor':{ message: 'Enter valid factors.', refValues: [ '0' ] } }); 
      });

    it("Should not error,factor validator Conditional Expression with type 'function'",
       () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
          'firstNumber':'25',
          'secondNumber':'5'
        });
        expect(RxwebValidators.factor({fieldName:'firstNumber'  ,conditionalExpression:(x,y) =>x.firstNumber == 25  })(formGroup.controls.secondNumber)).toBeNull()
      });


      it("Should not error, factor validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
              'firstNumber': '20',
              'secondNumber': '0'
            });
            expect(RxwebValidators.factor({fieldName:'firstNumber'  ,conditionalExpression:(x,y) =>x.firstNumber == 25  })(formGroup.controls.secondNumber)).toBeNull()
          });
  
        it("Should error, factor validator Conditional Expression with type 'function'",
          () => {
            let formBuilder = new FormBuilder();
            let formGroup = formBuilder.group({
                'firstNumber':'25',
                'secondNumber':'0'
            });
            expect(RxwebValidators.factor({fieldName:'firstNumber'  ,conditionalExpression:(x,y) =>x.firstNumber == 25  })(formGroup.controls.secondNumber)).toEqual({ 'factor': { message: 'Enter valid factors.', refValues: ['0'] } });
          });



    it("Should not error, factor validator Conditional Expression with type 'string'",
       () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
         'firstNumber': '25',
          'thirdNumber':'5'
        });
        expect(RxwebValidators.factor({fieldName:'firstNumber'  ,conditionalExpression:'x => x.firstNumber == 25' })(formGroup.controls.thirdNumber)).toBeNull()
      });

    it("Should not error, factor validator Conditional Expression with type 'string'",
       () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
            'firstNumber': '20',
            'thirdNumber':'0'
        });
        expect(RxwebValidators.factor({fieldName:'firstNumber'  ,conditionalExpression:'x => x.firstNumber == 25' })(formGroup.controls.thirdNumber)).toBeNull()
      });


    it("Should error,factor validator Conditional Expression with type 'string'",
       () => {
        let formBuilder = new FormBuilder();
        let formGroup = formBuilder.group({
            'firstNumber': '25',
            'thirdNumber':'0'
        });
        expect(RxwebValidators.factor({fieldName:'firstNumber'  ,conditionalExpression:'x => x.firstNumber == 25' })(formGroup.controls.thirdNumber)).toEqual({'factor':{ message: 'Enter valid factors.', refValues: [ '0' ] } }); 
      });



    it("Should error,factor validator Shows custom message",
      () => { 
        expect(RxwebValidators.factor({dividend:30  ,message:'{{0}} is not a factor of 50' })(new FormControl('0'))).toEqual({'factor':{ message: '0 is not a factor of 50', refValues: [ '0' ] } }); 
      });




  //end
    });
    });
})();