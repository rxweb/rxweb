import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl,FormControl } from "@angular/forms";
import {
  choice,
    contains,
    digit, email, hexColor, lowerCase, maxDate, maxLength, maxNumber, minDate, minNumber, password, pattern, range, upperCase, propObject, propArray, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, prop, required, alpha, alphaNumeric, compare, url, json, greaterThan, greaterThanEqualTo, lessThan, lessThanEqualTo, creditCard, CreditCardType, minLength
  , FormGroupExtension, different, numeric, NumericValueType, even, odd, factor, leapYear, time, RxwebValidators,
ascii,
dataUri,
port,
latLong,
extension,
fileSize,
endsWith,
startsWith,
primeNumber,
latitude,
longitude
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
export class Client{

  _countryName:string ;
  _countryCode:string ;
  
  
  @prop()
  clientName:string ;

  set countryName(value:string){

    this._countryName = value;
    if(value == "Australia")
      this.countryCode = "AU";
  }

  @prop()
  get countryName(){
    return this._countryName;
  }

  set countryCode(value:string){
    this._countryCode = value;
  }

  @prop()
  get countryCode(){
    return this._countryCode;
  }
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
    @email({ message: "email", conditionalExpression: "(x,y) => x.firstName == 'john' && y.firstName == 'john'" }) email: string;
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
    @ascii()                          ascii:string;
    @dataUri()                        dataUri:string;
    @port()                           port:number;
    @latLong()                        latLong:string
    @fileSize({maxSize:20000})       extension:object;
    @endsWith({value:'jha'})          endsWith:string
    @startsWith({value:'aja'})        startsWith:string
    @primeNumber()                    primeNumber:number;
    @latitude()                       latitude:number;
    @longitude()                      longitude:number;
   private _classProperty: ExternalClass;



  set classProperty(property: number | any | ExternalClass) {
      this._classProperty = property;
    }
    @alphaNumeric({ allowWhiteSpace: false, message: "test message" }) 
    get classProperty() {
      return this._classProperty;
    }
    private _updateChange:string;
    set updateChange(value:string){
      this._updateChange = value;
this.classProperty = value;
    }

    @prop() get updateChange(){
    return this._updateChange;
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
    angularFormGroup:FormGroup;
    constructor(private formBuilder: FormBuilder, private validation: RxFormBuilder) {

    }

    secondEmployee:any = {};

  userInfoFormGroup: FormGroup
clientFormGroup:FormGroup
  ngOnInit() {
let client = new Client();
    client.clientName = "ABC Corp";
    client.countryName = "India";
    client.countryCode = "IN";
    this.clientFormGroup = this.validation.formGroup(client);
    this.largeFormGroup();
        this.angularFormGroup = this.validation.group({
          firstName:['',RxwebValidators.required()],
          lastName:[''],
          address:this.validation.group({
            city:[''],
            country:['']
          }),
          skills:this.formBuilder.array([this.validation.group({
            skillName:['']
          })])
      })

      this.userInfoFormGroup = this.validation.group({
        firstName: '',
        lastName: ''
      });
      console.log(this.angularFormGroup);
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
                "onlyDigit": "abc",
                "required":"this field is required",
                "min":"minimum number are allowed {{0}}"

            }
        });
        employee.lastName = "john";
        console.log(employee)
        var formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            'firstName': {
                alpha: true
            },
            'digit': {
                digit: {
                    conditionalExpression:"(x,y) => x.firstName == 'Australia' && y.lastName == 'Ojha' "
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
    this.errorObject = (<FormGroupExtension>this.sampleFormGroup).getErrorSummary(true);
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
  largeForm: FormGroup
  largeFormGroup() {
    this.largeForm= this.validation.group({
      //Provider
      name: new FormGroup({
        prefix: new FormControl(undefined, { validators: [Validators.maxLength(10)] }),
        firstName: new FormControl(undefined, { validators: [Validators.maxLength(35), Validators.required] }),
        middleName: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
        lastName: new FormControl(undefined, { validators: [Validators.maxLength(35), Validators.required] }),
        suffix: new FormControl(undefined, { validators: [Validators.maxLength(10)] }),
      }),
      formerName: new FormGroup({
        prefix: new FormControl(undefined, { validators: [Validators.maxLength(10)] }),
        firstName: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
        middleName: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
        lastName: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
        suffix: new FormControl(undefined, { validators: [Validators.maxLength(10)] }),
      }),
      specialty: new FormControl(),

      //Clinic Info
      spi: new FormControl(undefined, { validators: [Validators.maxLength(13), Validators.required] }),
      npi: new FormControl(undefined, { validators: [Validators.maxLength(10), Validators.required] }),
      accountId: new FormControl([], { validators: [Validators.required] }),
      portalId: new FormControl([], { validators: [Validators.required] }),
      location: new FormGroup({
        name: new FormControl(undefined, { validators: [Validators.maxLength(70)] }),
        address: new FormGroup({
          addressLine1: new FormControl(undefined, { validators: [Validators.maxLength(40), Validators.required] }),
          addressLine2: new FormControl(undefined, { validators: [Validators.maxLength(40)] }),
          city: new FormControl(undefined, { validators: [Validators.maxLength(35), Validators.required] }),
          state: new FormControl(undefined, { validators: [Validators.required] }),
          zipCombined: new FormControl(undefined, { validators: [Validators.required, Validators.pattern(/^\d{5}(?:[-]\d{4})?$/)] }),
          zip: new FormControl(),
          zip4: new FormControl(),
          countryCode: new FormControl(undefined, { validators: [Validators.required, Validators.maxLength(2)] })
        }),
        standardizedAddress: new FormGroup({
          addressLine1: new FormControl(),
          addressLine2: new FormControl(),
          city: new FormControl(),
          state: new FormControl(),
          zip: new FormControl(),
          zip4: new FormControl(),
          zipCombined: new FormControl(),
          countryCode: new FormControl()
        }),
        email: new FormControl(undefined, { validators: [Validators.maxLength(80)] }),
        directAddress: new FormControl(undefined, { validators: [Validators.maxLength(254)] }), //TODO: add custom validator for required if CIMessage or CIEvent service levels are enabled.
        primaryPhone: new FormGroup({
          number: new FormControl(undefined, { validators: [Validators.maxLength(10)] }),
          extension: new FormControl(undefined, { validators: [Validators.maxLength(8)] }),
          supportsSms: new FormControl(),
        }),
        fax: new FormGroup({
          number: new FormControl(undefined, { validators: [Validators.maxLength(10)] }),
          extension: new FormControl(undefined, { validators: [Validators.maxLength(8)] }),
          supportsSms: new FormControl(),
        }),
      }),
      deaNumber: new FormControl(undefined, { validators: [Validators.maxLength(25) ] }), //TODO: Add conditional required validator based on controlled substance service level
      stateLicense: [undefined, [Validators.maxLength(35), RxwebValidators.required({ conditionalExpression: (x) => { return x.veterinarian == true }})]],
      organizationId: new FormControl(undefined, { validators: [Validators.maxLength(100)] }),

      //Clinic Info - Other Ids
      medicaidNumber: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
      medicareNumber: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
      socialSecurity: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
      upin: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
      certificateToPrescribe: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
      data2000WaiverId: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
      remsHealthcareProviderEnrollmentId: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
      stateControlSubstanceNumber: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
      mutuallyDefined: new FormControl(undefined, { validators: [Validators.maxLength(35)] }),
      veterinarian: [''],

      //Contact Info

      //Configuration
      activeEndDate: new FormControl(undefined, { validators: [Validators.required] }),
      activeStartDate: new FormControl(undefined, { validators: [Validators.required] }),
      activelyPrescribingDate: new FormControl(),
      optOutFlags: new FormGroup({
        renewalFaxOptOut: new FormControl(),
        ciMailOptOut: new FormControl(),
        ciFaxOptOut: new FormControl()
      }),
      directorySpecialties: new FormControl([]),
      useCases: new FormControl([]),
      isFaxBackup: new FormControl(),
      backupPortalId: new FormControl(),
      test: new FormControl(),
      serviceLevels: new FormControl([])
    });
  }
  
}


