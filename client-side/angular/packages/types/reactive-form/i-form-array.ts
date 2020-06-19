import { IAbstractControl } from "./i-abstract-control"
import { Observable } from "rxjs";

export interface IFormArray<Item> extends IAbstractControl<Item[]> {
    controls: IAbstractControl<Item>[];
    getRawValue(): Item[];
    insert(index: number, control: IAbstractControl<Item>): void;
    

    push(control: IAbstractControl<Item>): void;

    

    setControl(index: number, control: IAbstractControl<Item>): void;
    

    readonly value: Item[];
    readonly valueChanges: Observable<Item[]>;
    at(index: number): IAbstractControl<Item>;
}