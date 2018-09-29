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
var CommandScope;
(function (CommandScope) {
    CommandScope[CommandScope["everywhere"] = 0] = "everywhere";
    CommandScope[CommandScope["inProject"] = 1] = "inProject";
    CommandScope[CommandScope["outsideProject"] = 2] = "outsideProject";
})(CommandScope = exports.CommandScope || (exports.CommandScope = {}));
var ArgumentStrategy;
(function (ArgumentStrategy) {
    ArgumentStrategy[ArgumentStrategy["MapToOptions"] = 0] = "MapToOptions";
    ArgumentStrategy[ArgumentStrategy["Nothing"] = 1] = "Nothing";
})(ArgumentStrategy = exports.ArgumentStrategy || (exports.ArgumentStrategy = {}));
class Command {
    constructor(context, logger) {
        this.allowMissingWorkspace = false;
        this.argStrategy = ArgumentStrategy.MapToOptions;
        this.hidden = false;
        this.unknown = false;
        this.logger = logger;
        if (context) {
            this.project = context.project;
        }
    }
    initializeRaw(args) {
        return __awaiter(this, void 0, void 0, function* () {
            this._rawArgs = args;
            return args;
        });
    }
    initialize(_options) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    validate(_options) {
        return true;
    }
    printHelp(_options) {
        this.printHelpUsage(this.name, this.arguments, this.options);
        this.printHelpOptions(this.options);
    }
    printHelpUsage(name, args, options) {
        const argDisplay = args && args.length > 0
            ? ' ' + args.map(a => `<${a}>`).join(' ')
            : '';
        const optionsDisplay = options && options.length > 0
            ? ` [options]`
            : ``;
        this.logger.info(`usage: ng ${name}${argDisplay}${optionsDisplay}`);
    }
    printHelpOptions(options) {
        if (options && this.options.length > 0) {
            this.logger.info(`options:`);
            this.options
                .filter(o => !o.hidden)
                .sort((a, b) => a.name >= b.name ? 1 : -1)
                .forEach(o => {
                const aliases = o.aliases && o.aliases.length > 0
                    ? '(' + o.aliases.map(a => `-${a}`).join(' ') + ')'
                    : '';
                this.logger.info(`  ${core_1.terminal.cyan('--' + o.name)} ${aliases}`);
                this.logger.info(`    ${o.description}`);
            });
        }
    }
}
Command.scope = CommandScope.everywhere;
Command.aliases = [];
exports.Command = Command;
class Option {
    constructor() {
        this.hidden = false;
    }
}
exports.Option = Option;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvbW9kZWxzL2NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILGlEQUFpRDtBQUNqRCwrQ0FBeUQ7QUFTekQsSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3RCLDJEQUFVLENBQUE7SUFDVix5REFBUyxDQUFBO0lBQ1QsbUVBQWMsQ0FBQTtBQUNoQixDQUFDLEVBSlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFJdkI7QUFFRCxJQUFZLGdCQUdYO0FBSEQsV0FBWSxnQkFBZ0I7SUFDMUIsdUVBQVksQ0FBQTtJQUNaLDZEQUFPLENBQUE7QUFDVCxDQUFDLEVBSFcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFHM0I7QUFFRDtJQUlFLFlBQVksT0FBdUIsRUFBRSxNQUFzQjtRQUZwRCwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUEwRDlCLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO1FBQzVDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBekRyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBRUssYUFBYSxDQUFDLElBQWM7O1lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFDSyxVQUFVLENBQUMsUUFBYTs7WUFDNUIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztLQUFBO0lBRUQsUUFBUSxDQUFDLFFBQVc7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBVztRQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRVMsY0FBYyxDQUFDLElBQVksRUFBRSxJQUFjLEVBQUUsT0FBaUI7UUFDdEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUN4QyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN6QyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1AsTUFBTSxjQUFjLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNsRCxDQUFDLENBQUMsWUFBWTtZQUNkLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksR0FBRyxVQUFVLEdBQUcsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRVMsZ0JBQWdCLENBQUMsT0FBaUI7UUFDMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU87aUJBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2lCQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDYixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQy9DLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUc7b0JBQ25ELENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxlQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDOztBQVVhLGFBQUssR0FBaUIsWUFBWSxDQUFDLFVBQVUsQ0FBQztBQUM5QyxlQUFPLEdBQWEsRUFBRSxDQUFDO0FBaEV2QywwQkFtRUM7QUFNRDtJQUFBO1FBU1csV0FBTSxHQUFhLEtBQUssQ0FBQztJQUNwQyxDQUFDO0NBQUE7QUFWRCx3QkFVQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gdHNsaW50OmRpc2FibGU6bm8tZ2xvYmFsLXRzbGludC1kaXNhYmxlIG5vLWFueVxuaW1wb3J0IHsgbG9nZ2luZywgdGVybWluYWwgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZENvbnN0cnVjdG9yIHtcbiAgbmV3KGNvbnRleHQ6IENvbW1hbmRDb250ZXh0LCBsb2dnZXI6IGxvZ2dpbmcuTG9nZ2VyKTogQ29tbWFuZDtcbiAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICBhbGlhc2VzOiBzdHJpbmdbXTtcbiAgc2NvcGU6IENvbW1hbmRTY29wZTtcbn1cblxuZXhwb3J0IGVudW0gQ29tbWFuZFNjb3BlIHtcbiAgZXZlcnl3aGVyZSxcbiAgaW5Qcm9qZWN0LFxuICBvdXRzaWRlUHJvamVjdCxcbn1cblxuZXhwb3J0IGVudW0gQXJndW1lbnRTdHJhdGVneSB7XG4gIE1hcFRvT3B0aW9ucyxcbiAgTm90aGluZyxcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbW1hbmQ8VCA9IGFueT4ge1xuICBwcm90ZWN0ZWQgX3Jhd0FyZ3M6IHN0cmluZ1tdO1xuICBwdWJsaWMgYWxsb3dNaXNzaW5nV29ya3NwYWNlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoY29udGV4dDogQ29tbWFuZENvbnRleHQsIGxvZ2dlcjogbG9nZ2luZy5Mb2dnZXIpIHtcbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgdGhpcy5wcm9qZWN0ID0gY29udGV4dC5wcm9qZWN0O1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGluaXRpYWxpemVSYXcoYXJnczogc3RyaW5nW10pOiBQcm9taXNlPGFueT4ge1xuICAgIHRoaXMuX3Jhd0FyZ3MgPSBhcmdzO1xuXG4gICAgcmV0dXJuIGFyZ3M7XG4gIH1cbiAgYXN5bmMgaW5pdGlhbGl6ZShfb3B0aW9uczogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFsaWRhdGUoX29wdGlvbnM6IFQpOiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcmludEhlbHAoX29wdGlvbnM6IFQpOiB2b2lkIHtcbiAgICB0aGlzLnByaW50SGVscFVzYWdlKHRoaXMubmFtZSwgdGhpcy5hcmd1bWVudHMsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5wcmludEhlbHBPcHRpb25zKHRoaXMub3B0aW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJpbnRIZWxwVXNhZ2UobmFtZTogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9uczogT3B0aW9uW10pIHtcbiAgICBjb25zdCBhcmdEaXNwbGF5ID0gYXJncyAmJiBhcmdzLmxlbmd0aCA+IDBcbiAgICAgID8gJyAnICsgYXJncy5tYXAoYSA9PiBgPCR7YX0+YCkuam9pbignICcpXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IG9wdGlvbnNEaXNwbGF5ID0gb3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCA+IDBcbiAgICAgID8gYCBbb3B0aW9uc11gXG4gICAgICA6IGBgO1xuICAgIHRoaXMubG9nZ2VyLmluZm8oYHVzYWdlOiBuZyAke25hbWV9JHthcmdEaXNwbGF5fSR7b3B0aW9uc0Rpc3BsYXl9YCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJpbnRIZWxwT3B0aW9ucyhvcHRpb25zOiBPcHRpb25bXSkge1xuICAgIGlmIChvcHRpb25zICYmIHRoaXMub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmxvZ2dlci5pbmZvKGBvcHRpb25zOmApO1xuICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgIC5maWx0ZXIobyA9PiAhby5oaWRkZW4pXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLm5hbWUgPj0gYi5uYW1lID8gMSA6IC0xKVxuICAgICAgICAuZm9yRWFjaChvID0+IHtcbiAgICAgICAgY29uc3QgYWxpYXNlcyA9IG8uYWxpYXNlcyAmJiBvLmFsaWFzZXMubGVuZ3RoID4gMFxuICAgICAgICAgID8gJygnICsgby5hbGlhc2VzLm1hcChhID0+IGAtJHthfWApLmpvaW4oJyAnKSArICcpJ1xuICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYCAgJHt0ZXJtaW5hbC5jeWFuKCctLScgKyBvLm5hbWUpfSAke2FsaWFzZXN9YCk7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oYCAgICAke28uZGVzY3JpcHRpb259YCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhYnN0cmFjdCBydW4ob3B0aW9uczogVCk6IG51bWJlciB8IHZvaWQgfCBQcm9taXNlPG51bWJlciB8IHZvaWQ+O1xuICBhYnN0cmFjdCByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIGFic3RyYWN0IHJlYWRvbmx5IGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGFic3RyYWN0IHJlYWRvbmx5IGFyZ3VtZW50czogc3RyaW5nW107XG4gIGFic3RyYWN0IHJlYWRvbmx5IG9wdGlvbnM6IE9wdGlvbltdO1xuICBwdWJsaWMgYXJnU3RyYXRlZ3kgPSBBcmd1bWVudFN0cmF0ZWd5Lk1hcFRvT3B0aW9ucztcbiAgcHVibGljIGhpZGRlbiA9IGZhbHNlO1xuICBwdWJsaWMgdW5rbm93biA9IGZhbHNlO1xuICBwdWJsaWMgc3RhdGljIHNjb3BlOiBDb21tYW5kU2NvcGUgPSBDb21tYW5kU2NvcGUuZXZlcnl3aGVyZTtcbiAgcHVibGljIHN0YXRpYyBhbGlhc2VzOiBzdHJpbmdbXSA9IFtdO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbG9nZ2VyOiBsb2dnaW5nLkxvZ2dlcjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHByb2plY3Q6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kQ29udGV4dCB7XG4gIHByb2plY3Q6IGFueTtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9wdGlvbiB7XG4gIGFic3RyYWN0IHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgYWJzdHJhY3QgcmVhZG9ubHkgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcmVhZG9ubHkgZGVmYXVsdD86IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW47XG4gIHJlYWRvbmx5IHJlcXVpcmVkPzogYm9vbGVhbjtcbiAgYWJzdHJhY3QgcmVhZG9ubHkgYWxpYXNlcz86IHN0cmluZ1tdO1xuICBhYnN0cmFjdCByZWFkb25seSB0eXBlOiBhbnk7XG4gIHJlYWRvbmx5IGZvcm1hdD86IHN0cmluZztcbiAgcmVhZG9ubHkgdmFsdWVzPzogYW55W107XG4gIHJlYWRvbmx5IGhpZGRlbj86IGJvb2xlYW4gPSBmYWxzZTtcbn1cbiJdfQ==