"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-global-tslint-disable no-any
const core_1 = require("@angular-devkit/core");
const command_1 = require("../models/command");
class HelpCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'help';
        this.description = 'Help.';
        this.arguments = [];
        this.options = [];
    }
    run(options) {
        const commands = Object.keys(options.commandMap)
            .map(key => {
            const Cmd = options.commandMap[key];
            const command = new Cmd(null, null);
            return command;
        })
            .filter(cmd => !cmd.hidden && !cmd.unknown)
            .map(cmd => ({
            name: cmd.name,
            description: cmd.description,
        }));
        this.logger.info(`Available Commands:`);
        commands.forEach(cmd => {
            this.logger.info(`  ${core_1.terminal.cyan(cmd.name)} ${cmd.description}`);
        });
        this.logger.info(`\nFor more detailed help run "ng [command name] --help"`);
    }
    printHelp(options) {
        return this.run(options);
    }
}
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvY29tbWFuZHMvaGVscC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILGlEQUFpRDtBQUNqRCwrQ0FBZ0Q7QUFDaEQsK0NBQW9EO0FBR3BELGlCQUF5QixTQUFRLGlCQUFPO0lBQXhDOztRQUNrQixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsZ0JBQVcsR0FBRyxPQUFPLENBQUM7UUFDdEIsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQUN6QixZQUFPLEdBQWEsRUFBRSxDQUFDO0lBMEJ6QyxDQUFDO0lBeEJDLEdBQUcsQ0FBQyxPQUFZO1FBQ2QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO2FBQzdDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNULE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEMsTUFBTSxPQUFPLEdBQVksSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTdDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakIsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQzthQUMxQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ2QsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1NBQzdCLENBQUMsQ0FBQyxDQUFDO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN4QyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssZUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBWTtRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUE5QkQsa0NBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1nbG9iYWwtdHNsaW50LWRpc2FibGUgbm8tYW55XG5pbXBvcnQgeyB0ZXJtaW5hbCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IENvbW1hbmQsIE9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9jb21tYW5kJztcblxuXG5leHBvcnQgY2xhc3MgSGVscENvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSAnaGVscCc7XG4gIHB1YmxpYyByZWFkb25seSBkZXNjcmlwdGlvbiA9ICdIZWxwLic7XG4gIHB1YmxpYyByZWFkb25seSBhcmd1bWVudHM6IHN0cmluZ1tdID0gW107XG4gIHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBPcHRpb25bXSA9IFtdO1xuXG4gIHJ1bihvcHRpb25zOiBhbnkpIHtcbiAgICBjb25zdCBjb21tYW5kcyA9IE9iamVjdC5rZXlzKG9wdGlvbnMuY29tbWFuZE1hcClcbiAgICAgIC5tYXAoa2V5ID0+IHtcbiAgICAgICAgY29uc3QgQ21kID0gb3B0aW9ucy5jb21tYW5kTWFwW2tleV07XG4gICAgICAgIGNvbnN0IGNvbW1hbmQ6IENvbW1hbmQgPSBuZXcgQ21kKG51bGwsIG51bGwpO1xuXG4gICAgICAgIHJldHVybiBjb21tYW5kO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoY21kID0+ICFjbWQuaGlkZGVuICYmICFjbWQudW5rbm93bilcbiAgICAgIC5tYXAoY21kID0+ICh7XG4gICAgICAgIG5hbWU6IGNtZC5uYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogY21kLmRlc2NyaXB0aW9uLFxuICAgICAgfSkpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8oYEF2YWlsYWJsZSBDb21tYW5kczpgKTtcbiAgICBjb21tYW5kcy5mb3JFYWNoKGNtZCA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKGAgICR7dGVybWluYWwuY3lhbihjbWQubmFtZSl9ICR7Y21kLmRlc2NyaXB0aW9ufWApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5sb2dnZXIuaW5mbyhgXFxuRm9yIG1vcmUgZGV0YWlsZWQgaGVscCBydW4gXCJuZyBbY29tbWFuZCBuYW1lXSAtLWhlbHBcImApO1xuICB9XG5cbiAgcHJpbnRIZWxwKG9wdGlvbnM6IGFueSkge1xuICAgIHJldHVybiB0aGlzLnJ1bihvcHRpb25zKTtcbiAgfVxufVxuIl19