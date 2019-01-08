import {  choice  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @choice({maxLength:4,message: "Please select upto 5 hobbies"})
    hobbies: string;
}