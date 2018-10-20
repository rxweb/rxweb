"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
function default_1(options) {
    if (!options.name) {
        throw new schematics_1.SchematicsException(`Invalid options, "name" is required.`);
    }
    if (!options.directory) {
        options.directory = options.name;
    }
    const workspaceOptions = {
        name: options.name,
        version: options.version,
        newProjectRoot: options.newProjectRoot || 'projects',
    };
    const applicationOptions = {
        projectRoot: '',
        name: options.name,
        inlineStyle: options.inlineStyle,
        inlineTemplate: options.inlineTemplate,
        prefix: options.prefix,
        viewEncapsulation: options.viewEncapsulation,
        routing: options.routing,
        style: options.style,
        skipTests: options.skipTests,
        skipPackageJson: false,
    };
    return schematics_1.chain([
        schematics_1.mergeWith(schematics_1.apply(schematics_1.empty(), [
            schematics_1.schematic('workspace', workspaceOptions),
            schematics_1.schematic('application', applicationOptions),
            schematics_1.move(options.directory || options.name),
        ])),
        (_host, context) => {
            let packageTask;
            if (!options.skipInstall) {
                packageTask = context.addTask(new tasks_1.NodePackageInstallTask(options.directory));
                if (options.linkCli) {
                    packageTask = context.addTask(new tasks_1.NodePackageLinkTask('@angular/cli', options.directory), [packageTask]);
                }
            }
            if (!options.skipGit) {
                const commit = typeof options.commit == 'object'
                    ? options.commit
                    : (!!options.commit ? {} : false);
                context.addTask(new tasks_1.RepositoryInitializerTask(options.directory, commit), packageTask ? [packageTask] : []);
            }
        },
    ]);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3NjaGVtYXRpY3MvYW5ndWxhci9uZy1uZXcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwyREFXb0M7QUFDcEMsNERBSTBDO0FBTTFDLG1CQUF5QixPQUFxQjtJQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtRQUNqQixNQUFNLElBQUksZ0NBQW1CLENBQUMsc0NBQXNDLENBQUMsQ0FBQztLQUN2RTtJQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztLQUNsQztJQUVELE1BQU0sZ0JBQWdCLEdBQXFCO1FBQ3pDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtRQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDeEIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxjQUFjLElBQUksVUFBVTtLQUNyRCxDQUFDO0lBQ0YsTUFBTSxrQkFBa0IsR0FBdUI7UUFDN0MsV0FBVyxFQUFFLEVBQUU7UUFDZixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1FBQ2hDLGNBQWMsRUFBRSxPQUFPLENBQUMsY0FBYztRQUN0QyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07UUFDdEIsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLGlCQUFpQjtRQUM1QyxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDeEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ3BCLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztRQUM1QixlQUFlLEVBQUUsS0FBSztLQUN2QixDQUFDO0lBRUYsT0FBTyxrQkFBSyxDQUFDO1FBQ1gsc0JBQVMsQ0FDUCxrQkFBSyxDQUFDLGtCQUFLLEVBQUUsRUFBRTtZQUNiLHNCQUFTLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDO1lBQ3hDLHNCQUFTLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDO1lBQzVDLGlCQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ3hDLENBQUMsQ0FDSDtRQUNELENBQUMsS0FBVyxFQUFFLE9BQXlCLEVBQUUsRUFBRTtZQUN6QyxJQUFJLFdBQVcsQ0FBQztZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDeEIsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSw4QkFBc0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0UsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNuQixXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDM0IsSUFBSSwyQkFBbUIsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUMxRCxDQUFDLFdBQVcsQ0FBQyxDQUNkLENBQUM7aUJBQ0g7YUFDRjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUNwQixNQUFNLE1BQU0sR0FBRyxPQUFPLE9BQU8sQ0FBQyxNQUFNLElBQUksUUFBUTtvQkFDOUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNO29CQUNoQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFcEMsT0FBTyxDQUFDLE9BQU8sQ0FDYixJQUFJLGlDQUF5QixDQUMzQixPQUFPLENBQUMsU0FBUyxFQUNqQixNQUFNLENBQ1AsRUFDRCxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDakMsQ0FBQzthQUNIO1FBQ0gsQ0FBQztLQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7QUE3REQsNEJBNkRDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtcbiAgUnVsZSxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgU2NoZW1hdGljc0V4Y2VwdGlvbixcbiAgVHJlZSxcbiAgYXBwbHksXG4gIGNoYWluLFxuICBlbXB0eSxcbiAgbWVyZ2VXaXRoLFxuICBtb3ZlLFxuICBzY2hlbWF0aWMsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7XG4gIE5vZGVQYWNrYWdlSW5zdGFsbFRhc2ssXG4gIE5vZGVQYWNrYWdlTGlua1Rhc2ssXG4gIFJlcG9zaXRvcnlJbml0aWFsaXplclRhc2ssXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rhc2tzJztcbmltcG9ydCB7IFNjaGVtYSBhcyBBcHBsaWNhdGlvbk9wdGlvbnMgfSBmcm9tICcuLi9hcHBsaWNhdGlvbi9zY2hlbWEnO1xuaW1wb3J0IHsgU2NoZW1hIGFzIFdvcmtzcGFjZU9wdGlvbnMgfSBmcm9tICcuLi93b3Jrc3BhY2Uvc2NoZW1hJztcbmltcG9ydCB7IFNjaGVtYSBhcyBOZ05ld09wdGlvbnMgfSBmcm9tICcuL3NjaGVtYSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnM6IE5nTmV3T3B0aW9ucyk6IFJ1bGUge1xuICBpZiAoIW9wdGlvbnMubmFtZSkge1xuICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBJbnZhbGlkIG9wdGlvbnMsIFwibmFtZVwiIGlzIHJlcXVpcmVkLmApO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLmRpcmVjdG9yeSkge1xuICAgIG9wdGlvbnMuZGlyZWN0b3J5ID0gb3B0aW9ucy5uYW1lO1xuICB9XG5cbiAgY29uc3Qgd29ya3NwYWNlT3B0aW9uczogV29ya3NwYWNlT3B0aW9ucyA9IHtcbiAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgdmVyc2lvbjogb3B0aW9ucy52ZXJzaW9uLFxuICAgIG5ld1Byb2plY3RSb290OiBvcHRpb25zLm5ld1Byb2plY3RSb290IHx8ICdwcm9qZWN0cycsXG4gIH07XG4gIGNvbnN0IGFwcGxpY2F0aW9uT3B0aW9uczogQXBwbGljYXRpb25PcHRpb25zID0ge1xuICAgIHByb2plY3RSb290OiAnJyxcbiAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgaW5saW5lU3R5bGU6IG9wdGlvbnMuaW5saW5lU3R5bGUsXG4gICAgaW5saW5lVGVtcGxhdGU6IG9wdGlvbnMuaW5saW5lVGVtcGxhdGUsXG4gICAgcHJlZml4OiBvcHRpb25zLnByZWZpeCxcbiAgICB2aWV3RW5jYXBzdWxhdGlvbjogb3B0aW9ucy52aWV3RW5jYXBzdWxhdGlvbixcbiAgICByb3V0aW5nOiBvcHRpb25zLnJvdXRpbmcsXG4gICAgc3R5bGU6IG9wdGlvbnMuc3R5bGUsXG4gICAgc2tpcFRlc3RzOiBvcHRpb25zLnNraXBUZXN0cyxcbiAgICBza2lwUGFja2FnZUpzb246IGZhbHNlLFxuICB9O1xuXG4gIHJldHVybiBjaGFpbihbXG4gICAgbWVyZ2VXaXRoKFxuICAgICAgYXBwbHkoZW1wdHkoKSwgW1xuICAgICAgICBzY2hlbWF0aWMoJ3dvcmtzcGFjZScsIHdvcmtzcGFjZU9wdGlvbnMpLFxuICAgICAgICBzY2hlbWF0aWMoJ2FwcGxpY2F0aW9uJywgYXBwbGljYXRpb25PcHRpb25zKSxcbiAgICAgICAgbW92ZShvcHRpb25zLmRpcmVjdG9yeSB8fCBvcHRpb25zLm5hbWUpLFxuICAgICAgXSksXG4gICAgKSxcbiAgICAoX2hvc3Q6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICAgIGxldCBwYWNrYWdlVGFzaztcbiAgICAgIGlmICghb3B0aW9ucy5za2lwSW5zdGFsbCkge1xuICAgICAgICBwYWNrYWdlVGFzayA9IGNvbnRleHQuYWRkVGFzayhuZXcgTm9kZVBhY2thZ2VJbnN0YWxsVGFzayhvcHRpb25zLmRpcmVjdG9yeSkpO1xuICAgICAgICBpZiAob3B0aW9ucy5saW5rQ2xpKSB7XG4gICAgICAgICAgcGFja2FnZVRhc2sgPSBjb250ZXh0LmFkZFRhc2soXG4gICAgICAgICAgICBuZXcgTm9kZVBhY2thZ2VMaW5rVGFzaygnQGFuZ3VsYXIvY2xpJywgb3B0aW9ucy5kaXJlY3RvcnkpLFxuICAgICAgICAgICAgW3BhY2thZ2VUYXNrXSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIW9wdGlvbnMuc2tpcEdpdCkge1xuICAgICAgICBjb25zdCBjb21taXQgPSB0eXBlb2Ygb3B0aW9ucy5jb21taXQgPT0gJ29iamVjdCdcbiAgICAgICAgICA/IG9wdGlvbnMuY29tbWl0XG4gICAgICAgICAgOiAoISFvcHRpb25zLmNvbW1pdCA/IHt9IDogZmFsc2UpO1xuXG4gICAgICAgIGNvbnRleHQuYWRkVGFzayhcbiAgICAgICAgICBuZXcgUmVwb3NpdG9yeUluaXRpYWxpemVyVGFzayhcbiAgICAgICAgICAgIG9wdGlvbnMuZGlyZWN0b3J5LFxuICAgICAgICAgICAgY29tbWl0LFxuICAgICAgICAgICksXG4gICAgICAgICAgcGFja2FnZVRhc2sgPyBbcGFja2FnZVRhc2tdIDogW10sXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSxcbiAgXSk7XG59XG4iXX0=