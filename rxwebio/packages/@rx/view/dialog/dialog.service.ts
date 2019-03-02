import { Injectable } from '@angular/core';
import {  } from "rxjs/Rx";

import { DialogClick } from "./dialog.models";
@Injectable()
export class RxDialog {

    confirmation: (texts: any[], messageType: string,type?:string) => Promise<DialogClick>;

    alert: (message: string, args: any[], type?: string) => Promise<boolean>;

    saveConfirmation: (text: string, args: any[], type?: string) => Promise<DialogClick>;

    validation: (messages: string[], type?: string) => Promise<boolean>;
}
