import {  ascii,prop, } from   "@rxweb/reactive-form-validators"   

export class User {

	@prop()
	language: string;

	//If you want to apply conditional expression of type 'string'
	@ascii({conditionalExpression:'x => x.language =="Java"' }) 
	alphabetAsciiCode: string;
	
	
	//If you want to apply conditional expression of type 'function'
	@ascii({conditionalExpression:(x,y) => x.language == "Java"  }) 
	numberAsciiCode: string;
	
	
}
