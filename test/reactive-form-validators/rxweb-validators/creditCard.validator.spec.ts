import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "creditCard": "Invalid creditcard no.",
        }
      });
    });

    describe('creditCard', () => {

	      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['Visa'],
            'visaCard':4111111111111111
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:(x,y) => x.cardType == "Visa" ,message:'Invalid Visa Credit Card Number.'})(formGroup.controls.visaCard)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['AmericanExpress'],
            'visaCard':412121211211111
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:(x,y) => x.cardType == "Visa" ,message:'Invalid Visa Credit Card Number.'})(formGroup.controls.visaCard)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'cardType':['Visa'],
            'visaCard':412121211211111
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:(x,y) => x.cardType == "Visa" ,message:'Invalid Visa Credit Card Number.'})(formGroup.controls.visaCard)).toEqual({'creditCard':{ message: 'Invalid Visa Credit Card Number.', refValues: [ 412121211211111,'Visa' ] } }); 
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['Visa'],
            'otherVisaCard':4111111111111111
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "Visa"',message:'Invalid Visa Credit Card Number.'})(formGroup.controls.otherVisaCard)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['AmericanExpress'],
            'otherVisaCard':412121211211111
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "Visa"',message:'Invalid Visa Credit Card Number.'})(formGroup.controls.otherVisaCard)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'cardType':['Visa'],
            'otherVisaCard':412121211211111
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "Visa"',message:'Invalid Visa Credit Card Number.'})(formGroup.controls.otherVisaCard)).toEqual({'creditCard':{ message: 'Invalid Visa Credit Card Number.', refValues: [ 412121211211111,'Visa' ] } }); 
        });

      it("Should not error, Message comes from Reactive Form Config",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['AmericanExpress'],
            'americanExpressCard':371449635398431
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "AmericanExpress"'})(formGroup.controls.americanExpressCard)).toBeNull()
        });

      it("Should not error, Message comes from Reactive Form Config",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['Visa'],
            'americanExpressCard':7144963539843
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "AmericanExpress"'})(formGroup.controls.americanExpressCard)).toBeNull()
        });


      it("Should error, Message comes from Reactive Form Config",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'cardType':['AmericanExpress'],
            'americanExpressCard':7144963539843
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "AmericanExpress"'})(formGroup.controls.americanExpressCard)).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ 7144963539843,'AmericanExpress' ] } }); 
        });

      it("Should not error, If you want to apply conditional validation on 'MaestroCard Card' then you need to add 'card type' input as 'Maestro'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['Maestro'],
            'maestroCard':6759649826438453
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "Maestro"'})(formGroup.controls.maestroCard)).toBeNull()
        });

      it("Should not error, If you want to apply conditional validation on 'MaestroCard Card' then you need to add 'card type' input as 'Maestro'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['Visa'],
            'maestroCard':59649826438453
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "Maestro"'})(formGroup.controls.maestroCard)).toBeNull()
        });


      it("Should error, If you want to apply conditional validation on 'MaestroCard Card' then you need to add 'card type' input as 'Maestro'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'cardType':['Maestro'],
            'maestroCard':59649826438453
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "Maestro"'})(formGroup.controls.maestroCard)).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ 59649826438453,'Maestro' ] } }); 
        });

      it("Should not error, If you want to apply conditional validation on 'JCB Card' then you need to add 'card type' input as 'JCB'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['JCB'],
            'jcbCard':3530111333300000
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "JCB"'})(formGroup.controls.jcbCard)).toBeNull()
        });

      it("Should not error, If you want to apply conditional validation on 'JCB Card' then you need to add 'card type' input as 'JCB'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['Maestro'],
            'jcbCard':301113333000
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "JCB"'})(formGroup.controls.jcbCard)).toBeNull()
        });


      it("Should error, If you want to apply conditional validation on 'JCB Card' then you need to add 'card type' input as 'JCB'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'cardType':['JCB'],
            'jcbCard':301113333000
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "JCB"'})(formGroup.controls.jcbCard)).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ 301113333000,'JCB' ] } }); 
        });

      it("Should not error, If you want to apply conditional validation on 'Discover Card' then you need to add 'card type' input as 'Discover'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['Discover'],
            'discoverCard':6011111111111117
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "Discover"'})(formGroup.controls.discoverCard)).toBeNull()
        });

      it("Should not error, If you want to apply conditional validation on 'Discover Card' then you need to add 'card type' input as 'Discover'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['Maestro'],
            'discoverCard':111111111111
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "Discover"'})(formGroup.controls.discoverCard)).toBeNull()
        });


      it("Should error, If you want to apply conditional validation on 'Discover Card' then you need to add 'card type' input as 'Discover'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'cardType':['Discover'],
            'discoverCard':111111111111
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "Discover"'})(formGroup.controls.discoverCard)).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ 111111111111,'Discover' ] } }); 
        });

      it("Should not error, If you want to apply conditional validation on 'Master Card' then you need to add 'card type' input as 'MasterCard'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['MasterCard'],
            'masterCard':5555555555554444
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "MasterCard"'})(formGroup.controls.masterCard)).toBeNull()
        });

      it("Should not error, If you want to apply conditional validation on 'Master Card' then you need to add 'card type' input as 'MasterCard'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['Maestro'],
            'masterCard':555555554444
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "MasterCard"'})(formGroup.controls.masterCard)).toBeNull()
        });


      it("Should error, If you want to apply conditional validation on 'Master Card' then you need to add 'card type' input as 'MasterCard'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'cardType':['MasterCard'],
            'masterCard':555555554444
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "MasterCard"'})(formGroup.controls.masterCard)).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ 555555554444,'MasterCard' ] } }); 
        });

      it("Should not error, If you want to apply conditional validation on 'Diners Club Card' then you need to add 'card type' input as 'DinersClub'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['DinersClub'],
            'dinersClubCard':30569309025904
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "DinersClub"'})(formGroup.controls.dinersClubCard)).toBeNull()
        });

      it("Should not error, If you want to apply conditional validation on 'Diners Club Card' then you need to add 'card type' input as 'DinersClub'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'cardType':['Maestro'],
            'dinersClubCard':305609025904
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "DinersClub"'})(formGroup.controls.dinersClubCard)).toBeNull()
        });


      it("Should error, If you want to apply conditional validation on 'Diners Club Card' then you need to add 'card type' input as 'DinersClub'.",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'cardType':['DinersClub'],
            'dinersClubCard':305609025904
          });
          expect(RxwebValidators.creditCard({fieldName:'cardType',conditionalExpression:'x => x.cardType == "DinersClub"'})(formGroup.controls.dinersClubCard)).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ 305609025904,'DinersClub' ] } }); 
        });



	//end
    });
  });
})();

