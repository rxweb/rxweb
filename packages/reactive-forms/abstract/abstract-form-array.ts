import { AbstractControl } from "./abstract-control";

export abstract class AbstractFormArray extends AbstractControl {
    controls: any[]

    constructor(controls: any[]) {
        super([], []);
        this.controls = controls;
    }

    at(index: number) {
        return this.controls[index];
    }

    push(control: any) {
        this.controls.push(control)
    }

    removeAt(index: number) {
        if (this.controls[index])
            this.controls.splice(index, 1);
    }

    get length() {
        return this.controls.length;
    }

    
}