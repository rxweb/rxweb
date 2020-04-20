export const REGEX_RULES: { [key: string]: RegExp } = {
    enter: /(\r\n|\n|\r)/gm,
    space: / /g,
    inLineTemplate: /template\s*:\s*(["'`])([^\1]*?)\1/,
    translationName: /translationName\s*:\s*(["'`])([^\1]*?)\1/,
    templateUrl: /templateUrl\s*:\s*(["'`])([^\1]*?)\1/,
    templateSyntax: /\{([^\}]*)\}/g,
    attributeSyntax: /\".*?"/g,
    specialCharacters: /[&\/\\#, +()$~%.'":*?<>{}]/g
}
