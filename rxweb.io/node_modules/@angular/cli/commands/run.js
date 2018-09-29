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
class RunCommand extends architect_command_1.ArchitectCommand {
    constructor() {
        super(...arguments);
        this.name = 'run';
        this.description = 'Runs Architect targets.';
        this.arguments = ['target'];
        this.options = [
            this.configurationOption,
        ];
    }
    run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options.target) {
                return this.runArchitectTarget(options);
            }
            else {
                throw new Error('Invalid architect target.');
            }
        });
    }
}
RunCommand.scope = command_1.CommandScope.inProject;
RunCommand.aliases = [];
exports.RunCommand = RunCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyL2NsaS9jb21tYW5kcy9ydW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILG1FQUF3RjtBQUN4RiwrQ0FBeUQ7QUFHekQsZ0JBQXdCLFNBQVEsb0NBQWdCO0lBQWhEOztRQUNrQixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsZ0JBQVcsR0FBRyx5QkFBeUIsQ0FBQztRQUd4QyxjQUFTLEdBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxZQUFPLEdBQWE7WUFDbEMsSUFBSSxDQUFDLG1CQUFtQjtTQUN6QixDQUFDO0lBU0osQ0FBQztJQVBjLEdBQUcsQ0FBQyxPQUFnQzs7WUFDL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUMvQyxDQUFDO1FBQ0gsQ0FBQztLQUFBOztBQWJhLGdCQUFLLEdBQUcsc0JBQVksQ0FBQyxTQUFTLENBQUM7QUFDL0Isa0JBQU8sR0FBRyxFQUFFLENBQUM7QUFKN0IsZ0NBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBBcmNoaXRlY3RDb21tYW5kLCBBcmNoaXRlY3RDb21tYW5kT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9hcmNoaXRlY3QtY29tbWFuZCc7XG5pbXBvcnQgeyBDb21tYW5kU2NvcGUsIE9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9jb21tYW5kJztcblxuXG5leHBvcnQgY2xhc3MgUnVuQ29tbWFuZCBleHRlbmRzIEFyY2hpdGVjdENvbW1hbmQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9ICdydW4nO1xuICBwdWJsaWMgcmVhZG9ubHkgZGVzY3JpcHRpb24gPSAnUnVucyBBcmNoaXRlY3QgdGFyZ2V0cy4nO1xuICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQ29tbWFuZFNjb3BlLmluUHJvamVjdDtcbiAgcHVibGljIHN0YXRpYyBhbGlhc2VzID0gW107XG4gIHB1YmxpYyByZWFkb25seSBhcmd1bWVudHM6IHN0cmluZ1tdID0gWyd0YXJnZXQnXTtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IE9wdGlvbltdID0gW1xuICAgIHRoaXMuY29uZmlndXJhdGlvbk9wdGlvbixcbiAgXTtcblxuICBwdWJsaWMgYXN5bmMgcnVuKG9wdGlvbnM6IEFyY2hpdGVjdENvbW1hbmRPcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICByZXR1cm4gdGhpcy5ydW5BcmNoaXRlY3RUYXJnZXQob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmNoaXRlY3QgdGFyZ2V0LicpO1xuICAgIH1cbiAgfVxufVxuIl19