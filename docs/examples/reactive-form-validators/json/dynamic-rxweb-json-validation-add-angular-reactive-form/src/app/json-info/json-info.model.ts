import {  json, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class JsonInfo {

	@prop()
	name: string;

	@prop()
	age: string;

	@prop()
	address: string;

}
