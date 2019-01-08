import {  choice  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @choice({minLength:3})
    projectDomains: string[] = [];

}