import {  dataUri,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	scheme: string;

	//If you want to apply conditional expression of type 'function'
	@dataUri({conditionalExpression:(x,y) => x.scheme == "DataUri"  }) 
	imageDataUri: string;
	
	
	//If you want to apply conditional expression of type 'string'
	@dataUri({conditionalExpression:'x => x.scheme =="DataUri"' }) 
	audioDataUri: string;
	
	
	@dataUri({message:'{{0}} is not a proper data URI' }) 
	videoDataUri: string;
	
	
}
