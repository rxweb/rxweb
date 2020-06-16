import { TypedForm, required } from "@rxweb/reactive-form-validators";

export class Skill extends TypedForm<Skill> {

    @required()
    name: string;
}
