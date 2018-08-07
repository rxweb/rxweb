import {  compare, prop  } from "@rxweb/reactive-form-validators"
export class User {

	@prop()
	password: string;

	@compare({fieldName:'password'  ,message:'Both Input is not matched' }) 
	confirmPassword: string;

}
