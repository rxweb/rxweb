import {  maxNumber, } from "@rxweb/reactive-form-validators"
export class SubjectDetails {

	@maxNumber() 
	subjectCode: string;

}
