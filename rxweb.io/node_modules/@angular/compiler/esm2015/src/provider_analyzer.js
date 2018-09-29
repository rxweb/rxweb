/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { tokenName, tokenReference } from './compile_metadata';
import { Identifiers, createTokenForExternalReference } from './identifiers';
import { ParseError } from './parse_util';
import { ProviderAst, ProviderAstType } from './template_parser/template_ast';
export class ProviderError extends ParseError {
    constructor(message, span) { super(span, message); }
}
export class ProviderViewContext {
    constructor(reflector, component) {
        this.reflector = reflector;
        this.component = component;
        this.errors = [];
        this.viewQueries = _getViewQueries(component);
        this.viewProviders = new Map();
        component.viewProviders.forEach((provider) => {
            if (this.viewProviders.get(tokenReference(provider.token)) == null) {
                this.viewProviders.set(tokenReference(provider.token), true);
            }
        });
    }
}
export class ProviderElementContext {
    constructor(viewContext, _parent, _isViewRoot, _directiveAsts, attrs, refs, isTemplate, contentQueryStartId, _sourceSpan) {
        this.viewContext = viewContext;
        this._parent = _parent;
        this._isViewRoot = _isViewRoot;
        this._directiveAsts = _directiveAsts;
        this._sourceSpan = _sourceSpan;
        this._transformedProviders = new Map();
        this._seenProviders = new Map();
        this._queriedTokens = new Map();
        this.transformedHasViewContainer = false;
        this._attrs = {};
        attrs.forEach((attrAst) => this._attrs[attrAst.name] = attrAst.value);
        const directivesMeta = _directiveAsts.map(directiveAst => directiveAst.directive);
        this._allProviders =
            _resolveProvidersFromDirectives(directivesMeta, _sourceSpan, viewContext.errors);
        this._contentQueries = _getContentQueries(contentQueryStartId, directivesMeta);
        Array.from(this._allProviders.values()).forEach((provider) => {
            this._addQueryReadsTo(provider.token, provider.token, this._queriedTokens);
        });
        if (isTemplate) {
            const templateRefId = createTokenForExternalReference(this.viewContext.reflector, Identifiers.TemplateRef);
            this._addQueryReadsTo(templateRefId, templateRefId, this._queriedTokens);
        }
        refs.forEach((refAst) => {
            let defaultQueryValue = refAst.value ||
                createTokenForExternalReference(this.viewContext.reflector, Identifiers.ElementRef);
            this._addQueryReadsTo({ value: refAst.name }, defaultQueryValue, this._queriedTokens);
        });
        if (this._queriedTokens.get(this.viewContext.reflector.resolveExternalReference(Identifiers.ViewContainerRef))) {
            this.transformedHasViewContainer = true;
        }
        // create the providers that we know are eager first
        Array.from(this._allProviders.values()).forEach((provider) => {
            const eager = provider.eager || this._queriedTokens.get(tokenReference(provider.token));
            if (eager) {
                this._getOrCreateLocalProvider(provider.providerType, provider.token, true);
            }
        });
    }
    afterElement() {
        // collect lazy providers
        Array.from(this._allProviders.values()).forEach((provider) => {
            this._getOrCreateLocalProvider(provider.providerType, provider.token, false);
        });
    }
    get transformProviders() {
        // Note: Maps keep their insertion order.
        const lazyProviders = [];
        const eagerProviders = [];
        this._transformedProviders.forEach(provider => {
            if (provider.eager) {
                eagerProviders.push(provider);
            }
            else {
                lazyProviders.push(provider);
            }
        });
        return lazyProviders.concat(eagerProviders);
    }
    get transformedDirectiveAsts() {
        const sortedProviderTypes = this.transformProviders.map(provider => provider.token.identifier);
        const sortedDirectives = this._directiveAsts.slice();
        sortedDirectives.sort((dir1, dir2) => sortedProviderTypes.indexOf(dir1.directive.type) -
            sortedProviderTypes.indexOf(dir2.directive.type));
        return sortedDirectives;
    }
    get queryMatches() {
        const allMatches = [];
        this._queriedTokens.forEach((matches) => { allMatches.push(...matches); });
        return allMatches;
    }
    _addQueryReadsTo(token, defaultValue, queryReadTokens) {
        this._getQueriesFor(token).forEach((query) => {
            const queryValue = query.meta.read || defaultValue;
            const tokenRef = tokenReference(queryValue);
            let queryMatches = queryReadTokens.get(tokenRef);
            if (!queryMatches) {
                queryMatches = [];
                queryReadTokens.set(tokenRef, queryMatches);
            }
            queryMatches.push({ queryId: query.queryId, value: queryValue });
        });
    }
    _getQueriesFor(token) {
        const result = [];
        let currentEl = this;
        let distance = 0;
        let queries;
        while (currentEl !== null) {
            queries = currentEl._contentQueries.get(tokenReference(token));
            if (queries) {
                result.push(...queries.filter((query) => query.meta.descendants || distance <= 1));
            }
            if (currentEl._directiveAsts.length > 0) {
                distance++;
            }
            currentEl = currentEl._parent;
        }
        queries = this.viewContext.viewQueries.get(tokenReference(token));
        if (queries) {
            result.push(...queries);
        }
        return result;
    }
    _getOrCreateLocalProvider(requestingProviderType, token, eager) {
        const resolvedProvider = this._allProviders.get(tokenReference(token));
        if (!resolvedProvider || ((requestingProviderType === ProviderAstType.Directive ||
            requestingProviderType === ProviderAstType.PublicService) &&
            resolvedProvider.providerType === ProviderAstType.PrivateService) ||
            ((requestingProviderType === ProviderAstType.PrivateService ||
                requestingProviderType === ProviderAstType.PublicService) &&
                resolvedProvider.providerType === ProviderAstType.Builtin)) {
            return null;
        }
        let transformedProviderAst = this._transformedProviders.get(tokenReference(token));
        if (transformedProviderAst) {
            return transformedProviderAst;
        }
        if (this._seenProviders.get(tokenReference(token)) != null) {
            this.viewContext.errors.push(new ProviderError(`Cannot instantiate cyclic dependency! ${tokenName(token)}`, this._sourceSpan));
            return null;
        }
        this._seenProviders.set(tokenReference(token), true);
        const transformedProviders = resolvedProvider.providers.map((provider) => {
            let transformedUseValue = provider.useValue;
            let transformedUseExisting = provider.useExisting;
            let transformedDeps = undefined;
            if (provider.useExisting != null) {
                const existingDiDep = this._getDependency(resolvedProvider.providerType, { token: provider.useExisting }, eager);
                if (existingDiDep.token != null) {
                    transformedUseExisting = existingDiDep.token;
                }
                else {
                    transformedUseExisting = null;
                    transformedUseValue = existingDiDep.value;
                }
            }
            else if (provider.useFactory) {
                const deps = provider.deps || provider.useFactory.diDeps;
                transformedDeps =
                    deps.map((dep) => this._getDependency(resolvedProvider.providerType, dep, eager));
            }
            else if (provider.useClass) {
                const deps = provider.deps || provider.useClass.diDeps;
                transformedDeps =
                    deps.map((dep) => this._getDependency(resolvedProvider.providerType, dep, eager));
            }
            return _transformProvider(provider, {
                useExisting: transformedUseExisting,
                useValue: transformedUseValue,
                deps: transformedDeps
            });
        });
        transformedProviderAst =
            _transformProviderAst(resolvedProvider, { eager: eager, providers: transformedProviders });
        this._transformedProviders.set(tokenReference(token), transformedProviderAst);
        return transformedProviderAst;
    }
    _getLocalDependency(requestingProviderType, dep, eager = false) {
        if (dep.isAttribute) {
            const attrValue = this._attrs[dep.token.value];
            return { isValue: true, value: attrValue == null ? null : attrValue };
        }
        if (dep.token != null) {
            // access builtints
            if ((requestingProviderType === ProviderAstType.Directive ||
                requestingProviderType === ProviderAstType.Component)) {
                if (tokenReference(dep.token) ===
                    this.viewContext.reflector.resolveExternalReference(Identifiers.Renderer) ||
                    tokenReference(dep.token) ===
                        this.viewContext.reflector.resolveExternalReference(Identifiers.ElementRef) ||
                    tokenReference(dep.token) ===
                        this.viewContext.reflector.resolveExternalReference(Identifiers.ChangeDetectorRef) ||
                    tokenReference(dep.token) ===
                        this.viewContext.reflector.resolveExternalReference(Identifiers.TemplateRef)) {
                    return dep;
                }
                if (tokenReference(dep.token) ===
                    this.viewContext.reflector.resolveExternalReference(Identifiers.ViewContainerRef)) {
                    this.transformedHasViewContainer = true;
                }
            }
            // access the injector
            if (tokenReference(dep.token) ===
                this.viewContext.reflector.resolveExternalReference(Identifiers.Injector)) {
                return dep;
            }
            // access providers
            if (this._getOrCreateLocalProvider(requestingProviderType, dep.token, eager) != null) {
                return dep;
            }
        }
        return null;
    }
    _getDependency(requestingProviderType, dep, eager = false) {
        let currElement = this;
        let currEager = eager;
        let result = null;
        if (!dep.isSkipSelf) {
            result = this._getLocalDependency(requestingProviderType, dep, eager);
        }
        if (dep.isSelf) {
            if (!result && dep.isOptional) {
                result = { isValue: true, value: null };
            }
        }
        else {
            // check parent elements
            while (!result && currElement._parent) {
                const prevElement = currElement;
                currElement = currElement._parent;
                if (prevElement._isViewRoot) {
                    currEager = false;
                }
                result = currElement._getLocalDependency(ProviderAstType.PublicService, dep, currEager);
            }
            // check @Host restriction
            if (!result) {
                if (!dep.isHost || this.viewContext.component.isHost ||
                    this.viewContext.component.type.reference === tokenReference(dep.token) ||
                    this.viewContext.viewProviders.get(tokenReference(dep.token)) != null) {
                    result = dep;
                }
                else {
                    result = dep.isOptional ? { isValue: true, value: null } : null;
                }
            }
        }
        if (!result) {
            this.viewContext.errors.push(new ProviderError(`No provider for ${tokenName(dep.token)}`, this._sourceSpan));
        }
        return result;
    }
}
export class NgModuleProviderAnalyzer {
    constructor(reflector, ngModule, extraProviders, sourceSpan) {
        this.reflector = reflector;
        this._transformedProviders = new Map();
        this._seenProviders = new Map();
        this._errors = [];
        this._allProviders = new Map();
        ngModule.transitiveModule.modules.forEach((ngModuleType) => {
            const ngModuleProvider = { token: { identifier: ngModuleType }, useClass: ngModuleType };
            _resolveProviders([ngModuleProvider], ProviderAstType.PublicService, true, sourceSpan, this._errors, this._allProviders, /* isModule */ true);
        });
        _resolveProviders(ngModule.transitiveModule.providers.map(entry => entry.provider).concat(extraProviders), ProviderAstType.PublicService, false, sourceSpan, this._errors, this._allProviders, 
        /* isModule */ false);
    }
    parse() {
        Array.from(this._allProviders.values()).forEach((provider) => {
            this._getOrCreateLocalProvider(provider.token, provider.eager);
        });
        if (this._errors.length > 0) {
            const errorString = this._errors.join('\n');
            throw new Error(`Provider parse errors:\n${errorString}`);
        }
        // Note: Maps keep their insertion order.
        const lazyProviders = [];
        const eagerProviders = [];
        this._transformedProviders.forEach(provider => {
            if (provider.eager) {
                eagerProviders.push(provider);
            }
            else {
                lazyProviders.push(provider);
            }
        });
        return lazyProviders.concat(eagerProviders);
    }
    _getOrCreateLocalProvider(token, eager) {
        const resolvedProvider = this._allProviders.get(tokenReference(token));
        if (!resolvedProvider) {
            return null;
        }
        let transformedProviderAst = this._transformedProviders.get(tokenReference(token));
        if (transformedProviderAst) {
            return transformedProviderAst;
        }
        if (this._seenProviders.get(tokenReference(token)) != null) {
            this._errors.push(new ProviderError(`Cannot instantiate cyclic dependency! ${tokenName(token)}`, resolvedProvider.sourceSpan));
            return null;
        }
        this._seenProviders.set(tokenReference(token), true);
        const transformedProviders = resolvedProvider.providers.map((provider) => {
            let transformedUseValue = provider.useValue;
            let transformedUseExisting = provider.useExisting;
            let transformedDeps = undefined;
            if (provider.useExisting != null) {
                const existingDiDep = this._getDependency({ token: provider.useExisting }, eager, resolvedProvider.sourceSpan);
                if (existingDiDep.token != null) {
                    transformedUseExisting = existingDiDep.token;
                }
                else {
                    transformedUseExisting = null;
                    transformedUseValue = existingDiDep.value;
                }
            }
            else if (provider.useFactory) {
                const deps = provider.deps || provider.useFactory.diDeps;
                transformedDeps =
                    deps.map((dep) => this._getDependency(dep, eager, resolvedProvider.sourceSpan));
            }
            else if (provider.useClass) {
                const deps = provider.deps || provider.useClass.diDeps;
                transformedDeps =
                    deps.map((dep) => this._getDependency(dep, eager, resolvedProvider.sourceSpan));
            }
            return _transformProvider(provider, {
                useExisting: transformedUseExisting,
                useValue: transformedUseValue,
                deps: transformedDeps
            });
        });
        transformedProviderAst =
            _transformProviderAst(resolvedProvider, { eager: eager, providers: transformedProviders });
        this._transformedProviders.set(tokenReference(token), transformedProviderAst);
        return transformedProviderAst;
    }
    _getDependency(dep, eager = false, requestorSourceSpan) {
        let foundLocal = false;
        if (!dep.isSkipSelf && dep.token != null) {
            // access the injector
            if (tokenReference(dep.token) ===
                this.reflector.resolveExternalReference(Identifiers.Injector) ||
                tokenReference(dep.token) ===
                    this.reflector.resolveExternalReference(Identifiers.ComponentFactoryResolver)) {
                foundLocal = true;
                // access providers
            }
            else if (this._getOrCreateLocalProvider(dep.token, eager) != null) {
                foundLocal = true;
            }
        }
        return dep;
    }
}
function _transformProvider(provider, { useExisting, useValue, deps }) {
    return {
        token: provider.token,
        useClass: provider.useClass,
        useExisting: useExisting,
        useFactory: provider.useFactory,
        useValue: useValue,
        deps: deps,
        multi: provider.multi
    };
}
function _transformProviderAst(provider, { eager, providers }) {
    return new ProviderAst(provider.token, provider.multiProvider, provider.eager || eager, providers, provider.providerType, provider.lifecycleHooks, provider.sourceSpan, provider.isModule);
}
function _resolveProvidersFromDirectives(directives, sourceSpan, targetErrors) {
    const providersByToken = new Map();
    directives.forEach((directive) => {
        const dirProvider = { token: { identifier: directive.type }, useClass: directive.type };
        _resolveProviders([dirProvider], directive.isComponent ? ProviderAstType.Component : ProviderAstType.Directive, true, sourceSpan, targetErrors, providersByToken, /* isModule */ false);
    });
    // Note: directives need to be able to overwrite providers of a component!
    const directivesWithComponentFirst = directives.filter(dir => dir.isComponent).concat(directives.filter(dir => !dir.isComponent));
    directivesWithComponentFirst.forEach((directive) => {
        _resolveProviders(directive.providers, ProviderAstType.PublicService, false, sourceSpan, targetErrors, providersByToken, /* isModule */ false);
        _resolveProviders(directive.viewProviders, ProviderAstType.PrivateService, false, sourceSpan, targetErrors, providersByToken, /* isModule */ false);
    });
    return providersByToken;
}
function _resolveProviders(providers, providerType, eager, sourceSpan, targetErrors, targetProvidersByToken, isModule) {
    providers.forEach((provider) => {
        let resolvedProvider = targetProvidersByToken.get(tokenReference(provider.token));
        if (resolvedProvider != null && !!resolvedProvider.multiProvider !== !!provider.multi) {
            targetErrors.push(new ProviderError(`Mixing multi and non multi provider is not possible for token ${tokenName(resolvedProvider.token)}`, sourceSpan));
        }
        if (!resolvedProvider) {
            const lifecycleHooks = provider.token.identifier &&
                provider.token.identifier.lifecycleHooks ?
                provider.token.identifier.lifecycleHooks :
                [];
            const isUseValue = !(provider.useClass || provider.useExisting || provider.useFactory);
            resolvedProvider = new ProviderAst(provider.token, !!provider.multi, eager || isUseValue, [provider], providerType, lifecycleHooks, sourceSpan, isModule);
            targetProvidersByToken.set(tokenReference(provider.token), resolvedProvider);
        }
        else {
            if (!provider.multi) {
                resolvedProvider.providers.length = 0;
            }
            resolvedProvider.providers.push(provider);
        }
    });
}
function _getViewQueries(component) {
    // Note: queries start with id 1 so we can use the number in a Bloom filter!
    let viewQueryId = 1;
    const viewQueries = new Map();
    if (component.viewQueries) {
        component.viewQueries.forEach((query) => _addQueryToTokenMap(viewQueries, { meta: query, queryId: viewQueryId++ }));
    }
    return viewQueries;
}
function _getContentQueries(contentQueryStartId, directives) {
    let contentQueryId = contentQueryStartId;
    const contentQueries = new Map();
    directives.forEach((directive, directiveIndex) => {
        if (directive.queries) {
            directive.queries.forEach((query) => _addQueryToTokenMap(contentQueries, { meta: query, queryId: contentQueryId++ }));
        }
    });
    return contentQueries;
}
function _addQueryToTokenMap(map, query) {
    query.meta.selectors.forEach((token) => {
        let entry = map.get(tokenReference(token));
        if (!entry) {
            entry = [];
            map.set(tokenReference(token), entry);
        }
        entry.push(query);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJfYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvcHJvdmlkZXJfYW5hbHl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFvTSxTQUFTLEVBQUUsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFaFEsT0FBTyxFQUFDLFdBQVcsRUFBRSwrQkFBK0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUMsVUFBVSxFQUFrQixNQUFNLGNBQWMsQ0FBQztBQUN6RCxPQUFPLEVBQXdCLFdBQVcsRUFBRSxlQUFlLEVBQTJCLE1BQU0sZ0NBQWdDLENBQUM7QUFFN0gsTUFBTSxvQkFBcUIsU0FBUSxVQUFVO0lBQzNDLFlBQVksT0FBZSxFQUFFLElBQXFCLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDOUU7QUFPRCxNQUFNO0lBV0osWUFBbUIsU0FBMkIsRUFBUyxTQUFtQztRQUF2RSxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQTBCO1FBRjFGLFdBQU0sR0FBb0IsRUFBRSxDQUFDO1FBRzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7UUFDN0MsU0FBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUMzQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ2xFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFR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QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuaW1wb3J0IHtDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEsIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSwgQ29tcGlsZURpcmVjdGl2ZVN1bW1hcnksIENvbXBpbGVOZ01vZHVsZU1ldGFkYXRhLCBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSwgQ29tcGlsZVF1ZXJ5TWV0YWRhdGEsIENvbXBpbGVUb2tlbk1ldGFkYXRhLCBDb21waWxlVHlwZU1ldGFkYXRhLCB0b2tlbk5hbWUsIHRva2VuUmVmZXJlbmNlfSBmcm9tICcuL2NvbXBpbGVfbWV0YWRhdGEnO1xuaW1wb3J0IHtDb21waWxlUmVmbGVjdG9yfSBmcm9tICcuL2NvbXBpbGVfcmVmbGVjdG9yJztcbmltcG9ydCB7SWRlbnRpZmllcnMsIGNyZWF0ZVRva2VuRm9yRXh0ZXJuYWxSZWZlcmVuY2V9IGZyb20gJy4vaWRlbnRpZmllcnMnO1xuaW1wb3J0IHtQYXJzZUVycm9yLCBQYXJzZVNvdXJjZVNwYW59IGZyb20gJy4vcGFyc2VfdXRpbCc7XG5pbXBvcnQge0F0dHJBc3QsIERpcmVjdGl2ZUFzdCwgUHJvdmlkZXJBc3QsIFByb3ZpZGVyQXN0VHlwZSwgUXVlcnlNYXRjaCwgUmVmZXJlbmNlQXN0fSBmcm9tICcuL3RlbXBsYXRlX3BhcnNlci90ZW1wbGF0ZV9hc3QnO1xuXG5leHBvcnQgY2xhc3MgUHJvdmlkZXJFcnJvciBleHRlbmRzIFBhcnNlRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIHNwYW46IFBhcnNlU291cmNlU3BhbikgeyBzdXBlcihzcGFuLCBtZXNzYWdlKTsgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5V2l0aElkIHtcbiAgbWV0YTogQ29tcGlsZVF1ZXJ5TWV0YWRhdGE7XG4gIHF1ZXJ5SWQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFByb3ZpZGVyVmlld0NvbnRleHQge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICB2aWV3UXVlcmllczogTWFwPGFueSwgUXVlcnlXaXRoSWRbXT47XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHZpZXdQcm92aWRlcnM6IE1hcDxhbnksIGJvb2xlYW4+O1xuICBlcnJvcnM6IFByb3ZpZGVyRXJyb3JbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWZsZWN0b3I6IENvbXBpbGVSZWZsZWN0b3IsIHB1YmxpYyBjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSkge1xuICAgIHRoaXMudmlld1F1ZXJpZXMgPSBfZ2V0Vmlld1F1ZXJpZXMoY29tcG9uZW50KTtcbiAgICB0aGlzLnZpZXdQcm92aWRlcnMgPSBuZXcgTWFwPGFueSwgYm9vbGVhbj4oKTtcbiAgICBjb21wb25lbnQudmlld1Byb3ZpZGVycy5mb3JFYWNoKChwcm92aWRlcikgPT4ge1xuICAgICAgaWYgKHRoaXMudmlld1Byb3ZpZGVycy5nZXQodG9rZW5SZWZlcmVuY2UocHJvdmlkZXIudG9rZW4pKSA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudmlld1Byb3ZpZGVycy5zZXQodG9rZW5SZWZlcmVuY2UocHJvdmlkZXIudG9rZW4pLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvdmlkZXJFbGVtZW50Q29udGV4dCB7XG4gIHByaXZhdGUgX2NvbnRlbnRRdWVyaWVzOiBNYXA8YW55LCBRdWVyeVdpdGhJZFtdPjtcblxuICBwcml2YXRlIF90cmFuc2Zvcm1lZFByb3ZpZGVycyA9IG5ldyBNYXA8YW55LCBQcm92aWRlckFzdD4oKTtcbiAgcHJpdmF0ZSBfc2VlblByb3ZpZGVycyA9IG5ldyBNYXA8YW55LCBib29sZWFuPigpO1xuICBwcml2YXRlIF9hbGxQcm92aWRlcnM6IE1hcDxhbnksIFByb3ZpZGVyQXN0PjtcbiAgcHJpdmF0ZSBfYXR0cnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBwcml2YXRlIF9xdWVyaWVkVG9rZW5zID0gbmV3IE1hcDxhbnksIFF1ZXJ5TWF0Y2hbXT4oKTtcblxuICBwdWJsaWMgcmVhZG9ubHkgdHJhbnNmb3JtZWRIYXNWaWV3Q29udGFpbmVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdmlld0NvbnRleHQ6IFByb3ZpZGVyVmlld0NvbnRleHQsIHByaXZhdGUgX3BhcmVudDogUHJvdmlkZXJFbGVtZW50Q29udGV4dCxcbiAgICAgIHByaXZhdGUgX2lzVmlld1Jvb3Q6IGJvb2xlYW4sIHByaXZhdGUgX2RpcmVjdGl2ZUFzdHM6IERpcmVjdGl2ZUFzdFtdLCBhdHRyczogQXR0ckFzdFtdLFxuICAgICAgcmVmczogUmVmZXJlbmNlQXN0W10sIGlzVGVtcGxhdGU6IGJvb2xlYW4sIGNvbnRlbnRRdWVyeVN0YXJ0SWQ6IG51bWJlcixcbiAgICAgIHByaXZhdGUgX3NvdXJjZVNwYW46IFBhcnNlU291cmNlU3Bhbikge1xuICAgIHRoaXMuX2F0dHJzID0ge307XG4gICAgYXR0cnMuZm9yRWFjaCgoYXR0ckFzdCkgPT4gdGhpcy5fYXR0cnNbYXR0ckFzdC5uYW1lXSA9IGF0dHJBc3QudmFsdWUpO1xuICAgIGNvbnN0IGRpcmVjdGl2ZXNNZXRhID0gX2RpcmVjdGl2ZUFzdHMubWFwKGRpcmVjdGl2ZUFzdCA9PiBkaXJlY3RpdmVBc3QuZGlyZWN0aXZlKTtcbiAgICB0aGlzLl9hbGxQcm92aWRlcnMgPVxuICAgICAgICBfcmVzb2x2ZVByb3ZpZGVyc0Zyb21EaXJlY3RpdmVzKGRpcmVjdGl2ZXNNZXRhLCBfc291cmNlU3Bhbiwgdmlld0NvbnRleHQuZXJyb3JzKTtcbiAgICB0aGlzLl9jb250ZW50UXVlcmllcyA9IF9nZXRDb250ZW50UXVlcmllcyhjb250ZW50UXVlcnlTdGFydElkLCBkaXJlY3RpdmVzTWV0YSk7XG4gICAgQXJyYXkuZnJvbSh0aGlzLl9hbGxQcm92aWRlcnMudmFsdWVzKCkpLmZvckVhY2goKHByb3ZpZGVyKSA9PiB7XG4gICAgICB0aGlzLl9hZGRRdWVyeVJlYWRzVG8ocHJvdmlkZXIudG9rZW4sIHByb3ZpZGVyLnRva2VuLCB0aGlzLl9xdWVyaWVkVG9rZW5zKTtcbiAgICB9KTtcbiAgICBpZiAoaXNUZW1wbGF0ZSkge1xuICAgICAgY29uc3QgdGVtcGxhdGVSZWZJZCA9XG4gICAgICAgICAgY3JlYXRlVG9rZW5Gb3JFeHRlcm5hbFJlZmVyZW5jZSh0aGlzLnZpZXdDb250ZXh0LnJlZmxlY3RvciwgSWRlbnRpZmllcnMuVGVtcGxhdGVSZWYpO1xuICAgICAgdGhpcy5fYWRkUXVlcnlSZWFkc1RvKHRlbXBsYXRlUmVmSWQsIHRlbXBsYXRlUmVmSWQsIHRoaXMuX3F1ZXJpZWRUb2tlbnMpO1xuICAgIH1cbiAgICByZWZzLmZvckVhY2goKHJlZkFzdCkgPT4ge1xuICAgICAgbGV0IGRlZmF1bHRRdWVyeVZhbHVlID0gcmVmQXN0LnZhbHVlIHx8XG4gICAgICAgICAgY3JlYXRlVG9rZW5Gb3JFeHRlcm5hbFJlZmVyZW5jZSh0aGlzLnZpZXdDb250ZXh0LnJlZmxlY3RvciwgSWRlbnRpZmllcnMuRWxlbWVudFJlZik7XG4gICAgICB0aGlzLl9hZGRRdWVyeVJlYWRzVG8oe3ZhbHVlOiByZWZBc3QubmFtZX0sIGRlZmF1bHRRdWVyeVZhbHVlLCB0aGlzLl9xdWVyaWVkVG9rZW5zKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5fcXVlcmllZFRva2Vucy5nZXQoXG4gICAgICAgICAgICB0aGlzLnZpZXdDb250ZXh0LnJlZmxlY3Rvci5yZXNvbHZlRXh0ZXJuYWxSZWZlcmVuY2UoSWRlbnRpZmllcnMuVmlld0NvbnRhaW5lclJlZikpKSB7XG4gICAgICB0aGlzLnRyYW5zZm9ybWVkSGFzVmlld0NvbnRhaW5lciA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRoZSBwcm92aWRlcnMgdGhhdCB3ZSBrbm93IGFyZSBlYWdlciBmaXJzdFxuICAgIEFycmF5LmZyb20odGhpcy5fYWxsUHJvdmlkZXJzLnZhbHVlcygpKS5mb3JFYWNoKChwcm92aWRlcikgPT4ge1xuICAgICAgY29uc3QgZWFnZXIgPSBwcm92aWRlci5lYWdlciB8fCB0aGlzLl9xdWVyaWVkVG9rZW5zLmdldCh0b2tlblJlZmVyZW5jZShwcm92aWRlci50b2tlbikpO1xuICAgICAgaWYgKGVhZ2VyKSB7XG4gICAgICAgIHRoaXMuX2dldE9yQ3JlYXRlTG9jYWxQcm92aWRlcihwcm92aWRlci5wcm92aWRlclR5cGUsIHByb3ZpZGVyLnRva2VuLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFmdGVyRWxlbWVudCgpIHtcbiAgICAvLyBjb2xsZWN0IGxhenkgcHJvdmlkZXJzXG4gICAgQXJyYXkuZnJvbSh0aGlzLl9hbGxQcm92aWRlcnMudmFsdWVzKCkpLmZvckVhY2goKHByb3ZpZGVyKSA9PiB7XG4gICAgICB0aGlzLl9nZXRPckNyZWF0ZUxvY2FsUHJvdmlkZXIocHJvdmlkZXIucHJvdmlkZXJUeXBlLCBwcm92aWRlci50b2tlbiwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHRyYW5zZm9ybVByb3ZpZGVycygpOiBQcm92aWRlckFzdFtdIHtcbiAgICAvLyBOb3RlOiBNYXBzIGtlZXAgdGhlaXIgaW5zZXJ0aW9uIG9yZGVyLlxuICAgIGNvbnN0IGxhenlQcm92aWRlcnM6IFByb3ZpZGVyQXN0W10gPSBbXTtcbiAgICBjb25zdCBlYWdlclByb3ZpZGVyczogUHJvdmlkZXJBc3RbXSA9IFtdO1xuICAgIHRoaXMuX3RyYW5zZm9ybWVkUHJvdmlkZXJzLmZvckVhY2gocHJvdmlkZXIgPT4ge1xuICAgICAgaWYgKHByb3ZpZGVyLmVhZ2VyKSB7XG4gICAgICAgIGVhZ2VyUHJvdmlkZXJzLnB1c2gocHJvdmlkZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGF6eVByb3ZpZGVycy5wdXNoKHByb3ZpZGVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbGF6eVByb3ZpZGVycy5jb25jYXQoZWFnZXJQcm92aWRlcnMpO1xuICB9XG5cbiAgZ2V0IHRyYW5zZm9ybWVkRGlyZWN0aXZlQXN0cygpOiBEaXJlY3RpdmVBc3RbXSB7XG4gICAgY29uc3Qgc29ydGVkUHJvdmlkZXJUeXBlcyA9IHRoaXMudHJhbnNmb3JtUHJvdmlkZXJzLm1hcChwcm92aWRlciA9PiBwcm92aWRlci50b2tlbi5pZGVudGlmaWVyKTtcbiAgICBjb25zdCBzb3J0ZWREaXJlY3RpdmVzID0gdGhpcy5fZGlyZWN0aXZlQXN0cy5zbGljZSgpO1xuICAgIHNvcnRlZERpcmVjdGl2ZXMuc29ydChcbiAgICAgICAgKGRpcjEsIGRpcjIpID0+IHNvcnRlZFByb3ZpZGVyVHlwZXMuaW5kZXhPZihkaXIxLmRpcmVjdGl2ZS50eXBlKSAtXG4gICAgICAgICAgICBzb3J0ZWRQcm92aWRlclR5cGVzLmluZGV4T2YoZGlyMi5kaXJlY3RpdmUudHlwZSkpO1xuICAgIHJldHVybiBzb3J0ZWREaXJlY3RpdmVzO1xuICB9XG5cbiAgZ2V0IHF1ZXJ5TWF0Y2hlcygpOiBRdWVyeU1hdGNoW10ge1xuICAgIGNvbnN0IGFsbE1hdGNoZXM6IFF1ZXJ5TWF0Y2hbXSA9IFtdO1xuICAgIHRoaXMuX3F1ZXJpZWRUb2tlbnMuZm9yRWFjaCgobWF0Y2hlczogUXVlcnlNYXRjaFtdKSA9PiB7IGFsbE1hdGNoZXMucHVzaCguLi5tYXRjaGVzKTsgfSk7XG4gICAgcmV0dXJuIGFsbE1hdGNoZXM7XG4gIH1cblxuICBwcml2YXRlIF9hZGRRdWVyeVJlYWRzVG8oXG4gICAgICB0b2tlbjogQ29tcGlsZVRva2VuTWV0YWRhdGEsIGRlZmF1bHRWYWx1ZTogQ29tcGlsZVRva2VuTWV0YWRhdGEsXG4gICAgICBxdWVyeVJlYWRUb2tlbnM6IE1hcDxhbnksIFF1ZXJ5TWF0Y2hbXT4pIHtcbiAgICB0aGlzLl9nZXRRdWVyaWVzRm9yKHRva2VuKS5mb3JFYWNoKChxdWVyeSkgPT4ge1xuICAgICAgY29uc3QgcXVlcnlWYWx1ZSA9IHF1ZXJ5Lm1ldGEucmVhZCB8fCBkZWZhdWx0VmFsdWU7XG4gICAgICBjb25zdCB0b2tlblJlZiA9IHRva2VuUmVmZXJlbmNlKHF1ZXJ5VmFsdWUpO1xuICAgICAgbGV0IHF1ZXJ5TWF0Y2hlcyA9IHF1ZXJ5UmVhZFRva2Vucy5nZXQodG9rZW5SZWYpO1xuICAgICAgaWYgKCFxdWVyeU1hdGNoZXMpIHtcbiAgICAgICAgcXVlcnlNYXRjaGVzID0gW107XG4gICAgICAgIHF1ZXJ5UmVhZFRva2Vucy5zZXQodG9rZW5SZWYsIHF1ZXJ5TWF0Y2hlcyk7XG4gICAgICB9XG4gICAgICBxdWVyeU1hdGNoZXMucHVzaCh7cXVlcnlJZDogcXVlcnkucXVlcnlJZCwgdmFsdWU6IHF1ZXJ5VmFsdWV9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFF1ZXJpZXNGb3IodG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhKTogUXVlcnlXaXRoSWRbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBRdWVyeVdpdGhJZFtdID0gW107XG4gICAgbGV0IGN1cnJlbnRFbDogUHJvdmlkZXJFbGVtZW50Q29udGV4dCA9IHRoaXM7XG4gICAgbGV0IGRpc3RhbmNlID0gMDtcbiAgICBsZXQgcXVlcmllczogUXVlcnlXaXRoSWRbXXx1bmRlZmluZWQ7XG4gICAgd2hpbGUgKGN1cnJlbnRFbCAhPT0gbnVsbCkge1xuICAgICAgcXVlcmllcyA9IGN1cnJlbnRFbC5fY29udGVudFF1ZXJpZXMuZ2V0KHRva2VuUmVmZXJlbmNlKHRva2VuKSk7XG4gICAgICBpZiAocXVlcmllcykge1xuICAgICAgICByZXN1bHQucHVzaCguLi5xdWVyaWVzLmZpbHRlcigocXVlcnkpID0+IHF1ZXJ5Lm1ldGEuZGVzY2VuZGFudHMgfHwgZGlzdGFuY2UgPD0gMSkpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRFbC5fZGlyZWN0aXZlQXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGRpc3RhbmNlKys7XG4gICAgICB9XG4gICAgICBjdXJyZW50RWwgPSBjdXJyZW50RWwuX3BhcmVudDtcbiAgICB9XG4gICAgcXVlcmllcyA9IHRoaXMudmlld0NvbnRleHQudmlld1F1ZXJpZXMuZ2V0KHRva2VuUmVmZXJlbmNlKHRva2VuKSk7XG4gICAgaWYgKHF1ZXJpZXMpIHtcbiAgICAgIHJlc3VsdC5wdXNoKC4uLnF1ZXJpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cblxuICBwcml2YXRlIF9nZXRPckNyZWF0ZUxvY2FsUHJvdmlkZXIoXG4gICAgICByZXF1ZXN0aW5nUHJvdmlkZXJUeXBlOiBQcm92aWRlckFzdFR5cGUsIHRva2VuOiBDb21waWxlVG9rZW5NZXRhZGF0YSxcbiAgICAgIGVhZ2VyOiBib29sZWFuKTogUHJvdmlkZXJBc3R8bnVsbCB7XG4gICAgY29uc3QgcmVzb2x2ZWRQcm92aWRlciA9IHRoaXMuX2FsbFByb3ZpZGVycy5nZXQodG9rZW5SZWZlcmVuY2UodG9rZW4pKTtcbiAgICBpZiAoIXJlc29sdmVkUHJvdmlkZXIgfHwgKChyZXF1ZXN0aW5nUHJvdmlkZXJUeXBlID09PSBQcm92aWRlckFzdFR5cGUuRGlyZWN0aXZlIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdGluZ1Byb3ZpZGVyVHlwZSA9PT0gUHJvdmlkZXJBc3RUeXBlLlB1YmxpY1NlcnZpY2UpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZFByb3ZpZGVyLnByb3ZpZGVyVHlwZSA9PT0gUHJvdmlkZXJBc3RUeXBlLlByaXZhdGVTZXJ2aWNlKSB8fFxuICAgICAgICAoKHJlcXVlc3RpbmdQcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5Qcml2YXRlU2VydmljZSB8fFxuICAgICAgICAgIHJlcXVlc3RpbmdQcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5QdWJsaWNTZXJ2aWNlKSAmJlxuICAgICAgICAgcmVzb2x2ZWRQcm92aWRlci5wcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5CdWlsdGluKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCB0cmFuc2Zvcm1lZFByb3ZpZGVyQXN0ID0gdGhpcy5fdHJhbnNmb3JtZWRQcm92aWRlcnMuZ2V0KHRva2VuUmVmZXJlbmNlKHRva2VuKSk7XG4gICAgaWYgKHRyYW5zZm9ybWVkUHJvdmlkZXJBc3QpIHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm1lZFByb3ZpZGVyQXN0O1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2VlblByb3ZpZGVycy5nZXQodG9rZW5SZWZlcmVuY2UodG9rZW4pKSAhPSBudWxsKSB7XG4gICAgICB0aGlzLnZpZXdDb250ZXh0LmVycm9ycy5wdXNoKG5ldyBQcm92aWRlckVycm9yKFxuICAgICAgICAgIGBDYW5ub3QgaW5zdGFudGlhdGUgY3ljbGljIGRlcGVuZGVuY3khICR7dG9rZW5OYW1lKHRva2VuKX1gLCB0aGlzLl9zb3VyY2VTcGFuKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fc2VlblByb3ZpZGVycy5zZXQodG9rZW5SZWZlcmVuY2UodG9rZW4pLCB0cnVlKTtcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFByb3ZpZGVycyA9IHJlc29sdmVkUHJvdmlkZXIucHJvdmlkZXJzLm1hcCgocHJvdmlkZXIpID0+IHtcbiAgICAgIGxldCB0cmFuc2Zvcm1lZFVzZVZhbHVlID0gcHJvdmlkZXIudXNlVmFsdWU7XG4gICAgICBsZXQgdHJhbnNmb3JtZWRVc2VFeGlzdGluZyA9IHByb3ZpZGVyLnVzZUV4aXN0aW5nICE7XG4gICAgICBsZXQgdHJhbnNmb3JtZWREZXBzOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGFbXSA9IHVuZGVmaW5lZCAhO1xuICAgICAgaWYgKHByb3ZpZGVyLnVzZUV4aXN0aW5nICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdEaURlcCA9IHRoaXMuX2dldERlcGVuZGVuY3koXG4gICAgICAgICAgICByZXNvbHZlZFByb3ZpZGVyLnByb3ZpZGVyVHlwZSwge3Rva2VuOiBwcm92aWRlci51c2VFeGlzdGluZ30sIGVhZ2VyKSAhO1xuICAgICAgICBpZiAoZXhpc3RpbmdEaURlcC50b2tlbiAhPSBudWxsKSB7XG4gICAgICAgICAgdHJhbnNmb3JtZWRVc2VFeGlzdGluZyA9IGV4aXN0aW5nRGlEZXAudG9rZW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJhbnNmb3JtZWRVc2VFeGlzdGluZyA9IG51bGwgITtcbiAgICAgICAgICB0cmFuc2Zvcm1lZFVzZVZhbHVlID0gZXhpc3RpbmdEaURlcC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwcm92aWRlci51c2VGYWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGRlcHMgPSBwcm92aWRlci5kZXBzIHx8IHByb3ZpZGVyLnVzZUZhY3RvcnkuZGlEZXBzO1xuICAgICAgICB0cmFuc2Zvcm1lZERlcHMgPVxuICAgICAgICAgICAgZGVwcy5tYXAoKGRlcCkgPT4gdGhpcy5fZ2V0RGVwZW5kZW5jeShyZXNvbHZlZFByb3ZpZGVyLnByb3ZpZGVyVHlwZSwgZGVwLCBlYWdlcikgISk7XG4gICAgICB9IGVsc2UgaWYgKHByb3ZpZGVyLnVzZUNsYXNzKSB7XG4gICAgICAgIGNvbnN0IGRlcHMgPSBwcm92aWRlci5kZXBzIHx8IHByb3ZpZGVyLnVzZUNsYXNzLmRpRGVwcztcbiAgICAgICAgdHJhbnNmb3JtZWREZXBzID1cbiAgICAgICAgICAgIGRlcHMubWFwKChkZXApID0+IHRoaXMuX2dldERlcGVuZGVuY3kocmVzb2x2ZWRQcm92aWRlci5wcm92aWRlclR5cGUsIGRlcCwgZWFnZXIpICEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF90cmFuc2Zvcm1Qcm92aWRlcihwcm92aWRlciwge1xuICAgICAgICB1c2VFeGlzdGluZzogdHJhbnNmb3JtZWRVc2VFeGlzdGluZyxcbiAgICAgICAgdXNlVmFsdWU6IHRyYW5zZm9ybWVkVXNlVmFsdWUsXG4gICAgICAgIGRlcHM6IHRyYW5zZm9ybWVkRGVwc1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdHJhbnNmb3JtZWRQcm92aWRlckFzdCA9XG4gICAgICAgIF90cmFuc2Zvcm1Qcm92aWRlckFzdChyZXNvbHZlZFByb3ZpZGVyLCB7ZWFnZXI6IGVhZ2VyLCBwcm92aWRlcnM6IHRyYW5zZm9ybWVkUHJvdmlkZXJzfSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtZWRQcm92aWRlcnMuc2V0KHRva2VuUmVmZXJlbmNlKHRva2VuKSwgdHJhbnNmb3JtZWRQcm92aWRlckFzdCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUHJvdmlkZXJBc3Q7XG4gIH1cblxuICBwcml2YXRlIF9nZXRMb2NhbERlcGVuZGVuY3koXG4gICAgICByZXF1ZXN0aW5nUHJvdmlkZXJUeXBlOiBQcm92aWRlckFzdFR5cGUsIGRlcDogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhLFxuICAgICAgZWFnZXI6IGJvb2xlYW4gPSBmYWxzZSk6IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YXxudWxsIHtcbiAgICBpZiAoZGVwLmlzQXR0cmlidXRlKSB7XG4gICAgICBjb25zdCBhdHRyVmFsdWUgPSB0aGlzLl9hdHRyc1tkZXAudG9rZW4gIS52YWx1ZV07XG4gICAgICByZXR1cm4ge2lzVmFsdWU6IHRydWUsIHZhbHVlOiBhdHRyVmFsdWUgPT0gbnVsbCA/IG51bGwgOiBhdHRyVmFsdWV9O1xuICAgIH1cblxuICAgIGlmIChkZXAudG9rZW4gIT0gbnVsbCkge1xuICAgICAgLy8gYWNjZXNzIGJ1aWx0aW50c1xuICAgICAgaWYgKChyZXF1ZXN0aW5nUHJvdmlkZXJUeXBlID09PSBQcm92aWRlckFzdFR5cGUuRGlyZWN0aXZlIHx8XG4gICAgICAgICAgIHJlcXVlc3RpbmdQcm92aWRlclR5cGUgPT09IFByb3ZpZGVyQXN0VHlwZS5Db21wb25lbnQpKSB7XG4gICAgICAgIGlmICh0b2tlblJlZmVyZW5jZShkZXAudG9rZW4pID09PVxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbnRleHQucmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5SZW5kZXJlcikgfHxcbiAgICAgICAgICAgIHRva2VuUmVmZXJlbmNlKGRlcC50b2tlbikgPT09XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29udGV4dC5yZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLkVsZW1lbnRSZWYpIHx8XG4gICAgICAgICAgICB0b2tlblJlZmVyZW5jZShkZXAudG9rZW4pID09PVxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbnRleHQucmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShcbiAgICAgICAgICAgICAgICAgICAgSWRlbnRpZmllcnMuQ2hhbmdlRGV0ZWN0b3JSZWYpIHx8XG4gICAgICAgICAgICB0b2tlblJlZmVyZW5jZShkZXAudG9rZW4pID09PVxuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvbnRleHQucmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5UZW1wbGF0ZVJlZikpIHtcbiAgICAgICAgICByZXR1cm4gZGVwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2tlblJlZmVyZW5jZShkZXAudG9rZW4pID09PVxuICAgICAgICAgICAgdGhpcy52aWV3Q29udGV4dC5yZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLlZpZXdDb250YWluZXJSZWYpKSB7XG4gICAgICAgICAgKHRoaXMgYXN7dHJhbnNmb3JtZWRIYXNWaWV3Q29udGFpbmVyOiBib29sZWFufSkudHJhbnNmb3JtZWRIYXNWaWV3Q29udGFpbmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gYWNjZXNzIHRoZSBpbmplY3RvclxuICAgICAgaWYgKHRva2VuUmVmZXJlbmNlKGRlcC50b2tlbikgPT09XG4gICAgICAgICAgdGhpcy52aWV3Q29udGV4dC5yZWZsZWN0b3IucmVzb2x2ZUV4dGVybmFsUmVmZXJlbmNlKElkZW50aWZpZXJzLkluamVjdG9yKSkge1xuICAgICAgICByZXR1cm4gZGVwO1xuICAgICAgfVxuICAgICAgLy8gYWNjZXNzIHByb3ZpZGVyc1xuICAgICAgaWYgKHRoaXMuX2dldE9yQ3JlYXRlTG9jYWxQcm92aWRlcihyZXF1ZXN0aW5nUHJvdmlkZXJUeXBlLCBkZXAudG9rZW4sIGVhZ2VyKSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiBkZXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RGVwZW5kZW5jeShcbiAgICAgIHJlcXVlc3RpbmdQcm92aWRlclR5cGU6IFByb3ZpZGVyQXN0VHlwZSwgZGVwOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEsXG4gICAgICBlYWdlcjogYm9vbGVhbiA9IGZhbHNlKTogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhfG51bGwge1xuICAgIGxldCBjdXJyRWxlbWVudDogUHJvdmlkZXJFbGVtZW50Q29udGV4dCA9IHRoaXM7XG4gICAgbGV0IGN1cnJFYWdlcjogYm9vbGVhbiA9IGVhZ2VyO1xuICAgIGxldCByZXN1bHQ6IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YXxudWxsID0gbnVsbDtcbiAgICBpZiAoIWRlcC5pc1NraXBTZWxmKSB7XG4gICAgICByZXN1bHQgPSB0aGlzLl9nZXRMb2NhbERlcGVuZGVuY3kocmVxdWVzdGluZ1Byb3ZpZGVyVHlwZSwgZGVwLCBlYWdlcik7XG4gICAgfVxuICAgIGlmIChkZXAuaXNTZWxmKSB7XG4gICAgICBpZiAoIXJlc3VsdCAmJiBkZXAuaXNPcHRpb25hbCkge1xuICAgICAgICByZXN1bHQgPSB7aXNWYWx1ZTogdHJ1ZSwgdmFsdWU6IG51bGx9O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjaGVjayBwYXJlbnQgZWxlbWVudHNcbiAgICAgIHdoaWxlICghcmVzdWx0ICYmIGN1cnJFbGVtZW50Ll9wYXJlbnQpIHtcbiAgICAgICAgY29uc3QgcHJldkVsZW1lbnQgPSBjdXJyRWxlbWVudDtcbiAgICAgICAgY3VyckVsZW1lbnQgPSBjdXJyRWxlbWVudC5fcGFyZW50O1xuICAgICAgICBpZiAocHJldkVsZW1lbnQuX2lzVmlld1Jvb3QpIHtcbiAgICAgICAgICBjdXJyRWFnZXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSBjdXJyRWxlbWVudC5fZ2V0TG9jYWxEZXBlbmRlbmN5KFByb3ZpZGVyQXN0VHlwZS5QdWJsaWNTZXJ2aWNlLCBkZXAsIGN1cnJFYWdlcik7XG4gICAgICB9XG4gICAgICAvLyBjaGVjayBASG9zdCByZXN0cmljdGlvblxuICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgaWYgKCFkZXAuaXNIb3N0IHx8IHRoaXMudmlld0NvbnRleHQuY29tcG9uZW50LmlzSG9zdCB8fFxuICAgICAgICAgICAgdGhpcy52aWV3Q29udGV4dC5jb21wb25lbnQudHlwZS5yZWZlcmVuY2UgPT09IHRva2VuUmVmZXJlbmNlKGRlcC50b2tlbiAhKSB8fFxuICAgICAgICAgICAgdGhpcy52aWV3Q29udGV4dC52aWV3UHJvdmlkZXJzLmdldCh0b2tlblJlZmVyZW5jZShkZXAudG9rZW4gISkpICE9IG51bGwpIHtcbiAgICAgICAgICByZXN1bHQgPSBkZXA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0ID0gZGVwLmlzT3B0aW9uYWwgPyB7aXNWYWx1ZTogdHJ1ZSwgdmFsdWU6IG51bGx9IDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgdGhpcy52aWV3Q29udGV4dC5lcnJvcnMucHVzaChcbiAgICAgICAgICBuZXcgUHJvdmlkZXJFcnJvcihgTm8gcHJvdmlkZXIgZm9yICR7dG9rZW5OYW1lKGRlcC50b2tlbiEpfWAsIHRoaXMuX3NvdXJjZVNwYW4pKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOZ01vZHVsZVByb3ZpZGVyQW5hbHl6ZXIge1xuICBwcml2YXRlIF90cmFuc2Zvcm1lZFByb3ZpZGVycyA9IG5ldyBNYXA8YW55LCBQcm92aWRlckFzdD4oKTtcbiAgcHJpdmF0ZSBfc2VlblByb3ZpZGVycyA9IG5ldyBNYXA8YW55LCBib29sZWFuPigpO1xuICBwcml2YXRlIF9hbGxQcm92aWRlcnM6IE1hcDxhbnksIFByb3ZpZGVyQXN0PjtcbiAgcHJpdmF0ZSBfZXJyb3JzOiBQcm92aWRlckVycm9yW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcmVmbGVjdG9yOiBDb21waWxlUmVmbGVjdG9yLCBuZ01vZHVsZTogQ29tcGlsZU5nTW9kdWxlTWV0YWRhdGEsXG4gICAgICBleHRyYVByb3ZpZGVyczogQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGFbXSwgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuKSB7XG4gICAgdGhpcy5fYWxsUHJvdmlkZXJzID0gbmV3IE1hcDxhbnksIFByb3ZpZGVyQXN0PigpO1xuICAgIG5nTW9kdWxlLnRyYW5zaXRpdmVNb2R1bGUubW9kdWxlcy5mb3JFYWNoKChuZ01vZHVsZVR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEpID0+IHtcbiAgICAgIGNvbnN0IG5nTW9kdWxlUHJvdmlkZXIgPSB7dG9rZW46IHtpZGVudGlmaWVyOiBuZ01vZHVsZVR5cGV9LCB1c2VDbGFzczogbmdNb2R1bGVUeXBlfTtcbiAgICAgIF9yZXNvbHZlUHJvdmlkZXJzKFxuICAgICAgICAgIFtuZ01vZHVsZVByb3ZpZGVyXSwgUHJvdmlkZXJBc3RUeXBlLlB1YmxpY1NlcnZpY2UsIHRydWUsIHNvdXJjZVNwYW4sIHRoaXMuX2Vycm9ycyxcbiAgICAgICAgICB0aGlzLl9hbGxQcm92aWRlcnMsIC8qIGlzTW9kdWxlICovIHRydWUpO1xuICAgIH0pO1xuICAgIF9yZXNvbHZlUHJvdmlkZXJzKFxuICAgICAgICBuZ01vZHVsZS50cmFuc2l0aXZlTW9kdWxlLnByb3ZpZGVycy5tYXAoZW50cnkgPT4gZW50cnkucHJvdmlkZXIpLmNvbmNhdChleHRyYVByb3ZpZGVycyksXG4gICAgICAgIFByb3ZpZGVyQXN0VHlwZS5QdWJsaWNTZXJ2aWNlLCBmYWxzZSwgc291cmNlU3BhbiwgdGhpcy5fZXJyb3JzLCB0aGlzLl9hbGxQcm92aWRlcnMsXG4gICAgICAgIC8qIGlzTW9kdWxlICovIGZhbHNlKTtcbiAgfVxuXG4gIHBhcnNlKCk6IFByb3ZpZGVyQXN0W10ge1xuICAgIEFycmF5LmZyb20odGhpcy5fYWxsUHJvdmlkZXJzLnZhbHVlcygpKS5mb3JFYWNoKChwcm92aWRlcikgPT4ge1xuICAgICAgdGhpcy5fZ2V0T3JDcmVhdGVMb2NhbFByb3ZpZGVyKHByb3ZpZGVyLnRva2VuLCBwcm92aWRlci5lYWdlcik7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuX2Vycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBlcnJvclN0cmluZyA9IHRoaXMuX2Vycm9ycy5qb2luKCdcXG4nKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvdmlkZXIgcGFyc2UgZXJyb3JzOlxcbiR7ZXJyb3JTdHJpbmd9YCk7XG4gICAgfVxuICAgIC8vIE5vdGU6IE1hcHMga2VlcCB0aGVpciBpbnNlcnRpb24gb3JkZXIuXG4gICAgY29uc3QgbGF6eVByb3ZpZGVyczogUHJvdmlkZXJBc3RbXSA9IFtdO1xuICAgIGNvbnN0IGVhZ2VyUHJvdmlkZXJzOiBQcm92aWRlckFzdFtdID0gW107XG4gICAgdGhpcy5fdHJhbnNmb3JtZWRQcm92aWRlcnMuZm9yRWFjaChwcm92aWRlciA9PiB7XG4gICAgICBpZiAocHJvdmlkZXIuZWFnZXIpIHtcbiAgICAgICAgZWFnZXJQcm92aWRlcnMucHVzaChwcm92aWRlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsYXp5UHJvdmlkZXJzLnB1c2gocHJvdmlkZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBsYXp5UHJvdmlkZXJzLmNvbmNhdChlYWdlclByb3ZpZGVycyk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRPckNyZWF0ZUxvY2FsUHJvdmlkZXIodG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhLCBlYWdlcjogYm9vbGVhbik6IFByb3ZpZGVyQXN0fG51bGwge1xuICAgIGNvbnN0IHJlc29sdmVkUHJvdmlkZXIgPSB0aGlzLl9hbGxQcm92aWRlcnMuZ2V0KHRva2VuUmVmZXJlbmNlKHRva2VuKSk7XG4gICAgaWYgKCFyZXNvbHZlZFByb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbGV0IHRyYW5zZm9ybWVkUHJvdmlkZXJBc3QgPSB0aGlzLl90cmFuc2Zvcm1lZFByb3ZpZGVycy5nZXQodG9rZW5SZWZlcmVuY2UodG9rZW4pKTtcbiAgICBpZiAodHJhbnNmb3JtZWRQcm92aWRlckFzdCkge1xuICAgICAgcmV0dXJuIHRyYW5zZm9ybWVkUHJvdmlkZXJBc3Q7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZWVuUHJvdmlkZXJzLmdldCh0b2tlblJlZmVyZW5jZSh0b2tlbikpICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2Vycm9ycy5wdXNoKG5ldyBQcm92aWRlckVycm9yKFxuICAgICAgICAgIGBDYW5ub3QgaW5zdGFudGlhdGUgY3ljbGljIGRlcGVuZGVuY3khICR7dG9rZW5OYW1lKHRva2VuKX1gLFxuICAgICAgICAgIHJlc29sdmVkUHJvdmlkZXIuc291cmNlU3BhbikpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHRoaXMuX3NlZW5Qcm92aWRlcnMuc2V0KHRva2VuUmVmZXJlbmNlKHRva2VuKSwgdHJ1ZSk7XG4gICAgY29uc3QgdHJhbnNmb3JtZWRQcm92aWRlcnMgPSByZXNvbHZlZFByb3ZpZGVyLnByb3ZpZGVycy5tYXAoKHByb3ZpZGVyKSA9PiB7XG4gICAgICBsZXQgdHJhbnNmb3JtZWRVc2VWYWx1ZSA9IHByb3ZpZGVyLnVzZVZhbHVlO1xuICAgICAgbGV0IHRyYW5zZm9ybWVkVXNlRXhpc3RpbmcgPSBwcm92aWRlci51c2VFeGlzdGluZyAhO1xuICAgICAgbGV0IHRyYW5zZm9ybWVkRGVwczogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW10gPSB1bmRlZmluZWQgITtcbiAgICAgIGlmIChwcm92aWRlci51c2VFeGlzdGluZyAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nRGlEZXAgPVxuICAgICAgICAgICAgdGhpcy5fZ2V0RGVwZW5kZW5jeSh7dG9rZW46IHByb3ZpZGVyLnVzZUV4aXN0aW5nfSwgZWFnZXIsIHJlc29sdmVkUHJvdmlkZXIuc291cmNlU3Bhbik7XG4gICAgICAgIGlmIChleGlzdGluZ0RpRGVwLnRva2VuICE9IG51bGwpIHtcbiAgICAgICAgICB0cmFuc2Zvcm1lZFVzZUV4aXN0aW5nID0gZXhpc3RpbmdEaURlcC50b2tlbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cmFuc2Zvcm1lZFVzZUV4aXN0aW5nID0gbnVsbCAhO1xuICAgICAgICAgIHRyYW5zZm9ybWVkVXNlVmFsdWUgPSBleGlzdGluZ0RpRGVwLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHByb3ZpZGVyLnVzZUZhY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZGVwcyA9IHByb3ZpZGVyLmRlcHMgfHwgcHJvdmlkZXIudXNlRmFjdG9yeS5kaURlcHM7XG4gICAgICAgIHRyYW5zZm9ybWVkRGVwcyA9XG4gICAgICAgICAgICBkZXBzLm1hcCgoZGVwKSA9PiB0aGlzLl9nZXREZXBlbmRlbmN5KGRlcCwgZWFnZXIsIHJlc29sdmVkUHJvdmlkZXIuc291cmNlU3BhbikpO1xuICAgICAgfSBlbHNlIGlmIChwcm92aWRlci51c2VDbGFzcykge1xuICAgICAgICBjb25zdCBkZXBzID0gcHJvdmlkZXIuZGVwcyB8fCBwcm92aWRlci51c2VDbGFzcy5kaURlcHM7XG4gICAgICAgIHRyYW5zZm9ybWVkRGVwcyA9XG4gICAgICAgICAgICBkZXBzLm1hcCgoZGVwKSA9PiB0aGlzLl9nZXREZXBlbmRlbmN5KGRlcCwgZWFnZXIsIHJlc29sdmVkUHJvdmlkZXIuc291cmNlU3BhbikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF90cmFuc2Zvcm1Qcm92aWRlcihwcm92aWRlciwge1xuICAgICAgICB1c2VFeGlzdGluZzogdHJhbnNmb3JtZWRVc2VFeGlzdGluZyxcbiAgICAgICAgdXNlVmFsdWU6IHRyYW5zZm9ybWVkVXNlVmFsdWUsXG4gICAgICAgIGRlcHM6IHRyYW5zZm9ybWVkRGVwc1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdHJhbnNmb3JtZWRQcm92aWRlckFzdCA9XG4gICAgICAgIF90cmFuc2Zvcm1Qcm92aWRlckFzdChyZXNvbHZlZFByb3ZpZGVyLCB7ZWFnZXI6IGVhZ2VyLCBwcm92aWRlcnM6IHRyYW5zZm9ybWVkUHJvdmlkZXJzfSk7XG4gICAgdGhpcy5fdHJhbnNmb3JtZWRQcm92aWRlcnMuc2V0KHRva2VuUmVmZXJlbmNlKHRva2VuKSwgdHJhbnNmb3JtZWRQcm92aWRlckFzdCk7XG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkUHJvdmlkZXJBc3Q7XG4gIH1cblxuICBwcml2YXRlIF9nZXREZXBlbmRlbmN5KFxuICAgICAgZGVwOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEsIGVhZ2VyOiBib29sZWFuID0gZmFsc2UsXG4gICAgICByZXF1ZXN0b3JTb3VyY2VTcGFuOiBQYXJzZVNvdXJjZVNwYW4pOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEge1xuICAgIGxldCBmb3VuZExvY2FsID0gZmFsc2U7XG4gICAgaWYgKCFkZXAuaXNTa2lwU2VsZiAmJiBkZXAudG9rZW4gIT0gbnVsbCkge1xuICAgICAgLy8gYWNjZXNzIHRoZSBpbmplY3RvclxuICAgICAgaWYgKHRva2VuUmVmZXJlbmNlKGRlcC50b2tlbikgPT09XG4gICAgICAgICAgICAgIHRoaXMucmVmbGVjdG9yLnJlc29sdmVFeHRlcm5hbFJlZmVyZW5jZShJZGVudGlmaWVycy5JbmplY3RvcikgfHxcbiAgICAgICAgICB0b2tlblJlZmVyZW5jZShkZXAudG9rZW4pID09PVxuICAgICAgICAgICAgICB0aGlzLnJlZmxlY3Rvci5yZXNvbHZlRXh0ZXJuYWxSZWZlcmVuY2UoSWRlbnRpZmllcnMuQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSkge1xuICAgICAgICBmb3VuZExvY2FsID0gdHJ1ZTtcbiAgICAgICAgLy8gYWNjZXNzIHByb3ZpZGVyc1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9nZXRPckNyZWF0ZUxvY2FsUHJvdmlkZXIoZGVwLnRva2VuLCBlYWdlcikgIT0gbnVsbCkge1xuICAgICAgICBmb3VuZExvY2FsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlcDtcbiAgfVxufVxuXG5mdW5jdGlvbiBfdHJhbnNmb3JtUHJvdmlkZXIoXG4gICAgcHJvdmlkZXI6IENvbXBpbGVQcm92aWRlck1ldGFkYXRhLFxuICAgIHt1c2VFeGlzdGluZywgdXNlVmFsdWUsIGRlcHN9OlxuICAgICAgICB7dXNlRXhpc3Rpbmc6IENvbXBpbGVUb2tlbk1ldGFkYXRhLCB1c2VWYWx1ZTogYW55LCBkZXBzOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGFbXX0pIHtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogcHJvdmlkZXIudG9rZW4sXG4gICAgdXNlQ2xhc3M6IHByb3ZpZGVyLnVzZUNsYXNzLFxuICAgIHVzZUV4aXN0aW5nOiB1c2VFeGlzdGluZyxcbiAgICB1c2VGYWN0b3J5OiBwcm92aWRlci51c2VGYWN0b3J5LFxuICAgIHVzZVZhbHVlOiB1c2VWYWx1ZSxcbiAgICBkZXBzOiBkZXBzLFxuICAgIG11bHRpOiBwcm92aWRlci5tdWx0aVxuICB9O1xufVxuXG5mdW5jdGlvbiBfdHJhbnNmb3JtUHJvdmlkZXJBc3QoXG4gICAgcHJvdmlkZXI6IFByb3ZpZGVyQXN0LFxuICAgIHtlYWdlciwgcHJvdmlkZXJzfToge2VhZ2VyOiBib29sZWFuLCBwcm92aWRlcnM6IENvbXBpbGVQcm92aWRlck1ldGFkYXRhW119KTogUHJvdmlkZXJBc3Qge1xuICByZXR1cm4gbmV3IFByb3ZpZGVyQXN0KFxuICAgICAgcHJvdmlkZXIudG9rZW4sIHByb3ZpZGVyLm11bHRpUHJvdmlkZXIsIHByb3ZpZGVyLmVhZ2VyIHx8IGVhZ2VyLCBwcm92aWRlcnMsXG4gICAgICBwcm92aWRlci5wcm92aWRlclR5cGUsIHByb3ZpZGVyLmxpZmVjeWNsZUhvb2tzLCBwcm92aWRlci5zb3VyY2VTcGFuLCBwcm92aWRlci5pc01vZHVsZSk7XG59XG5cbmZ1bmN0aW9uIF9yZXNvbHZlUHJvdmlkZXJzRnJvbURpcmVjdGl2ZXMoXG4gICAgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZVN1bW1hcnlbXSwgc291cmNlU3BhbjogUGFyc2VTb3VyY2VTcGFuLFxuICAgIHRhcmdldEVycm9yczogUGFyc2VFcnJvcltdKTogTWFwPGFueSwgUHJvdmlkZXJBc3Q+IHtcbiAgY29uc3QgcHJvdmlkZXJzQnlUb2tlbiA9IG5ldyBNYXA8YW55LCBQcm92aWRlckFzdD4oKTtcbiAgZGlyZWN0aXZlcy5mb3JFYWNoKChkaXJlY3RpdmUpID0+IHtcbiAgICBjb25zdCBkaXJQcm92aWRlcjpcbiAgICAgICAgQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgPSB7dG9rZW46IHtpZGVudGlmaWVyOiBkaXJlY3RpdmUudHlwZX0sIHVzZUNsYXNzOiBkaXJlY3RpdmUudHlwZX07XG4gICAgX3Jlc29sdmVQcm92aWRlcnMoXG4gICAgICAgIFtkaXJQcm92aWRlcl0sXG4gICAgICAgIGRpcmVjdGl2ZS5pc0NvbXBvbmVudCA/IFByb3ZpZGVyQXN0VHlwZS5Db21wb25lbnQgOiBQcm92aWRlckFzdFR5cGUuRGlyZWN0aXZlLCB0cnVlLFxuICAgICAgICBzb3VyY2VTcGFuLCB0YXJnZXRFcnJvcnMsIHByb3ZpZGVyc0J5VG9rZW4sIC8qIGlzTW9kdWxlICovIGZhbHNlKTtcbiAgfSk7XG5cbiAgLy8gTm90ZTogZGlyZWN0aXZlcyBuZWVkIHRvIGJlIGFibGUgdG8gb3ZlcndyaXRlIHByb3ZpZGVycyBvZiBhIGNvbXBvbmVudCFcbiAgY29uc3QgZGlyZWN0aXZlc1dpdGhDb21wb25lbnRGaXJzdCA9XG4gICAgICBkaXJlY3RpdmVzLmZpbHRlcihkaXIgPT4gZGlyLmlzQ29tcG9uZW50KS5jb25jYXQoZGlyZWN0aXZlcy5maWx0ZXIoZGlyID0+ICFkaXIuaXNDb21wb25lbnQpKTtcbiAgZGlyZWN0aXZlc1dpdGhDb21wb25lbnRGaXJzdC5mb3JFYWNoKChkaXJlY3RpdmUpID0+IHtcbiAgICBfcmVzb2x2ZVByb3ZpZGVycyhcbiAgICAgICAgZGlyZWN0aXZlLnByb3ZpZGVycywgUHJvdmlkZXJBc3RUeXBlLlB1YmxpY1NlcnZpY2UsIGZhbHNlLCBzb3VyY2VTcGFuLCB0YXJnZXRFcnJvcnMsXG4gICAgICAgIHByb3ZpZGVyc0J5VG9rZW4sIC8qIGlzTW9kdWxlICovIGZhbHNlKTtcbiAgICBfcmVzb2x2ZVByb3ZpZGVycyhcbiAgICAgICAgZGlyZWN0aXZlLnZpZXdQcm92aWRlcnMsIFByb3ZpZGVyQXN0VHlwZS5Qcml2YXRlU2VydmljZSwgZmFsc2UsIHNvdXJjZVNwYW4sIHRhcmdldEVycm9ycyxcbiAgICAgICAgcHJvdmlkZXJzQnlUb2tlbiwgLyogaXNNb2R1bGUgKi8gZmFsc2UpO1xuICB9KTtcbiAgcmV0dXJuIHByb3ZpZGVyc0J5VG9rZW47XG59XG5cbmZ1bmN0aW9uIF9yZXNvbHZlUHJvdmlkZXJzKFxuICAgIHByb3ZpZGVyczogQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGFbXSwgcHJvdmlkZXJUeXBlOiBQcm92aWRlckFzdFR5cGUsIGVhZ2VyOiBib29sZWFuLFxuICAgIHNvdXJjZVNwYW46IFBhcnNlU291cmNlU3BhbiwgdGFyZ2V0RXJyb3JzOiBQYXJzZUVycm9yW10sXG4gICAgdGFyZ2V0UHJvdmlkZXJzQnlUb2tlbjogTWFwPGFueSwgUHJvdmlkZXJBc3Q+LCBpc01vZHVsZTogYm9vbGVhbikge1xuICBwcm92aWRlcnMuZm9yRWFjaCgocHJvdmlkZXIpID0+IHtcbiAgICBsZXQgcmVzb2x2ZWRQcm92aWRlciA9IHRhcmdldFByb3ZpZGVyc0J5VG9rZW4uZ2V0KHRva2VuUmVmZXJlbmNlKHByb3ZpZGVyLnRva2VuKSk7XG4gICAgaWYgKHJlc29sdmVkUHJvdmlkZXIgIT0gbnVsbCAmJiAhIXJlc29sdmVkUHJvdmlkZXIubXVsdGlQcm92aWRlciAhPT0gISFwcm92aWRlci5tdWx0aSkge1xuICAgICAgdGFyZ2V0RXJyb3JzLnB1c2gobmV3IFByb3ZpZGVyRXJyb3IoXG4gICAgICAgICAgYE1peGluZyBtdWx0aSBhbmQgbm9uIG11bHRpIHByb3ZpZGVyIGlzIG5vdCBwb3NzaWJsZSBmb3IgdG9rZW4gJHt0b2tlbk5hbWUocmVzb2x2ZWRQcm92aWRlci50b2tlbil9YCxcbiAgICAgICAgICBzb3VyY2VTcGFuKSk7XG4gICAgfVxuICAgIGlmICghcmVzb2x2ZWRQcm92aWRlcikge1xuICAgICAgY29uc3QgbGlmZWN5Y2xlSG9va3MgPSBwcm92aWRlci50b2tlbi5pZGVudGlmaWVyICYmXG4gICAgICAgICAgICAgICg8Q29tcGlsZVR5cGVNZXRhZGF0YT5wcm92aWRlci50b2tlbi5pZGVudGlmaWVyKS5saWZlY3ljbGVIb29rcyA/XG4gICAgICAgICAgKDxDb21waWxlVHlwZU1ldGFkYXRhPnByb3ZpZGVyLnRva2VuLmlkZW50aWZpZXIpLmxpZmVjeWNsZUhvb2tzIDpcbiAgICAgICAgICBbXTtcbiAgICAgIGNvbnN0IGlzVXNlVmFsdWUgPSAhKHByb3ZpZGVyLnVzZUNsYXNzIHx8IHByb3ZpZGVyLnVzZUV4aXN0aW5nIHx8IHByb3ZpZGVyLnVzZUZhY3RvcnkpO1xuICAgICAgcmVzb2x2ZWRQcm92aWRlciA9IG5ldyBQcm92aWRlckFzdChcbiAgICAgICAgICBwcm92aWRlci50b2tlbiwgISFwcm92aWRlci5tdWx0aSwgZWFnZXIgfHwgaXNVc2VWYWx1ZSwgW3Byb3ZpZGVyXSwgcHJvdmlkZXJUeXBlLFxuICAgICAgICAgIGxpZmVjeWNsZUhvb2tzLCBzb3VyY2VTcGFuLCBpc01vZHVsZSk7XG4gICAgICB0YXJnZXRQcm92aWRlcnNCeVRva2VuLnNldCh0b2tlblJlZmVyZW5jZShwcm92aWRlci50b2tlbiksIHJlc29sdmVkUHJvdmlkZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXByb3ZpZGVyLm11bHRpKSB7XG4gICAgICAgIHJlc29sdmVkUHJvdmlkZXIucHJvdmlkZXJzLmxlbmd0aCA9IDA7XG4gICAgICB9XG4gICAgICByZXNvbHZlZFByb3ZpZGVyLnByb3ZpZGVycy5wdXNoKHByb3ZpZGVyKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cbmZ1bmN0aW9uIF9nZXRWaWV3UXVlcmllcyhjb21wb25lbnQ6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSk6IE1hcDxhbnksIFF1ZXJ5V2l0aElkW10+IHtcbiAgLy8gTm90ZTogcXVlcmllcyBzdGFydCB3aXRoIGlkIDEgc28gd2UgY2FuIHVzZSB0aGUgbnVtYmVyIGluIGEgQmxvb20gZmlsdGVyIVxuICBsZXQgdmlld1F1ZXJ5SWQgPSAxO1xuICBjb25zdCB2aWV3UXVlcmllcyA9IG5ldyBNYXA8YW55LCBRdWVyeVdpdGhJZFtdPigpO1xuICBpZiAoY29tcG9uZW50LnZpZXdRdWVyaWVzKSB7XG4gICAgY29tcG9uZW50LnZpZXdRdWVyaWVzLmZvckVhY2goXG4gICAgICAgIChxdWVyeSkgPT4gX2FkZFF1ZXJ5VG9Ub2tlbk1hcCh2aWV3UXVlcmllcywge21ldGE6IHF1ZXJ5LCBxdWVyeUlkOiB2aWV3UXVlcnlJZCsrfSkpO1xuICB9XG4gIHJldHVybiB2aWV3UXVlcmllcztcbn1cblxuZnVuY3Rpb24gX2dldENvbnRlbnRRdWVyaWVzKFxuICAgIGNvbnRlbnRRdWVyeVN0YXJ0SWQ6IG51bWJlciwgZGlyZWN0aXZlczogQ29tcGlsZURpcmVjdGl2ZVN1bW1hcnlbXSk6IE1hcDxhbnksIFF1ZXJ5V2l0aElkW10+IHtcbiAgbGV0IGNvbnRlbnRRdWVyeUlkID0gY29udGVudFF1ZXJ5U3RhcnRJZDtcbiAgY29uc3QgY29udGVudFF1ZXJpZXMgPSBuZXcgTWFwPGFueSwgUXVlcnlXaXRoSWRbXT4oKTtcbiAgZGlyZWN0aXZlcy5mb3JFYWNoKChkaXJlY3RpdmUsIGRpcmVjdGl2ZUluZGV4KSA9PiB7XG4gICAgaWYgKGRpcmVjdGl2ZS5xdWVyaWVzKSB7XG4gICAgICBkaXJlY3RpdmUucXVlcmllcy5mb3JFYWNoKFxuICAgICAgICAgIChxdWVyeSkgPT4gX2FkZFF1ZXJ5VG9Ub2tlbk1hcChjb250ZW50UXVlcmllcywge21ldGE6IHF1ZXJ5LCBxdWVyeUlkOiBjb250ZW50UXVlcnlJZCsrfSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb250ZW50UXVlcmllcztcbn1cblxuZnVuY3Rpb24gX2FkZFF1ZXJ5VG9Ub2tlbk1hcChtYXA6IE1hcDxhbnksIFF1ZXJ5V2l0aElkW10+LCBxdWVyeTogUXVlcnlXaXRoSWQpIHtcbiAgcXVlcnkubWV0YS5zZWxlY3RvcnMuZm9yRWFjaCgodG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhKSA9PiB7XG4gICAgbGV0IGVudHJ5ID0gbWFwLmdldCh0b2tlblJlZmVyZW5jZSh0b2tlbikpO1xuICAgIGlmICghZW50cnkpIHtcbiAgICAgIGVudHJ5ID0gW107XG4gICAgICBtYXAuc2V0KHRva2VuUmVmZXJlbmNlKHRva2VuKSwgZW50cnkpO1xuICAgIH1cbiAgICBlbnRyeS5wdXNoKHF1ZXJ5KTtcbiAgfSk7XG59XG4iXX0=