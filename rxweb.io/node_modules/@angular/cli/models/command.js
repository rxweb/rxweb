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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvbW9kZWxzL2NvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILGlEQUFpRDtBQUNqRCwrQ0FBeUQ7QUFTekQsSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3RCLDJEQUFVLENBQUE7SUFDVix5REFBUyxDQUFBO0lBQ1QsbUVBQWMsQ0FBQTtBQUNoQixDQUFDLEVBSlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFJdkI7QUFFRCxJQUFZLGdCQUdYO0FBSEQsV0FBWSxnQkFBZ0I7SUFDMUIsdUVBQVksQ0FBQTtJQUNaLDZEQUFPLENBQUE7QUFDVCxDQUFDLEVBSFcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFHM0I7QUFFRDtJQUlFLFlBQVksT0FBdUIsRUFBRSxNQUFzQjtRQUZwRCwwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUEwRDlCLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO1FBQzVDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBekRyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNoQztJQUNILENBQUM7SUFFSyxhQUFhLENBQUMsSUFBYzs7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFFckIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQUE7SUFDSyxVQUFVLENBQUMsUUFBYTs7WUFDNUIsT0FBTztRQUNULENBQUM7S0FBQTtJQUVELFFBQVEsQ0FBQyxRQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFNBQVMsQ0FBQyxRQUFXO1FBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFUyxjQUFjLENBQUMsSUFBWSxFQUFFLElBQWMsRUFBRSxPQUFpQjtRQUN0RSxNQUFNLFVBQVUsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUCxNQUFNLGNBQWMsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxZQUFZO1lBQ2QsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxHQUFHLFVBQVUsR0FBRyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxPQUFpQjtRQUMxQyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE9BQU87aUJBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2lCQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDYixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQy9DLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUc7b0JBQ25ELENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxlQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7QUFVYSxhQUFLLEdBQWlCLFlBQVksQ0FBQyxVQUFVLENBQUM7QUFDOUMsZUFBTyxHQUFhLEVBQUUsQ0FBQztBQWhFdkMsMEJBbUVDO0FBTUQ7SUFBQTtRQVNXLFdBQU0sR0FBYSxLQUFLLENBQUM7SUFDcEMsQ0FBQztDQUFBO0FBVkQsd0JBVUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWdsb2JhbC10c2xpbnQtZGlzYWJsZSBuby1hbnlcbmltcG9ydCB7IGxvZ2dpbmcsIHRlcm1pbmFsIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmRDb25zdHJ1Y3RvciB7XG4gIG5ldyhjb250ZXh0OiBDb21tYW5kQ29udGV4dCwgbG9nZ2VyOiBsb2dnaW5nLkxvZ2dlcik6IENvbW1hbmQ7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgYWxpYXNlczogc3RyaW5nW107XG4gIHNjb3BlOiBDb21tYW5kU2NvcGU7XG59XG5cbmV4cG9ydCBlbnVtIENvbW1hbmRTY29wZSB7XG4gIGV2ZXJ5d2hlcmUsXG4gIGluUHJvamVjdCxcbiAgb3V0c2lkZVByb2plY3QsXG59XG5cbmV4cG9ydCBlbnVtIEFyZ3VtZW50U3RyYXRlZ3kge1xuICBNYXBUb09wdGlvbnMsXG4gIE5vdGhpbmcsXG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21tYW5kPFQgPSBhbnk+IHtcbiAgcHJvdGVjdGVkIF9yYXdBcmdzOiBzdHJpbmdbXTtcbiAgcHVibGljIGFsbG93TWlzc2luZ1dvcmtzcGFjZSA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGNvbnRleHQ6IENvbW1hbmRDb250ZXh0LCBsb2dnZXI6IGxvZ2dpbmcuTG9nZ2VyKSB7XG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIHRoaXMucHJvamVjdCA9IGNvbnRleHQucHJvamVjdDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBpbml0aWFsaXplUmF3KGFyZ3M6IHN0cmluZ1tdKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0aGlzLl9yYXdBcmdzID0gYXJncztcblxuICAgIHJldHVybiBhcmdzO1xuICB9XG4gIGFzeW5jIGluaXRpYWxpemUoX29wdGlvbnM6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhbGlkYXRlKF9vcHRpb25zOiBUKTogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpbnRIZWxwKF9vcHRpb25zOiBUKTogdm9pZCB7XG4gICAgdGhpcy5wcmludEhlbHBVc2FnZSh0aGlzLm5hbWUsIHRoaXMuYXJndW1lbnRzLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMucHJpbnRIZWxwT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHByaW50SGVscFVzYWdlKG5hbWU6IHN0cmluZywgYXJnczogc3RyaW5nW10sIG9wdGlvbnM6IE9wdGlvbltdKSB7XG4gICAgY29uc3QgYXJnRGlzcGxheSA9IGFyZ3MgJiYgYXJncy5sZW5ndGggPiAwXG4gICAgICA/ICcgJyArIGFyZ3MubWFwKGEgPT4gYDwke2F9PmApLmpvaW4oJyAnKVxuICAgICAgOiAnJztcbiAgICBjb25zdCBvcHRpb25zRGlzcGxheSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5sZW5ndGggPiAwXG4gICAgICA/IGAgW29wdGlvbnNdYFxuICAgICAgOiBgYDtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKGB1c2FnZTogbmcgJHtuYW1lfSR7YXJnRGlzcGxheX0ke29wdGlvbnNEaXNwbGF5fWApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHByaW50SGVscE9wdGlvbnMob3B0aW9uczogT3B0aW9uW10pIHtcbiAgICBpZiAob3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgb3B0aW9uczpgKTtcbiAgICAgIHRoaXMub3B0aW9uc1xuICAgICAgICAuZmlsdGVyKG8gPT4gIW8uaGlkZGVuKVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5uYW1lID49IGIubmFtZSA/IDEgOiAtMSlcbiAgICAgICAgLmZvckVhY2gobyA9PiB7XG4gICAgICAgIGNvbnN0IGFsaWFzZXMgPSBvLmFsaWFzZXMgJiYgby5hbGlhc2VzLmxlbmd0aCA+IDBcbiAgICAgICAgICA/ICcoJyArIG8uYWxpYXNlcy5tYXAoYSA9PiBgLSR7YX1gKS5qb2luKCcgJykgKyAnKSdcbiAgICAgICAgICA6ICcnO1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGAgICR7dGVybWluYWwuY3lhbignLS0nICsgby5uYW1lKX0gJHthbGlhc2VzfWApO1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGAgICAgJHtvLmRlc2NyaXB0aW9ufWApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYWJzdHJhY3QgcnVuKG9wdGlvbnM6IFQpOiBudW1iZXIgfCB2b2lkIHwgUHJvbWlzZTxudW1iZXIgfCB2b2lkPjtcbiAgYWJzdHJhY3QgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICBhYnN0cmFjdCByZWFkb25seSBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBhYnN0cmFjdCByZWFkb25seSBhcmd1bWVudHM6IHN0cmluZ1tdO1xuICBhYnN0cmFjdCByZWFkb25seSBvcHRpb25zOiBPcHRpb25bXTtcbiAgcHVibGljIGFyZ1N0cmF0ZWd5ID0gQXJndW1lbnRTdHJhdGVneS5NYXBUb09wdGlvbnM7XG4gIHB1YmxpYyBoaWRkZW4gPSBmYWxzZTtcbiAgcHVibGljIHVua25vd24gPSBmYWxzZTtcbiAgcHVibGljIHN0YXRpYyBzY29wZTogQ29tbWFuZFNjb3BlID0gQ29tbWFuZFNjb3BlLmV2ZXJ5d2hlcmU7XG4gIHB1YmxpYyBzdGF0aWMgYWxpYXNlczogc3RyaW5nW10gPSBbXTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGxvZ2dlcjogbG9nZ2luZy5Mb2dnZXI7XG4gIHByb3RlY3RlZCByZWFkb25seSBwcm9qZWN0OiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWFuZENvbnRleHQge1xuICBwcm9qZWN0OiBhbnk7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPcHRpb24ge1xuICBhYnN0cmFjdCByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIGFic3RyYWN0IHJlYWRvbmx5IGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGRlZmF1bHQ/OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xuICByZWFkb25seSByZXF1aXJlZD86IGJvb2xlYW47XG4gIGFic3RyYWN0IHJlYWRvbmx5IGFsaWFzZXM/OiBzdHJpbmdbXTtcbiAgYWJzdHJhY3QgcmVhZG9ubHkgdHlwZTogYW55O1xuICByZWFkb25seSBmb3JtYXQ/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IHZhbHVlcz86IGFueVtdO1xuICByZWFkb25seSBoaWRkZW4/OiBib29sZWFuID0gZmFsc2U7XG59XG4iXX0=