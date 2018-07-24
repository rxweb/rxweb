import {  json, } from "@rxweb/reactive-form-validators"
export class JsonInfo {

	@json({message:'Enter the text in JSON format --> {key:value}' }) 
	name: string;

	@json({conditionalExpressions:(x,y)=>{ return x.name == '{ "firstName": "John", "lastName": "Doe" }' } }) 
	age: string;

	@json({message:'Enter only JSON type data' }) 
	address: string;

}
