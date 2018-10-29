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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyL2NsaS9jb21tYW5kcy9hZGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILGlEQUFpRDtBQUNqRCwrQ0FBc0Q7QUFDdEQsNERBQXVGO0FBQ3ZGLCtDQUF5RDtBQUN6RCw2REFBd0Q7QUFDeEQsbUVBQStEO0FBRS9ELGdEQUF3RDtBQUd4RCxnQkFBd0IsU0FBUSxvQ0FBZ0I7SUFBaEQ7O1FBQ1csU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLGdCQUFXLEdBQUcsNENBQTRDLENBQUM7UUFDM0QsMkJBQXNCLEdBQUcsSUFBSSxDQUFDO1FBR3ZDLGNBQVMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNCLFlBQU8sR0FBYSxFQUFFLENBQUM7SUE2RnpCLENBQUM7SUEzRmUsc0JBQXNCLENBQUMsY0FBc0I7O1lBQ3pELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM3QyxhQUFhLEVBQUUsUUFBUTtnQkFDdkIsY0FBYzthQUNmLENBQUMsQ0FBQztZQUVILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELE1BQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFN0QsT0FBTyw2QkFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEUsQ0FBQztLQUFBO0lBRUQsUUFBUSxDQUFDLE9BQVk7UUFDbkIsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztR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LyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1nbG9iYWwtdHNsaW50LWRpc2FibGUgbm8tYW55XG5pbXBvcnQgeyB0YWdzLCB0ZXJtaW5hbCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IE5vZGVQYWNrYWdlRG9lc05vdFN1cHBvcnRTY2hlbWF0aWNzIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MvdG9vbHMnO1xuaW1wb3J0IHsgQ29tbWFuZFNjb3BlLCBPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvY29tbWFuZCc7XG5pbXBvcnQgeyBwYXJzZU9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvY29tbWFuZC1ydW5uZXInO1xuaW1wb3J0IHsgU2NoZW1hdGljQ29tbWFuZCB9IGZyb20gJy4uL21vZGVscy9zY2hlbWF0aWMtY29tbWFuZCc7XG5pbXBvcnQgeyBOcG1JbnN0YWxsIH0gZnJvbSAnLi4vdGFza3MvbnBtLWluc3RhbGwnO1xuaW1wb3J0IHsgZ2V0UGFja2FnZU1hbmFnZXIgfSBmcm9tICcuLi91dGlsaXRpZXMvY29uZmlnJztcblxuXG5leHBvcnQgY2xhc3MgQWRkQ29tbWFuZCBleHRlbmRzIFNjaGVtYXRpY0NvbW1hbmQge1xuICByZWFkb25seSBuYW1lID0gJ2FkZCc7XG4gIHJlYWRvbmx5IGRlc2NyaXB0aW9uID0gJ0FkZCBzdXBwb3J0IGZvciBhIGxpYnJhcnkgdG8geW91ciBwcm9qZWN0Lic7XG4gIHJlYWRvbmx5IGFsbG93UHJpdmF0ZVNjaGVtYXRpY3MgPSB0cnVlO1xuICBzdGF0aWMgYWxpYXNlcyA9IFtdO1xuICBzdGF0aWMgc2NvcGUgPSBDb21tYW5kU2NvcGUuaW5Qcm9qZWN0O1xuICBhcmd1bWVudHMgPSBbJ2NvbGxlY3Rpb24nXTtcbiAgb3B0aW9uczogT3B0aW9uW10gPSBbXTtcblxuICBwcml2YXRlIGFzeW5jIF9wYXJzZVNjaGVtYXRpY09wdGlvbnMoY29sbGVjdGlvbk5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3Qgc2NoZW1hdGljT3B0aW9ucyA9IGF3YWl0IHRoaXMuZ2V0T3B0aW9ucyh7XG4gICAgICBzY2hlbWF0aWNOYW1lOiAnbmctYWRkJyxcbiAgICAgIGNvbGxlY3Rpb25OYW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucy5jb25jYXQoc2NoZW1hdGljT3B0aW9ucy5vcHRpb25zKTtcbiAgICBjb25zdCBhcmdzID0gc2NoZW1hdGljT3B0aW9ucy5hcmd1bWVudHMubWFwKGFyZyA9PiBhcmcubmFtZSk7XG5cbiAgICByZXR1cm4gcGFyc2VPcHRpb25zKHRoaXMuX3Jhd0FyZ3MsIG9wdGlvbnMsIGFyZ3MsIHRoaXMuYXJnU3RyYXRlZ3kpO1xuICB9XG5cbiAgdmFsaWRhdGUob3B0aW9uczogYW55KSB7XG4gICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSBvcHRpb25zLl9bMF07XG5cbiAgICBpZiAoIWNvbGxlY3Rpb25OYW1lKSB7XG4gICAgICB0aGlzLmxvZ2dlci5mYXRhbChcbiAgICAgICAgYFRoZSBcIm5nICR7dGhpcy5uYW1lfVwiIGNvbW1hbmQgcmVxdWlyZXMgYSBuYW1lIGFyZ3VtZW50IHRvIGJlIHNwZWNpZmllZCBlZy4gYFxuICAgICAgICArIGAke3Rlcm1pbmFsLnllbGxvdygnbmcgYWRkIFtuYW1lXSAnKX0uIEZvciBtb3JlIGRldGFpbHMsIHVzZSBcIm5nIGhlbHBcIi5gLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgcnVuKG9wdGlvbnM6IGFueSkge1xuICAgIGNvbnN0IGZpcnN0QXJnID0gb3B0aW9ucy5fWzBdO1xuXG4gICAgaWYgKCFmaXJzdEFyZykge1xuICAgICAgdGhpcy5sb2dnZXIuZmF0YWwoXG4gICAgICAgIGBUaGUgXCJuZyAke3RoaXMubmFtZX1cIiBjb21tYW5kIHJlcXVpcmVzIGEgbmFtZSBhcmd1bWVudCB0byBiZSBzcGVjaWZpZWQgZWcuIGBcbiAgICAgICAgKyBgJHt0ZXJtaW5hbC55ZWxsb3coJ25nIGFkZCBbbmFtZV0gJyl9LiBGb3IgbW9yZSBkZXRhaWxzLCB1c2UgXCJuZyBoZWxwXCIuYCxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIGNvbnN0IHBhY2thZ2VNYW5hZ2VyID0gZ2V0UGFja2FnZU1hbmFnZXIoKTtcblxuICAgIGNvbnN0IG5wbUluc3RhbGw6IE5wbUluc3RhbGwgPSByZXF1aXJlKCcuLi90YXNrcy9ucG0taW5zdGFsbCcpLmRlZmF1bHQ7XG5cbiAgICBjb25zdCBwYWNrYWdlTmFtZSA9IGZpcnN0QXJnLnN0YXJ0c1dpdGgoJ0AnKVxuICAgICAgPyBmaXJzdEFyZy5zcGxpdCgnLycsIDIpLmpvaW4oJy8nKVxuICAgICAgOiBmaXJzdEFyZy5zcGxpdCgnLycsIDEpWzBdO1xuXG4gICAgLy8gUmVtb3ZlIHRoZSB0YWcvdmVyc2lvbiBmcm9tIHRoZSBwYWNrYWdlIG5hbWUuXG4gICAgY29uc3QgY29sbGVjdGlvbk5hbWUgPSAoXG4gICAgICBwYWNrYWdlTmFtZS5zdGFydHNXaXRoKCdAJylcbiAgICAgICAgPyBwYWNrYWdlTmFtZS5zcGxpdCgnQCcsIDIpLmpvaW4oJ0AnKVxuICAgICAgICA6IHBhY2thZ2VOYW1lLnNwbGl0KCdAJywgMSkuam9pbignQCcpXG4gICAgKSArIGZpcnN0QXJnLnNsaWNlKHBhY2thZ2VOYW1lLmxlbmd0aCk7XG5cbiAgICAvLyBXZSBkb24ndCBhY3R1YWxseSBhZGQgdGhlIHBhY2thZ2UgdG8gcGFja2FnZS5qc29uLCB0aGF0IHdvdWxkIGJlIHRoZSB3b3JrIG9mIHRoZSBwYWNrYWdlXG4gICAgLy8gaXRzZWxmLlxuICAgIGF3YWl0IG5wbUluc3RhbGwoXG4gICAgICBwYWNrYWdlTmFtZSxcbiAgICAgIHRoaXMubG9nZ2VyLFxuICAgICAgcGFja2FnZU1hbmFnZXIsXG4gICAgICB0aGlzLnByb2plY3Qucm9vdCxcbiAgICApO1xuXG4gICAgLy8gUmVwYXJzZSB0aGUgb3B0aW9ucyB3aXRoIHRoZSBuZXcgc2NoZW1hdGljIGFjY2Vzc2libGUuXG4gICAgb3B0aW9ucyA9IGF3YWl0IHRoaXMuX3BhcnNlU2NoZW1hdGljT3B0aW9ucyhjb2xsZWN0aW9uTmFtZSk7XG5cbiAgICBjb25zdCBydW5PcHRpb25zID0ge1xuICAgICAgc2NoZW1hdGljT3B0aW9uczogb3B0aW9ucyxcbiAgICAgIHdvcmtpbmdEaXI6IHRoaXMucHJvamVjdC5yb290LFxuICAgICAgY29sbGVjdGlvbk5hbWUsXG4gICAgICBzY2hlbWF0aWNOYW1lOiAnbmctYWRkJyxcbiAgICAgIGFsbG93UHJpdmF0ZTogdHJ1ZSxcbiAgICAgIGRyeVJ1bjogZmFsc2UsXG4gICAgICBmb3JjZTogZmFsc2UsXG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5ydW5TY2hlbWF0aWMocnVuT3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBOb2RlUGFja2FnZURvZXNOb3RTdXBwb3J0U2NoZW1hdGljcykge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcih0YWdzLm9uZUxpbmVgXG4gICAgICAgICAgVGhlIHBhY2thZ2UgdGhhdCB5b3UgYXJlIHRyeWluZyB0byBhZGQgZG9lcyBub3Qgc3VwcG9ydCBzY2hlbWF0aWNzLiBZb3UgY2FuIHRyeSB1c2luZ1xuICAgICAgICAgIGEgZGlmZmVyZW50IHZlcnNpb24gb2YgdGhlIHBhY2thZ2Ugb3IgY29udGFjdCB0aGUgcGFja2FnZSBhdXRob3IgdG8gYWRkIG5nLWFkZCBzdXBwb3J0LlxuICAgICAgICBgKTtcblxuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==