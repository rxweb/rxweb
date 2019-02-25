import {  pattern, } from   "@rxweb/reactive-form-validators"   

export class User {

	@pattern({expression:{'zipCode':/^[0-9]{5}(?:-[0-9]{4})?$/ }  ,message:'Zip code should match 12345 or 12345-6789' }) 
	zipCode: string;
	
	
	

}
