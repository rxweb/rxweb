import {  json,prop,} from "@rxweb/reactive-form-validators"

export class JsonInfo {

	@prop()
	location: string;

	@json({conditionalExpressions:(x,y)=>{ return x.location == "India" } }) 
	addressJson: string;

}
