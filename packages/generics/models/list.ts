import { Type } from '../functions/type'
import { isObject, isEqual } from '../functions/utils'
import { getObject } from "../functions/get-instance";

export class List<T>  {
    private _entities: T[] = new Array<T>();
    constructor(values?: T[], private model?: Type<T>) {
        this.build(values);
    }

    [Symbol.iterator](): Iterator<T> {
        let pointer = 0;
        let entities = this._entities;
        return {
            next(): IteratorResult<T> {
                if (pointer < entities.length) {
                    let index = pointer++
                    if (this.model && entities[index].constructor !== this.model)
                        entities[index] = getObject(this.model, [], this.object[index])
                    return {
                        done: false,
                        value: entities[index]
                    }
                } else {
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
    }



    add(entity: T) {
        this._entities.push(this.createObject(entity));
    }

    addRange(entities: T[]) {
        for (let entity of entities)
            this.add(entity);
    }

    all(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean {
        return this._entities.every(predicate);
    }
    any(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean {
        return this._entities.some(predicate);
    }

    average(transform?: (value?: T, index?: number, list?: T[]) => any): number {
        return this.sum(transform) / this.count(transform);
    }

    contains(element: T): boolean {
        return this._entities.some(x => x === element);
    }

    concat(items: T[]): List<T> {
        if (items) {
            this.addRange(items);
            return new List<T>(this._entities, this.model);
        }
        return undefined;
    }

    count(predicate?: (value?: T, index?: number, list?: T[]) => boolean): number {
        return predicate ? this.where(predicate).count() : this._entities.length;
    }

    where(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        return new List<T>(this._entities.filter(predicate), this.model);
    }

    distinct(): List<T> {
        return this.where((value, index, iter) =>
            (isObject(value)) ?
                iter.findIndex(t => isEqual(t, value)) == index :
                iter.indexOf(value) === index
        )
    }

    distinctBy(keySelector: (key: T) => string | number): List<T> {
        const entityGroup = this.groupBy(keySelector)
        return Object.keys(entityGroup).reduce((resource: List<T>, key) => {
            resource.add(entityGroup[key][0])
            return resource
        }, new List<T>())
    }

    elementAt(index: number): T {
        if (this._entities.length > index && index >= 0)
            return this._entities[index];
    }

    except(collection: List<T>): List<T> {
        return this.where(x => !collection.contains(x))
    }

    first(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
        if (this.count()) {
            return predicate ? this.where(predicate).first() : this._entities[0];
        } else {
            throw new Error('No result found.');
        }
    }

    firstOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
        return this.count() ? this.first(predicate) : undefined;
    }

    forEach(action: (value?: T, index?: number, list?: T[]) => any): void {
        return this._entities.forEach(action)
    }


    aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any {
        return this._entities.reduce(accumulator, initialValue);
    }

    groupBy(grouper: (key: T) => any, mapper?: (element: T) => any): any {
        if (!mapper)
            mapper = value => (value);
        return this.aggregate
            ((ac, v) => ((<any>ac)[grouper(v)] ? (<any>ac)[grouper(v)].push(mapper(v)) : (<any>ac)[grouper(v)] = [mapper(v)], ac), {});
    }

    insert(index: number, element: T): void | Error {
        if (index < 0 || index > this._entities.length) {
            throw new Error('Index is out of range.');
        }
        this._entities.splice(index, 0, this.createObject(element));
    }

    join(seperator?: string): string {
        return this._entities ? this._entities.join(seperator) : null;
    }

    last(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
        if (this.count()) {
            return predicate ? this.where(predicate).last() : this._entities[this.count() - 1];
        } else {
            throw Error('No result found.');
        }
    }

    lastOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
        return this.count() ? this.last(predicate) : undefined;
    }

    get length() {
        return this._entities ? this._entities.length : 0;
    }

    max(): number
    max(predicate: (value: T, index: number, list: T[]) => number): number
    max(predicate?: (value: T, index: number, list: T[]) => number): number {
        if (!predicate)
            return this.aggregate((x, y) => x > y ? x : y);
        else
            return Math.max(...this._entities.map(predicate))
    }

    maxBy(keySelector: (key: T) => number): T {
        const entityGroup = this.groupBy(keySelector)
        let keys: any[] = Object.keys(entityGroup);
        let maxKey = Math.max(...keys);
        return entityGroup[maxKey][0];
    }

    min(): number
    min(predicate: (value: T, index: number, list: T[]) => number): number
    min(predicate?: (value: T, index: number, list: T[]) => number): number {
        if (!predicate)
            return this.aggregate((x, y) => x < y ? x : y);
        else
            return Math.min(...this._entities.map(predicate))
    }

    minBy(keySelector: (key: T) => number): T {
        const entityGroup = this.groupBy(keySelector)
        let keys: any[] = Object.keys(entityGroup);
        let minKey = Math.min(...keys);
        return entityGroup[minKey][0];
    }

    orderBy(predicate: (key: T) => any): List<T> {
        return new List<T>(this._entities.sort(this.customSort(predicate, false)));
    }

    orderByDescending(predicate: (key: T) => any): List<T> {
        return new List<T>(this._entities.sort(this.customSort(predicate, true)));
    }

    pop(): T | undefined {
        return this._entities.pop();
    }

    remove(element: T): boolean {
        return this._entities.indexOf(element) !== -1 ? (this.removeAt(this._entities.indexOf(element)), true) : false;
    }
    removeAll(predicate: (value?: T, index?: number, list?: T[]) => boolean): List<T> {
        return this.where(this._negate(predicate));
    }

    removeAt(index: number): void {
        this._entities.splice(index, 1);
    }

    reverse(): List<T> {
        return this._entities ? new List<T>(this._entities.reverse(), this.model) : new List<T>();
    }


    select(mapper: (value?: T, index?: number, list?: T[]) => any): any {
        return this._entities.map(mapper);
    }

    single(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
        if (this.count() !== 1) {
            throw new Error('Item does not contain one element.');
        } else {
            return this.first(predicate);
        }
    }

    singleOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
        return this.count() ? this.first(predicate) : undefined;
    }

    shift(): T | undefined {
        return this._entities ? this._entities.shift() : undefined;
    }

    skip(amount: number): T[] {
        return this._entities.slice(Math.max(0, amount));
    }

    sum(transform?: (value?: T, index?: number, list?: T[]) => number): number {
        return transform ? this.select(transform).sum() : this.aggregate((ac, v) => ac += (+v), 0);
    }

    take(amount: number): List<T> {
        return this._entities.slice(0, Math.max(0, amount)) as any;
    }

    get toLocaleString() {
        return this._entities ? this._entities.toLocaleString() : null;
    }

    get toString() {
        return this._entities ? this._entities.toString() : null;
    }

    private _negate<T>(predicate: (value?: T, index?: number, list?: T[]) => boolean): () => any {
        return function (): any {
            return !predicate.apply(this, arguments);
        };
    }

    private customSort(predicate: (key: T) => any, orderByDescending: boolean) {
        return (a: T, b: T) => {
            const first = predicate(a)
            const second = predicate(b)
            if (first > second) {
                return !orderByDescending ? 1 : -1
            } else if (first < second) {
                return !orderByDescending ? -1 : 1
            } else {
                return 0
            }
        }
    }

    private build(values: T[]) {
        if (values && values.length > 0) {
            this.addRange(values)
        }
    }

    private createObject(object) {
        if (this.model && object.constructor !== this.model)
            return getObject(this.model, [], object)
        return object;
    }
}