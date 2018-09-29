import * as Lint from 'tslint';
import * as ts from 'typescript';
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static COMPLEXITY_FAILURE_STRING: string;
    static COMPLEXITY_MAX: number;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
