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
    static IsPassed(jObject: { [key: string]: any }, expression: any, parentObject: { [key: string]: any }): boolean {
        let expressionFunction: Function = expression;
        if (parentObject && typeof expression == "string")
            expressionFunction = Linq.functionCreator(expression);
        if (parentObject && expressionFunction)
            return expressionFunction(parentObject, jObject);
        return true;
    }

    private static expressionParser(expression:any){
      let splitExpressions = [];
      let columns = [];
      let expressionString = expression.toString();
      let expressionArguments = Linq.extractArguments(expressionString.match(/\(([^)]+)\)/g));
      if(expressionArguments.length > 0)
      {
        let splitTexts = expressionString.replace(/\s/g, '').replace(new RegExp(/{|}/,"g"),"").split(new RegExp(/return|===|!==|==|!=|>=|>|<=|<|&&/));
        splitTexts.forEach(t=>{
            expressionArguments.forEach(x =>{
              t = t.trim();
              if(t.startsWith(x+'.')){
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
            }
            })
        })
      }
      return columns;
    }

    private static extractArguments(splitTexts:string[]) : string[]{
      let expressionArguments = [];
      splitTexts[0].split(",").forEach(t=> expressionArguments.push(t.trim().replace("(","").replace(")","")));
      return expressionArguments;
    }

    static expressionColumns(expression: any) {
        var columns = [];
        let splitExpressions = [];
        if (typeof expression == "string"){
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
            }})
        }
        else{
            columns = Linq.expressionParser(expression);
        }
        return columns;
    }

}
