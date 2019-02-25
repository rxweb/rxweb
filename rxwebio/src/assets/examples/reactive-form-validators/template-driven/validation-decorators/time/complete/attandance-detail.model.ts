import {  time,prop, } from   "@rxweb/reactive-form-validators"   

export class AttandanceDetail {

	@prop()
	entryPlace: string;

	//If you want to apply conditional expression of type 'function'
	@time({conditionalExpression:(x,y) => x.entryPlace == "Lunch Room"  }) 
	totalIn: string;
	
	
	

	//If you want to apply conditional expression of type 'string'
	@time({conditionalExpression:'x => x.entryPlace == "Lunch Room"' }) 
	entryTime: string;
	
	
	

	@time({allowSeconds:true }) 
	totalOutTime: string;
	
	
	

	@time({message:'You can enter only time format data' }) 
	exitTime: string;
	
	
	

}
