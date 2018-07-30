import {prop} from '@rxweb/reactive-form-validators'
export class user {

	@prop()
	userName: string;

	@prop()
	birthDate: Date;

	@prop()
	registrationDate: Date;

}
