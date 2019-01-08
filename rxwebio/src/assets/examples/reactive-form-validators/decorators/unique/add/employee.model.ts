import {  unique, prop, propArray, } from "@rxweb/reactive-form-validators"

export class Skill {

    @unique()
	skillName: string[];

}

export class Employee {

	@propArray(Skill)
	skills: Skill[];

}