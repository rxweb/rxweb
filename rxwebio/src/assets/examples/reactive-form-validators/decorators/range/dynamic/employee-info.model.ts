import {  range,prop, } from   "@rxweb/reactive-form-validators"   

export class EmployeeInfo {

	@prop()
	age: number;

	@prop()
	experience: number;

	@prop()
	salary: number;

}
