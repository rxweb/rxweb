import { HttpResponse } from "../models/http-response";

export interface ResponseFilter{
    onResponse: (response: HttpResponse) => HttpResponse;
}