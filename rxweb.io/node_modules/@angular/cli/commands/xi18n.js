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
const architect_command_1 = require("../models/architect-command");
const command_1 = require("../models/command");
class Xi18nCommand extends architect_command_1.ArchitectCommand {
    constructor() {
        super(...arguments);
        this.name = 'xi18n';
        this.target = 'extract-i18n';
        this.description = 'Extracts i18n messages from source code.';
        this.options = [
            this.configurationOption,
        ];
    }
    run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.runArchitectTarget(options);
        });
    }
}
Xi18nCommand.scope = command_1.CommandScope.inProject;
Xi18nCommand.aliases = [];
exports.Xi18nCommand = Xi18nCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGkxOG4uanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXIvY2xpL2NvbW1hbmRzL3hpMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7QUFFSCxtRUFBd0Y7QUFDeEYsK0NBQXlEO0FBR3pELGtCQUEwQixTQUFRLG9DQUFnQjtJQUFsRDs7UUFDa0IsU0FBSSxHQUFHLE9BQU8sQ0FBQztRQUNmLFdBQU0sR0FBRyxjQUFjLENBQUM7UUFDeEIsZ0JBQVcsR0FBRywwQ0FBMEMsQ0FBQztRQUl6RCxZQUFPLEdBQWE7WUFDbEMsSUFBSSxDQUFDLG1CQUFtQjtTQUN6QixDQUFDO0lBS0osQ0FBQztJQUhjLEdBQUcsQ0FBQyxPQUFnQzs7WUFDL0MsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUFBOztBQVRhLGtCQUFLLEdBQUcsc0JBQVksQ0FBQyxTQUFTLENBQUM7QUFDL0Isb0JBQU8sR0FBRyxFQUFFLENBQUM7QUFMN0Isb0NBY0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IEFyY2hpdGVjdENvbW1hbmQsIEFyY2hpdGVjdENvbW1hbmRPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL2FyY2hpdGVjdC1jb21tYW5kJztcbmltcG9ydCB7IENvbW1hbmRTY29wZSwgT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2NvbW1hbmQnO1xuXG5cbmV4cG9ydCBjbGFzcyBYaTE4bkNvbW1hbmQgZXh0ZW5kcyBBcmNoaXRlY3RDb21tYW5kIHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSAneGkxOG4nO1xuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0ID0gJ2V4dHJhY3QtaTE4bic7XG4gIHB1YmxpYyByZWFkb25seSBkZXNjcmlwdGlvbiA9ICdFeHRyYWN0cyBpMThuIG1lc3NhZ2VzIGZyb20gc291cmNlIGNvZGUuJztcbiAgcHVibGljIHN0YXRpYyBzY29wZSA9IENvbW1hbmRTY29wZS5pblByb2plY3Q7XG4gIHB1YmxpYyBzdGF0aWMgYWxpYXNlcyA9IFtdO1xuICBwdWJsaWMgcmVhZG9ubHkgbXVsdGlUYXJnZXQ6IHRydWU7XG4gIHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBPcHRpb25bXSA9IFtcbiAgICB0aGlzLmNvbmZpZ3VyYXRpb25PcHRpb24sXG4gIF07XG5cbiAgcHVibGljIGFzeW5jIHJ1bihvcHRpb25zOiBBcmNoaXRlY3RDb21tYW5kT3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnJ1bkFyY2hpdGVjdFRhcmdldChvcHRpb25zKTtcbiAgfVxufVxuIl19