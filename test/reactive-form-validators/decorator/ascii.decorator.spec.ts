import {  ascii,prop, } from "../../../packages/reactive-form-validators";

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


export class User {

	@prop()
	language: string;

	//If you want to apply conditional expression of type 'function'
	@ascii({conditionalExpression:(x,y) => x.language == "Java"  }) 
	numberAsciiCode: string;

	//If you want to apply conditional expression of type 'string'
	@ascii({conditionalExpression:'x => x.language =="Java"' }) 
	alphabetAsciiCode: string;

	@ascii({message:'{{0}} is not an Ascii Code' }) 
	specialCharAsciiCode: string;

}
(function() {
    describe('Decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "ascii": "Please enter an ascii code",
          }
        });
      });

      describe('asciiDecorator', () => {
     
        
      it("Should not error, ascii decorator  If you want to apply conditional expression of type 'function'",
          () => {
          let user  = new User ();
          user.language = 'Java';
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.numberAsciiCode.setValue('65');
          expect(formGroup.controls.numberAsciiCode.errors).toBeNull();
       });
  
      it("Should not error, ascii decorator  If you want to apply conditional expression of type 'function'",
          () => {
          let user  = new User ();
          user.language = 'C#';
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.numberAsciiCode.setValue('中國哲學');
          expect(formGroup.controls.numberAsciiCode.errors).toBeNull();
       });

      it("Should error, ascii decorator  If you want to apply conditional expression of type 'function'",
          () => {
          let user  = new User ();
          user.language = 'Java';
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.numberAsciiCode.setValue('中國哲學');
          expect(formGroup.controls.numberAsciiCode.errors).toEqual({'ascii':{ message: 'Please enter an ascii code', refValues: [ '中國哲學' ] } });
         });
       
  
  
      it("Should not error, ascii decorator  If you want to apply conditional expression of type 'string'",
          () => {
            let user  = new User ();
            user.language = 'Java';
            let formGroup = formBuilder.formGroup(user);
            formGroup.controls.alphabetAsciiCode.setValue('65');
           expect(formGroup.controls.alphabetAsciiCode.errors).toBeNull();
       });
  
      it("Should not error, ascii decorator  If you want to apply conditional expression of type 'string'",
          () => {
            let user  = new User ();
            user.language = 'C#';
            let formGroup = formBuilder.formGroup(user);
            formGroup.controls.alphabetAsciiCode.setValue('中國哲學');
            expect(formGroup.controls.alphabetAsciiCode.errors).toBeNull();
       });
      it("Should error, ascii decorator  If you want to apply conditional expression of type 'string'",
          () => {
            let user  = new User ();
            user.language = 'Java';
            let formGroup = formBuilder.formGroup(user);
            formGroup.controls.alphabetAsciiCode.setValue('中國哲學');
           expect(formGroup.controls.alphabetAsciiCode.errors).toEqual({'ascii':{ message: 'Please enter an ascii code', refValues: [ '中國哲學' ] } });
       });
  
       it("Should error, ascii decorator Shows custom message",
          () => {
          let user  = new User ();
          let formGroup = formBuilder.formGroup(user );
          formGroup.controls.specialCharAsciiCode.setValue('中國哲學');
          expect(formGroup.controls.specialCharAsciiCode.errors).toEqual({'ascii':{ message: '中國哲學 is not an Ascii Code', refValues: [ '中國哲學' ] } });
       });
  
      //end
      });
    });
})();
