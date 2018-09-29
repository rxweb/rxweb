import {  minDate,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	@minDate({value:new Date(2018,7,30)  ,conditionalExpressions:x => x.userName == "John" }) 
	birthDate: Date;

	@minDate({value:new Date(2018,7,30)  ,message:'{{0}} exceeds the Minimum Date Limit' }) 
	registrationDate: Date;

}
