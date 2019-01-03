import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';


(function () {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "creditCard": "Invalid creditcard no.",
        }
      });
    });

    describe('creditCardValidator', () => {

      it('should not error on an empty string.',
        () => {
          expect(RxwebValidators.creditCard()(new FormControl(''))).toBeNull();
        });

      it('should not error on null.',
        () => {
          expect(RxwebValidators.creditCard()(new FormControl(null))).toBeNull();
        });

      it('should not error on undefined.',
        () => {
          expect(RxwebValidators.creditCard()(new FormControl(undefined))).toBeNull();
        });

      it("Should not error, creditCard validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'Visa',
            'visaCard': '4111111111111111'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: (x, y) => x.cardType == "Visa" })(formGroup.controls.visaCard)).toBeNull()
        });

      it("Should not error, creditCard validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'AmericanExpress',
            'visaCard': '378282246310005'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: (x, y) => x.cardType == "AmericanExpress" })(formGroup.controls.visaCard)).toBeNull()
        });

      it("Should error, creditCard validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'Visa',
            'visaCard': '4111111'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: (x, y) => x.cardType == "Visa" })(formGroup.controls.visaCard)).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['4111111', 'Visa'] } });
        });

      it("Should not error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'Visa',
            'otherVisaCard': '4111111111111111'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "Visa"' })(formGroup.controls.otherVisaCard)).toBeNull()
        });

      it("Should not error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'Visa',
            'otherVisaCard': '41111'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "Visas"' })(formGroup.controls.otherVisaCard)).toBeNull()
        });

      it("Should error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'Visa',
            'otherVisaCard': '41111'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "Visa"' })(formGroup.controls.otherVisaCard)).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['41111', 'Visa'] } });
        });


      it("Should not error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'AmericanExpress',
            'AmericanExpress': '371449635398431'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "AmericanExpress"' })(formGroup.controls.AmericanExpress)).toBeNull()
        });

      it("Should error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'AmericanExpress',
            'AmericanExpress': '371449631'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "AmericanExpress"' })(formGroup.controls.AmericanExpress)).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['371449631', 'AmericanExpress'] } });
        });


      it("Should not error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'Maestro',
            'maestroCard': '6759649826438453'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "Maestros"' })(formGroup.controls.maestroCard)).toBeNull()
        });

      it("Should error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'Maestro',
            'maestroCard': '9649826438453'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "Maestro"' })(formGroup.controls.maestroCard)).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['9649826438453', 'Maestro'] } });
        });


      it("Should not error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'JCB',
            'jcbCard': '3530111333300000'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "JCB"' })(formGroup.controls.jcbCard)).toBeNull()
        });

      it("Should error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'JCB',
            'jcbCard': '35301113'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "JCB"' })(formGroup.controls.jcbCard)).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['35301113', 'JCB'] } });
        });

      it("Should not error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'Discover',
            'discoverCard': '6011111111111117'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "Discover"' })(formGroup.controls.discoverCard)).toBeNull()
        });

      it("Should error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'Discover',
            'discoverCard': '601111111'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "Discover"' })(formGroup.controls.discoverCard)).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['601111111', 'Discover'] } });
        });


      it("Should not error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'DinersClub',
            'dinersClubCard': '38520000023237'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "DinersClub"' })(formGroup.controls.dinersClubCard)).toBeNull()
        });


      it("Should error, creditCard validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'DinersClub',
            'dinersClubCard': '385200000'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: 'x => x.cardType == "DinersClub"' })(formGroup.controls.dinersClubCard)).toEqual({ 'creditCard': { message: 'Invalid creditcard no.', refValues: ['385200000', 'DinersClub'] } });
        });

      it("Should error, creditCard validator Shows custom message",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'Visa',
            'visaCard': '385200000'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType', conditionalExpression: (x, y) => x.cardType == "Visa", message: 'Invalid Visa Credit Card Number.' })(formGroup.controls.visaCard)).toEqual({ 'creditCard': { message: 'Invalid Visa Credit Card Number.', refValues: ['385200000', 'Visa'] } });
        });

      //spec for issue no. #63
      it("Should not error, american express credit card number is correct",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'AmericanExpress',
            'cardNumber': '371449635398431'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType' })(formGroup.controls.cardNumber)).toBeNull()
        });

      it("Should not error, diners club credit card number is correct",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'cardType': 'DinersClub',
            'cardNumber': '30569309025904'
          });
          expect(RxwebValidators.creditCard({ fieldName: 'cardType' })(formGroup.controls.cardNumber)).toBeNull()
        });

    });
  });
})();
