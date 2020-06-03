import { lessThan, prop, ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

	@prop()
	obtainedMarks: number;

	@lessThan({fieldName:'obtainedMarks' }) 
	otherActivityMarks: number;

	//If you want to apply conditional expression of type 'function'
	@lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:(x,y) =>  x.obtainedMarks < 35 }) 
	practicalExamMarks: number;

	//If you want to apply conditional expression of type 'string'
	@lessThan({fieldName:'obtainedMarks'  ,conditionalExpression:'x => x.obtainedMarks < 35' }) 
	passingMarks: number;

	@lessThan({fieldName:'obtainedMarks'  ,message:'Please enter number greater than 100.' }) 
	otherMarks: number;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "lessThan": "value should be less than field",
        }
      });
    });

    describe('lessThanDecorator', () => {

	
    it("Should not error, lessThan decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.obtainedMarks = 34;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.practicalExamMarks.setValue(30);
        expect(formGroup.controls.practicalExamMarks.errors).toBeNull();
     });

    it('practicalExamMarks value should be "30".',
        () => {
        let user = new User();
        user.practicalExamMarks = 30;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.practicalExamMarks.value).toEqual(30);
     });
    it("Should not error, lessThan decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.obtainedMarks = 10;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.practicalExamMarks.setValue(8);
        expect(formGroup.controls.practicalExamMarks.errors).toBeNull();
     });



    it("Should error, lessThan decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.obtainedMarks = 34;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.practicalExamMarks.setValue(105);
        expect(formGroup.controls.practicalExamMarks.errors).toEqual({'lessThan':{ message: 'value should be less than field', refValues: [ 105,34 ] } });
     });


    it("Should not error, lessThan decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.obtainedMarks = 34;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.passingMarks.setValue(30);
        expect(formGroup.controls.passingMarks.errors).toBeNull();
     });

    it('passingMarks value should be "30".',
        () => {
        let user = new User();
        user.passingMarks = 30;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.passingMarks.value).toEqual(30);
     });
    it("Should not error, lessThan decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.obtainedMarks = 10;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.passingMarks.setValue(8);
        expect(formGroup.controls.passingMarks.errors).toBeNull();
     });



    it("Should error, lessThan decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.obtainedMarks = 34;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.passingMarks.setValue(105);
        expect(formGroup.controls.passingMarks.errors).toEqual({'lessThan':{ message: 'value should be less than field', refValues: [ 105,34 ] } });
     });



    it("Should error, lessThan decorator Shows custom message",
        () => {
		let user = new User();
		user.obtainedMarks = 100;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.otherMarks.setValue(105);
        expect(formGroup.controls.otherMarks.errors).toEqual({'lessThan':{ message: 'Please enter number greater than 100.', refValues: [ 105,100 ] } });
     });



	//end
    });
  });
