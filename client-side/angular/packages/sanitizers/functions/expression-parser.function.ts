function extractArguments(splitTexts: string[]): string[] {
        let expressionArguments: string[] = ["this"];
        if (splitTexts && splitTexts[0])
            splitTexts[0].split(",").forEach(t => expressionArguments.push(t.trim().replace("(", "").replace(")", "")));
        return expressionArguments;
    }
export function expressionParser(expression: any):string[] {
        let columns = [];
        let expressionString = expression.toString();
        let expressionArguments = extractArguments(expressionString.match(/\(([^)]+)\)/g));
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
                        columns.push(splitText[1]);
                    }
                })
            })
        }
        return columns;
    }