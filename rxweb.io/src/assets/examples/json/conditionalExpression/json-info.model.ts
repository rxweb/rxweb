import {  json,prop,} from "@rxweb/reactive-form-validators"

export class JsonInfo {

	@prop()
	location: string;
	@json({conditionalExpression:(x,y)=>{ return x.location == "India" } }) 
	addressJson: string;
}
