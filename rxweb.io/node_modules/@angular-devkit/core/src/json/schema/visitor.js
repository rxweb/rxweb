"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("../../utils");
const pointer_1 = require("./pointer");
function _getObjectSubSchema(schema, key) {
    if (typeof schema !== 'object' || schema === null) {
        return undefined;
    }
    // Is it an object schema?
    if (typeof schema.properties == 'object' || schema.type == 'object') {
        if (typeof schema.properties == 'object'
            && typeof schema.properties[key] == 'object') {
            return schema.properties[key];
        }
        if (typeof schema.additionalProperties == 'object') {
            return schema.additionalProperties;
        }
        return undefined;
    }
    // Is it an array schema?
    if (typeof schema.items == 'object' || schema.type == 'array') {
        return typeof schema.items == 'object' ? schema.items : undefined;
    }
    return undefined;
}
function _visitJsonRecursive(json, visitor, ptr, schema, refResolver, context, // tslint:disable-line:no-any
root) {
    if (schema && schema.hasOwnProperty('$ref') && typeof schema['$ref'] == 'string') {
        if (refResolver) {
            const resolved = refResolver(schema['$ref'], context);
            schema = resolved.schema;
            context = resolved.context;
        }
    }
    const value = visitor(json, ptr, schema, root);
    return (utils_1.isObservable(value)
        ? value
        : rxjs_1.of(value)).pipe(operators_1.concatMap((value) => {
        if (Array.isArray(value)) {
            return rxjs_1.concat(rxjs_1.from(value).pipe(operators_1.mergeMap((item, i) => {
                return _visitJsonRecursive(item, visitor, pointer_1.joinJsonPointer(ptr, '' + i), _getObjectSubSchema(schema, '' + i), refResolver, context, root || value).pipe(operators_1.tap(x => value[i] = x));
            }), operators_1.ignoreElements()), rxjs_1.of(value));
        }
        else if (typeof value == 'object' && value !== null) {
            return rxjs_1.concat(rxjs_1.from(Object.getOwnPropertyNames(value)).pipe(operators_1.mergeMap(key => {
                return _visitJsonRecursive(value[key], visitor, pointer_1.joinJsonPointer(ptr, key), _getObjectSubSchema(schema, key), refResolver, context, root || value).pipe(operators_1.tap(x => value[key] = x));
            }), operators_1.ignoreElements()), rxjs_1.of(value));
        }
        else {
            return rxjs_1.of(value);
        }
    }));
}
/**
 * Visit all the properties in a JSON object, allowing to transform them. It supports calling
 * properties synchronously or asynchronously (through Observables).
 * The original object can be mutated or replaced entirely. In case where it's replaced, the new
 * value is returned. When it's mutated though the original object will be changed.
 *
 * Please note it is possible to have an infinite loop here (which will result in a stack overflow)
 * if you return 2 objects that references each others (or the same object all the time).
 *
 * @param {JsonValue} json The Json value to visit.
 * @param {JsonVisitor} visitor A function that will be called on every items.
 * @param {JsonObject} schema A JSON schema to pass through to the visitor (where possible).
 * @param refResolver a function to resolve references in the schema.
 * @returns {Observable< | undefined>} The observable of the new root, if the root changed.
 */
