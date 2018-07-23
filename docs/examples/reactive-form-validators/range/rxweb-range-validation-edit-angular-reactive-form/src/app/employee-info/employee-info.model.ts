import {  range, } from "@rxweb/reactive-form-validators"
export class EmployeeInfo {

	@range() 
	age: number;

}
