import {  json,prop,} from "@rxweb/reactive-form-validators"

export class JsonInfo {

	@json({message:'Enter the text in JSON format --> {key:value}' }) 
	locationJson: string;
	@prop()
	location: string;
	@json({conditionalExpressions:(x,y)=>{ return x.location == "India" } }) 
	addressJson: string;
	@json({message:'Enter only JSON type data' }) 
	contactJson: string;
}
