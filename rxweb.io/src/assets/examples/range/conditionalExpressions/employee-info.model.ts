import {  range,prop,} from "@rxweb/reactive-form-validators"

export class EmployeeInfo {

	@range({minimumNumber:18  ,maximumNumber:60 }) 
	age: number;
	@range({minimumNumber:2  ,maximumNumber:20  ,conditionalExpressions:x => x.age >=25 }) 
	experience: number;
}
