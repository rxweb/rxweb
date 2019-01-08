import {  allOf  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @allOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})
    projectDomains: string;
}