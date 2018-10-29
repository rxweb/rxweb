import {  startsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@startsWith({value:'J'  ,message:'{{0}} does not starts with `J`' }) 
	name: string;

}
