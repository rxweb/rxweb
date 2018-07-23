import {  minNumber, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class ResultInfo {

	@prop()
	maths: number;

	@prop()
	science: number;

	@prop()
	statastics: number;

}
