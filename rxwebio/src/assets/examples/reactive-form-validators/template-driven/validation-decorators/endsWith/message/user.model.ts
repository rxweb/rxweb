import {  endsWith, } from   "@rxweb/reactive-form-validators"   

export class User {

	@endsWith({value:'b'  ,message:'{{0}} does not ends with `b`' }) 
	company: string;
	
	
}
