import {  contains, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class User {

	@prop()
	emailAddress: string;

	@prop()
	recoveryEmailAddress: string;

	@prop()
	otherEmailAddress: string;

}
