"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class InvalidInputOptions extends core_1.schema.SchemaValidationException {
    constructor(options, errors) {
        super(errors, `Schematic input does not validate against the Schema: ${JSON.stringify(options)}\nErrors:\n`);
    }
}
exports.InvalidInputOptions = InvalidInputOptions;
// This can only be used in NodeJS.
function validateOptionsWithSchema(registry) {
    return (schematic, options) => {
        // Prevent a schematic from changing the options object by making a copy of it.
        options = core_1.deepCopy(options);
        if (schematic.schema && schematic.schemaJson) {
            // Make a deep copy of options.
            return registry
                .compile(schematic.schemaJson)
                .pipe(operators_1.mergeMap(validator => validator(options)), operators_1.first(), operators_1.map(result => {
                if (!result.success) {
                    throw new InvalidInputOptions(options, result.errors || []);
                }
                return options;
            }));
        }
        return rxjs_1.of(options);
    };
}
exports.validateOptionsWithSchema = validateOptionsWithSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLW9wdGlvbi10cmFuc2Zvcm0uanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3MvdG9vbHMvc2NoZW1hLW9wdGlvbi10cmFuc2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FBd0Q7QUFDeEQsK0JBQXNEO0FBQ3RELDhDQUFzRDtBQVF0RCx5QkFBeUMsU0FBUSxhQUFNLENBQUMseUJBQXlCO0lBQy9FLFlBQVksT0FBVSxFQUFFLE1BQXFDO1FBQzNELEtBQUssQ0FDSCxNQUFNLEVBQ04seURBQXlELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FDOUYsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQVBELGtEQU9DO0FBRUQsbUNBQW1DO0FBQ25DLG1DQUEwQyxRQUErQjtJQUN2RSxPQUFPLENBQWUsU0FBd0IsRUFBRSxPQUFVLEVBQWlCLEVBQUU7UUFDM0UsK0VBQStFO1FBQy9FLE9BQU8sR0FBRyxlQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUIsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDNUMsK0JBQStCO1lBQy9CLE9BQU8sUUFBUTtpQkFDWixPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztpQkFDN0IsSUFBSSxDQUNILG9CQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsRUFDekMsaUJBQUssRUFBRSxFQUNQLGVBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtvQkFDbkIsTUFBTSxJQUFJLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUM3RDtnQkFFRCxPQUFPLE9BQU8sQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FDSCxDQUFDO1NBQ0w7UUFFRCxPQUFPLFNBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUM7QUFDSixDQUFDO0FBeEJELDhEQXdCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IGRlZXBDb3B5LCBzY2hlbWEgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpcnN0LCBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU2NoZW1hdGljRGVzY3JpcHRpb24gfSBmcm9tICcuLi9zcmMnO1xuaW1wb3J0IHsgRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjcmlwdGlvbiwgRmlsZVN5c3RlbVNjaGVtYXRpY0Rlc2NyaXB0aW9uIH0gZnJvbSAnLi9kZXNjcmlwdGlvbic7XG5cbmV4cG9ydCB0eXBlIFNjaGVtYXRpY0Rlc2MgPVxuICBTY2hlbWF0aWNEZXNjcmlwdGlvbjxGaWxlU3lzdGVtQ29sbGVjdGlvbkRlc2NyaXB0aW9uLCBGaWxlU3lzdGVtU2NoZW1hdGljRGVzY3JpcHRpb24+O1xuXG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkSW5wdXRPcHRpb25zPFQgPSB7fT4gZXh0ZW5kcyBzY2hlbWEuU2NoZW1hVmFsaWRhdGlvbkV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFQsIGVycm9yczogc2NoZW1hLlNjaGVtYVZhbGlkYXRvckVycm9yW10pIHtcbiAgICBzdXBlcihcbiAgICAgIGVycm9ycyxcbiAgICAgIGBTY2hlbWF0aWMgaW5wdXQgZG9lcyBub3QgdmFsaWRhdGUgYWdhaW5zdCB0aGUgU2NoZW1hOiAke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfVxcbkVycm9yczpcXG5gLFxuICAgICk7XG4gIH1cbn1cblxuLy8gVGhpcyBjYW4gb25seSBiZSB1c2VkIGluIE5vZGVKUy5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU9wdGlvbnNXaXRoU2NoZW1hKHJlZ2lzdHJ5OiBzY2hlbWEuU2NoZW1hUmVnaXN0cnkpIHtcbiAgcmV0dXJuIDxUIGV4dGVuZHMge30+KHNjaGVtYXRpYzogU2NoZW1hdGljRGVzYywgb3B0aW9uczogVCk6IE9ic2VydmFibGU8VD4gPT4ge1xuICAgIC8vIFByZXZlbnQgYSBzY2hlbWF0aWMgZnJvbSBjaGFuZ2luZyB0aGUgb3B0aW9ucyBvYmplY3QgYnkgbWFraW5nIGEgY29weSBvZiBpdC5cbiAgICBvcHRpb25zID0gZGVlcENvcHkob3B0aW9ucyk7XG5cbiAgICBpZiAoc2NoZW1hdGljLnNjaGVtYSAmJiBzY2hlbWF0aWMuc2NoZW1hSnNvbikge1xuICAgICAgLy8gTWFrZSBhIGRlZXAgY29weSBvZiBvcHRpb25zLlxuICAgICAgcmV0dXJuIHJlZ2lzdHJ5XG4gICAgICAgIC5jb21waWxlKHNjaGVtYXRpYy5zY2hlbWFKc29uKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtZXJnZU1hcCh2YWxpZGF0b3IgPT4gdmFsaWRhdG9yKG9wdGlvbnMpKSxcbiAgICAgICAgICBmaXJzdCgpLFxuICAgICAgICAgIG1hcChyZXN1bHQgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZElucHV0T3B0aW9ucyhvcHRpb25zLCByZXN1bHQuZXJyb3JzIHx8IFtdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9ic2VydmFibGVPZihvcHRpb25zKTtcbiAgfTtcbn1cbiJdfQ==