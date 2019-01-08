import {  allOf,prop  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @prop()
    department: string;
    
    @allOf({matchValues:["ECommerce", "Banking","Educational","Gaming"]})
    projectDomains: string;

    @allOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})
	qualifications: string[];

    @allOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})
    skills: string;

    @allOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please select no hobbies"})
    hobbies: string;
}