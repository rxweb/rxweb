import {  choice  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @choice({maxLength:8})
    hobbies: string[] = [];
}