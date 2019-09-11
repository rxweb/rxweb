import { getObject } from "../functions/get-instance";
import { Type } from '../functions/type'    
export class Enumerator<T>{
    private _current: any;

    public get current(): T {
        return this._current;
    }


    private currentIndex: number = 0;
    private isNext: boolean = true;

    constructor(private model: Type<T>, private object: any[]) {
        this.setIsNext();
    }

    private setIsNext() {
        this.isNext = this.object && this.object.length > 0;
    }

    moveNext(): boolean {
        this.isNext = this.object.length > this.currentIndex;
        if (this.isNext) {
            this._current = getObject(this.model, [], this.object[this.currentIndex]);
            this.currentIndex = this.currentIndex + 1;
        }
        return this.isNext;
    };

    reset() {
        this.currentIndex = 0;
        this.setIsNext();
    }
} 