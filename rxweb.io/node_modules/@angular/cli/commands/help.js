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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvY29tbWFuZHMvaGVscC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILGlEQUFpRDtBQUNqRCwrQ0FBZ0Q7QUFDaEQsK0NBQW9EO0FBR3BELGlCQUF5QixTQUFRLGlCQUFPO0lBQXhDOztRQUNrQixTQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2QsZ0JBQVcsR0FBRyxPQUFPLENBQUM7UUFDdEIsY0FBUyxHQUFhLEVBQUUsQ0FBQztRQUN6QixZQUFPLEdBQWEsRUFBRSxDQUFDO0lBMEJ6QyxDQUFDO0lBeEJDLEdBQUcsQ0FBQyxPQUFZO1FBQ2QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO2FBQzdDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNULE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEMsTUFBTSxPQUFPLEdBQVksSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTdDLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUMsQ0FBQzthQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7YUFDMUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUNkLFdBQVcsRUFBRSxHQUFHLENBQUMsV0FBVztTQUM3QixDQUFDLENBQUMsQ0FBQztRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLGVBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMseURBQXlELENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQVk7UUFDcEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDRjtBQTlCRCxrQ0E4QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWdsb2JhbC10c2xpbnQtZGlzYWJsZSBuby1hbnlcbmltcG9ydCB7IHRlcm1pbmFsIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgQ29tbWFuZCwgT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2NvbW1hbmQnO1xuXG5cbmV4cG9ydCBjbGFzcyBIZWxwQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9ICdoZWxwJztcbiAgcHVibGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uID0gJ0hlbHAuJztcbiAgcHVibGljIHJlYWRvbmx5IGFyZ3VtZW50czogc3RyaW5nW10gPSBbXTtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IE9wdGlvbltdID0gW107XG5cbiAgcnVuKG9wdGlvbnM6IGFueSkge1xuICAgIGNvbnN0IGNvbW1hbmRzID0gT2JqZWN0LmtleXMob3B0aW9ucy5jb21tYW5kTWFwKVxuICAgICAgLm1hcChrZXkgPT4ge1xuICAgICAgICBjb25zdCBDbWQgPSBvcHRpb25zLmNvbW1hbmRNYXBba2V5XTtcbiAgICAgICAgY29uc3QgY29tbWFuZDogQ29tbWFuZCA9IG5ldyBDbWQobnVsbCwgbnVsbCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbW1hbmQ7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihjbWQgPT4gIWNtZC5oaWRkZW4gJiYgIWNtZC51bmtub3duKVxuICAgICAgLm1hcChjbWQgPT4gKHtcbiAgICAgICAgbmFtZTogY21kLm5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBjbWQuZGVzY3JpcHRpb24sXG4gICAgICB9KSk7XG4gICAgdGhpcy5sb2dnZXIuaW5mbyhgQXZhaWxhYmxlIENvbW1hbmRzOmApO1xuICAgIGNvbW1hbmRzLmZvckVhY2goY21kID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oYCAgJHt0ZXJtaW5hbC5jeWFuKGNtZC5uYW1lKX0gJHtjbWQuZGVzY3JpcHRpb259YCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmxvZ2dlci5pbmZvKGBcXG5Gb3IgbW9yZSBkZXRhaWxlZCBoZWxwIHJ1biBcIm5nIFtjb21tYW5kIG5hbWVdIC0taGVscFwiYCk7XG4gIH1cblxuICBwcmludEhlbHAob3B0aW9uczogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMucnVuKG9wdGlvbnMpO1xuICB9XG59XG4iXX0=