import {  lowerCase, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class User {

	@prop()
	username: string;

	@prop()
	firstName: string;

	@prop()
	lastName: string;

}
