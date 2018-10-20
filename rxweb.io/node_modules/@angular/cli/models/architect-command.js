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
const architect_1 = require("@angular-devkit/architect");
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const rxjs_1 = require("rxjs");
const rxjs_2 = require("rxjs");
const operators_1 = require("rxjs/operators");
const command_1 = require("./command");
const workspace_loader_1 = require("./workspace-loader");
class ArchitectCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this._host = new node_1.NodeJsSyncHost();
        this._logger = node_1.createConsoleLogger();
        // If this command supports running multiple targets.
        this.multiTarget = false;
        this.Options = [{
                name: 'configuration',
                description: 'The configuration',
                type: String,
                aliases: ['c'],
            }];
        this.arguments = ['project'];
        this.prodOption = {
            name: 'prod',
            description: 'Flag to set configuration to "prod".',
            type: Boolean,
        };
        this.configurationOption = {
            name: 'configuration',
            description: 'Specify the configuration to use.',
            type: String,
            aliases: ['c'],
        };
    }
    initialize(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._loadWorkspaceAndArchitect().pipe(operators_1.concatMap(() => {
                const targetSpec = this._makeTargetSpecifier(options);
                if (this.target && !targetSpec.project) {
                    const projects = this.getProjectNamesByTarget(this.target);
                    if (projects.length === 1) {
                        // If there is a single target, use it to parse overrides.
                        targetSpec.project = projects[0];
                    }
                    else {
                        // Multiple targets can have different, incompatible options.
                        // We only lookup options for single targets.
                        return rxjs_1.of(null);
                    }
                }
                if (!targetSpec.project || !targetSpec.target) {
                    throw new Error('Cannot determine project or target for Architect command.');
                }
                const builderConfig = this._architect.getBuilderConfiguration(targetSpec);
                return this._architect.getBuilderDescription(builderConfig).pipe(operators_1.tap(builderDesc => { this.mapArchitectOptions(builderDesc.schema); }));
            })).toPromise()
                .then(() => { });
        });
    }
    validate(options) {
        if (!options.project && this.target) {
            const projectNames = this.getProjectNamesByTarget(this.target);
            const { overrides } = this._makeTargetSpecifier(options);
            if (projectNames.length > 1 && Object.keys(overrides || {}).length > 0) {
                throw new Error('Architect commands with multiple targets cannot specify overrides.'
                    + `'${this.target}' would be run on the following projects: ${projectNames.join()}`);
            }
        }
        return true;
    }
    mapArchitectOptions(schema) {
        const properties = schema.properties;
        const keys = Object.keys(properties);
        keys
            .map(key => (Object.assign({}, properties[key], { name: core_1.strings.dasherize(key) })))
            .map(opt => {
            let type;
            const schematicType = opt.type;
            switch (opt.type) {
                case 'string':
                    type = String;
                    break;
                case 'boolean':
                    type = Boolean;
                    break;
                case 'integer':
                case 'number':
                    type = Number;
                    break;
                // Ignore arrays / objects.
                default:
                    return null;
            }
            let aliases = [];
            if (opt.alias) {
                aliases = [...aliases, opt.alias];
            }
            if (opt.aliases) {
                aliases = [...aliases, ...opt.aliases];
            }
            const schematicDefault = opt.default;
            return Object.assign({}, opt, { aliases,
                type,
                schematicType, default: undefined, // do not carry over schematics defaults
                schematicDefault, hidden: opt.visible === false });
        })
            .filter(x => x)
            .forEach(option => this.options.push(option));
    }
    runArchitectTarget(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetSpec = this._makeTargetSpecifier(options);
            const runSingleTarget = (targetSpec) => this._architect.run(this._architect.getBuilderConfiguration(targetSpec), { logger: this._logger }).pipe(operators_1.map((buildEvent) => buildEvent.success ? 0 : 1));
            try {
                if (!targetSpec.project && this.target) {
                    // This runs each target sequentially.
                    // Running them in parallel would jumble the log messages.
                    return yield rxjs_2.from(this.getProjectNamesByTarget(this.target)).pipe(operators_1.concatMap(project => runSingleTarget(Object.assign({}, targetSpec, { project }))), operators_1.toArray(), operators_1.map(results => results.every(res => res === 0) ? 0 : 1))
                        .toPromise();
                }
                else {
                    return yield runSingleTarget(targetSpec).toPromise();
                }
            }
            catch (e) {
                if (e instanceof core_1.schema.SchemaValidationException) {
                    const newErrors = [];
                    for (const schemaError of e.errors) {
                        if (schemaError.keyword === 'additionalProperties') {
                            const unknownProperty = schemaError.params.additionalProperty;
                            if (unknownProperty in options) {
                                const dashes = unknownProperty.length === 1 ? '-' : '--';
                                this.logger.fatal(`Unknown option: '${dashes}${unknownProperty}'`);
                                continue;
                            }
                        }
                        newErrors.push(schemaError);
                    }
                    if (newErrors.length > 0) {
                        this.logger.error(new core_1.schema.SchemaValidationException(newErrors).message);
                    }
                    return 1;
                }
                else {
                    throw e;
                }
            }
        });
    }
    getProjectNamesByTarget(targetName) {
        const allProjectsForTargetName = this._workspace.listProjectNames().map(projectName => this._architect.listProjectTargets(projectName).includes(targetName) ? projectName : null).filter(x => !!x);
        if (this.multiTarget) {
            // For multi target commands, we always list all projects that have the target.
            return allProjectsForTargetName;
        }
        else {
            // For single target commands, we try try the default project project first,
            // then the full list if it has a single project, then error out.
            const maybeDefaultProject = this._workspace.getDefaultProjectName();
            if (maybeDefaultProject && allProjectsForTargetName.includes(maybeDefaultProject)) {
                return [maybeDefaultProject];
            }
            if (allProjectsForTargetName.length === 1) {
                return allProjectsForTargetName;
            }
            throw new Error(`Could not determine a single project for the '${targetName}' target.`);
        }
    }
    _loadWorkspaceAndArchitect() {
        const workspaceLoader = new workspace_loader_1.WorkspaceLoader(this._host);
        return workspaceLoader.loadWorkspace(this.project.root).pipe(operators_1.tap((workspace) => this._workspace = workspace), operators_1.concatMap((workspace) => {
            return new architect_1.Architect(workspace).loadArchitect();
        }), operators_1.tap((architect) => this._architect = architect));
    }
    _makeTargetSpecifier(options) {
        let project, target, configuration, overrides;
        if (options.target) {
            [project, target, configuration] = options.target.split(':');
            overrides = Object.assign({}, options);
            delete overrides.target;
            if (overrides.configuration) {
                configuration = overrides.configuration;
                delete overrides.configuration;
            }
        }
        else {
            project = options.project;
            target = this.target;
            configuration = options.configuration;
            if (!configuration && options.prod) {
                configuration = 'production';
            }
            overrides = Object.assign({}, options);
            delete overrides.configuration;
            delete overrides.prod;
            delete overrides.project;
        }
        if (!project) {
            project = '';
        }
        if (!target) {
            target = '';
        }
        return {
            project,
            configuration,
            target,
            overrides,
        };
    }
}
exports.ArchitectCommand = ArchitectCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJjaGl0ZWN0LWNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXIvY2xpL21vZGVscy9hcmNoaXRlY3QtY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7O0FBRUgsaURBQWlEO0FBQ2pELHlEQUttQztBQUNuQywrQ0FBaUY7QUFDakYsb0RBQWdGO0FBQ2hGLCtCQUEwQjtBQUMxQiwrQkFBNEI7QUFDNUIsOENBQThEO0FBQzlELHVDQUE0QztBQUM1Qyx5REFBcUQ7QUFjckQsc0JBQXVDLFNBQVEsaUJBQWdDO0lBQS9FOztRQUVVLFVBQUssR0FBRyxJQUFJLHFCQUFjLEVBQUUsQ0FBQztRQUc3QixZQUFPLEdBQUcsMEJBQW1CLEVBQUUsQ0FBQztRQUN4QyxxREFBcUQ7UUFDM0MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFckIsWUFBTyxHQUFhLENBQUM7Z0JBQzVCLElBQUksRUFBRSxlQUFlO2dCQUNyQixXQUFXLEVBQUUsbUJBQW1CO2dCQUNoQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUM7YUFDZixDQUFDLENBQUM7UUFFTSxjQUFTLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQWlHdkIsZUFBVSxHQUFXO1lBQzdCLElBQUksRUFBRSxNQUFNO1lBQ1osV0FBVyxFQUFFLHNDQUFzQztZQUNuRCxJQUFJLEVBQUUsT0FBTztTQUNkLENBQUM7UUFFUSx3QkFBbUIsR0FBVztZQUN0QyxJQUFJLEVBQUUsZUFBZTtZQUNyQixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ2YsQ0FBQztJQWlJSixDQUFDO0lBek9jLFVBQVUsQ0FBQyxPQUFnQzs7WUFDdEQsT0FBTyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxJQUFJLENBQzNDLHFCQUFT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R0FBRyxDQUFDLENBQUM7WUFFN0QsU0FBUyxxQkFBUSxPQUFPLENBQUUsQ0FBQztZQUMzQixPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFFeEIsSUFBSSxTQUFTLENBQUMsYUFBYSxFQUFFO2dCQUMzQixhQUFhLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztnQkFDeEMsT0FBTyxTQUFTLENBQUMsYUFBYSxDQUFDO2FBQ2hDO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQzFCLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3JCLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxhQUFhLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDbEMsYUFBYSxHQUFHLFlBQVksQ0FBQzthQUM5QjtZQUVELFNBQVMscUJBQVEsT0FBTyxDQUFFLENBQUM7WUFFM0IsT0FBTyxTQUFTLENBQUMsYUFBYSxDQUFDO1lBQy9CLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztZQUN0QixPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUM7U0FDMUI7UUFFRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDYjtRQUVELE9BQU87WUFDTCxPQUFPO1lBQ1AsYUFBYTtZQUNiLE1BQU07WUFDTixTQUFTO1NBQ1YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTdQRCw0Q0E2UEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWdsb2JhbC10c2xpbnQtZGlzYWJsZSBuby1hbnlcbmltcG9ydCB7XG4gIEFyY2hpdGVjdCxcbiAgQnVpbGRFdmVudCxcbiAgQnVpbGRlckRlc2NyaXB0aW9uLFxuICBUYXJnZXRTcGVjaWZpZXIsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9hcmNoaXRlY3QnO1xuaW1wb3J0IHsgSnNvbk9iamVjdCwgZXhwZXJpbWVudGFsLCBzY2hlbWEsIHN0cmluZ3MgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBOb2RlSnNTeW5jSG9zdCwgY3JlYXRlQ29uc29sZUxvZ2dlciB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlL25vZGUnO1xuaW1wb3J0IHsgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgbWFwLCB0YXAsIHRvQXJyYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb21tYW5kLCBPcHRpb24gfSBmcm9tICcuL2NvbW1hbmQnO1xuaW1wb3J0IHsgV29ya3NwYWNlTG9hZGVyIH0gZnJvbSAnLi93b3Jrc3BhY2UtbG9hZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0QW5kQ29uZmlndXJhdGlvbk9wdGlvbnMge1xuICBwcm9qZWN0Pzogc3RyaW5nO1xuICBjb25maWd1cmF0aW9uPzogc3RyaW5nO1xuICBwcm9kOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRhcmdldE9wdGlvbnMge1xuICB0YXJnZXQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIEFyY2hpdGVjdENvbW1hbmRPcHRpb25zID0gUHJvamVjdEFuZENvbmZpZ3VyYXRpb25PcHRpb25zICYgVGFyZ2V0T3B0aW9ucyAmIEpzb25PYmplY3Q7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcmNoaXRlY3RDb21tYW5kIGV4dGVuZHMgQ29tbWFuZDxBcmNoaXRlY3RDb21tYW5kT3B0aW9ucz4ge1xuXG4gIHByaXZhdGUgX2hvc3QgPSBuZXcgTm9kZUpzU3luY0hvc3QoKTtcbiAgcHJpdmF0ZSBfYXJjaGl0ZWN0OiBBcmNoaXRlY3Q7XG4gIHByaXZhdGUgX3dvcmtzcGFjZTogZXhwZXJpbWVudGFsLndvcmtzcGFjZS5Xb3Jrc3BhY2U7XG4gIHByaXZhdGUgX2xvZ2dlciA9IGNyZWF0ZUNvbnNvbGVMb2dnZXIoKTtcbiAgLy8gSWYgdGhpcyBjb21tYW5kIHN1cHBvcnRzIHJ1bm5pbmcgbXVsdGlwbGUgdGFyZ2V0cy5cbiAgcHJvdGVjdGVkIG11bHRpVGFyZ2V0ID0gZmFsc2U7XG5cbiAgcmVhZG9ubHkgT3B0aW9uczogT3B0aW9uW10gPSBbe1xuICAgIG5hbWU6ICdjb25maWd1cmF0aW9uJyxcbiAgICBkZXNjcmlwdGlvbjogJ1RoZSBjb25maWd1cmF0aW9uJyxcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgYWxpYXNlczogWydjJ10sXG4gIH1dO1xuXG4gIHJlYWRvbmx5IGFyZ3VtZW50cyA9IFsncHJvamVjdCddO1xuXG4gIHRhcmdldDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBhc3luYyBpbml0aWFsaXplKG9wdGlvbnM6IEFyY2hpdGVjdENvbW1hbmRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRXb3Jrc3BhY2VBbmRBcmNoaXRlY3QoKS5waXBlKFxuICAgICAgY29uY2F0TWFwKCgpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0U3BlYzogVGFyZ2V0U3BlY2lmaWVyID0gdGhpcy5fbWFrZVRhcmdldFNwZWNpZmllcihvcHRpb25zKTtcblxuICAgICAgICBpZiAodGhpcy50YXJnZXQgJiYgIXRhcmdldFNwZWMucHJvamVjdCkge1xuICAgICAgICAgIGNvbnN0IHByb2plY3RzID0gdGhpcy5nZXRQcm9qZWN0TmFtZXNCeVRhcmdldCh0aGlzLnRhcmdldCk7XG5cbiAgICAgICAgICBpZiAocHJvamVjdHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHNpbmdsZSB0YXJnZXQsIHVzZSBpdCB0byBwYXJzZSBvdmVycmlkZXMuXG4gICAgICAgICAgICB0YXJnZXRTcGVjLnByb2plY3QgPSBwcm9qZWN0c1swXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTXVsdGlwbGUgdGFyZ2V0cyBjYW4gaGF2ZSBkaWZmZXJlbnQsIGluY29tcGF0aWJsZSBvcHRpb25zLlxuICAgICAgICAgICAgLy8gV2Ugb25seSBsb29rdXAgb3B0aW9ucyBmb3Igc2luZ2xlIHRhcmdldHMuXG4gICAgICAgICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0YXJnZXRTcGVjLnByb2plY3QgfHwgIXRhcmdldFNwZWMudGFyZ2V0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZGV0ZXJtaW5lIHByb2plY3Qgb3IgdGFyZ2V0IGZvciBBcmNoaXRlY3QgY29tbWFuZC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJ1aWxkZXJDb25maWcgPSB0aGlzLl9hcmNoaXRlY3QuZ2V0QnVpbGRlckNvbmZpZ3VyYXRpb24odGFyZ2V0U3BlYyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2FyY2hpdGVjdC5nZXRCdWlsZGVyRGVzY3JpcHRpb24oYnVpbGRlckNvbmZpZykucGlwZShcbiAgICAgICAgICB0YXA8QnVpbGRlckRlc2NyaXB0aW9uPihidWlsZGVyRGVzYyA9PiB7IHRoaXMubWFwQXJjaGl0ZWN0T3B0aW9ucyhidWlsZGVyRGVzYy5zY2hlbWEpOyB9KSxcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICkudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKCgpID0+IHsgfSk7XG4gIH1cblxuICBwdWJsaWMgdmFsaWRhdGUob3B0aW9uczogQXJjaGl0ZWN0Q29tbWFuZE9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMucHJvamVjdCAmJiB0aGlzLnRhcmdldCkge1xuICAgICAgY29uc3QgcHJvamVjdE5hbWVzID0gdGhpcy5nZXRQcm9qZWN0TmFtZXNCeVRhcmdldCh0aGlzLnRhcmdldCk7XG4gICAgICBjb25zdCB7IG92ZXJyaWRlcyB9ID0gdGhpcy5fbWFrZVRhcmdldFNwZWNpZmllcihvcHRpb25zKTtcbiAgICAgIGlmIChwcm9qZWN0TmFtZXMubGVuZ3RoID4gMSAmJiBPYmplY3Qua2V5cyhvdmVycmlkZXMgfHwge30pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmNoaXRlY3QgY29tbWFuZHMgd2l0aCBtdWx0aXBsZSB0YXJnZXRzIGNhbm5vdCBzcGVjaWZ5IG92ZXJyaWRlcy4nXG4gICAgICAgICAgKyBgJyR7dGhpcy50YXJnZXR9JyB3b3VsZCBiZSBydW4gb24gdGhlIGZvbGxvd2luZyBwcm9qZWN0czogJHtwcm9qZWN0TmFtZXMuam9pbigpfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcEFyY2hpdGVjdE9wdGlvbnMoc2NoZW1hOiBhbnkpIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0gc2NoZW1hLnByb3BlcnRpZXM7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuICAgIGtleXNcbiAgICAgIC5tYXAoa2V5ID0+ICh7IC4uLnByb3BlcnRpZXNba2V5XSwgLi4ueyBuYW1lOiBzdHJpbmdzLmRhc2hlcml6ZShrZXkpIH0gfSkpXG4gICAgICAubWFwKG9wdCA9PiB7XG4gICAgICAgIGxldCB0eXBlO1xuICAgICAgICBjb25zdCBzY2hlbWF0aWNUeXBlID0gb3B0LnR5cGU7XG4gICAgICAgIHN3aXRjaCAob3B0LnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgdHlwZSA9IFN0cmluZztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgdHlwZSA9IEJvb2xlYW47XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdpbnRlZ2VyJzpcbiAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgdHlwZSA9IE51bWJlcjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgLy8gSWdub3JlIGFycmF5cyAvIG9iamVjdHMuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhbGlhc2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBpZiAob3B0LmFsaWFzKSB7XG4gICAgICAgICAgYWxpYXNlcyA9IFsuLi5hbGlhc2VzLCBvcHQuYWxpYXNdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHQuYWxpYXNlcykge1xuICAgICAgICAgIGFsaWFzZXMgPSBbLi4uYWxpYXNlcywgLi4ub3B0LmFsaWFzZXNdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2NoZW1hdGljRGVmYXVsdCA9IG9wdC5kZWZhdWx0O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ub3B0LFxuICAgICAgICAgIGFsaWFzZXMsXG4gICAgICAgICAgdHlwZSxcbiAgICAgICAgICBzY2hlbWF0aWNUeXBlLFxuICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCwgLy8gZG8gbm90IGNhcnJ5IG92ZXIgc2NoZW1hdGljcyBkZWZhdWx0c1xuICAgICAgICAgIHNjaGVtYXRpY0RlZmF1bHQsXG4gICAgICAgICAgaGlkZGVuOiBvcHQudmlzaWJsZSA9PT0gZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmZpbHRlcih4ID0+IHgpXG4gICAgICAuZm9yRWFjaChvcHRpb24gPT4gdGhpcy5vcHRpb25zLnB1c2gob3B0aW9uKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJvZE9wdGlvbjogT3B0aW9uID0ge1xuICAgIG5hbWU6ICdwcm9kJyxcbiAgICBkZXNjcmlwdGlvbjogJ0ZsYWcgdG8gc2V0IGNvbmZpZ3VyYXRpb24gdG8gXCJwcm9kXCIuJyxcbiAgICB0eXBlOiBCb29sZWFuLFxuICB9O1xuXG4gIHByb3RlY3RlZCBjb25maWd1cmF0aW9uT3B0aW9uOiBPcHRpb24gPSB7XG4gICAgbmFtZTogJ2NvbmZpZ3VyYXRpb24nLFxuICAgIGRlc2NyaXB0aW9uOiAnU3BlY2lmeSB0aGUgY29uZmlndXJhdGlvbiB0byB1c2UuJyxcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgYWxpYXNlczogWydjJ10sXG4gIH07XG5cbiAgcHJvdGVjdGVkIGFzeW5jIHJ1bkFyY2hpdGVjdFRhcmdldChvcHRpb25zOiBBcmNoaXRlY3RDb21tYW5kT3B0aW9ucyk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3QgdGFyZ2V0U3BlYyA9IHRoaXMuX21ha2VUYXJnZXRTcGVjaWZpZXIob3B0aW9ucyk7XG5cbiAgICBjb25zdCBydW5TaW5nbGVUYXJnZXQgPSAodGFyZ2V0U3BlYzogVGFyZ2V0U3BlY2lmaWVyKSA9PiB0aGlzLl9hcmNoaXRlY3QucnVuKFxuICAgICAgdGhpcy5fYXJjaGl0ZWN0LmdldEJ1aWxkZXJDb25maWd1cmF0aW9uKHRhcmdldFNwZWMpLFxuICAgICAgeyBsb2dnZXI6IHRoaXMuX2xvZ2dlciB9LFxuICAgICkucGlwZShcbiAgICAgIG1hcCgoYnVpbGRFdmVudDogQnVpbGRFdmVudCkgPT4gYnVpbGRFdmVudC5zdWNjZXNzID8gMCA6IDEpLFxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKCF0YXJnZXRTcGVjLnByb2plY3QgJiYgdGhpcy50YXJnZXQpIHtcbiAgICAgICAgLy8gVGhpcyBydW5zIGVhY2ggdGFyZ2V0IHNlcXVlbnRpYWxseS5cbiAgICAgICAgLy8gUnVubmluZyB0aGVtIGluIHBhcmFsbGVsIHdvdWxkIGp1bWJsZSB0aGUgbG9nIG1lc3NhZ2VzLlxuICAgICAgICByZXR1cm4gYXdhaXQgZnJvbSh0aGlzLmdldFByb2plY3ROYW1lc0J5VGFyZ2V0KHRoaXMudGFyZ2V0KSkucGlwZShcbiAgICAgICAgICBjb25jYXRNYXAocHJvamVjdCA9PiBydW5TaW5nbGVUYXJnZXQoeyAuLi50YXJnZXRTcGVjLCBwcm9qZWN0IH0pKSxcbiAgICAgICAgICB0b0FycmF5KCksXG4gICAgICAgICAgbWFwKHJlc3VsdHMgPT4gcmVzdWx0cy5ldmVyeShyZXMgPT4gcmVzID09PSAwKSA/IDAgOiAxKSxcbiAgICAgICAgKVxuICAgICAgICAudG9Qcm9taXNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYXdhaXQgcnVuU2luZ2xlVGFyZ2V0KHRhcmdldFNwZWMpLnRvUHJvbWlzZSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2Ygc2NoZW1hLlNjaGVtYVZhbGlkYXRpb25FeGNlcHRpb24pIHtcbiAgICAgICAgY29uc3QgbmV3RXJyb3JzOiBzY2hlbWEuU2NoZW1hVmFsaWRhdG9yRXJyb3JbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IHNjaGVtYUVycm9yIG9mIGUuZXJyb3JzKSB7XG4gICAgICAgICAgaWYgKHNjaGVtYUVycm9yLmtleXdvcmQgPT09ICdhZGRpdGlvbmFsUHJvcGVydGllcycpIHtcbiAgICAgICAgICAgIGNvbnN0IHVua25vd25Qcm9wZXJ0eSA9IHNjaGVtYUVycm9yLnBhcmFtcy5hZGRpdGlvbmFsUHJvcGVydHk7XG4gICAgICAgICAgICBpZiAodW5rbm93blByb3BlcnR5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgY29uc3QgZGFzaGVzID0gdW5rbm93blByb3BlcnR5Lmxlbmd0aCA9PT0gMSA/ICctJyA6ICctLSc7XG4gICAgICAgICAgICAgIHRoaXMubG9nZ2VyLmZhdGFsKGBVbmtub3duIG9wdGlvbjogJyR7ZGFzaGVzfSR7dW5rbm93blByb3BlcnR5fSdgKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIG5ld0Vycm9ycy5wdXNoKHNjaGVtYUVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdFcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKG5ldyBzY2hlbWEuU2NoZW1hVmFsaWRhdGlvbkV4Y2VwdGlvbihuZXdFcnJvcnMpLm1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJvamVjdE5hbWVzQnlUYXJnZXQodGFyZ2V0TmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGFsbFByb2plY3RzRm9yVGFyZ2V0TmFtZSA9IHRoaXMuX3dvcmtzcGFjZS5saXN0UHJvamVjdE5hbWVzKCkubWFwKHByb2plY3ROYW1lID0+XG4gICAgICB0aGlzLl9hcmNoaXRlY3QubGlzdFByb2plY3RUYXJnZXRzKHByb2plY3ROYW1lKS5pbmNsdWRlcyh0YXJnZXROYW1lKSA/IHByb2plY3ROYW1lIDogbnVsbCxcbiAgICApLmZpbHRlcih4ID0+ICEheCkgYXMgc3RyaW5nW107XG5cbiAgICBpZiAodGhpcy5tdWx0aVRhcmdldCkge1xuICAgICAgLy8gRm9yIG11bHRpIHRhcmdldCBjb21tYW5kcywgd2UgYWx3YXlzIGxpc3QgYWxsIHByb2plY3RzIHRoYXQgaGF2ZSB0aGUgdGFyZ2V0LlxuICAgICAgcmV0dXJuIGFsbFByb2plY3RzRm9yVGFyZ2V0TmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRm9yIHNpbmdsZSB0YXJnZXQgY29tbWFuZHMsIHdlIHRyeSB0cnkgdGhlIGRlZmF1bHQgcHJvamVjdCBwcm9qZWN0IGZpcnN0LFxuICAgICAgLy8gdGhlbiB0aGUgZnVsbCBsaXN0IGlmIGl0IGhhcyBhIHNpbmdsZSBwcm9qZWN0LCB0aGVuIGVycm9yIG91dC5cbiAgICAgIGNvbnN0IG1heWJlRGVmYXVsdFByb2plY3QgPSB0aGlzLl93b3Jrc3BhY2UuZ2V0RGVmYXVsdFByb2plY3ROYW1lKCk7XG4gICAgICBpZiAobWF5YmVEZWZhdWx0UHJvamVjdCAmJiBhbGxQcm9qZWN0c0ZvclRhcmdldE5hbWUuaW5jbHVkZXMobWF5YmVEZWZhdWx0UHJvamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIFttYXliZURlZmF1bHRQcm9qZWN0XTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFsbFByb2plY3RzRm9yVGFyZ2V0TmFtZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGFsbFByb2plY3RzRm9yVGFyZ2V0TmFtZTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZGV0ZXJtaW5lIGEgc2luZ2xlIHByb2plY3QgZm9yIHRoZSAnJHt0YXJnZXROYW1lfScgdGFyZ2V0LmApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRXb3Jrc3BhY2VBbmRBcmNoaXRlY3QoKSB7XG4gICAgY29uc3Qgd29ya3NwYWNlTG9hZGVyID0gbmV3IFdvcmtzcGFjZUxvYWRlcih0aGlzLl9ob3N0KTtcblxuICAgIHJldHVybiB3b3Jrc3BhY2VMb2FkZXIubG9hZFdvcmtzcGFjZSh0aGlzLnByb2plY3Qucm9vdCkucGlwZShcbiAgICAgIHRhcCgod29ya3NwYWNlOiBleHBlcmltZW50YWwud29ya3NwYWNlLldvcmtzcGFjZSkgPT4gdGhpcy5fd29ya3NwYWNlID0gd29ya3NwYWNlKSxcbiAgICAgIGNvbmNhdE1hcCgod29ya3NwYWNlOiBleHBlcmltZW50YWwud29ya3NwYWNlLldvcmtzcGFjZSkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEFyY2hpdGVjdCh3b3Jrc3BhY2UpLmxvYWRBcmNoaXRlY3QoKTtcbiAgICAgIH0pLFxuICAgICAgdGFwKChhcmNoaXRlY3Q6IEFyY2hpdGVjdCkgPT4gdGhpcy5fYXJjaGl0ZWN0ID0gYXJjaGl0ZWN0KSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWFrZVRhcmdldFNwZWNpZmllcihvcHRpb25zOiBBcmNoaXRlY3RDb21tYW5kT3B0aW9ucyk6IFRhcmdldFNwZWNpZmllciB7XG4gICAgbGV0IHByb2plY3QsIHRhcmdldCwgY29uZmlndXJhdGlvbiwgb3ZlcnJpZGVzO1xuXG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICBbcHJvamVjdCwgdGFyZ2V0LCBjb25maWd1cmF0aW9uXSA9IG9wdGlvbnMudGFyZ2V0LnNwbGl0KCc6Jyk7XG5cbiAgICAgIG92ZXJyaWRlcyA9IHsgLi4ub3B0aW9ucyB9O1xuICAgICAgZGVsZXRlIG92ZXJyaWRlcy50YXJnZXQ7XG5cbiAgICAgIGlmIChvdmVycmlkZXMuY29uZmlndXJhdGlvbikge1xuICAgICAgICBjb25maWd1cmF0aW9uID0gb3ZlcnJpZGVzLmNvbmZpZ3VyYXRpb247XG4gICAgICAgIGRlbGV0ZSBvdmVycmlkZXMuY29uZmlndXJhdGlvbjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcHJvamVjdCA9IG9wdGlvbnMucHJvamVjdDtcbiAgICAgIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuICAgICAgY29uZmlndXJhdGlvbiA9IG9wdGlvbnMuY29uZmlndXJhdGlvbjtcbiAgICAgIGlmICghY29uZmlndXJhdGlvbiAmJiBvcHRpb25zLnByb2QpIHtcbiAgICAgICAgY29uZmlndXJhdGlvbiA9ICdwcm9kdWN0aW9uJztcbiAgICAgIH1cblxuICAgICAgb3ZlcnJpZGVzID0geyAuLi5vcHRpb25zIH07XG5cbiAgICAgIGRlbGV0ZSBvdmVycmlkZXMuY29uZmlndXJhdGlvbjtcbiAgICAgIGRlbGV0ZSBvdmVycmlkZXMucHJvZDtcbiAgICAgIGRlbGV0ZSBvdmVycmlkZXMucHJvamVjdDtcbiAgICB9XG5cbiAgICBpZiAoIXByb2plY3QpIHtcbiAgICAgIHByb2plY3QgPSAnJztcbiAgICB9XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRhcmdldCA9ICcnO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwcm9qZWN0LFxuICAgICAgY29uZmlndXJhdGlvbixcbiAgICAgIHRhcmdldCxcbiAgICAgIG92ZXJyaWRlcyxcbiAgICB9O1xuICB9XG59XG4iXX0=