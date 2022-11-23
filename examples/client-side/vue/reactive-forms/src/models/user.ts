import { alpha, required, minLength } from "@rxweb/reactive-forms";

export class User {
    private _firstName: string = "";
    private _lastName: string = "";

    fullName!: string;

    
    @required()
    set firstName(value: string) {
        this._firstName = value;
        this.setFullName();
    }

    get firstName(): string {
        return this._firstName;
    }

    @required()
    set lastName(value: string) {
        this._lastName = value;
        this.setFullName();
    }

    get lastName(): string {
        return this._lastName;
    }


    @alpha()
    @minLength({value:4})
    @required()
    userName!: string;


    setFullName() {
        this.fullName = `${this.firstName} ${this.lastName}`
    }
}