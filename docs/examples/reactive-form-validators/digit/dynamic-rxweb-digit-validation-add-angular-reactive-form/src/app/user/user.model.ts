import {  digit, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class User {

	@prop()
	age: number;

	@prop()
	phoneNumber: number;

	@prop()
	mobileNumber: number;

}
