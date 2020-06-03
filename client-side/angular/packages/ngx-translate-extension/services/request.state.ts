import { Injectable } from "@angular/core";

@Injectable()
export class RequestState {
    pending: boolean;
    loadingTranslations: any;
}
