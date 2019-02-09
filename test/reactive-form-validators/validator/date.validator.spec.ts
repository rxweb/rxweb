import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function () {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "date": "enter correct date.",
        },
        "baseConfig": {
          "dateFormat": "dmy",
          "seperator": "/"
      }
      });
     
    });

    describe('dateValidator', () => {

      it('should not error on an empty string.',
        () => {
          expect(RxwebValidators.date()(new FormControl(''))).toBeNull();
        });

      it('should not error on null.',
        () => {
          expect(RxwebValidators.date()(new FormControl(null))).toBeNull();
        });

      it('should not error on undefined.',
        () => {
          expect(RxwebValidators.date()(new FormControl(undefined))).toBeNull();
        });

        it("Should not error, valid date value",
        () => { 
          expect(RxwebValidators.date()(new FormControl('31/08/2018'))).toBeNull(); 
        });
      
        it("Should error, invalid date in the FormControl",
        () => { 
          expect(RxwebValidators.date()(new FormControl('2018/02/31'))).toEqual({'date':{ message: 'enter correct date.', refValues: [ '2018/02/31' ] } }); 
        });
        it("Should not error, valid date format in ymd",
        () => { 
          ReactiveFormConfig.set({
            "baseConfig": {
              "dateFormat": "ymd",
              "seperator": "/"
          }
          });
         
          expect(RxwebValidators.date()(new FormControl('2018/02/16'))).toBeNull(); 
        });
        it("Should not error, valid date format in mdy",
        () => { 
          ReactiveFormConfig.set({
            "baseConfig": {
              "dateFormat": "mdy",
              "seperator": "/"
          }
          });
         
          expect(RxwebValidators.date()(new FormControl('02/16/2018'))).toBeNull(); 
        });
        
        it("Should not error, valid date format in dmy",
        () => { 
          ReactiveFormConfig.set({
            "baseConfig": {
              "dateFormat": "dmy",
              "seperator": "/"
          }
          });
         
          expect(RxwebValidators.date()(new FormControl('16/02/2018'))).toBeNull(); 
        });

        it("Should error, invalid date format in ymd",
        () => { 
          ReactiveFormConfig.set({
            "validationMessage": {
              "date": "enter correct date.",
            },
            "baseConfig": {
              "dateFormat": "ymd",
              "seperator": "/"
          }
          });
          expect(RxwebValidators.date()(new FormControl('2018/16/16'))).toEqual({'date':{ message: 'enter correct date.', refValues: [ '2018/16/16' ] } }); 
        });
        it("Should error, invalid date format in mdy",
        () => { 
          ReactiveFormConfig.set({
            "validationMessage": {
              "date": "enter correct date.",
            },
            "baseConfig": {
              "dateFormat": "mdy",
              "seperator": "/"
          }
          });
         
          expect(RxwebValidators.date()(new FormControl('02/32/2018'))).toEqual({'date':{ message: 'enter correct date.', refValues: [ '02/32/2018' ] } }); 
        });
        
        it("Should error, invalid date format in dmy",
        () => { 
          ReactiveFormConfig.set({
            "validationMessage": {
              "date": "enter correct date.",
            },
            "baseConfig": {
              "dateFormat": "dmy",
              "seperator": "/"
          }
          });
         
          expect(RxwebValidators.date()(new FormControl('16/20/2018'))).toEqual({'date':{ message: 'enter correct date.', refValues: [ '16/20/2018' ] } }); 
        });

      //end
    });

  });
  })();
