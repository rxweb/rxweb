import { range, ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class EmployeeInfo {

	@range({minimumNumber:18  ,maximumNumber:60 }) 
	age: number;

	//If you want to apply conditional expression of type 'function'
	@range({minimumNumber:6  ,maximumNumber:8  ,conditionalExpression:(x,y) => x.age >= 25  }) 
	projectDuration: number;

	//If you want to apply conditional expression of type 'string'
	@range({minimumNumber:2  ,maximumNumber:20  ,conditionalExpression:'x => x.age >=25' }) 
	experience: number;

	@range({minimumNumber:1000  ,maximumNumber:200000  ,message:'Your Salary should be between 1000 to 200000.' }) 
	salary: number;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "range": "Input value not in range",
        }
      });
    });

    describe('rangeDecorator', () => {

	
	 it("Should not error, range decorator  If you want to apply conditional validation on 'Project Duration' or 'Employee Experience', then you need to add 'Employee Age' input greater than 25",
        () => {
		let employeeInfo = new EmployeeInfo();
        employeeInfo.age = undefined;
        let formGroup = formBuilder.formGroup(employeeInfo);
        expect(formGroup.controls.age.errors).toBeNull();
     });

    it('age value should be "20".',
        () => {
        let employeeInfo = new EmployeeInfo();
        employeeInfo.age = 20;
        let formGroup = formBuilder.formGroup(employeeInfo);
        expect(formGroup.controls.age.value).toEqual(20);
     });

	 it("Should error, range decorator If you want to apply conditional validation on 'Project Duration' or 'Employee Experience', then you need to add 'Employee Age' input greater than 25",
        () => {
		let employeeInfo = new EmployeeInfo();
        let formGroup = formBuilder.formGroup(employeeInfo);
		formGroup.controls.age.setValue(10);
        expect(formGroup.controls.age.errors).toEqual({'range':{ message: 'Input value not in range', refValues: [ 10,18,60 ] } });
     });


    it("Should not error, range decorator  Conditional Expression with type 'function'",
        () => {
		let employeeInfo = new EmployeeInfo();
		employeeInfo.age = 30;
        let formGroup = formBuilder.formGroup(employeeInfo);
        formGroup.controls.projectDuration.setValue(7);
        expect(formGroup.controls.projectDuration.errors).toBeNull();
     });

    it('projectDuration value should be "7".',
        () => {
        let employeeInfo = new EmployeeInfo();
        employeeInfo.projectDuration = 7;
        let formGroup = formBuilder.formGroup(employeeInfo);
        expect(formGroup.controls.projectDuration.value).toEqual(7);
     });
    it("Should not error, range decorator  Conditional Expression with type 'function'",
        () => {
		let employeeInfo = new EmployeeInfo();
		employeeInfo.age = 20;
        let formGroup = formBuilder.formGroup(employeeInfo);
        formGroup.controls.projectDuration.setValue(9);
        expect(formGroup.controls.projectDuration.errors).toBeNull();
     });



    it("Should error, range decorator Conditional Expression with type 'function'",
        () => {
		let employeeInfo = new EmployeeInfo();
		employeeInfo.age = 30;
        let formGroup = formBuilder.formGroup(employeeInfo);
        formGroup.controls.projectDuration.setValue(5);
        expect(formGroup.controls.projectDuration.errors).toEqual({'range':{ message: 'Input value not in range', refValues: [ 5,6,8 ] } });
     });


    it("Should not error, range decorator  Conditional Expression with type 'string'",
        () => {
		let employeeInfo = new EmployeeInfo();
		employeeInfo.age = 26;
        let formGroup = formBuilder.formGroup(employeeInfo);
        formGroup.controls.experience.setValue(10);
        expect(formGroup.controls.experience.errors).toBeNull();
     });

    it('experience value should be "10".',
        () => {
        let employeeInfo = new EmployeeInfo();
        employeeInfo.experience = 10;
        let formGroup = formBuilder.formGroup(employeeInfo);
        expect(formGroup.controls.experience.value).toEqual(10);
     });
    it("Should not error, range decorator  Conditional Expression with type 'string'",
        () => {
		let employeeInfo = new EmployeeInfo();
		employeeInfo.age = 20;
        let formGroup = formBuilder.formGroup(employeeInfo);
        formGroup.controls.experience.setValue(1);
        expect(formGroup.controls.experience.errors).toBeNull();
     });



    it("Should error, range decorator Conditional Expression with type 'string'",
        () => {
		let employeeInfo = new EmployeeInfo();
		employeeInfo.age = 27;
        let formGroup = formBuilder.formGroup(employeeInfo);
        formGroup.controls.experience.setValue(25);
        expect(formGroup.controls.experience.errors).toEqual({'range':{ message: 'Input value not in range', refValues: [ 25,2,20 ] } });
     });


	 it("Should not error, range decorator  Please enter salary between 1000 to 200000",
        () => {
		let employeeInfo = new EmployeeInfo();
        employeeInfo.salary = undefined;
        let formGroup = formBuilder.formGroup(employeeInfo);
        expect(formGroup.controls.salary.errors).toBeNull();
     });

    it('salary value should be "1001".',
        () => {
        let employeeInfo = new EmployeeInfo();
        employeeInfo.salary = 1001;
        let formGroup = formBuilder.formGroup(employeeInfo);
        expect(formGroup.controls.salary.value).toEqual(1001);
     });

	 it("Should error, range decorator Please enter salary between 1000 to 200000",
        () => {
		let employeeInfo = new EmployeeInfo();
        let formGroup = formBuilder.formGroup(employeeInfo);
		formGroup.controls.salary.setValue(20000000);
        expect(formGroup.controls.salary.errors).toEqual({'range':{ message: 'Your Salary should be between 1000 to 200000.', refValues: [ 20000000,1000,200000 ] } });
     });



	//end
    });
  });
