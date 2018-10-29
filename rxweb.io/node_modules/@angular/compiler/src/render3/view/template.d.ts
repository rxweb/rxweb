/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LocalResolver } from '../../compiler_util/expression_converter';
import { ConstantPool } from '../../constant_pool';
import * as core from '../../core';
import * as o from '../../output/output_ast';
import { ParseError } from '../../parse_util';
import { SelectorMatcher } from '../../selector';
import { BindingParser } from '../../template_parser/binding_parser';
import * as t from '../r3_ast';
import { R3QueryMetadata } from './api';
import { invalid } from './util';
export declare function renderFlagCheckIfStmt(flags: core.RenderFlags, statements: o.Statement[]): o.IfStmt;
export declare class TemplateDefinitionBuilder implements t.Visitor<void>, LocalResolver {
    private constantPool;
    private contextParameter;
    private level;
    private contextName;
    private templateName;
    private viewQueries;
    private directiveMatcher;
    private directives;
    private pipeTypeByName;
    private pipes;
    private _namespace;
    private _dataIndex;
    private _bindingContext;
    private _prefixCode;
    private _creationCode;
    private _variableCode;
    private _bindingCode;
    private _postfixCode;
    private _valueConverter;
    private _unsupported;
    private _bindingScope;
    private _inI18nSection;
    private _i18nSectionIndex;
    private _phToNodeIdxes;
    private _pureFunctionSlots;
    constructor(constantPool: ConstantPool, contextParameter: string, parentBindingScope: BindingScope, level: number, contextName: string | null, templateName: string | null, viewQueries: R3QueryMetadata[], directiveMatcher: SelectorMatcher | null, directives: Set<o.Expression>, pipeTypeByName: Map<string, o.Expression>, pipes: Set<o.Expression>, _namespace: o.ExternalReference);
    buildTemplateFunction(nodes: t.Node[], variables: t.Variable[], hasNgContent?: boolean, ngContentSelectors?: string[]): o.FunctionExpr;
    getLocal(name: string): o.Expression | null;
    visitContent(ngContent: t.Content): void;
    getNamespaceInstruction(namespaceKey: string | null): o.ExternalReference;
    addNamespaceInstruction(nsInstruction: o.ExternalReference, element: t.Element): void;
    visitElement(element: t.Element): void;
    visitTemplate(template: t.Template): void;
    readonly visitReference: typeof invalid;
    readonly visitVariable: typeof invalid;
    readonly visitTextAttribute: typeof invalid;
    readonly visitBoundAttribute: typeof invalid;
    readonly visitBoundEvent: typeof invalid;
    visitBoundText(text: t.BoundText): void;
    visitText(text: t.Text): void;
    visitSingleI18nTextChild(text: t.Text, i18nMeta: string): void;
    private allocateDataSlot;
    private bindingContext;
    private instruction;
    private convertPropertyBinding;
}
/**
 * Function which is executed whenever a variable is referenced for the first time in a given
 * scope.
 *
 * It is expected that the function creates the `const localName = expression`; statement.
 */
export declare type DeclareLocalVarCallback = (lhsVar: o.ReadVarExpr, rhsExpression: o.Expression) => void;
export declare class BindingScope implements LocalResolver {
    private parent;
    private declareLocalVarCallback;
    /**
     * Keeps a map from local variables to their expressions.
     *
     * This is used when one refers to variable such as: 'let abc = a.b.c`.
     * - key to the map is the string literal `"abc"`.
     * - value `lhs` is the left hand side which is an AST representing `abc`.
     * - value `rhs` is the right hand side which is an AST representing `a.b.c`.
     * - value `declared` is true if the `declareLocalVarCallback` has been called for this scope
     * already.
     */
    private map;
    private referenceNameIndex;
    private static _ROOT_SCOPE;
    static readonly ROOT_SCOPE: BindingScope;
    private constructor();
    get(name: string): o.Expression | null;
    /**
     * Create a local variable for later reference.
     *
     * @param name Name of the variable.
     * @param lhs AST representing the left hand side of the `let lhs = rhs;`.
     * @param rhs AST representing the right hand side of the `let lhs = rhs;`. The `rhs` can be
     * `undefined` for variable that are ambient such as `$event` and which don't have `rhs`
     * declaration.
     */
    set(name: string, lhs: o.ReadVarExpr, rhs?: o.Expression): BindingScope;
    getLocal(name: string): (o.Expression | null);
    nestedScope(declareCallback: DeclareLocalVarCallback): BindingScope;
    freshReferenceName(): string;
}
/**
 * Parse a template into render3 `Node`s and additional metadata, with no other dependencies.
 *
 * @param template text of the template to parse
 * @param templateUrl URL to use for source mapping of the parsed template
 */
export declare function parseTemplate(template: string, templateUrl: string, options?: {
    preserveWhitespaces?: boolean;
}): {
    errors?: ParseError[];
    nodes: t.Node[];
    hasNgContent: boolean;
    ngContentSelectors: string[];
};
/**
 * Construct a `BindingParser` with a default configuration.
 */
export declare function makeBindingParser(): BindingParser;
