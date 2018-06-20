import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from "@angular/forms";
import {
    contains,
    digit, email, hexColor, lowerCase, maxDate, maxLength, maxNumber, minDate, minNumber, password, pattern, range, upperCase, propObject, propArray, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, prop, required, alpha, alphaNumeric, compare, url, json, greaterThan, greaterThanEqualTo, lessThan, lessThanEqualTo
} from "@rxweb/reactive-form-validators";
import { time } from "packages/reactive-form-validators/decorators";
export class Attendance {
    @prop() @required({ conditionalExpressions: "x => x.firstName == 'john' && x.employeeDetail.areaName == 'ahmedabad'" }) startTime: number;
}
export class EmployeeDetail {
    @prop() @required() areaName: string;
}
export class Employee {
    @prop() @alpha({ allowWhiteSpace: true  }) firstName: string;
    @prop() @alphaNumeric({ allowWhiteSpace: false, message: "test message" }) lastName: string;
    @prop() @contains({ value: "radix", conditionalExpressions: (current, root) => { return current.firstName == 'ajay'; }, message: "validation failed contains" }) contains: string;
    @prop() @digit({ conditionalExpressions: "x => x.firstName == 'john' && x.employeeDetail.areaName == 'ahmedabad'", message: "digit required" }) digit: string;
    @prop() @email({ message: "email", conditionalExpressions: "x =>x.firstName == 'john'" }) email: string;
    @prop() @hexColor({ message: "hex", conditionalExpressions: "x => x.firstName == 'john'" }) hexColor: string;
    @prop() @lowerCase({ message: "lowercase", conditionalExpressions: "x => x.firstName == 'john'" }) lowerCase: string;
    @prop() @maxDate({ value: new Date(2016, 10, 5) }) maxDate: string; // do some work
    @prop() @maxLength({ value: 20, message: "length exceed", conditionalExpressions: "x => x.firstName == 'john'" }) maxLength: string;
    @prop() @maxNumber({ value: 100000000}) maxNumber: string;
    @prop() @minDate({ value: new Date(2016, 10, 5) }) minDate: string;
    @prop() @minNumber({ value: 20, message: "minimum number {{0}}", conditionalExpressions: "x => x.firstName == 'john'" }) minNumber: string;
    @prop() @password({ validation: { maxLength: 10, minLength: 5, digit: true, specialCharacter: true } }) password: string;
    @prop() @pattern({ pattern: { 'onlyDigit': /^[0-9]+$/ }, conditionalExpressions: "x => x.firstName == 'john'" }) pattern: string;
    @prop() @range({ minimumNumber: 5, maximumNumber: 10 }) range: string;
    @prop() @required({ message: "minimum number {{0}}", conditionalExpressions: "x => x.firstName == 'john'" }) required: string;
    @prop() @upperCase({ message: "minimum number {{0}}", conditionalExpressions: "x => x.firstName == 'john'" }) upperCase: string;
    @propObject(EmployeeDetail) employeeDetail: EmployeeDetail;
    @propArray(Attendance) attendances: Attendance[]
    @prop() @compare({ fieldName: 'country' }) state: string;
    @prop() country: string;
    @prop() @time({ allowSeconds: true }) time: string;
    @prop() @url() url: string;
    @prop() @json() json: string;
    @prop() @greaterThan({ fieldName: 'minNumber' }) greaterThan: string;
    @prop() @greaterThanEqualTo({ fieldName: 'minNumber' }) greaterThanEqualTo: string;
    @prop() @lessThan({ fieldName: 'minNumber' }) lessThan: string;
    @prop() @lessThanEqualTo({ fieldName: 'minNumber' }) lessThanEqualTo: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
    title = 'app';
    sampleFormGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private validation: RxFormBuilder) {
    }

    ngOnInit() {
        var employee = new Employee();
        employee.employeeDetail = new EmployeeDetail();
        employee.employeeDetail.areaName = "";
        employee.attendances = new Array<Attendance>();
        var employeeDetail = new Attendance()
        employeeDetail.startTime = undefined
        employee.attendances.push(employeeDetail)
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
        this.sampleFormGroup = this.validation.formGroup(employee);
        console.log(this.sampleFormGroup);
    }

    customValidator(abstractControl: AbstractControl): { [key: string]: any } {
        var t = this.sampleFormGroup;
        return null;
    }
}
