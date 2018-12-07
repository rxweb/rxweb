import {  noneOf,prop  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

	@noneOf({matchValues:["10th","12th","B.Tech","B.C.A.","M.Tech","M.C.A."]})
	qualifications: string[];

}