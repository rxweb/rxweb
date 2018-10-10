/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ajv from 'ajv';
import { Observable } from 'rxjs';
import { BaseException } from '../../exception/exception';
import { JsonObject } from '../interface';
import { SchemaFormat, SchemaRegistry, SchemaValidator, SchemaValidatorError, SmartDefaultProvider } from './interface';
import { JsonVisitor } from './visitor';
export declare class SchemaValidationException extends BaseException {
    readonly errors: SchemaValidatorError[];
    constructor(errors?: SchemaValidatorError[], baseMessage?: string);
    static createMessages(errors?: SchemaValidatorError[]): string[];
}
export declare class CoreSchemaRegistry implements SchemaRegistry {
    private _ajv;
    private _uriCache;
    private _pre;
    private _post;
    private _smartDefaultKeyword;
    private _sourceMap;
    private _smartDefaultRecord;
    constructor(formats?: SchemaFormat[]);
    private _fetch(uri);
    /**
     * Add a transformation step before the validation of any Json.
     * @param {JsonVisitor} visitor The visitor to transform every value.
     * @param {JsonVisitor[]} deps A list of other visitors to run before.
     */
    addPreTransform(visitor: JsonVisitor, deps?: JsonVisitor[]): void;
    /**
     * Add a transformation step after the validation of any Json. The JSON will not be validated
     * after the POST, so if transformations are not compatible with the Schema it will not result
     * in an error.
     * @param {JsonVisitor} visitor The visitor to transform every value.
     * @param {JsonVisitor[]} deps A list of other visitors to run before.
     */
    addPostTransform(visitor: JsonVisitor, deps?: JsonVisitor[]): void;
    protected _resolver(ref: string, validate: ajv.ValidateFunction): {
        context?: ajv.ValidateFunction;
        schema?: JsonObject;
    };
    compile(schema: JsonObject): Observable<SchemaValidator>;
    addFormat(format: SchemaFormat): void;
    addSmartDefaultProvider<T>(source: string, provider: SmartDefaultProvider<T>): void;
    private _applySmartDefaults(data);
}
