import { IList } from '../interface';
import { Enumerator } from './enumerator';
import { Type } from '../functions/type'
import { isObject, isEqual } from '../functions/utils'
export class List<T> extends Array<T>  {

    constructor(private entities?: any[], private model?: Type<T>) {
        super();
        Object.setPrototypeOf(this, Object.create(List.prototype));
        this.build();
    }

    private build() {
        if (this.entities && this.entities.length > 0) {
            if (this.model && this.entities[0].constructor != this.model) {
                let enumerator = new Enumerator<T>(this.model, this.entities);
                while (enumerator.moveNext())
                    super.push(enumerator.current);
            } else
                this.addRange(this.entities);
        }

    }


    add(entity: T) {
        super.push(entity);
    }

    addRange(entities: T[]) {
        super.push(...entities);
    }

    all(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean {
        return super.every(predicate);
    }
    any(predicate: (value?: T, index?: number, list?: T[]) => boolean): boolean {
        return super.some(predicate);
    }

    average(transform?: (value?: T, index?: number, list?: T[]) => any): number {
        return this.sum(transform) / this.count(transform);
    }

    contains(element: T): boolean {
        return super.some(x => x === element);
    }


    count(predicate?: (value?: T, index?: number, list?: T[]) => boolean): number {
        return predicate ? this.where(predicate).count() : this.length;
    }

    where(predicate: (value?: T, index?: number, list?: T[]) => boolean): IList<T> {
        let result = super.filter(predicate);
        return new List<T>(result, this.model);
    }

    distinct(): IList<T> {
        return this.where((value, index, iter) =>
            (isObject(value)) ?
                iter.findIndex(t => isEqual(t, value)) == index :
                iter.indexOf(value) === index
        )
    }

    distinctBy(keySelector: (key: T) => string | number): IList<T> {
        const entityGroup = this.groupBy(keySelector)
        return Object.keys(entityGroup).reduce((resource: IList<T>, key) => {
            resource.add(entityGroup[key][0])
            return resource
        }, new List<T>())
    }

    elementAt(index: number): T {
        if (this.length > index && index >= 0)
            return this[index];
    }

    except(collection: IList<T>): IList<T> {
        return this.where(x => !collection.contains(x))
    }

    first(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
        if (this.count()) {
            return predicate ? this.where(predicate).first() : this[0];
        } else {
            throw new Error('No result found.');
        }
    }

    firstOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
        return this.count() ? this.first(predicate) : undefined;
    }

    forEach(action: (value?: T, index?: number, list?: T[]) => any): void {
        return super.forEach(action)
    }


    aggregate<U>(accumulator: (accum: U, value?: T, index?: number, list?: T[]) => any, initialValue?: U): any {
        return super.reduce(accumulator, initialValue);
    }

    groupBy(grouper: (key: T) => any, mapper?: (element: T) => any): any {
        if (!mapper)
            mapper = value => (value);
        return this.aggregate
            ((ac, v) => ((<any>ac)[grouper(v)] ? (<any>ac)[grouper(v)].push(mapper(v)) : (<any>ac)[grouper(v)] = [mapper(v)], ac), {});
    }

    insert(index: number, element: T): void | Error {
        if (index < 0 || index > this.length) {
            throw new Error('Index is out of range.');
        }
        super.splice(index, 0, element);
    }

    last(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
        if (this.count()) {
            return predicate ? this.where(predicate).last() : this[this.count() - 1];
        } else {
            throw Error('No result found.');
        }
    }

    lastOrDefault(predicate?: (value?: T, index?: number, list?: T[]) => boolean): T | Error {
        return this.count() ? this.last(predicate) : undefined;
    }

    max(): number
    max(predicate: (value: T, index: number, list: T[]) => number): number
    max(predicate?: (value: T, index: number, list: T[]) => number): number {
        if (!predicate)
            return this.aggregate((x, y) => x > y ? x : y);
        else
            return Math.max(...super.map(predicate))
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
            return Math.min(...super.map(predicate))
    }

    minBy(keySelector: (key: T) => number): T {
        const entityGroup = this.groupBy(keySelector)
        let keys: any[] = Object.keys(entityGroup);
        let minKey = Math.min(...keys);
        return entityGroup[minKey][0];
    }

    orderBy(predicate: (key: T) => any): IList<T> {
        return new List<T>(super.sort(this.customSort(predicate, false)));
    }

    orderByDescending(predicate: (key: T) => any): IList<T> {
        return new List<T>(super.sort(this.customSort(predicate, true)));
    }


    remove(element: T): boolean {
        return this.indexOf(element) !== -1 ? (this.removeAt(this.indexOf(element)), true) : false;
    }
    removeAll(predicate: (value?: T, index?: number, list?: T[]) => boolean): IList<T> {
        return this.where(this._negate(predicate));
    }

    removeAt(index: number): void {
        super.splice(index, 1);
    }


    select(mapper: (value?: T, index?: number, list?: T[]) => any): any {
        return super.map(mapper);
    }

    single(): T | Error {
        if (this.count() !== 1) {
            throw new Error('Item does not contain one element.');
        } else {
            return this.first();
        }
    }

    singleOrDefault(): T | Error {
        return this.count() ? this.single() : undefined;
    }

    skip(amount: number): T[] {
        return super.slice(Math.max(0, amount));
    }

    sum(transform?: (value?: T, index?: number, list?: T[]) => number): number {
        return transform ? this.select(transform).sum() : this.aggregate((ac, v) => ac += (+v), 0);
    }

    take(amount: number): IList<T> {
        return super.slice(0, Math.max(0, amount)) as any;
    }

    toArray(): IList<T> {
        return this;
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
}