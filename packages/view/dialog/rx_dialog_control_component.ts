import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


import { RxDialog } from './dialog.service';
import { DialogDataModel, DialogStyle, DialogClick } from './dialog.models';
import { OverlayViewHost, BackDrop } from "../../core/view/overlay_view_host";
import { ApplicationConfiguration, ApplicationPage, ApplicationBroadcaster } from "../../core";
const KEY_ESC: number = 27;

@Component({
  selector: 'rx-dialog',
  templateUrl: 'rx_dialog_control_component.html',
})
export class RxDialogComponent implements OnInit {
  overLayViewHost: OverlayViewHost;
  dialogData: DialogDataModel;
  dialogStyle: DialogStyle;
  showDialog: boolean = false;
  element: HTMLElement;
  layoutClass: string = "dialogout";
  timeOutId: number;
  private defaults: any;
  private applicationModuleId: number;
  bindHtml: boolean = false;
  negativeOnClick: (e: any) => void;
  primaryOnClick: (e: any) => void;
  secondaryOnClick: (e: any) => void;
  validationMessages: string[] = [];
  messageHeading: string;
  constructor(dialogService: RxDialog, elementRef: ElementRef, @Inject(DOCUMENT) document: any, private applicationBroadcaster: ApplicationBroadcaster) {
    this.applicationBroadcaster.configurationSubscriber.subscribe(t => {
      this.setDialogConfiguration();
      this.bindHtml = true;
    });
    //this.setDialogConfiguration();
    //this.bindHtml = true;
    this.overLayViewHost = new OverlayViewHost(document);
    this.element = elementRef.nativeElement as HTMLElement;
    dialogService.confirmation = this.confirmation.bind(this);
    dialogService.alert = this.alert.bind(this);
    dialogService.saveConfirmation = this.saveConfirmation.bind(this);
    dialogService.validation = this.validation.bind(this);
    this.dialogData = new DialogDataModel();
    this.element.style.zIndex = "0";
  }
  setDialogConfiguration(): void {
    this.defaults = ApplicationConfiguration.get('dialog');
    if (this.defaults) {
      this.dialogStyle = new DialogStyle();
      if (this.defaults.style)
        this.setStyle(this.defaults.style);
    }
  }

  setDialogMessage(message: string, args: any[]): void {
    this.applicationModuleId = this.applicationModuleId ? this.applicationModuleId : ApplicationPage.getActiveModule();
    var localizeValue = ApplicationPage.localizeValue(message, 'alert', this.applicationModuleId, args);
    if (localizeValue)
      this.dialogData.message = localizeValue
    else
      this.dialogData.message = message;
  }
  alert(message: string, args: any[], type: string = "alert"): Promise<boolean> {
    this.setDialogMessage(message, args);
    if (this.defaults[type].style)
      this.setStyle(this.defaults[type].style);
    this.dialogData.title = this.defaults[type].title;
    this.dialogData.primaryOkText = this.defaults[type].okText;
    this.dialogData.showPrimaryOk = true;
    this.dialogData.showCancel = false;
    this.dialogData.showSecondaryOk = false;
    let promise = new Promise<boolean>((resolve, reject) => {
      this.primaryOnClick = (e: any) => resolve(true);
      this._show();
    });
    return promise;
  }

  validation(messages: string[], type: string = "validation", heading?: string): void {
      this.messageHeading = heading;
    this.validationMessages = messages;
    if (this.defaults[type] && this.defaults[type].style)
      this.setStyle(this.defaults[type].style);
    this.dialogData.title = this.defaults[type].title;
    this.dialogData.primaryOkText = this.defaults[type].okText;
    this.dialogData.showPrimaryOk = true;
    this.dialogData.showCancel = false;
    this.dialogData.showSecondaryOk = false;
    this.primaryOnClick = (e: any) => this._hideDialog();
    this._show();
  }

  saveConfirmation(text: string, args: any[], type: string = "saveConfirmation"): Promise<DialogClick> {
    if (this.defaults[type].style)
      this.setStyle(this.defaults[type].style);
    this.setDialogMessage(text, args);
    this.dialogData.title = this.defaults[type].title;
    this.dialogData.primaryOkText = this.defaults[type].saveText;
    this.dialogData.secondaryOkText = this.defaults[type].dontSaveText;
    this.dialogData.cancelText = this.defaults.cancelText;
    this.dialogData.showPrimaryOk = true;
    this.dialogData.showCancel = true;
    this.dialogData.showSecondaryOk = true;
    let promise = new Promise<DialogClick>((resolve, reject) => {
      this.primaryOnClick = (e: any) => resolve(DialogClick.PrimaryOk);
      this.secondaryClick = (e: any) => resolve(DialogClick.SecondaryOk);
      this.negativeOnClick = (e: any) => resolve(DialogClick.Cancel);
      this._show();
    });
    return promise;
  }

  confirmation(texts: any[], messageType: string, type: string = "confirmation"): Promise<DialogClick> {
    if (this.defaults[type].style)
      this.setStyle(this.defaults[type].style);
    var message = '';
    if (this.defaults[type].messageType[messageType])
      message = this.defaults[type].messageType[messageType];
    else
      return;
    var count = 0;
    for (let text of texts) {
      message = message.replace(`{${count}}`, text);
      count++;
    }
    this.dialogData.message = message;
    this.dialogData.title = this.defaults[type].title;
    this.dialogData.primaryOkText = this.defaults[type].okText;
    this.dialogData.cancelText = this.defaults[type].cancelText;
    this.dialogData.showPrimaryOk = true;
    this.dialogData.showCancel = true;
    this.dialogData.showSecondaryOk = false;
    let promise = new Promise<DialogClick>((resolve, reject) => {
      this.negativeOnClick = (e: any) => resolve(DialogClick.Cancel);
      this.primaryOnClick = (e: any) => resolve(DialogClick.PrimaryOk);
      this.secondaryOnClick = (e: any) => resolve(DialogClick.SecondaryOk);
      this._show();
    });

    return promise;
  }

  setStyle(styleObject: any): void {
    for (var propName in styleObject) {
      this.dialogStyle[propName] = styleObject[propName];
    }
  }

  ngOnInit() {
  }

  cancelClick(event: Event) {
    event.preventDefault();
    if (this.negativeOnClick) {
      if (!this.negativeOnClick(event)) this._hideDialog()
    }
    else if (this.secondaryOnClick)
      this.secondaryClick(event);
    else
      this.primaryClick(event);
  }

  secondaryClick(event: Event) {
    event.preventDefault();
    if (!this.secondaryOnClick(event)) this._hideDialog()
  }

  primaryClick(event: Event) {
    event.preventDefault();
    if (!this.primaryOnClick(event)) this._hideDialog()
  }

  private _show() {
    this.element.style.zIndex = "9999";
    this.layoutClass = "dialogin";
    if (this.timeOutId)
      window.clearTimeout(this.timeOutId);
    this.timeOutId = window.setTimeout(() => { this.showDialog = true }, 100);
  }

  private _hideDialog() {
    this.showDialog = false;
    if (this.timeOutId)
      window.clearTimeout(this.timeOutId);
    this.timeOutId = window.setTimeout(() => {
      this.layoutClass = "dialogout"; this.element.style.zIndex = "0"
      this.validationMessages = [];
    }, 400);
  }
}
