import {  unique, prop, propArray, } from "@rxweb/reactive-form-validators"

export class Skill {

    @unique()
    skillName: string[];
    
    @unique({message: 'You must enter a unique value'})
	hobbyName: string[];

}

export class Employee {

    @prop()
    fullName:string;

	@propArray(Skill)
    skills: Skill[];
    
    @propArray(Skill)
	hobbies: Skill[];

}



