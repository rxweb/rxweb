import {  time,prop,} from "@rxweb/reactive-form-validators"

export class AttandanceDetail {

	@prop()
	entryPlace: string;
	@time({conditionalExpression:x => x.entryPlace == "Lunch Room" }) 
	entryTime: string;
	@time({allowSeconds:true }) 
	totalOutTime: string;
	@time({message:'You can enter only time format data' }) 
	exitTime: string;
}
