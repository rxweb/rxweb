import { allOf, prop, ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

export class EmployeeInfo{

    @prop()
    department: string;
    
    @allOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})
    projectDomains: string;

    @allOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})
	qualifications: string[];

    @allOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})
    skills: string;

    @allOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please select all hobbies"})
    hobbies: string;
}

    describe('Decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "allOf": "Please select all options",
          }
        });
      });
      describe('allOfDecorator', () => {
        it("Should not error, allOf decorator.",
        () => {
		let employeeInfo = new EmployeeInfo();
        let formGroup = formBuilder.formGroup(employeeInfo);
        formGroup.controls.projectDomains.setValue(["ECommerce", "Banking","Educational","Gaming"]);
        expect(formGroup.controls.projectDomains.errors).toBeNull();
     });

    it('Should error, allOf decorator.',
        () => {
        let employeeInfo = new EmployeeInfo();
        let formGroup = formBuilder.formGroup(employeeInfo);
        formGroup.controls.projectDomains.setValue(["ECommerce","Banking"]);
        expect(formGroup.controls.projectDomains.errors).toEqual({'allOf':{ message: 'Please select all options', refValues: [ ["ECommerce","Banking"] ] } });
     });

     it("Should error, allOf decorator  If you want to apply conditional expression of type 'function'",
     () => {
     let employeeInfo  = new EmployeeInfo ();
     let formGroup = formBuilder.formGroup(employeeInfo);
     formGroup.controls.department.setValue('DotNet');
     formGroup.controls.qualifications.setValue(["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."])
     expect(formGroup.controls.qualifications.errors).toBeNull();
    });

    it("Should error, allOf decorator  If you want to apply conditional expression of type 'function'",
    () => {
    let employeeInfo  = new EmployeeInfo ();
    let formGroup = formBuilder.formGroup(employeeInfo);
    formGroup.controls.department.setValue('C#');
    formGroup.controls.qualifications.setValue(["Secondary","Senior Secondary"])
    expect(formGroup.controls.qualifications.errors).toBeNull();
   });

   it("Should error, allOf decorator  If you want to apply conditional expression of type 'function'",
   () => {
   let employeeInfo  = new EmployeeInfo ();
   let formGroup = formBuilder.formGroup(employeeInfo);
   formGroup.controls.department.setValue('DotNet');
   formGroup.controls.qualifications.setValue(["Secondary","Senior Secondary"])
   expect(formGroup.controls.qualifications.errors).toEqual({'allOf':{ message: 'Please select all options', refValues: [ ["Secondary","Senior Secondary"] ] } });
  });

  it("Should not error, allOf decorator  If you want to apply conditional expression of type 'string'",
  () => {
    let employeeInfo  = new EmployeeInfo ();
    let formGroup = formBuilder.formGroup(employeeInfo)
    formGroup.controls.department.setValue('DotNet');
    formGroup.controls.skills.setValue(["MVC","AngularJS","Angular 5","C#","Web Api","SQL Server"]);
   expect(formGroup.controls.skills.errors).toBeNull();
});

it("Should not error, allOf decorator  If you want to apply conditional expression of type 'string'",
() => {
  let employeeInfo  = new EmployeeInfo ();
  let formGroup = formBuilder.formGroup(employeeInfo)
  formGroup.controls.department.setValue('C#');
  formGroup.controls.skills.setValue(["MVC","AngularJS","Angular 5"]);
 expect(formGroup.controls.skills.errors).toBeNull();
});


it("Should not error, allOf decorator  If you want to apply conditional expression of type 'string'",
() => {
  let employeeInfo  = new EmployeeInfo ();
  let formGroup = formBuilder.formGroup(employeeInfo)
  formGroup.controls.department.setValue('DotNet');
  formGroup.controls.skills.setValue(["MVC","AngularJS","Angular 5"]);
  expect(formGroup.controls.skills.errors).toEqual({'allOf':{ message: 'Please select all options', refValues: [ ["MVC","AngularJS","Angular 5"] ] } });
});

it("Should error, ascii decorator Shows custom message",
() => {
let employeeInfo  = new EmployeeInfo ();
let formGroup = formBuilder.formGroup(employeeInfo);
formGroup.controls.hobbies.setValue(["Drawing", "Singing","Dancing","Travelling"]);
expect(formGroup.controls.hobbies.errors).toEqual({'allOf':{ message: 'Please select all hobbies', refValues: [["Drawing", "Singing","Dancing","Travelling"]] } });
});
      })
    })
