import {  mac,prop, } from   "@rxweb/reactive-form-validators"   

export class MacAddressInfo {

	@prop()
	device: string;

	//If you want to apply conditional expression of type 'function'
	@mac({conditionalExpression:(x,y) => x.device == "Laptop"  }) 
	macAddress: string;
	
	
	//If you want to apply conditional expression of type 'string'
	@mac({conditionalExpression:'x => x.device =="Laptop"' }) 
	localMacAddress: string;
	
	
	@mac({message:'{{0}} is not a MAC address' }) 
	systemMacAddress: string;
	
	
}
