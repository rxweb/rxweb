import { Injectable } from '@angular/core';

@Injectable()
export class RxToast {
    show: (message?: string, params?: {
        [key: string]: any;
    },data?:any[]) => void;
}
