export class Linq {
    static functionCreator(expression): any {
        var functionSetter: any = [];
        var match = expression.match(/^\s*\(?\s*([^)]*)\s*\)?\s*=>(.*)/);
        var splitSelect = match[2].split(",");
        for (var i = 0; i < splitSelect.length; i++) {
            var equalToOperator = splitSelect[i].match(/^\s*\(?\s*([^)]*)\s*\)?\s*==(.*)/);
            if (equalToOperator !== null) {
                functionSetter = new Function(match[1], "return " + equalToOperator[0]);
            } else {
                equalToOperator = splitSelect[i].match(/^\s*\(?\s*([^)]*)\s*\)?\s*=(.*)/);
                if (equalToOperator === null) {
                    functionSetter = new Function(match[1], "return " + splitSelect[i]);
                } else {
                    functionSetter = new Function(match[1], "return " + equalToOperator[2]);
                }
            }
        }
        if (splitSelect.length == 0)
            functionSetter = { accessFunction: new Function(match[1], "return " + match[2]) };
        return functionSetter;
    }
    static IsPassed(jObject: { [key: string]: any }, expression: any): boolean {
        if (jObject && expression) {
            var expressionFunction = Linq.functionCreator(expression);
            return expressionFunction(jObject);
        }
        return true;
    }

    static expressionColumns(expression: any) {
        var columns = [];
        let splitExpressions = [];
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
        return columns;
    }

}
