import {  maxLength, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class User {

	@prop()
	firstName: string;

	@prop()
	lastName: string;

	@prop()
	userName: string;

}
