import {  startsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@startsWith({value:'R'  ,message:'{{0}} does not starts with `R`' }) 
	company: string;

}
