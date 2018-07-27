import {  json, } from "@rxweb/reactive-form-validators"
export class JsonInfo {

	@json({message:'Enter the text in JSON format --> {key:value}' }) 
	locationJson: string;

	@json({conditionalExpressions:(x,y)=>{ return x.locationJson == '{ "firstName": "John", "lastName": "Doe" }' } }) 
	addressJson: string;

	@json({message:'Enter only JSON type data' }) 
	contactJson: string;

}
