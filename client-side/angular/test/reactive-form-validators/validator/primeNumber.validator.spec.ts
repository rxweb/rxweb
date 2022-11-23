import {FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "primeNumber": "Please enter a valid prime number",
        }
      });
    });

    describe('primeNumberValidator', () => {

	      it("Should not error, primeNumber validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'numberType':['Prime'],
            'secondNumber':17
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime" })(formGroup.controls.secondNumber)).toBeNull()
        });

      it("Should not error, primeNumber validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'numberType':['Composite'],
            'secondNumber':15
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime" })(formGroup.controls.secondNumber)).toBeNull()
        });


      it("Should error,  primeNumber validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'numberType':['Prime'],
            'secondNumber':12
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime" })(formGroup.controls.secondNumber)).toEqual({'primeNumber':{ message: 'Please enter a valid prime number', refValues: [ 12 ] } }); 
        });


      it("Should not error, primeNumber validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'numberType':['Prime'],
            'thirdNumber':17
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"'})(formGroup.controls.thirdNumber)).toBeNull()
        });

      it("Should not error, primeNumber validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'numberType':['Composite'],
            'thirdNumber':15
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"'})(formGroup.controls.thirdNumber)).toBeNull()
        });


      it("Should error,  primeNumber validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'numberType':['Prime'],
            'thirdNumber':12
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"'})(formGroup.controls.thirdNumber)).toEqual({'primeNumber':{ message: 'Please enter a valid prime number', refValues: [ 12 ] } }); 
        });



      it("Should error, primeNumber validator Shows custom message.",
        () => { 
          expect(RxwebValidators.primeNumber({message:'{{0}} is not a prime number'})(new FormControl(20))).toEqual({'primeNumber':{ message: '20 is not a prime number', refValues: [ 20 ] } }); 
        });




	//end
    });
  });
