import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl,FormControl } from "@angular/forms";
import {
  choice,
    contains,
    digit, email, hexColor, lowerCase, maxDate, maxLength, maxNumber, minDate, minNumber, password, pattern, range, upperCase, propObject, propArray, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, prop, required, alpha, alphaNumeric, compare, url, json, greaterThan, greaterThanEqualTo, lessThan, lessThanEqualTo, creditCard, minLength
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
longitude,rule,RxFormGroup
} from "@rxweb/reactive-form-validators";

export class Consultant {
    @required()
    name: string;
    _purchPrice: any;
    _salesPrice: any;
    _workingDays: any;
    _chargeAbility: string;
    _turnover: any;
    _margin: any;
    _cost: any;
  
    @prop() // set method will be called when user enters/change the value in the textbox
    set purchPrice(value:any){
      this._purchPrice = value;
      this.calculateCost();
    }

    get purchPrice(){
      return this._purchPrice;
    }
  
    @prop()
    set salesPrice(value:any){
        this._salesPrice = value;
        this.calculateCost();
        this.calculateTurnOver();
    }
  
    get salesPrice(){
      return this._salesPrice;
    }
    
    @prop() // if there is no validation then use prop decorator, if you want to bind property as FormControl.
    set workingDays(value:any) {
      this._workingDays = value
      this.calculateCost();
      this.calculateTurnOver();
    }
    get workingDays() {
        return this._workingDays;
    }
    
    @prop()
    set chargeAbility(value) {
      this._chargeAbility = value;
    }

    get chargeAbility() {
      return this._chargeAbility;
    }

    @prop()
    set turnover(value) {
      this._turnover = value;
      this.calculateMargin();
    }

    get turnover() {
      return this._turnover;
    }
    
    @prop()
    set margin(value) {
      this._margin = value;
    }

    get margin() {
      return this._margin;
    }
  
    @prop()// if there is no validation then use prop decorator, if you want to bind property as FormControl.
    set cost(value) {
      this._cost = value;
      this.calculateMargin();
    }

    get cost() {
      return this._cost;
    }
  
    calculateCost(){
      if(this.purchPrice && this.workingDays)
        this.cost = this.purchPrice * this.workingDays;
    }

    calculateTurnOver() {
      if (this.salesPrice && this.workingDays) {
        this.turnover = this.salesPrice * this.workingDays;
      }
    }

    calculateMargin() {
      if (this.cost && this.turnover) {
        this.margin = this.turnover - this.cost;
      }
    }
    constructor(consultant?) {
      this.name = consultant ? consultant.name : '';
      this.purchPrice = consultant ? consultant.purchPrice : '';
      this.salesPrice = consultant ? consultant.salesPrice : '';
      this.workingDays = consultant ? consultant.workingDays : '';
      this.chargeAbility = consultant ? consultant.chargeAbility : '';
      this.turnover = consultant ? consultant.turnover : '';
      this.cost = consultant ? consultant.cost : '';
      this.margin = consultant ? consultant.margin : '';
    }
}


export class Sheet {
    @prop()
    title: string;
    @propArray(Consultant)
    consultants: Consultant[];

    @prop()
    _totalConsultantCost;

    @prop()
    _totalConsultantTurnover;

    _totalConsultantMargin = 0;
    
    set totalConsultantMargin(value) {
        this._totalConsultantMargin = value;
    }
    @prop()
    get totalConsultantMargin() {
        this.calculateTotalConsultantMargin();
        return this._totalConsultantMargin;
    }

    calculateTotalConsultantMargin() {
        this._totalConsultantMargin = 0;
                for (let consultant of this.consultants) {
            this._totalConsultantMargin += consultant.margin;
        }
    }

    recalculateSheetTotals() {
        this.calculateTotalConsultantMargin();
    }
}


export class Skill{
  @prop()
  name:string;
}
export class Person {
  @propObject(Skill)
  skill:Skill;

  @propArray(Skill)
  skills:Skill[];
@required()
  
  name:string;
}
export class Address {
    zipCode:number;
    city:string;
    country:string;

    @rule({customRules:[(entity)=> {
       let jObject = {};
       return entity.zipCode == null ? {'zipcode':'should select zipcode'} : null;  } ]})
    address:string;
}

