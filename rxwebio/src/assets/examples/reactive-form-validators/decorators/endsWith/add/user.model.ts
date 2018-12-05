import {  endsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@endsWith({value:'t' }) 
	name: string;

}
