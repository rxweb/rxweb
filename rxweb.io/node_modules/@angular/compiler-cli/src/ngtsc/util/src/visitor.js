/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/util/src/visitor", ["require", "exports", "tslib", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ts = require("typescript");
    /**
     * Visit a node with the given visitor and return a transformed copy.
     */
    function visit(node, visitor, context) {
        return visitor._visit(node, context);
    }
    exports.visit = visit;
    /**
     * Abstract base class for visitors, which processes certain nodes specially to allow insertion
     * of other nodes before them.
     */
    var Visitor = /** @class */ (function () {
        function Visitor() {
            /**
             * Maps statements to an array of statements that should be inserted before them.
             */
            this._before = new Map();
        }
        /**
         * Visit a class declaration, returning at least the transformed declaration and optionally other
         * nodes to insert before the declaration.
         */
        Visitor.prototype.visitClassDeclaration = function (node) {
            return { node: node };
        };
        Visitor.prototype._visitListEntryNode = function (node, visitor) {
            var result = visitor(node);
            if (result.before !== undefined) {
                // Record that some nodes should be inserted before the given declaration. The declaration's
                // parent's _visit call is responsible for performing this insertion.
                this._before.set(result.node, result.before);
            }
            return result.node;
        };
        /**
         * Visit types of nodes which don't have their own explicit visitor.
         */
        Visitor.prototype.visitOtherNode = function (node) { return node; };
        /**
         * @internal
         */
        Visitor.prototype._visit = function (node, context) {
            var _this = this;
            // First, visit the node. visitedNode starts off as `null` but should be set after visiting
            // is completed.
            var visitedNode = null;
            node = ts.visitEachChild(node, function (child) { return _this._visit(child, context); }, context);
            if (ts.isClassDeclaration(node)) {
                visitedNode = this._visitListEntryNode(node, function (node) { return _this.visitClassDeclaration(node); });
            }
            else {
                visitedNode = this.visitOtherNode(node);
            }
            // If the visited node has a `statements` array then process them, maybe replacing the visited
            // node and adding additional statements.
            if (hasStatements(visitedNode)) {
                visitedNode = this._maybeProcessStatements(visitedNode);
            }
            return visitedNode;
        };
        Visitor.prototype._maybeProcessStatements = function (node) {
            var _this = this;
            // Shortcut - if every statement doesn't require nodes to be prepended, this is a no-op.
            if (node.statements.every(function (stmt) { return !_this._before.has(stmt); })) {
                return node;
            }
            // There are statements to prepend, so clone the original node.
            var clone = ts.getMutableClone(node);
            // Build a new list of statements and patch it onto the clone.
            var newStatements = [];
            clone.statements.forEach(function (stmt) {
                if (_this._before.has(stmt)) {
                    newStatements.push.apply(newStatements, tslib_1.__spread(_this._before.get(stmt)));
                    _this._before.delete(stmt);
                }
                newStatements.push(stmt);
            });
            clone.statements = ts.createNodeArray(newStatements, node.statements.hasTrailingComma);
            return clone;
        };
        return Visitor;
    }());
    exports.Visitor = Visitor;
    function hasStatements(node) {
        var block = node;
        return block.statements !== undefined && Array.isArray(block.statements);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvdXRpbC9zcmMvdmlzaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7SUFFSCwrQkFBaUM7SUFXakM7O09BRUc7SUFDSCxlQUNJLElBQU8sRUFBRSxPQUFnQixFQUFFLE9BQWlDO1FBQzlELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUhELHNCQUdDO0lBRUQ7OztPQUdHO0lBQ0g7UUFBQTtZQUNFOztlQUVHO1lBQ0ssWUFBTyxHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO1FBMkV2RCxDQUFDO1FBekVDOzs7V0FHRztRQUNILHVDQUFxQixHQUFyQixVQUFzQixJQUF5QjtZQUU3QyxPQUFPLEVBQUMsSUFBSSxNQUFBLEVBQUMsQ0FBQztRQUNoQixDQUFDO1FBRU8scUNBQW1CLEdBQTNCLFVBQ0ksSUFBTyxFQUFFLE9BQTJEO1lBQ3RFLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUMvQiw0RkFBNEY7Z0JBQzVGLHFFQUFxRTtnQkFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDOUM7WUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUVEOztXQUVHO1FBQ0gsZ0NBQWMsR0FBZCxVQUFrQyxJQUFPLElBQU8sT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTlEOztXQUVHO1FBQ0gsd0JBQU0sR0FBTixVQUEwQixJQUFPLEVBQUUsT0FBaUM7WUFBcEUsaUJBcUJDO1lBcEJDLDJGQUEyRjtZQUMzRixnQkFBZ0I7WUFDaEIsSUFBSSxXQUFXLEdBQVcsSUFBSSxDQUFDO1lBRS9CLElBQUksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUEzQixDQUEyQixFQUFFLE9BQU8sQ0FBTSxDQUFDO1lBRW5GLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvQixXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUNsQyxJQUFJLEVBQUUsVUFBQyxJQUF5QixJQUFLLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxDQUFnQixDQUFDO2FBQzNGO2lCQUFNO2dCQUNMLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pDO1lBRUQsOEZBQThGO1lBQzlGLHlDQUF5QztZQUN6QyxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDOUIsV0FBVyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN6RDtZQUVELE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7UUFFTyx5Q0FBdUIsR0FBL0IsVUFDSSxJQUFPO1lBRFgsaUJBcUJDO1lBbkJDLHdGQUF3RjtZQUN4RixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxFQUFFO2dCQUMxRCxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsK0RBQStEO1lBQy9ELElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkMsOERBQThEO1lBQzlELElBQU0sYUFBYSxHQUFtQixFQUFFLENBQUM7WUFDekMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUMzQixJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMxQixhQUFhLENBQUMsSUFBSSxPQUFsQixhQUFhLG1CQUFVLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBcUIsR0FBRTtvQkFDbkUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO2dCQUNELGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDSCxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN2RixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDSCxjQUFDO0lBQUQsQ0FBQyxBQS9FRCxJQStFQztJQS9FcUIsMEJBQU87SUFpRjdCLHVCQUF1QixJQUFhO1FBQ2xDLElBQU0sS0FBSyxHQUFHLElBQXlCLENBQUM7UUFDeEMsT0FBTyxLQUFLLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuLyoqXG4gKiBSZXN1bHQgdHlwZSBvZiB2aXNpdGluZyBhIG5vZGUgdGhhdCdzIHR5cGljYWxseSBhbiBlbnRyeSBpbiBhIGxpc3QsIHdoaWNoIGFsbG93cyBzcGVjaWZ5aW5nIHRoYXRcbiAqIG5vZGVzIHNob3VsZCBiZSBhZGRlZCBiZWZvcmUgdGhlIHZpc2l0ZWQgbm9kZSBpbiB0aGUgb3V0cHV0LlxuICovXG5leHBvcnQgdHlwZSBWaXNpdExpc3RFbnRyeVJlc3VsdDxCIGV4dGVuZHMgdHMuTm9kZSwgVCBleHRlbmRzIEI+ID0ge1xuICBub2RlOiBULFxuICBiZWZvcmU/OiBCW11cbn07XG5cbi8qKlxuICogVmlzaXQgYSBub2RlIHdpdGggdGhlIGdpdmVuIHZpc2l0b3IgYW5kIHJldHVybiBhIHRyYW5zZm9ybWVkIGNvcHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdDxUIGV4dGVuZHMgdHMuTm9kZT4oXG4gICAgbm9kZTogVCwgdmlzaXRvcjogVmlzaXRvciwgY29udGV4dDogdHMuVHJhbnNmb3JtYXRpb25Db250ZXh0KTogVCB7XG4gIHJldHVybiB2aXNpdG9yLl92aXNpdChub2RlLCBjb250ZXh0KTtcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBiYXNlIGNsYXNzIGZvciB2aXNpdG9ycywgd2hpY2ggcHJvY2Vzc2VzIGNlcnRhaW4gbm9kZXMgc3BlY2lhbGx5IHRvIGFsbG93IGluc2VydGlvblxuICogb2Ygb3RoZXIgbm9kZXMgYmVmb3JlIHRoZW0uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWaXNpdG9yIHtcbiAgLyoqXG4gICAqIE1hcHMgc3RhdGVtZW50cyB0byBhbiBhcnJheSBvZiBzdGF0ZW1lbnRzIHRoYXQgc2hvdWxkIGJlIGluc2VydGVkIGJlZm9yZSB0aGVtLlxuICAgKi9cbiAgcHJpdmF0ZSBfYmVmb3JlID0gbmV3IE1hcDx0cy5Ob2RlLCB0cy5TdGF0ZW1lbnRbXT4oKTtcblxuICAvKipcbiAgICogVmlzaXQgYSBjbGFzcyBkZWNsYXJhdGlvbiwgcmV0dXJuaW5nIGF0IGxlYXN0IHRoZSB0cmFuc2Zvcm1lZCBkZWNsYXJhdGlvbiBhbmQgb3B0aW9uYWxseSBvdGhlclxuICAgKiBub2RlcyB0byBpbnNlcnQgYmVmb3JlIHRoZSBkZWNsYXJhdGlvbi5cbiAgICovXG4gIHZpc2l0Q2xhc3NEZWNsYXJhdGlvbihub2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uKTpcbiAgICAgIFZpc2l0TGlzdEVudHJ5UmVzdWx0PHRzLlN0YXRlbWVudCwgdHMuQ2xhc3NEZWNsYXJhdGlvbj4ge1xuICAgIHJldHVybiB7bm9kZX07XG4gIH1cblxuICBwcml2YXRlIF92aXNpdExpc3RFbnRyeU5vZGU8VCBleHRlbmRzIHRzLlN0YXRlbWVudD4oXG4gICAgICBub2RlOiBULCB2aXNpdG9yOiAobm9kZTogVCkgPT4gVmlzaXRMaXN0RW50cnlSZXN1bHQ8dHMuU3RhdGVtZW50LCBUPik6IFQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHZpc2l0b3Iobm9kZSk7XG4gICAgaWYgKHJlc3VsdC5iZWZvcmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gUmVjb3JkIHRoYXQgc29tZSBub2RlcyBzaG91bGQgYmUgaW5zZXJ0ZWQgYmVmb3JlIHRoZSBnaXZlbiBkZWNsYXJhdGlvbi4gVGhlIGRlY2xhcmF0aW9uJ3NcbiAgICAgIC8vIHBhcmVudCdzIF92aXNpdCBjYWxsIGlzIHJlc3BvbnNpYmxlIGZvciBwZXJmb3JtaW5nIHRoaXMgaW5zZXJ0aW9uLlxuICAgICAgdGhpcy5fYmVmb3JlLnNldChyZXN1bHQubm9kZSwgcmVzdWx0LmJlZm9yZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQubm9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWaXNpdCB0eXBlcyBvZiBub2RlcyB3aGljaCBkb24ndCBoYXZlIHRoZWlyIG93biBleHBsaWNpdCB2aXNpdG9yLlxuICAgKi9cbiAgdmlzaXRPdGhlck5vZGU8VCBleHRlbmRzIHRzLk5vZGU+KG5vZGU6IFQpOiBUIHsgcmV0dXJuIG5vZGU7IH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfdmlzaXQ8VCBleHRlbmRzIHRzLk5vZGU+KG5vZGU6IFQsIGNvbnRleHQ6IHRzLlRyYW5zZm9ybWF0aW9uQ29udGV4dCk6IFQge1xuICAgIC8vIEZpcnN0LCB2aXNpdCB0aGUgbm9kZS4gdmlzaXRlZE5vZGUgc3RhcnRzIG9mZiBhcyBgbnVsbGAgYnV0IHNob3VsZCBiZSBzZXQgYWZ0ZXIgdmlzaXRpbmdcbiAgICAvLyBpcyBjb21wbGV0ZWQuXG4gICAgbGV0IHZpc2l0ZWROb2RlOiBUfG51bGwgPSBudWxsO1xuXG4gICAgbm9kZSA9IHRzLnZpc2l0RWFjaENoaWxkKG5vZGUsIGNoaWxkID0+IHRoaXMuX3Zpc2l0KGNoaWxkLCBjb250ZXh0KSwgY29udGV4dCkgYXMgVDtcblxuICAgIGlmICh0cy5pc0NsYXNzRGVjbGFyYXRpb24obm9kZSkpIHtcbiAgICAgIHZpc2l0ZWROb2RlID0gdGhpcy5fdmlzaXRMaXN0RW50cnlOb2RlKFxuICAgICAgICAgIG5vZGUsIChub2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uKSA9PiB0aGlzLnZpc2l0Q2xhc3NEZWNsYXJhdGlvbihub2RlKSkgYXMgdHlwZW9mIG5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpc2l0ZWROb2RlID0gdGhpcy52aXNpdE90aGVyTm9kZShub2RlKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgdmlzaXRlZCBub2RlIGhhcyBhIGBzdGF0ZW1lbnRzYCBhcnJheSB0aGVuIHByb2Nlc3MgdGhlbSwgbWF5YmUgcmVwbGFjaW5nIHRoZSB2aXNpdGVkXG4gICAgLy8gbm9kZSBhbmQgYWRkaW5nIGFkZGl0aW9uYWwgc3RhdGVtZW50cy5cbiAgICBpZiAoaGFzU3RhdGVtZW50cyh2aXNpdGVkTm9kZSkpIHtcbiAgICAgIHZpc2l0ZWROb2RlID0gdGhpcy5fbWF5YmVQcm9jZXNzU3RhdGVtZW50cyh2aXNpdGVkTm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZpc2l0ZWROb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWF5YmVQcm9jZXNzU3RhdGVtZW50czxUIGV4dGVuZHMgdHMuTm9kZSZ7c3RhdGVtZW50czogdHMuTm9kZUFycmF5PHRzLlN0YXRlbWVudD59PihcbiAgICAgIG5vZGU6IFQpOiBUIHtcbiAgICAvLyBTaG9ydGN1dCAtIGlmIGV2ZXJ5IHN0YXRlbWVudCBkb2Vzbid0IHJlcXVpcmUgbm9kZXMgdG8gYmUgcHJlcGVuZGVkLCB0aGlzIGlzIGEgbm8tb3AuXG4gICAgaWYgKG5vZGUuc3RhdGVtZW50cy5ldmVyeShzdG10ID0+ICF0aGlzLl9iZWZvcmUuaGFzKHN0bXQpKSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgLy8gVGhlcmUgYXJlIHN0YXRlbWVudHMgdG8gcHJlcGVuZCwgc28gY2xvbmUgdGhlIG9yaWdpbmFsIG5vZGUuXG4gICAgY29uc3QgY2xvbmUgPSB0cy5nZXRNdXRhYmxlQ2xvbmUobm9kZSk7XG5cbiAgICAvLyBCdWlsZCBhIG5ldyBsaXN0IG9mIHN0YXRlbWVudHMgYW5kIHBhdGNoIGl0IG9udG8gdGhlIGNsb25lLlxuICAgIGNvbnN0IG5ld1N0YXRlbWVudHM6IHRzLlN0YXRlbWVudFtdID0gW107XG4gICAgY2xvbmUuc3RhdGVtZW50cy5mb3JFYWNoKHN0bXQgPT4ge1xuICAgICAgaWYgKHRoaXMuX2JlZm9yZS5oYXMoc3RtdCkpIHtcbiAgICAgICAgbmV3U3RhdGVtZW50cy5wdXNoKC4uLih0aGlzLl9iZWZvcmUuZ2V0KHN0bXQpICFhcyB0cy5TdGF0ZW1lbnRbXSkpO1xuICAgICAgICB0aGlzLl9iZWZvcmUuZGVsZXRlKHN0bXQpO1xuICAgICAgfVxuICAgICAgbmV3U3RhdGVtZW50cy5wdXNoKHN0bXQpO1xuICAgIH0pO1xuICAgIGNsb25lLnN0YXRlbWVudHMgPSB0cy5jcmVhdGVOb2RlQXJyYXkobmV3U3RhdGVtZW50cywgbm9kZS5zdGF0ZW1lbnRzLmhhc1RyYWlsaW5nQ29tbWEpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXNTdGF0ZW1lbnRzKG5vZGU6IHRzLk5vZGUpOiBub2RlIGlzIHRzLk5vZGUme3N0YXRlbWVudHM6IHRzLk5vZGVBcnJheTx0cy5TdGF0ZW1lbnQ+fSB7XG4gIGNvbnN0IGJsb2NrID0gbm9kZSBhc3tzdGF0ZW1lbnRzPzogYW55fTtcbiAgcmV0dXJuIGJsb2NrLnN0YXRlbWVudHMgIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KGJsb2NrLnN0YXRlbWVudHMpO1xufVxuIl19