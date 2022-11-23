import { noneOf, prop,ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';

export class EmployeeInfo{

    @prop()
    department: string;
    
    @noneOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})
    projectDomains: string;

    @noneOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})
	qualifications: string[];

    @noneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})
    skills: string;

    @noneOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please do not select any hobby"})
    hobbies: string;
}
    describe('Decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "noneOf": "You can not select any option",
          }
        });
      });
      describe('noneOfDecorator', () => {
        it("Should not error, noneOf decorator.",
        () => {
		let employeeInfo = new EmployeeInfo();
        let formGroup = formBuilder.formGroup(employeeInfo);
        formGroup.controls.projectDomains.setValue([]);
        expect(formGroup.controls.projectDomains.errors).toBeNull();
     });

     it("Should error, noneOf decorator.",
     () => {
     let employeeInfo = new EmployeeInfo();
     let formGroup = formBuilder.formGroup(employeeInfo);
     formGroup.controls.projectDomains.setValue(["ECommerce", "Banking"]);
     expect(formGroup.controls.projectDomains.errors).toEqual({'noneOf':{ message: 'You can not select any option', refValues: [ ["ECommerce","Banking"] ] } });
    });

    it("Should error, noneOf decorator  If you want to apply conditional expression of type 'function'",
    () => {
    let employeeInfo  = new EmployeeInfo ();
    let formGroup = formBuilder.formGroup(employeeInfo);
    formGroup.controls.department.setValue('DotNet');
    formGroup.controls.qualifications.setValue([])
    expect(formGroup.controls.qualifications.errors).toBeNull();
   });

   it("Should error, noneOf decorator  If you want to apply conditional expression of type 'function'",
   () => {
   let employeeInfo  = new EmployeeInfo ();
   let formGroup = formBuilder.formGroup(employeeInfo);
   formGroup.controls.department.setValue('C#');
   formGroup.controls.qualifications.setValue(["Secondary","Senior Secondary"])
   expect(formGroup.controls.qualifications.errors).toBeNull();
  });

  it("Should error, noneOf decorator  If you want to apply conditional expression of type 'function'",
  () => {
  let employeeInfo  = new EmployeeInfo ();
  let formGroup = formBuilder.formGroup(employeeInfo);
  formGroup.controls.department.setValue('DotNet');
  formGroup.controls.qualifications.setValue(["Secondary","Senior Secondary"])
  expect(formGroup.controls.qualifications.errors).toEqual({'noneOf':{ message: 'You can not select any option', refValues: [ ["Secondary","Senior Secondary"] ] } });
 });
 
 it("Should not error, noneOf decorator  If you want to apply conditional expression of type 'string'",
 () => {
   let employeeInfo  = new EmployeeInfo ();
   let formGroup = formBuilder.formGroup(employeeInfo)
   formGroup.controls.department.setValue('DotNet');
   formGroup.controls.skills.setValue([]);
  expect(formGroup.controls.skills.errors).toBeNull();
});

it("Should not error, noneOf decorator  If you want to apply conditional expression of type 'string'",
() => {
 let employeeInfo  = new EmployeeInfo ();
 let formGroup = formBuilder.formGroup(employeeInfo)
 formGroup.controls.department.setValue('C#');
 formGroup.controls.skills.setValue(["MVC","AngularJS","Angular 5"]);
expect(formGroup.controls.skills.errors).toBeNull();
});


it("Should not error, noneOf decorator  If you want to apply conditional expression of type 'string'",
() => {
 let employeeInfo  = new EmployeeInfo ();
 let formGroup = formBuilder.formGroup(employeeInfo)
 formGroup.controls.department.setValue('DotNet');
 formGroup.controls.skills.setValue(["MVC","AngularJS","Angular 5"]);
 expect(formGroup.controls.skills.errors).toEqual({'noneOf':{ message: 'You can not select any option', refValues: [ ["MVC","AngularJS","Angular 5"] ] } });
});

it("Should error, noneOf decorator Shows custom message",
() => {
let employeeInfo  = new EmployeeInfo ();
let formGroup = formBuilder.formGroup(employeeInfo);
formGroup.controls.hobbies.setValue(["Drawing", "Singing","Dancing","Travelling"]);
expect(formGroup.controls.hobbies.errors).toEqual({'noneOf':{ message: 'Please do not select any hobby', refValues: [["Drawing", "Singing","Dancing","Travelling"]] } });
});

    })
})
