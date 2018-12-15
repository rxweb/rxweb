import {  fileSize,prop, } from "@rxweb/reactive-form-validators"

export class StorageCapacity {

	@prop()
	device: string;

	//If you want to apply conditional expression of type 'function'
	@fileSize({maxSize:50  ,conditionalExpression:(x,y) => x.device == "SmartPhone"  }) 
	documentStorageSize: string;

	//If you want to apply conditional expression of type 'string'
	@fileSize({maxSize:50  ,conditionalExpression:'x => x.device =="SmartPhone"' }) 
	photographStorageSize: string;

	@fileSize({maxSize:50  ,message:'{{0}} is not a valid size' }) 
	videoStorageSize: string;

}
