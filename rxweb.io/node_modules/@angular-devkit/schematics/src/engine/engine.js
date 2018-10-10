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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3NyYy9lbmdpbmUvZW5naW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0NBQTZFO0FBQzdFLCtCQUEwRDtBQUMxRCw4Q0FBMkM7QUFFM0MsaURBQWtEO0FBQ2xELHVDQUF3QztBQUN4QywyQ0FBdUM7QUFrQnZDLDJDQUE0QztBQUc1Qyw4QkFBc0MsU0FBUSxvQkFBYTtJQUN6RCxZQUFZLEdBQVcsSUFBSSxLQUFLLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pFO0FBRkQsNERBRUM7QUFFRCxnQ0FBd0MsU0FBUSxvQkFBYTtJQUMzRCxZQUFZLElBQVksSUFBSSxLQUFLLENBQUMsdUJBQXVCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3RFO0FBRkQsZ0VBRUM7QUFFRCxpQ0FBeUMsU0FBUSxvQkFBYTtJQUM1RCxZQUFZLElBQVk7UUFDdEIsS0FBSyxDQUFDLGtDQUFrQyxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjtBQUpELGtFQUlDO0FBRUQsK0JBQXVDLFNBQVEsb0JBQWE7SUFDMUQsWUFBWSxJQUFZLEVBQUUsVUFBcUM7UUFDN0QsS0FBSyxDQUFDLGNBQWMsSUFBSSw4QkFBOEIsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUNGO0FBSkQsOERBSUM7QUFFRCwrQkFBdUMsU0FBUSxvQkFBYTtJQUMxRCxZQUFZLElBQVksRUFBRSxVQUFxQztRQUM3RCxLQUFLLENBQUMsY0FBYyxJQUFJLDhCQUE4QixVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBQ0Y7QUFKRCw4REFJQztBQUVELHlDQUFpRCxTQUFRLG9CQUFhO0lBQ3BFLGdCQUFnQixLQUFLLENB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RSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7Z0JBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO1FBRWxELE1BQU0sY0FBYyxHQUFHLFdBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQ3hELElBQUksQ0FDSCxxQkFBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQzVDLHFCQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDZixNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFFN0MsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2lCQUN2QyxJQUFJLENBQUMscUJBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDekIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBRTlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVKLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDeEIsQ0FBQztDQUNGO0FBbE5ELDBDQWtOQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24sIFByaW9yaXR5UXVldWUsIGxvZ2dpbmcgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tIGFzIG9ic2VydmFibGVGcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVcmwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgTWVyZ2VTdHJhdGVneSB9IGZyb20gJy4uL3RyZWUvaW50ZXJmYWNlJztcbmltcG9ydCB7IE51bGxUcmVlIH0gZnJvbSAnLi4vdHJlZS9udWxsJztcbmltcG9ydCB7IGVtcHR5IH0gZnJvbSAnLi4vdHJlZS9zdGF0aWMnO1xuaW1wb3J0IHsgV29ya2Zsb3cgfSBmcm9tICcuLi93b3JrZmxvdy9pbnRlcmZhY2UnO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbixcbiAgQ29sbGVjdGlvbkRlc2NyaXB0aW9uLFxuICBFbmdpbmUsXG4gIEVuZ2luZUhvc3QsXG4gIFNjaGVtYXRpYyxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgU2NoZW1hdGljRGVzY3JpcHRpb24sXG4gIFNvdXJjZSxcbiAgVGFza0NvbmZpZ3VyYXRpb24sXG4gIFRhc2tDb25maWd1cmF0aW9uR2VuZXJhdG9yLFxuICBUYXNrRXhlY3V0b3IsXG4gIFRhc2tJZCxcbiAgVGFza0luZm8sXG4gIFR5cGVkU2NoZW1hdGljQ29udGV4dCxcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2NoZW1hdGljSW1wbCB9IGZyb20gJy4vc2NoZW1hdGljJztcblxuXG5leHBvcnQgY2xhc3MgVW5rbm93blVybFNvdXJjZVByb3RvY29sIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7IHN1cGVyKGBVbmtub3duIFByb3RvY29sIG9uIHVybCBcIiR7dXJsfVwiLmApOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbmtub3duQ29sbGVjdGlvbkV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHsgc3VwZXIoYFVua25vd24gY29sbGVjdGlvbiBcIiR7bmFtZX1cIi5gKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2lyY3VsYXJDb2xsZWN0aW9uRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKGBDaXJjdWxhciBjb2xsZWN0aW9uIHJlZmVyZW5jZSBcIiR7bmFtZX1cIi5gKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5rbm93blNjaGVtYXRpY0V4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNvbGxlY3Rpb246IENvbGxlY3Rpb25EZXNjcmlwdGlvbjx7fT4pIHtcbiAgICBzdXBlcihgU2NoZW1hdGljIFwiJHtuYW1lfVwiIG5vdCBmb3VuZCBpbiBjb2xsZWN0aW9uIFwiJHtjb2xsZWN0aW9uLm5hbWV9XCIuYCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByaXZhdGVTY2hlbWF0aWNFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uRGVzY3JpcHRpb248e30+KSB7XG4gICAgc3VwZXIoYFNjaGVtYXRpYyBcIiR7bmFtZX1cIiBub3QgZm91bmQgaW4gY29sbGVjdGlvbiBcIiR7Y29sbGVjdGlvbi5uYW1lfVwiLmApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTY2hlbWF0aWNFbmdpbmVDb25mbGljdGluZ0V4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoYEEgc2NoZW1hdGljIHdhcyBjYWxsZWQgZnJvbSBhIGRpZmZlcmVudCBlbmdpbmUgYXMgaXRzIHBhcmVudC5gKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5yZWdpc3RlcmVkVGFza0V4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHNjaGVtYXRpYz86IFNjaGVtYXRpY0Rlc2NyaXB0aW9uPHt9LCB7fT4pIHtcbiAgICBjb25zdCBhZGRlbmR1bSA9IHNjaGVtYXRpYyA/IGAgaW4gc2NoZW1hdGljIFwiJHtzY2hlbWF0aWMubmFtZX1cImAgOiAnJztcbiAgICBzdXBlcihgVW5yZWdpc3RlcmVkIHRhc2sgXCIke25hbWV9XCIke2FkZGVuZHVtfS5gKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5rbm93blRhc2tEZXBlbmRlbmN5RXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGlkOiBUYXNrSWQpIHtcbiAgICBzdXBlcihgVW5rbm93biB0YXNrIGRlcGVuZGVuY3kgW0lEOiAke2lkLmlkfV0uYCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25JbXBsPENvbGxlY3Rpb25UIGV4dGVuZHMgb2JqZWN0LCBTY2hlbWF0aWNUIGV4dGVuZHMgb2JqZWN0PlxuICBpbXBsZW1lbnRzIENvbGxlY3Rpb248Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGVzY3JpcHRpb246IENvbGxlY3Rpb25EZXNjcmlwdGlvbjxDb2xsZWN0aW9uVD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX2VuZ2luZTogU2NoZW1hdGljRW5naW5lPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPixcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGJhc2VEZXNjcmlwdGlvbnM/OiBBcnJheTxDb2xsZWN0aW9uRGVzY3JpcHRpb248Q29sbGVjdGlvblQ+Pikge1xuICB9XG5cbiAgZ2V0IGRlc2NyaXB0aW9uKCkgeyByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247IH1cbiAgZ2V0IG5hbWUoKSB7IHJldHVybiB0aGlzLmRlc2NyaXB0aW9uLm5hbWUgfHwgJzx1bmtub3duPic7IH1cblxuICBjcmVhdGVTY2hlbWF0aWMobmFtZTogc3RyaW5nLCBhbGxvd1ByaXZhdGUgPSBmYWxzZSk6IFNjaGVtYXRpYzxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4ge1xuICAgIHJldHVybiB0aGlzLl9lbmdpbmUuY3JlYXRlU2NoZW1hdGljKG5hbWUsIHRoaXMsIGFsbG93UHJpdmF0ZSk7XG4gIH1cblxuICBsaXN0U2NoZW1hdGljTmFtZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9lbmdpbmUubGlzdFNjaGVtYXRpY05hbWVzKHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYXNrU2NoZWR1bGVyIHtcbiAgcHJpdmF0ZSBfcXVldWUgPSBuZXcgUHJpb3JpdHlRdWV1ZTxUYXNrSW5mbz4oKHgsIHkpID0+IHgucHJpb3JpdHkgLSB5LnByaW9yaXR5KTtcbiAgcHJpdmF0ZSBfdGFza0lkcyA9IG5ldyBNYXA8VGFza0lkLCBUYXNrSW5mbz4oKTtcbiAgcHJpdmF0ZSBzdGF0aWMgX3Rhc2tJZENvdW50ZXIgPSAxO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpIHt9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlUHJpb3JpdHkoZGVwZW5kZW5jaWVzOiBTZXQ8VGFza0luZm8+KTogbnVtYmVyIHtcbiAgICBpZiAoZGVwZW5kZW5jaWVzLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHByaW8gPSBbLi4uZGVwZW5kZW5jaWVzXS5yZWR1Y2UoKHByaW8sIHRhc2spID0+IHByaW8gKyB0YXNrLnByaW9yaXR5LCAxKTtcblxuICAgIHJldHVybiBwcmlvO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWFwRGVwZW5kZW5jaWVzKGRlcGVuZGVuY2llcz86IEFycmF5PFRhc2tJZD4pOiBTZXQ8VGFza0luZm8+IHtcbiAgICBpZiAoIWRlcGVuZGVuY2llcykge1xuICAgICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICB9XG5cbiAgICBjb25zdCB0YXNrcyA9IGRlcGVuZGVuY2llcy5tYXAoZGVwID0+IHtcbiAgICAgIGNvbnN0IHRhc2sgPSB0aGlzLl90YXNrSWRzLmdldChkZXApO1xuICAgICAgaWYgKCF0YXNrKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmtub3duVGFza0RlcGVuZGVuY3lFeGNlcHRpb24oZGVwKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFNldCh0YXNrcyk7XG4gIH1cblxuICBzY2hlZHVsZTxUPih0YXNrQ29uZmlndXJhdGlvbjogVGFza0NvbmZpZ3VyYXRpb248VD4pOiBUYXNrSWQge1xuICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IHRoaXMuX21hcERlcGVuZGVuY2llcyh0YXNrQ29uZmlndXJhdGlvbi5kZXBlbmRlbmNpZXMpO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gdGhpcy5fY2FsY3VsYXRlUHJpb3JpdHkoZGVwZW5kZW5jaWVzKTtcblxuICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICBpZDogVGFza1NjaGVkdWxlci5fdGFza0lkQ291bnRlcisrLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBjb25maWd1cmF0aW9uOiB0YXNrQ29uZmlndXJhdGlvbixcbiAgICAgIGNvbnRleHQ6IHRoaXMuX2NvbnRleHQsXG4gICAgfTtcblxuICAgIHRoaXMuX3F1ZXVlLnB1c2godGFzayk7XG5cbiAgICBjb25zdCBpZCA9IHsgaWQ6IHRhc2suaWQgfTtcbiAgICB0aGlzLl90YXNrSWRzLnNldChpZCwgdGFzayk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBmaW5hbGl6ZSgpOiBSZWFkb25seUFycmF5PFRhc2tJbmZvPiB7XG4gICAgY29uc3QgdGFza3MgPSB0aGlzLl9xdWV1ZS50b0FycmF5KCk7XG4gICAgdGhpcy5fcXVldWUuY2xlYXIoKTtcbiAgICB0aGlzLl90YXNrSWRzLmNsZWFyKCk7XG5cbiAgICByZXR1cm4gdGFza3M7XG4gIH1cblxufVxuXG5cbmV4cG9ydCBjbGFzcyBTY2hlbWF0aWNFbmdpbmU8Q29sbGVjdGlvblQgZXh0ZW5kcyBvYmplY3QsIFNjaGVtYXRpY1QgZXh0ZW5kcyBvYmplY3Q+XG4gICAgaW1wbGVtZW50cyBFbmdpbmU8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcblxuICBwcml2YXRlIF9jb2xsZWN0aW9uQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgQ29sbGVjdGlvbkltcGw8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+PigpO1xuICBwcml2YXRlIF9zY2hlbWF0aWNDYWNoZVxuICAgID0gbmV3IE1hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIFNjaGVtYXRpY0ltcGw8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+Pj4oKTtcbiAgcHJpdmF0ZSBfdGFza1NjaGVkdWxlcnMgPSBuZXcgQXJyYXk8VGFza1NjaGVkdWxlcj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ob3N0OiBFbmdpbmVIb3N0PENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPiwgcHJvdGVjdGVkIF93b3JrZmxvdz86IFdvcmtmbG93KSB7XG4gIH1cblxuICBnZXQgd29ya2Zsb3coKSB7IHJldHVybiB0aGlzLl93b3JrZmxvdyB8fCBudWxsOyB9XG4gIGdldCBkZWZhdWx0TWVyZ2VTdHJhdGVneSgpIHsgcmV0dXJuIHRoaXMuX2hvc3QuZGVmYXVsdE1lcmdlU3RyYXRlZ3kgfHwgTWVyZ2VTdHJhdGVneS5EZWZhdWx0OyB9XG5cbiAgY3JlYXRlQ29sbGVjdGlvbihuYW1lOiBzdHJpbmcpOiBDb2xsZWN0aW9uPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPiB7XG4gICAgbGV0IGNvbGxlY3Rpb24gPSB0aGlzLl9jb2xsZWN0aW9uQ2FjaGUuZ2V0KG5hbWUpO1xuICAgIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBbZGVzY3JpcHRpb24sIGJhc2VzXSA9IHRoaXMuX2NyZWF0ZUNvbGxlY3Rpb25EZXNjcmlwdGlvbihuYW1lKTtcblxuICAgIGNvbGxlY3Rpb24gPSBuZXcgQ29sbGVjdGlvbkltcGw8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+KGRlc2NyaXB0aW9uLCB0aGlzLCBiYXNlcyk7XG4gICAgdGhpcy5fY29sbGVjdGlvbkNhY2hlLnNldChuYW1lLCBjb2xsZWN0aW9uKTtcbiAgICB0aGlzLl9zY2hlbWF0aWNDYWNoZS5zZXQobmFtZSwgbmV3IE1hcCgpKTtcblxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ29sbGVjdGlvbkRlc2NyaXB0aW9uKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBwYXJlbnROYW1lcz86IFNldDxzdHJpbmc+LFxuICApOiBbQ29sbGVjdGlvbkRlc2NyaXB0aW9uPENvbGxlY3Rpb25UPiwgQXJyYXk8Q29sbGVjdGlvbkRlc2NyaXB0aW9uPENvbGxlY3Rpb25UPj5dIHtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHRoaXMuX2hvc3QuY3JlYXRlQ29sbGVjdGlvbkRlc2NyaXB0aW9uKG5hbWUpO1xuICAgIGlmICghZGVzY3JpcHRpb24pIHtcbiAgICAgIHRocm93IG5ldyBVbmtub3duQ29sbGVjdGlvbkV4Y2VwdGlvbihuYW1lKTtcbiAgICB9XG4gICAgaWYgKHBhcmVudE5hbWVzICYmIHBhcmVudE5hbWVzLmhhcyhkZXNjcmlwdGlvbi5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IENpcmN1bGFyQ29sbGVjdGlvbkV4Y2VwdGlvbihuYW1lKTtcbiAgICB9XG5cbiAgICBjb25zdCBiYXNlcyA9IG5ldyBBcnJheTxDb2xsZWN0aW9uRGVzY3JpcHRpb248Q29sbGVjdGlvblQ+PigpO1xuICAgIGlmIChkZXNjcmlwdGlvbi5leHRlbmRzKSB7XG4gICAgICBwYXJlbnROYW1lcyA9IChwYXJlbnROYW1lcyB8fCBuZXcgU2V0PHN0cmluZz4oKSkuYWRkKGRlc2NyaXB0aW9uLm5hbWUpO1xuICAgICAgZm9yIChjb25zdCBiYXNlTmFtZSBvZiBkZXNjcmlwdGlvbi5leHRlbmRzKSB7XG4gICAgICAgIGNvbnN0IFtiYXNlLCBiYXNlQmFzZXNdID0gdGhpcy5fY3JlYXRlQ29sbGVjdGlvbkRlc2NyaXB0aW9uKGJhc2VOYW1lLCBuZXcgU2V0KHBhcmVudE5hbWVzKSk7XG5cbiAgICAgICAgYmFzZXMudW5zaGlmdChiYXNlLCAuLi5iYXNlQmFzZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbZGVzY3JpcHRpb24sIGJhc2VzXTtcbiAgfVxuXG4gIGNyZWF0ZUNvbnRleHQoXG4gICAgc2NoZW1hdGljOiBTY2hlbWF0aWM8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+LFxuICAgIHBhcmVudD86IFBhcnRpYWw8VHlwZWRTY2hlbWF0aWNDb250ZXh0PENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPj4sXG4gICk6IFR5cGVkU2NoZW1hdGljQ29udGV4dDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4ge1xuICAgIC8vIENoZWNrIGZvciBpbmNvbnNpc3RlbmNpZXMuXG4gICAgaWYgKHBhcmVudCAmJiBwYXJlbnQuZW5naW5lICYmIHBhcmVudC5lbmdpbmUgIT09IHRoaXMpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNFbmdpbmVDb25mbGljdGluZ0V4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGxldCBjb250ZXh0OiBUeXBlZFNjaGVtYXRpY0NvbnRleHQ8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+ID0ge1xuICAgICAgZGVidWc6IHBhcmVudCAmJiBwYXJlbnQuZGVidWcgfHwgZmFsc2UsXG4gICAgICBlbmdpbmU6IHRoaXMsXG4gICAgICBsb2dnZXI6IChwYXJlbnQgJiYgcGFyZW50LmxvZ2dlciAmJiBwYXJlbnQubG9nZ2VyLmNyZWF0ZUNoaWxkKHNjaGVtYXRpYy5kZXNjcmlwdGlvbi5uYW1lKSlcbiAgICAgICAgICAgICAgfHwgbmV3IGxvZ2dpbmcuTnVsbExvZ2dlcigpLFxuICAgICAgc2NoZW1hdGljLFxuICAgICAgc3RyYXRlZ3k6IChwYXJlbnQgJiYgcGFyZW50LnN0cmF0ZWd5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgID8gcGFyZW50LnN0cmF0ZWd5IDogdGhpcy5kZWZhdWx0TWVyZ2VTdHJhdGVneSxcbiAgICAgIGFkZFRhc2ssXG4gICAgfTtcblxuICAgIGNvbnN0IG1heWJlTmV3Q29udGV4dCA9IHRoaXMuX2hvc3QudHJhbnNmb3JtQ29udGV4dChjb250ZXh0KTtcbiAgICBpZiAobWF5YmVOZXdDb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gbWF5YmVOZXdDb250ZXh0O1xuICAgIH1cblxuICAgIGNvbnN0IHRhc2tTY2hlZHVsZXIgPSBuZXcgVGFza1NjaGVkdWxlcihjb250ZXh0KTtcbiAgICBjb25zdCBob3N0ID0gdGhpcy5faG9zdDtcbiAgICB0aGlzLl90YXNrU2NoZWR1bGVycy5wdXNoKHRhc2tTY2hlZHVsZXIpO1xuXG4gICAgZnVuY3Rpb24gYWRkVGFzazxUPihcbiAgICAgIHRhc2s6IFRhc2tDb25maWd1cmF0aW9uR2VuZXJhdG9yPFQ+LFxuICAgICAgZGVwZW5kZW5jaWVzPzogQXJyYXk8VGFza0lkPixcbiAgICApOiBUYXNrSWQge1xuICAgICAgY29uc3QgY29uZmlnID0gdGFzay50b0NvbmZpZ3VyYXRpb24oKTtcblxuICAgICAgaWYgKCFob3N0Lmhhc1Rhc2tFeGVjdXRvcihjb25maWcubmFtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFVucmVnaXN0ZXJlZFRhc2tFeGNlcHRpb24oY29uZmlnLm5hbWUsIHNjaGVtYXRpYy5kZXNjcmlwdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGNvbmZpZy5kZXBlbmRlbmNpZXMgPSBjb25maWcuZGVwZW5kZW5jaWVzIHx8IFtdO1xuICAgICAgaWYgKGRlcGVuZGVuY2llcykge1xuICAgICAgICBjb25maWcuZGVwZW5kZW5jaWVzLnVuc2hpZnQoLi4uZGVwZW5kZW5jaWVzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRhc2tTY2hlZHVsZXIuc2NoZWR1bGUoY29uZmlnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIGNyZWF0ZVNjaGVtYXRpYyhcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbjxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sXG4gICAgYWxsb3dQcml2YXRlID0gZmFsc2UsXG4gICk6IFNjaGVtYXRpYzxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4ge1xuICAgIGNvbnN0IGNvbGxlY3Rpb25JbXBsID0gdGhpcy5fY29sbGVjdGlvbkNhY2hlLmdldChjb2xsZWN0aW9uLmRlc2NyaXB0aW9uLm5hbWUpO1xuICAgIGNvbnN0IHNjaGVtYXRpY01hcCA9IHRoaXMuX3NjaGVtYXRpY0NhY2hlLmdldChjb2xsZWN0aW9uLmRlc2NyaXB0aW9uLm5hbWUpO1xuICAgIGlmICghY29sbGVjdGlvbkltcGwgfHwgIXNjaGVtYXRpY01hcCB8fCBjb2xsZWN0aW9uSW1wbCAhPT0gY29sbGVjdGlvbikge1xuICAgICAgLy8gVGhpcyBpcyB3ZWlyZCwgbWF5YmUgdGhlIGNvbGxlY3Rpb24gd2FzIGNyZWF0ZWQgYnkgYW5vdGhlciBlbmdpbmU/XG4gICAgICB0aHJvdyBuZXcgVW5rbm93bkNvbGxlY3Rpb25FeGNlcHRpb24oY29sbGVjdGlvbi5kZXNjcmlwdGlvbi5uYW1lKTtcbiAgICB9XG5cbiAgICBsZXQgc2NoZW1hdGljID0gc2NoZW1hdGljTWFwLmdldChuYW1lKTtcbiAgICBpZiAoc2NoZW1hdGljKSB7XG4gICAgICByZXR1cm4gc2NoZW1hdGljO1xuICAgIH1cblxuICAgIGxldCBjb2xsZWN0aW9uRGVzY3JpcHRpb24gPSBjb2xsZWN0aW9uLmRlc2NyaXB0aW9uO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IHRoaXMuX2hvc3QuY3JlYXRlU2NoZW1hdGljRGVzY3JpcHRpb24obmFtZSwgY29sbGVjdGlvbi5kZXNjcmlwdGlvbik7XG4gICAgaWYgKCFkZXNjcmlwdGlvbikge1xuICAgICAgaWYgKGNvbGxlY3Rpb24uYmFzZURlc2NyaXB0aW9ucykge1xuICAgICAgICBmb3IgKGNvbnN0IGJhc2Ugb2YgY29sbGVjdGlvbi5iYXNlRGVzY3JpcHRpb25zKSB7XG4gICAgICAgICAgZGVzY3JpcHRpb24gPSB0aGlzLl9ob3N0LmNyZWF0ZVNjaGVtYXRpY0Rlc2NyaXB0aW9uKG5hbWUsIGJhc2UpO1xuICAgICAgICAgIGlmIChkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgY29sbGVjdGlvbkRlc2NyaXB0aW9uID0gYmFzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFkZXNjcmlwdGlvbikge1xuICAgICAgICAvLyBSZXBvcnQgdGhlIGVycm9yIGZvciB0aGUgdG9wIGxldmVsIHNjaGVtYXRpYyBjb2xsZWN0aW9uXG4gICAgICAgIHRocm93IG5ldyBVbmtub3duU2NoZW1hdGljRXhjZXB0aW9uKG5hbWUsIGNvbGxlY3Rpb24uZGVzY3JpcHRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkZXNjcmlwdGlvbi5wcml2YXRlICYmICFhbGxvd1ByaXZhdGUpIHtcbiAgICAgIHRocm93IG5ldyBQcml2YXRlU2NoZW1hdGljRXhjZXB0aW9uKG5hbWUsIGNvbGxlY3Rpb24uZGVzY3JpcHRpb24pO1xuICAgIH1cblxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLl9ob3N0LmdldFNjaGVtYXRpY1J1bGVGYWN0b3J5KGRlc2NyaXB0aW9uLCBjb2xsZWN0aW9uRGVzY3JpcHRpb24pO1xuICAgIHNjaGVtYXRpYyA9IG5ldyBTY2hlbWF0aWNJbXBsPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPihkZXNjcmlwdGlvbiwgZmFjdG9yeSwgY29sbGVjdGlvbiwgdGhpcyk7XG5cbiAgICBzY2hlbWF0aWNNYXAuc2V0KG5hbWUsIHNjaGVtYXRpYyk7XG5cbiAgICByZXR1cm4gc2NoZW1hdGljO1xuICB9XG5cbiAgbGlzdFNjaGVtYXRpY05hbWVzKGNvbGxlY3Rpb246IENvbGxlY3Rpb248Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+KTogc3RyaW5nW10ge1xuICAgIGNvbnN0IG5hbWVzID0gdGhpcy5faG9zdC5saXN0U2NoZW1hdGljTmFtZXMoY29sbGVjdGlvbi5kZXNjcmlwdGlvbik7XG5cbiAgICBpZiAoY29sbGVjdGlvbi5iYXNlRGVzY3JpcHRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IGJhc2Ugb2YgY29sbGVjdGlvbi5iYXNlRGVzY3JpcHRpb25zKSB7XG4gICAgICAgIG5hbWVzLnB1c2goLi4udGhpcy5faG9zdC5saXN0U2NoZW1hdGljTmFtZXMoYmFzZSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkdXBsaWNhdGVzXG4gICAgcmV0dXJuIFsuLi5uZXcgU2V0KG5hbWVzKV07XG4gIH1cblxuICB0cmFuc2Zvcm1PcHRpb25zPE9wdGlvblQgZXh0ZW5kcyBvYmplY3QsIFJlc3VsdFQgZXh0ZW5kcyBvYmplY3Q+KFxuICAgIHNjaGVtYXRpYzogU2NoZW1hdGljPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPixcbiAgICBvcHRpb25zOiBPcHRpb25ULFxuICApOiBPYnNlcnZhYmxlPFJlc3VsdFQ+IHtcbiAgICByZXR1cm4gdGhpcy5faG9zdC50cmFuc2Zvcm1PcHRpb25zPE9wdGlvblQsIFJlc3VsdFQ+KHNjaGVtYXRpYy5kZXNjcmlwdGlvbiwgb3B0aW9ucyk7XG4gIH1cblxuICBjcmVhdGVTb3VyY2VGcm9tVXJsKHVybDogVXJsLCBjb250ZXh0OiBUeXBlZFNjaGVtYXRpY0NvbnRleHQ8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+KTogU291cmNlIHtcbiAgICBzd2l0Y2ggKHVybC5wcm90b2NvbCkge1xuICAgICAgY2FzZSAnbnVsbDonOiByZXR1cm4gKCkgPT4gbmV3IE51bGxUcmVlKCk7XG4gICAgICBjYXNlICdlbXB0eTonOiByZXR1cm4gKCkgPT4gZW1wdHkoKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnN0IGhvc3RTb3VyY2UgPSB0aGlzLl9ob3N0LmNyZWF0ZVNvdXJjZUZyb21VcmwodXJsLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKCFob3N0U291cmNlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFVua25vd25VcmxTb3VyY2VQcm90b2NvbCh1cmwudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaG9zdFNvdXJjZTtcbiAgICB9XG4gIH1cblxuICBleGVjdXRlUG9zdFRhc2tzKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGNvbnN0IGV4ZWN1dG9ycyA9IG5ldyBNYXA8c3RyaW5nLCBUYXNrRXhlY3V0b3I+KCk7XG5cbiAgICBjb25zdCB0YXNrT2JzZXJ2YWJsZSA9IG9ic2VydmFibGVGcm9tKHRoaXMuX3Rhc2tTY2hlZHVsZXJzKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNvbmNhdE1hcChzY2hlZHVsZXIgPT4gc2NoZWR1bGVyLmZpbmFsaXplKCkpLFxuICAgICAgICBjb25jYXRNYXAodGFzayA9PiB7XG4gICAgICAgICAgY29uc3QgeyBuYW1lLCBvcHRpb25zIH0gPSB0YXNrLmNvbmZpZ3VyYXRpb247XG5cbiAgICAgICAgICBjb25zdCBleGVjdXRvciA9IGV4ZWN1dG9ycy5nZXQobmFtZSk7XG4gICAgICAgICAgaWYgKGV4ZWN1dG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhlY3V0b3Iob3B0aW9ucywgdGFzay5jb250ZXh0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5faG9zdC5jcmVhdGVUYXNrRXhlY3V0b3IobmFtZSlcbiAgICAgICAgICAgIC5waXBlKGNvbmNhdE1hcChleGVjdXRvciA9PiB7XG4gICAgICAgICAgICAgIGV4ZWN1dG9ycy5zZXQobmFtZSwgZXhlY3V0b3IpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBleGVjdXRvcihvcHRpb25zLCB0YXNrLmNvbnRleHQpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICByZXR1cm4gdGFza09ic2VydmFibGU7XG4gIH1cbn1cbiJdfQ==