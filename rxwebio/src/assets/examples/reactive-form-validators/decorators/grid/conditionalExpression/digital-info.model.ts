import {  grid, } from "@rxweb/reactive-form-validators"

export class DigitalInfo {

	@grid() 
	soundRecordingGrid: string;

	//If you want to apply conditional expression of type 'string'
	@grid({conditionalExpression:'x => x.soundRecordingGrid =="A12425GABC1234002M"' }) 
	photographGrid: string;

	//If you want to apply conditional expression of type 'function'
	@grid({conditionalExpression:(x,y) => x.soundRecordingGrid == "A12425GABC1234002M"  }) 
	audioVisualRecordingGrid: string;

}
