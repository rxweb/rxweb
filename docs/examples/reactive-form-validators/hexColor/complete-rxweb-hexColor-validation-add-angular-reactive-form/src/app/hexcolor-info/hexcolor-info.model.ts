import {  hexColor, } from "@rxweb/reactive-form-validators"
export class HexcolorInfo {

	@hexColor() 
	color: string;

	@hexColor({conditionalExpressions:x => x.age == 'Hexcolor' }) 
	headerHexcolorCode: string;

	@hexColor({message:'Please enter the right format of hexcode for body like '#AFAFAF'' }) 
	bodyHexcolorCode: string;

	@hexColor({isStrict:true }) 
	bodyHexcolorCode: string;

}
