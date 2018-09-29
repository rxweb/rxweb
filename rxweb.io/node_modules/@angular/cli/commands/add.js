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
// tslint:disable:no-global-tslint-disable no-any
const core_1 = require("@angular-devkit/core");
const tools_1 = require("@angular-devkit/schematics/tools");
const command_1 = require("../models/command");
const command_runner_1 = require("../models/command-runner");
const schematic_command_1 = require("../models/schematic-command");
const config_1 = require("../utilities/config");
class AddCommand extends schematic_command_1.SchematicCommand {
    constructor() {
        super(...arguments);
        this.name = 'add';
        this.description = 'Add support for a library to your project.';
        this.allowPrivateSchematics = true;
        this.arguments = ['collection'];
        this.options = [];
    }
    _parseSchematicOptions(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            const schematicOptions = yield this.getOptions({
                schematicName: 'ng-add',
                collectionName,
            });
            const options = this.options.concat(schematicOptions.options);
            const args = schematicOptions.arguments.map(arg => arg.name);
            return command_runner_1.parseOptions(this._rawArgs, options, args, this.argStrategy);
        });
    }
    validate(options) {
        const collectionName = options._[0];
        if (!collectionName) {
            this.logger.fatal(`The "ng ${this.name}" command requires a name argument to be specified eg. `
                + `${core_1.terminal.yellow('ng add [name] ')}. For more details, use "ng help".`);
            return false;
        }
        return true;
    }
    run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstArg = options._[0];
            if (!firstArg) {
                this.logger.fatal(`The "ng ${this.name}" command requires a name argument to be specified eg. `
                    + `${core_1.terminal.yellow('ng add [name] ')}. For more details, use "ng help".`);
                return 1;
            }
            const packageManager = config_1.getPackageManager();
            const npmInstall = require('../tasks/npm-install').default;
            const packageName = firstArg.startsWith('@')
                ? firstArg.split('/', 2).join('/')
                : firstArg.split('/', 1)[0];
            // Remove the tag/version from the package name.
            const collectionName = (packageName.startsWith('@')
                ? packageName.split('@', 2).join('@')
                : packageName.split('@', 1).join('@')) + firstArg.slice(packageName.length);
            // We don't actually add the package to package.json, that would be the work of the package
            // itself.
            yield npmInstall(packageName, this.logger, packageManager, this.project.root);
            // Reparse the options with the new schematic accessible.
            options = yield this._parseSchematicOptions(collectionName);
            const runOptions = {
                schematicOptions: options,
                workingDir: this.project.root,
                collectionName,
                schematicName: 'ng-add',
                allowPrivate: true,
                dryRun: false,
                force: false,
            };
            try {
                return yield this.runSchematic(runOptions);
            }
            catch (e) {
                if (e instanceof tools_1.NodePackageDoesNotSupportSchematics) {
                    this.logger.error(core_1.tags.oneLine `
          The package that you are trying to add does not support schematics. You can try using
          a different version of the package or contact the package author to add ng-add support.
        `);
                    return 1;
                }
                throw e;
            }
        });
    }
}
AddCommand.aliases = [];
AddCommand.scope = command_1.CommandScope.inProject;
exports.AddCommand = AddCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyL2NsaS9jb21tYW5kcy9hZGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILGlEQUFpRDtBQUNqRCwrQ0FBc0Q7QUFDdEQsNERBQXVGO0FBQ3ZGLCtDQUF5RDtBQUN6RCw2REFBd0Q7QUFDeEQsbUVBQStEO0FBRS9ELGdEQUF3RDtBQUd4RCxnQkFBd0IsU0FBUSxvQ0FBZ0I7SUFBaEQ7O1FBQ1csU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLGdCQUFXLEdBQUcsNENBQTRDLENBQUM7UUFDM0QsMkJBQXNCLEdBQUcsSUFBSSxDQUFDO1FBR3ZDLGNBQVMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNCLFlBQU8sR0FBYSxFQUFFLENBQUM7SUE2RnpCLENBQUM7SUEzRmUsc0JBQXNCLENBQUMsY0FBc0I7O1lBQ3pELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM3QyxhQUFhLEVBQUUsUUFBUTtnQkFDdkIsY0FBYzthQUNmLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELE1BQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFN0QsTUFBTSxDQUFDLDZCQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0RSxDQUFDO0tBQUE7SUFFRCxRQUFRLENBQUMsT0FBWTtRQUNuQixNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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RCxNQUFNLENBQUMsQ0FBQztZQUNWLENBQUM7UUFDSCxDQUFDO0tBQUE7O0FBL0ZNLGtCQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2IsZ0JBQUssR0FBRyxzQkFBWSxDQUFDLFNBQVMsQ0FBQztBQUx4QyxnQ0FvR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWdsb2JhbC10c2xpbnQtZGlzYWJsZSBuby1hbnlcbmltcG9ydCB7IHRhZ3MsIHRlcm1pbmFsIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgTm9kZVBhY2thZ2VEb2VzTm90U3VwcG9ydFNjaGVtYXRpY3MgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcy90b29scyc7XG5pbXBvcnQgeyBDb21tYW5kU2NvcGUsIE9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9jb21tYW5kJztcbmltcG9ydCB7IHBhcnNlT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9jb21tYW5kLXJ1bm5lcic7XG5pbXBvcnQgeyBTY2hlbWF0aWNDb21tYW5kIH0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYXRpYy1jb21tYW5kJztcbmltcG9ydCB7IE5wbUluc3RhbGwgfSBmcm9tICcuLi90YXNrcy9ucG0taW5zdGFsbCc7XG5pbXBvcnQgeyBnZXRQYWNrYWdlTWFuYWdlciB9IGZyb20gJy4uL3V0aWxpdGllcy9jb25maWcnO1xuXG5cbmV4cG9ydCBjbGFzcyBBZGRDb21tYW5kIGV4dGVuZHMgU2NoZW1hdGljQ29tbWFuZCB7XG4gIHJlYWRvbmx5IG5hbWUgPSAnYWRkJztcbiAgcmVhZG9ubHkgZGVzY3JpcHRpb24gPSAnQWRkIHN1cHBvcnQgZm9yIGEgbGlicmFyeSB0byB5b3VyIHByb2plY3QuJztcbiAgcmVhZG9ubHkgYWxsb3dQcml2YXRlU2NoZW1hdGljcyA9IHRydWU7XG4gIHN0YXRpYyBhbGlhc2VzID0gW107XG4gIHN0YXRpYyBzY29wZSA9IENvbW1hbmRTY29wZS5pblByb2plY3Q7XG4gIGFyZ3VtZW50cyA9IFsnY29sbGVjdGlvbiddO1xuICBvcHRpb25zOiBPcHRpb25bXSA9IFtdO1xuXG4gIHByaXZhdGUgYXN5bmMgX3BhcnNlU2NoZW1hdGljT3B0aW9ucyhjb2xsZWN0aW9uTmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBzY2hlbWF0aWNPcHRpb25zID0gYXdhaXQgdGhpcy5nZXRPcHRpb25zKHtcbiAgICAgIHNjaGVtYXRpY05hbWU6ICduZy1hZGQnLFxuICAgICAgY29sbGVjdGlvbk5hbWUsXG4gICAgfSk7XG5cbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLmNvbmNhdChzY2hlbWF0aWNPcHRpb25zLm9wdGlvbnMpO1xuICAgIGNvbnN0IGFyZ3MgPSBzY2hlbWF0aWNPcHRpb25zLmFyZ3VtZW50cy5tYXAoYXJnID0+IGFyZy5uYW1lKTtcblxuICAgIHJldHVybiBwYXJzZU9wdGlvbnModGhpcy5fcmF3QXJncywgb3B0aW9ucywgYXJncywgdGhpcy5hcmdTdHJhdGVneSk7XG4gIH1cblxuICB2YWxpZGF0ZShvcHRpb25zOiBhbnkpIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9IG9wdGlvbnMuX1swXTtcblxuICAgIGlmICghY29sbGVjdGlvbk5hbWUpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmZhdGFsKFxuICAgICAgICBgVGhlIFwibmcgJHt0aGlzLm5hbWV9XCIgY29tbWFuZCByZXF1aXJlcyBhIG5hbWUgYXJndW1lbnQgdG8gYmUgc3BlY2lmaWVkIGVnLiBgXG4gICAgICAgICsgYCR7dGVybWluYWwueWVsbG93KCduZyBhZGQgW25hbWVdICcpfS4gRm9yIG1vcmUgZGV0YWlscywgdXNlIFwibmcgaGVscFwiLmAsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBydW4ob3B0aW9uczogYW55KSB7XG4gICAgY29uc3QgZmlyc3RBcmcgPSBvcHRpb25zLl9bMF07XG5cbiAgICBpZiAoIWZpcnN0QXJnKSB7XG4gICAgICB0aGlzLmxvZ2dlci5mYXRhbChcbiAgICAgICAgYFRoZSBcIm5nICR7dGhpcy5uYW1lfVwiIGNvbW1hbmQgcmVxdWlyZXMgYSBuYW1lIGFyZ3VtZW50IHRvIGJlIHNwZWNpZmllZCBlZy4gYFxuICAgICAgICArIGAke3Rlcm1pbmFsLnllbGxvdygnbmcgYWRkIFtuYW1lXSAnKX0uIEZvciBtb3JlIGRldGFpbHMsIHVzZSBcIm5nIGhlbHBcIi5gLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgY29uc3QgcGFja2FnZU1hbmFnZXIgPSBnZXRQYWNrYWdlTWFuYWdlcigpO1xuXG4gICAgY29uc3QgbnBtSW5zdGFsbDogTnBtSW5zdGFsbCA9IHJlcXVpcmUoJy4uL3Rhc2tzL25wbS1pbnN0YWxsJykuZGVmYXVsdDtcblxuICAgIGNvbnN0IHBhY2thZ2VOYW1lID0gZmlyc3RBcmcuc3RhcnRzV2l0aCgnQCcpXG4gICAgICA/IGZpcnN0QXJnLnNwbGl0KCcvJywgMikuam9pbignLycpXG4gICAgICA6IGZpcnN0QXJnLnNwbGl0KCcvJywgMSlbMF07XG5cbiAgICAvLyBSZW1vdmUgdGhlIHRhZy92ZXJzaW9uIGZyb20gdGhlIHBhY2thZ2UgbmFtZS5cbiAgICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9IChcbiAgICAgIHBhY2thZ2VOYW1lLnN0YXJ0c1dpdGgoJ0AnKVxuICAgICAgICA/IHBhY2thZ2VOYW1lLnNwbGl0KCdAJywgMikuam9pbignQCcpXG4gICAgICAgIDogcGFja2FnZU5hbWUuc3BsaXQoJ0AnLCAxKS5qb2luKCdAJylcbiAgICApICsgZmlyc3RBcmcuc2xpY2UocGFja2FnZU5hbWUubGVuZ3RoKTtcblxuICAgIC8vIFdlIGRvbid0IGFjdHVhbGx5IGFkZCB0aGUgcGFja2FnZSB0byBwYWNrYWdlLmpzb24sIHRoYXQgd291bGQgYmUgdGhlIHdvcmsgb2YgdGhlIHBhY2thZ2VcbiAgICAvLyBpdHNlbGYuXG4gICAgYXdhaXQgbnBtSW5zdGFsbChcbiAgICAgIHBhY2thZ2VOYW1lLFxuICAgICAgdGhpcy5sb2dnZXIsXG4gICAgICBwYWNrYWdlTWFuYWdlcixcbiAgICAgIHRoaXMucHJvamVjdC5yb290LFxuICAgICk7XG5cbiAgICAvLyBSZXBhcnNlIHRoZSBvcHRpb25zIHdpdGggdGhlIG5ldyBzY2hlbWF0aWMgYWNjZXNzaWJsZS5cbiAgICBvcHRpb25zID0gYXdhaXQgdGhpcy5fcGFyc2VTY2hlbWF0aWNPcHRpb25zKGNvbGxlY3Rpb25OYW1lKTtcblxuICAgIGNvbnN0IHJ1bk9wdGlvbnMgPSB7XG4gICAgICBzY2hlbWF0aWNPcHRpb25zOiBvcHRpb25zLFxuICAgICAgd29ya2luZ0RpcjogdGhpcy5wcm9qZWN0LnJvb3QsXG4gICAgICBjb2xsZWN0aW9uTmFtZSxcbiAgICAgIHNjaGVtYXRpY05hbWU6ICduZy1hZGQnLFxuICAgICAgYWxsb3dQcml2YXRlOiB0cnVlLFxuICAgICAgZHJ5UnVuOiBmYWxzZSxcbiAgICAgIGZvcmNlOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnJ1blNjaGVtYXRpYyhydW5PcHRpb25zKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIE5vZGVQYWNrYWdlRG9lc05vdFN1cHBvcnRTY2hlbWF0aWNzKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKHRhZ3Mub25lTGluZWBcbiAgICAgICAgICBUaGUgcGFja2FnZSB0aGF0IHlvdSBhcmUgdHJ5aW5nIHRvIGFkZCBkb2VzIG5vdCBzdXBwb3J0IHNjaGVtYXRpY3MuIFlvdSBjYW4gdHJ5IHVzaW5nXG4gICAgICAgICAgYSBkaWZmZXJlbnQgdmVyc2lvbiBvZiB0aGUgcGFja2FnZSBvciBjb250YWN0IHRoZSBwYWNrYWdlIGF1dGhvciB0byBhZGQgbmctYWRkIHN1cHBvcnQuXG4gICAgICAgIGApO1xuXG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxufVxuIl19