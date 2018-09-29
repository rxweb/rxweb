/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/language-service/src/hover", ["require", "exports", "@angular/language-service/src/locate_symbol"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var locate_symbol_1 = require("@angular/language-service/src/locate_symbol");
    function getHover(info) {
        var result = locate_symbol_1.locateSymbol(info);
        if (result) {
            return { text: hoverTextOf(result.symbol), span: result.span };
        }
    }
    exports.getHover = getHover;
    function hoverTextOf(symbol) {
        var result = [{ text: symbol.kind }, { text: ' ' }, { text: symbol.name, language: symbol.language }];
        var container = symbol.container;
        if (container) {
            result.push({ text: ' of ' }, { text: container.name, language: container.language });
        }
        return result;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sYW5ndWFnZS1zZXJ2aWNlL3NyYy9ob3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUdILDZFQUE2QztJQUc3QyxrQkFBeUIsSUFBa0I7UUFDekMsSUFBTSxNQUFNLEdBQUcsNEJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sRUFBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUxELDRCQUtDO0lBRUQscUJBQXFCLE1BQWM7UUFDakMsSUFBTSxNQUFNLEdBQ1IsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDdkYsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxJQUFJLFNBQVMsRUFBRTtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7U0FDbkY7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1RlbXBsYXRlSW5mb30gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHtsb2NhdGVTeW1ib2x9IGZyb20gJy4vbG9jYXRlX3N5bWJvbCc7XG5pbXBvcnQge0hvdmVyLCBIb3ZlclRleHRTZWN0aW9uLCBTeW1ib2x9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SG92ZXIoaW5mbzogVGVtcGxhdGVJbmZvKTogSG92ZXJ8dW5kZWZpbmVkIHtcbiAgY29uc3QgcmVzdWx0ID0gbG9jYXRlU3ltYm9sKGluZm8pO1xuICBpZiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIHt0ZXh0OiBob3ZlclRleHRPZihyZXN1bHQuc3ltYm9sKSwgc3BhbjogcmVzdWx0LnNwYW59O1xuICB9XG59XG5cbmZ1bmN0aW9uIGhvdmVyVGV4dE9mKHN5bWJvbDogU3ltYm9sKTogSG92ZXJUZXh0U2VjdGlvbltdIHtcbiAgY29uc3QgcmVzdWx0OiBIb3ZlclRleHRTZWN0aW9uW10gPVxuICAgICAgW3t0ZXh0OiBzeW1ib2wua2luZH0sIHt0ZXh0OiAnICd9LCB7dGV4dDogc3ltYm9sLm5hbWUsIGxhbmd1YWdlOiBzeW1ib2wubGFuZ3VhZ2V9XTtcbiAgY29uc3QgY29udGFpbmVyID0gc3ltYm9sLmNvbnRhaW5lcjtcbiAgaWYgKGNvbnRhaW5lcikge1xuICAgIHJlc3VsdC5wdXNoKHt0ZXh0OiAnIG9mICd9LCB7dGV4dDogY29udGFpbmVyLm5hbWUsIGxhbmd1YWdlOiBjb250YWluZXIubGFuZ3VhZ2V9KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSJdfQ==