import {  range, } from   "@rxweb/reactive-form-validators"   

export class EmployeeInfo {

	@range({minimumNumber:18  ,maximumNumber:60 }) 
	age: number;
	
	
	

}
