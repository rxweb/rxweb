import {  factor, } from   "@rxweb/reactive-form-validators"   

export class User {

	@factor({dividend:30  ,message:'{{0}} is not a factor of 50' }) 
	sixthNumber: number;
	
	
	

}
