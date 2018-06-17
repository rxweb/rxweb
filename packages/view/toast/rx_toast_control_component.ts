
import { Component, ElementRef } from '@angular/core';

import { ApplicationPage } from '../../core';

import { RxToast } from './toast_service'
import {MessageModel } from "./toast.models";

const STATUS: string = "status";
const POSITION: string = "position";
const TIMEOUT: string = "timeOut";

@Component({
    selector: 'rx-toast',
    templateUrl: './rx_toast_control_component.html',
})
export class RxToastComponent {
    private element: HTMLElement;
    private applicationModuleId: number;
    title: string;
    position: string = "bottom-right";
    messages: MessageModel[];
    timeOutId: number;
    isShow: boolean = false;
    private defaultSettings: {
        [key: string]: any;
    } = {
        showClose: false,
        position: 'bottom-right',
        status: 'success',
        timeOut: 2500
    };

    constructor(toastService: RxToast, elementRef: ElementRef) {
        this.element = elementRef.nativeElement as HTMLElement;
        this.element.style.opacity = "0";
        this.element.style.zIndex = "0";
        toastService.show = this.show.bind(this);
        this.messages = new Array<MessageModel>();
    }

    getToastrMessage(message: string, args: any[]): string {
        this.applicationModuleId = this.applicationModuleId ? this.applicationModuleId : ApplicationPage.getActiveModule();
        var localizeValue = ApplicationPage.localizeValue(message, 'toastr', this.applicationModuleId, args);
        if (localizeValue)
            return localizeValue;
        else
            return message;
    }

    show(message: string, params?: {
        [key: string]: any;
    },data?:any[]) {
        let isParam = (params);
        var messageModel = new MessageModel();
        messageModel.message = this.getToastrMessage(message, data);
        messageModel.status = (isParam && params[STATUS]) ? params[STATUS] : this.defaultSettings[STATUS];
        messageModel.title = '';
        this.position = (isParam && params[POSITION]) ? params[POSITION] : this.defaultSettings[POSITION];


        this.element.style.opacity = "1";
        this.element.style.zIndex = "9999";
        var timeOut = isParam && params[TIMEOUT] ? params[TIMEOUT] : this.defaultSettings[TIMEOUT];
        messageModel.timeOutId = window.setTimeout(() => { messageModel.isShow = false; this.hide(messageModel) }, timeOut);
        this.messages.push(messageModel);
        window.setTimeout(() => { messageModel.isShow = true }, 100);
    }


    private hide(messageModel: MessageModel) {
        if (this.timeOutId)
            window.clearTimeout(this.timeOutId);
        window.clearTimeout(messageModel.timeOutId);
        var indexOf = this.messages.indexOf(messageModel)
        if (indexOf !== -1)
            this.messages.splice(indexOf, 1);
        if (this.messages.length === 0) {
            this.element.style.opacity = "0";
            this.timeOutId = window.setTimeout(() => this.element.style.zIndex = "0", 400);
        }

    }
}
