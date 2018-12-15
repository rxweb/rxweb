import {  upperCase, } from "@rxweb/reactive-form-validators"

export class Location {

	//Shows custom message
	@upperCase({message:'You can enter only upperCase letters.' }) 
	colonyName: string;

}
