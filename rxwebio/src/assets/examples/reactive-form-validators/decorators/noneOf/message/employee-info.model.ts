import {  noneOf  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @noneOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please do not select any hobby"})
    hobbies: string;
}