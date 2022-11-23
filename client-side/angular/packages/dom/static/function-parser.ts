export class FunctionParser{
private static extractArguments(splitTexts: string[]): string[] {
        let expressionArguments: string[] = ["this"];
        if (splitTexts && splitTexts[0])
            splitTexts[0].split(",").forEach(t => expressionArguments.push(t.trim().replace("(", "").replace(")", "")));
        return expressionArguments;
    }

    static parseColumns(expressionString: string): any[] {
        let propNames = [];
        let expressionArguments = FunctionParser.extractArguments(expressionString.match(/\(([^)]+)\)/g));
        let splitString: string[] = expressionString.replace(new RegExp(/\r?\n|\r|;/g), ' ').replace(/["%()\{}=\\?´`'#<>|,;:+-]+/g, " ").split(/ /g);
        if (expressionArguments.length > 3)
            expressionArguments.splice(expressionArguments.length - 1, 1)
        expressionArguments.forEach(x => {
            splitString.forEach((t, i) => {
                if (t) {
                    if (t.includes(`${x}.`)) {
                        let splitText = t.split(`${x}.`);
                        if (splitText.length > 1)
                            propNames.push(splitText[1]);
                    } 
                }
            })
        })
        return propNames;
    }
}