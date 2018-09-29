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
const node_1 = require("@angular-devkit/core/node");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const src_1 = require("../src");
const file_system_utility_1 = require("./file-system-utility");
class CollectionCannotBeResolvedException extends core_1.BaseException {
    constructor(name) {
        super(`Collection ${JSON.stringify(name)} cannot be resolved.`);
    }
}
exports.CollectionCannotBeResolvedException = CollectionCannotBeResolvedException;
class InvalidCollectionJsonException extends core_1.BaseException {
    constructor(_name, path) {
        super(`Collection JSON at path ${JSON.stringify(path)} is invalid.`);
    }
}
exports.InvalidCollectionJsonException = InvalidCollectionJsonException;
class SchematicMissingFactoryException extends core_1.BaseException {
    constructor(name) {
        super(`Schematic ${JSON.stringify(name)} is missing a factory.`);
    }
}
exports.SchematicMissingFactoryException = SchematicMissingFactoryException;
class FactoryCannotBeResolvedException extends core_1.BaseException {
    constructor(name) {
        super(`Schematic ${JSON.stringify(name)} cannot resolve the factory.`);
    }
}
exports.FactoryCannotBeResolvedException = FactoryCannotBeResolvedException;
class CollectionMissingSchematicsMapException extends core_1.BaseException {
    constructor(name) { super(`Collection "${name}" does not have a schematics map.`); }
}
exports.CollectionMissingSchematicsMapException = CollectionMissingSchematicsMapException;
class CollectionMissingFieldsException extends core_1.BaseException {
    constructor(name) { super(`Collection "${name}" is missing fields.`); }
}
exports.CollectionMissingFieldsException = CollectionMissingFieldsException;
class SchematicMissingFieldsException extends core_1.BaseException {
    constructor(name) { super(`Schematic "${name}" is missing fields.`); }
}
exports.SchematicMissingFieldsException = SchematicMissingFieldsException;
class SchematicMissingDescriptionException extends core_1.BaseException {
    constructor(name) { super(`Schematics "${name}" does not have a description.`); }
}
exports.SchematicMissingDescriptionException = SchematicMissingDescriptionException;
class SchematicNameCollisionException extends core_1.BaseException {
    constructor(name) {
        super(`Schematics/alias ${JSON.stringify(name)} collides with another alias or schematic`
            + ' name.');
    }
}
exports.SchematicNameCollisionException = SchematicNameCollisionException;
/**
 * A EngineHost base class that uses the file system to resolve collections. This is the base of
 * all other EngineHost provided by the tooling part of the Schematics library.
 */
