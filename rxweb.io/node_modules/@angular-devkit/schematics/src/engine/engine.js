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
const interface_1 = require("../tree/interface");
const null_1 = require("../tree/null");
const static_1 = require("../tree/static");
const schematic_1 = require("./schematic");
class UnknownUrlSourceProtocol extends core_1.BaseException {
    constructor(url) { super(`Unknown Protocol on url "${url}".`); }
}
exports.UnknownUrlSourceProtocol = UnknownUrlSourceProtocol;
class UnknownCollectionException extends core_1.BaseException {
    constructor(name) { super(`Unknown collection "${name}".`); }
}
exports.UnknownCollectionException = UnknownCollectionException;
class CircularCollectionException extends core_1.BaseException {
    constructor(name) {
        super(`Circular collection reference "${name}".`);
    }
}
exports.CircularCollectionException = CircularCollectionException;
class UnknownSchematicException extends core_1.BaseException {
    constructor(name, collection) {
        super(`Schematic "${name}" not found in collection "${collection.name}".`);
    }
}
exports.UnknownSchematicException = UnknownSchematicException;
class PrivateSchematicException extends core_1.BaseException {
    constructor(name, collection) {
        super(`Schematic "${name}" not found in collection "${collection.name}".`);
    }
}
exports.PrivateSchematicException = PrivateSchematicException;
class SchematicEngineConflictingException extends core_1.BaseException {
    constructor() { super(`A schematic was called from a different engine as its parent.`); }
}
exports.SchematicEngineConflictingException = SchematicEngineConflictingException;
class UnregisteredTaskException extends core_1.BaseException {
    constructor(name, schematic) {
        const addendum = schematic ? ` in schematic "${schematic.name}"` : '';
        super(`Unregistered task "${name}"${addendum}.`);
    }
}
exports.UnregisteredTaskException = UnregisteredTaskException;
class UnknownTaskDependencyException extends core_1.BaseException {
    constructor(id) {
        super(`Unknown task dependency [ID: ${id.id}].`);
    }
}
exports.UnknownTaskDependencyException = UnknownTaskDependencyException;
class CollectionImpl {
    constructor(_description, _engine, baseDescriptions) {
        this._description = _description;
        this._engine = _engine;
        this.baseDescriptions = baseDescriptions;
    }
    get description() { return this._description; }
    get name() { return this.description.name || '<unknown>'; }
    createSchematic(name, allowPrivate = false) {
        return this._engine.createSchematic(name, this, allowPrivate);
    }
    listSchematicNames() {
        return this._engine.listSchematicNames(this);
    }
}
exports.CollectionImpl = CollectionImpl;
class TaskScheduler {
    constructor(_context) {
        this._context = _context;
        this._queue = new core_1.PriorityQueue((x, y) => x.priority - y.priority);
        this._taskIds = new Map();
    }
    _calculatePriority(dependencies) {
        if (dependencies.size === 0) {
            return 0;
        }
        const prio = [...dependencies].reduce((prio, task) => prio + task.priority, 1);
        return prio;
    }
    _mapDependencies(dependencies) {
        if (!dependencies) {
            return new Set();
        }
        const tasks = dependencies.map(dep => {
            const task = this._taskIds.get(dep);
            if (!task) {
                throw new UnknownTaskDependencyException(dep);
            }
            return task;
        });
        return new Set(tasks);
    }
    schedule(taskConfiguration) {
        const dependencies = this._mapDependencies(taskConfiguration.dependencies);
        const priority = this._calculatePriority(dependencies);
        const task = {
            id: TaskScheduler._taskIdCounter++,
            priority,
            configuration: taskConfiguration,
            context: this._context,
        };
        this._queue.push(task);
        const id = { id: task.id };
        this._taskIds.set(id, task);
        return id;
    }
    finalize() {
        const tasks = this._queue.toArray();
        this._queue.clear();
        this._taskIds.clear();
        return tasks;
    }
}
TaskScheduler._taskIdCounter = 1;
exports.TaskScheduler = TaskScheduler;
class SchematicEngine {
    constructor(_host, _workflow) {
        this._host = _host;
        this._workflow = _workflow;
        this._collectionCache = new Map();
        this._schematicCache = new Map();
        this._taskSchedulers = new Array();
    }
    get workflow() { return this._workflow || null; }
    get defaultMergeStrategy() { return this._host.defaultMergeStrategy || interface_1.MergeStrategy.Default; }
    createCollection(name) {
        let collection = this._collectionCache.get(name);
        if (collection) {
            return collection;
        }
        const [description, bases] = this._createCollectionDescription(name);
        collection = new CollectionImpl(description, this, bases);
        this._collectionCache.set(name, collection);
        this._schematicCache.set(name, new Map());
        return collection;
    }
    _createCollectionDescription(name, parentNames) {
        const description = this._host.createCollectionDescription(name);
        if (!description) {
            throw new UnknownCollectionException(name);
        }
        if (parentNames && parentNames.has(description.name)) {
            throw new CircularCollectionException(name);
        }
        const bases = new Array();
        if (description.extends) {
            parentNames = (parentNames || new Set()).add(description.name);
            for (const baseName of description.extends) {
                const [base, baseBases] = this._createCollectionDescription(baseName, new Set(parentNames));
                bases.unshift(base, ...baseBases);
            }
        }
        return [description, bases];
    }
    createContext(schematic, parent) {
        // Check for inconsistencies.
        if (parent && parent.engine && parent.engine !== this) {
            throw new SchematicEngineConflictingException();
        }
        let context = {
            debug: parent && parent.debug || false,
            engine: this,
            logger: (parent && parent.logger && parent.logger.createChild(schematic.description.name))
                || new core_1.logging.NullLogger(),
            schematic,
            strategy: (parent && parent.strategy !== undefined)
                ? parent.strategy : this.defaultMergeStrategy,
            addTask,
        };
        const maybeNewContext = this._host.transformContext(context);
        if (maybeNewContext) {
            context = maybeNewContext;
        }
        const taskScheduler = new TaskScheduler(context);
        const host = this._host;
        this._taskSchedulers.push(taskScheduler);
        function addTask(task, dependencies) {
            const config = task.toConfiguration();
            if (!host.hasTaskExecutor(config.name)) {
                throw new UnregisteredTaskException(config.name, schematic.description);
            }
            config.dependencies = config.dependencies || [];
            if (dependencies) {
                config.dependencies.unshift(...dependencies);
            }
            return taskScheduler.schedule(config);
        }
        return context;
    }
    createSchematic(name, collection, allowPrivate = false) {
        const collectionImpl = this._collectionCache.get(collection.description.name);
        const schematicMap = this._schematicCache.get(collection.description.name);
        if (!collectionImpl || !schematicMap || collectionImpl !== collection) {
            // This is weird, maybe the collection was created by another engine?
            throw new UnknownCollectionException(collection.description.name);
        }
        let schematic = schematicMap.get(name);
        if (schematic) {
            return schematic;
        }
        let collectionDescription = collection.description;
        let description = this._host.createSchematicDescription(name, collection.description);
        if (!description) {
            if (collection.baseDescriptions) {
                for (const base of collection.baseDescriptions) {
                    description = this._host.createSchematicDescription(name, base);
                    if (description) {
                        collectionDescription = base;
                        break;
                    }
                }
            }
            if (!description) {
                // Report the error for the top level schematic collection
                throw new UnknownSchematicException(name, collection.description);
            }
        }
        if (description.private && !allowPrivate) {
            throw new PrivateSchematicException(name, collection.description);
        }
        const factory = this._host.getSchematicRuleFactory(description, collectionDescription);
        schematic = new schematic_1.SchematicImpl(description, factory, collection, this);
        schematicMap.set(name, schematic);
        return schematic;
    }
    listSchematicNames(collection) {
        const names = this._host.listSchematicNames(collection.description);
        if (collection.baseDescriptions) {
            for (const base of collection.baseDescriptions) {
                names.push(...this._host.listSchematicNames(base));
            }
        }
        // remove duplicates
        return [...new Set(names)];
    }
    transformOptions(schematic, options) {
        return this._host.transformOptions(schematic.description, options);
    }
    createSourceFromUrl(url, context) {
        switch (url.protocol) {
            case 'null:': return () => new null_1.NullTree();
            case 'empty:': return () => static_1.empty();
            default:
                const hostSource = this._host.createSourceFromUrl(url, context);
                if (!hostSource) {
                    throw new UnknownUrlSourceProtocol(url.toString());
                }
                return hostSource;
        }
    }
    executePostTasks() {
        const executors = new Map();
        const taskObservable = rxjs_1.from(this._taskSchedulers)
            .pipe(operators_1.concatMap(scheduler => scheduler.finalize()), operators_1.concatMap(task => {
            const { name, options } = task.configuration;
            const executor = executors.get(name);
            if (executor) {
                return executor(options, task.context);
            }
            return this._host.createTaskExecutor(name)
                .pipe(operators_1.concatMap(executor => {
                executors.set(name, executor);
                return executor(options, task.context);
            }));
        }));
        return taskObservable;
    }
}
exports.SchematicEngine = SchematicEngine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3NyYy9lbmdpbmUvZW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0NBQTZFO0FBQzdFLCtCQUEwRDtBQUMxRCw4Q0FBMkM7QUFFM0MsaURBQWtEO0FBQ2xELHVDQUF3QztBQUN4QywyQ0FBdUM7QUFrQnZDLDJDQUE0QztBQUc1Qyw4QkFBc0MsU0FBUSxvQkFBYTtJQUN6RCxZQUFZLEdBQVcsSUFBSSxLQUFLLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pFO0FBRkQsNERBRUM7QUFFRCxnQ0FBd0MsU0FBUSxvQkFBYTtJQUMzRCxZQUFZLElBQVksSUFBSSxLQUFLLENBQUMsdUJBQXVCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RFO0FBRkQsZ0VBRUM7QUFFRCxpQ0FBeUMsU0FBUSxvQkFBYTtJQUM1RCxZQUFZLElBQVk7UUFDdEIsS0FBSyxDQUFDLGtDQUFrQyxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjtBQUpELGtFQUlDO0FBRUQsK0JBQXVDLFNBQVEsb0JBQWE7SUFDMUQsWUFBWSxJQUFZLEVBQUUsVUFBcUM7UUFDN0QsS0FBSyxDQUFDLGNBQWMsSUFBSSw4QkFBOEIsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUNGO0FBSkQsOERBSUM7QUFFRCwrQkFBdUMsU0FBUSxvQkFBYTtJQUMxRCxZQUFZLElBQVksRUFBRSxVQUFxQztRQUM3RCxLQUFLLENBQUMsY0FBYyxJQUFJLDhCQUE4QixVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBQ0Y7QUFKRCw4REFJQztBQUVELHlDQUFpRCxTQUFRLG9CQUFhO0lBQ3BFLGdCQUFnQixLQUFLLENB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LENBQ0gsQ0FBQztRQUVKLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7Q0FDRjtBQWxORCwwQ0FrTkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyBCYXNlRXhjZXB0aW9uLCBQcmlvcml0eVF1ZXVlLCBsb2dnaW5nIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSBhcyBvYnNlcnZhYmxlRnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY29uY2F0TWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVXJsIH0gZnJvbSAndXJsJztcbmltcG9ydCB7IE1lcmdlU3RyYXRlZ3kgfSBmcm9tICcuLi90cmVlL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBOdWxsVHJlZSB9IGZyb20gJy4uL3RyZWUvbnVsbCc7XG5pbXBvcnQgeyBlbXB0eSB9IGZyb20gJy4uL3RyZWUvc3RhdGljJztcbmltcG9ydCB7IFdvcmtmbG93IH0gZnJvbSAnLi4vd29ya2Zsb3cvaW50ZXJmYWNlJztcbmltcG9ydCB7XG4gIENvbGxlY3Rpb24sXG4gIENvbGxlY3Rpb25EZXNjcmlwdGlvbixcbiAgRW5naW5lLFxuICBFbmdpbmVIb3N0LFxuICBTY2hlbWF0aWMsXG4gIFNjaGVtYXRpY0NvbnRleHQsXG4gIFNjaGVtYXRpY0Rlc2NyaXB0aW9uLFxuICBTb3VyY2UsXG4gIFRhc2tDb25maWd1cmF0aW9uLFxuICBUYXNrQ29uZmlndXJhdGlvbkdlbmVyYXRvcixcbiAgVGFza0V4ZWN1dG9yLFxuICBUYXNrSWQsXG4gIFRhc2tJbmZvLFxuICBUeXBlZFNjaGVtYXRpY0NvbnRleHQsXG59IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IFNjaGVtYXRpY0ltcGwgfSBmcm9tICcuL3NjaGVtYXRpYyc7XG5cblxuZXhwb3J0IGNsYXNzIFVua25vd25VcmxTb3VyY2VQcm90b2NvbCBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykgeyBzdXBlcihgVW5rbm93biBQcm90b2NvbCBvbiB1cmwgXCIke3VybH1cIi5gKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5rbm93bkNvbGxlY3Rpb25FeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7IHN1cGVyKGBVbmtub3duIGNvbGxlY3Rpb24gXCIke25hbWV9XCIuYCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENpcmN1bGFyQ29sbGVjdGlvbkV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgQ2lyY3VsYXIgY29sbGVjdGlvbiByZWZlcmVuY2UgXCIke25hbWV9XCIuYCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVua25vd25TY2hlbWF0aWNFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uRGVzY3JpcHRpb248e30+KSB7XG4gICAgc3VwZXIoYFNjaGVtYXRpYyBcIiR7bmFtZX1cIiBub3QgZm91bmQgaW4gY29sbGVjdGlvbiBcIiR7Y29sbGVjdGlvbi5uYW1lfVwiLmApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcml2YXRlU2NoZW1hdGljRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgY29sbGVjdGlvbjogQ29sbGVjdGlvbkRlc2NyaXB0aW9uPHt9Pikge1xuICAgIHN1cGVyKGBTY2hlbWF0aWMgXCIke25hbWV9XCIgbm90IGZvdW5kIGluIGNvbGxlY3Rpb24gXCIke2NvbGxlY3Rpb24ubmFtZX1cIi5gKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2NoZW1hdGljRW5naW5lQ29uZmxpY3RpbmdFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7IHN1cGVyKGBBIHNjaGVtYXRpYyB3YXMgY2FsbGVkIGZyb20gYSBkaWZmZXJlbnQgZW5naW5lIGFzIGl0cyBwYXJlbnQuYCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFVucmVnaXN0ZXJlZFRhc2tFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzY2hlbWF0aWM/OiBTY2hlbWF0aWNEZXNjcmlwdGlvbjx7fSwge30+KSB7XG4gICAgY29uc3QgYWRkZW5kdW0gPSBzY2hlbWF0aWMgPyBgIGluIHNjaGVtYXRpYyBcIiR7c2NoZW1hdGljLm5hbWV9XCJgIDogJyc7XG4gICAgc3VwZXIoYFVucmVnaXN0ZXJlZCB0YXNrIFwiJHtuYW1lfVwiJHthZGRlbmR1bX0uYCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVua25vd25UYXNrRGVwZW5kZW5jeUV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihpZDogVGFza0lkKSB7XG4gICAgc3VwZXIoYFVua25vd24gdGFzayBkZXBlbmRlbmN5IFtJRDogJHtpZC5pZH1dLmApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uSW1wbDxDb2xsZWN0aW9uVCBleHRlbmRzIG9iamVjdCwgU2NoZW1hdGljVCBleHRlbmRzIG9iamVjdD5cbiAgaW1wbGVtZW50cyBDb2xsZWN0aW9uPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Rlc2NyaXB0aW9uOiBDb2xsZWN0aW9uRGVzY3JpcHRpb248Q29sbGVjdGlvblQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIF9lbmdpbmU6IFNjaGVtYXRpY0VuZ2luZTxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBiYXNlRGVzY3JpcHRpb25zPzogQXJyYXk8Q29sbGVjdGlvbkRlc2NyaXB0aW9uPENvbGxlY3Rpb25UPj4pIHtcbiAgfVxuXG4gIGdldCBkZXNjcmlwdGlvbigpIHsgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uOyB9XG4gIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbi5uYW1lIHx8ICc8dW5rbm93bj4nOyB9XG5cbiAgY3JlYXRlU2NoZW1hdGljKG5hbWU6IHN0cmluZywgYWxsb3dQcml2YXRlID0gZmFsc2UpOiBTY2hlbWF0aWM8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcbiAgICByZXR1cm4gdGhpcy5fZW5naW5lLmNyZWF0ZVNjaGVtYXRpYyhuYW1lLCB0aGlzLCBhbGxvd1ByaXZhdGUpO1xuICB9XG5cbiAgbGlzdFNjaGVtYXRpY05hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZW5naW5lLmxpc3RTY2hlbWF0aWNOYW1lcyh0aGlzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFza1NjaGVkdWxlciB7XG4gIHByaXZhdGUgX3F1ZXVlID0gbmV3IFByaW9yaXR5UXVldWU8VGFza0luZm8+KCh4LCB5KSA9PiB4LnByaW9yaXR5IC0geS5wcmlvcml0eSk7XG4gIHByaXZhdGUgX3Rhc2tJZHMgPSBuZXcgTWFwPFRhc2tJZCwgVGFza0luZm8+KCk7XG4gIHByaXZhdGUgc3RhdGljIF90YXNrSWRDb3VudGVyID0gMTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSB7fVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZVByaW9yaXR5KGRlcGVuZGVuY2llczogU2V0PFRhc2tJbmZvPik6IG51bWJlciB7XG4gICAgaWYgKGRlcGVuZGVuY2llcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCBwcmlvID0gWy4uLmRlcGVuZGVuY2llc10ucmVkdWNlKChwcmlvLCB0YXNrKSA9PiBwcmlvICsgdGFzay5wcmlvcml0eSwgMSk7XG5cbiAgICByZXR1cm4gcHJpbztcbiAgfVxuXG4gIHByaXZhdGUgX21hcERlcGVuZGVuY2llcyhkZXBlbmRlbmNpZXM/OiBBcnJheTxUYXNrSWQ+KTogU2V0PFRhc2tJbmZvPiB7XG4gICAgaWYgKCFkZXBlbmRlbmNpZXMpIHtcbiAgICAgIHJldHVybiBuZXcgU2V0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgdGFza3MgPSBkZXBlbmRlbmNpZXMubWFwKGRlcCA9PiB7XG4gICAgICBjb25zdCB0YXNrID0gdGhpcy5fdGFza0lkcy5nZXQoZGVwKTtcbiAgICAgIGlmICghdGFzaykge1xuICAgICAgICB0aHJvdyBuZXcgVW5rbm93blRhc2tEZXBlbmRlbmN5RXhjZXB0aW9uKGRlcCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0YXNrO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBTZXQodGFza3MpO1xuICB9XG5cbiAgc2NoZWR1bGU8VD4odGFza0NvbmZpZ3VyYXRpb246IFRhc2tDb25maWd1cmF0aW9uPFQ+KTogVGFza0lkIHtcbiAgICBjb25zdCBkZXBlbmRlbmNpZXMgPSB0aGlzLl9tYXBEZXBlbmRlbmNpZXModGFza0NvbmZpZ3VyYXRpb24uZGVwZW5kZW5jaWVzKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IHRoaXMuX2NhbGN1bGF0ZVByaW9yaXR5KGRlcGVuZGVuY2llcyk7XG5cbiAgICBjb25zdCB0YXNrID0ge1xuICAgICAgaWQ6IFRhc2tTY2hlZHVsZXIuX3Rhc2tJZENvdW50ZXIrKyxcbiAgICAgIHByaW9yaXR5LFxuICAgICAgY29uZmlndXJhdGlvbjogdGFza0NvbmZpZ3VyYXRpb24sXG4gICAgICBjb250ZXh0OiB0aGlzLl9jb250ZXh0LFxuICAgIH07XG5cbiAgICB0aGlzLl9xdWV1ZS5wdXNoKHRhc2spO1xuXG4gICAgY29uc3QgaWQgPSB7IGlkOiB0YXNrLmlkIH07XG4gICAgdGhpcy5fdGFza0lkcy5zZXQoaWQsIHRhc2spO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgZmluYWxpemUoKTogUmVhZG9ubHlBcnJheTxUYXNrSW5mbz4ge1xuICAgIGNvbnN0IHRhc2tzID0gdGhpcy5fcXVldWUudG9BcnJheSgpO1xuICAgIHRoaXMuX3F1ZXVlLmNsZWFyKCk7XG4gICAgdGhpcy5fdGFza0lkcy5jbGVhcigpO1xuXG4gICAgcmV0dXJuIHRhc2tzO1xuICB9XG5cbn1cblxuXG5leHBvcnQgY2xhc3MgU2NoZW1hdGljRW5naW5lPENvbGxlY3Rpb25UIGV4dGVuZHMgb2JqZWN0LCBTY2hlbWF0aWNUIGV4dGVuZHMgb2JqZWN0PlxuICAgIGltcGxlbWVudHMgRW5naW5lPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPiB7XG5cbiAgcHJpdmF0ZSBfY29sbGVjdGlvbkNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIENvbGxlY3Rpb25JbXBsPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPj4oKTtcbiAgcHJpdmF0ZSBfc2NoZW1hdGljQ2FjaGVcbiAgICA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBTY2hlbWF0aWNJbXBsPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPj4+KCk7XG4gIHByaXZhdGUgX3Rhc2tTY2hlZHVsZXJzID0gbmV3IEFycmF5PFRhc2tTY2hlZHVsZXI+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaG9zdDogRW5naW5lSG9zdDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sIHByb3RlY3RlZCBfd29ya2Zsb3c/OiBXb3JrZmxvdykge1xuICB9XG5cbiAgZ2V0IHdvcmtmbG93KCkgeyByZXR1cm4gdGhpcy5fd29ya2Zsb3cgfHwgbnVsbDsgfVxuICBnZXQgZGVmYXVsdE1lcmdlU3RyYXRlZ3koKSB7IHJldHVybiB0aGlzLl9ob3N0LmRlZmF1bHRNZXJnZVN0cmF0ZWd5IHx8IE1lcmdlU3RyYXRlZ3kuRGVmYXVsdDsgfVxuXG4gIGNyZWF0ZUNvbGxlY3Rpb24obmFtZTogc3RyaW5nKTogQ29sbGVjdGlvbjxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4ge1xuICAgIGxldCBjb2xsZWN0aW9uID0gdGhpcy5fY29sbGVjdGlvbkNhY2hlLmdldChuYW1lKTtcbiAgICBpZiAoY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfVxuXG4gICAgY29uc3QgW2Rlc2NyaXB0aW9uLCBiYXNlc10gPSB0aGlzLl9jcmVhdGVDb2xsZWN0aW9uRGVzY3JpcHRpb24obmFtZSk7XG5cbiAgICBjb2xsZWN0aW9uID0gbmV3IENvbGxlY3Rpb25JbXBsPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPihkZXNjcmlwdGlvbiwgdGhpcywgYmFzZXMpO1xuICAgIHRoaXMuX2NvbGxlY3Rpb25DYWNoZS5zZXQobmFtZSwgY29sbGVjdGlvbik7XG4gICAgdGhpcy5fc2NoZW1hdGljQ2FjaGUuc2V0KG5hbWUsIG5ldyBNYXAoKSk7XG5cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUNvbGxlY3Rpb25EZXNjcmlwdGlvbihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcGFyZW50TmFtZXM/OiBTZXQ8c3RyaW5nPixcbiAgKTogW0NvbGxlY3Rpb25EZXNjcmlwdGlvbjxDb2xsZWN0aW9uVD4sIEFycmF5PENvbGxlY3Rpb25EZXNjcmlwdGlvbjxDb2xsZWN0aW9uVD4+XSB7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB0aGlzLl9ob3N0LmNyZWF0ZUNvbGxlY3Rpb25EZXNjcmlwdGlvbihuYW1lKTtcbiAgICBpZiAoIWRlc2NyaXB0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgVW5rbm93bkNvbGxlY3Rpb25FeGNlcHRpb24obmFtZSk7XG4gICAgfVxuICAgIGlmIChwYXJlbnROYW1lcyAmJiBwYXJlbnROYW1lcy5oYXMoZGVzY3JpcHRpb24ubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBDaXJjdWxhckNvbGxlY3Rpb25FeGNlcHRpb24obmFtZSk7XG4gICAgfVxuXG4gICAgY29uc3QgYmFzZXMgPSBuZXcgQXJyYXk8Q29sbGVjdGlvbkRlc2NyaXB0aW9uPENvbGxlY3Rpb25UPj4oKTtcbiAgICBpZiAoZGVzY3JpcHRpb24uZXh0ZW5kcykge1xuICAgICAgcGFyZW50TmFtZXMgPSAocGFyZW50TmFtZXMgfHwgbmV3IFNldDxzdHJpbmc+KCkpLmFkZChkZXNjcmlwdGlvbi5uYW1lKTtcbiAgICAgIGZvciAoY29uc3QgYmFzZU5hbWUgb2YgZGVzY3JpcHRpb24uZXh0ZW5kcykge1xuICAgICAgICBjb25zdCBbYmFzZSwgYmFzZUJhc2VzXSA9IHRoaXMuX2NyZWF0ZUNvbGxlY3Rpb25EZXNjcmlwdGlvbihiYXNlTmFtZSwgbmV3IFNldChwYXJlbnROYW1lcykpO1xuXG4gICAgICAgIGJhc2VzLnVuc2hpZnQoYmFzZSwgLi4uYmFzZUJhc2VzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2Rlc2NyaXB0aW9uLCBiYXNlc107XG4gIH1cblxuICBjcmVhdGVDb250ZXh0KFxuICAgIHNjaGVtYXRpYzogU2NoZW1hdGljPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPixcbiAgICBwYXJlbnQ/OiBQYXJ0aWFsPFR5cGVkU2NoZW1hdGljQ29udGV4dDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4+LFxuICApOiBUeXBlZFNjaGVtYXRpY0NvbnRleHQ8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcbiAgICAvLyBDaGVjayBmb3IgaW5jb25zaXN0ZW5jaWVzLlxuICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LmVuZ2luZSAmJiBwYXJlbnQuZW5naW5lICE9PSB0aGlzKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljRW5naW5lQ29uZmxpY3RpbmdFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBsZXQgY29udGV4dDogVHlwZWRTY2hlbWF0aWNDb250ZXh0PENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPiA9IHtcbiAgICAgIGRlYnVnOiBwYXJlbnQgJiYgcGFyZW50LmRlYnVnIHx8IGZhbHNlLFxuICAgICAgZW5naW5lOiB0aGlzLFxuICAgICAgbG9nZ2VyOiAocGFyZW50ICYmIHBhcmVudC5sb2dnZXIgJiYgcGFyZW50LmxvZ2dlci5jcmVhdGVDaGlsZChzY2hlbWF0aWMuZGVzY3JpcHRpb24ubmFtZSkpXG4gICAgICAgICAgICAgIHx8IG5ldyBsb2dnaW5nLk51bGxMb2dnZXIoKSxcbiAgICAgIHNjaGVtYXRpYyxcbiAgICAgIHN0cmF0ZWd5OiAocGFyZW50ICYmIHBhcmVudC5zdHJhdGVneSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICA/IHBhcmVudC5zdHJhdGVneSA6IHRoaXMuZGVmYXVsdE1lcmdlU3RyYXRlZ3ksXG4gICAgICBhZGRUYXNrLFxuICAgIH07XG5cbiAgICBjb25zdCBtYXliZU5ld0NvbnRleHQgPSB0aGlzLl9ob3N0LnRyYW5zZm9ybUNvbnRleHQoY29udGV4dCk7XG4gICAgaWYgKG1heWJlTmV3Q29udGV4dCkge1xuICAgICAgY29udGV4dCA9IG1heWJlTmV3Q29udGV4dDtcbiAgICB9XG5cbiAgICBjb25zdCB0YXNrU2NoZWR1bGVyID0gbmV3IFRhc2tTY2hlZHVsZXIoY29udGV4dCk7XG4gICAgY29uc3QgaG9zdCA9IHRoaXMuX2hvc3Q7XG4gICAgdGhpcy5fdGFza1NjaGVkdWxlcnMucHVzaCh0YXNrU2NoZWR1bGVyKTtcblxuICAgIGZ1bmN0aW9uIGFkZFRhc2s8VD4oXG4gICAgICB0YXNrOiBUYXNrQ29uZmlndXJhdGlvbkdlbmVyYXRvcjxUPixcbiAgICAgIGRlcGVuZGVuY2llcz86IEFycmF5PFRhc2tJZD4sXG4gICAgKTogVGFza0lkIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRhc2sudG9Db25maWd1cmF0aW9uKCk7XG5cbiAgICAgIGlmICghaG9zdC5oYXNUYXNrRXhlY3V0b3IoY29uZmlnLm5hbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBVbnJlZ2lzdGVyZWRUYXNrRXhjZXB0aW9uKGNvbmZpZy5uYW1lLCBzY2hlbWF0aWMuZGVzY3JpcHRpb24pO1xuICAgICAgfVxuXG4gICAgICBjb25maWcuZGVwZW5kZW5jaWVzID0gY29uZmlnLmRlcGVuZGVuY2llcyB8fCBbXTtcbiAgICAgIGlmIChkZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgY29uZmlnLmRlcGVuZGVuY2llcy51bnNoaWZ0KC4uLmRlcGVuZGVuY2llcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0YXNrU2NoZWR1bGVyLnNjaGVkdWxlKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cblxuICBjcmVhdGVTY2hlbWF0aWMoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb248Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+LFxuICAgIGFsbG93UHJpdmF0ZSA9IGZhbHNlLFxuICApOiBTY2hlbWF0aWM8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcbiAgICBjb25zdCBjb2xsZWN0aW9uSW1wbCA9IHRoaXMuX2NvbGxlY3Rpb25DYWNoZS5nZXQoY29sbGVjdGlvbi5kZXNjcmlwdGlvbi5uYW1lKTtcbiAgICBjb25zdCBzY2hlbWF0aWNNYXAgPSB0aGlzLl9zY2hlbWF0aWNDYWNoZS5nZXQoY29sbGVjdGlvbi5kZXNjcmlwdGlvbi5uYW1lKTtcbiAgICBpZiAoIWNvbGxlY3Rpb25JbXBsIHx8ICFzY2hlbWF0aWNNYXAgfHwgY29sbGVjdGlvbkltcGwgIT09IGNvbGxlY3Rpb24pIHtcbiAgICAgIC8vIFRoaXMgaXMgd2VpcmQsIG1heWJlIHRoZSBjb2xsZWN0aW9uIHdhcyBjcmVhdGVkIGJ5IGFub3RoZXIgZW5naW5lP1xuICAgICAgdGhyb3cgbmV3IFVua25vd25Db2xsZWN0aW9uRXhjZXB0aW9uKGNvbGxlY3Rpb24uZGVzY3JpcHRpb24ubmFtZSk7XG4gICAgfVxuXG4gICAgbGV0IHNjaGVtYXRpYyA9IHNjaGVtYXRpY01hcC5nZXQobmFtZSk7XG4gICAgaWYgKHNjaGVtYXRpYykge1xuICAgICAgcmV0dXJuIHNjaGVtYXRpYztcbiAgICB9XG5cbiAgICBsZXQgY29sbGVjdGlvbkRlc2NyaXB0aW9uID0gY29sbGVjdGlvbi5kZXNjcmlwdGlvbjtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSB0aGlzLl9ob3N0LmNyZWF0ZVNjaGVtYXRpY0Rlc2NyaXB0aW9uKG5hbWUsIGNvbGxlY3Rpb24uZGVzY3JpcHRpb24pO1xuICAgIGlmICghZGVzY3JpcHRpb24pIHtcbiAgICAgIGlmIChjb2xsZWN0aW9uLmJhc2VEZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBiYXNlIG9mIGNvbGxlY3Rpb24uYmFzZURlc2NyaXB0aW9ucykge1xuICAgICAgICAgIGRlc2NyaXB0aW9uID0gdGhpcy5faG9zdC5jcmVhdGVTY2hlbWF0aWNEZXNjcmlwdGlvbihuYW1lLCBiYXNlKTtcbiAgICAgICAgICBpZiAoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25EZXNjcmlwdGlvbiA9IGJhc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZGVzY3JpcHRpb24pIHtcbiAgICAgICAgLy8gUmVwb3J0IHRoZSBlcnJvciBmb3IgdGhlIHRvcCBsZXZlbCBzY2hlbWF0aWMgY29sbGVjdGlvblxuICAgICAgICB0aHJvdyBuZXcgVW5rbm93blNjaGVtYXRpY0V4Y2VwdGlvbihuYW1lLCBjb2xsZWN0aW9uLmRlc2NyaXB0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGVzY3JpcHRpb24ucHJpdmF0ZSAmJiAhYWxsb3dQcml2YXRlKSB7XG4gICAgICB0aHJvdyBuZXcgUHJpdmF0ZVNjaGVtYXRpY0V4Y2VwdGlvbihuYW1lLCBjb2xsZWN0aW9uLmRlc2NyaXB0aW9uKTtcbiAgICB9XG5cbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5faG9zdC5nZXRTY2hlbWF0aWNSdWxlRmFjdG9yeShkZXNjcmlwdGlvbiwgY29sbGVjdGlvbkRlc2NyaXB0aW9uKTtcbiAgICBzY2hlbWF0aWMgPSBuZXcgU2NoZW1hdGljSW1wbDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4oZGVzY3JpcHRpb24sIGZhY3RvcnksIGNvbGxlY3Rpb24sIHRoaXMpO1xuXG4gICAgc2NoZW1hdGljTWFwLnNldChuYW1lLCBzY2hlbWF0aWMpO1xuXG4gICAgcmV0dXJuIHNjaGVtYXRpYztcbiAgfVxuXG4gIGxpc3RTY2hlbWF0aWNOYW1lcyhjb2xsZWN0aW9uOiBDb2xsZWN0aW9uPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPik6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBuYW1lcyA9IHRoaXMuX2hvc3QubGlzdFNjaGVtYXRpY05hbWVzKGNvbGxlY3Rpb24uZGVzY3JpcHRpb24pO1xuXG4gICAgaWYgKGNvbGxlY3Rpb24uYmFzZURlc2NyaXB0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBiYXNlIG9mIGNvbGxlY3Rpb24uYmFzZURlc2NyaXB0aW9ucykge1xuICAgICAgICBuYW1lcy5wdXNoKC4uLnRoaXMuX2hvc3QubGlzdFNjaGVtYXRpY05hbWVzKGJhc2UpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZHVwbGljYXRlc1xuICAgIHJldHVybiBbLi4ubmV3IFNldChuYW1lcyldO1xuICB9XG5cbiAgdHJhbnNmb3JtT3B0aW9uczxPcHRpb25UIGV4dGVuZHMgb2JqZWN0LCBSZXN1bHRUIGV4dGVuZHMgb2JqZWN0PihcbiAgICBzY2hlbWF0aWM6IFNjaGVtYXRpYzxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sXG4gICAgb3B0aW9uczogT3B0aW9uVCxcbiAgKTogT2JzZXJ2YWJsZTxSZXN1bHRUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2hvc3QudHJhbnNmb3JtT3B0aW9uczxPcHRpb25ULCBSZXN1bHRUPihzY2hlbWF0aWMuZGVzY3JpcHRpb24sIG9wdGlvbnMpO1xuICB9XG5cbiAgY3JlYXRlU291cmNlRnJvbVVybCh1cmw6IFVybCwgY29udGV4dDogVHlwZWRTY2hlbWF0aWNDb250ZXh0PENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPik6IFNvdXJjZSB7XG4gICAgc3dpdGNoICh1cmwucHJvdG9jb2wpIHtcbiAgICAgIGNhc2UgJ251bGw6JzogcmV0dXJuICgpID0+IG5ldyBOdWxsVHJlZSgpO1xuICAgICAgY2FzZSAnZW1wdHk6JzogcmV0dXJuICgpID0+IGVtcHR5KCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zdCBob3N0U291cmNlID0gdGhpcy5faG9zdC5jcmVhdGVTb3VyY2VGcm9tVXJsKHVybCwgY29udGV4dCk7XG4gICAgICAgIGlmICghaG9zdFNvdXJjZSkge1xuICAgICAgICAgIHRocm93IG5ldyBVbmtub3duVXJsU291cmNlUHJvdG9jb2wodXJsLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhvc3RTb3VyY2U7XG4gICAgfVxuICB9XG5cbiAgZXhlY3V0ZVBvc3RUYXNrcygpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICBjb25zdCBleGVjdXRvcnMgPSBuZXcgTWFwPHN0cmluZywgVGFza0V4ZWN1dG9yPigpO1xuXG4gICAgY29uc3QgdGFza09ic2VydmFibGUgPSBvYnNlcnZhYmxlRnJvbSh0aGlzLl90YXNrU2NoZWR1bGVycylcbiAgICAgIC5waXBlKFxuICAgICAgICBjb25jYXRNYXAoc2NoZWR1bGVyID0+IHNjaGVkdWxlci5maW5hbGl6ZSgpKSxcbiAgICAgICAgY29uY2F0TWFwKHRhc2sgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgbmFtZSwgb3B0aW9ucyB9ID0gdGFzay5jb25maWd1cmF0aW9uO1xuXG4gICAgICAgICAgY29uc3QgZXhlY3V0b3IgPSBleGVjdXRvcnMuZ2V0KG5hbWUpO1xuICAgICAgICAgIGlmIChleGVjdXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGV4ZWN1dG9yKG9wdGlvbnMsIHRhc2suY29udGV4dCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2hvc3QuY3JlYXRlVGFza0V4ZWN1dG9yKG5hbWUpXG4gICAgICAgICAgICAucGlwZShjb25jYXRNYXAoZXhlY3V0b3IgPT4ge1xuICAgICAgICAgICAgICBleGVjdXRvcnMuc2V0KG5hbWUsIGV4ZWN1dG9yKTtcblxuICAgICAgICAgICAgICByZXR1cm4gZXhlY3V0b3Iob3B0aW9ucywgdGFzay5jb250ZXh0KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgcmV0dXJuIHRhc2tPYnNlcnZhYmxlO1xuICB9XG59XG4iXX0=