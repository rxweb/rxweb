import {  choice  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @choice({maxLength:4})
    qualifications: string;
}