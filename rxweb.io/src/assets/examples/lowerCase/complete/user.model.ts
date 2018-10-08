import {  lowerCase,prop,} from "@rxweb/reactive-form-validators"

export class User {

	@lowerCase() 
	username: string;
	@lowerCase({conditionalExpression:(x, y) => { return x.username == "jonathan.feldman" } }) 
	firstName: string;
	@lowerCase({message:'You can enter only lowerCase letters.' }) 
	lastName: string;
}
