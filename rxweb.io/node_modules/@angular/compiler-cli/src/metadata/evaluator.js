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
        define("@angular/compiler-cli/src/metadata/evaluator", ["require", "exports", "tslib", "typescript", "@angular/compiler-cli/src/metadata/schema"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    var ts = require("typescript");
    var schema_1 = require("@angular/compiler-cli/src/metadata/schema");
    // In TypeScript 2.1 the spread element kind was renamed.
    var spreadElementSyntaxKind = ts.SyntaxKind.SpreadElement || ts.SyntaxKind.SpreadElementExpression;
    function isMethodCallOf(callExpression, memberName) {
        var expression = callExpression.expression;
        if (expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            var propertyAccessExpression = expression;
            var name = propertyAccessExpression.name;
            if (name.kind == ts.SyntaxKind.Identifier) {
                return name.text === memberName;
            }
        }
        return false;
    }
    function isCallOf(callExpression, ident) {
        var expression = callExpression.expression;
        if (expression.kind === ts.SyntaxKind.Identifier) {
            var identifier = expression;
            return identifier.text === ident;
        }
        return false;
    }
    /* @internal */
    function recordMapEntry(entry, node, nodeMap, sourceFile) {
        if (!nodeMap.has(entry)) {
            nodeMap.set(entry, node);
            if (node && (schema_1.isMetadataImportedSymbolReferenceExpression(entry) ||
                schema_1.isMetadataImportDefaultReference(entry)) &&
                entry.line == null) {
                var info = sourceInfo(node, sourceFile);
                if (info.line != null)
                    entry.line = info.line;
                if (info.character != null)
                    entry.character = info.character;
            }
        }
        return entry;
    }
    exports.recordMapEntry = recordMapEntry;
    /**
     * ts.forEachChild stops iterating children when the callback return a truthy value.
     * This method inverts this to implement an `every` style iterator. It will return
     * true if every call to `cb` returns `true`.
     */
    function everyNodeChild(node, cb) {
        return !ts.forEachChild(node, function (node) { return !cb(node); });
    }
    function isPrimitive(value) {
        return Object(value) !== value;
    }
    exports.isPrimitive = isPrimitive;
    function isDefined(obj) {
        return obj !== undefined;
    }
    function getSourceFileOfNode(node) {
        while (node && node.kind != ts.SyntaxKind.SourceFile) {
            node = node.parent;
        }
        return node;
    }
    /* @internal */
    function sourceInfo(node, sourceFile) {
        if (node) {
            sourceFile = sourceFile || getSourceFileOfNode(node);
            if (sourceFile) {
                return ts.getLineAndCharacterOfPosition(sourceFile, node.getStart(sourceFile));
            }
        }
        return {};
    }
    exports.sourceInfo = sourceInfo;
    /* @internal */
    function errorSymbol(message, node, context, sourceFile) {
        var result = tslib_1.__assign({ __symbolic: 'error', message: message }, sourceInfo(node, sourceFile));
        if (context) {
            result.context = context;
        }
        return result;
    }
    exports.errorSymbol = errorSymbol;
    /**
     * Produce a symbolic representation of an expression folding values into their final value when
     * possible.
     */
    var Evaluator = /** @class */ (function () {
        function Evaluator(symbols, nodeMap, options, recordExport) {
            if (options === void 0) { options = {}; }
            this.symbols = symbols;
            this.nodeMap = nodeMap;
            this.options = options;
            this.recordExport = recordExport;
        }
        Evaluator.prototype.nameOf = function (node) {
            if (node && node.kind == ts.SyntaxKind.Identifier) {
                return node.text;
            }
            var result = node && this.evaluateNode(node);
            if (schema_1.isMetadataError(result) || typeof result === 'string') {
                return result;
            }
            else {
                return errorSymbol('Name expected', node, { received: (node && node.getText()) || '<missing>' });
            }
        };
        /**
         * Returns true if the expression represented by `node` can be folded into a literal expression.
         *
         * For example, a literal is always foldable. This means that literal expressions such as `1.2`
         * `"Some value"` `true` `false` are foldable.
         *
         * - An object literal is foldable if all the properties in the literal are foldable.
         * - An array literal is foldable if all the elements are foldable.
         * - A call is foldable if it is a call to a Array.prototype.concat or a call to CONST_EXPR.
         * - A property access is foldable if the object is foldable.
         * - A array index is foldable if index expression is foldable and the array is foldable.
         * - Binary operator expressions are foldable if the left and right expressions are foldable and
         *   it is one of '+', '-', '*', '/', '%', '||', and '&&'.
         * - An identifier is foldable if a value can be found for its symbol in the evaluator symbol
         *   table.
         */
        Evaluator.prototype.isFoldable = function (node) {
            return this.isFoldableWorker(node, new Map());
        };
        Evaluator.prototype.isFoldableWorker = function (node, folding) {
            var _this = this;
            if (node) {
                switch (node.kind) {
                    case ts.SyntaxKind.ObjectLiteralExpression:
                        return everyNodeChild(node, function (child) {
                            if (child.kind === ts.SyntaxKind.PropertyAssignment) {
                                var propertyAssignment = child;
                                return _this.isFoldableWorker(propertyAssignment.initializer, folding);
                            }
                            return false;
                        });
                    case ts.SyntaxKind.ArrayLiteralExpression:
                        return everyNodeChild(node, function (child) { return _this.isFoldableWorker(child, folding); });
                    case ts.SyntaxKind.CallExpression:
                        var callExpression = node;
                        // We can fold a <array>.concat(<v>).
                        if (isMethodCallOf(callExpression, 'concat') &&
                            arrayOrEmpty(callExpression.arguments).length === 1) {
                            var arrayNode = callExpression.expression.expression;
                            if (this.isFoldableWorker(arrayNode, folding) &&
                                this.isFoldableWorker(callExpression.arguments[0], folding)) {
                                // It needs to be an array.
                                var arrayValue = this.evaluateNode(arrayNode);
                                if (arrayValue && Array.isArray(arrayValue)) {
                                    return true;
                                }
                            }
                        }
                        // We can fold a call to CONST_EXPR
                        if (isCallOf(callExpression, 'CONST_EXPR') &&
                            arrayOrEmpty(callExpression.arguments).length === 1)
                            return this.isFoldableWorker(callExpression.arguments[0], folding);
                        return false;
                    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                    case ts.SyntaxKind.StringLiteral:
                    case ts.SyntaxKind.NumericLiteral:
                    case ts.SyntaxKind.NullKeyword:
                    case ts.SyntaxKind.TrueKeyword:
                    case ts.SyntaxKind.FalseKeyword:
                    case ts.SyntaxKind.TemplateHead:
                    case ts.SyntaxKind.TemplateMiddle:
                    case ts.SyntaxKind.TemplateTail:
                        return true;
                    case ts.SyntaxKind.ParenthesizedExpression:
                        var parenthesizedExpression = node;
                        return this.isFoldableWorker(parenthesizedExpression.expression, folding);
                    case ts.SyntaxKind.BinaryExpression:
                        var binaryExpression = node;
                        switch (binaryExpression.operatorToken.kind) {
                            case ts.SyntaxKind.PlusToken:
                            case ts.SyntaxKind.MinusToken:
                            case ts.SyntaxKind.AsteriskToken:
                            case ts.SyntaxKind.SlashToken:
                            case ts.SyntaxKind.PercentToken:
                            case ts.SyntaxKind.AmpersandAmpersandToken:
                            case ts.SyntaxKind.BarBarToken:
                                return this.isFoldableWorker(binaryExpression.left, folding) &&
                                    this.isFoldableWorker(binaryExpression.right, folding);
                            default:
                                return false;
                        }
                    case ts.SyntaxKind.PropertyAccessExpression:
                        var propertyAccessExpression = node;
                        return this.isFoldableWorker(propertyAccessExpression.expression, folding);
                    case ts.SyntaxKind.ElementAccessExpression:
                        var elementAccessExpression = node;
                        return this.isFoldableWorker(elementAccessExpression.expression, folding) &&
                            this.isFoldableWorker(elementAccessExpression.argumentExpression, folding);
                    case ts.SyntaxKind.Identifier:
                        var identifier = node;
                        var reference = this.symbols.resolve(identifier.text);
                        if (reference !== undefined && isPrimitive(reference)) {
                            return true;
                        }
                        break;
                    case ts.SyntaxKind.TemplateExpression:
                        var templateExpression = node;
                        return templateExpression.templateSpans.every(function (span) { return _this.isFoldableWorker(span.expression, folding); });
                }
            }
            return false;
        };
        /**
         * Produce a JSON serialiable object representing `node`. The foldable values in the expression
         * tree are folded. For example, a node representing `1 + 2` is folded into `3`.
         */
        Evaluator.prototype.evaluateNode = function (node, preferReference) {
            var _this = this;
            var t = this;
            var error;
            function recordEntry(entry, node) {
                if (t.options.substituteExpression) {
                    var newEntry = t.options.substituteExpression(entry, node);
                    if (t.recordExport && newEntry != entry && schema_1.isMetadataGlobalReferenceExpression(newEntry)) {
                        t.recordExport(newEntry.name, entry);
                    }
                    entry = newEntry;
                }
                return recordMapEntry(entry, node, t.nodeMap);
            }
            function isFoldableError(value) {
                return !t.options.verboseInvalidExpression && schema_1.isMetadataError(value);
            }
            var resolveName = function (name, preferReference) {
                var reference = _this.symbols.resolve(name, preferReference);
                if (reference === undefined) {
                    // Encode as a global reference. StaticReflector will check the reference.
                    return recordEntry({ __symbolic: 'reference', name: name }, node);
                }
                if (reference && schema_1.isMetadataSymbolicReferenceExpression(reference)) {
                    return recordEntry(tslib_1.__assign({}, reference), node);
                }
                return reference;
            };
            switch (node.kind) {
                case ts.SyntaxKind.ObjectLiteralExpression:
                    var obj_1 = {};
                    var quoted_1 = [];
                    ts.forEachChild(node, function (child) {
                        switch (child.kind) {
                            case ts.SyntaxKind.ShorthandPropertyAssignment:
                            case ts.SyntaxKind.PropertyAssignment:
                                var assignment = child;
                                if (assignment.name.kind == ts.SyntaxKind.StringLiteral) {
                                    var name_1 = assignment.name.text;
                                    quoted_1.push(name_1);
                                }
                                var propertyName = _this.nameOf(assignment.name);
                                if (isFoldableError(propertyName)) {
                                    error = propertyName;
                                    return true;
                                }
                                var propertyValue = isPropertyAssignment(assignment) ?
                                    _this.evaluateNode(assignment.initializer, /* preferReference */ true) :
                                    resolveName(propertyName, /* preferReference */ true);
                                if (isFoldableError(propertyValue)) {
                                    error = propertyValue;
                                    return true; // Stop the forEachChild.
                                }
                                else {
                                    obj_1[propertyName] = isPropertyAssignment(assignment) ?
                                        recordEntry(propertyValue, assignment.initializer) :
                                        propertyValue;
                                }
                        }
                    });
                    if (error)
                        return error;
                    if (this.options.quotedNames && quoted_1.length) {
                        obj_1['$quoted$'] = quoted_1;
                    }
                    return recordEntry(obj_1, node);
                case ts.SyntaxKind.ArrayLiteralExpression:
                    var arr_1 = [];
                    ts.forEachChild(node, function (child) {
                        var e_1, _a;
                        var value = _this.evaluateNode(child, /* preferReference */ true);
                        // Check for error
                        if (isFoldableError(value)) {
                            error = value;
                            return true; // Stop the forEachChild.
                        }
                        // Handle spread expressions
                        if (schema_1.isMetadataSymbolicSpreadExpression(value)) {
                            if (Array.isArray(value.expression)) {
                                try {
                                    for (var _b = tslib_1.__values(value.expression), _c = _b.next(); !_c.done; _c = _b.next()) {
                                        var spreadValue = _c.value;
                                        arr_1.push(spreadValue);
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                return;
                            }
                        }
                        arr_1.push(value);
                    });
                    if (error)
                        return error;
                    return recordEntry(arr_1, node);
                case spreadElementSyntaxKind:
                    var spreadExpression = this.evaluateNode(node.expression);
                    return recordEntry({ __symbolic: 'spread', expression: spreadExpression }, node);
                case ts.SyntaxKind.CallExpression:
                    var callExpression = node;
                    if (isCallOf(callExpression, 'forwardRef') &&
                        arrayOrEmpty(callExpression.arguments).length === 1) {
                        var firstArgument = callExpression.arguments[0];
                        if (firstArgument.kind == ts.SyntaxKind.ArrowFunction) {
                            var arrowFunction = firstArgument;
                            return recordEntry(this.evaluateNode(arrowFunction.body), node);
                        }
                    }
                    var args = arrayOrEmpty(callExpression.arguments).map(function (arg) { return _this.evaluateNode(arg); });
                    if (this.isFoldable(callExpression)) {
                        if (isMethodCallOf(callExpression, 'concat')) {
                            var arrayValue = this.evaluateNode(callExpression.expression.expression);
                            if (isFoldableError(arrayValue))
                                return arrayValue;
                            return arrayValue.concat(args[0]);
                        }
                    }
                    // Always fold a CONST_EXPR even if the argument is not foldable.
                    if (isCallOf(callExpression, 'CONST_EXPR') &&
                        arrayOrEmpty(callExpression.arguments).length === 1) {
                        return recordEntry(args[0], node);
                    }
                    var expression = this.evaluateNode(callExpression.expression);
                    if (isFoldableError(expression)) {
                        return recordEntry(expression, node);
                    }
                    var result = { __symbolic: 'call', expression: expression };
                    if (args && args.length) {
                        result.arguments = args;
                    }
                    return recordEntry(result, node);
                case ts.SyntaxKind.NewExpression:
                    var newExpression = node;
                    var newArgs = arrayOrEmpty(newExpression.arguments).map(function (arg) { return _this.evaluateNode(arg); });
                    var newTarget = this.evaluateNode(newExpression.expression);
                    if (schema_1.isMetadataError(newTarget)) {
                        return recordEntry(newTarget, node);
                    }
                    var call = { __symbolic: 'new', expression: newTarget };
                    if (newArgs.length) {
                        call.arguments = newArgs;
                    }
                    return recordEntry(call, node);
                case ts.SyntaxKind.PropertyAccessExpression: {
                    var propertyAccessExpression = node;
                    var expression_1 = this.evaluateNode(propertyAccessExpression.expression);
                    if (isFoldableError(expression_1)) {
                        return recordEntry(expression_1, node);
                    }
                    var member = this.nameOf(propertyAccessExpression.name);
                    if (isFoldableError(member)) {
                        return recordEntry(member, node);
                    }
                    if (expression_1 && this.isFoldable(propertyAccessExpression.expression))
                        return expression_1[member];
                    if (schema_1.isMetadataModuleReferenceExpression(expression_1)) {
                        // A select into a module reference and be converted into a reference to the symbol
                        // in the module
                        return recordEntry({ __symbolic: 'reference', module: expression_1.module, name: member }, node);
                    }
                    return recordEntry({ __symbolic: 'select', expression: expression_1, member: member }, node);
                }
                case ts.SyntaxKind.ElementAccessExpression: {
                    var elementAccessExpression = node;
                    var expression_2 = this.evaluateNode(elementAccessExpression.expression);
                    if (isFoldableError(expression_2)) {
                        return recordEntry(expression_2, node);
                    }
                    if (!elementAccessExpression.argumentExpression) {
                        return recordEntry(errorSymbol('Expression form not supported', node), node);
                    }
                    var index = this.evaluateNode(elementAccessExpression.argumentExpression);
                    if (isFoldableError(expression_2)) {
                        return recordEntry(expression_2, node);
                    }
                    if (this.isFoldable(elementAccessExpression.expression) &&
                        this.isFoldable(elementAccessExpression.argumentExpression))
                        return expression_2[index];
                    return recordEntry({ __symbolic: 'index', expression: expression_2, index: index }, node);
                }
                case ts.SyntaxKind.Identifier:
                    var identifier = node;
                    var name = identifier.text;
                    return resolveName(name, preferReference);
                case ts.SyntaxKind.TypeReference:
                    var typeReferenceNode = node;
                    var typeNameNode_1 = typeReferenceNode.typeName;
                    var getReference = function (node) {
                        if (typeNameNode_1.kind === ts.SyntaxKind.QualifiedName) {
                            var qualifiedName = node;
                            var left_1 = _this.evaluateNode(qualifiedName.left);
                            if (schema_1.isMetadataModuleReferenceExpression(left_1)) {
                                return recordEntry({
                                    __symbolic: 'reference',
                                    module: left_1.module,
                                    name: qualifiedName.right.text
                                }, node);
                            }
                            // Record a type reference to a declared type as a select.
                            return { __symbolic: 'select', expression: left_1, member: qualifiedName.right.text };
                        }
                        else {
                            var identifier_1 = typeNameNode_1;
                            var symbol = _this.symbols.resolve(identifier_1.text);
                            if (isFoldableError(symbol) || schema_1.isMetadataSymbolicReferenceExpression(symbol)) {
                                return recordEntry(symbol, node);
                            }
                            return recordEntry(errorSymbol('Could not resolve type', node, { typeName: identifier_1.text }), node);
                        }
                    };
                    var typeReference = getReference(typeNameNode_1);
                    if (isFoldableError(typeReference)) {
                        return recordEntry(typeReference, node);
                    }
                    if (!schema_1.isMetadataModuleReferenceExpression(typeReference) &&
                        typeReferenceNode.typeArguments && typeReferenceNode.typeArguments.length) {
                        var args_1 = typeReferenceNode.typeArguments.map(function (element) { return _this.evaluateNode(element); });
                        // TODO: Remove typecast when upgraded to 2.0 as it will be correctly inferred.
                        // Some versions of 1.9 do not infer this correctly.
                        typeReference.arguments = args_1;
                    }
                    return recordEntry(typeReference, node);
                case ts.SyntaxKind.UnionType:
                    var unionType = node;
                    // Remove null and undefined from the list of unions.
                    var references = unionType.types
                        .filter(function (n) { return n.kind != ts.SyntaxKind.NullKeyword &&
                        n.kind != ts.SyntaxKind.UndefinedKeyword; })
                        .map(function (n) { return _this.evaluateNode(n); });
                    // The remmaining reference must be the same. If two have type arguments consider them
                    // different even if the type arguments are the same.
                    var candidate = null;
                    for (var i = 0; i < references.length; i++) {
                        var reference = references[i];
                        if (schema_1.isMetadataSymbolicReferenceExpression(reference)) {
                            if (candidate) {
                                if (reference.name == candidate.name &&
                                    reference.module == candidate.module && !reference.arguments) {
                                    candidate = reference;
                                }
                            }
                            else {
                                candidate = reference;
                            }
                        }
                        else {
                            return reference;
                        }
                    }
                    if (candidate)
                        return candidate;
                    break;
                case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                case ts.SyntaxKind.StringLiteral:
                case ts.SyntaxKind.TemplateHead:
                case ts.SyntaxKind.TemplateTail:
                case ts.SyntaxKind.TemplateMiddle:
                    return node.text;
                case ts.SyntaxKind.NumericLiteral:
                    return parseFloat(node.text);
                case ts.SyntaxKind.AnyKeyword:
                    return recordEntry({ __symbolic: 'reference', name: 'any' }, node);
                case ts.SyntaxKind.StringKeyword:
                    return recordEntry({ __symbolic: 'reference', name: 'string' }, node);
                case ts.SyntaxKind.NumberKeyword:
                    return recordEntry({ __symbolic: 'reference', name: 'number' }, node);
                case ts.SyntaxKind.BooleanKeyword:
                    return recordEntry({ __symbolic: 'reference', name: 'boolean' }, node);
                case ts.SyntaxKind.ArrayType:
                    var arrayTypeNode = node;
                    return recordEntry({
                        __symbolic: 'reference',
                        name: 'Array',
                        arguments: [this.evaluateNode(arrayTypeNode.elementType)]
                    }, node);
                case ts.SyntaxKind.NullKeyword:
                    return null;
                case ts.SyntaxKind.TrueKeyword:
                    return true;
                case ts.SyntaxKind.FalseKeyword:
                    return false;
                case ts.SyntaxKind.ParenthesizedExpression:
                    var parenthesizedExpression = node;
                    return this.evaluateNode(parenthesizedExpression.expression);
                case ts.SyntaxKind.TypeAssertionExpression:
                    var typeAssertion = node;
                    return this.evaluateNode(typeAssertion.expression);
                case ts.SyntaxKind.PrefixUnaryExpression:
                    var prefixUnaryExpression = node;
                    var operand = this.evaluateNode(prefixUnaryExpression.operand);
                    if (isDefined(operand) && isPrimitive(operand)) {
                        switch (prefixUnaryExpression.operator) {
                            case ts.SyntaxKind.PlusToken:
                                return +operand;
                            case ts.SyntaxKind.MinusToken:
                                return -operand;
                            case ts.SyntaxKind.TildeToken:
                                return ~operand;
                            case ts.SyntaxKind.ExclamationToken:
                                return !operand;
                        }
                    }
                    var operatorText = void 0;
                    switch (prefixUnaryExpression.operator) {
                        case ts.SyntaxKind.PlusToken:
                            operatorText = '+';
                            break;
                        case ts.SyntaxKind.MinusToken:
                            operatorText = '-';
                            break;
                        case ts.SyntaxKind.TildeToken:
                            operatorText = '~';
                            break;
                        case ts.SyntaxKind.ExclamationToken:
                            operatorText = '!';
                            break;
                        default:
                            return undefined;
                    }
                    return recordEntry({ __symbolic: 'pre', operator: operatorText, operand: operand }, node);
                case ts.SyntaxKind.BinaryExpression:
                    var binaryExpression = node;
                    var left = this.evaluateNode(binaryExpression.left);
                    var right = this.evaluateNode(binaryExpression.right);
                    if (isDefined(left) && isDefined(right)) {
                        if (isPrimitive(left) && isPrimitive(right))
                            switch (binaryExpression.operatorToken.kind) {
                                case ts.SyntaxKind.BarBarToken:
                                    return left || right;
                                case ts.SyntaxKind.AmpersandAmpersandToken:
                                    return left && right;
                                case ts.SyntaxKind.AmpersandToken:
                                    return left & right;
                                case ts.SyntaxKind.BarToken:
                                    return left | right;
                                case ts.SyntaxKind.CaretToken:
                                    return left ^ right;
                                case ts.SyntaxKind.EqualsEqualsToken:
                                    return left == right;
                                case ts.SyntaxKind.ExclamationEqualsToken:
                                    return left != right;
                                case ts.SyntaxKind.EqualsEqualsEqualsToken:
                                    return left === right;
                                case ts.SyntaxKind.ExclamationEqualsEqualsToken:
                                    return left !== right;
                                case ts.SyntaxKind.LessThanToken:
                                    return left < right;
                                case ts.SyntaxKind.GreaterThanToken:
                                    return left > right;
                                case ts.SyntaxKind.LessThanEqualsToken:
                                    return left <= right;
                                case ts.SyntaxKind.GreaterThanEqualsToken:
                                    return left >= right;
                                case ts.SyntaxKind.LessThanLessThanToken:
                                    return left << right;
                                case ts.SyntaxKind.GreaterThanGreaterThanToken:
                                    return left >> right;
                                case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                                    return left >>> right;
                                case ts.SyntaxKind.PlusToken:
                                    return left + right;
                                case ts.SyntaxKind.MinusToken:
                                    return left - right;
                                case ts.SyntaxKind.AsteriskToken:
                                    return left * right;
                                case ts.SyntaxKind.SlashToken:
                                    return left / right;
                                case ts.SyntaxKind.PercentToken:
                                    return left % right;
                            }
                        return recordEntry({
                            __symbolic: 'binop',
                            operator: binaryExpression.operatorToken.getText(),
                            left: left,
                            right: right
                        }, node);
                    }
                    break;
                case ts.SyntaxKind.ConditionalExpression:
                    var conditionalExpression = node;
                    var condition = this.evaluateNode(conditionalExpression.condition);
                    var thenExpression = this.evaluateNode(conditionalExpression.whenTrue);
                    var elseExpression = this.evaluateNode(conditionalExpression.whenFalse);
                    if (isPrimitive(condition)) {
                        return condition ? thenExpression : elseExpression;
                    }
                    return recordEntry({ __symbolic: 'if', condition: condition, thenExpression: thenExpression, elseExpression: elseExpression }, node);
                case ts.SyntaxKind.FunctionExpression:
                case ts.SyntaxKind.ArrowFunction:
                    return recordEntry(errorSymbol('Lambda not supported', node), node);
                case ts.SyntaxKind.TaggedTemplateExpression:
                    return recordEntry(errorSymbol('Tagged template expressions are not supported in metadata', node), node);
                case ts.SyntaxKind.TemplateExpression:
                    var templateExpression = node;
                    if (this.isFoldable(node)) {
                        return templateExpression.templateSpans.reduce(function (previous, current) { return previous + _this.evaluateNode(current.expression) +
                            _this.evaluateNode(current.literal); }, this.evaluateNode(templateExpression.head));
                    }
                    else {
                        return templateExpression.templateSpans.reduce(function (previous, current) {
                            var expr = _this.evaluateNode(current.expression);
                            var literal = _this.evaluateNode(current.literal);
                            if (isFoldableError(expr))
                                return expr;
                            if (isFoldableError(literal))
                                return literal;
                            if (typeof previous === 'string' && typeof expr === 'string' &&
                                typeof literal === 'string') {
                                return previous + expr + literal;
                            }
                            var result = expr;
                            if (previous !== '') {
                                result = { __symbolic: 'binop', operator: '+', left: previous, right: expr };
                            }
                            if (literal != '') {
                                result = { __symbolic: 'binop', operator: '+', left: result, right: literal };
                            }
                            return result;
                        }, this.evaluateNode(templateExpression.head));
                    }
                case ts.SyntaxKind.AsExpression:
                    var asExpression = node;
                    return this.evaluateNode(asExpression.expression);
                case ts.SyntaxKind.ClassExpression:
                    return { __symbolic: 'class' };
            }
            return recordEntry(errorSymbol('Expression form not supported', node), node);
        };
        return Evaluator;
    }());
    exports.Evaluator = Evaluator;
    function isPropertyAssignment(node) {
        return node.kind == ts.SyntaxKind.PropertyAssignment;
    }
    var empty = ts.createNodeArray();
    function arrayOrEmpty(v) {
        return v || empty;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9tZXRhZGF0YS9ldmFsdWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7O0lBRUgsK0JBQWlDO0lBR2pDLG9FQUFxZDtJQUtyZCx5REFBeUQ7SUFDekQsSUFBTSx1QkFBdUIsR0FDeEIsRUFBRSxDQUFDLFVBQWtCLENBQUMsYUFBYSxJQUFLLEVBQUUsQ0FBQyxVQUFrQixDQUFDLHVCQUF1QixDQUFDO0lBRTNGLHdCQUF3QixjQUFpQyxFQUFFLFVBQWtCO1FBQzNFLElBQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUM7UUFDN0MsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLEVBQUU7WUFDOUQsSUFBTSx3QkFBd0IsR0FBZ0MsVUFBVSxDQUFDO1lBQ3pFLElBQU0sSUFBSSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQztZQUMzQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLENBQUM7YUFDakM7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELGtCQUFrQixjQUFpQyxFQUFFLEtBQWE7UUFDaEUsSUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUM3QyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7WUFDaEQsSUFBTSxVQUFVLEdBQWtCLFVBQVUsQ0FBQztZQUM3QyxPQUFPLFVBQVUsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixD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LENBQUM7Z0JBQ3BELEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlO29CQUNoQyxPQUFPLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFDSCxnQkFBQztJQUFELENBQUMsQUFqakJELElBaWpCQztJQWpqQlksOEJBQVM7SUFtakJ0Qiw4QkFBOEIsSUFBYTtRQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQztJQUN2RCxDQUFDO0lBRUQsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLGVBQWUsRUFBTyxDQUFDO0lBRXhDLHNCQUF5QyxDQUE2QjtRQUNwRSxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7SUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7Q29sbGVjdG9yT3B0aW9uc30gZnJvbSAnLi9jb2xsZWN0b3InO1xuaW1wb3J0IHtDbGFzc01ldGFkYXRhLCBGdW5jdGlvbk1ldGFkYXRhLCBJbnRlcmZhY2VNZXRhZGF0YSwgTWV0YWRhdGFFbnRyeSwgTWV0YWRhdGFFcnJvciwgTWV0YWRhdGFJbXBvcnRlZFN5bWJvbFJlZmVyZW5jZUV4cHJlc3Npb24sIE1ldGFkYXRhU291cmNlTG9jYXRpb25JbmZvLCBNZXRhZGF0YVN5bWJvbGljQ2FsbEV4cHJlc3Npb24sIE1ldGFkYXRhVmFsdWUsIGlzTWV0YWRhdGFFcnJvciwgaXNNZXRhZGF0YUdsb2JhbFJlZmVyZW5jZUV4cHJlc3Npb24sIGlzTWV0YWRhdGFJbXBvcnREZWZhdWx0UmVmZXJlbmNlLCBpc01ldGFkYXRhSW1wb3J0ZWRTeW1ib2xSZWZlcmVuY2VFeHByZXNzaW9uLCBpc01ldGFkYXRhTW9kdWxlUmVmZXJlbmNlRXhwcmVzc2lvbiwgaXNNZXRhZGF0YVN5bWJvbGljUmVmZXJlbmNlRXhwcmVzc2lvbiwgaXNNZXRhZGF0YVN5bWJvbGljU3ByZWFkRXhwcmVzc2lvbn0gZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHtTeW1ib2xzfSBmcm9tICcuL3N5bWJvbHMnO1xuXG5cblxuLy8gSW4gVHlwZVNjcmlwdCAyLjEgdGhlIHNwcmVhZCBlbGVtZW50IGtpbmQgd2FzIHJlbmFtZWQuXG5jb25zdCBzcHJlYWRFbGVtZW50U3ludGF4S2luZDogdHMuU3ludGF4S2luZCA9XG4gICAgKHRzLlN5bnRheEtpbmQgYXMgYW55KS5TcHJlYWRFbGVtZW50IHx8ICh0cy5TeW50YXhLaW5kIGFzIGFueSkuU3ByZWFkRWxlbWVudEV4cHJlc3Npb247XG5cbmZ1bmN0aW9uIGlzTWV0aG9kQ2FsbE9mKGNhbGxFeHByZXNzaW9uOiB0cy5DYWxsRXhwcmVzc2lvbiwgbWVtYmVyTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGV4cHJlc3Npb24gPSBjYWxsRXhwcmVzc2lvbi5leHByZXNzaW9uO1xuICBpZiAoZXhwcmVzc2lvbi5raW5kID09PSB0cy5TeW50YXhLaW5kLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbikge1xuICAgIGNvbnN0IHByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbiA9IDx0cy5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24+ZXhwcmVzc2lvbjtcbiAgICBjb25zdCBuYW1lID0gcHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uLm5hbWU7XG4gICAgaWYgKG5hbWUua2luZCA9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICAgIHJldHVybiBuYW1lLnRleHQgPT09IG1lbWJlck5hbWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNDYWxsT2YoY2FsbEV4cHJlc3Npb246IHRzLkNhbGxFeHByZXNzaW9uLCBpZGVudDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGV4cHJlc3Npb24gPSBjYWxsRXhwcmVzc2lvbi5leHByZXNzaW9uO1xuICBpZiAoZXhwcmVzc2lvbi5raW5kID09PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gPHRzLklkZW50aWZpZXI+ZXhwcmVzc2lvbjtcbiAgICByZXR1cm4gaWRlbnRpZmllci50ZXh0ID09PSBpZGVudDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY29yZE1hcEVudHJ5PFQgZXh0ZW5kcyBNZXRhZGF0YUVudHJ5PihcbiAgICBlbnRyeTogVCwgbm9kZTogdHMuTm9kZSxcbiAgICBub2RlTWFwOiBNYXA8TWV0YWRhdGFWYWx1ZXxDbGFzc01ldGFkYXRhfEludGVyZmFjZU1ldGFkYXRhfEZ1bmN0aW9uTWV0YWRhdGEsIHRzLk5vZGU+LFxuICAgIHNvdXJjZUZpbGU/OiB0cy5Tb3VyY2VGaWxlKSB7XG4gIGlmICghbm9kZU1hcC5oYXMoZW50cnkpKSB7XG4gICAgbm9kZU1hcC5zZXQoZW50cnksIG5vZGUpO1xuICAgIGlmIChub2RlICYmIChpc01ldGFkYXRhSW1wb3J0ZWRTeW1ib2xSZWZlcmVuY2VFeHByZXNzaW9uKGVudHJ5KSB8fFxuICAgICAgICAgICAgICAgICBpc01ldGFkYXRhSW1wb3J0RGVmYXVsdFJlZmVyZW5jZShlbnRyeSkpICYmXG4gICAgICAgIGVudHJ5LmxpbmUgPT0gbnVsbCkge1xuICAgICAgY29uc3QgaW5mbyA9IHNvdXJjZUluZm8obm9kZSwgc291cmNlRmlsZSk7XG4gICAgICBpZiAoaW5mby5saW5lICE9IG51bGwpIGVudHJ5LmxpbmUgPSBpbmZvLmxpbmU7XG4gICAgICBpZiAoaW5mby5jaGFyYWN0ZXIgIT0gbnVsbCkgZW50cnkuY2hhcmFjdGVyID0gaW5mby5jaGFyYWN0ZXI7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbnRyeTtcbn1cblxuLyoqXG4gKiB0cy5mb3JFYWNoQ2hpbGQgc3RvcHMgaXRlcmF0aW5nIGNoaWxkcmVuIHdoZW4gdGhlIGNhbGxiYWNrIHJldHVybiBhIHRydXRoeSB2YWx1ZS5cbiAqIFRoaXMgbWV0aG9kIGludmVydHMgdGhpcyB0byBpbXBsZW1lbnQgYW4gYGV2ZXJ5YCBzdHlsZSBpdGVyYXRvci4gSXQgd2lsbCByZXR1cm5cbiAqIHRydWUgaWYgZXZlcnkgY2FsbCB0byBgY2JgIHJldHVybnMgYHRydWVgLlxuICovXG5mdW5jdGlvbiBldmVyeU5vZGVDaGlsZChub2RlOiB0cy5Ob2RlLCBjYjogKG5vZGU6IHRzLk5vZGUpID0+IGJvb2xlYW4pIHtcbiAgcmV0dXJuICF0cy5mb3JFYWNoQ2hpbGQobm9kZSwgbm9kZSA9PiAhY2Iobm9kZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gT2JqZWN0KHZhbHVlKSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGlzRGVmaW5lZChvYmo6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gb2JqICE9PSB1bmRlZmluZWQ7XG59XG5cbi8vIGltcG9ydCB7cHJvcGVydHlOYW1lIGFzIG5hbWV9IGZyb20gJ3BsYWNlJ1xuLy8gaW1wb3J0IHtuYW1lfSBmcm9tICdwbGFjZSdcbmV4cG9ydCBpbnRlcmZhY2UgSW1wb3J0U3BlY2lmaWVyTWV0YWRhdGEge1xuICBuYW1lOiBzdHJpbmc7XG4gIHByb3BlcnR5TmFtZT86IHN0cmluZztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW1wb3J0TWV0YWRhdGEge1xuICBkZWZhdWx0TmFtZT86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0IGQgZnJvbSAncGxhY2UnXG4gIG5hbWVzcGFjZT86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbXBvcnQgKiBhcyBkIGZyb20gJ3BsYWNlJ1xuICBuYW1lZEltcG9ydHM/OiBJbXBvcnRTcGVjaWZpZXJNZXRhZGF0YVtdOyAgLy8gaW1wb3J0IHthfSBmcm9tICdwbGFjZSdcbiAgZnJvbTogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZyb20gJ3BsYWNlJ1xufVxuXG5cbmZ1bmN0aW9uIGdldFNvdXJjZUZpbGVPZk5vZGUobm9kZTogdHMuTm9kZSB8IHVuZGVmaW5lZCk6IHRzLlNvdXJjZUZpbGUge1xuICB3aGlsZSAobm9kZSAmJiBub2RlLmtpbmQgIT0gdHMuU3ludGF4S2luZC5Tb3VyY2VGaWxlKSB7XG4gICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICB9XG4gIHJldHVybiA8dHMuU291cmNlRmlsZT5ub2RlO1xufVxuXG4vKiBAaW50ZXJuYWwgKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3VyY2VJbmZvKFxuICAgIG5vZGU6IHRzLk5vZGUgfCB1bmRlZmluZWQsIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUgfCB1bmRlZmluZWQpOiBNZXRhZGF0YVNvdXJjZUxvY2F0aW9uSW5mbyB7XG4gIGlmIChub2RlKSB7XG4gICAgc291cmNlRmlsZSA9IHNvdXJjZUZpbGUgfHwgZ2V0U291cmNlRmlsZU9mTm9kZShub2RlKTtcbiAgICBpZiAoc291cmNlRmlsZSkge1xuICAgICAgcmV0dXJuIHRzLmdldExpbmVBbmRDaGFyYWN0ZXJPZlBvc2l0aW9uKHNvdXJjZUZpbGUsIG5vZGUuZ2V0U3RhcnQoc291cmNlRmlsZSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge307XG59XG5cbi8qIEBpbnRlcm5hbCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVycm9yU3ltYm9sKFxuICAgIG1lc3NhZ2U6IHN0cmluZywgbm9kZT86IHRzLk5vZGUsIGNvbnRleHQ/OiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30sXG4gICAgc291cmNlRmlsZT86IHRzLlNvdXJjZUZpbGUpOiBNZXRhZGF0YUVycm9yIHtcbiAgY29uc3QgcmVzdWx0OiBNZXRhZGF0YUVycm9yID0ge19fc3ltYm9saWM6ICdlcnJvcicsIG1lc3NhZ2UsIC4uLnNvdXJjZUluZm8obm9kZSwgc291cmNlRmlsZSl9O1xuICBpZiAoY29udGV4dCkge1xuICAgIHJlc3VsdC5jb250ZXh0ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFByb2R1Y2UgYSBzeW1ib2xpYyByZXByZXNlbnRhdGlvbiBvZiBhbiBleHByZXNzaW9uIGZvbGRpbmcgdmFsdWVzIGludG8gdGhlaXIgZmluYWwgdmFsdWUgd2hlblxuICogcG9zc2libGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBFdmFsdWF0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgc3ltYm9sczogU3ltYm9scywgcHJpdmF0ZSBub2RlTWFwOiBNYXA8TWV0YWRhdGFFbnRyeSwgdHMuTm9kZT4sXG4gICAgICBwcml2YXRlIG9wdGlvbnM6IENvbGxlY3Rvck9wdGlvbnMgPSB7fSxcbiAgICAgIHByaXZhdGUgcmVjb3JkRXhwb3J0PzogKG5hbWU6IHN0cmluZywgdmFsdWU6IE1ldGFkYXRhVmFsdWUpID0+IHZvaWQpIHt9XG5cbiAgbmFtZU9mKG5vZGU6IHRzLk5vZGV8dW5kZWZpbmVkKTogc3RyaW5nfE1ldGFkYXRhRXJyb3Ige1xuICAgIGlmIChub2RlICYmIG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICAgIHJldHVybiAoPHRzLklkZW50aWZpZXI+bm9kZSkudGV4dDtcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gbm9kZSAmJiB0aGlzLmV2YWx1YXRlTm9kZShub2RlKTtcbiAgICBpZiAoaXNNZXRhZGF0YUVycm9yKHJlc3VsdCkgfHwgdHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlcnJvclN5bWJvbChcbiAgICAgICAgICAnTmFtZSBleHBlY3RlZCcsIG5vZGUsIHtyZWNlaXZlZDogKG5vZGUgJiYgbm9kZS5nZXRUZXh0KCkpIHx8ICc8bWlzc2luZz4nfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZXhwcmVzc2lvbiByZXByZXNlbnRlZCBieSBgbm9kZWAgY2FuIGJlIGZvbGRlZCBpbnRvIGEgbGl0ZXJhbCBleHByZXNzaW9uLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgYSBsaXRlcmFsIGlzIGFsd2F5cyBmb2xkYWJsZS4gVGhpcyBtZWFucyB0aGF0IGxpdGVyYWwgZXhwcmVzc2lvbnMgc3VjaCBhcyBgMS4yYFxuICAgKiBgXCJTb21lIHZhbHVlXCJgIGB0cnVlYCBgZmFsc2VgIGFyZSBmb2xkYWJsZS5cbiAgICpcbiAgICogLSBBbiBvYmplY3QgbGl0ZXJhbCBpcyBmb2xkYWJsZSBpZiBhbGwgdGhlIHByb3BlcnRpZXMgaW4gdGhlIGxpdGVyYWwgYXJlIGZvbGRhYmxlLlxuICAgKiAtIEFuIGFycmF5IGxpdGVyYWwgaXMgZm9sZGFibGUgaWYgYWxsIHRoZSBlbGVtZW50cyBhcmUgZm9sZGFibGUuXG4gICAqIC0gQSBjYWxsIGlzIGZvbGRhYmxlIGlmIGl0IGlzIGEgY2FsbCB0byBhIEFycmF5LnByb3RvdHlwZS5jb25jYXQgb3IgYSBjYWxsIHRvIENPTlNUX0VYUFIuXG4gICAqIC0gQSBwcm9wZXJ0eSBhY2Nlc3MgaXMgZm9sZGFibGUgaWYgdGhlIG9iamVjdCBpcyBmb2xkYWJsZS5cbiAgICogLSBBIGFycmF5IGluZGV4IGlzIGZvbGRhYmxlIGlmIGluZGV4IGV4cHJlc3Npb24gaXMgZm9sZGFibGUgYW5kIHRoZSBhcnJheSBpcyBmb2xkYWJsZS5cbiAgICogLSBCaW5hcnkgb3BlcmF0b3IgZXhwcmVzc2lvbnMgYXJlIGZvbGRhYmxlIGlmIHRoZSBsZWZ0IGFuZCByaWdodCBleHByZXNzaW9ucyBhcmUgZm9sZGFibGUgYW5kXG4gICAqICAgaXQgaXMgb25lIG9mICcrJywgJy0nLCAnKicsICcvJywgJyUnLCAnfHwnLCBhbmQgJyYmJy5cbiAgICogLSBBbiBpZGVudGlmaWVyIGlzIGZvbGRhYmxlIGlmIGEgdmFsdWUgY2FuIGJlIGZvdW5kIGZvciBpdHMgc3ltYm9sIGluIHRoZSBldmFsdWF0b3Igc3ltYm9sXG4gICAqICAgdGFibGUuXG4gICAqL1xuICBwdWJsaWMgaXNGb2xkYWJsZShub2RlOiB0cy5Ob2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNGb2xkYWJsZVdvcmtlcihub2RlLCBuZXcgTWFwPHRzLk5vZGUsIGJvb2xlYW4+KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0ZvbGRhYmxlV29ya2VyKG5vZGU6IHRzLk5vZGV8dW5kZWZpbmVkLCBmb2xkaW5nOiBNYXA8dHMuTm9kZSwgYm9vbGVhbj4pOiBib29sZWFuIHtcbiAgICBpZiAobm9kZSkge1xuICAgICAgc3dpdGNoIChub2RlLmtpbmQpIHtcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLk9iamVjdExpdGVyYWxFeHByZXNzaW9uOlxuICAgICAgICAgIHJldHVybiBldmVyeU5vZGVDaGlsZChub2RlLCBjaGlsZCA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGQua2luZCA9PT0gdHMuU3ludGF4S2luZC5Qcm9wZXJ0eUFzc2lnbm1lbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHlBc3NpZ25tZW50ID0gPHRzLlByb3BlcnR5QXNzaWdubWVudD5jaGlsZDtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNGb2xkYWJsZVdvcmtlcihwcm9wZXJ0eUFzc2lnbm1lbnQuaW5pdGlhbGl6ZXIsIGZvbGRpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQXJyYXlMaXRlcmFsRXhwcmVzc2lvbjpcbiAgICAgICAgICByZXR1cm4gZXZlcnlOb2RlQ2hpbGQobm9kZSwgY2hpbGQgPT4gdGhpcy5pc0ZvbGRhYmxlV29ya2VyKGNoaWxkLCBmb2xkaW5nKSk7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5DYWxsRXhwcmVzc2lvbjpcbiAgICAgICAgICBjb25zdCBjYWxsRXhwcmVzc2lvbiA9IDx0cy5DYWxsRXhwcmVzc2lvbj5ub2RlO1xuICAgICAgICAgIC8vIFdlIGNhbiBmb2xkIGEgPGFycmF5Pi5jb25jYXQoPHY+KS5cbiAgICAgICAgICBpZiAoaXNNZXRob2RDYWxsT2YoY2FsbEV4cHJlc3Npb24sICdjb25jYXQnKSAmJlxuICAgICAgICAgICAgICBhcnJheU9yRW1wdHkoY2FsbEV4cHJlc3Npb24uYXJndW1lbnRzKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5Tm9kZSA9ICg8dHMuUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uPmNhbGxFeHByZXNzaW9uLmV4cHJlc3Npb24pLmV4cHJlc3Npb247XG4gICAgICAgICAgICBpZiAodGhpcy5pc0ZvbGRhYmxlV29ya2VyKGFycmF5Tm9kZSwgZm9sZGluZykgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmlzRm9sZGFibGVXb3JrZXIoY2FsbEV4cHJlc3Npb24uYXJndW1lbnRzWzBdLCBmb2xkaW5nKSkge1xuICAgICAgICAgICAgICAvLyBJdCBuZWVkcyB0byBiZSBhbiBhcnJheS5cbiAgICAgICAgICAgICAgY29uc3QgYXJyYXlWYWx1ZSA9IHRoaXMuZXZhbHVhdGVOb2RlKGFycmF5Tm9kZSk7XG4gICAgICAgICAgICAgIGlmIChhcnJheVZhbHVlICYmIEFycmF5LmlzQXJyYXkoYXJyYXlWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFdlIGNhbiBmb2xkIGEgY2FsbCB0byBDT05TVF9FWFBSXG4gICAgICAgICAgaWYgKGlzQ2FsbE9mKGNhbGxFeHByZXNzaW9uLCAnQ09OU1RfRVhQUicpICYmXG4gICAgICAgICAgICAgIGFycmF5T3JFbXB0eShjYWxsRXhwcmVzc2lvbi5hcmd1bWVudHMpLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRm9sZGFibGVXb3JrZXIoY2FsbEV4cHJlc3Npb24uYXJndW1lbnRzWzBdLCBmb2xkaW5nKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5Ob1N1YnN0aXR1dGlvblRlbXBsYXRlTGl0ZXJhbDpcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWw6XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5OdW1lcmljTGl0ZXJhbDpcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLk51bGxLZXl3b3JkOlxuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHJ1ZUtleXdvcmQ6XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5GYWxzZUtleXdvcmQ6XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5UZW1wbGF0ZUhlYWQ6XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5UZW1wbGF0ZU1pZGRsZTpcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlRlbXBsYXRlVGFpbDpcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlBhcmVudGhlc2l6ZWRFeHByZXNzaW9uOlxuICAgICAgICAgIGNvbnN0IHBhcmVudGhlc2l6ZWRFeHByZXNzaW9uID0gPHRzLlBhcmVudGhlc2l6ZWRFeHByZXNzaW9uPm5vZGU7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNGb2xkYWJsZVdvcmtlcihwYXJlbnRoZXNpemVkRXhwcmVzc2lvbi5leHByZXNzaW9uLCBmb2xkaW5nKTtcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkJpbmFyeUV4cHJlc3Npb246XG4gICAgICAgICAgY29uc3QgYmluYXJ5RXhwcmVzc2lvbiA9IDx0cy5CaW5hcnlFeHByZXNzaW9uPm5vZGU7XG4gICAgICAgICAgc3dpdGNoIChiaW5hcnlFeHByZXNzaW9uLm9wZXJhdG9yVG9rZW4ua2luZCkge1xuICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlBsdXNUb2tlbjpcbiAgICAgICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5NaW51c1Rva2VuOlxuICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkFzdGVyaXNrVG9rZW46XG4gICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuU2xhc2hUb2tlbjpcbiAgICAgICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5QZXJjZW50VG9rZW46XG4gICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQW1wZXJzYW5kQW1wZXJzYW5kVG9rZW46XG4gICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQmFyQmFyVG9rZW46XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRm9sZGFibGVXb3JrZXIoYmluYXJ5RXhwcmVzc2lvbi5sZWZ0LCBmb2xkaW5nKSAmJlxuICAgICAgICAgICAgICAgICAgdGhpcy5pc0ZvbGRhYmxlV29ya2VyKGJpbmFyeUV4cHJlc3Npb24ucmlnaHQsIGZvbGRpbmcpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbjpcbiAgICAgICAgICBjb25zdCBwcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24gPSA8dHMuUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uPm5vZGU7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNGb2xkYWJsZVdvcmtlcihwcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb24uZXhwcmVzc2lvbiwgZm9sZGluZyk7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FbGVtZW50QWNjZXNzRXhwcmVzc2lvbjpcbiAgICAgICAgICBjb25zdCBlbGVtZW50QWNjZXNzRXhwcmVzc2lvbiA9IDx0cy5FbGVtZW50QWNjZXNzRXhwcmVzc2lvbj5ub2RlO1xuICAgICAgICAgIHJldHVybiB0aGlzLmlzRm9sZGFibGVXb3JrZXIoZWxlbWVudEFjY2Vzc0V4cHJlc3Npb24uZXhwcmVzc2lvbiwgZm9sZGluZykgJiZcbiAgICAgICAgICAgICAgdGhpcy5pc0ZvbGRhYmxlV29ya2VyKGVsZW1lbnRBY2Nlc3NFeHByZXNzaW9uLmFyZ3VtZW50RXhwcmVzc2lvbiwgZm9sZGluZyk7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5JZGVudGlmaWVyOlxuICAgICAgICAgIGxldCBpZGVudGlmaWVyID0gPHRzLklkZW50aWZpZXI+bm9kZTtcbiAgICAgICAgICBsZXQgcmVmZXJlbmNlID0gdGhpcy5zeW1ib2xzLnJlc29sdmUoaWRlbnRpZmllci50ZXh0KTtcbiAgICAgICAgICBpZiAocmVmZXJlbmNlICE9PSB1bmRlZmluZWQgJiYgaXNQcmltaXRpdmUocmVmZXJlbmNlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVGVtcGxhdGVFeHByZXNzaW9uOlxuICAgICAgICAgIGNvbnN0IHRlbXBsYXRlRXhwcmVzc2lvbiA9IDx0cy5UZW1wbGF0ZUV4cHJlc3Npb24+bm9kZTtcbiAgICAgICAgICByZXR1cm4gdGVtcGxhdGVFeHByZXNzaW9uLnRlbXBsYXRlU3BhbnMuZXZlcnkoXG4gICAgICAgICAgICAgIHNwYW4gPT4gdGhpcy5pc0ZvbGRhYmxlV29ya2VyKHNwYW4uZXhwcmVzc2lvbiwgZm9sZGluZykpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUHJvZHVjZSBhIEpTT04gc2VyaWFsaWFibGUgb2JqZWN0IHJlcHJlc2VudGluZyBgbm9kZWAuIFRoZSBmb2xkYWJsZSB2YWx1ZXMgaW4gdGhlIGV4cHJlc3Npb25cbiAgICogdHJlZSBhcmUgZm9sZGVkLiBGb3IgZXhhbXBsZSwgYSBub2RlIHJlcHJlc2VudGluZyBgMSArIDJgIGlzIGZvbGRlZCBpbnRvIGAzYC5cbiAgICovXG4gIHB1YmxpYyBldmFsdWF0ZU5vZGUobm9kZTogdHMuTm9kZSwgcHJlZmVyUmVmZXJlbmNlPzogYm9vbGVhbik6IE1ldGFkYXRhVmFsdWUge1xuICAgIGNvbnN0IHQgPSB0aGlzO1xuICAgIGxldCBlcnJvcjogTWV0YWRhdGFFcnJvcnx1bmRlZmluZWQ7XG5cbiAgICBmdW5jdGlvbiByZWNvcmRFbnRyeShlbnRyeTogTWV0YWRhdGFWYWx1ZSwgbm9kZTogdHMuTm9kZSk6IE1ldGFkYXRhVmFsdWUge1xuICAgICAgaWYgKHQub3B0aW9ucy5zdWJzdGl0dXRlRXhwcmVzc2lvbikge1xuICAgICAgICBjb25zdCBuZXdFbnRyeSA9IHQub3B0aW9ucy5zdWJzdGl0dXRlRXhwcmVzc2lvbihlbnRyeSwgbm9kZSk7XG4gICAgICAgIGlmICh0LnJlY29yZEV4cG9ydCAmJiBuZXdFbnRyeSAhPSBlbnRyeSAmJiBpc01ldGFkYXRhR2xvYmFsUmVmZXJlbmNlRXhwcmVzc2lvbihuZXdFbnRyeSkpIHtcbiAgICAgICAgICB0LnJlY29yZEV4cG9ydChuZXdFbnRyeS5uYW1lLCBlbnRyeSk7XG4gICAgICAgIH1cbiAgICAgICAgZW50cnkgPSBuZXdFbnRyeTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZWNvcmRNYXBFbnRyeShlbnRyeSwgbm9kZSwgdC5ub2RlTWFwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0ZvbGRhYmxlRXJyb3IodmFsdWU6IGFueSk6IHZhbHVlIGlzIE1ldGFkYXRhRXJyb3Ige1xuICAgICAgcmV0dXJuICF0Lm9wdGlvbnMudmVyYm9zZUludmFsaWRFeHByZXNzaW9uICYmIGlzTWV0YWRhdGFFcnJvcih2YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzb2x2ZU5hbWUgPSAobmFtZTogc3RyaW5nLCBwcmVmZXJSZWZlcmVuY2U/OiBib29sZWFuKTogTWV0YWRhdGFWYWx1ZSA9PiB7XG4gICAgICBjb25zdCByZWZlcmVuY2UgPSB0aGlzLnN5bWJvbHMucmVzb2x2ZShuYW1lLCBwcmVmZXJSZWZlcmVuY2UpO1xuICAgICAgaWYgKHJlZmVyZW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIEVuY29kZSBhcyBhIGdsb2JhbCByZWZlcmVuY2UuIFN0YXRpY1JlZmxlY3RvciB3aWxsIGNoZWNrIHRoZSByZWZlcmVuY2UuXG4gICAgICAgIHJldHVybiByZWNvcmRFbnRyeSh7X19zeW1ib2xpYzogJ3JlZmVyZW5jZScsIG5hbWV9LCBub2RlKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZWZlcmVuY2UgJiYgaXNNZXRhZGF0YVN5bWJvbGljUmVmZXJlbmNlRXhwcmVzc2lvbihyZWZlcmVuY2UpKSB7XG4gICAgICAgIHJldHVybiByZWNvcmRFbnRyeSh7Li4ucmVmZXJlbmNlfSwgbm9kZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVmZXJlbmNlO1xuICAgIH07XG5cbiAgICBzd2l0Y2ggKG5vZGUua2luZCkge1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLk9iamVjdExpdGVyYWxFeHByZXNzaW9uOlxuICAgICAgICBsZXQgb2JqOiB7W25hbWU6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgbGV0IHF1b3RlZDogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIGNoaWxkID0+IHtcbiAgICAgICAgICBzd2l0Y2ggKGNoaWxkLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5TaG9ydGhhbmRQcm9wZXJ0eUFzc2lnbm1lbnQ6XG4gICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuUHJvcGVydHlBc3NpZ25tZW50OlxuICAgICAgICAgICAgICBjb25zdCBhc3NpZ25tZW50ID0gPHRzLlByb3BlcnR5QXNzaWdubWVudHx0cy5TaG9ydGhhbmRQcm9wZXJ0eUFzc2lnbm1lbnQ+Y2hpbGQ7XG4gICAgICAgICAgICAgIGlmIChhc3NpZ25tZW50Lm5hbWUua2luZCA9PSB0cy5TeW50YXhLaW5kLlN0cmluZ0xpdGVyYWwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gKGFzc2lnbm1lbnQubmFtZSBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0O1xuICAgICAgICAgICAgICAgIHF1b3RlZC5wdXNoKG5hbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5TmFtZSA9IHRoaXMubmFtZU9mKGFzc2lnbm1lbnQubmFtZSk7XG4gICAgICAgICAgICAgIGlmIChpc0ZvbGRhYmxlRXJyb3IocHJvcGVydHlOYW1lKSkge1xuICAgICAgICAgICAgICAgIGVycm9yID0gcHJvcGVydHlOYW1lO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5VmFsdWUgPSBpc1Byb3BlcnR5QXNzaWdubWVudChhc3NpZ25tZW50KSA/XG4gICAgICAgICAgICAgICAgICB0aGlzLmV2YWx1YXRlTm9kZShhc3NpZ25tZW50LmluaXRpYWxpemVyLCAvKiBwcmVmZXJSZWZlcmVuY2UgKi8gdHJ1ZSkgOlxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZU5hbWUocHJvcGVydHlOYW1lLCAvKiBwcmVmZXJSZWZlcmVuY2UgKi8gdHJ1ZSk7XG4gICAgICAgICAgICAgIGlmIChpc0ZvbGRhYmxlRXJyb3IocHJvcGVydHlWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IHByb3BlcnR5VmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAvLyBTdG9wIHRoZSBmb3JFYWNoQ2hpbGQuXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqWzxzdHJpbmc+cHJvcGVydHlOYW1lXSA9IGlzUHJvcGVydHlBc3NpZ25tZW50KGFzc2lnbm1lbnQpID9cbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkRW50cnkocHJvcGVydHlWYWx1ZSwgYXNzaWdubWVudC5pbml0aWFsaXplcikgOlxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGVycm9yKSByZXR1cm4gZXJyb3I7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucXVvdGVkTmFtZXMgJiYgcXVvdGVkLmxlbmd0aCkge1xuICAgICAgICAgIG9ialsnJHF1b3RlZCQnXSA9IHF1b3RlZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjb3JkRW50cnkob2JqLCBub2RlKTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5BcnJheUxpdGVyYWxFeHByZXNzaW9uOlxuICAgICAgICBsZXQgYXJyOiBNZXRhZGF0YVZhbHVlW10gPSBbXTtcbiAgICAgICAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIGNoaWxkID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZXZhbHVhdGVOb2RlKGNoaWxkLCAvKiBwcmVmZXJSZWZlcmVuY2UgKi8gdHJ1ZSk7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3IgZXJyb3JcbiAgICAgICAgICBpZiAoaXNGb2xkYWJsZUVycm9yKHZhbHVlKSkge1xuICAgICAgICAgICAgZXJyb3IgPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlOyAgLy8gU3RvcCB0aGUgZm9yRWFjaENoaWxkLlxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEhhbmRsZSBzcHJlYWQgZXhwcmVzc2lvbnNcbiAgICAgICAgICBpZiAoaXNNZXRhZGF0YVN5bWJvbGljU3ByZWFkRXhwcmVzc2lvbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlLmV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgICAgIGZvciAoY29uc3Qgc3ByZWFkVmFsdWUgb2YgdmFsdWUuZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHNwcmVhZFZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXJyLnB1c2godmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGVycm9yKSByZXR1cm4gZXJyb3I7XG4gICAgICAgIHJldHVybiByZWNvcmRFbnRyeShhcnIsIG5vZGUpO1xuICAgICAgY2FzZSBzcHJlYWRFbGVtZW50U3ludGF4S2luZDpcbiAgICAgICAgbGV0IHNwcmVhZEV4cHJlc3Npb24gPSB0aGlzLmV2YWx1YXRlTm9kZSgobm9kZSBhcyBhbnkpLmV4cHJlc3Npb24pO1xuICAgICAgICByZXR1cm4gcmVjb3JkRW50cnkoe19fc3ltYm9saWM6ICdzcHJlYWQnLCBleHByZXNzaW9uOiBzcHJlYWRFeHByZXNzaW9ufSwgbm9kZSk7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb246XG4gICAgICAgIGNvbnN0IGNhbGxFeHByZXNzaW9uID0gPHRzLkNhbGxFeHByZXNzaW9uPm5vZGU7XG4gICAgICAgIGlmIChpc0NhbGxPZihjYWxsRXhwcmVzc2lvbiwgJ2ZvcndhcmRSZWYnKSAmJlxuICAgICAgICAgICAgYXJyYXlPckVtcHR5KGNhbGxFeHByZXNzaW9uLmFyZ3VtZW50cykubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgY29uc3QgZmlyc3RBcmd1bWVudCA9IGNhbGxFeHByZXNzaW9uLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICBpZiAoZmlyc3RBcmd1bWVudC5raW5kID09IHRzLlN5bnRheEtpbmQuQXJyb3dGdW5jdGlvbikge1xuICAgICAgICAgICAgY29uc3QgYXJyb3dGdW5jdGlvbiA9IDx0cy5BcnJvd0Z1bmN0aW9uPmZpcnN0QXJndW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkRW50cnkodGhpcy5ldmFsdWF0ZU5vZGUoYXJyb3dGdW5jdGlvbi5ib2R5KSwgbm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBhcnJheU9yRW1wdHkoY2FsbEV4cHJlc3Npb24uYXJndW1lbnRzKS5tYXAoYXJnID0+IHRoaXMuZXZhbHVhdGVOb2RlKGFyZykpO1xuICAgICAgICBpZiAodGhpcy5pc0ZvbGRhYmxlKGNhbGxFeHByZXNzaW9uKSkge1xuICAgICAgICAgIGlmIChpc01ldGhvZENhbGxPZihjYWxsRXhwcmVzc2lvbiwgJ2NvbmNhdCcpKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheVZhbHVlID0gPE1ldGFkYXRhVmFsdWVbXT50aGlzLmV2YWx1YXRlTm9kZShcbiAgICAgICAgICAgICAgICAoPHRzLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbj5jYWxsRXhwcmVzc2lvbi5leHByZXNzaW9uKS5leHByZXNzaW9uKTtcbiAgICAgICAgICAgIGlmIChpc0ZvbGRhYmxlRXJyb3IoYXJyYXlWYWx1ZSkpIHJldHVybiBhcnJheVZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5VmFsdWUuY29uY2F0KGFyZ3NbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBBbHdheXMgZm9sZCBhIENPTlNUX0VYUFIgZXZlbiBpZiB0aGUgYXJndW1lbnQgaXMgbm90IGZvbGRhYmxlLlxuICAgICAgICBpZiAoaXNDYWxsT2YoY2FsbEV4cHJlc3Npb24sICdDT05TVF9FWFBSJykgJiZcbiAgICAgICAgICAgIGFycmF5T3JFbXB0eShjYWxsRXhwcmVzc2lvbi5hcmd1bWVudHMpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiByZWNvcmRFbnRyeShhcmdzWzBdLCBub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5ldmFsdWF0ZU5vZGUoY2FsbEV4cHJlc3Npb24uZXhwcmVzc2lvbik7XG4gICAgICAgIGlmIChpc0ZvbGRhYmxlRXJyb3IoZXhwcmVzc2lvbikpIHtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkRW50cnkoZXhwcmVzc2lvbiwgbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdDogTWV0YWRhdGFTeW1ib2xpY0NhbGxFeHByZXNzaW9uID0ge19fc3ltYm9saWM6ICdjYWxsJywgZXhwcmVzc2lvbjogZXhwcmVzc2lvbn07XG4gICAgICAgIGlmIChhcmdzICYmIGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgcmVzdWx0LmFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KHJlc3VsdCwgbm9kZSk7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuTmV3RXhwcmVzc2lvbjpcbiAgICAgICAgY29uc3QgbmV3RXhwcmVzc2lvbiA9IDx0cy5OZXdFeHByZXNzaW9uPm5vZGU7XG4gICAgICAgIGNvbnN0IG5ld0FyZ3MgPSBhcnJheU9yRW1wdHkobmV3RXhwcmVzc2lvbi5hcmd1bWVudHMpLm1hcChhcmcgPT4gdGhpcy5ldmFsdWF0ZU5vZGUoYXJnKSk7XG4gICAgICAgIGNvbnN0IG5ld1RhcmdldCA9IHRoaXMuZXZhbHVhdGVOb2RlKG5ld0V4cHJlc3Npb24uZXhwcmVzc2lvbik7XG4gICAgICAgIGlmIChpc01ldGFkYXRhRXJyb3IobmV3VGFyZ2V0KSkge1xuICAgICAgICAgIHJldHVybiByZWNvcmRFbnRyeShuZXdUYXJnZXQsIG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhbGw6IE1ldGFkYXRhU3ltYm9saWNDYWxsRXhwcmVzc2lvbiA9IHtfX3N5bWJvbGljOiAnbmV3JywgZXhwcmVzc2lvbjogbmV3VGFyZ2V0fTtcbiAgICAgICAgaWYgKG5ld0FyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgY2FsbC5hcmd1bWVudHMgPSBuZXdBcmdzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWNvcmRFbnRyeShjYWxsLCBub2RlKTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5Qcm9wZXJ0eUFjY2Vzc0V4cHJlc3Npb246IHtcbiAgICAgICAgY29uc3QgcHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uID0gPHRzLlByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbj5ub2RlO1xuICAgICAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5ldmFsdWF0ZU5vZGUocHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uLmV4cHJlc3Npb24pO1xuICAgICAgICBpZiAoaXNGb2xkYWJsZUVycm9yKGV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KGV4cHJlc3Npb24sIG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1lbWJlciA9IHRoaXMubmFtZU9mKHByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbi5uYW1lKTtcbiAgICAgICAgaWYgKGlzRm9sZGFibGVFcnJvcihtZW1iZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KG1lbWJlciwgbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4cHJlc3Npb24gJiYgdGhpcy5pc0ZvbGRhYmxlKHByb3BlcnR5QWNjZXNzRXhwcmVzc2lvbi5leHByZXNzaW9uKSlcbiAgICAgICAgICByZXR1cm4gKDxhbnk+ZXhwcmVzc2lvbilbPHN0cmluZz5tZW1iZXJdO1xuICAgICAgICBpZiAoaXNNZXRhZGF0YU1vZHVsZVJlZmVyZW5jZUV4cHJlc3Npb24oZXhwcmVzc2lvbikpIHtcbiAgICAgICAgICAvLyBBIHNlbGVjdCBpbnRvIGEgbW9kdWxlIHJlZmVyZW5jZSBhbmQgYmUgY29udmVydGVkIGludG8gYSByZWZlcmVuY2UgdG8gdGhlIHN5bWJvbFxuICAgICAgICAgIC8vIGluIHRoZSBtb2R1bGVcbiAgICAgICAgICByZXR1cm4gcmVjb3JkRW50cnkoXG4gICAgICAgICAgICAgIHtfX3N5bWJvbGljOiAncmVmZXJlbmNlJywgbW9kdWxlOiBleHByZXNzaW9uLm1vZHVsZSwgbmFtZTogbWVtYmVyfSwgbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KHtfX3N5bWJvbGljOiAnc2VsZWN0JywgZXhwcmVzc2lvbiwgbWVtYmVyfSwgbm9kZSk7XG4gICAgICB9XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRWxlbWVudEFjY2Vzc0V4cHJlc3Npb246IHtcbiAgICAgICAgY29uc3QgZWxlbWVudEFjY2Vzc0V4cHJlc3Npb24gPSA8dHMuRWxlbWVudEFjY2Vzc0V4cHJlc3Npb24+bm9kZTtcbiAgICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IHRoaXMuZXZhbHVhdGVOb2RlKGVsZW1lbnRBY2Nlc3NFeHByZXNzaW9uLmV4cHJlc3Npb24pO1xuICAgICAgICBpZiAoaXNGb2xkYWJsZUVycm9yKGV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KGV4cHJlc3Npb24sIG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZWxlbWVudEFjY2Vzc0V4cHJlc3Npb24uYXJndW1lbnRFeHByZXNzaW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KGVycm9yU3ltYm9sKCdFeHByZXNzaW9uIGZvcm0gbm90IHN1cHBvcnRlZCcsIG5vZGUpLCBub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZXZhbHVhdGVOb2RlKGVsZW1lbnRBY2Nlc3NFeHByZXNzaW9uLmFyZ3VtZW50RXhwcmVzc2lvbik7XG4gICAgICAgIGlmIChpc0ZvbGRhYmxlRXJyb3IoZXhwcmVzc2lvbikpIHtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkRW50cnkoZXhwcmVzc2lvbiwgbm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNGb2xkYWJsZShlbGVtZW50QWNjZXNzRXhwcmVzc2lvbi5leHByZXNzaW9uKSAmJlxuICAgICAgICAgICAgdGhpcy5pc0ZvbGRhYmxlKGVsZW1lbnRBY2Nlc3NFeHByZXNzaW9uLmFyZ3VtZW50RXhwcmVzc2lvbikpXG4gICAgICAgICAgcmV0dXJuICg8YW55PmV4cHJlc3Npb24pWzxzdHJpbmd8bnVtYmVyPmluZGV4XTtcbiAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KHtfX3N5bWJvbGljOiAnaW5kZXgnLCBleHByZXNzaW9uLCBpbmRleH0sIG5vZGUpO1xuICAgICAgfVxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXI6XG4gICAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSA8dHMuSWRlbnRpZmllcj5ub2RlO1xuICAgICAgICBjb25zdCBuYW1lID0gaWRlbnRpZmllci50ZXh0O1xuICAgICAgICByZXR1cm4gcmVzb2x2ZU5hbWUobmFtZSwgcHJlZmVyUmVmZXJlbmNlKTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5UeXBlUmVmZXJlbmNlOlxuICAgICAgICBjb25zdCB0eXBlUmVmZXJlbmNlTm9kZSA9IDx0cy5UeXBlUmVmZXJlbmNlTm9kZT5ub2RlO1xuICAgICAgICBjb25zdCB0eXBlTmFtZU5vZGUgPSB0eXBlUmVmZXJlbmNlTm9kZS50eXBlTmFtZTtcbiAgICAgICAgY29uc3QgZ2V0UmVmZXJlbmNlOiAodHlwZU5hbWVOb2RlOiB0cy5JZGVudGlmaWVyIHwgdHMuUXVhbGlmaWVkTmFtZSkgPT4gTWV0YWRhdGFWYWx1ZSA9XG4gICAgICAgICAgICBub2RlID0+IHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVOYW1lTm9kZS5raW5kID09PSB0cy5TeW50YXhLaW5kLlF1YWxpZmllZE5hbWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBxdWFsaWZpZWROYW1lID0gPHRzLlF1YWxpZmllZE5hbWU+bm9kZTtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5ldmFsdWF0ZU5vZGUocXVhbGlmaWVkTmFtZS5sZWZ0KTtcbiAgICAgICAgICAgICAgICBpZiAoaXNNZXRhZGF0YU1vZHVsZVJlZmVyZW5jZUV4cHJlc3Npb24obGVmdCkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmRFbnRyeShcbiAgICAgICAgICAgICAgICAgICAgICA8TWV0YWRhdGFJbXBvcnRlZFN5bWJvbFJlZmVyZW5jZUV4cHJlc3Npb24+e1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zeW1ib2xpYzogJ3JlZmVyZW5jZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGU6IGxlZnQubW9kdWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcXVhbGlmaWVkTmFtZS5yaWdodC50ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gUmVjb3JkIGEgdHlwZSByZWZlcmVuY2UgdG8gYSBkZWNsYXJlZCB0eXBlIGFzIGEgc2VsZWN0LlxuICAgICAgICAgICAgICAgIHJldHVybiB7X19zeW1ib2xpYzogJ3NlbGVjdCcsIGV4cHJlc3Npb246IGxlZnQsIG1lbWJlcjogcXVhbGlmaWVkTmFtZS5yaWdodC50ZXh0fTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZGVudGlmaWVyID0gPHRzLklkZW50aWZpZXI+dHlwZU5hbWVOb2RlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN5bWJvbCA9IHRoaXMuc3ltYm9scy5yZXNvbHZlKGlkZW50aWZpZXIudGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzRm9sZGFibGVFcnJvcihzeW1ib2wpIHx8IGlzTWV0YWRhdGFTeW1ib2xpY1JlZmVyZW5jZUV4cHJlc3Npb24oc3ltYm9sKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KHN5bWJvbCwgbm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZWNvcmRFbnRyeShcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JTeW1ib2woJ0NvdWxkIG5vdCByZXNvbHZlIHR5cGUnLCBub2RlLCB7dHlwZU5hbWU6IGlkZW50aWZpZXIudGV4dH0pLCBub2RlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdHlwZVJlZmVyZW5jZSA9IGdldFJlZmVyZW5jZSh0eXBlTmFtZU5vZGUpO1xuICAgICAgICBpZiAoaXNGb2xkYWJsZUVycm9yKHR5cGVSZWZlcmVuY2UpKSB7XG4gICAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KHR5cGVSZWZlcmVuY2UsIG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNNZXRhZGF0YU1vZHVsZVJlZmVyZW5jZUV4cHJlc3Npb24odHlwZVJlZmVyZW5jZSkgJiZcbiAgICAgICAgICAgIHR5cGVSZWZlcmVuY2VOb2RlLnR5cGVBcmd1bWVudHMgJiYgdHlwZVJlZmVyZW5jZU5vZGUudHlwZUFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gdHlwZVJlZmVyZW5jZU5vZGUudHlwZUFyZ3VtZW50cy5tYXAoZWxlbWVudCA9PiB0aGlzLmV2YWx1YXRlTm9kZShlbGVtZW50KSk7XG4gICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIHR5cGVjYXN0IHdoZW4gdXBncmFkZWQgdG8gMi4wIGFzIGl0IHdpbGwgYmUgY29ycmVjdGx5IGluZmVycmVkLlxuICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgMS45IGRvIG5vdCBpbmZlciB0aGlzIGNvcnJlY3RseS5cbiAgICAgICAgICAoPE1ldGFkYXRhSW1wb3J0ZWRTeW1ib2xSZWZlcmVuY2VFeHByZXNzaW9uPnR5cGVSZWZlcmVuY2UpLmFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KHR5cGVSZWZlcmVuY2UsIG5vZGUpO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlVuaW9uVHlwZTpcbiAgICAgICAgY29uc3QgdW5pb25UeXBlID0gPHRzLlVuaW9uVHlwZU5vZGU+bm9kZTtcblxuICAgICAgICAvLyBSZW1vdmUgbnVsbCBhbmQgdW5kZWZpbmVkIGZyb20gdGhlIGxpc3Qgb2YgdW5pb25zLlxuICAgICAgICBjb25zdCByZWZlcmVuY2VzID0gdW5pb25UeXBlLnR5cGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9PiBuLmtpbmQgIT0gdHMuU3ludGF4S2luZC5OdWxsS2V5d29yZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbi5raW5kICE9IHRzLlN5bnRheEtpbmQuVW5kZWZpbmVkS2V5d29yZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKG4gPT4gdGhpcy5ldmFsdWF0ZU5vZGUobikpO1xuXG4gICAgICAgIC8vIFRoZSByZW1tYWluaW5nIHJlZmVyZW5jZSBtdXN0IGJlIHRoZSBzYW1lLiBJZiB0d28gaGF2ZSB0eXBlIGFyZ3VtZW50cyBjb25zaWRlciB0aGVtXG4gICAgICAgIC8vIGRpZmZlcmVudCBldmVuIGlmIHRoZSB0eXBlIGFyZ3VtZW50cyBhcmUgdGhlIHNhbWUuXG4gICAgICAgIGxldCBjYW5kaWRhdGU6IGFueSA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVmZXJlbmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZSA9IHJlZmVyZW5jZXNbaV07XG4gICAgICAgICAgaWYgKGlzTWV0YWRhdGFTeW1ib2xpY1JlZmVyZW5jZUV4cHJlc3Npb24ocmVmZXJlbmNlKSkge1xuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICBpZiAoKHJlZmVyZW5jZSBhcyBhbnkpLm5hbWUgPT0gY2FuZGlkYXRlLm5hbWUgJiZcbiAgICAgICAgICAgICAgICAgIChyZWZlcmVuY2UgYXMgYW55KS5tb2R1bGUgPT0gY2FuZGlkYXRlLm1vZHVsZSAmJiAhKHJlZmVyZW5jZSBhcyBhbnkpLmFyZ3VtZW50cykge1xuICAgICAgICAgICAgICAgIGNhbmRpZGF0ZSA9IHJlZmVyZW5jZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2FuZGlkYXRlID0gcmVmZXJlbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVmZXJlbmNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FuZGlkYXRlKSByZXR1cm4gY2FuZGlkYXRlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5Ob1N1YnN0aXR1dGlvblRlbXBsYXRlTGl0ZXJhbDpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsOlxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlRlbXBsYXRlSGVhZDpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5UZW1wbGF0ZVRhaWw6XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVGVtcGxhdGVNaWRkbGU6XG4gICAgICAgIHJldHVybiAoPHRzLkxpdGVyYWxMaWtlTm9kZT5ub2RlKS50ZXh0O1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLk51bWVyaWNMaXRlcmFsOlxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCgoPHRzLkxpdGVyYWxFeHByZXNzaW9uPm5vZGUpLnRleHQpO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkFueUtleXdvcmQ6XG4gICAgICAgIHJldHVybiByZWNvcmRFbnRyeSh7X19zeW1ib2xpYzogJ3JlZmVyZW5jZScsIG5hbWU6ICdhbnknfSwgbm9kZSk7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuU3RyaW5nS2V5d29yZDpcbiAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KHtfX3N5bWJvbGljOiAncmVmZXJlbmNlJywgbmFtZTogJ3N0cmluZyd9LCBub2RlKTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5OdW1iZXJLZXl3b3JkOlxuICAgICAgICByZXR1cm4gcmVjb3JkRW50cnkoe19fc3ltYm9saWM6ICdyZWZlcmVuY2UnLCBuYW1lOiAnbnVtYmVyJ30sIG5vZGUpO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkJvb2xlYW5LZXl3b3JkOlxuICAgICAgICByZXR1cm4gcmVjb3JkRW50cnkoe19fc3ltYm9saWM6ICdyZWZlcmVuY2UnLCBuYW1lOiAnYm9vbGVhbid9LCBub2RlKTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5BcnJheVR5cGU6XG4gICAgICAgIGNvbnN0IGFycmF5VHlwZU5vZGUgPSA8dHMuQXJyYXlUeXBlTm9kZT5ub2RlO1xuICAgICAgICByZXR1cm4gcmVjb3JkRW50cnkoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIF9fc3ltYm9saWM6ICdyZWZlcmVuY2UnLFxuICAgICAgICAgICAgICBuYW1lOiAnQXJyYXknLFxuICAgICAgICAgICAgICBhcmd1bWVudHM6IFt0aGlzLmV2YWx1YXRlTm9kZShhcnJheVR5cGVOb2RlLmVsZW1lbnRUeXBlKV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub2RlKTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5OdWxsS2V5d29yZDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHJ1ZUtleXdvcmQ6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkZhbHNlS2V5d29yZDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlBhcmVudGhlc2l6ZWRFeHByZXNzaW9uOlxuICAgICAgICBjb25zdCBwYXJlbnRoZXNpemVkRXhwcmVzc2lvbiA9IDx0cy5QYXJlbnRoZXNpemVkRXhwcmVzc2lvbj5ub2RlO1xuICAgICAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZU5vZGUocGFyZW50aGVzaXplZEV4cHJlc3Npb24uZXhwcmVzc2lvbik7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHlwZUFzc2VydGlvbkV4cHJlc3Npb246XG4gICAgICAgIGNvbnN0IHR5cGVBc3NlcnRpb24gPSA8dHMuVHlwZUFzc2VydGlvbj5ub2RlO1xuICAgICAgICByZXR1cm4gdGhpcy5ldmFsdWF0ZU5vZGUodHlwZUFzc2VydGlvbi5leHByZXNzaW9uKTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5QcmVmaXhVbmFyeUV4cHJlc3Npb246XG4gICAgICAgIGNvbnN0IHByZWZpeFVuYXJ5RXhwcmVzc2lvbiA9IDx0cy5QcmVmaXhVbmFyeUV4cHJlc3Npb24+bm9kZTtcbiAgICAgICAgY29uc3Qgb3BlcmFuZCA9IHRoaXMuZXZhbHVhdGVOb2RlKHByZWZpeFVuYXJ5RXhwcmVzc2lvbi5vcGVyYW5kKTtcbiAgICAgICAgaWYgKGlzRGVmaW5lZChvcGVyYW5kKSAmJiBpc1ByaW1pdGl2ZShvcGVyYW5kKSkge1xuICAgICAgICAgIHN3aXRjaCAocHJlZml4VW5hcnlFeHByZXNzaW9uLm9wZXJhdG9yKSB7XG4gICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuUGx1c1Rva2VuOlxuICAgICAgICAgICAgICByZXR1cm4gKyhvcGVyYW5kIGFzIGFueSk7XG4gICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuTWludXNUb2tlbjpcbiAgICAgICAgICAgICAgcmV0dXJuIC0ob3BlcmFuZCBhcyBhbnkpO1xuICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlRpbGRlVG9rZW46XG4gICAgICAgICAgICAgIHJldHVybiB+KG9wZXJhbmQgYXMgYW55KTtcbiAgICAgICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FeGNsYW1hdGlvblRva2VuOlxuICAgICAgICAgICAgICByZXR1cm4gIW9wZXJhbmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBvcGVyYXRvclRleHQ6IHN0cmluZztcbiAgICAgICAgc3dpdGNoIChwcmVmaXhVbmFyeUV4cHJlc3Npb24ub3BlcmF0b3IpIHtcbiAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuUGx1c1Rva2VuOlxuICAgICAgICAgICAgb3BlcmF0b3JUZXh0ID0gJysnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLk1pbnVzVG9rZW46XG4gICAgICAgICAgICBvcGVyYXRvclRleHQgPSAnLSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVGlsZGVUb2tlbjpcbiAgICAgICAgICAgIG9wZXJhdG9yVGV4dCA9ICd+JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FeGNsYW1hdGlvblRva2VuOlxuICAgICAgICAgICAgb3BlcmF0b3JUZXh0ID0gJyEnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KHtfX3N5bWJvbGljOiAncHJlJywgb3BlcmF0b3I6IG9wZXJhdG9yVGV4dCwgb3BlcmFuZDogb3BlcmFuZH0sIG5vZGUpO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkJpbmFyeUV4cHJlc3Npb246XG4gICAgICAgIGNvbnN0IGJpbmFyeUV4cHJlc3Npb24gPSA8dHMuQmluYXJ5RXhwcmVzc2lvbj5ub2RlO1xuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5ldmFsdWF0ZU5vZGUoYmluYXJ5RXhwcmVzc2lvbi5sZWZ0KTtcbiAgICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLmV2YWx1YXRlTm9kZShiaW5hcnlFeHByZXNzaW9uLnJpZ2h0KTtcbiAgICAgICAgaWYgKGlzRGVmaW5lZChsZWZ0KSAmJiBpc0RlZmluZWQocmlnaHQpKSB7XG4gICAgICAgICAgaWYgKGlzUHJpbWl0aXZlKGxlZnQpICYmIGlzUHJpbWl0aXZlKHJpZ2h0KSlcbiAgICAgICAgICAgIHN3aXRjaCAoYmluYXJ5RXhwcmVzc2lvbi5vcGVyYXRvclRva2VuLmtpbmQpIHtcbiAgICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkJhckJhclRva2VuOlxuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PmxlZnQgfHwgPGFueT5yaWdodDtcbiAgICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkFtcGVyc2FuZEFtcGVyc2FuZFRva2VuOlxuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PmxlZnQgJiYgPGFueT5yaWdodDtcbiAgICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkFtcGVyc2FuZFRva2VuOlxuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PmxlZnQgJiA8YW55PnJpZ2h0O1xuICAgICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQmFyVG9rZW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+bGVmdCB8IDxhbnk+cmlnaHQ7XG4gICAgICAgICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5DYXJldFRva2VuOlxuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PmxlZnQgXiA8YW55PnJpZ2h0O1xuICAgICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRXF1YWxzRXF1YWxzVG9rZW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+bGVmdCA9PSA8YW55PnJpZ2h0O1xuICAgICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRXhjbGFtYXRpb25FcXVhbHNUb2tlbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gPGFueT5sZWZ0ICE9IDxhbnk+cmlnaHQ7XG4gICAgICAgICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FcXVhbHNFcXVhbHNFcXVhbHNUb2tlbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gPGFueT5sZWZ0ID09PSA8YW55PnJpZ2h0O1xuICAgICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuRXhjbGFtYXRpb25FcXVhbHNFcXVhbHNUb2tlbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gPGFueT5sZWZ0ICE9PSA8YW55PnJpZ2h0O1xuICAgICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuTGVzc1RoYW5Ub2tlbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gPGFueT5sZWZ0IDwgPGFueT5yaWdodDtcbiAgICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkdyZWF0ZXJUaGFuVG9rZW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+bGVmdCA+IDxhbnk+cmlnaHQ7XG4gICAgICAgICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5MZXNzVGhhbkVxdWFsc1Rva2VuOlxuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PmxlZnQgPD0gPGFueT5yaWdodDtcbiAgICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkdyZWF0ZXJUaGFuRXF1YWxzVG9rZW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+bGVmdCA+PSA8YW55PnJpZ2h0O1xuICAgICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuTGVzc1RoYW5MZXNzVGhhblRva2VuOlxuICAgICAgICAgICAgICAgIHJldHVybiAoPGFueT5sZWZ0KSA8PCAoPGFueT5yaWdodCk7XG4gICAgICAgICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5HcmVhdGVyVGhhbkdyZWF0ZXJUaGFuVG9rZW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+bGVmdCA+PiA8YW55PnJpZ2h0O1xuICAgICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuR3JlYXRlclRoYW5HcmVhdGVyVGhhbkdyZWF0ZXJUaGFuVG9rZW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+bGVmdCA+Pj4gPGFueT5yaWdodDtcbiAgICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlBsdXNUb2tlbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gPGFueT5sZWZ0ICsgPGFueT5yaWdodDtcbiAgICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLk1pbnVzVG9rZW46XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxhbnk+bGVmdCAtIDxhbnk+cmlnaHQ7XG4gICAgICAgICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5Bc3Rlcmlza1Rva2VuOlxuICAgICAgICAgICAgICAgIHJldHVybiA8YW55PmxlZnQgKiA8YW55PnJpZ2h0O1xuICAgICAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuU2xhc2hUb2tlbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gPGFueT5sZWZ0IC8gPGFueT5yaWdodDtcbiAgICAgICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlBlcmNlbnRUb2tlbjpcbiAgICAgICAgICAgICAgICByZXR1cm4gPGFueT5sZWZ0ICUgPGFueT5yaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVjb3JkRW50cnkoXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBfX3N5bWJvbGljOiAnYmlub3AnLFxuICAgICAgICAgICAgICAgIG9wZXJhdG9yOiBiaW5hcnlFeHByZXNzaW9uLm9wZXJhdG9yVG9rZW4uZ2V0VGV4dCgpLFxuICAgICAgICAgICAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHJpZ2h0XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNvbmRpdGlvbmFsRXhwcmVzc2lvbjpcbiAgICAgICAgY29uc3QgY29uZGl0aW9uYWxFeHByZXNzaW9uID0gPHRzLkNvbmRpdGlvbmFsRXhwcmVzc2lvbj5ub2RlO1xuICAgICAgICBjb25zdCBjb25kaXRpb24gPSB0aGlzLmV2YWx1YXRlTm9kZShjb25kaXRpb25hbEV4cHJlc3Npb24uY29uZGl0aW9uKTtcbiAgICAgICAgY29uc3QgdGhlbkV4cHJlc3Npb24gPSB0aGlzLmV2YWx1YXRlTm9kZShjb25kaXRpb25hbEV4cHJlc3Npb24ud2hlblRydWUpO1xuICAgICAgICBjb25zdCBlbHNlRXhwcmVzc2lvbiA9IHRoaXMuZXZhbHVhdGVOb2RlKGNvbmRpdGlvbmFsRXhwcmVzc2lvbi53aGVuRmFsc2UpO1xuICAgICAgICBpZiAoaXNQcmltaXRpdmUoY29uZGl0aW9uKSkge1xuICAgICAgICAgIHJldHVybiBjb25kaXRpb24gPyB0aGVuRXhwcmVzc2lvbiA6IGVsc2VFeHByZXNzaW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWNvcmRFbnRyeSh7X19zeW1ib2xpYzogJ2lmJywgY29uZGl0aW9uLCB0aGVuRXhwcmVzc2lvbiwgZWxzZUV4cHJlc3Npb259LCBub2RlKTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5GdW5jdGlvbkV4cHJlc3Npb246XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuQXJyb3dGdW5jdGlvbjpcbiAgICAgICAgcmV0dXJuIHJlY29yZEVudHJ5KGVycm9yU3ltYm9sKCdMYW1iZGEgbm90IHN1cHBvcnRlZCcsIG5vZGUpLCBub2RlKTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5UYWdnZWRUZW1wbGF0ZUV4cHJlc3Npb246XG4gICAgICAgIHJldHVybiByZWNvcmRFbnRyeShcbiAgICAgICAgICAgIGVycm9yU3ltYm9sKCdUYWdnZWQgdGVtcGxhdGUgZXhwcmVzc2lvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gbWV0YWRhdGEnLCBub2RlKSwgbm9kZSk7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVGVtcGxhdGVFeHByZXNzaW9uOlxuICAgICAgICBjb25zdCB0ZW1wbGF0ZUV4cHJlc3Npb24gPSA8dHMuVGVtcGxhdGVFeHByZXNzaW9uPm5vZGU7XG4gICAgICAgIGlmICh0aGlzLmlzRm9sZGFibGUobm9kZSkpIHtcbiAgICAgICAgICByZXR1cm4gdGVtcGxhdGVFeHByZXNzaW9uLnRlbXBsYXRlU3BhbnMucmVkdWNlKFxuICAgICAgICAgICAgICAocHJldmlvdXMsIGN1cnJlbnQpID0+IHByZXZpb3VzICsgPHN0cmluZz50aGlzLmV2YWx1YXRlTm9kZShjdXJyZW50LmV4cHJlc3Npb24pICtcbiAgICAgICAgICAgICAgICAgIDxzdHJpbmc+dGhpcy5ldmFsdWF0ZU5vZGUoY3VycmVudC5saXRlcmFsKSxcbiAgICAgICAgICAgICAgdGhpcy5ldmFsdWF0ZU5vZGUodGVtcGxhdGVFeHByZXNzaW9uLmhlYWQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGVtcGxhdGVFeHByZXNzaW9uLnRlbXBsYXRlU3BhbnMucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXhwciA9IHRoaXMuZXZhbHVhdGVOb2RlKGN1cnJlbnQuZXhwcmVzc2lvbik7XG4gICAgICAgICAgICBjb25zdCBsaXRlcmFsID0gdGhpcy5ldmFsdWF0ZU5vZGUoY3VycmVudC5saXRlcmFsKTtcbiAgICAgICAgICAgIGlmIChpc0ZvbGRhYmxlRXJyb3IoZXhwcikpIHJldHVybiBleHByO1xuICAgICAgICAgICAgaWYgKGlzRm9sZGFibGVFcnJvcihsaXRlcmFsKSkgcmV0dXJuIGxpdGVyYWw7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByZXZpb3VzID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgZXhwciA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgbGl0ZXJhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzICsgZXhwciArIGxpdGVyYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZXhwcjtcbiAgICAgICAgICAgIGlmIChwcmV2aW91cyAhPT0gJycpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0ge19fc3ltYm9saWM6ICdiaW5vcCcsIG9wZXJhdG9yOiAnKycsIGxlZnQ6IHByZXZpb3VzLCByaWdodDogZXhwcn07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGl0ZXJhbCAhPSAnJykge1xuICAgICAgICAgICAgICByZXN1bHQgPSB7X19zeW1ib2xpYzogJ2Jpbm9wJywgb3BlcmF0b3I6ICcrJywgbGVmdDogcmVzdWx0LCByaWdodDogbGl0ZXJhbH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0sIHRoaXMuZXZhbHVhdGVOb2RlKHRlbXBsYXRlRXhwcmVzc2lvbi5oZWFkKSk7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5Bc0V4cHJlc3Npb246XG4gICAgICAgIGNvbnN0IGFzRXhwcmVzc2lvbiA9IDx0cy5Bc0V4cHJlc3Npb24+bm9kZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZhbHVhdGVOb2RlKGFzRXhwcmVzc2lvbi5leHByZXNzaW9uKTtcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5DbGFzc0V4cHJlc3Npb246XG4gICAgICAgIHJldHVybiB7X19zeW1ib2xpYzogJ2NsYXNzJ307XG4gICAgfVxuICAgIHJldHVybiByZWNvcmRFbnRyeShlcnJvclN5bWJvbCgnRXhwcmVzc2lvbiBmb3JtIG5vdCBzdXBwb3J0ZWQnLCBub2RlKSwgbm9kZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNQcm9wZXJ0eUFzc2lnbm1lbnQobm9kZTogdHMuTm9kZSk6IG5vZGUgaXMgdHMuUHJvcGVydHlBc3NpZ25tZW50IHtcbiAgcmV0dXJuIG5vZGUua2luZCA9PSB0cy5TeW50YXhLaW5kLlByb3BlcnR5QXNzaWdubWVudDtcbn1cblxuY29uc3QgZW1wdHkgPSB0cy5jcmVhdGVOb2RlQXJyYXk8YW55PigpO1xuXG5mdW5jdGlvbiBhcnJheU9yRW1wdHk8VCBleHRlbmRzIHRzLk5vZGU+KHY6IHRzLk5vZGVBcnJheTxUPnwgdW5kZWZpbmVkKTogdHMuTm9kZUFycmF5PFQ+IHtcbiAgcmV0dXJuIHYgfHwgZW1wdHk7XG59Il19