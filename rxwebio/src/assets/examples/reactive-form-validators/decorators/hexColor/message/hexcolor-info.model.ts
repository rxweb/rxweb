import {  hexColor, } from   "@rxweb/reactive-form-validators"   

export class HexcolorInfo {

	@hexColor({message:'Please enter the right format of hexcode for body like "#AFAFAF"' }) 
	bodyHexcolorCode: string;
	
	
}
