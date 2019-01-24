import { Component, ElementRef, forwardRef, Input, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms"
import { RandomNumber } from "../../core/random-number";

const zero: string = "0";
const doubleZero: string = "00";
const colanDoubleZero: string = ":00";
const one: string = "1";
const colan: string = ":";
const space: string = " ";

@Component({
  selector: "rx-time",
  template: `<div class="chosen-container {{openDrop}} {{activeTag}} " [class.rxMessage-control-element]="!isInValid" title="">
  <ul class="chosen-choices mb-0">
    <li class="search-field">
      <span class="input-group">
        <input (keypress)='onKeypress($event.target,$event,$event.target.value)'  #selectSearch [tabindex]='controlTabIndex' type='text' maxlength='8' (ngModelChange)="searchEvent($event)" (keyup)='onKeyup($event,$event.target.value)' (blur)="onBlur(time)" (focus)="onFocus()" class='{{controlClass}} form-control' [(ngModel)]='time' (keydown)="onKeydown($event,scroller)"  />
      </span>
    </li>
  </ul>
  <div class="chosen-drop" #scroller>
    <ul class="chosen-results" [id]="selectId">
      <li class="active-result" *ngIf="showSelectItem" (mouseover)="onMouseover()" (click)="clear($event)" [class.highlighted]="selectActive">{{placeholder}}</li>
      <li class="active-result" *ngFor="let time of dropSource;let i = index" (click)="onClick(time,selectSearch)" (mouseover)="onMouseover(time,i)" [class.activeTag]="time.active" [class.highlighted]="time.active">{{time.value}}
      </li>
    </ul>
  </div>
</div> `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RxTimeComponent), multi: true },
  ],
})
export class RxTimeComponent implements OnInit, OnDestroy {
  @ViewChild("selectSearch") selectSearch;
  element: Element;
  timeOutId: number;
  isInValid: boolean = false;
  private timeValue: string;
  activeTag: string;
  openDrop: string;
  selectActive: boolean = false;
  @Input() showSelectItem: boolean = true;
  selectId: Number;
  dropSource: any[];
  mainSource: any[];
  @Input() controlTabIndex: number;
  @Input() defaultMeridiem: string = "AM";
  private propagateChange: any = () => { };
  placeholder: string = "Select";
  dropIndex: number = 0;

  @Input() set source(value: Array<any>) {
    if (value) {
      this.mainSource = value;
      this.setDropSource(value);
    }
  }

  constructor(elementRef: ElementRef) {
    this.element = elementRef.nativeElement as Element;
    this.selectId = RandomNumber.next();
    this.dropSource = new Array<any>();
  }

  private setDropSource(source: Array<any>) {
    this.dropIndex = 0;
    this.dropSource = new Array<any>();
    source.forEach(t => {
      let jObject = {};
      for (var col in t)
        jObject[col] = t[col];
      this.dropSource.push(jObject);
    })
    this.clearActiveTabClass();
  }

  set time(value: string) {
    var splitText = value.split(":");
    if (splitText.length == 2 && splitText[0].length == 1) {
      value = "".concat("0", splitText[0], ":", splitText[1]);
    }
    var splitMeridiem = value.split(" ");
    this.timeValue = value;
    if (this.timeValue.length > 0) {
      if (!this.isMeridiem)
        this.propagateChange(this.timeValue);
      else
        if (splitMeridiem.length == 2)
          this.propagateChange(this.timeValue);
        else
          this.propagateChange(this.timeValue + " " + this.meridiemText);
    }else this.propagateChange(undefined);
    
    this.checkValid(true);
    this.setActiveElement(value)
  }

  setActiveElement(value: string) {
    if (value != "") {
      var activeElement = this.dropSource.filter(a => a.value == value)[0];
      if (activeElement) {
        this.dropSource.forEach(a => { a.active = false; })
        activeElement.active = true;
      }
    }
  }

  get time(): string {
    return this.timeValue
  }

  @Input() controlClass: string;

  @Input() isMeridiem: boolean = true;
  meridiemText: string = "AM";
  ngOnInit(): void {
    this.checkValid(true);
  }


  checkValid(isValid: boolean) {
    if (isValid)
      this.timeOutId = window.setTimeout(() => {
        for (var i = 0; i < this.element.classList.length; i++) {
          this.isInValid = this.element.classList[i] == "ng-invalid";
          if (this.isInValid)
            break;
        }
        window.clearTimeout(this.timeOutId);
        this.timeOutId = undefined;
      }, 500);
    else
      this.isInValid = isValid;
  }

  private registerOnChange(fn) {
    this.propagateChange = fn;
    this.propagateChange(this.time);
  }

