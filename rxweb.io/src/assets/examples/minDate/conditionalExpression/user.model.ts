import {  minDate,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	userName: string;
	@minDate({value:new Date(2018,7,30)  ,conditionalExpression:x => x.userName == "John" }) 
	birthDate: Date;
}
