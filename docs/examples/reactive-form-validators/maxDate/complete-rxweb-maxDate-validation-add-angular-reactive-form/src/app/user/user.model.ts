import {  maxDate, prop  } from "@rxweb/reactive-form-validators"
export class user {

	@prop()
	userName: string;

	@maxDate({value:2018,07,30  ,conditionalExpressions:x => x.userName == "John" }) 
	birthDate: Date;

	@maxDate({value:2018,07,30  ,message:'{{0}} exceeds the Maximum Date Limit' }) 
	registrationDate: Date;

}
