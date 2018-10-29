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
class ServeCommand extends architect_command_1.ArchitectCommand {
    constructor() {
        super(...arguments);
        this.name = 'serve';
        this.target = 'serve';
        this.description = 'Builds and serves your app, rebuilding on file changes.';
        this.options = [
            this.prodOption,
            this.configurationOption,
        ];
    }
    validate(_options) {
        // Check Angular and TypeScript versions.
        version_1.Version.assertCompatibleAngularVersion(this.project.root);
        version_1.Version.assertTypescriptVersion(this.project.root);
        return true;
    }
    run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.runArchitectTarget(options);
        });
    }
}
ServeCommand.aliases = ['s'];
ServeCommand.scope = command_1.CommandScope.inProject;
exports.ServeCommand = ServeCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmUuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXIvY2xpL2NvbW1hbmRzL3NlcnZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7QUFFSCxtRUFBd0Y7QUFDeEYsK0NBQXlEO0FBQ3pELGdEQUE2QztBQUc3QyxrQkFBMEIsU0FBUSxvQ0FBZ0I7SUFBbEQ7O1FBQ2tCLFNBQUksR0FBRyxPQUFPLENBQUM7UUFDZixXQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ2pCLGdCQUFXLEdBQUcseURBQXlELENBQUM7UUFHeEUsWUFBTyxHQUFhO1lBQ2xDLElBQUksQ0FBQyxVQUFVO1lBQ2YsSUFBSSxDQUFDLG1CQUFtQjtTQUN6QixDQUFDO0lBYUosQ0FBQztJQVhRLFFBQVEsQ0FBQyxRQUFpQztRQUMvQyx5Q0FBeUM7UUFDekMsaUJBQU8sQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELGlCQUFPLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFWSxHQUFHLENBQUMsT0FBZ0M7O1lBQy9DLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTs7QUFqQmEsb0JBQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLGtCQUFLLEdBQUcsc0JBQVksQ0FBQyxTQUFTLENBQUM7QUFML0Msb0NBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBBcmNoaXRlY3RDb21tYW5kLCBBcmNoaXRlY3RDb21tYW5kT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9hcmNoaXRlY3QtY29tbWFuZCc7XG5pbXBvcnQgeyBDb21tYW5kU2NvcGUsIE9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9jb21tYW5kJztcbmltcG9ydCB7IFZlcnNpb24gfSBmcm9tICcuLi91cGdyYWRlL3ZlcnNpb24nO1xuXG5cbmV4cG9ydCBjbGFzcyBTZXJ2ZUNvbW1hbmQgZXh0ZW5kcyBBcmNoaXRlY3RDb21tYW5kIHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSAnc2VydmUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0ID0gJ3NlcnZlJztcbiAgcHVibGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uID0gJ0J1aWxkcyBhbmQgc2VydmVzIHlvdXIgYXBwLCByZWJ1aWxkaW5nIG9uIGZpbGUgY2hhbmdlcy4nO1xuICBwdWJsaWMgc3RhdGljIGFsaWFzZXMgPSBbJ3MnXTtcbiAgcHVibGljIHN0YXRpYyBzY29wZSA9IENvbW1hbmRTY29wZS5pblByb2plY3Q7XG4gIHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBPcHRpb25bXSA9IFtcbiAgICB0aGlzLnByb2RPcHRpb24sXG4gICAgdGhpcy5jb25maWd1cmF0aW9uT3B0aW9uLFxuICBdO1xuXG4gIHB1YmxpYyB2YWxpZGF0ZShfb3B0aW9uczogQXJjaGl0ZWN0Q29tbWFuZE9wdGlvbnMpIHtcbiAgICAvLyBDaGVjayBBbmd1bGFyIGFuZCBUeXBlU2NyaXB0IHZlcnNpb25zLlxuICAgIFZlcnNpb24uYXNzZXJ0Q29tcGF0aWJsZUFuZ3VsYXJWZXJzaW9uKHRoaXMucHJvamVjdC5yb290KTtcbiAgICBWZXJzaW9uLmFzc2VydFR5cGVzY3JpcHRWZXJzaW9uKHRoaXMucHJvamVjdC5yb290KTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihvcHRpb25zOiBBcmNoaXRlY3RDb21tYW5kT3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLnJ1bkFyY2hpdGVjdFRhcmdldChvcHRpb25zKTtcbiAgfVxufVxuIl19