import { CLIENT_SETTINGS } from './client-setting'
export class Attendance {
    @prop() @required({ conditionalExpression: (x,y) => y.firstName == 'john' && y.employeeDetail.areaName == 'ahmedabad' }) startTime: number;
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
    @different({ fieldName:'firstName', conditionalExpression: (x) => x.lastName == "ojha"  }) different: string;
    @choice({ minLength: 1, maxLength:2 }) skills: number[];
    @prop() firstName: string;
    @alphaNumeric({ allowWhiteSpace: false, message: "test message" }) lastName: string;
    @contains({ value: "radix", conditionalExpression: (current, root) => { return current.firstName == 'ajay'; }, message: "validation failed contains" }) contains: string;
    //@digit({ conditionalExpression: "x => x.firstName == 'john' && x.employeeDetail.areaName == 'ahmedabad'", message: "digit required" })
    @prop()
    digit: string;
    @email({ message: "email", conditionalExpression: "(x,y) => x.firstName == 'john' && y.firstName == 'john'" }) email: string;
    @hexColor({ message: "hex"}) hexColor: string;
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
    @creditCard({ creditCardTypes: ["AmericanExpress",] }) creditCard: string;
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
    hero = {name:''};
    sampleFormGroup: FormGroup;
    angularFormGroup:FormGroup;
    constructor(private formBuilder: FormBuilder, private validation: RxFormBuilder) {

    }

    secondEmployee:any = {};
validatorUserFormGroup:FormGroup;
  userInfoFormGroup: FormGroup
clientFormGroup:FormGroup
userFormGroup:FormGroup;
   
testFormGroup:FormGroup;
testForm:FormGroup;
userForm:FormGroup;
modelRuleGroup:FormGroup;
validatorJson =[{
  "fieldId":1,
  "label":"Username",
  "placeHolder":"Enter your username",
  "value":"",
  "sortId":1,
  "validation":{
    "value":{
      "alpha":true, 
      "required":true,
      "minLength":{"value":5},
      "maxLength":{"value":10}
    }
  }
},{
  "fieldId":2,
  "label":"Password",
  "placeHolder":"Enter your password",
  "value":"",
  "sortId":2,
  "validation":{
    "value":{
      "password":{
validation:{
        "maxLength": 10,"minLength": 5,"digit": true,"specialCharacter": true
}
}
    }
  }
},{
  "fieldId":3,
  "label":"Compare Password",
  "placeHolder":"Re enter password",
  "value":"",
  "sortId":3,
  "validation":{
    "value":{
      "compare":{"fieldName":"'password'","message":"'Password value is not matched'"}
    }
  }
}


]
dynamicFormGroup :FormGroup;
form: RxFormGroup;
person: Person;
persons:Person[];
save() {
    this.persons.push(this.form.modelInstanceValue);
    // this.person = new Person();
    this.form.reset();
  }
  ngOnInit() {

    
    this.person = new Person();
    this.persons = new Array<Person>();
var fc= new FormBuilderConfiguration();
    fc.autoInstanceConfig = {
      objectPropInstanceConfig:[{
        propertyName:'skill'
      }],
      arrayPropInstanceConfig:[{
        propertyName:'skills',
        rowItems:10
      }]
    }
    this.form = <RxFormGroup>this.validation.formGroup(Person,this.person,fc);
console.log(this.form);
let address = new Address();
this.dynamicFormGroup  = this.validation.group({questions:this.validatorJson},{
//excludeProps:['questions.fieldId','questions.label','questions.placeHolder','questions.sortId','questions.validation'],
includeProps:['questions','questions.value'],
dynamicValidationConfigurationPropertyName:'validation'});
console.log(this.dynamicFormGroup);
this.modelRuleGroup = this.validation.formGroup(address);
this.userForm = this.formBuilder.group({
  nationality:[''],
  intlNumber:['',[ RxwebValidators.compose({
validators:[
RxwebValidators.required(),
RxwebValidators.maxLength({value:14}),
RxwebValidators.minLength({value:11})
],
conditionalExpression:(x) => x.nationality == 'Abroad' })
    ]]
});

this.testForm = this.formBuilder.group({
  password:['',[RxwebValidators.password ({
        validation:{
          upperCase:true,
          lowerCase:true,
        }
      }),RxwebValidators.minLength({value:8}),
      RxwebValidators.maxLength({value:10})]],
  confirmPassword:['',RxwebValidators.compare({fieldName:'password'})],
  age:['',RxwebValidators.startsWith({value:"n"})],
  cardType:[''],
  creditCard:['',RxwebValidators.creditCard({fieldName:'cardType'})],
  amount:['',[RxwebValidators.required(),RxwebValidators.numeric({allowDecimal:true,digitsInfo:'3.1-5',isFormat:true})]],
fileData:['',RxwebValidators.extension({extensions:[".jpg"]})]
  
});
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
        //this.secondEmployee = new Employee();
        //this.secondEmployee.employeeDetail = new EmployeeDetail();
        //employee.employeeDetail.areaName = "";
        //this.secondEmployee.attendances = new Array<Attendance>();
        //var employeeDetails = new Attendance()
        //employeeDetails.startTime = 12;
        //employeeDetail.startTime = undefined
        //this.secondEmployee.attendances.push(employeeDetails)
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
                "min":"minimum number are allowed {{0}}",
                "minLength":"minimum length is {{0}}"

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
        this.sampleFormGroup = this.validation.formGroup<Employee>(employee,formBuilderConfiguration);
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
}


