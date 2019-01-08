import {  prop, choice  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @prop()
    department: string;

    @choice({minLength:3, conditionalExpression: (x,y) => x.department =='DotNet'})
	qualifications: string[];

    @choice({maxLength: 5, conditionalExpression: "x => x.department =='DotNet'"})
    skills: string[];

}