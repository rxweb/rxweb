import {  oneOf  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @oneOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})
    projectDomains: string;
}