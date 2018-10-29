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
        define("@angular/compiler/src/ml_parser/html_tags", ["require", "exports", "@angular/compiler/src/ml_parser/tags"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tags_1 = require("@angular/compiler/src/ml_parser/tags");
    var HtmlTagDefinition = /** @class */ (function () {
        function HtmlTagDefinition(_a) {
            var _b = _a === void 0 ? {} : _a, closedByChildren = _b.closedByChildren, requiredParents = _b.requiredParents, implicitNamespacePrefix = _b.implicitNamespacePrefix, _c = _b.contentType, contentType = _c === void 0 ? tags_1.TagContentType.PARSABLE_DATA : _c, _d = _b.closedByParent, closedByParent = _d === void 0 ? false : _d, _e = _b.isVoid, isVoid = _e === void 0 ? false : _e, _f = _b.ignoreFirstLf, ignoreFirstLf = _f === void 0 ? false : _f;
            var _this = this;
            this.closedByChildren = {};
            this.closedByParent = false;
            this.canSelfClose = false;
            if (closedByChildren && closedByChildren.length > 0) {
                closedByChildren.forEach(function (tagName) { return _this.closedByChildren[tagName] = true; });
            }
            this.isVoid = isVoid;
            this.closedByParent = closedByParent || isVoid;
            if (requiredParents && requiredParents.length > 0) {
                this.requiredParents = {};
                // The first parent is the list is automatically when none of the listed parents are present
                this.parentToAdd = requiredParents[0];
                requiredParents.forEach(function (tagName) { return _this.requiredParents[tagName] = true; });
            }
            this.implicitNamespacePrefix = implicitNamespacePrefix || null;
            this.contentType = contentType;
            this.ignoreFirstLf = ignoreFirstLf;
        }
        HtmlTagDefinition.prototype.requireExtraParent = function (currentParent) {
            if (!this.requiredParents) {
                return false;
            }
            if (!currentParent) {
                return true;
            }
            var lcParent = currentParent.toLowerCase();
            var isParentTemplate = lcParent === 'template' || currentParent === 'ng-template';
            return !isParentTemplate && this.requiredParents[lcParent] != true;
        };
        HtmlTagDefinition.prototype.isClosedByChild = function (name) {
            return this.isVoid || name.toLowerCase() in this.closedByChildren;
        };
        return HtmlTagDefinition;
    }());
    exports.HtmlTagDefinition = HtmlTagDefinition;
    var _DEFAULT_TAG_DEFINITION;
    // see http://www.w3.org/TR/html51/syntax.html#optional-tags
    // This implementation does not fully conform to the HTML5 spec.
    var TAG_DEFINITIONS;
    function getHtmlTagDefinition(tagName) {
        if (!TAG_DEFINITIONS) {
            _DEFAULT_TAG_DEFINITION = new HtmlTagDefinition();
            TAG_DEFINITIONS = {
                'base': new HtmlTagDefinition({ isVoid: true }),
                'meta': new HtmlTagDefinition({ isVoid: true }),
                'area': new HtmlTagDefinition({ isVoid: true }),
                'embed': new HtmlTagDefinition({ isVoid: true }),
                'link': new HtmlTagDefinition({ isVoid: true }),
                'img': new HtmlTagDefinition({ isVoid: true }),
                'input': new HtmlTagDefinition({ isVoid: true }),
                'param': new HtmlTagDefinition({ isVoid: true }),
                'hr': new HtmlTagDefinition({ isVoid: true }),
                'br': new HtmlTagDefinition({ isVoid: true }),
                'source': new HtmlTagDefinition({ isVoid: true }),
                'track': new HtmlTagDefinition({ isVoid: true }),
                'wbr': new HtmlTagDefinition({ isVoid: true }),
                'p': new HtmlTagDefinition({
                    closedByChildren: [
                        'address', 'article', 'aside', 'blockquote', 'div', 'dl', 'fieldset',
                        'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5',
                        'h6', 'header', 'hgroup', 'hr', 'main', 'nav', 'ol',
                        'p', 'pre', 'section', 'table', 'ul'
                    ],
                    closedByParent: true
                }),
                'thead': new HtmlTagDefinition({ closedByChildren: ['tbody', 'tfoot'] }),
                'tbody': new HtmlTagDefinition({ closedByChildren: ['tbody', 'tfoot'], closedByParent: true }),
                'tfoot': new HtmlTagDefinition({ closedByChildren: ['tbody'], closedByParent: true }),
                'tr': new HtmlTagDefinition({
                    closedByChildren: ['tr'],
                    requiredParents: ['tbody', 'tfoot', 'thead'],
                    closedByParent: true
                }),
                'td': new HtmlTagDefinition({ closedByChildren: ['td', 'th'], closedByParent: true }),
                'th': new HtmlTagDefinition({ closedByChildren: ['td', 'th'], closedByParent: true }),
                'col': new HtmlTagDefinition({ requiredParents: ['colgroup'], isVoid: true }),
                'svg': new HtmlTagDefinition({ implicitNamespacePrefix: 'svg' }),
                'math': new HtmlTagDefinition({ implicitNamespacePrefix: 'math' }),
                'li': new HtmlTagDefinition({ closedByChildren: ['li'], closedByParent: true }),
                'dt': new HtmlTagDefinition({ closedByChildren: ['dt', 'dd'] }),
                'dd': new HtmlTagDefinition({ closedByChildren: ['dt', 'dd'], closedByParent: true }),
                'rb': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
                'rt': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
                'rtc': new HtmlTagDefinition({ closedByChildren: ['rb', 'rtc', 'rp'], closedByParent: true }),
                'rp': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
                'optgroup': new HtmlTagDefinition({ closedByChildren: ['optgroup'], closedByParent: true }),
                'option': new HtmlTagDefinition({ closedByChildren: ['option', 'optgroup'], closedByParent: true }),
                'pre': new HtmlTagDefinition({ ignoreFirstLf: true }),
                'listing': new HtmlTagDefinition({ ignoreFirstLf: true }),
                'style': new HtmlTagDefinition({ contentType: tags_1.TagContentType.RAW_TEXT }),
                'script': new HtmlTagDefinition({ contentType: tags_1.TagContentType.RAW_TEXT }),
                'title': new HtmlTagDefinition({ contentType: tags_1.TagContentType.ESCAPABLE_RAW_TEXT }),
                'textarea': new HtmlTagDefinition({ contentType: tags_1.TagContentType.ESCAPABLE_RAW_TEXT, ignoreFirstLf: true }),
            };
        }
        return TAG_DEFINITIONS[tagName.toLowerCase()] || _DEFAULT_TAG_DEFINITION;
    }
    exports.getHtmlTagDefinition = getHtmlTagDefinition;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF90YWdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL21sX3BhcnNlci9odG1sX3RhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCw2REFBcUQ7SUFFckQ7UUFjRSwyQkFDSSxFQVVNO2dCQVZOLDRCQVVNLEVBVkwsc0NBQWdCLEVBQUUsb0NBQWUsRUFBRSxvREFBdUIsRUFDMUQsbUJBQTBDLEVBQTFDLHNFQUEwQyxFQUFFLHNCQUFzQixFQUF0QiwyQ0FBc0IsRUFBRSxjQUFjLEVBQWQsbUNBQWMsRUFDbEYscUJBQXFCLEVBQXJCLDBDQUFxQjtZQUgxQixpQkEwQkM7WUF2Q08scUJBQWdCLEdBQTZCLEVBQUUsQ0FBQztZQUV4RCxtQkFBYyxHQUFZLEtBQUssQ0FBQztZQVNoQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztZQWM1QixJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25ELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQXJDLENBQXFDLENBQUMsQ0FBQzthQUM1RTtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxJQUFJLE1BQU0sQ0FBQztZQUMvQyxJQUFJLGVBQWUsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7Z0JBQzFCLDRGQUE0RjtnQkFDNUYsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFP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cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1RhZ0NvbnRlbnRUeXBlLCBUYWdEZWZpbml0aW9ufSBmcm9tICcuL3RhZ3MnO1xuXG5leHBvcnQgY2xhc3MgSHRtbFRhZ0RlZmluaXRpb24gaW1wbGVtZW50cyBUYWdEZWZpbml0aW9uIHtcbiAgcHJpdmF0ZSBjbG9zZWRCeUNoaWxkcmVuOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcblxuICBjbG9zZWRCeVBhcmVudDogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcmVxdWlyZWRQYXJlbnRzICE6IHtba2V5OiBzdHJpbmddOiBib29sZWFufTtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHBhcmVudFRvQWRkICE6IHN0cmluZztcbiAgaW1wbGljaXROYW1lc3BhY2VQcmVmaXg6IHN0cmluZ3xudWxsO1xuICBjb250ZW50VHlwZTogVGFnQ29udGVudFR5cGU7XG4gIGlzVm9pZDogYm9vbGVhbjtcbiAgaWdub3JlRmlyc3RMZjogYm9vbGVhbjtcbiAgY2FuU2VsZkNsb3NlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICB7Y2xvc2VkQnlDaGlsZHJlbiwgcmVxdWlyZWRQYXJlbnRzLCBpbXBsaWNpdE5hbWVzcGFjZVByZWZpeCxcbiAgICAgICBjb250ZW50VHlwZSA9IFRhZ0NvbnRlbnRUeXBlLlBBUlNBQkxFX0RBVEEsIGNsb3NlZEJ5UGFyZW50ID0gZmFsc2UsIGlzVm9pZCA9IGZhbHNlLFxuICAgICAgIGlnbm9yZUZpcnN0TGYgPSBmYWxzZX06IHtcbiAgICAgICAgY2xvc2VkQnlDaGlsZHJlbj86IHN0cmluZ1tdLFxuICAgICAgICBjbG9zZWRCeVBhcmVudD86IGJvb2xlYW4sXG4gICAgICAgIHJlcXVpcmVkUGFyZW50cz86IHN0cmluZ1tdLFxuICAgICAgICBpbXBsaWNpdE5hbWVzcGFjZVByZWZpeD86IHN0cmluZyxcbiAgICAgICAgY29udGVudFR5cGU/OiBUYWdDb250ZW50VHlwZSxcbiAgICAgICAgaXNWb2lkPzogYm9vbGVhbixcbiAgICAgICAgaWdub3JlRmlyc3RMZj86IGJvb2xlYW5cbiAgICAgIH0gPSB7fSkge1xuICAgIGlmIChjbG9zZWRCeUNoaWxkcmVuICYmIGNsb3NlZEJ5Q2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgY2xvc2VkQnlDaGlsZHJlbi5mb3JFYWNoKHRhZ05hbWUgPT4gdGhpcy5jbG9zZWRCeUNoaWxkcmVuW3RhZ05hbWVdID0gdHJ1ZSk7XG4gICAgfVxuICAgIHRoaXMuaXNWb2lkID0gaXNWb2lkO1xuICAgIHRoaXMuY2xvc2VkQnlQYXJlbnQgPSBjbG9zZWRCeVBhcmVudCB8fCBpc1ZvaWQ7XG4gICAgaWYgKHJlcXVpcmVkUGFyZW50cyAmJiByZXF1aXJlZFBhcmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5yZXF1aXJlZFBhcmVudHMgPSB7fTtcbiAgICAgIC8vIFRoZSBmaXJzdCBwYXJlbnQgaXMgdGhlIGxpc3QgaXMgYXV0b21hdGljYWxseSB3aGVuIG5vbmUgb2YgdGhlIGxpc3RlZCBwYXJlbnRzIGFyZSBwcmVzZW50XG4gICAgICB0aGlzLnBhcmVudFRvQWRkID0gcmVxdWlyZWRQYXJlbnRzWzBdO1xuICAgICAgcmVxdWlyZWRQYXJlbnRzLmZvckVhY2godGFnTmFtZSA9PiB0aGlzLnJlcXVpcmVkUGFyZW50c1t0YWdOYW1lXSA9IHRydWUpO1xuICAgIH1cbiAgICB0aGlzLmltcGxpY2l0TmFtZXNwYWNlUHJlZml4ID0gaW1wbGljaXROYW1lc3BhY2VQcmVmaXggfHwgbnVsbDtcbiAgICB0aGlzLmNvbnRlbnRUeXBlID0gY29udGVudFR5cGU7XG4gICAgdGhpcy5pZ25vcmVGaXJzdExmID0gaWdub3JlRmlyc3RMZjtcbiAgfVxuXG4gIHJlcXVpcmVFeHRyYVBhcmVudChjdXJyZW50UGFyZW50OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMucmVxdWlyZWRQYXJlbnRzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFjdXJyZW50UGFyZW50KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBsY1BhcmVudCA9IGN1cnJlbnRQYXJlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBpc1BhcmVudFRlbXBsYXRlID0gbGNQYXJlbnQgPT09ICd0ZW1wbGF0ZScgfHwgY3VycmVudFBhcmVudCA9PT0gJ25nLXRlbXBsYXRlJztcbiAgICByZXR1cm4gIWlzUGFyZW50VGVtcGxhdGUgJiYgdGhpcy5yZXF1aXJlZFBhcmVudHNbbGNQYXJlbnRdICE9IHRydWU7XG4gIH1cblxuICBpc0Nsb3NlZEJ5Q2hpbGQobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNWb2lkIHx8IG5hbWUudG9Mb3dlckNhc2UoKSBpbiB0aGlzLmNsb3NlZEJ5Q2hpbGRyZW47XG4gIH1cbn1cblxubGV0IF9ERUZBVUxUX1RBR19ERUZJTklUSU9OICE6IEh0bWxUYWdEZWZpbml0aW9uO1xuXG4vLyBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUxL3N5bnRheC5odG1sI29wdGlvbmFsLXRhZ3Ncbi8vIFRoaXMgaW1wbGVtZW50YXRpb24gZG9lcyBub3QgZnVsbHkgY29uZm9ybSB0byB0aGUgSFRNTDUgc3BlYy5cbmxldCBUQUdfREVGSU5JVElPTlMgIToge1trZXk6IHN0cmluZ106IEh0bWxUYWdEZWZpbml0aW9ufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEh0bWxUYWdEZWZpbml0aW9uKHRhZ05hbWU6IHN0cmluZyk6IEh0bWxUYWdEZWZpbml0aW9uIHtcbiAgaWYgKCFUQUdfREVGSU5JVElPTlMpIHtcbiAgICBfREVGQVVMVF9UQUdfREVGSU5JVElPTiA9IG5ldyBIdG1sVGFnRGVmaW5pdGlvbigpO1xuICAgIFRBR19ERUZJTklUSU9OUyA9IHtcbiAgICAgICdiYXNlJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgICAgICdtZXRhJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgICAgICdhcmVhJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgICAgICdlbWJlZCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAnbGluayc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAnaW1nJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgICAgICdpbnB1dCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAncGFyYW0nOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lzVm9pZDogdHJ1ZX0pLFxuICAgICAgJ2hyJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgICAgICdicic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAnc291cmNlJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgICAgICd0cmFjayc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAnd2JyJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgICAgICdwJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtcbiAgICAgICAgY2xvc2VkQnlDaGlsZHJlbjogW1xuICAgICAgICAgICdhZGRyZXNzJywgJ2FydGljbGUnLCAnYXNpZGUnLCAgICdibG9ja3F1b3RlJywgJ2RpdicsICAnZGwnLCAgJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAnZm9vdGVyJywgICdmb3JtJywgICAgJ2gxJywgICAgICAnaDInLCAgICAgICAgICdoMycsICAgJ2g0JywgICdoNScsXG4gICAgICAgICAgJ2g2JywgICAgICAnaGVhZGVyJywgICdoZ3JvdXAnLCAgJ2hyJywgICAgICAgICAnbWFpbicsICduYXYnLCAnb2wnLFxuICAgICAgICAgICdwJywgICAgICAgJ3ByZScsICAgICAnc2VjdGlvbicsICd0YWJsZScsICAgICAgJ3VsJ1xuICAgICAgICBdLFxuICAgICAgICBjbG9zZWRCeVBhcmVudDogdHJ1ZVxuICAgICAgfSksXG4gICAgICAndGhlYWQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsndGJvZHknLCAndGZvb3QnXX0pLFxuICAgICAgJ3Rib2R5JzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ3Rib2R5JywgJ3Rmb290J10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICAgICAndGZvb3QnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsndGJvZHknXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgICAgICd0cic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7XG4gICAgICAgIGNsb3NlZEJ5Q2hpbGRyZW46IFsndHInXSxcbiAgICAgICAgcmVxdWlyZWRQYXJlbnRzOiBbJ3Rib2R5JywgJ3Rmb290JywgJ3RoZWFkJ10sXG4gICAgICAgIGNsb3NlZEJ5UGFyZW50OiB0cnVlXG4gICAgICB9KSxcbiAgICAgICd0ZCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWyd0ZCcsICd0aCddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAgICAgJ3RoJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ3RkJywgJ3RoJ10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICAgICAnY29sJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtyZXF1aXJlZFBhcmVudHM6IFsnY29sZ3JvdXAnXSwgaXNWb2lkOiB0cnVlfSksXG4gICAgICAnc3ZnJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpbXBsaWNpdE5hbWVzcGFjZVByZWZpeDogJ3N2Zyd9KSxcbiAgICAgICdtYXRoJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpbXBsaWNpdE5hbWVzcGFjZVByZWZpeDogJ21hdGgnfSksXG4gICAgICAnbGknOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsnbGknXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgICAgICdkdCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWydkdCcsICdkZCddfSksXG4gICAgICAnZGQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsnZHQnLCAnZGQnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgICAgICdyYic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbihcbiAgICAgICAgICB7Y2xvc2VkQnlDaGlsZHJlbjogWydyYicsICdydCcsICdydGMnLCAncnAnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgICAgICdydCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbihcbiAgICAgICAgICB7Y2xvc2VkQnlDaGlsZHJlbjogWydyYicsICdydCcsICdydGMnLCAncnAnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgICAgICdydGMnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsncmInLCAncnRjJywgJ3JwJ10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICAgICAncnAnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oXG4gICAgICAgICAge2Nsb3NlZEJ5Q2hpbGRyZW46IFsncmInLCAncnQnLCAncnRjJywgJ3JwJ10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICAgICAnb3B0Z3JvdXAnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsnb3B0Z3JvdXAnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgICAgICdvcHRpb24nOlxuICAgICAgICAgIG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWydvcHRpb24nLCAnb3B0Z3JvdXAnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgICAgICdwcmUnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lnbm9yZUZpcnN0TGY6IHRydWV9KSxcbiAgICAgICdsaXN0aW5nJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpZ25vcmVGaXJzdExmOiB0cnVlfSksXG4gICAgICAnc3R5bGUnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2NvbnRlbnRUeXBlOiBUYWdDb250ZW50VHlwZS5SQVdfVEVYVH0pLFxuICAgICAgJ3NjcmlwdCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y29udGVudFR5cGU6IFRhZ0NvbnRlbnRUeXBlLlJBV19URVhUfSksXG4gICAgICAndGl0bGUnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2NvbnRlbnRUeXBlOiBUYWdDb250ZW50VHlwZS5FU0NBUEFCTEVfUkFXX1RFWFR9KSxcbiAgICAgICd0ZXh0YXJlYSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbihcbiAgICAgICAgICB7Y29udGVudFR5cGU6IFRhZ0NvbnRlbnRUeXBlLkVTQ0FQQUJMRV9SQVdfVEVYVCwgaWdub3JlRmlyc3RMZjogdHJ1ZX0pLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIFRBR19ERUZJTklUSU9OU1t0YWdOYW1lLnRvTG93ZXJDYXNlKCldIHx8IF9ERUZBVUxUX1RBR19ERUZJTklUSU9OO1xufVxuIl19