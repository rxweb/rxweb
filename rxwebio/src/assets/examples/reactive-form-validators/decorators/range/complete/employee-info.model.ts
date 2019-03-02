import {  range, } from   "@rxweb/reactive-form-validators"   

export class EmployeeInfo {

	@range({minimumNumber:18  ,maximumNumber:60 }) 
	age: number;
	
	
	//If you want to apply conditional expression of type 'function'
	@range({minimumNumber:6  ,maximumNumber:8  ,conditionalExpression:(x,y) => x.age >= 25  }) 
	projectDuration: number;
	
	
	//If you want to apply conditional expression of type 'string'
	@range({minimumNumber:2  ,maximumNumber:20  ,conditionalExpression:'x => x.age >=25' }) 
	experience: number;
	
	
	@range({minimumNumber:1000  ,maximumNumber:200000  ,message:'Your Salary should be between 1000 to 200000.' }) 
	salary: number;
	
	
}
