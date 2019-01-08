import {  noneOf,prop  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @prop()
    department: string;

    @noneOf({matchValues:["Secondary","Senior Secondary","B.Tech","M.Tech","B.C.A.","M.C.A."], conditionalExpression: (x,y) => x.department =='DotNet'})
	qualifications: string[];

    @noneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})
    skills: string;

}