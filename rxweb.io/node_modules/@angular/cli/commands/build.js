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
const version_1 = require("../upgrade/version");
class BuildCommand extends architect_command_1.ArchitectCommand {
    constructor() {
        super(...arguments);
        this.name = 'build';
        this.target = 'build';
        this.description = 'Builds your app and places it into the output path (dist/ by default).';
        this.options = [
            this.prodOption,
            this.configurationOption,
        ];
    }
    validate(options) {
        // Check Angular and TypeScript versions.
        version_1.Version.assertCompatibleAngularVersion(this.project.root);
        version_1.Version.assertTypescriptVersion(this.project.root);
        return super.validate(options);
    }
    run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.runArchitectTarget(options);
        });
    }
}
BuildCommand.aliases = ['b'];
BuildCommand.scope = command_1.CommandScope.inProject;
exports.BuildCommand = BuildCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXIvY2xpL2NvbW1hbmRzL2J1aWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7QUFFSCxtRUFBd0Y7QUFDeEYsK0NBQXlEO0FBQ3pELGdEQUE2QztBQUU3QyxrQkFBMEIsU0FBUSxvQ0FBZ0I7SUFBbEQ7O1FBQ2tCLFNBQUksR0FBRyxPQUFPLENBQUM7UUFDZixXQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ2pCLGdCQUFXLEdBQ3pCLHdFQUF3RSxDQUFDO1FBR3BFLFlBQU8sR0FBYTtZQUN6QixJQUFJLENBQUMsVUFBVTtZQUNmLElBQUksQ0FBQyxtQkFBbUI7U0FDekIsQ0FBQztJQWFKLENBQUM7SUFYUSxRQUFRLENBQUMsT0FBZ0M7UUFDOUMseUNBQXlDO1FBQ3pDLGlCQUFPLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxpQkFBTyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkQsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFWSxHQUFHLENBQUMsT0FBZ0M7O1lBQy9DLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTs7QUFqQmEsb0JBQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLGtCQUFLLEdBQUcsc0JBQVksQ0FBQyxTQUFTLENBQUM7QUFOL0Msb0NBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBBcmNoaXRlY3RDb21tYW5kLCBBcmNoaXRlY3RDb21tYW5kT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9hcmNoaXRlY3QtY29tbWFuZCc7XG5pbXBvcnQgeyBDb21tYW5kU2NvcGUsIE9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9jb21tYW5kJztcbmltcG9ydCB7IFZlcnNpb24gfSBmcm9tICcuLi91cGdyYWRlL3ZlcnNpb24nO1xuXG5leHBvcnQgY2xhc3MgQnVpbGRDb21tYW5kIGV4dGVuZHMgQXJjaGl0ZWN0Q29tbWFuZCB7XG4gIHB1YmxpYyByZWFkb25seSBuYW1lID0gJ2J1aWxkJztcbiAgcHVibGljIHJlYWRvbmx5IHRhcmdldCA9ICdidWlsZCc7XG4gIHB1YmxpYyByZWFkb25seSBkZXNjcmlwdGlvbiA9XG4gICAgJ0J1aWxkcyB5b3VyIGFwcCBhbmQgcGxhY2VzIGl0IGludG8gdGhlIG91dHB1dCBwYXRoIChkaXN0LyBieSBkZWZhdWx0KS4nO1xuICBwdWJsaWMgc3RhdGljIGFsaWFzZXMgPSBbJ2InXTtcbiAgcHVibGljIHN0YXRpYyBzY29wZSA9IENvbW1hbmRTY29wZS5pblByb2plY3Q7XG4gIHB1YmxpYyBvcHRpb25zOiBPcHRpb25bXSA9IFtcbiAgICB0aGlzLnByb2RPcHRpb24sXG4gICAgdGhpcy5jb25maWd1cmF0aW9uT3B0aW9uLFxuICBdO1xuXG4gIHB1YmxpYyB2YWxpZGF0ZShvcHRpb25zOiBBcmNoaXRlY3RDb21tYW5kT3B0aW9ucykge1xuICAgIC8vIENoZWNrIEFuZ3VsYXIgYW5kIFR5cGVTY3JpcHQgdmVyc2lvbnMuXG4gICAgVmVyc2lvbi5hc3NlcnRDb21wYXRpYmxlQW5ndWxhclZlcnNpb24odGhpcy5wcm9qZWN0LnJvb3QpO1xuICAgIFZlcnNpb24uYXNzZXJ0VHlwZXNjcmlwdFZlcnNpb24odGhpcy5wcm9qZWN0LnJvb3QpO1xuXG4gICAgcmV0dXJuIHN1cGVyLnZhbGlkYXRlKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihvcHRpb25zOiBBcmNoaXRlY3RDb21tYW5kT3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnJ1bkFyY2hpdGVjdFRhcmdldChvcHRpb25zKTtcbiAgfVxufVxuIl19