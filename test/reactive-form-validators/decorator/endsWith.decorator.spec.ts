
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  endsWith, } from    '../../../packages/reactive-form-validators';  

export class User {

	@endsWith({value:'t' }) 
	name: string;

	//If you want to apply conditional expression of type 'function'
	@endsWith({value:'r'  ,conditionalExpression:(x,y) => x.name == "Bharat"  }) 
	profession: string;

	//If you want to apply conditional expression of type 'string'
	@endsWith({value:'1'  ,conditionalExpression:'x => x.name =="Bharat"' }) 
	taskId: string;

	@endsWith({value:'b'  ,message:'{{0}} does not ends with `b`' }) 
	company: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "endsWith": "Input must ends with a pre defined value",
        }
      });
    });

    describe('endsWithDecorator', () => {

	
	 it("Should not error, endsWith decorator  If you want to apply conditional validation on 'Profession' or 'Task Id', then you need to add 'name' input as 'Bharat'",
        () => {
		let user = new User();
        user.name = undefined;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.name.errors).toBeNull();
     });

    it('name value should be "Bharat".',
        () => {
        let user = new User();
        user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.name.value).toEqual('Bharat');
     });

	 it("Should error, endsWith decorator If you want to apply conditional validation on 'Profession' or 'Task Id', then you need to add 'name' input as 'Bharat'",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.name.setValue('Mahesh');
        expect(formGroup.controls.name.errors).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ 'Mahesh','t' ] } });
     });


    it("Should not error, endsWith decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.profession.setValue('Senior Software Engineer');
        expect(formGroup.controls.profession.errors).toBeNull();
     });

    it('profession value should be "Senior Software Engineer".',
        () => {
        let user = new User();
        user.profession = 'Senior Software Engineer';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.profession.value).toEqual('Senior Software Engineer');
     });
    it("Should not error, endsWith decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.name = 'Bhuvan';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.profession.setValue('Tech Lead');
        expect(formGroup.controls.profession.errors).toBeNull();
     });



    it("Should error, endsWith decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.profession.setValue('Architect');
        expect(formGroup.controls.profession.errors).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ 'Architect','r' ] } });
     });


    it("Should not error, endsWith decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.taskId.setValue('#128561');
        expect(formGroup.controls.taskId.errors).toBeNull();
     });

    it('taskId value should be "#128561".',
        () => {
        let user = new User();
        user.taskId = '#128561';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.taskId.value).toEqual('#128561');
     });
    it("Should not error, endsWith decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.name = 'Bhuvan';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.taskId.setValue('#24673');
        expect(formGroup.controls.taskId.errors).toBeNull();
     });



    it("Should error, endsWith decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.taskId.setValue('#16345');
        expect(formGroup.controls.taskId.errors).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ '#16345','1' ] } });
     });


	 it("Should not error, endsWith decorator  Shows custom message",
        () => {
		let user = new User();
        user.company = undefined;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.company.errors).toBeNull();
     });

    it('company value should be "Oral b".',
        () => {
        let user = new User();
        user.company = 'Oral b';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.company.value).toEqual('Oral b');
     });

	 it("Should error, endsWith decorator Shows custom message",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.company.setValue('Microsoft Corporation');
        expect(formGroup.controls.company.errors).toEqual({'endsWith':{ message: 'Microsoft Corporation does not ends with `b`', refValues: [ 'Microsoft Corporation','b' ] } });
     });



	//end
    });
  });
})();