function visitJson(json, visitor, schema, refResolver, context) {
    return _visitJsonRecursive(json, visitor, pointer_1.buildJsonPointer([]), schema, refResolver, context);
}
exports.visitJson = visitJson;
function visitJsonSchema(schema, visitor) {
    const keywords = {
        additionalItems: true,
        items: true,
        contains: true,
        additionalProperties: true,
        propertyNames: true,
        not: true,
    };
    const propsKeywords = {
        definitions: true,
        properties: true,
        patternProperties: true,
        additionalProperties: true,
        dependencies: true,
        items: true,
    };
    function _traverse(schema, jsonPtr, rootSchema, parentSchema, keyIndex) {
        if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
            visitor(schema, jsonPtr, parentSchema, keyIndex);
            for (const key of Object.keys(schema)) {
                const sch = schema[key];
                if (Array.isArray(sch)) {
                    if (key == 'items') {
                        for (let i = 0; i < sch.length; i++) {
                            _traverse(sch[i], pointer_1.joinJsonPointer(jsonPtr, key, '' + i), rootSchema, schema, '' + i);
                        }
                    }
                }
                else if (key in propsKeywords) {
                    if (sch && typeof sch == 'object') {
                        for (const prop of Object.keys(sch)) {
                            _traverse(sch[prop], pointer_1.joinJsonPointer(jsonPtr, key, prop), rootSchema, schema, prop);
                        }
                    }
                }
                else if (key in keywords) {
                    _traverse(sch, pointer_1.joinJsonPointer(jsonPtr, key), rootSchema, schema, key);
                }
            }
        }
    }
    _traverse(schema, pointer_1.buildJsonPointer([]), schema);
}
exports.visitJsonSchema = visitJsonSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvci5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvanNvbi9zY2hlbWEvdmlzaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtCQUFvRTtBQUNwRSw4Q0FBMEU7QUFDMUUsdUNBQTJDO0FBRzNDLHVDQUE4RDtBQXlCOUQsNkJBQ0UsTUFBOEIsRUFDOUIsR0FBVztJQUVYLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDakQsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFFRCwwQkFBMEI7SUFDMUIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxVQUFVLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFO1FBQ25FLElBQUksT0FBTyxNQUFNLENBQUMsVUFBVSxJQUFJLFFBQVE7ZUFDakMsT0FBUSxNQUFNLENBQUMsVUFBeUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLEVBQUU7WUFDaEUsT0FBUSxNQUFNLENBQUMsVUFBeUIsQ0FBQyxHQUFHLENBQWUsQ0FBQztTQUM3RDtRQUNELElBQUksT0FBTyxNQUFNLENBQUMsb0JBQW9CLElBQUksUUFBUSxFQUFFO1lBQ2xELE9BQU8sTUFBTSxDQUFDLG9CQUFrQyxDQUFDO1NBQ2xEO1FBRUQsT0FBTyxTQUFTLENBQUM7S0FDbEI7SUFFRCx5QkFBeUI7SUFDekIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFO1FBQzdELE9BQU8sT0FBTyxNQUFNLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUUsTUFBTSxDQUFDLEtBQW9CLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztLQUNuRjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFF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RUFBRSxFQUFFOzRCQUNuQyxTQUFTLENBQ1AsR0FBRyxDQUFDLENBQUMsQ0FBYyxFQUNuQix5QkFBZSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUNyQyxVQUFVLEVBQ1YsTUFBTSxFQUNOLEVBQUUsR0FBRyxDQUFDLENBQ1AsQ0FBQzt5QkFDSDtxQkFDRjtpQkFDRjtxQkFBTSxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUU7b0JBQy9CLElBQUksR0FBRyxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRTt3QkFDakMsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzRCQUNuQyxTQUFTLENBQ1AsR0FBRyxDQUFDLElBQUksQ0FBZSxFQUN2Qix5QkFBZSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQ25DLFVBQVUsRUFDVixNQUFNLEVBQ04sSUFBSSxDQUNMLENBQUM7eUJBQ0g7cUJBQ0Y7aUJBQ0Y7cUJBQU0sSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFO29CQUMxQixTQUFTLENBQUMsR0FBaUIsRUFBRSx5QkFBZSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN0RjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQU0sRUFBRSwwQkFBZ0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBL0RELDBDQStEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IE9ic2VydmFibGUsIGNvbmNhdCwgZnJvbSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGlnbm9yZUVsZW1lbnRzLCBtZXJnZU1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgaXNPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgSnNvbkFycmF5LCBKc29uT2JqZWN0LCBKc29uVmFsdWUgfSBmcm9tICcuLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSnNvblBvaW50ZXIgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBidWlsZEpzb25Qb2ludGVyLCBqb2luSnNvblBvaW50ZXIgfSBmcm9tICcuL3BvaW50ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIEpzb25TY2hlbWFWaXNpdG9yIHtcbiAgKFxuICAgIGN1cnJlbnQ6IEpzb25PYmplY3QgfCBKc29uQXJyYXksXG4gICAgcG9pbnRlcjogSnNvblBvaW50ZXIsXG4gICAgcGFyZW50U2NoZW1hPzogSnNvbk9iamVjdCB8IEpzb25BcnJheSxcbiAgICBpbmRleD86IHN0cmluZyxcbiAgKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKc29uVmlzaXRvciB7XG4gIChcbiAgICB2YWx1ZTogSnNvblZhbHVlLFxuICAgIHBvaW50ZXI6IEpzb25Qb2ludGVyLFxuICAgIHNjaGVtYT86IEpzb25PYmplY3QsXG4gICAgcm9vdD86IEpzb25PYmplY3QgfCBKc29uQXJyYXksXG4gICk6IE9ic2VydmFibGU8SnNvblZhbHVlPiB8IEpzb25WYWx1ZTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIFJlZmVyZW5jZVJlc29sdmVyPENvbnRleHRUPiB7XG4gIChyZWY6IHN0cmluZywgY29udGV4dD86IENvbnRleHRUKTogeyBjb250ZXh0PzogQ29udGV4dFQsIHNjaGVtYT86IEpzb25PYmplY3QgfTtcbn1cblxuZnVuY3Rpb24gX2dldE9iamVjdFN1YlNjaGVtYShcbiAgc2NoZW1hOiBKc29uT2JqZWN0IHwgdW5kZWZpbmVkLFxuICBrZXk6IHN0cmluZyxcbik6IEpzb25PYmplY3QgfCB1bmRlZmluZWQge1xuICBpZiAodHlwZW9mIHNjaGVtYSAhPT0gJ29iamVjdCcgfHwgc2NoZW1hID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIElzIGl0IGFuIG9iamVjdCBzY2hlbWE/XG4gIGlmICh0eXBlb2Ygc2NoZW1hLnByb3BlcnRpZXMgPT0gJ29iamVjdCcgfHwgc2NoZW1hLnR5cGUgPT0gJ29iamVjdCcpIHtcbiAgICBpZiAodHlwZW9mIHNjaGVtYS5wcm9wZXJ0aWVzID09ICdvYmplY3QnXG4gICAgICAgICYmIHR5cGVvZiAoc2NoZW1hLnByb3BlcnRpZXMgYXMgSnNvbk9iamVjdClba2V5XSA9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIChzY2hlbWEucHJvcGVydGllcyBhcyBKc29uT2JqZWN0KVtrZXldIGFzIEpzb25PYmplY3Q7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzID09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzIGFzIEpzb25PYmplY3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIElzIGl0IGFuIGFycmF5IHNjaGVtYT9cbiAgaWYgKHR5cGVvZiBzY2hlbWEuaXRlbXMgPT0gJ29iamVjdCcgfHwgc2NoZW1hLnR5cGUgPT0gJ2FycmF5Jykge1xuICAgIHJldHVybiB0eXBlb2Ygc2NoZW1hLml0ZW1zID09ICdvYmplY3QnID8gKHNjaGVtYS5pdGVtcyBhcyBKc29uT2JqZWN0KSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIF92aXNpdEpzb25SZWN1cnNpdmU8Q29udGV4dFQ+KFxuICBqc29uOiBKc29uVmFsdWUsXG4gIHZpc2l0b3I6IEpzb25WaXNpdG9yLFxuICBwdHI6IEpzb25Qb2ludGVyLFxuICBzY2hlbWE/OiBKc29uT2JqZWN0LFxuICByZWZSZXNvbHZlcj86IFJlZmVyZW5jZVJlc29sdmVyPENvbnRleHRUPixcbiAgY29udGV4dD86IENvbnRleHRULCAgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1hbnlcbiAgcm9vdD86IEpzb25PYmplY3QgfCBKc29uQXJyYXksXG4pOiBPYnNlcnZhYmxlPEpzb25WYWx1ZT4ge1xuICBpZiAoc2NoZW1hICYmIHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnJHJlZicpICYmIHR5cGVvZiBzY2hlbWFbJyRyZWYnXSA9PSAnc3RyaW5nJykge1xuICAgIGlmIChyZWZSZXNvbHZlcikge1xuICAgICAgY29uc3QgcmVzb2x2ZWQgPSByZWZSZXNvbHZlcihzY2hlbWFbJyRyZWYnXSBhcyBzdHJpbmcsIGNvbnRleHQpO1xuICAgICAgc2NoZW1hID0gcmVzb2x2ZWQuc2NoZW1hO1xuICAgICAgY29udGV4dCA9IHJlc29sdmVkLmNvbnRleHQ7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgdmFsdWUgPSB2aXNpdG9yKGpzb24sIHB0ciwgc2NoZW1hLCByb290KTtcblxuICByZXR1cm4gKGlzT2JzZXJ2YWJsZSh2YWx1ZSlcbiAgICAgID8gdmFsdWUgYXMgT2JzZXJ2YWJsZTxKc29uVmFsdWU+XG4gICAgICA6IG9ic2VydmFibGVPZih2YWx1ZSBhcyBKc29uVmFsdWUpXG4gICkucGlwZShcbiAgICBjb25jYXRNYXAoKHZhbHVlOiBKc29uVmFsdWUpID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gY29uY2F0KFxuICAgICAgICAgIGZyb20odmFsdWUpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gX3Zpc2l0SnNvblJlY3Vyc2l2ZShcbiAgICAgICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgICAgIHZpc2l0b3IsXG4gICAgICAgICAgICAgICAgam9pbkpzb25Qb2ludGVyKHB0ciwgJycgKyBpKSxcbiAgICAgICAgICAgICAgICBfZ2V0T2JqZWN0U3ViU2NoZW1hKHNjaGVtYSwgJycgKyBpKSxcbiAgICAgICAgICAgICAgICByZWZSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgIHJvb3QgfHwgdmFsdWUsXG4gICAgICAgICAgICAgICkucGlwZSh0YXA8SnNvblZhbHVlPih4ID0+IHZhbHVlW2ldID0geCkpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBpZ25vcmVFbGVtZW50cygpLFxuICAgICAgICAgICksXG4gICAgICAgICAgb2JzZXJ2YWJsZU9mKHZhbHVlKSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBjb25jYXQoXG4gICAgICAgICAgZnJvbShPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSkpLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChrZXkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gX3Zpc2l0SnNvblJlY3Vyc2l2ZShcbiAgICAgICAgICAgICAgICB2YWx1ZVtrZXldLFxuICAgICAgICAgICAgICAgIHZpc2l0b3IsXG4gICAgICAgICAgICAgICAgam9pbkpzb25Qb2ludGVyKHB0ciwga2V5KSxcbiAgICAgICAgICAgICAgICBfZ2V0T2JqZWN0U3ViU2NoZW1hKHNjaGVtYSwga2V5KSxcbiAgICAgICAgICAgICAgICByZWZSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgIHJvb3QgfHwgdmFsdWUsXG4gICAgICAgICAgICAgICkucGlwZSh0YXA8SnNvblZhbHVlPih4ID0+IHZhbHVlW2tleV0gPSB4KSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGlnbm9yZUVsZW1lbnRzKCksXG4gICAgICAgICAgICksXG4gICAgICAgICAgIG9ic2VydmFibGVPZih2YWx1ZSksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KSxcbiAgKTtcbn1cblxuLyoqXG4gKiBWaXNpdCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gYSBKU09OIG9iamVjdCwgYWxsb3dpbmcgdG8gdHJhbnNmb3JtIHRoZW0uIEl0IHN1cHBvcnRzIGNhbGxpbmdcbiAqIHByb3BlcnRpZXMgc3luY2hyb25vdXNseSBvciBhc3luY2hyb25vdXNseSAodGhyb3VnaCBPYnNlcnZhYmxlcykuXG4gKiBUaGUgb3JpZ2luYWwgb2JqZWN0IGNhbiBiZSBtdXRhdGVkIG9yIHJlcGxhY2VkIGVudGlyZWx5LiBJbiBjYXNlIHdoZXJlIGl0J3MgcmVwbGFjZWQsIHRoZSBuZXdcbiAqIHZhbHVlIGlzIHJldHVybmVkLiBXaGVuIGl0J3MgbXV0YXRlZCB0aG91Z2ggdGhlIG9yaWdpbmFsIG9iamVjdCB3aWxsIGJlIGNoYW5nZWQuXG4gKlxuICogUGxlYXNlIG5vdGUgaXQgaXMgcG9zc2libGUgdG8gaGF2ZSBhbiBpbmZpbml0ZSBsb29wIGhlcmUgKHdoaWNoIHdpbGwgcmVzdWx0IGluIGEgc3RhY2sgb3ZlcmZsb3cpXG4gKiBpZiB5b3UgcmV0dXJuIDIgb2JqZWN0cyB0aGF0IHJlZmVyZW5jZXMgZWFjaCBvdGhlcnMgKG9yIHRoZSBzYW1lIG9iamVjdCBhbGwgdGhlIHRpbWUpLlxuICpcbiAqIEBwYXJhbSB7SnNvblZhbHVlfSBqc29uIFRoZSBKc29uIHZhbHVlIHRvIHZpc2l0LlxuICogQHBhcmFtIHtKc29uVmlzaXRvcn0gdmlzaXRvciBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgb24gZXZlcnkgaXRlbXMuXG4gKiBAcGFyYW0ge0pzb25PYmplY3R9IHNjaGVtYSBBIEpTT04gc2NoZW1hIHRvIHBhc3MgdGhyb3VnaCB0byB0aGUgdmlzaXRvciAod2hlcmUgcG9zc2libGUpLlxuICogQHBhcmFtIHJlZlJlc29sdmVyIGEgZnVuY3Rpb24gdG8gcmVzb2x2ZSByZWZlcmVuY2VzIGluIHRoZSBzY2hlbWEuXG4gKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTwgfCB1bmRlZmluZWQ+fSBUaGUgb2JzZXJ2YWJsZSBvZiB0aGUgbmV3IHJvb3QsIGlmIHRoZSByb290IGNoYW5nZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdEpzb248Q29udGV4dFQ+KFxuICBqc29uOiBKc29uVmFsdWUsXG4gIHZpc2l0b3I6IEpzb25WaXNpdG9yLFxuICBzY2hlbWE/OiBKc29uT2JqZWN0LFxuICByZWZSZXNvbHZlcj86IFJlZmVyZW5jZVJlc29sdmVyPENvbnRleHRUPixcbiAgY29udGV4dD86IENvbnRleHRULCAgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1hbnlcbik6IE9ic2VydmFibGU8SnNvblZhbHVlPiB7XG4gIHJldHVybiBfdmlzaXRKc29uUmVjdXJzaXZlKGpzb24sIHZpc2l0b3IsIGJ1aWxkSnNvblBvaW50ZXIoW10pLCBzY2hlbWEsIHJlZlJlc29sdmVyLCBjb250ZXh0KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gdmlzaXRKc29uU2NoZW1hKHNjaGVtYTogSnNvbk9iamVjdCwgdmlzaXRvcjogSnNvblNjaGVtYVZpc2l0b3IpIHtcbiAgY29uc3Qga2V5d29yZHMgPSB7XG4gICAgYWRkaXRpb25hbEl0ZW1zOiB0cnVlLFxuICAgIGl0ZW1zOiB0cnVlLFxuICAgIGNvbnRhaW5zOiB0cnVlLFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB0cnVlLFxuICAgIHByb3BlcnR5TmFtZXM6IHRydWUsXG4gICAgbm90OiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0IHByb3BzS2V5d29yZHMgPSB7XG4gICAgZGVmaW5pdGlvbnM6IHRydWUsXG4gICAgcHJvcGVydGllczogdHJ1ZSxcbiAgICBwYXR0ZXJuUHJvcGVydGllczogdHJ1ZSxcbiAgICBhZGRpdGlvbmFsUHJvcGVydGllczogdHJ1ZSxcbiAgICBkZXBlbmRlbmNpZXM6IHRydWUsXG4gICAgaXRlbXM6IHRydWUsXG4gIH07XG5cbiAgZnVuY3Rpb24gX3RyYXZlcnNlKFxuICAgIHNjaGVtYTogSnNvbk9iamVjdCB8IEpzb25BcnJheSxcbiAgICBqc29uUHRyOiBKc29uUG9pbnRlcixcbiAgICByb290U2NoZW1hOiBKc29uT2JqZWN0LFxuICAgIHBhcmVudFNjaGVtYT86IEpzb25PYmplY3QgfCBKc29uQXJyYXksXG4gICAga2V5SW5kZXg/OiBzdHJpbmcsXG4gICkge1xuICAgIGlmIChzY2hlbWEgJiYgdHlwZW9mIHNjaGVtYSA9PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XG4gICAgICB2aXNpdG9yKHNjaGVtYSwganNvblB0ciwgcGFyZW50U2NoZW1hLCBrZXlJbmRleCk7XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYSkpIHtcbiAgICAgICAgY29uc3Qgc2NoID0gc2NoZW1hW2tleV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaCkpIHtcbiAgICAgICAgICBpZiAoa2V5ID09ICdpdGVtcycpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIF90cmF2ZXJzZShcbiAgICAgICAgICAgICAgICBzY2hbaV0gYXMgSnNvbkFycmF5LFxuICAgICAgICAgICAgICAgIGpvaW5Kc29uUG9pbnRlcihqc29uUHRyLCBrZXksICcnICsgaSksXG4gICAgICAgICAgICAgICAgcm9vdFNjaGVtYSxcbiAgICAgICAgICAgICAgICBzY2hlbWEsXG4gICAgICAgICAgICAgICAgJycgKyBpLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChrZXkgaW4gcHJvcHNLZXl3b3Jkcykge1xuICAgICAgICAgIGlmIChzY2ggJiYgdHlwZW9mIHNjaCA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKHNjaCkpIHtcbiAgICAgICAgICAgICAgX3RyYXZlcnNlKFxuICAgICAgICAgICAgICAgIHNjaFtwcm9wXSBhcyBKc29uT2JqZWN0LFxuICAgICAgICAgICAgICAgIGpvaW5Kc29uUG9pbnRlcihqc29uUHRyLCBrZXksIHByb3ApLFxuICAgICAgICAgICAgICAgIHJvb3RTY2hlbWEsXG4gICAgICAgICAgICAgICAgc2NoZW1hLFxuICAgICAgICAgICAgICAgIHByb3AsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGtleSBpbiBrZXl3b3Jkcykge1xuICAgICAgICAgIF90cmF2ZXJzZShzY2ggYXMgSnNvbk9iamVjdCwgam9pbkpzb25Qb2ludGVyKGpzb25QdHIsIGtleSksIHJvb3RTY2hlbWEsIHNjaGVtYSwga2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF90cmF2ZXJzZShzY2hlbWEsIGJ1aWxkSnNvblBvaW50ZXIoW10pLCBzY2hlbWEpO1xufVxuIl19