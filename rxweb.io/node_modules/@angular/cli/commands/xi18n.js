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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGkxOG4uanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXIvY2xpL2NvbW1hbmRzL3hpMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7QUFFSCxtRUFBd0Y7QUFDeEYsK0NBQXlEO0FBR3pELGtCQUEwQixTQUFRLG9DQUFnQjtJQUFsRDs7UUFDa0IsU0FBSSxHQUFHLE9BQU8sQ0FBQztRQUNmLFdBQU0sR0FBRyxjQUFjLENBQUM7UUFDeEIsZ0JBQVcsR0FBRywwQ0FBMEMsQ0FBQztRQUl6RCxZQUFPLEdBQWE7WUFDbEMsSUFBSSxDQUFDLG1CQUFtQjtTQUN6QixDQUFDO0lBS0osQ0FBQztJQUhjLEdBQUcsQ0FBQyxPQUFnQzs7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7O0FBVGEsa0JBQUssR0FBRyxzQkFBWSxDQUFDLFNBQVMsQ0FBQztBQUMvQixvQkFBTyxHQUFHLEVBQUUsQ0FBQztBQUw3QixvQ0FjQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQXJjaGl0ZWN0Q29tbWFuZCwgQXJjaGl0ZWN0Q29tbWFuZE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvYXJjaGl0ZWN0LWNvbW1hbmQnO1xuaW1wb3J0IHsgQ29tbWFuZFNjb3BlLCBPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvY29tbWFuZCc7XG5cblxuZXhwb3J0IGNsYXNzIFhpMThuQ29tbWFuZCBleHRlbmRzIEFyY2hpdGVjdENvbW1hbmQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9ICd4aTE4bic7XG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXQgPSAnZXh0cmFjdC1pMThuJztcbiAgcHVibGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uID0gJ0V4dHJhY3RzIGkxOG4gbWVzc2FnZXMgZnJvbSBzb3VyY2UgY29kZS4nO1xuICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQ29tbWFuZFNjb3BlLmluUHJvamVjdDtcbiAgcHVibGljIHN0YXRpYyBhbGlhc2VzID0gW107XG4gIHB1YmxpYyByZWFkb25seSBtdWx0aVRhcmdldDogdHJ1ZTtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IE9wdGlvbltdID0gW1xuICAgIHRoaXMuY29uZmlndXJhdGlvbk9wdGlvbixcbiAgXTtcblxuICBwdWJsaWMgYXN5bmMgcnVuKG9wdGlvbnM6IEFyY2hpdGVjdENvbW1hbmRPcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMucnVuQXJjaGl0ZWN0VGFyZ2V0KG9wdGlvbnMpO1xuICB9XG59XG4iXX0=