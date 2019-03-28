import { oneOf, prop,ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';

export class EmployeeInfo{

    @prop()
    department: string;
    
    @oneOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})
    projectDomains: string;

    @oneOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})
	qualifications: string[];

    @oneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})
    skills: string;

    @oneOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please select atleast 1 hobby"})
    hobbies: string;
}
    describe('Decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "oneOf": "You must select any one option",
          }
        });
      });
      describe('oneOfDecorator', () => {
        it("Should not error, oneOf decorator.",
        () => {
		let employeeInfo = new EmployeeInfo();
        let formGroup = formBuilder.formGroup(employeeInfo);
        formGroup.controls.projectDomains.setValue(["ECommerce", "Banking"]);
        expect(formGroup.controls.projectDomains.errors).toBeNull();
     });
     it("Should error, oneOf decorator.",
     () => {
     let employeeInfo = new EmployeeInfo();
     let formGroup = formBuilder.formGroup(employeeInfo);
     formGroup.controls.projectDomains.setValue([]);
     expect(formGroup.controls.projectDomains.errors).toEqual({'oneOf':{ message: 'You must select any one option', refValues: [ [] ] } });
    });

    it("Should error, oneOf decorator  If you want to apply conditional expression of type 'function'",
    () => {
    let employeeInfo  = new EmployeeInfo ();
    let formGroup = formBuilder.formGroup(employeeInfo);
    formGroup.controls.department.setValue('DotNet');
    formGroup.controls.qualifications.setValue(["Secondary","Senior Secondary"])
    expect(formGroup.controls.qualifications.errors).toBeNull();
   });

   it("Should error, oneOf decorator  If you want to apply conditional expression of type 'function'",
   () => {
   let employeeInfo  = new EmployeeInfo ();
   let formGroup = formBuilder.formGroup(employeeInfo);
   formGroup.controls.department.setValue('C#');
   formGroup.controls.qualifications.setValue(["Secondary","Senior Secondary"])
   expect(formGroup.controls.qualifications.errors).toBeNull();
  });

  it("Should error, oneOf decorator  If you want to apply conditional expression of type 'function'",
  () => {
  let employeeInfo  = new EmployeeInfo ();
  let formGroup = formBuilder.formGroup(employeeInfo);
  formGroup.controls.department.setValue('DotNet');
  formGroup.controls.qualifications.setValue([])
  expect(formGroup.controls.qualifications.errors).toEqual({'oneOf':{ message: 'You must select any one option', refValues: [ [] ] } });
 });
 
 it("Should not error, oneOf decorator  If you want to apply conditional expression of type 'string'",
 () => {
   let employeeInfo  = new EmployeeInfo ();
   let formGroup = formBuilder.formGroup(employeeInfo)
   formGroup.controls.department.setValue('DotNet');
   formGroup.controls.skills.setValue(["MVC","AngularJS","Angular 5"]);
  expect(formGroup.controls.skills.errors).toBeNull();
});

it("Should not error, oneOf decorator  If you want to apply conditional expression of type 'string'",
() => {
 let employeeInfo  = new EmployeeInfo ();
 let formGroup = formBuilder.formGroup(employeeInfo)
 formGroup.controls.department.setValue('C#');
 formGroup.controls.skills.setValue([]);
expect(formGroup.controls.skills.errors).toBeNull();
});


it("Should error, oneOf decorator  If you want to apply conditional expression of type 'string'",
() => {
 let employeeInfo  = new EmployeeInfo ();
 let formGroup = formBuilder.formGroup(employeeInfo)
 formGroup.controls.department.setValue('DotNet');
 formGroup.controls.skills.setValue([]);
 expect(formGroup.controls.skills.errors).toEqual({'oneOf':{ message: 'You must select any one option', refValues: [ [] ] } });
});

it("Should error, oneOf decorator Shows custom message",
() => {
let employeeInfo  = new EmployeeInfo ();
let formGroup = formBuilder.formGroup(employeeInfo);
formGroup.controls.hobbies.setValue([]);
expect(formGroup.controls.hobbies.errors).toEqual({'oneOf':{ message: 'Please select atleast 1 hobby', refValues: [[]] } });
});

    })
  })
