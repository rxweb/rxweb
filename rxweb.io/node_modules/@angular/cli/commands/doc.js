"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../models/command");
const opn = require('opn');
class DocCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'doc';
        this.description = 'Opens the official Angular API documentation for a given keyword.';
        this.arguments = ['keyword'];
        this.options = [
            {
                name: 'search',
                aliases: ['s'],
                type: Boolean,
                default: false,
                description: 'Search whole angular.io instead of just api.',
            },
        ];
    }
    validate(options) {
        if (!options.keyword) {
            this.logger.error(`keyword argument is required.`);
            return false;
        }
        return true;
    }
    run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let searchUrl = `https://angular.io/api?query=${options.keyword}`;
            if (options.search) {
                searchUrl = `https://www.google.com/search?q=site%3Aangular.io+${options.keyword}`;
            }
            return opn(searchUrl);
        });
    }
}
DocCommand.aliases = ['d'];
exports.DocCommand = DocCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyL2NsaS9jb21tYW5kcy9kb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILCtDQUE0QztBQUM1QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFPM0IsZ0JBQXdCLFNBQVEsaUJBQU87SUFBdkM7O1FBQ2tCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixnQkFBVyxHQUFHLG1FQUFtRSxDQUFDO1FBRWxGLGNBQVMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLFlBQU8sR0FBRztZQUN4QjtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ2QsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsV0FBVyxFQUFFLDhDQUE4QzthQUM1RDtTQUNGLENBQUM7SUFvQkosQ0FBQztJQWxCUSxRQUFRLENBQUMsT0FBZ0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUVuRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRVksR0FBRyxDQUFDLE9BQWdCOztZQUMvQixJQUFJLFNBQVMsR0FBRyxnQ0FBZ0MsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xFLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsU0FBUyxHQUFHLHFEQUFxRCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDcEY7WUFFRCxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QixDQUFDO0tBQUE7O0FBN0JhLGtCQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUhoQyxnQ0FpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICcuLi9tb2RlbHMvY29tbWFuZCc7XG5jb25zdCBvcG4gPSByZXF1aXJlKCdvcG4nKTtcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcbiAga2V5d29yZDogc3RyaW5nO1xuICBzZWFyY2g/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRG9jQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9ICdkb2MnO1xuICBwdWJsaWMgcmVhZG9ubHkgZGVzY3JpcHRpb24gPSAnT3BlbnMgdGhlIG9mZmljaWFsIEFuZ3VsYXIgQVBJIGRvY3VtZW50YXRpb24gZm9yIGEgZ2l2ZW4ga2V5d29yZC4nO1xuICBwdWJsaWMgc3RhdGljIGFsaWFzZXMgPSBbJ2QnXTtcbiAgcHVibGljIHJlYWRvbmx5IGFyZ3VtZW50cyA9IFsna2V5d29yZCddO1xuICBwdWJsaWMgcmVhZG9ubHkgb3B0aW9ucyA9IFtcbiAgICB7XG4gICAgICBuYW1lOiAnc2VhcmNoJyxcbiAgICAgIGFsaWFzZXM6IFsncyddLFxuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgZGVzY3JpcHRpb246ICdTZWFyY2ggd2hvbGUgYW5ndWxhci5pbyBpbnN0ZWFkIG9mIGp1c3QgYXBpLicsXG4gICAgfSxcbiAgXTtcblxuICBwdWJsaWMgdmFsaWRhdGUob3B0aW9uczogT3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5rZXl3b3JkKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihga2V5d29yZCBhcmd1bWVudCBpcyByZXF1aXJlZC5gKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihvcHRpb25zOiBPcHRpb25zKSB7XG4gICAgbGV0IHNlYXJjaFVybCA9IGBodHRwczovL2FuZ3VsYXIuaW8vYXBpP3F1ZXJ5PSR7b3B0aW9ucy5rZXl3b3JkfWA7XG4gICAgaWYgKG9wdGlvbnMuc2VhcmNoKSB7XG4gICAgICBzZWFyY2hVcmwgPSBgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zZWFyY2g/cT1zaXRlJTNBYW5ndWxhci5pbyske29wdGlvbnMua2V5d29yZH1gO1xuICAgIH1cblxuICAgIHJldHVybiBvcG4oc2VhcmNoVXJsKTtcbiAgfVxufVxuIl19