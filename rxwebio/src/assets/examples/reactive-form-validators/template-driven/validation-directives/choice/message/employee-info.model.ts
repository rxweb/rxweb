import {  choice  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @choice({maxLength:5,message: "Please select upto 5 hobbies"})
    hobbies: string[] = [];
}