"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const operators_1 = require("rxjs/operators");
const logger_1 = require("./logger");
/**
 * Keep an map of indentation => array of indentations based on the level.
 * This is to optimize calculating the prefix based on the indentation itself. Since most logs
 * come from similar levels, and with similar indentation strings, this will be shared by all
 * loggers. Also, string concatenation is expensive so performing concats for every log entries
 * is expensive; this alleviates it.
 */
const indentationMap = {};
class IndentLogger extends logger_1.Logger {
    constructor(name, parent = null, indentation = '  ') {
        super(name, parent);
        indentationMap[indentation] = indentationMap[indentation] || [''];
        const indentMap = indentationMap[indentation];
        this._observable = this._observable.pipe(operators_1.map(entry => {
            const l = entry.path.filter(x => !!x).length;
            if (l >= indentMap.length) {
                let current = indentMap[indentMap.length - 1];
                while (l >= indentMap.length) {
                    current += indentation;
                    indentMap.push(current);
                }
            }
            entry.message = indentMap[l] + entry.message.split(/\n/).join('\n' + indentMap[l]);
            return entry;
        }));
    }
}
exports.IndentLogger = IndentLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZW50LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy9sb2dnZXIvaW5kZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsOENBQXFDO0FBQ3JDLHFDQUFrQztBQUdsQzs7Ozs7O0dBTUc7QUFDSCxNQUFNLGNBQWMsR0FBMEMsRUFBRSxDQUFDO0FBR2pFLGtCQUEwQixTQUFRLGVBQU07SUFDdEMsWUFBWSxJQUFZLEVBQUUsU0FBd0IsSUFBSSxFQUFFLFdBQVcsR0FBRyxJQUFJO1FBQ3hFLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFcEIsY0FBYyxDQUFDLFdBQVcsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuRCxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM3QixPQUFPLElBQUksV0FBVyxDQUFDO29CQUN2QixTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQixDQUFDO1lBQ0gsQ0FBQztZQUVELEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkYsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0Y7QUF0QkQsb0NBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnLi9sb2dnZXInO1xuXG5cbi8qKlxuICogS2VlcCBhbiBtYXAgb2YgaW5kZW50YXRpb24gPT4gYXJyYXkgb2YgaW5kZW50YXRpb25zIGJhc2VkIG9uIHRoZSBsZXZlbC5cbiAqIFRoaXMgaXMgdG8gb3B0aW1pemUgY2FsY3VsYXRpbmcgdGhlIHByZWZpeCBiYXNlZCBvbiB0aGUgaW5kZW50YXRpb24gaXRzZWxmLiBTaW5jZSBtb3N0IGxvZ3NcbiAqIGNvbWUgZnJvbSBzaW1pbGFyIGxldmVscywgYW5kIHdpdGggc2ltaWxhciBpbmRlbnRhdGlvbiBzdHJpbmdzLCB0aGlzIHdpbGwgYmUgc2hhcmVkIGJ5IGFsbFxuICogbG9nZ2Vycy4gQWxzbywgc3RyaW5nIGNvbmNhdGVuYXRpb24gaXMgZXhwZW5zaXZlIHNvIHBlcmZvcm1pbmcgY29uY2F0cyBmb3IgZXZlcnkgbG9nIGVudHJpZXNcbiAqIGlzIGV4cGVuc2l2ZTsgdGhpcyBhbGxldmlhdGVzIGl0LlxuICovXG5jb25zdCBpbmRlbnRhdGlvbk1hcDoge1tpbmRlbnRhdGlvblR5cGU6IHN0cmluZ106IHN0cmluZ1tdfSA9IHt9O1xuXG5cbmV4cG9ydCBjbGFzcyBJbmRlbnRMb2dnZXIgZXh0ZW5kcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBhcmVudDogTG9nZ2VyIHwgbnVsbCA9IG51bGwsIGluZGVudGF0aW9uID0gJyAgJykge1xuICAgIHN1cGVyKG5hbWUsIHBhcmVudCk7XG5cbiAgICBpbmRlbnRhdGlvbk1hcFtpbmRlbnRhdGlvbl0gPSBpbmRlbnRhdGlvbk1hcFtpbmRlbnRhdGlvbl0gfHwgWycnXTtcbiAgICBjb25zdCBpbmRlbnRNYXAgPSBpbmRlbnRhdGlvbk1hcFtpbmRlbnRhdGlvbl07XG5cbiAgICB0aGlzLl9vYnNlcnZhYmxlID0gdGhpcy5fb2JzZXJ2YWJsZS5waXBlKG1hcChlbnRyeSA9PiB7XG4gICAgICBjb25zdCBsID0gZW50cnkucGF0aC5maWx0ZXIoeCA9PiAhIXgpLmxlbmd0aDtcbiAgICAgIGlmIChsID49IGluZGVudE1hcC5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSBpbmRlbnRNYXBbaW5kZW50TWFwLmxlbmd0aCAtIDFdO1xuICAgICAgICB3aGlsZSAobCA+PSBpbmRlbnRNYXAubGVuZ3RoKSB7XG4gICAgICAgICAgY3VycmVudCArPSBpbmRlbnRhdGlvbjtcbiAgICAgICAgICBpbmRlbnRNYXAucHVzaChjdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBlbnRyeS5tZXNzYWdlID0gaW5kZW50TWFwW2xdICsgZW50cnkubWVzc2FnZS5zcGxpdCgvXFxuLykuam9pbignXFxuJyArIGluZGVudE1hcFtsXSk7XG5cbiAgICAgIHJldHVybiBlbnRyeTtcbiAgICB9KSk7XG4gIH1cbn1cbiJdfQ==