  private registerOnTouched() { }
  searchEvent(time: any) {
    if (time !== null) {
      var regex = new RegExp(time.toLowerCase());
      this.dropSource = this.mainSource.filter(t => regex.test(t.value.toLowerCase()));
    }
  }
  validateValue(value: any, indexCount: number, previousValue: any): boolean {
    let isValid: boolean = false;
    switch (indexCount) {
      case 0:
        isValid = (parseInt(value) < 3)
        break;
      case 1:
        isValid = (((previousValue === zero || previousValue === one) && parseInt(value) < 10) || (parseInt(value) < 4))
        break;
      case 2:
        isValid = (parseInt(value) < 6);
        break;
      case 3:
        isValid = (parseInt(value) < 10)
        break;
      case 4:
        isValid = (value == " ")
        break;
      case 5:
        isValid = (value == "a" || value == "A" || value == "P" || value == "p")
        break;
      case 6:
        isValid = (value == "M" || value == "m")
        break;

    }
    return isValid;
  }
  onBlur(value?: any) {
    if (value.length > 0) {
      let previousValue: string = "";
      let indexCount = 0;
      if (value.length >= 4) {
        for (var i = 0; i < 8; i++) {
          if ((i == 2) && value.charAt(i) == ":") {
            continue;
          }
          else if ((i == 5) && value.charAt(i) == "") {
            continue;
          }
          if (value.length - 1 == i)
            break;
          if (this.validateValue(value.charAt(i), indexCount, previousValue)) {
            previousValue += value.charAt(i);
            indexCount = indexCount + 1;
          }
          else {
            this.setDropSource(this.mainSource);
            this.time = '';
            return;
          }
        }
      }
      if (value.length === 1) {
        this.time = "".concat(zero, value, colanDoubleZero, space, this.defaultMeridiem);
      } else if (value.length === 2) {
        this.time = this.time.concat(colanDoubleZero, space, this.defaultMeridiem);
      } else if (value.length === 3) {
        if (value.charAt(2) == colan)
          this.time = this.time.concat(doubleZero, space, this.defaultMeridiem);
        else
          this.time = "".concat(this.time.charAt(0), this.time.charAt(1), colan, this.time.charAt(2), zero, space, this.defaultMeridiem);
      } else if (value.length === 4) {
        if (value.charAt(2) == colan)
          this.time = this.time.concat(zero, space, this.defaultMeridiem);
        else
          this.time = "".concat(this.time.charAt(0), this.time.charAt(1), colan, this.time.charAt(2), this.time.charAt(3), space, this.defaultMeridiem);
      }
      else if (value.length === 5) {
        if (value.charAt(2) == colan) {
          if (value.charAt(5) == space)
            this.time = this.time.concat(this.defaultMeridiem);
          else
            this.time = "".concat(this.time.charAt(0), this.time.charAt(1), this.time.charAt(2), this.time.charAt(3), this.time.charAt(4), space, this.defaultMeridiem);;
        }
        else
          if (value.charAt(5) == space)
            this.time = "".concat(this.time.charAt(0), this.time.charAt(1), colan, this.time.charAt(2), this.time.charAt(3), this.time.charAt(4), this.defaultMeridiem);
          else
            this.time = "".concat(this.time.charAt(0), this.time.charAt(1), colan, this.time.charAt(2), this.time.charAt(3), space, this.time.charAt(5), this.defaultMeridiem);
      }
      else if (value.length === 6) {
        if (value.charAt(2) == colan) {
          if (value.charAt(5) == space)
            this.time = this.time.concat(this.defaultMeridiem);
          else
            this.time = "".concat(this.time.charAt(0), this.time.charAt(1), this.time.charAt(2), this.time.charAt(3), this.time.charAt(4), space, this.defaultMeridiem);;
        }
        else
          if (value.charAt(5) == space)
            this.time = "".concat(this.time.charAt(0), this.time.charAt(1), colan, this.time.charAt(2), this.time.charAt(3), this.time.charAt(4), this.defaultMeridiem);
          else
            this.time = "".concat(this.time.charAt(0), this.time.charAt(1), colan, this.time.charAt(2), this.time.charAt(3), space, this.time.charAt(5), this.defaultMeridiem);
      }
      else if (value.length == 7) {
        let time = this.time.concat("M").split(" ");
        this.time = "".concat(time[0], space, time[1].toUpperCase());
      }
      else if (value.length == 8) {
        this.time = this.time
      }
      else{
        this.time = ""
        this.setDropSource(this.mainSource);
      }
    }
    if (this.timeOutId)
      window.clearTimeout(this.timeOutId);
    this.timeOutId = window.setTimeout(() => {
      this.clearActiveTabClass();
    }, 200);
  }
  private writeValue(value: string) {
    if (!this.isMeridiem)
      this.meridiemText = "";
    if (value) {
      var splitText = value.split(":");
      if (splitText.length >= 2)
        this.time = "".concat(splitText[0], ":", splitText[1]);
      if (this.isMeridiem) {
        var meridiemText = value.split(" ");
        if (meridiemText.length > 1)
          this.meridiemText = meridiemText[1];
      }
    } else {
      this.time = "";
    }
  }

