import {  range,prop,} from "@rxweb/reactive-form-validators"

export class EmployeeInfo {

	@range({minimumNumber:1000  ,maximumNumber:200000  ,message:'Your Salary should be between 10000 to 200000.' }) 
	salary: number;

}
