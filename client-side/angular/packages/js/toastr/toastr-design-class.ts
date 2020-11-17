import { DomManipulation } from "@rxweb/dom"

export class ToastrConfig {
    timeOut: number = 7000;
    message?: string;
    autoHideDisable: boolean;
}

export interface ToastrHideConfig {
    hideFunc: Function;
    domManipulation?: DomManipulation;
    toastrConfig: ToastrConfig
}

export class ToastrDesignClass {
    root: any[] = [];
    secondLevelDiv: any[] = [];
    thirdLevelDiv: any[] = [];
    showClass: any[] = [];
    hideClass: any[] = [];
}