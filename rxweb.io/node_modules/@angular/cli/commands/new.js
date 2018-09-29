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
const command_1 = require("../models/command");
const schematic_command_1 = require("../models/schematic-command");
const config_1 = require("../utilities/config");
class NewCommand extends schematic_command_1.SchematicCommand {
    constructor() {
        super(...arguments);
        this.name = 'new';
        this.description = 'Creates a new directory and a new Angular app.';
        this.allowMissingWorkspace = true;
        this.arguments = [];
        this.options = [
            ...this.coreOptions,
            {
                name: 'verbose',
                type: Boolean,
                default: false,
                aliases: ['v'],
                description: 'Adds more details to output logging.',
            },
            {
                name: 'collection',
                type: String,
                aliases: ['c'],
                description: 'Schematics collection to use.',
            },
        ];
        this.schematicName = 'ng-new';
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
            const collectionName = this.parseCollectionName(options);
            const schematicOptions = yield this.getOptions({
                schematicName: this.schematicName,
                collectionName,
            });
            this.options = this.options.concat(schematicOptions.options);
            const args = schematicOptions.arguments.map(arg => arg.name);
            this.arguments = this.arguments.concat(args);
        });
    }
    run(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options.dryRun) {
                options.skipGit = true;
            }
            let collectionName;
            if (options.collection) {
                collectionName = options.collection;
            }
            else {
                collectionName = this.parseCollectionName(options);
            }
            const packageJson = require('../package.json');
            options.version = packageJson.version;
            // Ensure skipGit has a boolean value.
            options.skipGit = options.skipGit === undefined ? false : options.skipGit;
            options = this.removeLocalOptions(options);
            return this.runSchematic({
                collectionName: collectionName,
                schematicName: this.schematicName,
                schematicOptions: options,
                debug: options.debug,
                dryRun: options.dryRun,
                force: options.force,
            });
        });
    }
    parseCollectionName(options) {
        const collectionName = options.collection || options.c || config_1.getDefaultSchematicCollection();
        return collectionName;
    }
    removeLocalOptions(options) {
        const opts = Object.assign({}, options);
        delete opts.verbose;
        delete opts.collection;
        return opts;
    }
}
NewCommand.aliases = ['n'];
NewCommand.scope = command_1.CommandScope.outsideProject;
exports.NewCommand = NewCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyL2NsaS9jb21tYW5kcy9uZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILGlEQUFpRDtBQUNqRCwrQ0FBeUQ7QUFDekQsbUVBQStEO0FBQy9ELGdEQUFvRTtBQUdwRSxnQkFBd0IsU0FBUSxvQ0FBZ0I7SUFBaEQ7O1FBQ2tCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixnQkFBVyxHQUN6QixnREFBZ0QsQ0FBQztRQUduQywwQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDdEMsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQUN6QixZQUFPLEdBQWE7WUFDekIsR0FBRyxJQUFJLENBQUMsV0FBVztZQUNuQjtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsT0FBTztnQkFDYixPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ2QsV0FBVyxFQUFFLHNDQUFzQzthQUNwRDtZQUNEO2dCQUNFLElBQUksRUFBRSxZQUFZO2dCQUNsQixJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUM7Z0JBQ2QsV0FBVyxFQUFFLCtCQUErQjthQUM3QztTQUNGLENBQUM7UUFDTSxrQkFBYSxHQUFHLFFBQVEsQ0FBQztRQUV6QixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQWlFOUIsQ0FBQztJQWhFYyxVQUFVLENBQUMsT0FBWTs7O1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQsTUFBTSxvQkFBZ0IsWUFBQyxPQUFPLENBQUMsQ0FBQztZQUVoQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUV4QixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFekQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzdDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtnQkFDakMsY0FBYzthQUNmLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0QsTUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FBQTtJQUVZLEdBQUcsQ0FBQyxPQUFZOztZQUMzQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDekIsQ0FBQztZQUVELElBQUksY0FBc0IsQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsY0FBYyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckQsQ0FBQztZQUVELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQy9DLE9BQU8sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztZQUV0QyxzQ0FBc0M7WUFDdEMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBRTFFLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLGNBQWMsRUFBRSxjQUFjO2dCQUM5QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7Z0JBQ2pDLGdCQUFnQixFQUFFLE9BQU87Z0JBQ3pCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztnQkFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2dCQUN0QixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7YUFDckIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRU8sbUJBQW1CLENBQUMsT0FBWTtRQUN0QyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksc0NBQTZCLEVBQUUsQ0FBQztRQUUxRixNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxPQUFZO1FBQ3JDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFdkIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7O0FBdEZhLGtCQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQixnQkFBSyxHQUFHLHNCQUFZLENBQUMsY0FBYyxDQUFDO0FBTHBELGdDQTJGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gdHNsaW50OmRpc2FibGU6bm8tZ2xvYmFsLXRzbGludC1kaXNhYmxlIG5vLWFueVxuaW1wb3J0IHsgQ29tbWFuZFNjb3BlLCBPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvY29tbWFuZCc7XG5pbXBvcnQgeyBTY2hlbWF0aWNDb21tYW5kIH0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYXRpYy1jb21tYW5kJztcbmltcG9ydCB7IGdldERlZmF1bHRTY2hlbWF0aWNDb2xsZWN0aW9uIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbmZpZyc7XG5cblxuZXhwb3J0IGNsYXNzIE5ld0NvbW1hbmQgZXh0ZW5kcyBTY2hlbWF0aWNDb21tYW5kIHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSAnbmV3JztcbiAgcHVibGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uID1cbiAgICAnQ3JlYXRlcyBhIG5ldyBkaXJlY3RvcnkgYW5kIGEgbmV3IEFuZ3VsYXIgYXBwLic7XG4gIHB1YmxpYyBzdGF0aWMgYWxpYXNlcyA9IFsnbiddO1xuICBwdWJsaWMgc3RhdGljIHNjb3BlID0gQ29tbWFuZFNjb3BlLm91dHNpZGVQcm9qZWN0O1xuICBwdWJsaWMgcmVhZG9ubHkgYWxsb3dNaXNzaW5nV29ya3NwYWNlID0gdHJ1ZTtcbiAgcHVibGljIGFyZ3VtZW50czogc3RyaW5nW10gPSBbXTtcbiAgcHVibGljIG9wdGlvbnM6IE9wdGlvbltdID0gW1xuICAgIC4uLnRoaXMuY29yZU9wdGlvbnMsXG4gICAge1xuICAgICAgbmFtZTogJ3ZlcmJvc2UnLFxuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgYWxpYXNlczogWyd2J10sXG4gICAgICBkZXNjcmlwdGlvbjogJ0FkZHMgbW9yZSBkZXRhaWxzIHRvIG91dHB1dCBsb2dnaW5nLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnY29sbGVjdGlvbicsXG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBhbGlhc2VzOiBbJ2MnXSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnU2NoZW1hdGljcyBjb2xsZWN0aW9uIHRvIHVzZS4nLFxuICAgIH0sXG4gIF07XG4gIHByaXZhdGUgc2NoZW1hdGljTmFtZSA9ICduZy1uZXcnO1xuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgcHVibGljIGFzeW5jIGluaXRpYWxpemUob3B0aW9uczogYW55KSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBzdXBlci5pbml0aWFsaXplKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9IHRoaXMucGFyc2VDb2xsZWN0aW9uTmFtZShvcHRpb25zKTtcblxuICAgIGNvbnN0IHNjaGVtYXRpY09wdGlvbnMgPSBhd2FpdCB0aGlzLmdldE9wdGlvbnMoe1xuICAgICAgc2NoZW1hdGljTmFtZTogdGhpcy5zY2hlbWF0aWNOYW1lLFxuICAgICAgY29sbGVjdGlvbk5hbWUsXG4gICAgfSk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMuY29uY2F0KHNjaGVtYXRpY09wdGlvbnMub3B0aW9ucyk7XG4gICAgY29uc3QgYXJncyA9IHNjaGVtYXRpY09wdGlvbnMuYXJndW1lbnRzLm1hcChhcmcgPT4gYXJnLm5hbWUpO1xuICAgIHRoaXMuYXJndW1lbnRzID0gdGhpcy5hcmd1bWVudHMuY29uY2F0KGFyZ3MpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJ1bihvcHRpb25zOiBhbnkpIHtcbiAgICBpZiAob3B0aW9ucy5kcnlSdW4pIHtcbiAgICAgIG9wdGlvbnMuc2tpcEdpdCA9IHRydWU7XG4gICAgfVxuXG4gICAgbGV0IGNvbGxlY3Rpb25OYW1lOiBzdHJpbmc7XG4gICAgaWYgKG9wdGlvbnMuY29sbGVjdGlvbikge1xuICAgICAgY29sbGVjdGlvbk5hbWUgPSBvcHRpb25zLmNvbGxlY3Rpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbGxlY3Rpb25OYW1lID0gdGhpcy5wYXJzZUNvbGxlY3Rpb25OYW1lKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhY2thZ2VKc29uID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgb3B0aW9ucy52ZXJzaW9uID0gcGFja2FnZUpzb24udmVyc2lvbjtcblxuICAgIC8vIEVuc3VyZSBza2lwR2l0IGhhcyBhIGJvb2xlYW4gdmFsdWUuXG4gICAgb3B0aW9ucy5za2lwR2l0ID0gb3B0aW9ucy5za2lwR2l0ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IG9wdGlvbnMuc2tpcEdpdDtcblxuICAgIG9wdGlvbnMgPSB0aGlzLnJlbW92ZUxvY2FsT3B0aW9ucyhvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLnJ1blNjaGVtYXRpYyh7XG4gICAgICBjb2xsZWN0aW9uTmFtZTogY29sbGVjdGlvbk5hbWUsXG4gICAgICBzY2hlbWF0aWNOYW1lOiB0aGlzLnNjaGVtYXRpY05hbWUsXG4gICAgICBzY2hlbWF0aWNPcHRpb25zOiBvcHRpb25zLFxuICAgICAgZGVidWc6IG9wdGlvbnMuZGVidWcsXG4gICAgICBkcnlSdW46IG9wdGlvbnMuZHJ5UnVuLFxuICAgICAgZm9yY2U6IG9wdGlvbnMuZm9yY2UsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlQ29sbGVjdGlvbk5hbWUob3B0aW9uczogYW55KTogc3RyaW5nIHtcbiAgICBjb25zdCBjb2xsZWN0aW9uTmFtZSA9IG9wdGlvbnMuY29sbGVjdGlvbiB8fCBvcHRpb25zLmMgfHwgZ2V0RGVmYXVsdFNjaGVtYXRpY0NvbGxlY3Rpb24oKTtcblxuICAgIHJldHVybiBjb2xsZWN0aW9uTmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlTG9jYWxPcHRpb25zKG9wdGlvbnM6IGFueSk6IGFueSB7XG4gICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgIGRlbGV0ZSBvcHRzLnZlcmJvc2U7XG4gICAgZGVsZXRlIG9wdHMuY29sbGVjdGlvbjtcblxuICAgIHJldHVybiBvcHRzO1xuICB9XG59XG4iXX0=