import {  time, } from "@rxweb/reactive-form-validators"

export class AttandanceDetail {

	@time({allowSeconds:true }) 
	totalOutTime: string;

}
