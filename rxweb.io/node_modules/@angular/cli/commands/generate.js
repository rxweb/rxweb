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
const command_1 = require("../models/command");
const schematic_command_1 = require("../models/schematic-command");
const config_1 = require("../utilities/config");
const schematics_1 = require("../utilities/schematics");
class GenerateCommand extends schematic_command_1.SchematicCommand {
    constructor() {
        super(...arguments);
        this.name = 'generate';
        this.description = 'Generates and/or modifies files based on a schematic.';
        this.arguments = ['schematic'];
        this.options = [
            ...this.coreOptions,
        ];
        this.initialized = false;
    }
    initialize(options) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized) {
                return;
            }
            yield _super("initialize").call(this, options);
            this.initialized = true;
            const [collectionName, schematicName] = this.parseSchematicInfo(options);
            if (!!schematicName) {
                const schematicOptions = yield this.getOptions({
                    schematicName,
                    collectionName,
                });
                this.options = this.options.concat(schematicOptions.options);
                this.arguments = this.arguments.concat(schematicOptions.arguments.map(a => a.name));
            }
        });
    }
    validate(options) {
        if (!options._[0]) {
            this.logger.error(core_1.tags.oneLine `
        The "ng generate" command requires a
        schematic name to be specified.
        For more details, use "ng help".`);
            return false;
        }
        return true;
    }
    run(options) {
        const [collectionName, schematicName] = this.parseSchematicInfo(options);
        // remove the schematic name from the options
        options._ = options._.slice(1);
        return this.runSchematic({
            collectionName,
            schematicName,
            schematicOptions: options,
            debug: options.debug,
            dryRun: options.dryRun,
            force: options.force,
        });
    }
    parseSchematicInfo(options) {
        let collectionName = config_1.getDefaultSchematicCollection();
        let schematicName = options._[0];
        if (schematicName) {
            if (schematicName.includes(':')) {
                [collectionName, schematicName] = schematicName.split(':', 2);
            }
        }
        return [collectionName, schematicName];
    }
    printHelp(options) {
        const schematicName = options._[0];
        if (schematicName) {
            const argDisplay = this.arguments && this.arguments.length > 0
                ? ' ' + this.arguments.filter(a => a !== 'schematic').map(a => `<${a}>`).join(' ')
                : '';
            const optionsDisplay = this.options && this.options.length > 0
                ? ' [options]'
                : '';
            this.logger.info(`usage: ng generate ${schematicName}${argDisplay}${optionsDisplay}`);
            this.printHelpOptions(options);
        }
        else {
            this.printHelpUsage(this.name, this.arguments, this.options);
            const engineHost = schematics_1.getEngineHost();
            const [collectionName] = this.parseSchematicInfo(options);
            const collection = schematics_1.getCollection(collectionName);
            const schematicNames = engineHost.listSchematics(collection);
            this.logger.info('Available schematics:');
            schematicNames.forEach(schematicName => {
                this.logger.info(`    ${schematicName}`);
            });
            this.logger.warn(`\nTo see help for a schematic run:`);
            this.logger.info(core_1.terminal.cyan(`  ng generate <schematic> --help`));
        }
    }
}
GenerateCommand.aliases = ['g'];
GenerateCommand.scope = command_1.CommandScope.inProject;
exports.GenerateCommand = GenerateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXIvY2xpL2NvbW1hbmRzL2dlbmVyYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7QUFFSCxpREFBaUQ7QUFDakQsK0NBQXNEO0FBQ3RELCtDQUF5RDtBQUN6RCxtRUFBK0Q7QUFDL0QsZ0RBQW9FO0FBQ3BFLHdEQUdpQztBQUdqQyxxQkFBNkIsU0FBUSxvQ0FBZ0I7SUFBckQ7O1FBQ2tCLFNBQUksR0FBRyxVQUFVLENBQUM7UUFDbEIsZ0JBQVcsR0FBRyx1REFBdUQsQ0FBQztRQUcvRSxjQUFTLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQixZQUFPLEdBQWE7WUFDekIsR0FBRyxJQUFJLENBQUMsV0FBVztTQUNwQixDQUFDO1FBRU0sZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUF5RjlCLENBQUM7SUF4RmMsVUFBVSxDQUFDLE9BQVk7OztZQUNsQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLE9BQU87YUFDUjtZQUNELE1BQU0sb0JBQWdCLFlBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFFeEIsTUFBTSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFekUsSUFBSSxDQUFDLENBQUMsYUFBYSxFQUFFO2dCQUNuQixNQUFNLGdCQUFnQixHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQztvQkFDN0MsYUFBYTtvQkFDYixjQUFjO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLElB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bkMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxNQUFNLFVBQVUsR0FBRywwQkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sY0FBYyxHQUFhLFVBQVUsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUMxQyxjQUFjLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLGFBQWEsRUFBRSxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQVEsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0gsQ0FBQzs7QUEvRmEsdUJBQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLHFCQUFLLEdBQUcsc0JBQVksQ0FBQyxTQUFTLENBQUM7QUFKL0MsMENBbUdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1nbG9iYWwtdHNsaW50LWRpc2FibGUgbm8tYW55XG5pbXBvcnQgeyB0YWdzLCB0ZXJtaW5hbCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IENvbW1hbmRTY29wZSwgT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2NvbW1hbmQnO1xuaW1wb3J0IHsgU2NoZW1hdGljQ29tbWFuZCB9IGZyb20gJy4uL21vZGVscy9zY2hlbWF0aWMtY29tbWFuZCc7XG5pbXBvcnQgeyBnZXREZWZhdWx0U2NoZW1hdGljQ29sbGVjdGlvbiB9IGZyb20gJy4uL3V0aWxpdGllcy9jb25maWcnO1xuaW1wb3J0IHtcbiAgZ2V0Q29sbGVjdGlvbixcbiAgZ2V0RW5naW5lSG9zdCxcbn0gZnJvbSAnLi4vdXRpbGl0aWVzL3NjaGVtYXRpY3MnO1xuXG5cbmV4cG9ydCBjbGFzcyBHZW5lcmF0ZUNvbW1hbmQgZXh0ZW5kcyBTY2hlbWF0aWNDb21tYW5kIHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSAnZ2VuZXJhdGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgZGVzY3JpcHRpb24gPSAnR2VuZXJhdGVzIGFuZC9vciBtb2RpZmllcyBmaWxlcyBiYXNlZCBvbiBhIHNjaGVtYXRpYy4nO1xuICBwdWJsaWMgc3RhdGljIGFsaWFzZXMgPSBbJ2cnXTtcbiAgcHVibGljIHN0YXRpYyBzY29wZSA9IENvbW1hbmRTY29wZS5pblByb2plY3Q7XG4gIHB1YmxpYyBhcmd1bWVudHMgPSBbJ3NjaGVtYXRpYyddO1xuICBwdWJsaWMgb3B0aW9uczogT3B0aW9uW10gPSBbXG4gICAgLi4udGhpcy5jb3JlT3B0aW9ucyxcbiAgXTtcblxuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XG4gIHB1YmxpYyBhc3luYyBpbml0aWFsaXplKG9wdGlvbnM6IGFueSkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IHN1cGVyLmluaXRpYWxpemUob3B0aW9ucyk7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICBjb25zdCBbY29sbGVjdGlvbk5hbWUsIHNjaGVtYXRpY05hbWVdID0gdGhpcy5wYXJzZVNjaGVtYXRpY0luZm8ob3B0aW9ucyk7XG5cbiAgICBpZiAoISFzY2hlbWF0aWNOYW1lKSB7XG4gICAgICBjb25zdCBzY2hlbWF0aWNPcHRpb25zID0gYXdhaXQgdGhpcy5nZXRPcHRpb25zKHtcbiAgICAgICAgc2NoZW1hdGljTmFtZSxcbiAgICAgICAgY29sbGVjdGlvbk5hbWUsXG4gICAgICB9KTtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucy5jb25jYXQoc2NoZW1hdGljT3B0aW9ucy5vcHRpb25zKTtcbiAgICAgIHRoaXMuYXJndW1lbnRzID0gdGhpcy5hcmd1bWVudHMuY29uY2F0KHNjaGVtYXRpY09wdGlvbnMuYXJndW1lbnRzLm1hcChhID0+IGEubmFtZSkpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlKG9wdGlvbnM6IGFueSk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIW9wdGlvbnMuX1swXSkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IodGFncy5vbmVMaW5lYFxuICAgICAgICBUaGUgXCJuZyBnZW5lcmF0ZVwiIGNvbW1hbmQgcmVxdWlyZXMgYVxuICAgICAgICBzY2hlbWF0aWMgbmFtZSB0byBiZSBzcGVjaWZpZWQuXG4gICAgICAgIEZvciBtb3JlIGRldGFpbHMsIHVzZSBcIm5nIGhlbHBcIi5gKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIHJ1bihvcHRpb25zOiBhbnkpIHtcbiAgICBjb25zdCBbY29sbGVjdGlvbk5hbWUsIHNjaGVtYXRpY05hbWVdID0gdGhpcy5wYXJzZVNjaGVtYXRpY0luZm8ob3B0aW9ucyk7XG5cbiAgICAvLyByZW1vdmUgdGhlIHNjaGVtYXRpYyBuYW1lIGZyb20gdGhlIG9wdGlvbnNcbiAgICBvcHRpb25zLl8gPSBvcHRpb25zLl8uc2xpY2UoMSk7XG5cbiAgICByZXR1cm4gdGhpcy5ydW5TY2hlbWF0aWMoe1xuICAgICAgY29sbGVjdGlvbk5hbWUsXG4gICAgICBzY2hlbWF0aWNOYW1lLFxuICAgICAgc2NoZW1hdGljT3B0aW9uczogb3B0aW9ucyxcbiAgICAgIGRlYnVnOiBvcHRpb25zLmRlYnVnLFxuICAgICAgZHJ5UnVuOiBvcHRpb25zLmRyeVJ1bixcbiAgICAgIGZvcmNlOiBvcHRpb25zLmZvcmNlLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVNjaGVtYXRpY0luZm8ob3B0aW9uczogYW55KSB7XG4gICAgbGV0IGNvbGxlY3Rpb25OYW1lID0gZ2V0RGVmYXVsdFNjaGVtYXRpY0NvbGxlY3Rpb24oKTtcblxuICAgIGxldCBzY2hlbWF0aWNOYW1lOiBzdHJpbmcgPSBvcHRpb25zLl9bMF07XG5cbiAgICBpZiAoc2NoZW1hdGljTmFtZSkge1xuICAgICAgaWYgKHNjaGVtYXRpY05hbWUuaW5jbHVkZXMoJzonKSkge1xuICAgICAgICBbY29sbGVjdGlvbk5hbWUsIHNjaGVtYXRpY05hbWVdID0gc2NoZW1hdGljTmFtZS5zcGxpdCgnOicsIDIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbY29sbGVjdGlvbk5hbWUsIHNjaGVtYXRpY05hbWVdO1xuICB9XG5cbiAgcHVibGljIHByaW50SGVscChvcHRpb25zOiBhbnkpIHtcbiAgICBjb25zdCBzY2hlbWF0aWNOYW1lID0gb3B0aW9ucy5fWzBdO1xuICAgIGlmIChzY2hlbWF0aWNOYW1lKSB7XG4gICAgICBjb25zdCBhcmdEaXNwbGF5ID0gdGhpcy5hcmd1bWVudHMgJiYgdGhpcy5hcmd1bWVudHMubGVuZ3RoID4gMFxuICAgICAgICA/ICcgJyArIHRoaXMuYXJndW1lbnRzLmZpbHRlcihhID0+IGEgIT09ICdzY2hlbWF0aWMnKS5tYXAoYSA9PiBgPCR7YX0+YCkuam9pbignICcpXG4gICAgICAgIDogJyc7XG4gICAgICBjb25zdCBvcHRpb25zRGlzcGxheSA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gMFxuICAgICAgICA/ICcgW29wdGlvbnNdJ1xuICAgICAgICA6ICcnO1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgdXNhZ2U6IG5nIGdlbmVyYXRlICR7c2NoZW1hdGljTmFtZX0ke2FyZ0Rpc3BsYXl9JHtvcHRpb25zRGlzcGxheX1gKTtcbiAgICAgIHRoaXMucHJpbnRIZWxwT3B0aW9ucyhvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmludEhlbHBVc2FnZSh0aGlzLm5hbWUsIHRoaXMuYXJndW1lbnRzLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgY29uc3QgZW5naW5lSG9zdCA9IGdldEVuZ2luZUhvc3QoKTtcbiAgICAgIGNvbnN0IFtjb2xsZWN0aW9uTmFtZV0gPSB0aGlzLnBhcnNlU2NoZW1hdGljSW5mbyhvcHRpb25zKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb24gPSBnZXRDb2xsZWN0aW9uKGNvbGxlY3Rpb25OYW1lKTtcbiAgICAgIGNvbnN0IHNjaGVtYXRpY05hbWVzOiBzdHJpbmdbXSA9IGVuZ2luZUhvc3QubGlzdFNjaGVtYXRpY3MoY29sbGVjdGlvbik7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKCdBdmFpbGFibGUgc2NoZW1hdGljczonKTtcbiAgICAgIHNjaGVtYXRpY05hbWVzLmZvckVhY2goc2NoZW1hdGljTmFtZSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYCAgICAke3NjaGVtYXRpY05hbWV9YCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5sb2dnZXIud2FybihgXFxuVG8gc2VlIGhlbHAgZm9yIGEgc2NoZW1hdGljIHJ1bjpgKTtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8odGVybWluYWwuY3lhbihgICBuZyBnZW5lcmF0ZSA8c2NoZW1hdGljPiAtLWhlbHBgKSk7XG4gICAgfVxuICB9XG59XG4iXX0=