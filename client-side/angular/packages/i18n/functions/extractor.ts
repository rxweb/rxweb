export function extractor(regExp: RegExp, content: string, index: number = 0): string[] | string {
    const match = regExp.exec(content);
    if (match !== null) 
        return index == 0 ? match :  match[index];
    return index == 0 ? [] : null;
}
