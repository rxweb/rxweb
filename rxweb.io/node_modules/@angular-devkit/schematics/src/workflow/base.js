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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const engine_1 = require("../engine");
const exception_1 = require("../exception/exception");
const formats_1 = require("../formats");
const dryrun_1 = require("../sink/dryrun");
const host_1 = require("../sink/host");
const host_tree_1 = require("../tree/host-tree");
const static_1 = require("../tree/static");
/**
 * Base class for workflows. Even without abstract methods, this class should not be used without
 * surrounding some initialization for the registry and host. This class only adds life cycle and
 * dryrun/force support. You need to provide any registry and task executors that you need to
 * support.
 * See {@see NodeWorkflow} implementation for how to make a specialized subclass of this.
 * TODO: add default set of CoreSchemaRegistry transforms. Once the job refactor is done, use that
 *       as the support for tasks.
 *
 * @public
 */
class BaseWorkflow {
    constructor(options) {
        this._reporter = new rxjs_1.Subject();
        this._lifeCycle = new rxjs_1.Subject();
        this._host = options.host;
        this._engineHost = options.engineHost;
        this._registry = options.registry || new core_1.schema.CoreSchemaRegistry(formats_1.standardFormats);
        this._engine = new engine_1.SchematicEngine(this._engineHost, this);
        this._context = [];
        this._force = options.force || false;
        this._dryRun = options.dryRun || false;
    }
    get context() {
        const maybeContext = this._context[this._context.length - 1];
        if (!maybeContext) {
            throw new Error('Cannot get context when workflow is not executing...');
        }
        return maybeContext;
    }
    get registry() {
        return this._registry;
    }
    get reporter() {
        return this._reporter.asObservable();
    }
    get lifeCycle() {
        return this._lifeCycle.asObservable();
    }
    execute(options) {
        const parentContext = this._context[this._context.length - 1];
        if (!parentContext) {
            this._lifeCycle.next({ kind: 'start' });
        }
        /** Create the collection and the schematic. */
        const collection = this._engine.createCollection(options.collection);
        // Only allow private schematics if called from the same collection.
        const allowPrivate = options.allowPrivate
            || (parentContext && parentContext.collection === options.collection);
        const schematic = collection.createSchematic(options.schematic, allowPrivate);
        // We need two sinks if we want to output what will happen, and actually do the work.
        // Note that fsSink is technically not used if `--dry-run` is passed, but creating the Sink
        // does not have any side effect.
        const dryRunSink = new dryrun_1.DryRunSink(this._host, this._force);
        const fsSink = new host_1.HostSink(this._host, this._force);
        let error = false;
        const dryRunSubscriber = dryRunSink.reporter.subscribe(event => {
            this._reporter.next(event);
            error = error || (event.kind == 'error');
        });
        this._lifeCycle.next({ kind: 'workflow-start' });
        const context = Object.assign({}, options, { debug: options.debug || false, logger: options.logger || (parentContext && parentContext.logger) || new core_1.logging.NullLogger(), parentContext });
        this._context.push(context);
        return schematic.call(options.options, rxjs_1.of(new host_tree_1.HostTree(this._host)), { logger: context.logger }).pipe(operators_1.map(tree => static_1.optimize(tree)), operators_1.concatMap((tree) => {
            return rxjs_1.concat(dryRunSink.commit(tree).pipe(operators_1.ignoreElements()), rxjs_1.of(tree));
        }), operators_1.concatMap((tree) => {
            dryRunSubscriber.unsubscribe();
            if (error) {
                return rxjs_1.throwError(new exception_1.UnsuccessfulWorkflowExecution());
            }
            if (this._dryRun) {
                return rxjs_1.of();
            }
            return fsSink.commit(tree).pipe(operators_1.defaultIfEmpty(), operators_1.last());
        }), operators_1.concatMap(() => {
            if (this._dryRun) {
                return rxjs_1.of();
            }
            this._lifeCycle.next({ kind: 'post-tasks-start' });
            return this._engine.executePostTasks()
                .pipe(operators_1.tap({ complete: () => this._lifeCycle.next({ kind: 'post-tasks-end' }) }), operators_1.defaultIfEmpty(), operators_1.last());
        }), operators_1.tap({ complete: () => {
                this._lifeCycle.next({ kind: 'workflow-end' });
                this._context.pop();
                if (this._context.length == 0) {
                    this._lifeCycle.next({ kind: 'end' });
                }
            } }));
    }
}
exports.BaseWorkflow = BaseWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvd29ya2Zsb3cvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUFrRTtBQUNsRSwrQkFBbUU7QUFDbkUsOENBQTJGO0FBQzNGLHNDQUF3RDtBQUN4RCxzREFBdUU7QUFDdkUsd0NBQTZDO0FBQzdDLDJDQUF5RDtBQUN6RCx1Q0FBd0M7QUFDeEMsaURBQTZDO0FBRTdDLDJDQUEwQztBQWtCMUM7Ozs7Ozs7Ozs7R0FVRztBQUNIO0lBZUUsWUFBWSxPQUE0QjtRQVI5QixjQUFTLEdBQXlCLElBQUksY0FBTyxFQUFFLENBQUM7UUFDaEQsZUFBVSxHQUE0QixJQUFJLGNBQU8sRUFBRSxDQUFDO1FBUTVELElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksYUFBTSxDQUFDLGtCQUFrQixDQUFDLHlCQUFlLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksd0JBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0s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LEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUN6RSwwQkFBYyxFQUFFLEVBQ2hCLGdCQUFJLEVBQUUsQ0FDUCxDQUFDO1FBQ04sQ0FBQyxDQUFDLEVBQ0YsZUFBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFFcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNILENBQUMsRUFBQyxDQUFDLENBQ04sQ0FBQztJQUNKLENBQUM7Q0FDRjtBQW5JRCxvQ0FtSUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBsb2dnaW5nLCBzY2hlbWEsIHZpcnR1YWxGcyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIGNvbmNhdCwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgZGVmYXVsdElmRW1wdHksIGlnbm9yZUVsZW1lbnRzLCBsYXN0LCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEVuZ2luZUhvc3QsIFNjaGVtYXRpY0VuZ2luZSB9IGZyb20gJy4uL2VuZ2luZSc7XG5pbXBvcnQgeyBVbnN1Y2Nlc3NmdWxXb3JrZmxvd0V4ZWN1dGlvbiB9IGZyb20gJy4uL2V4Y2VwdGlvbi9leGNlcHRpb24nO1xuaW1wb3J0IHsgc3RhbmRhcmRGb3JtYXRzIH0gZnJvbSAnLi4vZm9ybWF0cyc7XG5pbXBvcnQgeyBEcnlSdW5FdmVudCwgRHJ5UnVuU2luayB9IGZyb20gJy4uL3NpbmsvZHJ5cnVuJztcbmltcG9ydCB7IEhvc3RTaW5rIH0gZnJvbSAnLi4vc2luay9ob3N0JztcbmltcG9ydCB7IEhvc3RUcmVlIH0gZnJvbSAnLi4vdHJlZS9ob3N0LXRyZWUnO1xuaW1wb3J0IHsgVHJlZSB9IGZyb20gJy4uL3RyZWUvaW50ZXJmYWNlJztcbmltcG9ydCB7IG9wdGltaXplIH0gZnJvbSAnLi4vdHJlZS9zdGF0aWMnO1xuaW1wb3J0IHtcbiAgTGlmZUN5Y2xlRXZlbnQsXG4gIFJlcXVpcmVkV29ya2Zsb3dFeGVjdXRpb25Db250ZXh0LFxuICBXb3JrZmxvdyxcbiAgV29ya2Zsb3dFeGVjdXRpb25Db250ZXh0LFxufSBmcm9tICcuL2ludGVyZmFjZSc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBCYXNlV29ya2Zsb3dPcHRpb25zIHtcbiAgaG9zdDogdmlydHVhbEZzLkhvc3Q7XG4gIGVuZ2luZUhvc3Q6IEVuZ2luZUhvc3Q8e30sIHt9PjtcbiAgcmVnaXN0cnk/OiBzY2hlbWEuQ29yZVNjaGVtYVJlZ2lzdHJ5O1xuXG4gIGZvcmNlPzogYm9vbGVhbjtcbiAgZHJ5UnVuPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciB3b3JrZmxvd3MuIEV2ZW4gd2l0aG91dCBhYnN0cmFjdCBtZXRob2RzLCB0aGlzIGNsYXNzIHNob3VsZCBub3QgYmUgdXNlZCB3aXRob3V0XG4gKiBzdXJyb3VuZGluZyBzb21lIGluaXRpYWxpemF0aW9uIGZvciB0aGUgcmVnaXN0cnkgYW5kIGhvc3QuIFRoaXMgY2xhc3Mgb25seSBhZGRzIGxpZmUgY3ljbGUgYW5kXG4gKiBkcnlydW4vZm9yY2Ugc3VwcG9ydC4gWW91IG5lZWQgdG8gcHJvdmlkZSBhbnkgcmVnaXN0cnkgYW5kIHRhc2sgZXhlY3V0b3JzIHRoYXQgeW91IG5lZWQgdG9cbiAqIHN1cHBvcnQuXG4gKiBTZWUge0BzZWUgTm9kZVdvcmtmbG93fSBpbXBsZW1lbnRhdGlvbiBmb3IgaG93IHRvIG1ha2UgYSBzcGVjaWFsaXplZCBzdWJjbGFzcyBvZiB0aGlzLlxuICogVE9ETzogYWRkIGRlZmF1bHQgc2V0IG9mIENvcmVTY2hlbWFSZWdpc3RyeSB0cmFuc2Zvcm1zLiBPbmNlIHRoZSBqb2IgcmVmYWN0b3IgaXMgZG9uZSwgdXNlIHRoYXRcbiAqICAgICAgIGFzIHRoZSBzdXBwb3J0IGZvciB0YXNrcy5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlV29ya2Zsb3cgaW1wbGVtZW50cyBXb3JrZmxvdyB7XG4gIHByb3RlY3RlZCBfZW5naW5lOiBTY2hlbWF0aWNFbmdpbmU8e30sIHt9PjtcbiAgcHJvdGVjdGVkIF9lbmdpbmVIb3N0OiBFbmdpbmVIb3N0PHt9LCB7fT47XG4gIHByb3RlY3RlZCBfcmVnaXN0cnk6IHNjaGVtYS5Db3JlU2NoZW1hUmVnaXN0cnk7XG5cbiAgcHJvdGVjdGVkIF9ob3N0OiB2aXJ0dWFsRnMuSG9zdDtcblxuICBwcm90ZWN0ZWQgX3JlcG9ydGVyOiBTdWJqZWN0PERyeVJ1bkV2ZW50PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByb3RlY3RlZCBfbGlmZUN5Y2xlOiBTdWJqZWN0PExpZmVDeWNsZUV2ZW50PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJvdGVjdGVkIF9jb250ZXh0OiBXb3JrZmxvd0V4ZWN1dGlvbkNvbnRleHRbXTtcblxuICBwcm90ZWN0ZWQgX2ZvcmNlOiBib29sZWFuO1xuICBwcm90ZWN0ZWQgX2RyeVJ1bjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBCYXNlV29ya2Zsb3dPcHRpb25zKSB7XG4gICAgdGhpcy5faG9zdCA9IG9wdGlvbnMuaG9zdDtcbiAgICB0aGlzLl9lbmdpbmVIb3N0ID0gb3B0aW9ucy5lbmdpbmVIb3N0O1xuICAgIHRoaXMuX3JlZ2lzdHJ5ID0gb3B0aW9ucy5yZWdpc3RyeSB8fCBuZXcgc2NoZW1hLkNvcmVTY2hlbWFSZWdpc3RyeShzdGFuZGFyZEZvcm1hdHMpO1xuICAgIHRoaXMuX2VuZ2luZSA9IG5ldyBTY2hlbWF0aWNFbmdpbmUodGhpcy5fZW5naW5lSG9zdCwgdGhpcyk7XG5cbiAgICB0aGlzLl9jb250ZXh0ID0gW107XG5cbiAgICB0aGlzLl9mb3JjZSA9IG9wdGlvbnMuZm9yY2UgfHwgZmFsc2U7XG4gICAgdGhpcy5fZHJ5UnVuID0gb3B0aW9ucy5kcnlSdW4gfHwgZmFsc2U7XG4gIH1cblxuICBnZXQgY29udGV4dCgpOiBSZWFkb25seTxXb3JrZmxvd0V4ZWN1dGlvbkNvbnRleHQ+IHtcbiAgICBjb25zdCBtYXliZUNvbnRleHQgPSB0aGlzLl9jb250ZXh0W3RoaXMuX2NvbnRleHQubGVuZ3RoIC0gMV07XG4gICAgaWYgKCFtYXliZUNvbnRleHQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGdldCBjb250ZXh0IHdoZW4gd29ya2Zsb3cgaXMgbm90IGV4ZWN1dGluZy4uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXliZUNvbnRleHQ7XG4gIH1cbiAgZ2V0IHJlZ2lzdHJ5KCk6IHNjaGVtYS5TY2hlbWFSZWdpc3RyeSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5O1xuICB9XG4gIGdldCByZXBvcnRlcigpOiBPYnNlcnZhYmxlPERyeVJ1bkV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlcG9ydGVyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG4gIGdldCBsaWZlQ3ljbGUoKTogT2JzZXJ2YWJsZTxMaWZlQ3ljbGVFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLl9saWZlQ3ljbGUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBleGVjdXRlKFxuICAgIG9wdGlvbnM6IFBhcnRpYWw8V29ya2Zsb3dFeGVjdXRpb25Db250ZXh0PiAmIFJlcXVpcmVkV29ya2Zsb3dFeGVjdXRpb25Db250ZXh0LFxuICApOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXJlbnRDb250ZXh0ID0gdGhpcy5fY29udGV4dFt0aGlzLl9jb250ZXh0Lmxlbmd0aCAtIDFdO1xuXG4gICAgaWYgKCFwYXJlbnRDb250ZXh0KSB7XG4gICAgICB0aGlzLl9saWZlQ3ljbGUubmV4dCh7IGtpbmQ6ICdzdGFydCcgfSk7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZSB0aGUgY29sbGVjdGlvbiBhbmQgdGhlIHNjaGVtYXRpYy4gKi9cbiAgICBjb25zdCBjb2xsZWN0aW9uID0gdGhpcy5fZW5naW5lLmNyZWF0ZUNvbGxlY3Rpb24ob3B0aW9ucy5jb2xsZWN0aW9uKTtcbiAgICAvLyBPbmx5IGFsbG93IHByaXZhdGUgc2NoZW1hdGljcyBpZiBjYWxsZWQgZnJvbSB0aGUgc2FtZSBjb2xsZWN0aW9uLlxuICAgIGNvbnN0IGFsbG93UHJpdmF0ZSA9IG9wdGlvbnMuYWxsb3dQcml2YXRlXG4gICAgICB8fCAocGFyZW50Q29udGV4dCAmJiBwYXJlbnRDb250ZXh0LmNvbGxlY3Rpb24gPT09IG9wdGlvbnMuY29sbGVjdGlvbik7XG4gICAgY29uc3Qgc2NoZW1hdGljID0gY29sbGVjdGlvbi5jcmVhdGVTY2hlbWF0aWMob3B0aW9ucy5zY2hlbWF0aWMsIGFsbG93UHJpdmF0ZSk7XG5cbiAgICAvLyBXZSBuZWVkIHR3byBzaW5rcyBpZiB3ZSB3YW50IHRvIG91dHB1dCB3aGF0IHdpbGwgaGFwcGVuLCBhbmQgYWN0dWFsbHkgZG8gdGhlIHdvcmsuXG4gICAgLy8gTm90ZSB0aGF0IGZzU2luayBpcyB0ZWNobmljYWxseSBub3QgdXNlZCBpZiBgLS1kcnktcnVuYCBpcyBwYXNzZWQsIGJ1dCBjcmVhdGluZyB0aGUgU2lua1xuICAgIC8vIGRvZXMgbm90IGhhdmUgYW55IHNpZGUgZWZmZWN0LlxuICAgIGNvbnN0IGRyeVJ1blNpbmsgPSBuZXcgRHJ5UnVuU2luayh0aGlzLl9ob3N0LCB0aGlzLl9mb3JjZSk7XG4gICAgY29uc3QgZnNTaW5rID0gbmV3IEhvc3RTaW5rKHRoaXMuX2hvc3QsIHRoaXMuX2ZvcmNlKTtcblxuICAgIGxldCBlcnJvciA9IGZhbHNlO1xuICAgIGNvbnN0IGRyeVJ1blN1YnNjcmliZXIgPSBkcnlSdW5TaW5rLnJlcG9ydGVyLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICB0aGlzLl9yZXBvcnRlci5uZXh0KGV2ZW50KTtcbiAgICAgIGVycm9yID0gZXJyb3IgfHwgKGV2ZW50LmtpbmQgPT0gJ2Vycm9yJyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9saWZlQ3ljbGUubmV4dCh7IGtpbmQ6ICd3b3JrZmxvdy1zdGFydCcgfSk7XG5cbiAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGRlYnVnOiBvcHRpb25zLmRlYnVnIHx8IGZhbHNlLFxuICAgICAgbG9nZ2VyOiBvcHRpb25zLmxvZ2dlciB8fCAocGFyZW50Q29udGV4dCAmJiBwYXJlbnRDb250ZXh0LmxvZ2dlcikgfHwgbmV3IGxvZ2dpbmcuTnVsbExvZ2dlcigpLFxuICAgICAgcGFyZW50Q29udGV4dCxcbiAgICB9O1xuICAgIHRoaXMuX2NvbnRleHQucHVzaChjb250ZXh0KTtcblxuICAgIHJldHVybiBzY2hlbWF0aWMuY2FsbChcbiAgICAgIG9wdGlvbnMub3B0aW9ucyxcbiAgICAgIG9mKG5ldyBIb3N0VHJlZSh0aGlzLl9ob3N0KSksXG4gICAgICB7IGxvZ2dlcjogY29udGV4dC5sb2dnZXIgfSxcbiAgICApLnBpcGUoXG4gICAgICBtYXAodHJlZSA9PiBvcHRpbWl6ZSh0cmVlKSksXG4gICAgICBjb25jYXRNYXAoKHRyZWU6IFRyZWUpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbmNhdChcbiAgICAgICAgICBkcnlSdW5TaW5rLmNvbW1pdCh0cmVlKS5waXBlKGlnbm9yZUVsZW1lbnRzKCkpLFxuICAgICAgICAgIG9mKHRyZWUpLFxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICBjb25jYXRNYXAoKHRyZWU6IFRyZWUpID0+IHtcbiAgICAgICAgZHJ5UnVuU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgVW5zdWNjZXNzZnVsV29ya2Zsb3dFeGVjdXRpb24oKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZHJ5UnVuKSB7XG4gICAgICAgICAgcmV0dXJuIG9mKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnNTaW5rLmNvbW1pdCh0cmVlKS5waXBlKGRlZmF1bHRJZkVtcHR5KCksIGxhc3QoKSk7XG4gICAgICB9KSxcbiAgICAgIGNvbmNhdE1hcCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9kcnlSdW4pIHtcbiAgICAgICAgICByZXR1cm4gb2YoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xpZmVDeWNsZS5uZXh0KHsga2luZDogJ3Bvc3QtdGFza3Mtc3RhcnQnIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmdpbmUuZXhlY3V0ZVBvc3RUYXNrcygpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB0YXAoeyBjb21wbGV0ZTogKCkgPT4gdGhpcy5fbGlmZUN5Y2xlLm5leHQoeyBraW5kOiAncG9zdC10YXNrcy1lbmQnIH0pIH0pLFxuICAgICAgICAgICAgZGVmYXVsdElmRW1wdHkoKSxcbiAgICAgICAgICAgIGxhc3QoKSxcbiAgICAgICAgICApO1xuICAgICAgfSksXG4gICAgICB0YXAoeyBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2xpZmVDeWNsZS5uZXh0KHsga2luZDogJ3dvcmtmbG93LWVuZCcgfSk7XG4gICAgICAgICAgdGhpcy5fY29udGV4dC5wb3AoKTtcblxuICAgICAgICAgIGlmICh0aGlzLl9jb250ZXh0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9saWZlQ3ljbGUubmV4dCh7IGtpbmQ6ICdlbmQnIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfX0pLFxuICAgICk7XG4gIH1cbn1cbiJdfQ==