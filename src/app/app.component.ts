import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from "@angular/forms";
import {
  choice,
    contains,
    digit, email, hexColor, lowerCase, maxDate, maxLength, maxNumber, minDate, minNumber, password, pattern, range, upperCase, propObject, propArray, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, prop, required, alpha, alphaNumeric, compare, url, json, greaterThan, greaterThanEqualTo, lessThan, lessThanEqualTo, creditCard, CreditCardType, minLength
  , FormGroupExtension, different, numeric, NumericValueType, even, odd, factor, leapYear, time
} from "@rxweb/reactive-form-validators";

import { CLIENT_SETTINGS } from './client-setting'
export class Attendance {
    @prop() @required({ conditionalExpression: "x => x.firstName == 'john' && x.employeeDetail.areaName == 'ahmedabad'" }) startTime: number;
}
export class EmployeeDetail {
    @prop() @required() areaName: string;
}
export class ExternalClass{
static convert(value:any) : any{
return 1;
}
}
function configurable() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        //descriptor.configurable = value;
console.log(propertyKey)
console.log(target);
    };
}
export class Employee {
    @leapYear() leapYear:number;
@factor({fieldName:'odd'}) factor:number;
    @odd() odd:number;
   @even() even:number;
    @numeric({acceptValue:NumericValueType.NegativeNumber}) numeric:number;
    @different({ fieldName:'firstName' }) different: string;
    @choice({ minLength: 1, maxLength:2 }) skills: number[];
    @prop() firstName: string;
    @alphaNumeric({ allowWhiteSpace: false, message: "test message" }) lastName: string;
    @contains({ value: "radix", conditionalExpression: (current, root) => { return current.firstName == 'ajay'; }, message: "validation failed contains" }) contains: string;
    //@digit({ conditionalExpression: "x => x.firstName == 'john' && x.employeeDetail.areaName == 'ahmedabad'", message: "digit required" })
    @prop()
    digit: string;
    @email({ message: "email", conditionalExpression: "x =>x.firstName == 'john'" }) email: string;
    @hexColor({ message: "hex", conditionalExpression: "x => x.firstName == 'john'" }) hexColor: string;
    @lowerCase({ message: "lowercase", conditionalExpression: "x => x.firstName == 'john'" }) lowerCase: string;
    @maxDate({ value: new Date(2018,7-1,30) }) maxDate: string; // do some work
    @minDate({ value: new Date(2000, 0, 1) }) minDates: string; // do some work
    @maxLength({ value: 20, message: "length exceed", conditionalExpression: "x => x.firstName == 'john'" }) maxLength: string;
    @maxNumber({ value: 100000000 }) maxNumber: string;
    @minLength({ value: 10 }) minLength: number;
    @minNumber({ value: 20, message: "minimum number {{0}}", conditionalExpression: "x => x.firstName == 'john'" }) minNumber: string;
    @password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } }) password: string;
    @pattern({ pattern: { 'onlyDigit': /^[0-9]+$/ }, conditionalExpression: "x => x.firstName == 'john'" }) pattern: string;
    @range({ minimumNumber: 5, maximumNumber: 10 }) range: string;
    @required({ message: "minimum number {{0}}", conditionalExpression: "x => x.firstName == 'john'" }) required: string;
    @upperCase({ message: "minimum number {{0}}", conditionalExpression: "x => x.firstName == 'john'" }) upperCase: string;
    @propObject(EmployeeDetail) employeeDetail: EmployeeDetail;
    @propArray(Attendance) attendances: Attendance[]
    @compare({ fieldName: 'country' }) state: string;
    @prop() country: string;
    @time({ allowSeconds: true, message: "time" }) time: string;
    @url() url: string;
    @json() json: string;
    @greaterThan({ fieldName: 'minNumber' }) greaterThan: string;
    @greaterThanEqualTo({ fieldName: 'minNumber' }) greaterThanEqualTo: string;
    @lessThan({ fieldName: 'minNumber' }) lessThan: string;
    @lessThanEqualTo({ fieldName: 'minNumber' }) lessThanEqualTo: string;
    @creditCard({ creditCardTypes: [CreditCardType.AmericanExpress,] }) creditCard: string;
   private _classProperty: ExternalClass;



  set classProperty(property: number | any | ExternalClass) {
      this._classProperty = property;
    }
@alphaNumeric({ allowWhiteSpace: false, message: "test message" }) 
    get classProperty() {
      return this._classProperty;
    }
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    sampleFormGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private validation: RxFormBuilder) {

    }

    secondEmployee:any = {};

    ngOnInit() {
        
        var employee = new Employee();
        employee.employeeDetail = new EmployeeDetail();
        //employee.employeeDetail.areaName = "";
        employee.attendances = new Array<Attendance>();
        var employeeDetail = new Attendance()
        employeeDetail.startTime = 1
        employee.attendances.push(employeeDetail)
        this.secondEmployee = new Employee();
        this.secondEmployee.employeeDetail = new EmployeeDetail();
        //employee.employeeDetail.areaName = "";
        this.secondEmployee.attendances = new Array<Attendance>();
        var employeeDetails = new Attendance()
        employeeDetails.startTime = 12;
        //employeeDetail.startTime = undefined
        this.secondEmployee.attendances.push(employeeDetails)
        ReactiveFormConfig.set({
            "internationalization": {
                "dateFormat": "dmy",
                "seperator": "/"
            },
            "validationMessage": {
                "alpha": "only alpha value you enter",
                "alphaNumeric": "only alpha Numeric value you enter",
                "contains": "you should contains ",
                "onlyDigit": "abc"
            }
        });
        employee.lastName = "john";
        console.log(employee)
        var formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
            'firstName': {
                alpha: true
            },
            'digit': {
                digit: {
                    conditionalExpression:"x => x.firstName == 'john'"
                }
            }
        };
        this.sampleFormGroup = this.validation.formGroup<Employee>(Employee, employee, formBuilderConfiguration);
        console.log(this.sampleFormGroup);
    }

    customValidator(abstractControl: AbstractControl): { [key: string]: any } {
        var t = this.sampleFormGroup;
        return null;
    }
errorObject = {}
  resetData() {
      this.errorObject = (<FormGroupExtension>this.sampleFormGroup).getErrorSummary(true) ;
      //(<FormGroupExtension>this.sampleFormGroup).resetForm();
  }

  setDefault(){
        this.sampleFormGroup.controls.digit.setValue(123)
  }
index = 0;
  addItem(element:any) {
    var value = this.sampleFormGroup.controls.skills.value;
    if(!value)
      value = [];
      if(element.checked) {
            value.push(element.value);
            this.index++;
      }
      else
      {
      var indexOf = value.indexOf(element.value);
      value.splice(indexOf,1);
      }
    this.sampleFormGroup.controls.skills.setValue(value)
 }
    
}


