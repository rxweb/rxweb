import {  range,prop,} from "@rxweb/reactive-form-validators"

export class EmployeeInfo {

	@range({minimumNumber:18  ,maximumNumber:60 }) 
	age: number;
	@range({minimumNumber:2  ,maximumNumber:20  ,conditionalExpression:x => x.age >=25 }) 
	experience: number;
	@range({minimumNumber:1000  ,maximumNumber:200000  ,message:'Your Salary should be between 10000 to 200000.' }) 
	salary: number;
}