  onMouseover(time?: any,i?:number) {
    this.dropSource.forEach(t => t.active = false);
    if (time && (i != undefined))
    {
      this.dropIndex = i;
      time.active = !time.active;
    }
    else {
      this.selectActive = true
    }
  }

  onFocus() {
    this.setActiveTabClass();
  }

  onClick(time, tagSearchInputElement: HTMLInputElement) {
    tagSearchInputElement.value = time.value
    this.writeValue(time.value);
    this.clearActiveTabClass();
  }

  clear() {
    this.time = "";

    this.clearActiveTabClass();
  }

  private setActiveTabClass() {
    this.activeTag = "chosen-container-active";
    this.openDrop = "chosen-with-drop";
  }

  private clearActiveTabClass() {
    this.activeTag = "";
    this.openDrop = "";
  }


  onKeydown(event: KeyboardEvent, scroller: HTMLElement): void {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.meridiemText = "AM"
      if (this.dropSource.length !== this.dropIndex) {
        if (this.dropIndex !== 0) {
          this.dropSource[this.dropIndex - 1].active = false;
          this.dropSource[this.dropIndex].active = true;
          if (this.dropIndex !== this.dropSource.length - 1)
            this.dropIndex++;
        }
        else {
          this.dropSource[this.dropIndex].active = true;
          this.dropIndex++;
        }
      }
      this.changeScroll();
      if (this.openDrop === "")
        this.setActiveTabClass();
    }
    else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.meridiemText = "PM";
      if ((this.dropSource.length - 1) === this.dropIndex) {
        this.dropSource[this.dropIndex].active = false;
        this.dropIndex--;
        this.dropSource[this.dropIndex].active = true;
      }
      else {
        this.dropSource[this.dropIndex].active = false;
        if (this.dropIndex !== 0)
          this.dropIndex--;
        this.dropSource[this.dropIndex].active = true;
      }
      this.changeScroll();
      if (this.openDrop === "")
        this.setActiveTabClass();
    }
    else if (event.key === "Enter") {
      event.preventDefault();
      const selectedTag = this.dropSource.filter(t => t.active);
      if (selectedTag.length > 0) {
        this.selectSearch.nativeElement.value = selectedTag[0].value
        this.writeValue(selectedTag[0].value);
        this.clearActiveTabClass();
      }
    }
  }
  onKeyup(event: KeyboardEvent, value: string) {
    if (value.length == 2) {
      if (parseInt(value) < 24) {
        this.time = this.time.concat(colan);
      }
    }
    if (value.length == 2 && event.keyCode == 8) {
      this.time = value.substr(0, 1);
    }
  }
  onKeypress(element: HTMLInputElement, event: KeyboardEvent, value: string): boolean {
    if(event.key == "Tab")
        return true;
    var keyValue = "";
    if (/^[0-9]+$/i.test(event.key))
      keyValue = event.key;
    else
      keyValue = event.key;
    if (keyValue == "ArrowLeft" || keyValue == "ArrowRight" || keyValue == "ArrowUp" || keyValue == "ArrowDown" || keyValue == "Backspace")
      return true;
    if (!this.isMeridiem)
      return (
        (value.length === 0 && parseInt(keyValue) < 3)
        ||
        (value.length === 1 && (((value === zero || value === one) && parseInt(keyValue) < 10) || (parseInt(keyValue) < 4)))
        ||
        (value.length === 3 && (parseInt(keyValue) < 6))
        ||
        (value.length === 4 && (parseInt(keyValue) < 10))
      )
    else
      return (
        (value.length === 0 && parseInt(keyValue) < 2)
        ||
        ((value.length === 1 && (((value === zero) && parseInt(keyValue) <= 9) || (value === one) && parseInt(keyValue) < 3)))
        ||
        (value.length === 3 && (parseInt(keyValue) < 6))
        ||
        (value.length === 4 && (parseInt(keyValue) < 10))
        ||
        (value.length === 5 && keyValue == " ")
        ||
        ((value.length === 6 && keyValue == "A") || (value.length === 6 && keyValue == "a") || (value.length === 6 && keyValue == "P") || (value.length === 6 && keyValue == "p"))
        ||
        ((value.length === 7 && keyValue == "M") || (value.length === 7 && keyValue == "m"))
      )
  }

  private changeScroll(): void {
    var scrollerElement = document.getElementById(String(this.selectId));
    let childElement: any = scrollerElement.getElementsByClassName("activeTag")[0];
    if (childElement != undefined)
      scrollerElement.scrollTop = childElement.offsetTop - 50;
  }

  ngOnDestroy() {
    if (this.timeOutId)
      window.clearTimeout(this.timeOutId)
  }

}
