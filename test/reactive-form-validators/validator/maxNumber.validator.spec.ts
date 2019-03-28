import { FormBuilder,  FormControl} from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '@rxweb/reactive-form-validators';

  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "maxNumber": "Maximum number is not matched.",
        }
      });
    });

    describe('maxNumberValidator', () => {

      it('should not error on an empty string.',
        () => {
          expect(RxwebValidators.maxNumber()(new FormControl(''))).toBeNull();
        });

      it('should not error on null.',
        () => {
          expect(RxwebValidators.maxNumber()(new FormControl(null))).toBeNull();
        });

      it('should not error on undefined.',
        () => {
          expect(RxwebValidators.maxNumber()(new FormControl(undefined))).toBeNull();
        });

        it("Should not error, maxNumber validator If you enter a value which is less than a mentioned maximum number",
        () => { 
          expect(RxwebValidators.maxNumber({value:50})(new FormControl(45))).toBeNull(); 
        });
      
        it("Should error, maxNumber validator If you enter a value which is greater than a mentioned maximum number",
        () => { 
          expect(RxwebValidators.maxNumber({value:50})(new FormControl(55))).toEqual({'maxNumber':{ message: 'Maximum number is not matched.', refValues: [ 55,50 ] } }); 
        });

        it("Should not error, maxNumber validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode': '8CS5A',
            'maximumMarks': 90
          });
          expect(RxwebValidators.maxNumber({ value:100,conditionalExpression: (x, y) => x.subjectCode == "8CS5A" })(formGroup.controls.maximumMarks)).toBeNull()
        });

        it("Should not error, maxNumber validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode': '9CS5A',
            'maximumMarks': 110
          });
          expect(RxwebValidators.maxNumber({ value:100,conditionalExpression: (x, y) => x.subjectCode == "8CS5A" })(formGroup.controls.maximumMarks)).toBeNull()
        });

        it("Should error, maxNumber validator Conditional Expression with type 'function'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode': '8CS5A',
            'maximumMarks': 110
          });
          expect(RxwebValidators.maxNumber({ value:100,conditionalExpression: (x, y) => x.subjectCode == "8CS5A" })(formGroup.controls.maximumMarks)).toEqual({ 'maxNumber': { message: 'Maximum number is not matched.', refValues: [110,100] } }); 
        });

        it("Should not error, maxNumber validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode': '8CS5A',
            'obtainedMarks': 90
          });
          expect(RxwebValidators.maxNumber({ value:100,conditionalExpression: 'x => x.subjectCode == "8CS5A"' })(formGroup.controls.obtainedMarks)).toBeNull()
        });

        it("Should not error, maxNumber validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode': '9CS5A',
            'obtainedMarks': 110
          });
          expect(RxwebValidators.maxNumber({ value:100,conditionalExpression: 'x => x.subjectCode == "8CS5A"' })(formGroup.controls.obtainedMarks)).toBeNull()
        });

        it("Should error, maxNumber validator Conditional Expression with type 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode': '8CS5A',
            'obtainedMarks': 110
          });
          expect(RxwebValidators.maxNumber({ value:100,conditionalExpression: 'x => x.subjectCode == "8CS5A"' })(formGroup.controls.obtainedMarks)).toEqual({ 'maxNumber': { message: 'Maximum number is not matched.', refValues: [110,100] } }); 
        });

        it("Should error, maxNumber validator Shows custom message",
        () => {
          expect(RxwebValidators.maxNumber({ value:70, message: '{{0}} exceeds the Maximum marks Limit' })(new FormControl(80))).toEqual({ 'maxNumber': { message: '80 exceeds the Maximum marks Limit', refValues: [80,70] } });
        });
      //end
    });

});
