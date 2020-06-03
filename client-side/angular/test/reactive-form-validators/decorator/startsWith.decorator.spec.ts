import { startsWith, ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

	@startsWith({value:'B' }) 
	name: string;

	//If you want to apply conditional expression of type 'function'
	@startsWith({value:'Senior'  ,conditionalExpression:(x,y) => x.name == "Bharat"  }) 
	profession: string;

	//If you want to apply conditional expression of type 'string'
	@startsWith({value:'#'  ,conditionalExpression:'x => x.name =="Bharat"' }) 
	taskId: string;

	@startsWith({value:'R'  ,message:'{{0}} does not starts with `R`' }) 
	company: string;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "startsWith": "Input must starts with a pre defined value",
        }
      });
    });

    describe('startsWithDecorator', () => {

	
	 it("Should not error, startsWith decorator  ",
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

	 it("Should error, startsWith decorator ",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.name.setValue('Mahesh');
        expect(formGroup.controls.name.errors).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 'Mahesh','B' ] } });
     });


    it("Should not error, startsWith decorator  Conditional Expression with type 'function'",
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
    it("Should not error, startsWith decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.name = 'Bhuvan';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.profession.setValue('Software Engineer');
        expect(formGroup.controls.profession.errors).toBeNull();
     });



    it("Should error, startsWith decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.profession.setValue('Project Manager');
        expect(formGroup.controls.profession.errors).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 'Project Manager','Senior' ] } });
     });


    it("Should not error, startsWith decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.taskId.setValue('#12856');
        expect(formGroup.controls.taskId.errors).toBeNull();
     });

    it('taskId value should be "#12856".',
        () => {
        let user = new User();
        user.taskId = '#12856';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.taskId.value).toEqual('#12856');
     });
    it("Should not error, startsWith decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.name = 'Bhuvan';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.taskId.setValue(24673);
        expect(formGroup.controls.taskId.errors).toBeNull();
     });



    it("Should error, startsWith decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.taskId.setValue(16345);
        expect(formGroup.controls.taskId.errors).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 16345,'#' ] } });
     });


	 it("Should not error, startsWith decorator  Shows custom message",
        () => {
		let user = new User();
        user.company = undefined;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.company.errors).toBeNull();
     });

    it('company value should be "Reliance Industries".',
        () => {
        let user = new User();
        user.company = 'Reliance Industries';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.company.value).toEqual('Reliance Industries');
     });

	 it("Should error, startsWith decorator Shows custom message",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.company.setValue('Microsoft Corporation');
        expect(formGroup.controls.company.errors).toEqual({'startsWith':{ message: 'Microsoft Corporation does not starts with `R`', refValues: [ 'Microsoft Corporation','R' ] } });
     });



	//end
    });
  });
