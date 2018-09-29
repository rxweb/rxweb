import {  maxDate,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;

	@maxDate({value:new Date(2018,7,30)  ,conditionalExpressions:x => x.userName == "John" }) 
	birthDate: Date;

}
