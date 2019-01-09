import {  oneOf,prop, choice  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @prop()
    department: string;
    
    @choice({minLength:3})
    projectDomains: string[] = [];

    @choice({maxLength:8})
	qualifications: string[] = [];

    @choice({minLength:3, conditionalExpression: (x,y) => x.department == "DotNet" })
	languages: string[] = [];

    @choice({minLength:3, conditionalExpression: "x => x.department =='DotNet'"})
    skills: string[] = [];

    @choice({maxLength:5,message: "Please select upto 5 hobby"})
    hobbies: string[] = [];
}