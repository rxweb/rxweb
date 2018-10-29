import {  endsWith,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@endsWith({value:'m'  ,message:'{{0}} does not ends with `m`' }) 
	name: string;

}
