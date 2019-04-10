import { THIS } from "../const/app.const"
export class Linq {
    static functionCreator(expression): any {
        var functionSetter: any = [];
        var match = expression.match(/^\s*\(?\s*([^)]*)\s*\)?\s*=>(.*)/);
        var splitSelect = match[2].split(",");
        for (var i = 0; i < splitSelect.length; i++) {
            var equalToOperator = splitSelect[i].match(/^\s*\(?\s*([^)]*)\s*\)?\s*|===|!==|==|!=|>=|>|<=|<|(.*)/);
            if (equalToOperator !== null) {
                functionSetter = new Function(match[1], "return " + equalToOperator.input);
            } else {
                equalToOperator = splitSelect[i].match(/^\s*\(?\s*([^)]*)\s*\)?\s*=(.*)/);
                if (equalToOperator === null) {
                    functionSetter = new Function(match[1], "return " + splitSelect.input);
                } else {
                    functionSetter = new Function(match[1], "return " + equalToOperator.input);
                }
            }
        }
        if (splitSelect.length == 0)
            functionSetter = { accessFunction: new Function(match[1], "return " + match[2]) };
        return functionSetter;
    }
    static execute(jObject: { [key: string]: any }, config: any, parentObject: { [key: string]: any }, modelInstance: { [key: string]: any }, isDynamicConfig: boolean): boolean {
        let expressionFunction: Function | string = isDynamicConfig ? config.dynamicConfig : config.conditionalExpression;
        let lastParam = isDynamicConfig ? config : modelInstance;
        if (parentObject && typeof expressionFunction == "string")
            expressionFunction = Linq.functionCreator(expressionFunction);
        if (parentObject && expressionFunction)
            return modelInstance && modelInstance.constructor !== Object ? (<Function>expressionFunction).call(modelInstance, parentObject, jObject, lastParam) : (<Function>expressionFunction)(parentObject, jObject, lastParam);
        return true;
    }

    private static getConditionPath(texts: string[]): string {
        let path = "";
        for (var i = 1; i < texts.length; i++)
            path += (texts.length - 1) == i ? texts[i].trim() : `${texts[i].trim()}.`
        return path;
    }

    private static expressionParser(expression: any, isNonValidationExpression: boolean) {
        let splitExpressions = [];
        let columns = [];
        let expressionString = expression.toString();
        let expressionArguments = Linq.extractArguments(expressionString.match(/\(([^)]+)\)/g));
        if (expressionArguments.length > 0) {
            let splitTexts = [];
            expressionString.replace(/\s/g, '').replace(new RegExp(/{|}/, "g"), "").split(new RegExp(/return|===|!==|==|!=|>=|>|<=|<|&&/)).forEach(t => {
                let texts = t.replace(/\(|\)/g, "").split("||");
                for (let text of texts)
                    splitTexts.push(text);
            });
            splitTexts.forEach(t => {
                expressionArguments.forEach((x, i) => {
                    t = t.trim();
                    if (t.startsWith(x + '.')) {
                        var splitText = t.split('.');
                        if (splitText.length == 2 || (splitText.length >= 2 && isNonValidationExpression))
                            if (!isNonValidationExpression)
                                columns.push({ propName: splitText[1].trim(), argumentIndex: i == 3 ? 0 : i == 2 ? 1 : i == 1 ? -1 : i });
                            else
                                columns.push({ propName: this.getConditionPath(splitText), argumentIndex: i == 3 ? 0 : i == 2 ? 1 : i == 1 ? -1 : i });
                        else {
                            var arrayProp = splitText[1].split('[');
                            let jObject = {
                                propName: splitText[splitText.length - 1].trim(),
                                objectPropName: arrayProp[0],
                                arrayIndex: arrayProp.length > 1 ? arrayProp[1].replace("]", "") : undefined,
                                argumentIndex: i === 3 ? 0 : i === 2 ? 1 : i
                            }
                            columns.push(jObject);
                        }
                    }
                })
            })
        }
        return columns;
    }

    private static extractArguments(splitTexts: string[]): string[] {
        let expressionArguments: string[] = [THIS];
        if (splitTexts && splitTexts[0])
            splitTexts[0].split(",").forEach(t => expressionArguments.push(t.trim().replace("(", "").replace(")", "")));
        return expressionArguments;
    }

    static expressionColumns(expression: any, isNonValidationExpression: boolean = false) {
        var columns = [];
        let splitExpressions = [];
        if (typeof expression == "string") {
            expression.split("=>")[1].split(" && ").forEach(t => {
                t.split(" || ").forEach(x => {
                    splitExpressions.push(x.trim().split(' ')[0])
                })
            });
            splitExpressions.forEach(t => {
                var splitText = t.split('.');
                if (splitText.length == 2)
                    columns.push({ propName: splitText[1].trim() });
                else {
                    var arrayProp = splitText[1].split('[');
                    let jObject = {
                        propName: splitText[splitText.length - 1].trim(),
                        objectPropName: arrayProp[0],
                        arrayIndex: arrayProp.length > 1 ? arrayProp[1].replace("]", "") : undefined
                    }
                    columns.push(jObject);
                }
            })
        }
        else {
            columns = Linq.expressionParser(expression, isNonValidationExpression);
        }
        return columns;
    }

    static dynamicConfigParser(expression: Function, propName: string): any[] {
        let controlNames = [];
        let expressionString = expression.toString();
        let expressionArguments = Linq.extractArguments(expressionString.match(/\(([^)]+)\)/g));
        let splitString: string[] = expressionString.replace(new RegExp(/\r?\n|\r|;/g), ' ').replace(/["%()\{}=\\?´`'#<>|,;:+-]+/g, " ").split(/ /g);
        if (expressionArguments.length > 3)
            expressionArguments.splice(expressionArguments.length - 1, 1)
        expressionArguments.forEach(t => {
            splitString.filter(x => x != `${t}.${propName}` && x.startsWith(`${t}.`)).forEach(x => {
                let split = x.split('.');
                if (split.length == 2)
                    controlNames.push({ propName: x.replace(`${t}.`, '') })
                else {
                    var arrayProp = split[1].split('[');
                    let jObject = {
                        propName: split[split.length - 1].trim(),
                        objectPropName: arrayProp[0],
                        arrayIndex: arrayProp.length > 1 ? arrayProp[1].replace("]", "") : undefined,
                    }
                    controlNames.push(jObject);
                }
            });
        });
        return controlNames;
    }
}