class FileSystemEngineHostBase {
    constructor() {
        this._transforms = [];
        this._taskFactories = new Map();
    }
    /**
     * @deprecated Use `listSchematicNames`.
     */
    listSchematics(collection) {
        return this.listSchematicNames(collection.description);
    }
    listSchematicNames(collection) {
        const schematics = [];
        for (const key of Object.keys(collection.schematics)) {
            const schematic = collection.schematics[key];
            if (schematic.hidden || schematic.private) {
                continue;
            }
            // If extends is present without a factory it is an alias, do not return it
            //   unless it is from another collection.
            if (!schematic.extends || schematic.factory) {
                schematics.push(key);
            }
            else if (schematic.extends && schematic.extends.indexOf(':') !== -1) {
                schematics.push(key);
            }
        }
        return schematics;
    }
    registerOptionsTransform(t) {
        this._transforms.push(t);
    }
    /**
     *
     * @param name
     * @return {{path: string}}
     */
    createCollectionDescription(name) {
        const path = this._resolveCollectionPath(name);
        const jsonValue = file_system_utility_1.readJsonFile(path);
        if (!jsonValue || typeof jsonValue != 'object' || Array.isArray(jsonValue)) {
            throw new InvalidCollectionJsonException(name, path);
        }
        // normalize extends property to an array
        if (typeof jsonValue['extends'] === 'string') {
            jsonValue['extends'] = [jsonValue['extends']];
        }
        const description = this._transformCollectionDescription(name, Object.assign({}, jsonValue, { path }));
        if (!description || !description.name) {
            throw new InvalidCollectionJsonException(name, path);
        }
        // Validate aliases.
        const allNames = Object.keys(description.schematics);
        for (const schematicName of Object.keys(description.schematics)) {
            const aliases = description.schematics[schematicName].aliases || [];
            for (const alias of aliases) {
                if (allNames.indexOf(alias) != -1) {
                    throw new SchematicNameCollisionException(alias);
                }
            }
            allNames.push(...aliases);
        }
        return description;
    }
    createSchematicDescription(name, collection) {
        // Resolve aliases first.
        for (const schematicName of Object.keys(collection.schematics)) {
            const schematicDescription = collection.schematics[schematicName];
            if (schematicDescription.aliases && schematicDescription.aliases.indexOf(name) != -1) {
                name = schematicName;
                break;
            }
        }
        if (!(name in collection.schematics)) {
            return null;
        }
        const collectionPath = path_1.dirname(collection.path);
        const partialDesc = collection.schematics[name];
        if (!partialDesc) {
            return null;
        }
        if (partialDesc.extends) {
            const index = partialDesc.extends.indexOf(':');
            const collectionName = index !== -1 ? partialDesc.extends.substr(0, index) : null;
            const schematicName = index === -1 ?
                partialDesc.extends : partialDesc.extends.substr(index + 1);
            if (collectionName !== null) {
                const extendCollection = this.createCollectionDescription(collectionName);
                return this.createSchematicDescription(schematicName, extendCollection);
            }
            else {
                return this.createSchematicDescription(schematicName, collection);
            }
        }
        // Use any on this ref as we don't have the OptionT here, but we don't need it (we only need
        // the path).
        if (!partialDesc.factory) {
            throw new SchematicMissingFactoryException(name);
        }
        const resolvedRef = this._resolveReferenceString(partialDesc.factory, collectionPath);
        if (!resolvedRef) {
            throw new FactoryCannotBeResolvedException(name);
        }
        const { path } = resolvedRef;
        let schema = partialDesc.schema;
        let schemaJson = undefined;
        if (schema) {
            if (!path_1.isAbsolute(schema)) {
                schema = path_1.join(collectionPath, schema);
            }
            schemaJson = file_system_utility_1.readJsonFile(schema);
        }
        return this._transformSchematicDescription(name, collection, Object.assign({}, partialDesc, { schema,
            schemaJson,
            name,
            path, factoryFn: resolvedRef.ref, collection }));
    }
    createSourceFromUrl(url) {
        switch (url.protocol) {
            case null:
            case 'file:':
                return (context) => {
                    // Resolve all file:///a/b/c/d from the schematic's own path, and not the current
                    // path.
                    const root = core_1.normalize(path_1.resolve(path_1.dirname(context.schematic.description.path), url.path || ''));
                    return new src_1.HostCreateTree(new core_1.virtualFs.ScopedHost(new node_1.NodeJsSyncHost(), root));
                };
        }
        return null;
    }
    transformOptions(schematic, options) {
        return (rxjs_1.of(options)
            .pipe(...this._transforms.map(tFn => operators_1.mergeMap(opt => {
            const newOptions = tFn(schematic, opt);
            if (core_1.isObservable(newOptions)) {
                return newOptions;
            }
            else {
                return rxjs_1.of(newOptions);
            }
        }))));
    }
    transformContext(context) {
        return context;
    }
    getSchematicRuleFactory(schematic, _collection) {
        return schematic.factoryFn;
    }
    registerTaskExecutor(factory, options) {
        this._taskFactories.set(factory.name, () => rxjs_1.from(factory.create(options)));
    }
    createTaskExecutor(name) {
        const factory = this._taskFactories.get(name);
        if (factory) {
            return factory();
        }
        return rxjs_1.throwError(new src_1.UnregisteredTaskException(name));
    }
    hasTaskExecutor(name) {
        return this._taskFactories.has(name);
    }
}
exports.FileSystemEngineHostBase = FileSystemEngineHostBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zeXN0ZW0tZW5naW5lLWhvc3QtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy90b29scy9maWxlLXN5c3RlbS1lbmdpbmUtaG9zdC1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0NBTThCO0FBQzlCLG9EQUEyRDtBQUMzRCwrQkFBMEQ7QUFDMUQsK0JBQTBGO0FBQzFGLDhDQUEwQztBQUUxQyxnQ0FRZ0I7QUFTaEIsK0RBQXFEO0FBT3JELHlDQUFpRCxTQUFRLG9CQUFhO0lBQ3BFLFlBQVksSUFBWTtRQUN0QixLQUFLLENBQUMsY0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDRjtBQUpELGtGQUlDO0FBQ0Qsb0NBQTRDLFNBQVEsb0JBQWE7SUFDL0QsWUFBWSxLQUFhLEVBQUUsSUFBWTtRQUNyQyxLQUFLLENBQUMsMkJBQTJCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Q0FDRjtBQUpELHdFQUlDO0FBQ0Qsc0NBQThDLFNBQVEsb0JBQWE7SUFDakUsWUFBWSxJQUFZO1FBQ3RCLEtBQUssQ0FBQyxhQUFhLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUNGO0FBSkQsNEVBSUM7QUFDRCxzQ0FBOEMsU0FBUSxvQkFBYTtJQUNqRSxZQUFZLElBQVk7UUFDdEIsS0FBSyxDQUFDLGFBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUN6RSxDQUFDO0NBQ0Y7QUFKRCw0RUFJQztBQUNELDZDQUFxRCxTQUFRLG9CQUFhO0lBQ3hFLFlBQVksSUFBWSxJQUFJLEtBQUssQ0FBQyxlQUFlLElBQUks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QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxlQUFlLENBQUMsSUFBWTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGO0FBek5ELDREQXlOQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7XG4gIEJhc2VFeGNlcHRpb24sXG4gIEpzb25PYmplY3QsXG4gIGlzT2JzZXJ2YWJsZSxcbiAgbm9ybWFsaXplLFxuICB2aXJ0dWFsRnMsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IE5vZGVKc1N5bmNIb3N0IH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUvbm9kZSc7XG5pbXBvcnQgeyBkaXJuYW1lLCBpc0Fic29sdXRlLCBqb2luLCByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tIGFzIG9ic2VydmFibGVGcm9tLCBvZiBhcyBvYnNlcnZhYmxlT2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVXJsIH0gZnJvbSAndXJsJztcbmltcG9ydCB7XG4gIEVuZ2luZUhvc3QsXG4gIEhvc3RDcmVhdGVUcmVlLFxuICBSdWxlRmFjdG9yeSxcbiAgU291cmNlLFxuICBUYXNrRXhlY3V0b3IsXG4gIFRhc2tFeGVjdXRvckZhY3RvcnksXG4gIFVucmVnaXN0ZXJlZFRhc2tFeGNlcHRpb24sXG59IGZyb20gJy4uL3NyYyc7XG5pbXBvcnQge1xuICBGaWxlU3lzdGVtQ29sbGVjdGlvbixcbiAgRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjLFxuICBGaWxlU3lzdGVtQ29sbGVjdGlvbkRlc2NyaXB0aW9uLFxuICBGaWxlU3lzdGVtU2NoZW1hdGljQ29udGV4dCxcbiAgRmlsZVN5c3RlbVNjaGVtYXRpY0Rlc2MsXG4gIEZpbGVTeXN0ZW1TY2hlbWF0aWNEZXNjcmlwdGlvbixcbn0gZnJvbSAnLi9kZXNjcmlwdGlvbic7XG5pbXBvcnQgeyByZWFkSnNvbkZpbGUgfSBmcm9tICcuL2ZpbGUtc3lzdGVtLXV0aWxpdHknO1xuXG5cbmV4cG9ydCBkZWNsYXJlIHR5cGUgT3B0aW9uVHJhbnNmb3JtPFQgZXh0ZW5kcyBvYmplY3QsIFIgZXh0ZW5kcyBvYmplY3Q+XG4gICAgPSAoc2NoZW1hdGljOiBGaWxlU3lzdGVtU2NoZW1hdGljRGVzY3JpcHRpb24sIG9wdGlvbnM6IFQpID0+IE9ic2VydmFibGU8Uj47XG5cblxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25DYW5ub3RCZVJlc29sdmVkRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKGBDb2xsZWN0aW9uICR7SlNPTi5zdHJpbmdpZnkobmFtZSl9IGNhbm5vdCBiZSByZXNvbHZlZC5gKTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEludmFsaWRDb2xsZWN0aW9uSnNvbkV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihfbmFtZTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgQ29sbGVjdGlvbiBKU09OIGF0IHBhdGggJHtKU09OLnN0cmluZ2lmeShwYXRoKX0gaXMgaW52YWxpZC5gKTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIFNjaGVtYXRpY01pc3NpbmdGYWN0b3J5RXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKGBTY2hlbWF0aWMgJHtKU09OLnN0cmluZ2lmeShuYW1lKX0gaXMgbWlzc2luZyBhIGZhY3RvcnkuYCk7XG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBGYWN0b3J5Q2Fubm90QmVSZXNvbHZlZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgU2NoZW1hdGljICR7SlNPTi5zdHJpbmdpZnkobmFtZSl9IGNhbm5vdCByZXNvbHZlIHRoZSBmYWN0b3J5LmApO1xuICB9XG59XG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbk1pc3NpbmdTY2hlbWF0aWNzTWFwRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykgeyBzdXBlcihgQ29sbGVjdGlvbiBcIiR7bmFtZX1cIiBkb2VzIG5vdCBoYXZlIGEgc2NoZW1hdGljcyBtYXAuYCk7IH1cbn1cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uTWlzc2luZ0ZpZWxkc0V4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHsgc3VwZXIoYENvbGxlY3Rpb24gXCIke25hbWV9XCIgaXMgbWlzc2luZyBmaWVsZHMuYCk7IH1cbn1cbmV4cG9ydCBjbGFzcyBTY2hlbWF0aWNNaXNzaW5nRmllbGRzRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykgeyBzdXBlcihgU2NoZW1hdGljIFwiJHtuYW1lfVwiIGlzIG1pc3NpbmcgZmllbGRzLmApOyB9XG59XG5leHBvcnQgY2xhc3MgU2NoZW1hdGljTWlzc2luZ0Rlc2NyaXB0aW9uRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykgeyBzdXBlcihgU2NoZW1hdGljcyBcIiR7bmFtZX1cIiBkb2VzIG5vdCBoYXZlIGEgZGVzY3JpcHRpb24uYCk7IH1cbn1cbmV4cG9ydCBjbGFzcyBTY2hlbWF0aWNOYW1lQ29sbGlzaW9uRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHN1cGVyKGBTY2hlbWF0aWNzL2FsaWFzICR7SlNPTi5zdHJpbmdpZnkobmFtZSl9IGNvbGxpZGVzIHdpdGggYW5vdGhlciBhbGlhcyBvciBzY2hlbWF0aWNgXG4gICAgICAgICAgKyAnIG5hbWUuJyk7XG4gIH1cbn1cblxuXG4vKipcbiAqIEEgRW5naW5lSG9zdCBiYXNlIGNsYXNzIHRoYXQgdXNlcyB0aGUgZmlsZSBzeXN0ZW0gdG8gcmVzb2x2ZSBjb2xsZWN0aW9ucy4gVGhpcyBpcyB0aGUgYmFzZSBvZlxuICogYWxsIG90aGVyIEVuZ2luZUhvc3QgcHJvdmlkZWQgYnkgdGhlIHRvb2xpbmcgcGFydCBvZiB0aGUgU2NoZW1hdGljcyBsaWJyYXJ5LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmlsZVN5c3RlbUVuZ2luZUhvc3RCYXNlIGltcGxlbWVudHNcbiAgICBFbmdpbmVIb3N0PEZpbGVTeXN0ZW1Db2xsZWN0aW9uRGVzY3JpcHRpb24sIEZpbGVTeXN0ZW1TY2hlbWF0aWNEZXNjcmlwdGlvbj4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX3Jlc29sdmVDb2xsZWN0aW9uUGF0aChuYW1lOiBzdHJpbmcpOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfcmVzb2x2ZVJlZmVyZW5jZVN0cmluZyhcbiAgICAgIG5hbWU6IHN0cmluZywgcGFyZW50UGF0aDogc3RyaW5nKTogeyByZWY6IFJ1bGVGYWN0b3J5PHt9PiwgcGF0aDogc3RyaW5nIH0gfCBudWxsO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX3RyYW5zZm9ybUNvbGxlY3Rpb25EZXNjcmlwdGlvbihcbiAgICAgIG5hbWU6IHN0cmluZywgZGVzYzogUGFydGlhbDxGaWxlU3lzdGVtQ29sbGVjdGlvbkRlc2M+KTogRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX3RyYW5zZm9ybVNjaGVtYXRpY0Rlc2NyaXB0aW9uKFxuICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgY29sbGVjdGlvbjogRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjLFxuICAgICAgZGVzYzogUGFydGlhbDxGaWxlU3lzdGVtU2NoZW1hdGljRGVzYz4pOiBGaWxlU3lzdGVtU2NoZW1hdGljRGVzYztcblxuICBwcml2YXRlIF90cmFuc2Zvcm1zOiBPcHRpb25UcmFuc2Zvcm08e30sIHt9PltdID0gW107XG4gIHByaXZhdGUgX3Rhc2tGYWN0b3JpZXMgPSBuZXcgTWFwPHN0cmluZywgKCkgPT4gT2JzZXJ2YWJsZTxUYXNrRXhlY3V0b3I+PigpO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYGxpc3RTY2hlbWF0aWNOYW1lc2AuXG4gICAqL1xuICBsaXN0U2NoZW1hdGljcyhjb2xsZWN0aW9uOiBGaWxlU3lzdGVtQ29sbGVjdGlvbik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5saXN0U2NoZW1hdGljTmFtZXMoY29sbGVjdGlvbi5kZXNjcmlwdGlvbik7XG4gIH1cbiAgbGlzdFNjaGVtYXRpY05hbWVzKGNvbGxlY3Rpb246IEZpbGVTeXN0ZW1Db2xsZWN0aW9uRGVzYykge1xuICAgIGNvbnN0IHNjaGVtYXRpY3M6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoY29sbGVjdGlvbi5zY2hlbWF0aWNzKSkge1xuICAgICAgY29uc3Qgc2NoZW1hdGljID0gY29sbGVjdGlvbi5zY2hlbWF0aWNzW2tleV07XG5cbiAgICAgIGlmIChzY2hlbWF0aWMuaGlkZGVuIHx8IHNjaGVtYXRpYy5wcml2YXRlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBleHRlbmRzIGlzIHByZXNlbnQgd2l0aG91dCBhIGZhY3RvcnkgaXQgaXMgYW4gYWxpYXMsIGRvIG5vdCByZXR1cm4gaXRcbiAgICAgIC8vICAgdW5sZXNzIGl0IGlzIGZyb20gYW5vdGhlciBjb2xsZWN0aW9uLlxuICAgICAgaWYgKCFzY2hlbWF0aWMuZXh0ZW5kcyB8fCBzY2hlbWF0aWMuZmFjdG9yeSkge1xuICAgICAgICBzY2hlbWF0aWNzLnB1c2goa2V5KTtcbiAgICAgIH0gZWxzZSBpZiAoc2NoZW1hdGljLmV4dGVuZHMgJiYgc2NoZW1hdGljLmV4dGVuZHMuaW5kZXhPZignOicpICE9PSAtMSkge1xuICAgICAgICBzY2hlbWF0aWNzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2NoZW1hdGljcztcbiAgfVxuXG4gIHJlZ2lzdGVyT3B0aW9uc1RyYW5zZm9ybTxUIGV4dGVuZHMgb2JqZWN0LCBSIGV4dGVuZHMgb2JqZWN0Pih0OiBPcHRpb25UcmFuc2Zvcm08VCwgUj4pIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1zLnB1c2godCk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHJldHVybiB7e3BhdGg6IHN0cmluZ319XG4gICAqL1xuICBjcmVhdGVDb2xsZWN0aW9uRGVzY3JpcHRpb24obmFtZTogc3RyaW5nKTogRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjIHtcbiAgICBjb25zdCBwYXRoID0gdGhpcy5fcmVzb2x2ZUNvbGxlY3Rpb25QYXRoKG5hbWUpO1xuICAgIGNvbnN0IGpzb25WYWx1ZSA9IHJlYWRKc29uRmlsZShwYXRoKTtcbiAgICBpZiAoIWpzb25WYWx1ZSB8fCB0eXBlb2YganNvblZhbHVlICE9ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkoanNvblZhbHVlKSkge1xuICAgICAgdGhyb3cgbmV3IEludmFsaWRDb2xsZWN0aW9uSnNvbkV4Y2VwdGlvbihuYW1lLCBwYXRoKTtcbiAgICB9XG5cbiAgICAvLyBub3JtYWxpemUgZXh0ZW5kcyBwcm9wZXJ0eSB0byBhbiBhcnJheVxuICAgIGlmICh0eXBlb2YganNvblZhbHVlWydleHRlbmRzJ10gPT09ICdzdHJpbmcnKSB7XG4gICAgICBqc29uVmFsdWVbJ2V4dGVuZHMnXSA9IFtqc29uVmFsdWVbJ2V4dGVuZHMnXV07XG4gICAgfVxuXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB0aGlzLl90cmFuc2Zvcm1Db2xsZWN0aW9uRGVzY3JpcHRpb24obmFtZSwge1xuICAgICAgLi4uanNvblZhbHVlLFxuICAgICAgcGF0aCxcbiAgICB9KTtcbiAgICBpZiAoIWRlc2NyaXB0aW9uIHx8ICFkZXNjcmlwdGlvbi5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZENvbGxlY3Rpb25Kc29uRXhjZXB0aW9uKG5hbWUsIHBhdGgpO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIGFsaWFzZXMuXG4gICAgY29uc3QgYWxsTmFtZXMgPSBPYmplY3Qua2V5cyhkZXNjcmlwdGlvbi5zY2hlbWF0aWNzKTtcbiAgICBmb3IgKGNvbnN0IHNjaGVtYXRpY05hbWUgb2YgT2JqZWN0LmtleXMoZGVzY3JpcHRpb24uc2NoZW1hdGljcykpIHtcbiAgICAgIGNvbnN0IGFsaWFzZXMgPSBkZXNjcmlwdGlvbi5zY2hlbWF0aWNzW3NjaGVtYXRpY05hbWVdLmFsaWFzZXMgfHwgW107XG5cbiAgICAgIGZvciAoY29uc3QgYWxpYXMgb2YgYWxpYXNlcykge1xuICAgICAgICBpZiAoYWxsTmFtZXMuaW5kZXhPZihhbGlhcykgIT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU2NoZW1hdGljTmFtZUNvbGxpc2lvbkV4Y2VwdGlvbihhbGlhcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYWxsTmFtZXMucHVzaCguLi5hbGlhc2VzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gIH1cblxuICBjcmVhdGVTY2hlbWF0aWNEZXNjcmlwdGlvbihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgY29sbGVjdGlvbjogRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjLFxuICApOiBGaWxlU3lzdGVtU2NoZW1hdGljRGVzYyB8IG51bGwge1xuICAgIC8vIFJlc29sdmUgYWxpYXNlcyBmaXJzdC5cbiAgICBmb3IgKGNvbnN0IHNjaGVtYXRpY05hbWUgb2YgT2JqZWN0LmtleXMoY29sbGVjdGlvbi5zY2hlbWF0aWNzKSkge1xuICAgICAgY29uc3Qgc2NoZW1hdGljRGVzY3JpcHRpb24gPSBjb2xsZWN0aW9uLnNjaGVtYXRpY3Nbc2NoZW1hdGljTmFtZV07XG4gICAgICBpZiAoc2NoZW1hdGljRGVzY3JpcHRpb24uYWxpYXNlcyAmJiBzY2hlbWF0aWNEZXNjcmlwdGlvbi5hbGlhc2VzLmluZGV4T2YobmFtZSkgIT0gLTEpIHtcbiAgICAgICAgbmFtZSA9IHNjaGVtYXRpY05hbWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghKG5hbWUgaW4gY29sbGVjdGlvbi5zY2hlbWF0aWNzKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY29sbGVjdGlvblBhdGggPSBkaXJuYW1lKGNvbGxlY3Rpb24ucGF0aCk7XG4gICAgY29uc3QgcGFydGlhbERlc2M6IFBhcnRpYWw8RmlsZVN5c3RlbVNjaGVtYXRpY0Rlc2M+IHwgbnVsbCA9IGNvbGxlY3Rpb24uc2NoZW1hdGljc1tuYW1lXTtcbiAgICBpZiAoIXBhcnRpYWxEZXNjKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAocGFydGlhbERlc2MuZXh0ZW5kcykge1xuICAgICAgY29uc3QgaW5kZXggPSBwYXJ0aWFsRGVzYy5leHRlbmRzLmluZGV4T2YoJzonKTtcbiAgICAgIGNvbnN0IGNvbGxlY3Rpb25OYW1lID0gaW5kZXggIT09IC0xID8gcGFydGlhbERlc2MuZXh0ZW5kcy5zdWJzdHIoMCwgaW5kZXgpIDogbnVsbDtcbiAgICAgIGNvbnN0IHNjaGVtYXRpY05hbWUgPSBpbmRleCA9PT0gLTEgP1xuICAgICAgICBwYXJ0aWFsRGVzYy5leHRlbmRzIDogcGFydGlhbERlc2MuZXh0ZW5kcy5zdWJzdHIoaW5kZXggKyAxKTtcblxuICAgICAgaWYgKGNvbGxlY3Rpb25OYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZENvbGxlY3Rpb24gPSB0aGlzLmNyZWF0ZUNvbGxlY3Rpb25EZXNjcmlwdGlvbihjb2xsZWN0aW9uTmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlU2NoZW1hdGljRGVzY3JpcHRpb24oc2NoZW1hdGljTmFtZSwgZXh0ZW5kQ29sbGVjdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTY2hlbWF0aWNEZXNjcmlwdGlvbihzY2hlbWF0aWNOYW1lLCBjb2xsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVXNlIGFueSBvbiB0aGlzIHJlZiBhcyB3ZSBkb24ndCBoYXZlIHRoZSBPcHRpb25UIGhlcmUsIGJ1dCB3ZSBkb24ndCBuZWVkIGl0ICh3ZSBvbmx5IG5lZWRcbiAgICAvLyB0aGUgcGF0aCkuXG4gICAgaWYgKCFwYXJ0aWFsRGVzYy5mYWN0b3J5KSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljTWlzc2luZ0ZhY3RvcnlFeGNlcHRpb24obmFtZSk7XG4gICAgfVxuICAgIGNvbnN0IHJlc29sdmVkUmVmID0gdGhpcy5fcmVzb2x2ZVJlZmVyZW5jZVN0cmluZyhwYXJ0aWFsRGVzYy5mYWN0b3J5LCBjb2xsZWN0aW9uUGF0aCk7XG4gICAgaWYgKCFyZXNvbHZlZFJlZikge1xuICAgICAgdGhyb3cgbmV3IEZhY3RvcnlDYW5ub3RCZVJlc29sdmVkRXhjZXB0aW9uKG5hbWUpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgcGF0aCB9ID0gcmVzb2x2ZWRSZWY7XG4gICAgbGV0IHNjaGVtYSA9IHBhcnRpYWxEZXNjLnNjaGVtYTtcbiAgICBsZXQgc2NoZW1hSnNvbjogSnNvbk9iamVjdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoc2NoZW1hKSB7XG4gICAgICBpZiAoIWlzQWJzb2x1dGUoc2NoZW1hKSkge1xuICAgICAgICBzY2hlbWEgPSBqb2luKGNvbGxlY3Rpb25QYXRoLCBzY2hlbWEpO1xuICAgICAgfVxuICAgICAgc2NoZW1hSnNvbiA9IHJlYWRKc29uRmlsZShzY2hlbWEpIGFzIEpzb25PYmplY3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybVNjaGVtYXRpY0Rlc2NyaXB0aW9uKG5hbWUsIGNvbGxlY3Rpb24sIHtcbiAgICAgIC4uLnBhcnRpYWxEZXNjLFxuICAgICAgc2NoZW1hLFxuICAgICAgc2NoZW1hSnNvbixcbiAgICAgIG5hbWUsXG4gICAgICBwYXRoLFxuICAgICAgZmFjdG9yeUZuOiByZXNvbHZlZFJlZi5yZWYsXG4gICAgICBjb2xsZWN0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlU291cmNlRnJvbVVybCh1cmw6IFVybCk6IFNvdXJjZSB8IG51bGwge1xuICAgIHN3aXRjaCAodXJsLnByb3RvY29sKSB7XG4gICAgICBjYXNlIG51bGw6XG4gICAgICBjYXNlICdmaWxlOic6XG4gICAgICAgIHJldHVybiAoY29udGV4dDogRmlsZVN5c3RlbVNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGFsbCBmaWxlOi8vL2EvYi9jL2QgZnJvbSB0aGUgc2NoZW1hdGljJ3Mgb3duIHBhdGgsIGFuZCBub3QgdGhlIGN1cnJlbnRcbiAgICAgICAgICAvLyBwYXRoLlxuICAgICAgICAgIGNvbnN0IHJvb3QgPSBub3JtYWxpemUoXG4gICAgICAgICAgICByZXNvbHZlKGRpcm5hbWUoY29udGV4dC5zY2hlbWF0aWMuZGVzY3JpcHRpb24ucGF0aCksIHVybC5wYXRoIHx8ICcnKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcmV0dXJuIG5ldyBIb3N0Q3JlYXRlVHJlZShuZXcgdmlydHVhbEZzLlNjb3BlZEhvc3QobmV3IE5vZGVKc1N5bmNIb3N0KCksIHJvb3QpKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRyYW5zZm9ybU9wdGlvbnM8T3B0aW9uVCBleHRlbmRzIG9iamVjdCwgUmVzdWx0VCBleHRlbmRzIG9iamVjdD4oXG4gICAgc2NoZW1hdGljOiBGaWxlU3lzdGVtU2NoZW1hdGljRGVzYyxcbiAgICBvcHRpb25zOiBPcHRpb25ULFxuICApOiBPYnNlcnZhYmxlPFJlc3VsdFQ+IHtcbiAgICByZXR1cm4gKG9ic2VydmFibGVPZihvcHRpb25zKVxuICAgICAgLnBpcGUoXG4gICAgICAgIC4uLnRoaXMuX3RyYW5zZm9ybXMubWFwKHRGbiA9PiBtZXJnZU1hcChvcHQgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld09wdGlvbnMgPSB0Rm4oc2NoZW1hdGljLCBvcHQpO1xuICAgICAgICAgIGlmIChpc09ic2VydmFibGUobmV3T3B0aW9ucykpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdPcHRpb25zO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZU9mKG5ld09wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpLFxuICAgICAgKSkgYXMge30gYXMgT2JzZXJ2YWJsZTxSZXN1bHRUPjtcbiAgfVxuXG4gIHRyYW5zZm9ybUNvbnRleHQoY29udGV4dDogRmlsZVN5c3RlbVNjaGVtYXRpY0NvbnRleHQpOiBGaWxlU3lzdGVtU2NoZW1hdGljQ29udGV4dCB7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cblxuICBnZXRTY2hlbWF0aWNSdWxlRmFjdG9yeTxPcHRpb25UIGV4dGVuZHMgb2JqZWN0PihcbiAgICBzY2hlbWF0aWM6IEZpbGVTeXN0ZW1TY2hlbWF0aWNEZXNjLFxuICAgIF9jb2xsZWN0aW9uOiBGaWxlU3lzdGVtQ29sbGVjdGlvbkRlc2MpOiBSdWxlRmFjdG9yeTxPcHRpb25UPiB7XG4gICAgcmV0dXJuIHNjaGVtYXRpYy5mYWN0b3J5Rm47XG4gIH1cblxuICByZWdpc3RlclRhc2tFeGVjdXRvcjxUPihmYWN0b3J5OiBUYXNrRXhlY3V0b3JGYWN0b3J5PFQ+LCBvcHRpb25zPzogVCk6IHZvaWQge1xuICAgIHRoaXMuX3Rhc2tGYWN0b3JpZXMuc2V0KGZhY3RvcnkubmFtZSwgKCkgPT4gb2JzZXJ2YWJsZUZyb20oZmFjdG9yeS5jcmVhdGUob3B0aW9ucykpKTtcbiAgfVxuXG4gIGNyZWF0ZVRhc2tFeGVjdXRvcihuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFRhc2tFeGVjdXRvcj4ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLl90YXNrRmFjdG9yaWVzLmdldChuYW1lKTtcbiAgICBpZiAoZmFjdG9yeSkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgVW5yZWdpc3RlcmVkVGFza0V4Y2VwdGlvbihuYW1lKSk7XG4gIH1cblxuICBoYXNUYXNrRXhlY3V0b3IobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Rhc2tGYWN0b3JpZXMuaGFzKG5hbWUpO1xuICB9XG59XG4iXX0=