"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const child_process_1 = require("child_process");
const path = require("path");
const rxjs_1 = require("rxjs");
const packageManagers = {
    'npm': {
        quietArgument: '--quiet',
        commands: {
            installAll: 'install',
            installPackage: 'install',
        },
    },
    'cnpm': {
        commands: {
            installAll: 'install',
            installPackage: 'install',
        },
    },
    'yarn': {
        quietArgument: '--silent',
        commands: {
            installPackage: 'add',
        },
    },
};
class UnknownPackageManagerException extends core_1.BaseException {
    constructor(name) {
        super(`Unknown package manager "${name}".`);
    }
}
exports.UnknownPackageManagerException = UnknownPackageManagerException;
function default_1(factoryOptions = {}) {
    const packageManagerName = factoryOptions.packageManager || 'npm';
    const packageManagerProfile = packageManagers[packageManagerName];
    if (!packageManagerProfile) {
        throw new UnknownPackageManagerException(packageManagerName);
    }
    const rootDirectory = factoryOptions.rootDirectory || process.cwd();
    return (options) => {
        let taskPackageManagerProfile = packageManagerProfile;
        let taskPackageManagerName = packageManagerName;
        if (factoryOptions.allowPackageManagerOverride && options.packageManager) {
            taskPackageManagerProfile = packageManagers[options.packageManager];
            if (!taskPackageManagerProfile) {
                throw new UnknownPackageManagerException(options.packageManager);
            }
            taskPackageManagerName = options.packageManager;
        }
        const outputStream = process.stdout;
        const errorStream = process.stderr;
        const spawnOptions = {
            stdio: [process.stdin, outputStream, errorStream],
            shell: true,
            cwd: path.join(rootDirectory, options.workingDirectory || ''),
        };
        const args = [];
        if (options.packageName) {
            if (options.command === 'install') {
                args.push(packageManagerProfile.commands.installPackage);
            }
            args.push(options.packageName);
        }
        else if (options.command === 'install' && packageManagerProfile.commands.installAll) {
            args.push(packageManagerProfile.commands.installAll);
        }
        if (options.quiet && taskPackageManagerProfile.quietArgument) {
            args.push(taskPackageManagerProfile.quietArgument);
        }
        return new rxjs_1.Observable(obs => {
            child_process_1.spawn(taskPackageManagerName, args, spawnOptions)
                .on('close', (code) => {
                if (code === 0) {
                    obs.next();
                    obs.complete();
                }
                else {
                    const message = 'Package install failed, see above.';
                    obs.error(new Error(message));
                }
            });
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3MvdGFza3Mvbm9kZS1wYWNrYWdlL2V4ZWN1dG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0NBQXFEO0FBQ3JELGlEQUFvRDtBQUNwRCw2QkFBNkI7QUFDN0IsK0JBQWtDO0FBWWxDLE1BQU0sZUFBZSxHQUE4QztJQUNqRSxLQUFLLEVBQUU7UUFDTCxhQUFhLEVBQUUsU0FBUztRQUN4QixRQUFRLEVBQUU7WUFDUixVQUFVLEVBQUUsU0FBUztZQUNyQixjQUFjLEVBQUUsU0FBUztTQUMxQjtLQUNGO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFO1lBQ1IsVUFBVSxFQUFFLFNBQVM7WUFDckIsY0FBYyxFQUFFLFNBQVM7U0FDMUI7S0FDRDtJQUNGLE1BQU0sRUFBRTtRQUNOLGFBQWEsRUFBRSxVQUFVO1FBQ3pCLFFBQVEsRUFBRTtZQUNSLGNBQWMsRUFBRSxLQUFLO1NBQ3RCO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsb0NBQTRDLFNBQVEsb0JBQWE7SUFDL0QsWUFBWSxJQUFZO1FBQ3RCLEtBQUssQ0FBQyw0QkFBNEIsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0NBQ0Y7QUFKRCx3RUFJQztBQUVELG1CQUNFLGlCQUFnRCxFQUFFO0lBRWxELE1BQU0sa0JBQWtCLEdBQUcsY0FBYyxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUM7SUFDbEUsTUFBTSxxQkFBcUIsR0FBRyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNsRSxJQUFJLENBQUMscUJBQXFCLEVBQUU7UUFDMUIsTUFBTSxJQUFJLDhCQUE4QixDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDOUQ7SUFFRCxNQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVwRSxPQUFPLENBQUMsT0FBK0IsRUFBRSxFQUFFO1FBQ3pDLElBQUkseUJBQXlCLEdBQUcscUJBQXFCLENBQUM7UUFDdEQsSUFBSSxzQkFBc0IsR0FBRyxrQkFBa0IsQ0FBQztRQUNoRCxJQUFJLGNBQWMsQ0FBQywyQkFBMkIsSUFBSSxPQUFPLENBQUMsY0FBYyxFQUFFO1lBQ3hFLHlCQUF5QixHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLHlCQUF5QixFQUFFO2dCQUM5QixNQUFNLElBQUksOEJBQThCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ2xFO1lBQ0Qsc0JBQXNCLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQztTQUNqRDtRQUVELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDcEMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxNQUFNLFlBQVksR0FBaUI7WUFDakMsS0FBSyxFQUFHLENBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFFO1lBQ3BELEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7U0FDOUQsQ0FBQztRQUNGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUUxQixJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDdkIsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDMUQ7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxTQUFTLElBQUkscUJBQXFCLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUNyRixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSx5QkFBeUIsQ0FBQyxhQUFhLEVBQUU7WUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNwRDtRQUVELE9BQU8sSUFBSSxpQkFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLHFCQUFLLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQztpQkFDOUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFO2dCQUM1QixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7b0JBQ2QsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNYLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDaEI7cUJBQU07b0JBQ0wsTUFBTSxPQUFPLEdBQUcsb0NBQW9DLENBQUM7b0JBQ3JELEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDL0I7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQTFERCw0QkEwREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgU3Bhd25PcHRpb25zLCBzcGF3biB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRhc2tFeGVjdXRvciB9IGZyb20gJy4uLy4uL3NyYyc7XG5pbXBvcnQgeyBOb2RlUGFja2FnZVRhc2tGYWN0b3J5T3B0aW9ucywgTm9kZVBhY2thZ2VUYXNrT3B0aW9ucyB9IGZyb20gJy4vb3B0aW9ucyc7XG5cbnR5cGUgUGFja2FnZU1hbmFnZXJQcm9maWxlID0ge1xuICBxdWlldEFyZ3VtZW50Pzogc3RyaW5nO1xuICBjb21tYW5kczoge1xuICAgIGluc3RhbGxBbGw/OiBzdHJpbmc7XG4gICAgaW5zdGFsbFBhY2thZ2U6IHN0cmluZztcbiAgfSxcbn07XG5cbmNvbnN0IHBhY2thZ2VNYW5hZ2VyczogeyBbbmFtZTogc3RyaW5nXTogUGFja2FnZU1hbmFnZXJQcm9maWxlIH0gPSB7XG4gICducG0nOiB7XG4gICAgcXVpZXRBcmd1bWVudDogJy0tcXVpZXQnLFxuICAgIGNvbW1hbmRzOiB7XG4gICAgICBpbnN0YWxsQWxsOiAnaW5zdGFsbCcsXG4gICAgICBpbnN0YWxsUGFja2FnZTogJ2luc3RhbGwnLFxuICAgIH0sXG4gIH0sXG4gICdjbnBtJzoge1xuICAgIGNvbW1hbmRzOiB7XG4gICAgICBpbnN0YWxsQWxsOiAnaW5zdGFsbCcsXG4gICAgICBpbnN0YWxsUGFja2FnZTogJ2luc3RhbGwnLFxuICAgIH0sXG4gICB9LFxuICAneWFybic6IHtcbiAgICBxdWlldEFyZ3VtZW50OiAnLS1zaWxlbnQnLFxuICAgIGNvbW1hbmRzOiB7XG4gICAgICBpbnN0YWxsUGFja2FnZTogJ2FkZCcsXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjbGFzcyBVbmtub3duUGFja2FnZU1hbmFnZXJFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoYFVua25vd24gcGFja2FnZSBtYW5hZ2VyIFwiJHtuYW1lfVwiLmApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKFxuICBmYWN0b3J5T3B0aW9uczogTm9kZVBhY2thZ2VUYXNrRmFjdG9yeU9wdGlvbnMgPSB7fSxcbik6IFRhc2tFeGVjdXRvcjxOb2RlUGFja2FnZVRhc2tPcHRpb25zPiB7XG4gIGNvbnN0IHBhY2thZ2VNYW5hZ2VyTmFtZSA9IGZhY3RvcnlPcHRpb25zLnBhY2thZ2VNYW5hZ2VyIHx8ICducG0nO1xuICBjb25zdCBwYWNrYWdlTWFuYWdlclByb2ZpbGUgPSBwYWNrYWdlTWFuYWdlcnNbcGFja2FnZU1hbmFnZXJOYW1lXTtcbiAgaWYgKCFwYWNrYWdlTWFuYWdlclByb2ZpbGUpIHtcbiAgICB0aHJvdyBuZXcgVW5rbm93blBhY2thZ2VNYW5hZ2VyRXhjZXB0aW9uKHBhY2thZ2VNYW5hZ2VyTmFtZSk7XG4gIH1cblxuICBjb25zdCByb290RGlyZWN0b3J5ID0gZmFjdG9yeU9wdGlvbnMucm9vdERpcmVjdG9yeSB8fCBwcm9jZXNzLmN3ZCgpO1xuXG4gIHJldHVybiAob3B0aW9uczogTm9kZVBhY2thZ2VUYXNrT3B0aW9ucykgPT4ge1xuICAgIGxldCB0YXNrUGFja2FnZU1hbmFnZXJQcm9maWxlID0gcGFja2FnZU1hbmFnZXJQcm9maWxlO1xuICAgIGxldCB0YXNrUGFja2FnZU1hbmFnZXJOYW1lID0gcGFja2FnZU1hbmFnZXJOYW1lO1xuICAgIGlmIChmYWN0b3J5T3B0aW9ucy5hbGxvd1BhY2thZ2VNYW5hZ2VyT3ZlcnJpZGUgJiYgb3B0aW9ucy5wYWNrYWdlTWFuYWdlcikge1xuICAgICAgdGFza1BhY2thZ2VNYW5hZ2VyUHJvZmlsZSA9IHBhY2thZ2VNYW5hZ2Vyc1tvcHRpb25zLnBhY2thZ2VNYW5hZ2VyXTtcbiAgICAgIGlmICghdGFza1BhY2thZ2VNYW5hZ2VyUHJvZmlsZSkge1xuICAgICAgICB0aHJvdyBuZXcgVW5rbm93blBhY2thZ2VNYW5hZ2VyRXhjZXB0aW9uKG9wdGlvbnMucGFja2FnZU1hbmFnZXIpO1xuICAgICAgfVxuICAgICAgdGFza1BhY2thZ2VNYW5hZ2VyTmFtZSA9IG9wdGlvbnMucGFja2FnZU1hbmFnZXI7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0U3RyZWFtID0gcHJvY2Vzcy5zdGRvdXQ7XG4gICAgY29uc3QgZXJyb3JTdHJlYW0gPSBwcm9jZXNzLnN0ZGVycjtcbiAgICBjb25zdCBzcGF3bk9wdGlvbnM6IFNwYXduT3B0aW9ucyA9IHtcbiAgICAgIHN0ZGlvOiAgWyBwcm9jZXNzLnN0ZGluLCBvdXRwdXRTdHJlYW0sIGVycm9yU3RyZWFtIF0sXG4gICAgICBzaGVsbDogdHJ1ZSxcbiAgICAgIGN3ZDogcGF0aC5qb2luKHJvb3REaXJlY3RvcnksIG9wdGlvbnMud29ya2luZ0RpcmVjdG9yeSB8fCAnJyksXG4gICAgfTtcbiAgICBjb25zdCBhcmdzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKG9wdGlvbnMucGFja2FnZU5hbWUpIHtcbiAgICAgIGlmIChvcHRpb25zLmNvbW1hbmQgPT09ICdpbnN0YWxsJykge1xuICAgICAgICBhcmdzLnB1c2gocGFja2FnZU1hbmFnZXJQcm9maWxlLmNvbW1hbmRzLmluc3RhbGxQYWNrYWdlKTtcbiAgICAgIH1cbiAgICAgIGFyZ3MucHVzaChvcHRpb25zLnBhY2thZ2VOYW1lKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuY29tbWFuZCA9PT0gJ2luc3RhbGwnICYmIHBhY2thZ2VNYW5hZ2VyUHJvZmlsZS5jb21tYW5kcy5pbnN0YWxsQWxsKSB7XG4gICAgICBhcmdzLnB1c2gocGFja2FnZU1hbmFnZXJQcm9maWxlLmNvbW1hbmRzLmluc3RhbGxBbGwpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnF1aWV0ICYmIHRhc2tQYWNrYWdlTWFuYWdlclByb2ZpbGUucXVpZXRBcmd1bWVudCkge1xuICAgICAgYXJncy5wdXNoKHRhc2tQYWNrYWdlTWFuYWdlclByb2ZpbGUucXVpZXRBcmd1bWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKG9icyA9PiB7XG4gICAgICBzcGF3bih0YXNrUGFja2FnZU1hbmFnZXJOYW1lLCBhcmdzLCBzcGF3bk9wdGlvbnMpXG4gICAgICAgIC5vbignY2xvc2UnLCAoY29kZTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgaWYgKGNvZGUgPT09IDApIHtcbiAgICAgICAgICAgIG9icy5uZXh0KCk7XG4gICAgICAgICAgICBvYnMuY29tcGxldGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9ICdQYWNrYWdlIGluc3RhbGwgZmFpbGVkLCBzZWUgYWJvdmUuJztcbiAgICAgICAgICAgIG9icy5lcnJvcihuZXcgRXJyb3IobWVzc2FnZSkpO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gIH07XG59XG4iXX0=