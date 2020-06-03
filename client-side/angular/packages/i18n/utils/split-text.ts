export class SplitText{
    static first(text: string, pattern: string) {
        return text.split(`${pattern}`)[0]
    }
    static index(text: string, pattern: string, index: number) {
        return text.split(`${pattern}`)[index]
    }
}
