import {  noneOf  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @noneOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})
    projectDomains: string;
}