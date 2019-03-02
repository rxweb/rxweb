import {  hexColor, } from   "@rxweb/reactive-form-validators"   

export class HexcolorInfo {

	@hexColor() 
	color: string;
	
	
	//If you want to apply conditional expression of type 'string'
	@hexColor({conditionalExpression:'x => x.color == "#AFAFAF"' }) 
	headerHexcolorCode: string;
	
	
	//If you want to apply conditional expression of type 'function'
	@hexColor({conditionalExpression:(x,y) =>x.color == "#AFAFAF" }) 
	footerHexCode: string;
	
	
}
