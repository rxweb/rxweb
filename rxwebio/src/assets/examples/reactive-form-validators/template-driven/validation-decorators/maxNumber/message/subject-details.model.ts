import {  maxNumber, } from   "@rxweb/reactive-form-validators"   

export class SubjectDetails {

	@maxNumber({value:70  ,message:'{{0}} exceeds the Maximum marks Limit' }) 
	practicalMarks: number;
	
	
	

}
