import {  range,prop, } from "@rxweb/reactive-form-validators"

export class EmployeeInfo {

	@range({minimumNumber:18  ,maximumNumber:60 }) 
	age: number;

	//If you want to apply conditional expression of type 'string'
	@range({minimumNumber:2  ,maximumNumber:20  ,conditionalExpression:x => x.age >=25 }) 
	experience: number;

	//If you want to apply conditional expression of type 'function'
	@range({minimumNumber:6  ,maximumNumber:8  ,conditionalExpression:(x,y) =>{ return  x.age >= 25 } }) 
	projectDuration: number;

}
