import {  time, } from "@rxweb/reactive-form-validators"
export class AttandanceDetail {

	@time() 
	entryPlace: string;

	@time({conditionalExpressions:x => x.entryPlace == 'Lunch Room' }) 
	entryTime: Time;

	@time({allowSeconds:true }) 
	totalOutTime: Time;

	@time({message:'You can enter only time format data' }) 
	exitTime: Time;

}
