import {  email, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class User {

	@prop()
	email: string;

	@prop()
	recoveryEmailAddress: string;

	@prop()
	otherEmailAddress: string;

}
