import { Input, OnDestroy, ElementRef, Directive } from "@angular/core";
import { Subscription } from "rxjs/Rx";

import { ApplicationPage } from "../../core";
@Directive({
  selector: '[rxLabel]',
})
export class RxLabelDirective implements OnDestroy {
  element: HTMLElement;
  elementSubscription: Subscription;
  labelName: string;
  labelText: string;
  applicationModuleId: number;
  type: string = "label";
  constructor(elementRef: ElementRef) {
    this.element = elementRef.nativeElement as HTMLElement;
    this.elementSubscription = ApplicationPage.moduleContentSubscriber.subscribe(t => this.textChanged());
  }

  @Input('rxLabel') set setLabel(value: string) {
    if (value) {
      var splitText = value.split('.');
      if (splitText.length > 1) {
        this.type = splitText[0];
        this.labelName = splitText[1];
      } else {
        this.labelName = value;
      }

      this.textChanged();
    }

  }

  @Input() data: any[]

  textChanged(): void {
    this.applicationModuleId = this.applicationModuleId ? this.applicationModuleId : ApplicationPage.getActiveModule();

    if (this.data)
      this.labelText = ApplicationPage.localizeValue(this.labelName, this.type, this.applicationModuleId, this.data);
    else
      this.labelText = ApplicationPage.localizeValue(this.labelName, this.type, this.applicationModuleId);
    if (this.labelText != undefined)
      this.element.innerText = this.labelText;
    else
      this.element.innerText = "N/A";
  }

  ngOnDestroy(): void {
    this.elementSubscription.unsubscribe();
    this.elementSubscription.remove(this.elementSubscription);
    this.elementSubscription = undefined;
  }
}
