"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const path = require("path");
const ts = require("typescript");
/**
 * Find all nodes from the AST in the subtree of node of SyntaxKind kind.
 * @param node The root node to check, or null if the whole tree should be searched.
 * @param sourceFile The source file where the node is.
 * @param kind The kind of nodes to find.
 * @param recursive Whether to go in matched nodes to keep matching.
 * @param max The maximum number of items to return.
 * @return all nodes of kind, or [] if none is found
 */
// TODO: replace this with collectDeepNodes and add limits to collectDeepNodes
function findAstNodes(node, sourceFile, kind, recursive = false, max = Infinity) {
    // TODO: refactor operations that only need `refactor.findAstNodes()` to use this instead.
    if (max == 0) {
        return [];
    }
    if (!node) {
        node = sourceFile;
    }
    const arr = [];
    if (node.kind === kind) {
        // If we're not recursively looking for children, stop here.
        if (!recursive) {
            return [node];
        }
        arr.push(node);
        max--;
    }
    if (max > 0) {
        for (const child of node.getChildren(sourceFile)) {
            findAstNodes(child, sourceFile, kind, recursive, max)
                .forEach((node) => {
                if (max > 0) {
                    arr.push(node);
                }
                max--;
            });
            if (max <= 0) {
                break;
            }
        }
    }
    return arr;
}
exports.findAstNodes = findAstNodes;
function resolve(filePath, _host, compilerOptions) {
    if (path.isAbsolute(filePath)) {
        return filePath;
    }
    const basePath = compilerOptions.baseUrl || compilerOptions.rootDir;
    if (!basePath) {
        throw new Error(`Trying to resolve '${filePath}' without a basePath.`);
    }
    return path.join(basePath, filePath);
}
exports.resolve = resolve;
class TypeScriptFileRefactor {
    get fileName() { return this._fileName; }
    get sourceFile() { return this._sourceFile; }
    constructor(fileName, _host, _program, source) {
        let sourceFile = null;
        if (_program) {
            fileName = resolve(fileName, _host, _program.getCompilerOptions()).replace(/\\/g, '/');
            this._fileName = fileName;
            if (source) {
                sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true);
            }
            else {
                sourceFile = _program.getSourceFile(fileName) || null;
            }
        }
        if (!sourceFile) {
            const maybeContent = source || _host.readFile(fileName);
            if (maybeContent) {
                sourceFile = ts.createSourceFile(fileName, maybeContent, ts.ScriptTarget.Latest, true);
            }
        }
        if (!sourceFile) {
            throw new Error('Must have a source file to refactor.');
        }
        this._sourceFile = sourceFile;
    }
    /**
     * Find all nodes from the AST in the subtree of node of SyntaxKind kind.
     * @param node The root node to check, or null if the whole tree should be searched.
     * @param kind The kind of nodes to find.
     * @param recursive Whether to go in matched nodes to keep matching.
     * @param max The maximum number of items to return.
     * @return all nodes of kind, or [] if none is found
     */
    findAstNodes(node, kind, recursive = false, max = Infinity) {
        return findAstNodes(node, this._sourceFile, kind, recursive, max);
    }
}
exports.TypeScriptFileRefactor = TypeScriptFileRefactor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmYWN0b3IuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL25ndG9vbHMvd2VicGFjay9zcmMvcmVmYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBR2pDOzs7Ozs7OztHQVFHO0FBQ0gsOEVBQThFO0FBQzlFLHNCQUNFLElBQW9CLEVBQ3BCLFVBQXlCLEVBQ3pCLElBQW1CLEVBQ25CLFNBQVMsR0FBRyxLQUFLLEVBQ2pCLEdBQUcsR0FBRyxRQUFRO0lBRWQsMEZBQTBGO0lBQzFGLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDVixJQUFJLEdBQUcsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxNQUFNLEdBQUcsR0FBUSxFQUFFLENBQUM7SUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLDREQUE0RDtRQUM1RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsQ0FBQyxJQUFTLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFTLENBQUMsQ0FBQztRQUNwQixHQUFHLEVBQUUsQ0FBQztJQUNSLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELFlBQVksQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElB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LFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxZQUFZLENBQUMsSUFBb0IsRUFDcEIsSUFBbUIsRUFDbkIsU0FBUyxHQUFHLEtBQUssRUFDakIsR0FBRyxHQUFHLFFBQVE7UUFDekIsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7Q0FFRjtBQXhERCx3REF3REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cblxuLyoqXG4gKiBGaW5kIGFsbCBub2RlcyBmcm9tIHRoZSBBU1QgaW4gdGhlIHN1YnRyZWUgb2Ygbm9kZSBvZiBTeW50YXhLaW5kIGtpbmQuXG4gKiBAcGFyYW0gbm9kZSBUaGUgcm9vdCBub2RlIHRvIGNoZWNrLCBvciBudWxsIGlmIHRoZSB3aG9sZSB0cmVlIHNob3VsZCBiZSBzZWFyY2hlZC5cbiAqIEBwYXJhbSBzb3VyY2VGaWxlIFRoZSBzb3VyY2UgZmlsZSB3aGVyZSB0aGUgbm9kZSBpcy5cbiAqIEBwYXJhbSBraW5kIFRoZSBraW5kIG9mIG5vZGVzIHRvIGZpbmQuXG4gKiBAcGFyYW0gcmVjdXJzaXZlIFdoZXRoZXIgdG8gZ28gaW4gbWF0Y2hlZCBub2RlcyB0byBrZWVwIG1hdGNoaW5nLlxuICogQHBhcmFtIG1heCBUaGUgbWF4aW11bSBudW1iZXIgb2YgaXRlbXMgdG8gcmV0dXJuLlxuICogQHJldHVybiBhbGwgbm9kZXMgb2Yga2luZCwgb3IgW10gaWYgbm9uZSBpcyBmb3VuZFxuICovXG4vLyBUT0RPOiByZXBsYWNlIHRoaXMgd2l0aCBjb2xsZWN0RGVlcE5vZGVzIGFuZCBhZGQgbGltaXRzIHRvIGNvbGxlY3REZWVwTm9kZXNcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQXN0Tm9kZXM8VCBleHRlbmRzIHRzLk5vZGU+KFxuICBub2RlOiB0cy5Ob2RlIHwgbnVsbCxcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAga2luZDogdHMuU3ludGF4S2luZCxcbiAgcmVjdXJzaXZlID0gZmFsc2UsXG4gIG1heCA9IEluZmluaXR5LFxuKTogVFtdIHtcbiAgLy8gVE9ETzogcmVmYWN0b3Igb3BlcmF0aW9ucyB0aGF0IG9ubHkgbmVlZCBgcmVmYWN0b3IuZmluZEFzdE5vZGVzKClgIHRvIHVzZSB0aGlzIGluc3RlYWQuXG4gIGlmIChtYXggPT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBpZiAoIW5vZGUpIHtcbiAgICBub2RlID0gc291cmNlRmlsZTtcbiAgfVxuXG4gIGNvbnN0IGFycjogVFtdID0gW107XG4gIGlmIChub2RlLmtpbmQgPT09IGtpbmQpIHtcbiAgICAvLyBJZiB3ZSdyZSBub3QgcmVjdXJzaXZlbHkgbG9va2luZyBmb3IgY2hpbGRyZW4sIHN0b3AgaGVyZS5cbiAgICBpZiAoIXJlY3Vyc2l2ZSkge1xuICAgICAgcmV0dXJuIFtub2RlIGFzIFRdO1xuICAgIH1cblxuICAgIGFyci5wdXNoKG5vZGUgYXMgVCk7XG4gICAgbWF4LS07XG4gIH1cblxuICBpZiAobWF4ID4gMCkge1xuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5nZXRDaGlsZHJlbihzb3VyY2VGaWxlKSkge1xuICAgICAgZmluZEFzdE5vZGVzKGNoaWxkLCBzb3VyY2VGaWxlLCBraW5kLCByZWN1cnNpdmUsIG1heClcbiAgICAgICAgLmZvckVhY2goKG5vZGU6IHRzLk5vZGUpID0+IHtcbiAgICAgICAgICBpZiAobWF4ID4gMCkge1xuICAgICAgICAgICAgYXJyLnB1c2gobm9kZSBhcyBUKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWF4LS07XG4gICAgICAgIH0pO1xuXG4gICAgICBpZiAobWF4IDw9IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmUoXG4gIGZpbGVQYXRoOiBzdHJpbmcsXG4gIF9ob3N0OiB0cy5Db21waWxlckhvc3QsXG4gIGNvbXBpbGVyT3B0aW9uczogdHMuQ29tcGlsZXJPcHRpb25zLFxuKTogc3RyaW5nIHtcbiAgaWYgKHBhdGguaXNBYnNvbHV0ZShmaWxlUGF0aCkpIHtcbiAgICByZXR1cm4gZmlsZVBhdGg7XG4gIH1cbiAgY29uc3QgYmFzZVBhdGggPSBjb21waWxlck9wdGlvbnMuYmFzZVVybCB8fCBjb21waWxlck9wdGlvbnMucm9vdERpcjtcbiAgaWYgKCFiYXNlUGF0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVHJ5aW5nIHRvIHJlc29sdmUgJyR7ZmlsZVBhdGh9JyB3aXRob3V0IGEgYmFzZVBhdGguYCk7XG4gIH1cblxuICByZXR1cm4gcGF0aC5qb2luKGJhc2VQYXRoLCBmaWxlUGF0aCk7XG59XG5cblxuZXhwb3J0IGNsYXNzIFR5cGVTY3JpcHRGaWxlUmVmYWN0b3Ige1xuICBwcml2YXRlIF9maWxlTmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9zb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlO1xuXG4gIGdldCBmaWxlTmFtZSgpIHsgcmV0dXJuIHRoaXMuX2ZpbGVOYW1lOyB9XG4gIGdldCBzb3VyY2VGaWxlKCkgeyByZXR1cm4gdGhpcy5fc291cmNlRmlsZTsgfVxuXG4gIGNvbnN0cnVjdG9yKGZpbGVOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgIF9ob3N0OiB0cy5Db21waWxlckhvc3QsXG4gICAgICAgICAgICAgIF9wcm9ncmFtPzogdHMuUHJvZ3JhbSxcbiAgICAgICAgICAgICAgc291cmNlPzogc3RyaW5nIHwgbnVsbCkge1xuICAgIGxldCBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlIHwgbnVsbCA9IG51bGw7XG5cbiAgICBpZiAoX3Byb2dyYW0pIHtcbiAgICAgIGZpbGVOYW1lID0gcmVzb2x2ZShmaWxlTmFtZSwgX2hvc3QsIF9wcm9ncmFtLmdldENvbXBpbGVyT3B0aW9ucygpKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG4gICAgICB0aGlzLl9maWxlTmFtZSA9IGZpbGVOYW1lO1xuXG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIHNvdXJjZUZpbGUgPSB0cy5jcmVhdGVTb3VyY2VGaWxlKGZpbGVOYW1lLCBzb3VyY2UsIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc291cmNlRmlsZSA9IF9wcm9ncmFtLmdldFNvdXJjZUZpbGUoZmlsZU5hbWUpIHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghc291cmNlRmlsZSkge1xuICAgICAgY29uc3QgbWF5YmVDb250ZW50ID0gc291cmNlIHx8IF9ob3N0LnJlYWRGaWxlKGZpbGVOYW1lKTtcbiAgICAgIGlmIChtYXliZUNvbnRlbnQpIHtcbiAgICAgICAgc291cmNlRmlsZSA9IHRzLmNyZWF0ZVNvdXJjZUZpbGUoXG4gICAgICAgICAgZmlsZU5hbWUsXG4gICAgICAgICAgbWF5YmVDb250ZW50LFxuICAgICAgICAgIHRzLlNjcmlwdFRhcmdldC5MYXRlc3QsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzb3VyY2VGaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgaGF2ZSBhIHNvdXJjZSBmaWxlIHRvIHJlZmFjdG9yLicpO1xuICAgIH1cblxuICAgIHRoaXMuX3NvdXJjZUZpbGUgPSBzb3VyY2VGaWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYWxsIG5vZGVzIGZyb20gdGhlIEFTVCBpbiB0aGUgc3VidHJlZSBvZiBub2RlIG9mIFN5bnRheEtpbmQga2luZC5cbiAgICogQHBhcmFtIG5vZGUgVGhlIHJvb3Qgbm9kZSB0byBjaGVjaywgb3IgbnVsbCBpZiB0aGUgd2hvbGUgdHJlZSBzaG91bGQgYmUgc2VhcmNoZWQuXG4gICAqIEBwYXJhbSBraW5kIFRoZSBraW5kIG9mIG5vZGVzIHRvIGZpbmQuXG4gICAqIEBwYXJhbSByZWN1cnNpdmUgV2hldGhlciB0byBnbyBpbiBtYXRjaGVkIG5vZGVzIHRvIGtlZXAgbWF0Y2hpbmcuXG4gICAqIEBwYXJhbSBtYXggVGhlIG1heGltdW0gbnVtYmVyIG9mIGl0ZW1zIHRvIHJldHVybi5cbiAgICogQHJldHVybiBhbGwgbm9kZXMgb2Yga2luZCwgb3IgW10gaWYgbm9uZSBpcyBmb3VuZFxuICAgKi9cbiAgZmluZEFzdE5vZGVzKG5vZGU6IHRzLk5vZGUgfCBudWxsLFxuICAgICAgICAgICAgICAga2luZDogdHMuU3ludGF4S2luZCxcbiAgICAgICAgICAgICAgIHJlY3Vyc2l2ZSA9IGZhbHNlLFxuICAgICAgICAgICAgICAgbWF4ID0gSW5maW5pdHkpOiB0cy5Ob2RlW10ge1xuICAgIHJldHVybiBmaW5kQXN0Tm9kZXMobm9kZSwgdGhpcy5fc291cmNlRmlsZSwga2luZCwgcmVjdXJzaXZlLCBtYXgpO1xuICB9XG5cbn1cbiJdfQ==