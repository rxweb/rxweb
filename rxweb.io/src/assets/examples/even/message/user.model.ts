import {  even,prop, } from "@rxweb/reactive-form-validators"

export class User {

	@even({message:'{{0}} is not an even number' }) 
	multiplesOfEvenNumber: number;

}
