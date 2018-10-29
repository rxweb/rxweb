import {  endsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@endsWith({value:'t'  ,message:'{{0}} does not ends with `t`' }) 
	name: string;

}
