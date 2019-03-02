import {  ascii, } from   "@rxweb/reactive-form-validators"   

export class User {

	@ascii({message:'{{0}} is not an Ascii Code' }) 
	specialCharAsciiCode: string;
	
	
}
