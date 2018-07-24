import {  json, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class JsonInfo {

	@prop()
	locationJson: string;

	@prop()
	addressJson: string;

	@prop()
	contactJson: string;

}
