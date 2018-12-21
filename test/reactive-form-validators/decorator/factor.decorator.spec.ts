import {  factor ,prop } from   '../../../packages/reactive-form-validators'; 

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


export class User {

	@prop()
	firstNumber: number;

	@factor({fieldName:'firstNumber' }) 
	fifthNumber: number;

	//If you want to apply conditional expression of type 'function'
	@factor({fieldName:'firstNumber'  ,conditionalExpression:(x,y) =>x.firstNumber == 25  }) 
	secondNumber: number;

	//If you want to apply conditional expression of type 'string'
	@factor({fieldName:'firstNumber'  ,conditionalExpression:'x => x.firstNumber == 25' }) 
	thirdNumber: number;

	@factor({dividend:50 }) 
	fourthNumber: number;

	@factor({dividend:30  ,message:'{{0}} is not a factor of 50' }) 
	sixthNumber: number;

}

(function() {
    describe('Decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "factor": "Please enter valid factors.",
          }
        });
      });
      describe('factorDecorator', () => {
  
      it("Should not error ,factor with diviend",()=>{
        let user  = new User ();
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.fourthNumber.setValue('5');
        expect(formGroup.controls.fourthNumber.errors).toBeNull();
      });

      it("Should error ,factor with diviend",()=>{
        let user  = new User ();
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.fourthNumber.setValue('0');
        expect(formGroup.controls.fourthNumber.errors).toEqual({'factor':{ message: 'Please enter valid factors.', refValues: [ '0' ] } });
      });

      it("Should not error, factor decorator with fieldName",
      () => {
      let user  = new User ();
      user.firstNumber = 25;
      let formGroup = formBuilder.formGroup(user);
      formGroup.controls.fifthNumber.setValue('5');
      expect(formGroup.controls.fifthNumber.errors).toBeNull();
     });

     it("Should error, factor decorator with fieldName",
     () => {
     let user  = new User ();
     user.firstNumber = 25;
     let formGroup = formBuilder.formGroup(user);
     formGroup.controls.fifthNumber.setValue('0');
     expect(formGroup.controls.fifthNumber.errors).toEqual({'factor':{ message: 'Please enter valid factors.', refValues: [ '0' ] } });
    });

     it("Should not error, factor decorator If you want to apply conditional expression of type 'function'",
          () => {
          let user  = new User ();
          user.firstNumber = 25;
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.secondNumber.setValue('1');
          expect(formGroup.controls.secondNumber.errors).toBeNull();
       });
  
      it("Should not error, factor decorator If you want to apply conditional expression of type 'function'",
          () => {
          let user  = new User ();
          user.firstNumber = 20;
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.secondNumber.setValue('0');
          expect(formGroup.controls.secondNumber.errors).toBeNull();
       });

      it("Should error, factor decorator If you want to apply conditional expression of type 'function'",
          () => {
          let user  = new User ();
          user.firstNumber = 25;
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.secondNumber.setValue('0');
          expect(formGroup.controls.secondNumber.errors).toEqual({'factor':{ message: 'Please enter valid factors.', refValues: [ '0' ] } });
         });
       
  
  
      it("Should not error, factor decorator If you want to apply conditional expression of type 'string'",
          () => {
            let user  = new User ();
            user.firstNumber = 25;
            let formGroup = formBuilder.formGroup(user);
            formGroup.controls.thirdNumber.setValue('1');
           expect(formGroup.controls.thirdNumber.errors).toBeNull();
       });
  
      it("Should not error, factor decorator If you want to apply conditional expression of type 'string'",
          () => {
            let user  = new User ();
            user.firstNumber = 20;
            let formGroup = formBuilder.formGroup(user);
            formGroup.controls.thirdNumber.setValue('0');
            expect(formGroup.controls.thirdNumber.errors).toBeNull();
       });
      it("Should error, factor decorator If you want to apply conditional expression of type 'string'",
          () => {
            let user  = new User ();
            user.firstNumber = 25;
            let formGroup = formBuilder.formGroup(user);
            formGroup.controls.thirdNumber.setValue('0');
           expect(formGroup.controls.thirdNumber.errors).toEqual({'factor':{ message: 'Please enter valid factors.', refValues: [ '0' ] } });
       });
  
       it("Should error, factor decorator Shows custom message",
          () => {
          let user  = new User ();
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.sixthNumber.setValue('0');
          expect(formGroup.controls.sixthNumber.errors).toEqual({'factor':{ message: '0 is not a factor of 50', refValues: [ '0' ] } });
       });
  
      //end
      });
    });
})();