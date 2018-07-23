import {  range, } from "@rxweb/reactive-form-validators"
import {prop} from '@rxweb/reactive-form-validators'
export class EmployeeInfo {

	@prop()
	age: number;

	@prop()
	experience: number;

	@prop()
	salary: number;

}
