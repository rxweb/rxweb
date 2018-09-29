import {  json,prop,} from "@rxweb/reactive-form-validators"

export class JsonInfo {

	@json({message:'Enter only JSON type data' }) 
	contactJson: string;

}
