import {  startsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@startsWith({value:'B' }) 
	name: string;

}
