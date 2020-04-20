export class StringBuilder {
    private content: string;
    constructor() {
        this.content = '';
    }
    appendLine(text:string) {
        this.content +=`${text}\n`
    }

    newLine() {
        this.content += '\n'
    }

    append(text: string) {
        this.content += text;
    }

    toString() {
        return this.content;
    }
}
