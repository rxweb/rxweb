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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXIvY2xpL2NvbW1hbmRzL2J1aWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7QUFFSCxtRUFBd0Y7QUFDeEYsK0NBQXlEO0FBQ3pELGdEQUE2QztBQUU3QyxrQkFBMEIsU0FBUSxvQ0FBZ0I7SUFBbEQ7O1FBQ2tCLFNBQUksR0FBRyxPQUFPLENBQUM7UUFDZixXQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ2pCLGdCQUFXLEdBQ3pCLHdFQUF3RSxDQUFDO1FBR3BFLFlBQU8sR0FBYTtZQUN6QixJQUFJLENBQUMsVUFBVTtZQUNmLElBQUksQ0FBQyxtQkFBbUI7U0FDekIsQ0FBQztJQWFKLENBQUM7SUFYUSxRQUFRLENBQUMsT0FBZ0M7UUFDOUMseUNBQXlDO1FBQ3pDLGlCQUFPLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxpQkFBTyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVZLEdBQUcsQ0FBQyxPQUFnQzs7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7O0FBakJhLG9CQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQixrQkFBSyxHQUFHLHNCQUFZLENBQUMsU0FBUyxDQUFDO0FBTi9DLG9DQXVCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgQXJjaGl0ZWN0Q29tbWFuZCwgQXJjaGl0ZWN0Q29tbWFuZE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvYXJjaGl0ZWN0LWNvbW1hbmQnO1xuaW1wb3J0IHsgQ29tbWFuZFNjb3BlLCBPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvY29tbWFuZCc7XG5pbXBvcnQgeyBWZXJzaW9uIH0gZnJvbSAnLi4vdXBncmFkZS92ZXJzaW9uJztcblxuZXhwb3J0IGNsYXNzIEJ1aWxkQ29tbWFuZCBleHRlbmRzIEFyY2hpdGVjdENvbW1hbmQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9ICdidWlsZCc7XG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXQgPSAnYnVpbGQnO1xuICBwdWJsaWMgcmVhZG9ubHkgZGVzY3JpcHRpb24gPVxuICAgICdCdWlsZHMgeW91ciBhcHAgYW5kIHBsYWNlcyBpdCBpbnRvIHRoZSBvdXRwdXQgcGF0aCAoZGlzdC8gYnkgZGVmYXVsdCkuJztcbiAgcHVibGljIHN0YXRpYyBhbGlhc2VzID0gWydiJ107XG4gIHB1YmxpYyBzdGF0aWMgc2NvcGUgPSBDb21tYW5kU2NvcGUuaW5Qcm9qZWN0O1xuICBwdWJsaWMgb3B0aW9uczogT3B0aW9uW10gPSBbXG4gICAgdGhpcy5wcm9kT3B0aW9uLFxuICAgIHRoaXMuY29uZmlndXJhdGlvbk9wdGlvbixcbiAgXTtcblxuICBwdWJsaWMgdmFsaWRhdGUob3B0aW9uczogQXJjaGl0ZWN0Q29tbWFuZE9wdGlvbnMpIHtcbiAgICAvLyBDaGVjayBBbmd1bGFyIGFuZCBUeXBlU2NyaXB0IHZlcnNpb25zLlxuICAgIFZlcnNpb24uYXNzZXJ0Q29tcGF0aWJsZUFuZ3VsYXJWZXJzaW9uKHRoaXMucHJvamVjdC5yb290KTtcbiAgICBWZXJzaW9uLmFzc2VydFR5cGVzY3JpcHRWZXJzaW9uKHRoaXMucHJvamVjdC5yb290KTtcblxuICAgIHJldHVybiBzdXBlci52YWxpZGF0ZShvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBydW4ob3B0aW9uczogQXJjaGl0ZWN0Q29tbWFuZE9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5ydW5BcmNoaXRlY3RUYXJnZXQob3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==