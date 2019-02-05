import {  async,prop, } from   "@rxweb/reactive-form-validators"   
import { FormControl } from "@angular/forms";

export class User {

	@async([ isUniqueUserName ]) 
	userName: string;

	@async([isUniqueEmail])
	email: string;

}
 
function isUniqueUserName(control: FormControl) {
	const promise = new Promise((resolve, reject) => {
		if (control.value != null)
			resolve(null)
		else
			resolve({ 'isUniqueUserName': true })
	});
	return promise;
}

function isUniqueEmail(control: FormControl) {
    const promise = new Promise((resolve, reject) => {
        if (control.value != null)
            resolve(null)
        else
            resolve({ 'isUniqueEmail': true })
    });
    return promise;
}