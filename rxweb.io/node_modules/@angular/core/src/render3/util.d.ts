import { LElementNode } from './interfaces/node';
import { LViewData } from './interfaces/view';
/**
* Must use this method for CD (instead of === ) since NaN !== NaN
*/
export declare function isDifferent(a: any, b: any): boolean;
export declare function stringify(value: any): string;
/**
 *  Function that throws a "not implemented" error so it's clear certain
 *  behaviors/methods aren't yet ready.
 *
 * @returns Not implemented error
 */
export declare function notImplemented(): Error;
/**
 * Flattens an array in non-recursive way. Input arrays are not modified.
 */
export declare function flatten(list: any[]): any[];
/** Retrieves a value from any `LViewData`. */
export declare function loadInternal<T>(index: number, arr: LViewData): T;
export declare function assertDataInRangeInternal(index: number, arr: any[]): void;
/** Retrieves an element value from the provided `viewData`.
  *
  * Elements that are read may be wrapped in a style context,
  * therefore reading the value may involve unwrapping that.
  */
export declare function loadElementInternal(index: number, arr: LViewData): LElementNode;
export declare function readElementValue(value: LElementNode | any[]): LElementNode;
