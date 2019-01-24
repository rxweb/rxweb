export class Uri {
    constructor(uri?: Uri) {
        if (uri) {
            this.url = uri.url;
            this.method = uri.method;
        }
    }
    url: string;
    method: string;
}

export var requestCollection: Array<number> = new Array<number>();