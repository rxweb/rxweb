import {  dataUri,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@prop()
	scheme: string;

	//If you want to apply conditional expression of type 'function'
	@dataUri({conditionalExpression:(x,y) => x.scheme == "DataUri"  }) 
	cssDataUri: string;

	//If you want to apply conditional expression of type 'string'
	@dataUri({conditionalExpression:'x => x.scheme =="DataUri"' }) 
	javascriptDataUri: string;

	@dataUri({message:'{{0}} is not a proper data URI' }) 
	htmlDataUri: string;

}
