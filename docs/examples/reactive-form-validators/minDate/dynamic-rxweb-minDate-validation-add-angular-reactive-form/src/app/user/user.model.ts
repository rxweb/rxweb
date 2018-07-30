import {prop} from '@rxweb/reactive-form-validators'
export class User {

	@prop()
	userName: string;

	@prop()
	birthDate: Date;

	@prop()
	registrationDate: Date;

}
