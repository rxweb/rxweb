import {  hexColor,prop, } from   "@rxweb/reactive-form-validators"   

export class HexcolorInfo {

	@prop()
	color: string;

	@prop()
	headerHexcolorCode: string;

	@prop()
	bodyHexcolorCode: string;

}
