export class HttpResponse {

    constructor() { }

    isInMemoryResponse: boolean;
    statusCode: number;
    statusText: string;
    headers: { [key: string]: any };
    body: any;
    contentLength: number;
    contentType: string;
    responseUrl: string;
}