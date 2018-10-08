import {  hexColor,prop,} from "@rxweb/reactive-form-validators"

export class HexcolorInfo {

	@hexColor() 
	color: string;
	@hexColor({conditionalExpression:x => x.color == "#AFAFAF" }) 
	headerHexcolorCode: string;
}
