import {  lowerCase, } from "@rxweb/reactive-form-validators"
export class User {

	@lowerCase() 
	username: string;

	@lowerCase({conditionalExpressions:(x, y) => { return x.username == "jonathan.feldman" } }) 
	firstName: string;

	@lowerCase({message:'You can enter only lowerCase letters.' }) 
	lastName: string;

}
