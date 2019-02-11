import {  async,prop, } from   "@rxweb/reactive-form-validators"   
import { FormControl } from "@angular/forms";

export class User {

	@async([ isUniqueUserName ]) 
	userName: string;

}
 
function isUniqueUserName(control: FormControl) {
	const promise = new Promise((resolve, reject) => {
		if (!control.value == false)
			resolve(null)
		else
		resolve({ 'async': 'You must enter a value' })
	});
	return promise;
}
