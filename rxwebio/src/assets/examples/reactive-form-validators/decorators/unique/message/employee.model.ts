import {  unique, prop, propArray, } from "@rxweb/reactive-form-validators"

export class Skill {

    @unique({message: 'You must enter a unique value'})
	hobbyName: string[];

}

export class Employee {

    @propArray(Skill)
	hobbies: Skill[];

}
