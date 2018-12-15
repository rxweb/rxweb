
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  time,prop, } from    '../../../packages/reactive-form-validators';  

export class AttandanceDetail {

	@prop()
	entryPlace: string;

	//If you want to apply conditional expression of type 'function'
	@time({conditionalExpression:(x,y) => x.entryPlace == "Lunch Room"  }) 
	totalIn: string;

	//If you want to apply conditional expression of type 'string'
	@time({conditionalExpression:'x => x.entryPlace == "Lunch Room"' }) 
	entryTime: string;

	@time({allowSeconds:true }) 
	totalOutTime: string;

	@time({message:'You can enter only time format data' }) 
	exitTime: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "time": "Please enter proper time format",
        }
      });
    });

    describe('timeDecorator', () => {

	
    it("Should not error, time decorator  Conditional Expression with type 'function'",
        () => {
		let attandanceDetail = new AttandanceDetail();
		attandanceDetail.entryPlace = 'Lunch Room';
        let formGroup = formBuilder.formGroup(attandanceDetail);
        formGroup.controls.totalIn.setValue('12:30');
        expect(formGroup.controls.totalIn.errors).toBeNull();
     });

    it('totalIn value should be "12:30".',
        () => {
        let attandanceDetail = new AttandanceDetail();
        attandanceDetail.totalIn = '12:30';
        let formGroup = formBuilder.formGroup(attandanceDetail);
        expect(formGroup.controls.totalIn.value).toEqual('12:30');
     });
    it("Should not error, time decorator  Conditional Expression with type 'function'",
        () => {
		let attandanceDetail = new AttandanceDetail();
		attandanceDetail.entryPlace = 'Conference Room';
        let formGroup = formBuilder.formGroup(attandanceDetail);
        formGroup.controls.totalIn.setValue(12);
        expect(formGroup.controls.totalIn.errors).toBeNull();
     });



    it("Should error, time decorator Conditional Expression with type 'function'",
        () => {
		let attandanceDetail = new AttandanceDetail();
		attandanceDetail.entryPlace = 'Lunch Room';
        let formGroup = formBuilder.formGroup(attandanceDetail);
        formGroup.controls.totalIn.setValue(10);
        expect(formGroup.controls.totalIn.errors).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ 10 ] } });
     });


    it("Should not error, time decorator  Conditional Expression with type 'string'",
        () => {
		let attandanceDetail = new AttandanceDetail();
		attandanceDetail.entryPlace = 'Lunch Room';
        let formGroup = formBuilder.formGroup(attandanceDetail);
        formGroup.controls.entryTime.setValue('10:00');
        expect(formGroup.controls.entryTime.errors).toBeNull();
     });

    it('entryTime value should be "10:00".',
        () => {
        let attandanceDetail = new AttandanceDetail();
        attandanceDetail.entryTime = '10:00';
        let formGroup = formBuilder.formGroup(attandanceDetail);
        expect(formGroup.controls.entryTime.value).toEqual('10:00');
     });
    it("Should not error, time decorator  Conditional Expression with type 'string'",
        () => {
		let attandanceDetail = new AttandanceDetail();
		attandanceDetail.entryPlace = 'HR Cabin';
        let formGroup = formBuilder.formGroup(attandanceDetail);
        formGroup.controls.entryTime.setValue(10);
        expect(formGroup.controls.entryTime.errors).toBeNull();
     });



    it("Should error, time decorator Conditional Expression with type 'string'",
        () => {
		let attandanceDetail = new AttandanceDetail();
		attandanceDetail.entryPlace = 'Lunch Room';
        let formGroup = formBuilder.formGroup(attandanceDetail);
        formGroup.controls.entryTime.setValue(13);
        expect(formGroup.controls.entryTime.errors).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ 13 ] } });
     });


	 it("Should not error, time decorator  Allow seconds.",
        () => {
		let attandanceDetail = new AttandanceDetail();
        attandanceDetail.totalOutTime = undefined;
        let formGroup = formBuilder.formGroup(attandanceDetail);
        expect(formGroup.controls.totalOutTime.errors).toBeNull();
     });

    it('totalOutTime value should be "12:30:34".',
        () => {
        let attandanceDetail = new AttandanceDetail();
        attandanceDetail.totalOutTime = '12:30:34';
        let formGroup = formBuilder.formGroup(attandanceDetail);
        expect(formGroup.controls.totalOutTime.value).toEqual('12:30:34');
     });

	 it("Should error, time decorator Allow seconds.",
        () => {
		let attandanceDetail = new AttandanceDetail();
        let formGroup = formBuilder.formGroup(attandanceDetail);
		formGroup.controls.totalOutTime.setValue('12:23');
        expect(formGroup.controls.totalOutTime.errors).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ '12:23' ] } });
     });



	 it("Should error, time decorator Shows Custom Validation Message.",
        () => {
		let attandanceDetail = new AttandanceDetail();
        let formGroup = formBuilder.formGroup(attandanceDetail);
		formGroup.controls.exitTime.setValue('10@');
        expect(formGroup.controls.exitTime.errors).toEqual({'time':{ message: 'You can enter only time format data', refValues: [ '10@' ] } });
     });



	//end
    });
  });
})();
