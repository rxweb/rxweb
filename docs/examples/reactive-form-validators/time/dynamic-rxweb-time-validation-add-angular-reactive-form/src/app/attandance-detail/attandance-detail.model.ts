import {prop} from '@rxweb/reactive-form-validators'
export class AttandanceDetail {

	@prop()
	entryPlace: string;

	@prop()
	entryTime: Time;

	@prop()
	totalOutTime: Time;

	@prop()
	exitTime: Time;

}
