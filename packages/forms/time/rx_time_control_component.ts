import {Component, ElementRef, forwardRef, Input, OnInit} from "@angular/core";
import {NG_VALUE_ACCESSOR } from "@angular/forms"

const zero: string = "0";
const doubleZero: string = "00";
const colanDoubleZero: string = ":00";
const one: string = "1";
const colan: string = ":";

@Component({
    selector: "rx-time",
  template: `<input type='text' maxlength='5' [class.ng-invalid]='isInValid' (blur)='onBlur($event.target.value)' (keydown)='onKeydown($event,$event.target.value)' (keypress)='onKeypress($event.target,$event,$event.target.value)' (keyup)='onKeyup($event,$event.target.value)' class='{{controlClass}} form-control' [(ngModel)]='time' />
            <div class="input-group-append">
           <span class= "input-group-text">
              <span class="am-pm" (click)="changeMeridiem()">
                <span class="am " > {{meridiemText}}</span>
              </span>
            <i class="roc-clock"></i>
          </span>
          </div> `,
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RxTimeComponent), multi: true },
    ],
})
export class RxTimeComponent implements OnInit {
    element: Element;
    timeOutId: number;
    isInValid: boolean = false;
    private timeValue: string;
    private propagateChange: any = () => { };

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement as Element;
    }

    set time(value: string) {
      var splitText = value.split(":");
      if (splitText.length == 2 && splitText[0].length == 1) {
        value = "".concat("0", splitText[0], ":", splitText[1]);
      }
        this.timeValue = value;
        if(!this.isMeridiem)
          this.propagateChange(this.timeValue);
        else
          this.propagateChange(this.timeValue + " "+ this.meridiemText);
        this.checkValid(true);
    }

    get time(): string {
        return this.timeValue
    }

    @Input() controlClass: string;

    @Input() isMeridiem: boolean = false;
    meridiemText: string = "AM";
    ngOnInit(): void {
        this.checkValid(true);
    }

    private registerOnChange(fn) {
        this.propagateChange = fn;
        this.propagateChange(this.time);
    }

    private registerOnTouched() { }


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

  changeMeridiem() {
    this.meridiemText = (this.meridiemText == "AM") ? "PM" : "AM";
    this.time = this.time;
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

    onKeydown(event: KeyboardEvent, value: string): boolean {
      if (this.isMeridiem && event.keyCode == 38) {
        this.meridiemText = "AM"
        return false;
      }
      else if (this.isMeridiem && event.keyCode == 40) {
        this.meridiemText = "PM";
        return false;
      }
      return !(event.keyCode === 46);
    }

    onBlur(value: string) {
      if (value.length > 0) {
        let previousValue: string = "";
        let indexCount = 0;
        if (value.length >= 4) {
          for (var i = 0; i < 4; i++) {
            if ((i == 2) && value.charAt(i) == ":") {
              continue;
            }
            if (this.validateValue(value.charAt(i), indexCount, previousValue)) {
              previousValue += value.charAt(i);
              indexCount = indexCount+1;
            }
            else {
              this.time = '';
              return;
            }
          }
        }
        if (value.length === 1) {
          this.time = "".concat(zero, value, colanDoubleZero);
        } else if (value.length === 2) {
          this.time = this.time.concat(colanDoubleZero);
        } else if (value.length === 3) {
          if (value.charAt(2) == colan)
            this.time = this.time.concat(doubleZero);
          else
            this.time = "".concat(this.time.charAt(0), this.time.charAt(1), colan, this.time.charAt(2), zero);
        } else if (value.length === 4) {
          if (value.charAt(2) == colan )
            this.time = this.time.concat(zero);
          else
            this.time = "".concat(this.time.charAt(0), this.time.charAt(1), colan, this.time.charAt(2), this.time.charAt(3));
        }
        else {
          if (value.charAt(2) == colan)
            this.time = "".concat(this.time.charAt(0), this.time.charAt(1), colan, this.time.charAt(3), this.time.charAt(4));
          else
            this.time = "".concat(this.time.charAt(0), this.time.charAt(1), colan, this.time.charAt(2), this.time.charAt(3));
        }
      } else
        this.time = ""
    }
    validateValue(value:any,indexCount:number,previousValue:any): boolean {
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
      }
      return isValid;
    }
    onKeypress(element: HTMLInputElement, event: KeyboardEvent, value: string): boolean {
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
        )
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
}
