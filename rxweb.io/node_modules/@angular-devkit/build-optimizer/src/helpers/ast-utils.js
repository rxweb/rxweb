"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const ts = require("typescript");
// Find all nodes from the AST in the subtree of node of SyntaxKind kind.
function collectDeepNodes(node, kind) {
    const nodes = [];
    const helper = (child) => {
        if (child.kind === kind) {
            nodes.push(child);
        }
        ts.forEachChild(child, helper);
    };
    ts.forEachChild(node, helper);
    return nodes;
}
exports.collectDeepNodes = collectDeepNodes;
function drilldownNodes(startingNode, path) {
    let currentNode = startingNode;
    for (const segment of path) {
        if (segment.prop) {
            // ts.Node has no index signature, so we need to cast it as any.
            const tempNode = currentNode[segment.prop];
            if (!tempNode || typeof tempNode != 'object' || currentNode.kind !== segment.kind) {
                return null;
            }
            // tslint:disable-next-line:no-any
            currentNode = tempNode;
        }
    }
    return currentNode;
}
exports.drilldownNodes = drilldownNodes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0LXV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9vcHRpbWl6ZXIvc3JjL2hlbHBlcnMvYXN0LXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsaUNBQWlDO0FBRWpDLHlFQUF5RTtBQUN6RSwwQkFBb0QsSUFBYSxFQUFFLElBQW1CO0lBQ3BGLE1BQU0sS0FBSyxHQUFRLEVBQUUsQ0FBQztJQUN0QixNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQWMsRUFBRSxFQUFFO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQVUsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUM7SUFDRixFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU5QixNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQVhELDRDQVdDO0FBRUQsd0JBQ0UsWUFBZSxFQUNmLElBQThDO0lBRTlDLElBQUksV0FBVyxHQUFNLFlBQVksQ0FBQztJQUNsQyxHQUFHLENBQUMsQ0FBQyxNQUFNLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLGdFQUFnRTtZQUNoRSxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLE9BQU8sUUFBUSxJQUFJLFFBQVEsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsRixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUVELGtDQUFrQztZQUNsQyxXQUFXLEdBQUcsUUFBb0IsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQW5CRCx3Q0FtQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuLy8gRmluZCBhbGwgbm9kZXMgZnJvbSB0aGUgQVNUIGluIHRoZSBzdWJ0cmVlIG9mIG5vZGUgb2YgU3ludGF4S2luZCBraW5kLlxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3REZWVwTm9kZXM8VCBleHRlbmRzIHRzLk5vZGU+KG5vZGU6IHRzLk5vZGUsIGtpbmQ6IHRzLlN5bnRheEtpbmQpOiBUW10ge1xuICBjb25zdCBub2RlczogVFtdID0gW107XG4gIGNvbnN0IGhlbHBlciA9IChjaGlsZDogdHMuTm9kZSkgPT4ge1xuICAgIGlmIChjaGlsZC5raW5kID09PSBraW5kKSB7XG4gICAgICBub2Rlcy5wdXNoKGNoaWxkIGFzIFQpO1xuICAgIH1cbiAgICB0cy5mb3JFYWNoQ2hpbGQoY2hpbGQsIGhlbHBlcik7XG4gIH07XG4gIHRzLmZvckVhY2hDaGlsZChub2RlLCBoZWxwZXIpO1xuXG4gIHJldHVybiBub2Rlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyaWxsZG93bk5vZGVzPFQgZXh0ZW5kcyB0cy5Ob2RlPihcbiAgc3RhcnRpbmdOb2RlOiBULFxuICBwYXRoOiB7IHByb3A6IGtleW9mIFQsIGtpbmQ6IHRzLlN5bnRheEtpbmQgfVtdLFxuKTogVCB8IG51bGwge1xuICBsZXQgY3VycmVudE5vZGU6IFQgPSBzdGFydGluZ05vZGU7XG4gIGZvciAoY29uc3Qgc2VnbWVudCBvZiBwYXRoKSB7XG4gICAgaWYgKHNlZ21lbnQucHJvcCkge1xuICAgICAgLy8gdHMuTm9kZSBoYXMgbm8gaW5kZXggc2lnbmF0dXJlLCBzbyB3ZSBuZWVkIHRvIGNhc3QgaXQgYXMgYW55LlxuICAgICAgY29uc3QgdGVtcE5vZGUgPSBjdXJyZW50Tm9kZVtzZWdtZW50LnByb3BdO1xuICAgICAgaWYgKCF0ZW1wTm9kZSB8fCB0eXBlb2YgdGVtcE5vZGUgIT0gJ29iamVjdCcgfHwgY3VycmVudE5vZGUua2luZCAhPT0gc2VnbWVudC5raW5kKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgICBjdXJyZW50Tm9kZSA9IHRlbXBOb2RlIGFzIGFueSBhcyBUO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdXJyZW50Tm9kZTtcbn1cbiJdfQ==