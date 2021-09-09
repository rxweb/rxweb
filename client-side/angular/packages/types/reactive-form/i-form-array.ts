import { IAbstractControl } from "./i-abstract-control"
import { Observable } from "rxjs";

export interface IFormArray<Item> extends IAbstractControl<Item[]> {
    controls: Item extends IAbstractControl<any> ? Item[] : Array<IAbstractControl<Item>>;
    getRawValue(): Item[];
    insert(index: number, control: IAbstractControl<Item>): void;
    

    push(control: IAbstractControl<Item>): void;

    

    setControl(index: number, control: IAbstractControl<Item>): void;
    

    readonly value: Item[];
    readonly valueChanges: Observable<Item[]>;
    at(index: number): IAbstractControl<Item>;

    removeAt(index: number): void;
    clear(): void
}