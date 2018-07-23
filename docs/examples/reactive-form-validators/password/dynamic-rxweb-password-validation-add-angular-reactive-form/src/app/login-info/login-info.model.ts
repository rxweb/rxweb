import {  password, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class LoginInfo {

	@prop()
	newPassword: string;

	@prop()
	oldPassword: string;

}
