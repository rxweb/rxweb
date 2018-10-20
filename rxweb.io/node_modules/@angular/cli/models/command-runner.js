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
const yargsParser = require("yargs-parser");
const command_1 = require("../models/command");
const project_1 = require("../utilities/project");
// Based off https://en.wikipedia.org/wiki/Levenshtein_distance
// No optimization, really.
function levenshtein(a, b) {
    /* base case: empty strings */
    if (a.length == 0) {
        return b.length;
    }
    if (b.length == 0) {
        return a.length;
    }
    // Test if last characters of the strings match.
    const cost = a[a.length - 1] == b[b.length - 1] ? 0 : 1;
    /* return minimum of delete char from s, delete char from t, and delete char from both */
    return Math.min(levenshtein(a.slice(0, -1), b) + 1, levenshtein(a, b.slice(0, -1)) + 1, levenshtein(a.slice(0, -1), b.slice(0, -1)) + cost);
}
/**
 * Run a command.
 * @param commandMap Map of available commands.
 * @param args Raw unparsed arguments.
 * @param logger The logger to use.
 * @param context Execution context.
 */
function runCommand(commandMap, args, logger, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // if not args supplied, just run the help command.
        if (!args || args.length === 0) {
            args = ['help'];
        }
        const rawOptions = yargsParser(args, { alias: { help: ['h'] }, boolean: ['help'] });
        let commandName = rawOptions._[0] || '';
        // remove the command name
        rawOptions._ = rawOptions._.slice(1);
        const executionScope = project_1.insideProject()
            ? command_1.CommandScope.inProject
            : command_1.CommandScope.outsideProject;
        let Cmd;
        Cmd = commandName ? findCommand(commandMap, commandName) : null;
        if (!Cmd && (rawOptions.v || rawOptions.version)) {
            commandName = 'version';
            Cmd = findCommand(commandMap, commandName);
        }
        else if (!Cmd && (!commandName || rawOptions.help)) {
            commandName = 'help';
            Cmd = findCommand(commandMap, commandName);
        }
        if (!Cmd) {
            if (!commandName) {
                logger.error(core_1.tags.stripIndent `
        We could not find a command from the arguments and the help command seems to be disabled.
        This is an issue with the CLI itself. If you see this comment, please report it and
        provide your repository.
      `);
                return 1;
            }
            else {
                // Set name to string (no undefined).
                const commandsDistance = {};
                const allCommands = listAllCommandNames(commandMap).sort((a, b) => {
                    if (!(a in commandsDistance)) {
                        commandsDistance[a] = levenshtein(a, commandName);
                    }
                    if (!(b in commandsDistance)) {
                        commandsDistance[b] = levenshtein(b, commandName);
                    }
                    return commandsDistance[a] - commandsDistance[b];
                });
                logger.error(core_1.tags.stripIndent `
        The specified command ("${commandName}") is invalid. For a list of available options,
        run "ng help".

        Did you mean "${allCommands[0]}"?
      `);
                return 1;
            }
        }
        const command = new Cmd(context, logger);
        args = yield command.initializeRaw(args);
        let options = parseOptions(args, command.options, command.arguments, command.argStrategy);
        yield command.initialize(options);
        options = parseOptions(args, command.options, command.arguments, command.argStrategy);
        if (commandName === 'help') {
            options.commandMap = commandMap;
        }
        if (options.help) {
            command.printHelp(options);
            return;
        }
        else {
            if (Cmd.scope !== undefined && Cmd.scope !== command_1.CommandScope.everywhere) {
                if (Cmd.scope !== executionScope) {
                    let errorMessage;
                    if (Cmd.scope === command_1.CommandScope.inProject) {
                        errorMessage = `This command can only be run inside of a CLI project.`;
                    }
                    else {
                        errorMessage = `This command can not be run inside of a CLI project.`;
                    }
                    logger.fatal(errorMessage);
                    return 1;
                }
                if (Cmd.scope === command_1.CommandScope.inProject) {
                    if (!context.project.configFile) {
                        logger.fatal('Invalid project: missing workspace file.');
                        return 1;
                    }
                    if (['.angular-cli.json', 'angular-cli.json'].includes(context.project.configFile)) {
                        // --------------------------------------------------------------------------------
                        // If changing this message, please update the same message in
                        // `packages/@angular/cli/bin/ng-update-message.js`
                        const message = core_1.tags.stripIndent `
            The Angular CLI configuration format has been changed, and your existing configuration
            can be updated automatically by running the following command:

              ng update @angular/cli
          `;
                        logger.warn(message);
                        return 1;
                    }
                }
            }
            delete options.h;
            delete options.help;
            const isValid = yield command.validate(options);
            if (!isValid) {
                logger.fatal(`Validation error. Invalid command`);
                return 1;
            }
            return command.run(options);
        }
    });
}
exports.runCommand = runCommand;
function parseOptions(args, cmdOpts, commandArguments, argStrategy) {
    const parser = yargsParser;
    const aliases = cmdOpts.concat()
        .filter(o => o.aliases && o.aliases.length > 0)
        .reduce((aliases, opt) => {
        aliases[opt.name] = (opt.aliases || [])
            .filter(a => a.length === 1);
        return aliases;
    }, {});
    const booleans = cmdOpts
        .filter(o => o.type && o.type === Boolean)
        .map(o => o.name);
    const defaults = cmdOpts
        .filter(o => o.default !== undefined || booleans.indexOf(o.name) !== -1)
        .reduce((defaults, opt) => {
        defaults[opt.name] = opt.default;
        return defaults;
    }, {});
    const strings = cmdOpts
        .filter(o => o.type === String)
        .map(o => o.name);
    const numbers = cmdOpts
        .filter(o => o.type === Number)
        .map(o => o.name);
    aliases.help = ['h'];
    booleans.push('help');
    const yargsOptions = {
        alias: aliases,
        boolean: booleans,
        default: defaults,
        string: strings,
        number: numbers,
    };
    const parsedOptions = parser(args, yargsOptions);
    // Remove aliases.
    cmdOpts
        .filter(o => o.aliases && o.aliases.length > 0)
        .map(o => o.aliases)
        .reduce((allAliases, aliases) => {
        return allAliases.concat([...aliases]);
    }, [])
        .forEach((alias) => {
        delete parsedOptions[alias];
    });
    // Remove undefined booleans
    booleans
        .filter(b => parsedOptions[b] === undefined)
        .map(b => core_1.strings.camelize(b))
        .forEach(b => delete parsedOptions[b]);
    // remove options with dashes.
    Object.keys(parsedOptions)
        .filter(key => key.indexOf('-') !== -1)
        .forEach(key => delete parsedOptions[key]);
    // remove the command name
    parsedOptions._ = parsedOptions._.slice(1);
    switch (argStrategy) {
        case command_1.ArgumentStrategy.MapToOptions:
            parsedOptions._.forEach((value, index) => {
                const arg = commandArguments[index];
                if (arg) {
                    parsedOptions[arg] = value;
                }
            });
            delete parsedOptions._;
            break;
    }
    return parsedOptions;
}
exports.parseOptions = parseOptions;
// Find a command.
function findCommand(map, name) {
    let Cmd = map[name];
    if (!Cmd) {
        // find command via aliases
        Cmd = Object.keys(map)
            .filter(key => {
            if (!map[key].aliases) {
                return false;
            }
            const foundAlias = map[key].aliases
                .filter((alias) => alias === name);
            return foundAlias.length > 0;
        })
            .map((key) => {
            return map[key];
        })[0];
    }
    if (!Cmd) {
        return null;
    }
    return Cmd;
}
function listAllCommandNames(map) {
    return Object.keys(map).concat(Object.keys(map)
        .reduce((acc, key) => {
        if (!map[key].aliases) {
            return acc;
        }
        return acc.concat(map[key].aliases);
    }, []));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1ydW5uZXIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXIvY2xpL21vZGVscy9jb21tYW5kLXJ1bm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7O0FBRUgsaURBQWlEO0FBQ2pELCtDQUE2RTtBQUM3RSw0Q0FBNEM7QUFDNUMsK0NBTTJCO0FBQzNCLGtEQUFxRDtBQU9yRCwrREFBK0Q7QUFDL0QsMkJBQTJCO0FBQzNCLHFCQUFxQixDQUFTLEVBQUUsQ0FBUztJQUN2Qyw4QkFBOEI7SUFDOUIsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUNqQixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDakI7SUFDRCxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUNqQjtJQUVELGdEQUFnRDtJQUNoRCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEQseUZBQXlGO0lBQ3pGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FDYixXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQ2xDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFDbEMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FDbkQsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxvQkFBaUMsVUFBc0IsRUFDdEIsSUFBYyxFQUNkLE1BQXNCLEVBQ3RCLE9BQXVCOztRQUV0RCxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM5QixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQjtRQUNELE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFFLE1BQU0sQ0FBRSxFQUFFLENBQUMsQ0FBQztRQUN0RixJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV4QywwQkFBMEI7UUFDMUIsVUFBVSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLGNBQWMsR0FBRyx1QkFBYSxFQUFFO1lBQ3BDLENBQUMsQ0FBQyxzQkFBWSxDQUFDLFNBQVM7WUFDeEIsQ0FBQyxDQUFDLHNCQUFZLENBQUMsY0FBYyxDQUFDO1FBRWhDLElBQUksR0FBOEIsQ0FBQztRQUNuQyxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFaEUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hELFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDeEIsR0FBRyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDNUM7YUFBTSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BELFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDckIsR0FBRyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDNUM7UUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFJLENBQUMsV0FBVyxDQUFBOzs7O09BSTVCLENBQUMsQ0FBQztnQkFFSCxPQUFPLENBQUMsQ0FBQzthQUNWO2lCQUFNO2dCQUNMLHFDQUFxQztnQkFDckMsTUFBTSxnQkFBZ0IsR0FBRyxFQUFnQyxDQUFDO2dCQUMxRCxNQUFNLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ2hFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFO3dCQUM1QixnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUNuRDtvQkFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsRUFBRTt3QkFDNUIsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztxQkFDbkQ7b0JBRUQsT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFJLENBQUMsV0FBVyxDQUFBO2tDQUNELFdBQVc7Ozt3QkFHckIsV0FBVyxDQUFDLENBQUMsQ0FBQztPQUMvQixDQUFDLENBQUM7Z0JBRUgsT0FBTyxDQUFDLENBQUM7YUFDVjtTQUNGO1FBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXpDLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFGLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxPQUFPLEdBQUcsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RGLElBQUksV0FBVyxLQUFLLE1BQU0sRUFBRTtZQUMxQixPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztTQUNqQztRQUVELElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtZQUNoQixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTNCLE9BQU87U0FDUjthQUFNO1lBQ0wsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLHNCQUFZLENBQUMsVUFBVSxFQUFFO2dCQUNwRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssY0FBYyxFQUFFO29CQUNoQyxJQUFJLFlBQVksQ0FBQztvQkFDakIsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLHNCQUFZLENBQUMsU0FBUyxFQUFFO3dCQUN4QyxZQUFZLEdBQUcsdURBQXVELENBQUM7cUJBQ3hFO3lCQUFNO3dCQUNMLFlBQVksR0FBRyxzREFBc0QsQ0FBQztxQkFDdkU7b0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFFM0IsT0FBTyxDQUFDLENBQUM7aUJBQ1Y7Z0JBRUQsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLHNCQUFZLENBQUMsU0FBUyxFQUFFO29CQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7d0JBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQzt3QkFFekQsT0FBTyxDQUFDLENBQUM7cUJBQ1Y7b0JBRUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQ2xGLG1GQUFtRjt3QkFDbkYsOERBQThEO3dCQUM5RCxtREFBbUQ7d0JBQ25ELE1BQU0sT0FBTyxHQUFHLFdBQUksQ0FBQyxXQUFXLENBQUE7Ozs7O1dBSy9CLENBQUM7d0JBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFFckIsT0FBTyxDQUFDLENBQUM7cUJBQ1Y7aUJBQ0Y7YUFDRjtZQUVELE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFFcEIsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osTUFBTSxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2dCQUVsRCxPQUFPLENBQUMsQ0FBQzthQUNWO1lBRUQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztDQUFBO0FBaElELGdDQWdJQztBQUVELHNCQUNFLElBQWMsRUFDZCxPQUFpQixFQUNqQixnQkFBMEIsRUFDMUIsV0FBNkI7SUFFN0IsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBRTNCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7U0FDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDOUMsTUFBTSxDQUFDLENBQUMsT0FBWSxFQUFFLEdBQVcsRUFBRSxFQUFFO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNwQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRS9CLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVULE1BQU0sUUFBUSxHQUFHLE9BQU87U0FDckIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztTQUN6QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFcEIsTUFBTSxRQUFRLEdBQUcsT0FBTztTQUNyQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxLQUFLLFNBQVMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN2RSxNQUFNLENBQUMsQ0FBQyxRQUFhLEVBQUUsR0FBVyxFQUFFLEVBQUU7UUFDckMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBRWpDLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVULE1BQU0sT0FBTyxHQUFHLE9BQU87U0FDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7U0FDOUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXBCLE1BQU0sT0FBTyxHQUFHLE9BQU87U0FDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUM7U0FDOUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBR3BCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXRCLE1BQU0sWUFBWSxHQUFHO1FBQ25CLEtBQUssRUFBRSxPQUFPO1FBQ2QsT0FBTyxFQUFFLFFBQVE7UUFDakIsT0FBTyxFQUFFLFFBQVE7UUFDakIsTUFBTSxFQUFFLE9BQU87UUFDZixNQUFNLEVBQUUsT0FBTztLQUNoQixDQUFDO0lBRUYsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUVqRCxrQkFBa0I7SUFDbEIsT0FBTztTQUNKLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQzlDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDbkIsTUFBTSxDQUFDLENBQUMsVUFBZSxFQUFFLE9BQWlCLEVBQUUsRUFBRTtRQUM3QyxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNMLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO1FBQ3pCLE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0lBRUwsNEJBQTRCO0lBQzVCLFFBQVE7U0FDTCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO1NBQzNDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6Qyw4QkFBOEI7SUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTdDLDBCQUEwQjtJQUMxQixhQUFhLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNDLFFBQVEsV0FBVyxFQUFFO1FBQ25CLEtBQUssMEJBQWdCLENBQUMsWUFBWTtZQUNoQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxLQUFhLEVBQUUsRUFBRTtnQkFDdkQsTUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksR0FBRyxFQUFFO29CQUNQLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQzVCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTTtLQUNUO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQTFGRCxvQ0EwRkM7QUFFRCxrQkFBa0I7QUFDbEIscUJBQXFCLEdBQWUsRUFBRSxJQUFZO0lBQ2hELElBQUksR0FBRyxHQUF1QixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFeEMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNSLDJCQUEyQjtRQUMzQixHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JCLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTztpQkFDaEMsTUFBTSxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUM7WUFFN0MsT0FBTyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNYLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1Q7SUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1IsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELDZCQUE2QixHQUFlO0lBQzFDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2IsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3JCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFFRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUMsRUFBRSxFQUFjLENBQUMsQ0FDckIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWdsb2JhbC10c2xpbnQtZGlzYWJsZSBuby1hbnlcbmltcG9ydCB7IGxvZ2dpbmcsIHN0cmluZ3MgYXMgY29yZVN0cmluZ3MsIHRhZ3MgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgKiBhcyB5YXJnc1BhcnNlciBmcm9tICd5YXJncy1wYXJzZXInO1xuaW1wb3J0IHtcbiAgQXJndW1lbnRTdHJhdGVneSxcbiAgQ29tbWFuZENvbnN0cnVjdG9yLFxuICBDb21tYW5kQ29udGV4dCxcbiAgQ29tbWFuZFNjb3BlLFxuICBPcHRpb24sXG59IGZyb20gJy4uL21vZGVscy9jb21tYW5kJztcbmltcG9ydCB7IGluc2lkZVByb2plY3QgfSBmcm9tICcuLi91dGlsaXRpZXMvcHJvamVjdCc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kTWFwIHtcbiAgW2tleTogc3RyaW5nXTogQ29tbWFuZENvbnN0cnVjdG9yO1xufVxuXG4vLyBCYXNlZCBvZmYgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV2ZW5zaHRlaW5fZGlzdGFuY2Vcbi8vIE5vIG9wdGltaXphdGlvbiwgcmVhbGx5LlxuZnVuY3Rpb24gbGV2ZW5zaHRlaW4oYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICAvKiBiYXNlIGNhc2U6IGVtcHR5IHN0cmluZ3MgKi9cbiAgaWYgKGEubGVuZ3RoID09IDApIHtcbiAgICByZXR1cm4gYi5sZW5ndGg7XG4gIH1cbiAgaWYgKGIubGVuZ3RoID09IDApIHtcbiAgICByZXR1cm4gYS5sZW5ndGg7XG4gIH1cblxuICAvLyBUZXN0IGlmIGxhc3QgY2hhcmFjdGVycyBvZiB0aGUgc3RyaW5ncyBtYXRjaC5cbiAgY29uc3QgY29zdCA9IGFbYS5sZW5ndGggLSAxXSA9PSBiW2IubGVuZ3RoIC0gMV0gPyAwIDogMTtcblxuICAvKiByZXR1cm4gbWluaW11bSBvZiBkZWxldGUgY2hhciBmcm9tIHMsIGRlbGV0ZSBjaGFyIGZyb20gdCwgYW5kIGRlbGV0ZSBjaGFyIGZyb20gYm90aCAqL1xuICByZXR1cm4gTWF0aC5taW4oXG4gICAgbGV2ZW5zaHRlaW4oYS5zbGljZSgwLCAtMSksIGIpICsgMSxcbiAgICBsZXZlbnNodGVpbihhLCBiLnNsaWNlKDAsIC0xKSkgKyAxLFxuICAgIGxldmVuc2h0ZWluKGEuc2xpY2UoMCwgLTEpLCBiLnNsaWNlKDAsIC0xKSkgKyBjb3N0LFxuICApO1xufVxuXG4vKipcbiAqIFJ1biBhIGNvbW1hbmQuXG4gKiBAcGFyYW0gY29tbWFuZE1hcCBNYXAgb2YgYXZhaWxhYmxlIGNvbW1hbmRzLlxuICogQHBhcmFtIGFyZ3MgUmF3IHVucGFyc2VkIGFyZ3VtZW50cy5cbiAqIEBwYXJhbSBsb2dnZXIgVGhlIGxvZ2dlciB0byB1c2UuXG4gKiBAcGFyYW0gY29udGV4dCBFeGVjdXRpb24gY29udGV4dC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bkNvbW1hbmQoY29tbWFuZE1hcDogQ29tbWFuZE1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nZ2VyOiBsb2dnaW5nLkxvZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IENvbW1hbmRDb250ZXh0KTogUHJvbWlzZTxudW1iZXIgfCB2b2lkPiB7XG5cbiAgLy8gaWYgbm90IGFyZ3Mgc3VwcGxpZWQsIGp1c3QgcnVuIHRoZSBoZWxwIGNvbW1hbmQuXG4gIGlmICghYXJncyB8fCBhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgIGFyZ3MgPSBbJ2hlbHAnXTtcbiAgfVxuICBjb25zdCByYXdPcHRpb25zID0geWFyZ3NQYXJzZXIoYXJncywgeyBhbGlhczogeyBoZWxwOiBbJ2gnXSB9LCBib29sZWFuOiBbICdoZWxwJyBdIH0pO1xuICBsZXQgY29tbWFuZE5hbWUgPSByYXdPcHRpb25zLl9bMF0gfHwgJyc7XG5cbiAgLy8gcmVtb3ZlIHRoZSBjb21tYW5kIG5hbWVcbiAgcmF3T3B0aW9ucy5fID0gcmF3T3B0aW9ucy5fLnNsaWNlKDEpO1xuICBjb25zdCBleGVjdXRpb25TY29wZSA9IGluc2lkZVByb2plY3QoKVxuICAgID8gQ29tbWFuZFNjb3BlLmluUHJvamVjdFxuICAgIDogQ29tbWFuZFNjb3BlLm91dHNpZGVQcm9qZWN0O1xuXG4gIGxldCBDbWQ6IENvbW1hbmRDb25zdHJ1Y3RvciB8IG51bGw7XG4gIENtZCA9IGNvbW1hbmROYW1lID8gZmluZENvbW1hbmQoY29tbWFuZE1hcCwgY29tbWFuZE5hbWUpIDogbnVsbDtcblxuICBpZiAoIUNtZCAmJiAocmF3T3B0aW9ucy52IHx8IHJhd09wdGlvbnMudmVyc2lvbikpIHtcbiAgICBjb21tYW5kTmFtZSA9ICd2ZXJzaW9uJztcbiAgICBDbWQgPSBmaW5kQ29tbWFuZChjb21tYW5kTWFwLCBjb21tYW5kTmFtZSk7XG4gIH0gZWxzZSBpZiAoIUNtZCAmJiAoIWNvbW1hbmROYW1lIHx8IHJhd09wdGlvbnMuaGVscCkpIHtcbiAgICBjb21tYW5kTmFtZSA9ICdoZWxwJztcbiAgICBDbWQgPSBmaW5kQ29tbWFuZChjb21tYW5kTWFwLCBjb21tYW5kTmFtZSk7XG4gIH1cblxuICBpZiAoIUNtZCkge1xuICAgIGlmICghY29tbWFuZE5hbWUpIHtcbiAgICAgIGxvZ2dlci5lcnJvcih0YWdzLnN0cmlwSW5kZW50YFxuICAgICAgICBXZSBjb3VsZCBub3QgZmluZCBhIGNvbW1hbmQgZnJvbSB0aGUgYXJndW1lbnRzIGFuZCB0aGUgaGVscCBjb21tYW5kIHNlZW1zIHRvIGJlIGRpc2FibGVkLlxuICAgICAgICBUaGlzIGlzIGFuIGlzc3VlIHdpdGggdGhlIENMSSBpdHNlbGYuIElmIHlvdSBzZWUgdGhpcyBjb21tZW50LCBwbGVhc2UgcmVwb3J0IGl0IGFuZFxuICAgICAgICBwcm92aWRlIHlvdXIgcmVwb3NpdG9yeS5cbiAgICAgIGApO1xuXG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0IG5hbWUgdG8gc3RyaW5nIChubyB1bmRlZmluZWQpLlxuICAgICAgY29uc3QgY29tbWFuZHNEaXN0YW5jZSA9IHt9IGFzIHsgW25hbWU6IHN0cmluZ106IG51bWJlciB9O1xuICAgICAgY29uc3QgYWxsQ29tbWFuZHMgPSBsaXN0QWxsQ29tbWFuZE5hbWVzKGNvbW1hbmRNYXApLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKCEoYSBpbiBjb21tYW5kc0Rpc3RhbmNlKSkge1xuICAgICAgICAgIGNvbW1hbmRzRGlzdGFuY2VbYV0gPSBsZXZlbnNodGVpbihhLCBjb21tYW5kTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoYiBpbiBjb21tYW5kc0Rpc3RhbmNlKSkge1xuICAgICAgICAgIGNvbW1hbmRzRGlzdGFuY2VbYl0gPSBsZXZlbnNodGVpbihiLCBjb21tYW5kTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tbWFuZHNEaXN0YW5jZVthXSAtIGNvbW1hbmRzRGlzdGFuY2VbYl07XG4gICAgICB9KTtcblxuICAgICAgbG9nZ2VyLmVycm9yKHRhZ3Muc3RyaXBJbmRlbnRgXG4gICAgICAgIFRoZSBzcGVjaWZpZWQgY29tbWFuZCAoXCIke2NvbW1hbmROYW1lfVwiKSBpcyBpbnZhbGlkLiBGb3IgYSBsaXN0IG9mIGF2YWlsYWJsZSBvcHRpb25zLFxuICAgICAgICBydW4gXCJuZyBoZWxwXCIuXG5cbiAgICAgICAgRGlkIHlvdSBtZWFuIFwiJHthbGxDb21tYW5kc1swXX1cIj9cbiAgICAgIGApO1xuXG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb21tYW5kID0gbmV3IENtZChjb250ZXh0LCBsb2dnZXIpO1xuXG4gIGFyZ3MgPSBhd2FpdCBjb21tYW5kLmluaXRpYWxpemVSYXcoYXJncyk7XG4gIGxldCBvcHRpb25zID0gcGFyc2VPcHRpb25zKGFyZ3MsIGNvbW1hbmQub3B0aW9ucywgY29tbWFuZC5hcmd1bWVudHMsIGNvbW1hbmQuYXJnU3RyYXRlZ3kpO1xuICBhd2FpdCBjb21tYW5kLmluaXRpYWxpemUob3B0aW9ucyk7XG4gIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMoYXJncywgY29tbWFuZC5vcHRpb25zLCBjb21tYW5kLmFyZ3VtZW50cywgY29tbWFuZC5hcmdTdHJhdGVneSk7XG4gIGlmIChjb21tYW5kTmFtZSA9PT0gJ2hlbHAnKSB7XG4gICAgb3B0aW9ucy5jb21tYW5kTWFwID0gY29tbWFuZE1hcDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhlbHApIHtcbiAgICBjb21tYW5kLnByaW50SGVscChvcHRpb25zKTtcblxuICAgIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICBpZiAoQ21kLnNjb3BlICE9PSB1bmRlZmluZWQgJiYgQ21kLnNjb3BlICE9PSBDb21tYW5kU2NvcGUuZXZlcnl3aGVyZSkge1xuICAgICAgaWYgKENtZC5zY29wZSAhPT0gZXhlY3V0aW9uU2NvcGUpIHtcbiAgICAgICAgbGV0IGVycm9yTWVzc2FnZTtcbiAgICAgICAgaWYgKENtZC5zY29wZSA9PT0gQ29tbWFuZFNjb3BlLmluUHJvamVjdCkge1xuICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGBUaGlzIGNvbW1hbmQgY2FuIG9ubHkgYmUgcnVuIGluc2lkZSBvZiBhIENMSSBwcm9qZWN0LmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXJyb3JNZXNzYWdlID0gYFRoaXMgY29tbWFuZCBjYW4gbm90IGJlIHJ1biBpbnNpZGUgb2YgYSBDTEkgcHJvamVjdC5gO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlci5mYXRhbChlcnJvck1lc3NhZ2UpO1xuXG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuXG4gICAgICBpZiAoQ21kLnNjb3BlID09PSBDb21tYW5kU2NvcGUuaW5Qcm9qZWN0KSB7XG4gICAgICAgIGlmICghY29udGV4dC5wcm9qZWN0LmNvbmZpZ0ZpbGUpIHtcbiAgICAgICAgICBsb2dnZXIuZmF0YWwoJ0ludmFsaWQgcHJvamVjdDogbWlzc2luZyB3b3Jrc3BhY2UgZmlsZS4nKTtcblxuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFsnLmFuZ3VsYXItY2xpLmpzb24nLCAnYW5ndWxhci1jbGkuanNvbiddLmluY2x1ZGVzKGNvbnRleHQucHJvamVjdC5jb25maWdGaWxlKSkge1xuICAgICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgICAgLy8gSWYgY2hhbmdpbmcgdGhpcyBtZXNzYWdlLCBwbGVhc2UgdXBkYXRlIHRoZSBzYW1lIG1lc3NhZ2UgaW5cbiAgICAgICAgICAvLyBgcGFja2FnZXMvQGFuZ3VsYXIvY2xpL2Jpbi9uZy11cGRhdGUtbWVzc2FnZS5qc2BcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdGFncy5zdHJpcEluZGVudGBcbiAgICAgICAgICAgIFRoZSBBbmd1bGFyIENMSSBjb25maWd1cmF0aW9uIGZvcm1hdCBoYXMgYmVlbiBjaGFuZ2VkLCBhbmQgeW91ciBleGlzdGluZyBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICBjYW4gYmUgdXBkYXRlZCBhdXRvbWF0aWNhbGx5IGJ5IHJ1bm5pbmcgdGhlIGZvbGxvd2luZyBjb21tYW5kOlxuXG4gICAgICAgICAgICAgIG5nIHVwZGF0ZSBAYW5ndWxhci9jbGlcbiAgICAgICAgICBgO1xuXG4gICAgICAgICAgbG9nZ2VyLndhcm4obWVzc2FnZSk7XG5cbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZSBvcHRpb25zLmg7XG4gICAgZGVsZXRlIG9wdGlvbnMuaGVscDtcblxuICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBjb21tYW5kLnZhbGlkYXRlKG9wdGlvbnMpO1xuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgbG9nZ2VyLmZhdGFsKGBWYWxpZGF0aW9uIGVycm9yLiBJbnZhbGlkIGNvbW1hbmRgKTtcblxuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbW1hbmQucnVuKG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU9wdGlvbnM8VCA9IGFueT4oXG4gIGFyZ3M6IHN0cmluZ1tdLFxuICBjbWRPcHRzOiBPcHRpb25bXSxcbiAgY29tbWFuZEFyZ3VtZW50czogc3RyaW5nW10sXG4gIGFyZ1N0cmF0ZWd5OiBBcmd1bWVudFN0cmF0ZWd5LFxuKTogVCB7XG4gIGNvbnN0IHBhcnNlciA9IHlhcmdzUGFyc2VyO1xuXG4gIGNvbnN0IGFsaWFzZXMgPSBjbWRPcHRzLmNvbmNhdCgpXG4gICAgLmZpbHRlcihvID0+IG8uYWxpYXNlcyAmJiBvLmFsaWFzZXMubGVuZ3RoID4gMClcbiAgICAucmVkdWNlKChhbGlhc2VzOiBhbnksIG9wdDogT3B0aW9uKSA9PiB7XG4gICAgICBhbGlhc2VzW29wdC5uYW1lXSA9IChvcHQuYWxpYXNlcyB8fCBbXSlcbiAgICAgICAgLmZpbHRlcihhID0+IGEubGVuZ3RoID09PSAxKTtcblxuICAgICAgcmV0dXJuIGFsaWFzZXM7XG4gICAgfSwge30pO1xuXG4gIGNvbnN0IGJvb2xlYW5zID0gY21kT3B0c1xuICAgIC5maWx0ZXIobyA9PiBvLnR5cGUgJiYgby50eXBlID09PSBCb29sZWFuKVxuICAgIC5tYXAobyA9PiBvLm5hbWUpO1xuXG4gIGNvbnN0IGRlZmF1bHRzID0gY21kT3B0c1xuICAgIC5maWx0ZXIobyA9PiBvLmRlZmF1bHQgIT09IHVuZGVmaW5lZCB8fCBib29sZWFucy5pbmRleE9mKG8ubmFtZSkgIT09IC0xKVxuICAgIC5yZWR1Y2UoKGRlZmF1bHRzOiBhbnksIG9wdDogT3B0aW9uKSA9PiB7XG4gICAgICBkZWZhdWx0c1tvcHQubmFtZV0gPSBvcHQuZGVmYXVsdDtcblxuICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH0sIHt9KTtcblxuICBjb25zdCBzdHJpbmdzID0gY21kT3B0c1xuICAgIC5maWx0ZXIobyA9PiBvLnR5cGUgPT09IFN0cmluZylcbiAgICAubWFwKG8gPT4gby5uYW1lKTtcblxuICBjb25zdCBudW1iZXJzID0gY21kT3B0c1xuICAgIC5maWx0ZXIobyA9PiBvLnR5cGUgPT09IE51bWJlcilcbiAgICAubWFwKG8gPT4gby5uYW1lKTtcblxuXG4gIGFsaWFzZXMuaGVscCA9IFsnaCddO1xuICBib29sZWFucy5wdXNoKCdoZWxwJyk7XG5cbiAgY29uc3QgeWFyZ3NPcHRpb25zID0ge1xuICAgIGFsaWFzOiBhbGlhc2VzLFxuICAgIGJvb2xlYW46IGJvb2xlYW5zLFxuICAgIGRlZmF1bHQ6IGRlZmF1bHRzLFxuICAgIHN0cmluZzogc3RyaW5ncyxcbiAgICBudW1iZXI6IG51bWJlcnMsXG4gIH07XG5cbiAgY29uc3QgcGFyc2VkT3B0aW9ucyA9IHBhcnNlcihhcmdzLCB5YXJnc09wdGlvbnMpO1xuXG4gIC8vIFJlbW92ZSBhbGlhc2VzLlxuICBjbWRPcHRzXG4gICAgLmZpbHRlcihvID0+IG8uYWxpYXNlcyAmJiBvLmFsaWFzZXMubGVuZ3RoID4gMClcbiAgICAubWFwKG8gPT4gby5hbGlhc2VzKVxuICAgIC5yZWR1Y2UoKGFsbEFsaWFzZXM6IGFueSwgYWxpYXNlczogc3RyaW5nW10pID0+IHtcbiAgICAgIHJldHVybiBhbGxBbGlhc2VzLmNvbmNhdChbLi4uYWxpYXNlc10pO1xuICAgIH0sIFtdKVxuICAgIC5mb3JFYWNoKChhbGlhczogc3RyaW5nKSA9PiB7XG4gICAgICBkZWxldGUgcGFyc2VkT3B0aW9uc1thbGlhc107XG4gICAgfSk7XG5cbiAgLy8gUmVtb3ZlIHVuZGVmaW5lZCBib29sZWFuc1xuICBib29sZWFuc1xuICAgIC5maWx0ZXIoYiA9PiBwYXJzZWRPcHRpb25zW2JdID09PSB1bmRlZmluZWQpXG4gICAgLm1hcChiID0+IGNvcmVTdHJpbmdzLmNhbWVsaXplKGIpKVxuICAgIC5mb3JFYWNoKGIgPT4gZGVsZXRlIHBhcnNlZE9wdGlvbnNbYl0pO1xuXG4gIC8vIHJlbW92ZSBvcHRpb25zIHdpdGggZGFzaGVzLlxuICBPYmplY3Qua2V5cyhwYXJzZWRPcHRpb25zKVxuICAgIC5maWx0ZXIoa2V5ID0+IGtleS5pbmRleE9mKCctJykgIT09IC0xKVxuICAgIC5mb3JFYWNoKGtleSA9PiBkZWxldGUgcGFyc2VkT3B0aW9uc1trZXldKTtcblxuICAvLyByZW1vdmUgdGhlIGNvbW1hbmQgbmFtZVxuICBwYXJzZWRPcHRpb25zLl8gPSBwYXJzZWRPcHRpb25zLl8uc2xpY2UoMSk7XG5cbiAgc3dpdGNoIChhcmdTdHJhdGVneSkge1xuICAgIGNhc2UgQXJndW1lbnRTdHJhdGVneS5NYXBUb09wdGlvbnM6XG4gICAgICBwYXJzZWRPcHRpb25zLl8uZm9yRWFjaCgodmFsdWU6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBhcmcgPSBjb21tYW5kQXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKGFyZykge1xuICAgICAgICAgIHBhcnNlZE9wdGlvbnNbYXJnXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIHBhcnNlZE9wdGlvbnMuXztcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZE9wdGlvbnM7XG59XG5cbi8vIEZpbmQgYSBjb21tYW5kLlxuZnVuY3Rpb24gZmluZENvbW1hbmQobWFwOiBDb21tYW5kTWFwLCBuYW1lOiBzdHJpbmcpOiBDb21tYW5kQ29uc3RydWN0b3IgfCBudWxsIHtcbiAgbGV0IENtZDogQ29tbWFuZENvbnN0cnVjdG9yID0gbWFwW25hbWVdO1xuXG4gIGlmICghQ21kKSB7XG4gICAgLy8gZmluZCBjb21tYW5kIHZpYSBhbGlhc2VzXG4gICAgQ21kID0gT2JqZWN0LmtleXMobWFwKVxuICAgICAgLmZpbHRlcihrZXkgPT4ge1xuICAgICAgICBpZiAoIW1hcFtrZXldLmFsaWFzZXMpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm91bmRBbGlhcyA9IG1hcFtrZXldLmFsaWFzZXNcbiAgICAgICAgICAuZmlsdGVyKChhbGlhczogc3RyaW5nKSA9PiBhbGlhcyA9PT0gbmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kQWxpYXMubGVuZ3RoID4gMDtcbiAgICAgIH0pXG4gICAgICAubWFwKChrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIG1hcFtrZXldO1xuICAgICAgfSlbMF07XG4gIH1cblxuICBpZiAoIUNtZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIENtZDtcbn1cblxuZnVuY3Rpb24gbGlzdEFsbENvbW1hbmROYW1lcyhtYXA6IENvbW1hbmRNYXApOiBzdHJpbmdbXSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhtYXApLmNvbmNhdChcbiAgICBPYmplY3Qua2V5cyhtYXApXG4gICAgICAucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgICBpZiAoIW1hcFtrZXldLmFsaWFzZXMpIHtcbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQobWFwW2tleV0uYWxpYXNlcyk7XG4gICAgICB9LCBbXSBhcyBzdHJpbmdbXSksXG4gICk7XG59XG4iXX0=