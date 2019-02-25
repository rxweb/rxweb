import {  json,prop, } from   "@rxweb/reactive-form-validators"   

export class JsonInfo {

	@prop()
	location: string;

	//If you want to apply conditional expression of type 'string'
	@json({conditionalExpression:'x => x.location == "{CountryName:India}"'  ,message:'Enter the text in JSON format --> {key:value}' }) 
	locationJson: string;
	
	
	

	//If you want to apply conditional expression of type 'function'
	@json({conditionalExpression:(x,y)=> x.location == "{CountryName:India}"  }) 
	addressJson: string;
	
	
	

}
