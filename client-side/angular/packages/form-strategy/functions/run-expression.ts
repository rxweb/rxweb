export function runExpression(expression: Function, thisArgs: any, ...args: any[]) {
    return expression.apply(thisArgs, args)
}