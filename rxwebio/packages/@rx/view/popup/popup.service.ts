import { Injectable,ComponentFactoryResolver } from '@angular/core';
import {ComponentType} from "../../core/view/view";
@Injectable()

export class RxPopup {
    setComponent: (componentResolver: ComponentFactoryResolver) => void;    

    show: <T>(component: ComponentType<T>, params?: {
        [key: string]: any;
    }) => Promise<any>;

    hide: <T>(component: ComponentType<T>, jObject?: any) => void;

    validationFailed: (errors: string[]) => Promise<any>;

}   