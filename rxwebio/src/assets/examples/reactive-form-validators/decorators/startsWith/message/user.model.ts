import {  startsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@startsWith({value:'B'  ,message:'{{0}} does not starts with `B`' }) 
	name: string;

}
