import {  grid, } from "@rxweb/reactive-form-validators"

export class DigitalInfo {

	@grid({message:'This is Not valid GRid' }) 
	graphicImageGrid: string;

}
