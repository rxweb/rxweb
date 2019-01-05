import {  unique, prop, propArray, } from "@rxweb/reactive-form-validators"

export class Skill {

    @unique({additionalValidation:(fieldName)=>{ return false; }})
	skillName: string[];

}

export class Employee {

	@propArray(Skill)
	skills: Skill[];

}
