import { IAbstractControl } from "./i-abstract-control"
import { Observable } from "rxjs";

export interface IFormArray<Item> extends IAbstractControl<Item[]> {
    controls: IAbstractControl<Item>[];
    getRawValue(): Item[];
    insert(index: number, control: IAbstractControl<Item>, options?: {
        emitEvent?: boolean;
    }): void;

    push(control: IAbstractControl<Item>, options?: {
        emitEvent?: boolean;
    }): void;

    setControl(index: number, control: IAbstractControl<Item>, options?: {
        emitEvent?: boolean;
    }): void;

    readonly value: Item[];
    readonly valueChanges: Observable<Item[]>;
    at(index: number): IAbstractControl<Item>;

    removeAt(index: number, options?: {
        emitEvent?: boolean;
    }): void;
    clear(options?: {
        emitEvent?: boolean;
    }): void;

    length: number;
}
