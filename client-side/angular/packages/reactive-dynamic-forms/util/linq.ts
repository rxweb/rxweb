﻿export class Linq{
private static extractArguments(splitTexts: string[]): string[] {
        let expressionArguments: string[] = ["this"];
        if (splitTexts && splitTexts[0])
            splitTexts[0].split(",").forEach(t => expressionArguments.push(t.trim().replace("(", "").replace(")", "")));
        return expressionArguments;
    }

    static dynamicConfigParser(expressionString: string): any[] {
        let controlNames = [];
        let expressionArguments = Linq.extractArguments(expressionString.match(/\(([^)]+)\)/g));
        let splitString: string[] = expressionString.replace(new RegExp(/\r?\n|\r|;/g), ' ').replace(/["%()\{}=\\?´`'#<>|,;:+-]+/g, " ").split(/ /g);
        if (expressionArguments.length > 3)
            expressionArguments.splice(expressionArguments.length - 1, 1)
        splitString.forEach((t, i) => {
            if (t) {
                if (t.includes("controlsConfig.")) {
                    let splitText = t.split("controlsConfig.");
                    if (splitText.length > 1)
                        controlNames.push(splitText[1].split(".")[0]);
                } else if (t.includes("controlsConfig[")) 
                    controlNames.push(splitString[i+1]);
            }
        })
        return controlNames;
    }
}

