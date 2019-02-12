import {  noneOf, prop  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @noneOf({matchValues:["HR", "Network", "Sales"]})
    department: string;

}