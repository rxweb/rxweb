import {  fileSize,prop, } from "@rxweb/reactive-form-validators"

export class StorageCapacity {

	//If you want to apply conditional expression of type 'string'
	@fileSize({maxSize:50  ,conditionalExpression:'x => x.device =="SmartPhone"' }) 
	photographStorageSize: string;

	//If you want to apply conditional expression of type 'function'
	@fileSize({maxSize:50  ,conditionalExpression:(x,y) => x.device == "SmartPhone"  }) 
	documentStorageSize: string;

}
