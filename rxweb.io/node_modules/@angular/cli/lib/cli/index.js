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
const core_1 = require("@angular-devkit/core");
const operators_1 = require("rxjs/operators");
const add_1 = require("../../commands/add");
const build_1 = require("../../commands/build");
const config_1 = require("../../commands/config");
const doc_1 = require("../../commands/doc");
const e2e_1 = require("../../commands/e2e");
const easter_egg_1 = require("../../commands/easter-egg");
const eject_1 = require("../../commands/eject");
const generate_1 = require("../../commands/generate");
const getset_1 = require("../../commands/getset");
const help_1 = require("../../commands/help");
const lint_1 = require("../../commands/lint");
const new_1 = require("../../commands/new");
const run_1 = require("../../commands/run");
const serve_1 = require("../../commands/serve");
const test_1 = require("../../commands/test");
const update_1 = require("../../commands/update");
const version_1 = require("../../commands/version");
const xi18n_1 = require("../../commands/xi18n");
const command_runner_1 = require("../../models/command-runner");
const project_1 = require("../../utilities/project");
function loadCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            // Schematics commands.
            'add': add_1.AddCommand,
            'new': new_1.NewCommand,
            'generate': generate_1.GenerateCommand,
            'update': update_1.UpdateCommand,
            // Architect commands.
            'build': build_1.BuildCommand,
            'serve': serve_1.ServeCommand,
            'test': test_1.TestCommand,
            'e2e': e2e_1.E2eCommand,
            'lint': lint_1.LintCommand,
            'xi18n': xi18n_1.Xi18nCommand,
            'run': run_1.RunCommand,
            // Disabled commands.
            'eject': eject_1.EjectCommand,
            // Easter eggs.
            'make-this-awesome': easter_egg_1.AwesomeCommand,
            // Other.
            'config': config_1.ConfigCommand,
            'help': help_1.HelpCommand,
            'version': version_1.VersionCommand,
            'doc': doc_1.DocCommand,
            // deprecated
            'get': getset_1.GetSetCommand,
            'set': getset_1.GetSetCommand,
        };
    });
}
function default_1(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const commands = yield loadCommands();
        const logger = new core_1.logging.IndentLogger('cling');
        let loggingSubscription;
        if (!options.testing) {
            loggingSubscription = initializeLogging(logger);
        }
        let projectDetails = project_1.getProjectDetails();
        if (projectDetails === null) {
            projectDetails = { root: process.cwd() };
        }
        const context = {
            project: projectDetails,
        };
        try {
            const maybeExitCode = yield command_runner_1.runCommand(commands, options.cliArgs, logger, context);
            if (typeof maybeExitCode === 'number') {
                console.assert(Number.isInteger(maybeExitCode));
                return maybeExitCode;
            }
            return 0;
        }
        catch (err) {
            if (err instanceof Error) {
                logger.fatal(err.message);
                if (err.stack) {
                    logger.fatal(err.stack);
                }
            }
            else if (typeof err === 'string') {
                logger.fatal(err);
            }
            else if (typeof err === 'number') {
                // Log nothing.
            }
            else {
                logger.fatal('An unexpected error occurred: ' + JSON.stringify(err));
            }
            if (options.testing) {
                debugger;
                throw err;
            }
            if (loggingSubscription) {
                loggingSubscription.unsubscribe();
            }
            return 1;
        }
    });
}
exports.default = default_1;
// Initialize logging.
function initializeLogging(logger) {
    return logger
        .pipe(operators_1.filter(entry => (entry.level != 'debug')))
        .subscribe(entry => {
        let color = (x) => core_1.terminal.dim(core_1.terminal.white(x));
        let output = process.stdout;
        switch (entry.level) {
            case 'info':
                color = core_1.terminal.white;
                break;
            case 'warn':
                color = core_1.terminal.yellow;
                break;
            case 'error':
                color = core_1.terminal.red;
                output = process.stderr;
                break;
            case 'fatal':
                color = (x) => core_1.terminal.bold(core_1.terminal.red(x));
                output = process.stderr;
                break;
        }
        output.write(color(entry.message) + '\n');
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXIvY2xpL2xpYi9jbGkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILCtDQUF5RDtBQUN6RCw4Q0FBd0M7QUFDeEMsNENBQWdEO0FBQ2hELGdEQUFvRDtBQUNwRCxrREFBc0Q7QUFDdEQsNENBQWdEO0FBQ2hELDRDQUFnRDtBQUNoRCwwREFBMkQ7QUFDM0QsZ0RBQW9EO0FBQ3BELHNEQUEwRDtBQUMxRCxrREFBc0Q7QUFDdEQsOENBQWtEO0FBQ2xELDhDQUFrRDtBQUNsRCw0Q0FBZ0Q7QUFDaEQsNENBQWdEO0FBQ2hELGdEQUFvRDtBQUNwRCw4Q0FBa0Q7QUFDbEQsa0RBQXNEO0FBQ3RELG9EQUF3RDtBQUN4RCxnREFBb0Q7QUFDcEQsZ0VBQXFFO0FBQ3JFLHFEQUE0RDtBQUc1RDs7UUFDRSxPQUFPO1lBQ0wsdUJBQXVCO1lBQ3ZCLEtBQUssRUFBRSxnQkFBVTtZQUNqQixLQUFLLEVBQUUsZ0JBQVU7WUFDakIsVUFBVSxFQUFFLDBCQUFlO1lBQzNCLFFBQVEsRUFBRSxzQkFBYTtZQUV2QixzQkFBc0I7WUFDdEIsT0FBTyxFQUFFLG9CQUFZO1lBQ3JCLE9BQU8sRUFBRSxvQkFBWTtZQUNyQixNQUFNLEVBQUUsa0JBQVc7WUFDbkIsS0FBSyxFQUFFLGdCQUFVO1lBQ2pCLE1BQU0sRUFBRSxrQkFBVztZQUNuQixPQUFPLEVBQUUsb0JBQVk7WUFDckIsS0FBSyxFQUFFLGdCQUFVO1lBRWpCLHFCQUFxQjtZQUNyQixPQUFPLEVBQUUsb0JBQVk7WUFFckIsZUFBZTtZQUNmLG1CQUFtQixFQUFFLDJCQUFjO1lBRW5DLFNBQVM7WUFDVCxRQUFRLEVBQUUsc0JBQWE7WUFDdkIsTUFBTSxFQUFFLGtCQUFXO1lBQ25CLFNBQVMsRUFBRSx3QkFBYztZQUN6QixLQUFLLEVBQUUsZ0JBQVU7WUFFakIsYUFBYTtZQUNiLEtBQUssRUFBRSxzQkFBYTtZQUNwQixLQUFLLEVBQUUsc0JBQWE7U0FDckIsQ0FBQztJQUNKLENBQUM7Q0FBQTtBQUVELG1CQUE4QixPQUFpRDs7UUFDN0UsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLEVBQUUsQ0FBQztRQUV0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxtQkFBbUIsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNwQixtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksY0FBYyxHQUFHLDJCQUFpQixFQUFFLENBQUM7UUFDekMsSUFBSSxjQUFjLEtBQUssSUFBSSxFQUFFO1lBQzNCLGNBQWMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztTQUMxQztRQUNELE1BQU0sT0FBTyxHQUFHO1lBQ2QsT0FBTyxFQUFFLGNBQWM7U0FDeEIsQ0FBQztRQUVGLElBQUk7WUFDRixNQUFNLGFBQWEsR0FBRyxNQUFNLDJCQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ25GLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFO2dCQUNyQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFFaEQsT0FBTyxhQUFhLENBQUM7YUFDdEI7WUFFRCxPQUFPLENBQUMsQ0FBQztTQUNWO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLEdBQUcsWUFBWSxLQUFLLEVBQUU7Z0JBQ3hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3pCO2FBQ0Y7aUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkI7aUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQ2xDLGVBQWU7YUFDaEI7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdEU7WUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ25CLFFBQVEsQ0FBQztnQkFDVCxNQUFNLEdBQUcsQ0FBQzthQUNYO1lBRUQsSUFBSSxtQkFBbUIsRUFBRTtnQkFDdkIsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDbkM7WUFFRCxPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQztDQUFBO0FBbkRELDRCQW1EQztBQUVELHNCQUFzQjtBQUN0QiwyQkFBMkIsTUFBc0I7SUFDL0MsT0FBTyxNQUFNO1NBQ1YsSUFBSSxDQUFDLGtCQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztTQUMvQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDakIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLGVBQVEsQ0FBQyxHQUFHLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDNUIsUUFBUSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ25CLEtBQUssTUFBTTtnQkFDVCxLQUFLLEdBQUcsZUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDdkIsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxLQUFLLEdBQUcsZUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDeEIsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixLQUFLLEdBQUcsZUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDckIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxlQUFRLENBQUMsSUFBSSxDQUFDLGVBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLE1BQU07U0FDVDtRQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IGxvZ2dpbmcsIHRlcm1pbmFsIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWRkQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbW1hbmRzL2FkZCc7XG5pbXBvcnQgeyBCdWlsZENvbW1hbmQgfSBmcm9tICcuLi8uLi9jb21tYW5kcy9idWlsZCc7XG5pbXBvcnQgeyBDb25maWdDb21tYW5kIH0gZnJvbSAnLi4vLi4vY29tbWFuZHMvY29uZmlnJztcbmltcG9ydCB7IERvY0NvbW1hbmQgfSBmcm9tICcuLi8uLi9jb21tYW5kcy9kb2MnO1xuaW1wb3J0IHsgRTJlQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbW1hbmRzL2UyZSc7XG5pbXBvcnQgeyBBd2Vzb21lQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbW1hbmRzL2Vhc3Rlci1lZ2cnO1xuaW1wb3J0IHsgRWplY3RDb21tYW5kIH0gZnJvbSAnLi4vLi4vY29tbWFuZHMvZWplY3QnO1xuaW1wb3J0IHsgR2VuZXJhdGVDb21tYW5kIH0gZnJvbSAnLi4vLi4vY29tbWFuZHMvZ2VuZXJhdGUnO1xuaW1wb3J0IHsgR2V0U2V0Q29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbW1hbmRzL2dldHNldCc7XG5pbXBvcnQgeyBIZWxwQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbW1hbmRzL2hlbHAnO1xuaW1wb3J0IHsgTGludENvbW1hbmQgfSBmcm9tICcuLi8uLi9jb21tYW5kcy9saW50JztcbmltcG9ydCB7IE5ld0NvbW1hbmQgfSBmcm9tICcuLi8uLi9jb21tYW5kcy9uZXcnO1xuaW1wb3J0IHsgUnVuQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbW1hbmRzL3J1bic7XG5pbXBvcnQgeyBTZXJ2ZUNvbW1hbmQgfSBmcm9tICcuLi8uLi9jb21tYW5kcy9zZXJ2ZSc7XG5pbXBvcnQgeyBUZXN0Q29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbW1hbmRzL3Rlc3QnO1xuaW1wb3J0IHsgVXBkYXRlQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbW1hbmRzL3VwZGF0ZSc7XG5pbXBvcnQgeyBWZXJzaW9uQ29tbWFuZCB9IGZyb20gJy4uLy4uL2NvbW1hbmRzL3ZlcnNpb24nO1xuaW1wb3J0IHsgWGkxOG5Db21tYW5kIH0gZnJvbSAnLi4vLi4vY29tbWFuZHMveGkxOG4nO1xuaW1wb3J0IHsgQ29tbWFuZE1hcCwgcnVuQ29tbWFuZCB9IGZyb20gJy4uLy4uL21vZGVscy9jb21tYW5kLXJ1bm5lcic7XG5pbXBvcnQgeyBnZXRQcm9qZWN0RGV0YWlscyB9IGZyb20gJy4uLy4uL3V0aWxpdGllcy9wcm9qZWN0JztcblxuXG5hc3luYyBmdW5jdGlvbiBsb2FkQ29tbWFuZHMoKTogUHJvbWlzZTxDb21tYW5kTWFwPiB7XG4gIHJldHVybiB7XG4gICAgLy8gU2NoZW1hdGljcyBjb21tYW5kcy5cbiAgICAnYWRkJzogQWRkQ29tbWFuZCxcbiAgICAnbmV3JzogTmV3Q29tbWFuZCxcbiAgICAnZ2VuZXJhdGUnOiBHZW5lcmF0ZUNvbW1hbmQsXG4gICAgJ3VwZGF0ZSc6IFVwZGF0ZUNvbW1hbmQsXG5cbiAgICAvLyBBcmNoaXRlY3QgY29tbWFuZHMuXG4gICAgJ2J1aWxkJzogQnVpbGRDb21tYW5kLFxuICAgICdzZXJ2ZSc6IFNlcnZlQ29tbWFuZCxcbiAgICAndGVzdCc6IFRlc3RDb21tYW5kLFxuICAgICdlMmUnOiBFMmVDb21tYW5kLFxuICAgICdsaW50JzogTGludENvbW1hbmQsXG4gICAgJ3hpMThuJzogWGkxOG5Db21tYW5kLFxuICAgICdydW4nOiBSdW5Db21tYW5kLFxuXG4gICAgLy8gRGlzYWJsZWQgY29tbWFuZHMuXG4gICAgJ2VqZWN0JzogRWplY3RDb21tYW5kLFxuXG4gICAgLy8gRWFzdGVyIGVnZ3MuXG4gICAgJ21ha2UtdGhpcy1hd2Vzb21lJzogQXdlc29tZUNvbW1hbmQsXG5cbiAgICAvLyBPdGhlci5cbiAgICAnY29uZmlnJzogQ29uZmlnQ29tbWFuZCxcbiAgICAnaGVscCc6IEhlbHBDb21tYW5kLFxuICAgICd2ZXJzaW9uJzogVmVyc2lvbkNvbW1hbmQsXG4gICAgJ2RvYyc6IERvY0NvbW1hbmQsXG5cbiAgICAvLyBkZXByZWNhdGVkXG4gICAgJ2dldCc6IEdldFNldENvbW1hbmQsXG4gICAgJ3NldCc6IEdldFNldENvbW1hbmQsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG9wdGlvbnM6IHsgdGVzdGluZz86IGJvb2xlYW4sIGNsaUFyZ3M6IHN0cmluZ1tdIH0pIHtcbiAgY29uc3QgY29tbWFuZHMgPSBhd2FpdCBsb2FkQ29tbWFuZHMoKTtcblxuICBjb25zdCBsb2dnZXIgPSBuZXcgbG9nZ2luZy5JbmRlbnRMb2dnZXIoJ2NsaW5nJyk7XG4gIGxldCBsb2dnaW5nU3Vic2NyaXB0aW9uO1xuICBpZiAoIW9wdGlvbnMudGVzdGluZykge1xuICAgIGxvZ2dpbmdTdWJzY3JpcHRpb24gPSBpbml0aWFsaXplTG9nZ2luZyhsb2dnZXIpO1xuICB9XG5cbiAgbGV0IHByb2plY3REZXRhaWxzID0gZ2V0UHJvamVjdERldGFpbHMoKTtcbiAgaWYgKHByb2plY3REZXRhaWxzID09PSBudWxsKSB7XG4gICAgcHJvamVjdERldGFpbHMgPSB7IHJvb3Q6IHByb2Nlc3MuY3dkKCkgfTtcbiAgfVxuICBjb25zdCBjb250ZXh0ID0ge1xuICAgIHByb2plY3Q6IHByb2plY3REZXRhaWxzLFxuICB9O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgbWF5YmVFeGl0Q29kZSA9IGF3YWl0IHJ1bkNvbW1hbmQoY29tbWFuZHMsIG9wdGlvbnMuY2xpQXJncywgbG9nZ2VyLCBjb250ZXh0KTtcbiAgICBpZiAodHlwZW9mIG1heWJlRXhpdENvZGUgPT09ICdudW1iZXInKSB7XG4gICAgICBjb25zb2xlLmFzc2VydChOdW1iZXIuaXNJbnRlZ2VyKG1heWJlRXhpdENvZGUpKTtcblxuICAgICAgcmV0dXJuIG1heWJlRXhpdENvZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgbG9nZ2VyLmZhdGFsKGVyci5tZXNzYWdlKTtcbiAgICAgIGlmIChlcnIuc3RhY2spIHtcbiAgICAgICAgbG9nZ2VyLmZhdGFsKGVyci5zdGFjayk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJykge1xuICAgICAgbG9nZ2VyLmZhdGFsKGVycik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyID09PSAnbnVtYmVyJykge1xuICAgICAgLy8gTG9nIG5vdGhpbmcuXG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5mYXRhbCgnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZDogJyArIEpTT04uc3RyaW5naWZ5KGVycikpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnRlc3RpbmcpIHtcbiAgICAgIGRlYnVnZ2VyO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIGlmIChsb2dnaW5nU3Vic2NyaXB0aW9uKSB7XG4gICAgICBsb2dnaW5nU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDE7XG4gIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSBsb2dnaW5nLlxuZnVuY3Rpb24gaW5pdGlhbGl6ZUxvZ2dpbmcobG9nZ2VyOiBsb2dnaW5nLkxvZ2dlcikge1xuICByZXR1cm4gbG9nZ2VyXG4gICAgLnBpcGUoZmlsdGVyKGVudHJ5ID0+IChlbnRyeS5sZXZlbCAhPSAnZGVidWcnKSkpXG4gICAgLnN1YnNjcmliZShlbnRyeSA9PiB7XG4gICAgICBsZXQgY29sb3IgPSAoeDogc3RyaW5nKSA9PiB0ZXJtaW5hbC5kaW0odGVybWluYWwud2hpdGUoeCkpO1xuICAgICAgbGV0IG91dHB1dCA9IHByb2Nlc3Muc3Rkb3V0O1xuICAgICAgc3dpdGNoIChlbnRyeS5sZXZlbCkge1xuICAgICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgICBjb2xvciA9IHRlcm1pbmFsLndoaXRlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd3YXJuJzpcbiAgICAgICAgICBjb2xvciA9IHRlcm1pbmFsLnllbGxvdztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgIGNvbG9yID0gdGVybWluYWwucmVkO1xuICAgICAgICAgIG91dHB1dCA9IHByb2Nlc3Muc3RkZXJyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmYXRhbCc6XG4gICAgICAgICAgY29sb3IgPSAoeCkgPT4gdGVybWluYWwuYm9sZCh0ZXJtaW5hbC5yZWQoeCkpO1xuICAgICAgICAgIG91dHB1dCA9IHByb2Nlc3Muc3RkZXJyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBvdXRwdXQud3JpdGUoY29sb3IoZW50cnkubWVzc2FnZSkgKyAnXFxuJyk7XG4gICAgfSk7XG59XG4iXX0=