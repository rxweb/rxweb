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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvd29ya2Zsb3cvYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUFrRTtBQUNsRSwrQkFBbUU7QUFDbkUsOENBQTJGO0FBQzNGLHNDQUF3RDtBQUN4RCxzREFBdUU7QUFDdkUsd0NBQTZDO0FBQzdDLDJDQUF5RDtBQUN6RCx1Q0FBd0M7QUFDeEMsaURBQTZDO0FBRTdDLDJDQUEwQztBQWtCMUM7Ozs7Ozs7Ozs7R0FVRztBQUNIO0lBZUUsWUFBWSxPQUE0QjtRQVI5QixjQUFTLEdBQXlCLElBQUksY0FBTyxFQUFFLENBQUM7UUFDaEQsZUFBVSxHQUE0QixJQUFJLGNBQU8sRUFBRSxDQUFDO1FBUTVELElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksYUFBTSxDQUFDLGtCQUFrQixDQUFDLHlCQUFlLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksd0JBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztTQUN6RTtRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxPQUFPLENBQ0wsT0FBNkU7UUFFN0UsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDekM7UUFFRCwrQ0FBK0M7UUFDL0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckUsb0VBQW9FO1FBQ3BFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZO2VBQ3BDLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxVQUFVLEtBQUssT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUU5RSxxRkFBcUY7UUFDckYsMkZBQTJGO1FBQzNGLGlDQUFpQztRQUNqQyxNQUFNLFVBQVUsR0FBRyxJQUFJLG1CQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFckQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFFakQsTUFBTSxPQUFPLHFCQUNSLE9BQU8sSUFDVixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQzdCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLGNBQU8sQ0FBQyxVQUFVLEVBQUUsRUFDN0YsYUFBYSxHQUNkLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1QixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQ25CLE9BQU8sQ0FBQyxPQUFPLEVBQ2YsU0FBRSxDQUFDLElBQUksb0JBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDNUIsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUMzQixDQUFDLElBQUksQ0FDSixlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzNCLHFCQUFTLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRTtZQUN2QixPQUFPLGFBQU0sQ0FDWCxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBYyxFQUFFLENBQUMsRUFDOUMsU0FBRSxDQUFDLElBQUksQ0FBQyxDQUNULENBQUM7UUFDSixDQUFDLENBQUMsRUFDRixxQkFBUyxDQUFDLENBQUMsSUFBVSxFQUFFLEVBQUU7WUFDdkIsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDL0IsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxpQkFBVSxDQUFDLElBQUkseUNBQTZCLEVBQUUsQ0FBQyxDQUFDO2FBQ3hEO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixPQUFPLFNBQUUsRUFBRSxDQUFDO2FBQ2I7WUFFRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUFjLEVBQUUsRUFBRSxnQkFBSSxFQUFFLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsRUFDRixxQkFBUyxDQUFDLEdBQUcsRUFBRTtZQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsT0FBTyxTQUFFLEVBQUUsQ0FBQzthQUNiO1lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1lBRW5ELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtpQkFDbkMsSUFBSSxDQUNILGVBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUN6RSwwQkFBYyxFQUFFLEVBQ2hCLGdCQUFJLEVBQUUsQ0FDUCxDQUFDO1FBQ04sQ0FBQyxDQUFDLEVBQ0YsZUFBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFFcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7aUJBQ3ZDO1lBQ0gsQ0FBQyxFQUFDLENBQUMsQ0FDTixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBbklELG9DQW1JQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IGxvZ2dpbmcsIHNjaGVtYSwgdmlydHVhbEZzIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgY29uY2F0LCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY29uY2F0TWFwLCBkZWZhdWx0SWZFbXB0eSwgaWdub3JlRWxlbWVudHMsIGxhc3QsIG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRW5naW5lSG9zdCwgU2NoZW1hdGljRW5naW5lIH0gZnJvbSAnLi4vZW5naW5lJztcbmltcG9ydCB7IFVuc3VjY2Vzc2Z1bFdvcmtmbG93RXhlY3V0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9uL2V4Y2VwdGlvbic7XG5pbXBvcnQgeyBzdGFuZGFyZEZvcm1hdHMgfSBmcm9tICcuLi9mb3JtYXRzJztcbmltcG9ydCB7IERyeVJ1bkV2ZW50LCBEcnlSdW5TaW5rIH0gZnJvbSAnLi4vc2luay9kcnlydW4nO1xuaW1wb3J0IHsgSG9zdFNpbmsgfSBmcm9tICcuLi9zaW5rL2hvc3QnO1xuaW1wb3J0IHsgSG9zdFRyZWUgfSBmcm9tICcuLi90cmVlL2hvc3QtdHJlZSc7XG5pbXBvcnQgeyBUcmVlIH0gZnJvbSAnLi4vdHJlZS9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgb3B0aW1pemUgfSBmcm9tICcuLi90cmVlL3N0YXRpYyc7XG5pbXBvcnQge1xuICBMaWZlQ3ljbGVFdmVudCxcbiAgUmVxdWlyZWRXb3JrZmxvd0V4ZWN1dGlvbkNvbnRleHQsXG4gIFdvcmtmbG93LFxuICBXb3JrZmxvd0V4ZWN1dGlvbkNvbnRleHQsXG59IGZyb20gJy4vaW50ZXJmYWNlJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VXb3JrZmxvd09wdGlvbnMge1xuICBob3N0OiB2aXJ0dWFsRnMuSG9zdDtcbiAgZW5naW5lSG9zdDogRW5naW5lSG9zdDx7fSwge30+O1xuICByZWdpc3RyeT86IHNjaGVtYS5Db3JlU2NoZW1hUmVnaXN0cnk7XG5cbiAgZm9yY2U/OiBib29sZWFuO1xuICBkcnlSdW4/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIHdvcmtmbG93cy4gRXZlbiB3aXRob3V0IGFic3RyYWN0IG1ldGhvZHMsIHRoaXMgY2xhc3Mgc2hvdWxkIG5vdCBiZSB1c2VkIHdpdGhvdXRcbiAqIHN1cnJvdW5kaW5nIHNvbWUgaW5pdGlhbGl6YXRpb24gZm9yIHRoZSByZWdpc3RyeSBhbmQgaG9zdC4gVGhpcyBjbGFzcyBvbmx5IGFkZHMgbGlmZSBjeWNsZSBhbmRcbiAqIGRyeXJ1bi9mb3JjZSBzdXBwb3J0LiBZb3UgbmVlZCB0byBwcm92aWRlIGFueSByZWdpc3RyeSBhbmQgdGFzayBleGVjdXRvcnMgdGhhdCB5b3UgbmVlZCB0b1xuICogc3VwcG9ydC5cbiAqIFNlZSB7QHNlZSBOb2RlV29ya2Zsb3d9IGltcGxlbWVudGF0aW9uIGZvciBob3cgdG8gbWFrZSBhIHNwZWNpYWxpemVkIHN1YmNsYXNzIG9mIHRoaXMuXG4gKiBUT0RPOiBhZGQgZGVmYXVsdCBzZXQgb2YgQ29yZVNjaGVtYVJlZ2lzdHJ5IHRyYW5zZm9ybXMuIE9uY2UgdGhlIGpvYiByZWZhY3RvciBpcyBkb25lLCB1c2UgdGhhdFxuICogICAgICAgYXMgdGhlIHN1cHBvcnQgZm9yIHRhc2tzLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VXb3JrZmxvdyBpbXBsZW1lbnRzIFdvcmtmbG93IHtcbiAgcHJvdGVjdGVkIF9lbmdpbmU6IFNjaGVtYXRpY0VuZ2luZTx7fSwge30+O1xuICBwcm90ZWN0ZWQgX2VuZ2luZUhvc3Q6IEVuZ2luZUhvc3Q8e30sIHt9PjtcbiAgcHJvdGVjdGVkIF9yZWdpc3RyeTogc2NoZW1hLkNvcmVTY2hlbWFSZWdpc3RyeTtcblxuICBwcm90ZWN0ZWQgX2hvc3Q6IHZpcnR1YWxGcy5Ib3N0O1xuXG4gIHByb3RlY3RlZCBfcmVwb3J0ZXI6IFN1YmplY3Q8RHJ5UnVuRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJvdGVjdGVkIF9saWZlQ3ljbGU6IFN1YmplY3Q8TGlmZUN5Y2xlRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBwcm90ZWN0ZWQgX2NvbnRleHQ6IFdvcmtmbG93RXhlY3V0aW9uQ29udGV4dFtdO1xuXG4gIHByb3RlY3RlZCBfZm9yY2U6IGJvb2xlYW47XG4gIHByb3RlY3RlZCBfZHJ5UnVuOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEJhc2VXb3JrZmxvd09wdGlvbnMpIHtcbiAgICB0aGlzLl9ob3N0ID0gb3B0aW9ucy5ob3N0O1xuICAgIHRoaXMuX2VuZ2luZUhvc3QgPSBvcHRpb25zLmVuZ2luZUhvc3Q7XG4gICAgdGhpcy5fcmVnaXN0cnkgPSBvcHRpb25zLnJlZ2lzdHJ5IHx8IG5ldyBzY2hlbWEuQ29yZVNjaGVtYVJlZ2lzdHJ5KHN0YW5kYXJkRm9ybWF0cyk7XG4gICAgdGhpcy5fZW5naW5lID0gbmV3IFNjaGVtYXRpY0VuZ2luZSh0aGlzLl9lbmdpbmVIb3N0LCB0aGlzKTtcblxuICAgIHRoaXMuX2NvbnRleHQgPSBbXTtcblxuICAgIHRoaXMuX2ZvcmNlID0gb3B0aW9ucy5mb3JjZSB8fCBmYWxzZTtcbiAgICB0aGlzLl9kcnlSdW4gPSBvcHRpb25zLmRyeVJ1biB8fCBmYWxzZTtcbiAgfVxuXG4gIGdldCBjb250ZXh0KCk6IFJlYWRvbmx5PFdvcmtmbG93RXhlY3V0aW9uQ29udGV4dD4ge1xuICAgIGNvbnN0IG1heWJlQ29udGV4dCA9IHRoaXMuX2NvbnRleHRbdGhpcy5fY29udGV4dC5sZW5ndGggLSAxXTtcbiAgICBpZiAoIW1heWJlQ29udGV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZ2V0IGNvbnRleHQgd2hlbiB3b3JrZmxvdyBpcyBub3QgZXhlY3V0aW5nLi4uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heWJlQ29udGV4dDtcbiAgfVxuICBnZXQgcmVnaXN0cnkoKTogc2NoZW1hLlNjaGVtYVJlZ2lzdHJ5IHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnk7XG4gIH1cbiAgZ2V0IHJlcG9ydGVyKCk6IE9ic2VydmFibGU8RHJ5UnVuRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0ZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbiAgZ2V0IGxpZmVDeWNsZSgpOiBPYnNlcnZhYmxlPExpZmVDeWNsZUV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpZmVDeWNsZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGV4ZWN1dGUoXG4gICAgb3B0aW9uczogUGFydGlhbDxXb3JrZmxvd0V4ZWN1dGlvbkNvbnRleHQ+ICYgUmVxdWlyZWRXb3JrZmxvd0V4ZWN1dGlvbkNvbnRleHQsXG4gICk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGNvbnN0IHBhcmVudENvbnRleHQgPSB0aGlzLl9jb250ZXh0W3RoaXMuX2NvbnRleHQubGVuZ3RoIC0gMV07XG5cbiAgICBpZiAoIXBhcmVudENvbnRleHQpIHtcbiAgICAgIHRoaXMuX2xpZmVDeWNsZS5uZXh0KHsga2luZDogJ3N0YXJ0JyB9KTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlIHRoZSBjb2xsZWN0aW9uIGFuZCB0aGUgc2NoZW1hdGljLiAqL1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9lbmdpbmUuY3JlYXRlQ29sbGVjdGlvbihvcHRpb25zLmNvbGxlY3Rpb24pO1xuICAgIC8vIE9ubHkgYWxsb3cgcHJpdmF0ZSBzY2hlbWF0aWNzIGlmIGNhbGxlZCBmcm9tIHRoZSBzYW1lIGNvbGxlY3Rpb24uXG4gICAgY29uc3QgYWxsb3dQcml2YXRlID0gb3B0aW9ucy5hbGxvd1ByaXZhdGVcbiAgICAgIHx8IChwYXJlbnRDb250ZXh0ICYmIHBhcmVudENvbnRleHQuY29sbGVjdGlvbiA9PT0gb3B0aW9ucy5jb2xsZWN0aW9uKTtcbiAgICBjb25zdCBzY2hlbWF0aWMgPSBjb2xsZWN0aW9uLmNyZWF0ZVNjaGVtYXRpYyhvcHRpb25zLnNjaGVtYXRpYywgYWxsb3dQcml2YXRlKTtcblxuICAgIC8vIFdlIG5lZWQgdHdvIHNpbmtzIGlmIHdlIHdhbnQgdG8gb3V0cHV0IHdoYXQgd2lsbCBoYXBwZW4sIGFuZCBhY3R1YWxseSBkbyB0aGUgd29yay5cbiAgICAvLyBOb3RlIHRoYXQgZnNTaW5rIGlzIHRlY2huaWNhbGx5IG5vdCB1c2VkIGlmIGAtLWRyeS1ydW5gIGlzIHBhc3NlZCwgYnV0IGNyZWF0aW5nIHRoZSBTaW5rXG4gICAgLy8gZG9lcyBub3QgaGF2ZSBhbnkgc2lkZSBlZmZlY3QuXG4gICAgY29uc3QgZHJ5UnVuU2luayA9IG5ldyBEcnlSdW5TaW5rKHRoaXMuX2hvc3QsIHRoaXMuX2ZvcmNlKTtcbiAgICBjb25zdCBmc1NpbmsgPSBuZXcgSG9zdFNpbmsodGhpcy5faG9zdCwgdGhpcy5fZm9yY2UpO1xuXG4gICAgbGV0IGVycm9yID0gZmFsc2U7XG4gICAgY29uc3QgZHJ5UnVuU3Vic2NyaWJlciA9IGRyeVJ1blNpbmsucmVwb3J0ZXIuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIHRoaXMuX3JlcG9ydGVyLm5leHQoZXZlbnQpO1xuICAgICAgZXJyb3IgPSBlcnJvciB8fCAoZXZlbnQua2luZCA9PSAnZXJyb3InKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2xpZmVDeWNsZS5uZXh0KHsga2luZDogJ3dvcmtmbG93LXN0YXJ0JyB9KTtcblxuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgZGVidWc6IG9wdGlvbnMuZGVidWcgfHwgZmFsc2UsXG4gICAgICBsb2dnZXI6IG9wdGlvbnMubG9nZ2VyIHx8IChwYXJlbnRDb250ZXh0ICYmIHBhcmVudENvbnRleHQubG9nZ2VyKSB8fCBuZXcgbG9nZ2luZy5OdWxsTG9nZ2VyKCksXG4gICAgICBwYXJlbnRDb250ZXh0LFxuICAgIH07XG4gICAgdGhpcy5fY29udGV4dC5wdXNoKGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIHNjaGVtYXRpYy5jYWxsKFxuICAgICAgb3B0aW9ucy5vcHRpb25zLFxuICAgICAgb2YobmV3IEhvc3RUcmVlKHRoaXMuX2hvc3QpKSxcbiAgICAgIHsgbG9nZ2VyOiBjb250ZXh0LmxvZ2dlciB9LFxuICAgICkucGlwZShcbiAgICAgIG1hcCh0cmVlID0+IG9wdGltaXplKHRyZWUpKSxcbiAgICAgIGNvbmNhdE1hcCgodHJlZTogVHJlZSkgPT4ge1xuICAgICAgICByZXR1cm4gY29uY2F0KFxuICAgICAgICAgIGRyeVJ1blNpbmsuY29tbWl0KHRyZWUpLnBpcGUoaWdub3JlRWxlbWVudHMoKSksXG4gICAgICAgICAgb2YodHJlZSksXG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICAgIGNvbmNhdE1hcCgodHJlZTogVHJlZSkgPT4ge1xuICAgICAgICBkcnlSdW5TdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBVbnN1Y2Nlc3NmdWxXb3JrZmxvd0V4ZWN1dGlvbigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9kcnlSdW4pIHtcbiAgICAgICAgICByZXR1cm4gb2YoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmc1NpbmsuY29tbWl0KHRyZWUpLnBpcGUoZGVmYXVsdElmRW1wdHkoKSwgbGFzdCgpKTtcbiAgICAgIH0pLFxuICAgICAgY29uY2F0TWFwKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2RyeVJ1bikge1xuICAgICAgICAgIHJldHVybiBvZigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGlmZUN5Y2xlLm5leHQoeyBraW5kOiAncG9zdC10YXNrcy1zdGFydCcgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZ2luZS5leGVjdXRlUG9zdFRhc2tzKClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcCh7IGNvbXBsZXRlOiAoKSA9PiB0aGlzLl9saWZlQ3ljbGUubmV4dCh7IGtpbmQ6ICdwb3N0LXRhc2tzLWVuZCcgfSkgfSksXG4gICAgICAgICAgICBkZWZhdWx0SWZFbXB0eSgpLFxuICAgICAgICAgICAgbGFzdCgpLFxuICAgICAgICAgICk7XG4gICAgICB9KSxcbiAgICAgIHRhcCh7IGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fbGlmZUN5Y2xlLm5leHQoeyBraW5kOiAnd29ya2Zsb3ctZW5kJyB9KTtcbiAgICAgICAgICB0aGlzLl9jb250ZXh0LnBvcCgpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX2NvbnRleHQubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xpZmVDeWNsZS5uZXh0KHsga2luZDogJ2VuZCcgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9fSksXG4gICAgKTtcbiAgfVxufVxuIl19