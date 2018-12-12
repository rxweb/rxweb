import {  time, } from "@rxweb/reactive-form-validators"

export class AttandanceDetail {

	@time({message:'You can enter only time format data' }) 
	exitTime: string;

}
