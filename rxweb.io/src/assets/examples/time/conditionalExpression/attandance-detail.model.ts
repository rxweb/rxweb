import {  time,prop,} from "@rxweb/reactive-form-validators"

export class AttandanceDetail {

	@prop()
	entryPlace: string;
	@time({conditionalExpression:x => x.entryPlace == "Lunch Room" }) 
	entryTime: string;
}
