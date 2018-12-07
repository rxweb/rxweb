import {  noneOf,prop  } from "@rxweb/reactive-form-validators"

export class EmployeeInfo{

    @prop()
    department: string;

	@noneOf({matchValues:["10th","12th","B.Tech","B.C.A.","M.Tech","M.C.A."]})
	qualifications: string[];
	
    @noneOf({matchValues: ["MVC", "AngularJS","Angular 5","C#","Web Api","SQL Server"], conditionalExpression: "x => x.department =='DotNet'"})
    skills: string[];
	

    @noneOf({matchValues:["Drawing", "Singing","Dancing","Travelling","Sports"],message: "Please select all hobbies"})
    hobbies: string[];
}