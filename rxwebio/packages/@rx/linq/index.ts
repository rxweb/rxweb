declare global {
    interface Array<T> {
        addRange(elements: T[]): void;

        all(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean;

        any(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean;

        average(): number;
        average(transform: (value?: T, index?: number, list?: T[]) => any): number;
        average(transform?: (value?: T, index?: number, list?: T[]) => any): number;

        contains(element: T): boolean;

        count(): number;
        count(predicate: (value?: T, index?: number, list?: T[]) => boolean): number;
        count(predicate?: (value?: T, index?: number, list?: T[]) => boolean): number;

        where(predicate: (value?: T, index?: number, list?: T[]) => boolean): T[];

        distinct(): T[];

        first(): T | Error;
        first(predicate: (value?: T, index?: number, list?: T[]) => boolean): T | Error;
        first(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error;

        firstOrDefault(): T | Error;
        firstOrDefault(predicate: (value?: T, index?: number, list?: T[]) => boolean): T | Error;
        firstOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error;

        aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any

        groupBy(grouper: (key: T) => any, mapper: (element: T) => any): any

        insert(index: number, element: T): void | Error;

        last(): T | Error;
        last(predicate: (value?: T, index?: number, list?: T[]) => boolean): T | Error;
        last(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error;

        lastOrDefault(): T | Error;
        lastOrDefault(predicate: (value?: T, index?: number, list?: T[]) => boolean): T | Error;
        lastOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error;

        max(): T;

        min(): T;

        remove(element: T): boolean;

        removeAll(predicate: (value?: T, index?: number, list?: T[]) => boolean): T[]

        removeAt(index: number): void;

        select(mapper: (value?: T, index?: number, list?: T[]) => any): any;

        single(): T | Error;

        singleOrDefault(): T | Error;

        skip(amount: number): T[];

        sum(): number;
        sum(transform: (value?: T, index?: number, list?: T[]) => number): number;
        sum(transform?: (value?: T, index?: number, list?: T[]) => number): number;

        take(amount: number): T[];
    }
}
export class Linq {

}


Array.prototype.addRange = function <T>(elements: T[]): void {
    this.push(...elements);
}

Array.prototype.all = function <T>(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean {
    return this._elements.every(predicate);
}

Array.prototype.any = function <T>(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean {
    return this.some(predicate);
}
Array.prototype.average = function <T>(transform?: (value?: T, index?: number, list?: T[]) => any): number {
    return this.sum(transform) / this.count(transform);
}

Array.prototype.contains = function <T>(element: T): boolean {
    return this.some(x => x === element);
}


Array.prototype.count = function <T>(predicate?: (value?: T, index?: number, list?: T[]) => boolean): number {
    return predicate ? this.Where(predicate).Count() : this.length;
}

Array.prototype.where = function <T>(predicate: (value?: T, index?: number, list?: T[]) => boolean): T[] {
    return this.filter(predicate);
}

Array.prototype.distinct = function <T>(): T[] {
    return this.Where((value, index, iter) => iter.indexOf(value) === index);
}

Array.prototype.first = function <T>(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
    if (this.count()) {
        return predicate ? this.where(predicate).first() : this[0];
    } else {
        throw new Error('InvalidOperationException: The source sequence is empty.');
    }
}

Array.prototype.firstOrDefault = function <T>(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
    return this.count() ? this.first(predicate) : undefined;
}

Array.prototype.aggregate = function <U, T>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any {
    return this.reduce(accumulator, initialValue);
}

Array.prototype.groupBy = function <T>(grouper: (key: T) => any, mapper: (element: T) => any): any {
    return this.aggregate
        ((ac, v) => ((<any>ac)[grouper(v)] ? (<any>ac)[grouper(v)].push(mapper(v)) : (<any>ac)[grouper(v)] = [mapper(v)], ac), {});
}

Array.prototype.insert = function <T>(index: number, element: T): void | Error {
    if (index < 0 || index > this.length) {
        throw new Error('Index is out of range.');
    }

    this.splice(index, 0, element);
}

Array.prototype.last = function <T>(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
    if (this.count()) {
        return predicate ? this.where(predicate).last() : this[this.count() - 1];
    } else {
        throw Error('InvalidOperationException: The source sequence is empty.');
    }
}

Array.prototype.lastOrDefault = function <T>(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
    return this.count() ? this.last(predicate) : undefined;
}

Array.prototype.max = function <T>(): T {
    return this.aggregate((x, y) => x > y ? x : y);
}

Array.prototype.min = function <T>(): T {
    return this.aggregate((x, y) => x < y ? x : y);
}

Array.prototype.remove = function <T>(element: T): boolean {
    return this.indexOf(element) !== -1 ? (this.removeAt(this.indexOf(element)), true) : false;
}
Array.prototype.removeAll = function <T>(predicate: (value?: T, index?: number, list?: T[]) => boolean): T[] {
    return this.where(_negate(predicate));
}

Array.prototype.removeAt = function (index: number): void {
    this.splice(index, 1);
}

Array.prototype.select = function <T>(mapper: (value?: T, index?: number, list?: T[]) => any): any {
    return this.map(mapper);
}

Array.prototype.single = function <T>(): T | Error {
    if (this.count() !== 1) {
        throw new Error('The collection does not contain exactly one element.');
    } else {
        return this.first();
    }
}

Array.prototype.singleOrDefault = function <T>(): T | Error {
    return this.count() ? this.single() : undefined;
}

Array.prototype.skip = function <T>(amount: number): T[] {
    return this.slice(Math.max(0, amount));
}

Array.prototype.sum = function <T>(transform?: (value?: T, index?: number, list?: T[]) => number): number {
    return transform ? this.select(transform).sum() : this.aggregate((ac, v) => ac += (+v), 0);
}

Array.prototype.take = function <T>(amount: number): T[] {
    return this.slice(0, Math.max(0, amount));
}

function _negate<T>(predicate: (value?: T, index?: number, list?: T[]) => boolean): () => any {
    return function (): any {
        return !predicate.apply(this, arguments);
    };
}
