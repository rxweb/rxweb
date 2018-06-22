import { Component, Input, Output, EventEmitter, AfterContentInit, OnChanges, Renderer, ElementRef, forwardRef, OnDestroy, ViewChild, Inject } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from "@angular/forms"

import { ApplicationConfiguration } from '../../core';
import { TagModel, } from "../tag";
import { RxHttp, } from '../../http';
import { Multilingual } from "../multilingual";
import { RandomNumber } from "../../core/random-number";
const API_HOST_URI: string = 'API_URL';

export class SelectModel {
  constructor(public key: string,
    public value: string,
    public active: boolean) { }
}

@Component({
  selector: 'rx-select',
  templateUrl: "./rx_select_control_component.html",
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RxSelectComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => RxSelectComponent), multi: true }
  ],
  exportAs: 'select',
})
export class RxSelectComponent extends Multilingual implements AfterContentInit, OnDestroy, OnChanges {
  @ViewChild("selectSearch") selectSearch;
  private propagateChange: any = () => { };
  element: Element;
  private currentValue: string;
  openDrop: string;
  activeTag: string;
  userSource: Array<any>;
  public dropSource: Array<SelectModel>;
  private mainSource: Array<SelectModel>;
  private timeOutId: number;
  private validTimeOutId: number;
  private inputDisabled: boolean = false;
  private currentFormControl: FormControl;
  isInValid: boolean = false;
  dropIndex: number = 0;
  isSpinner: boolean = false;
  selectActive: boolean = false;
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() changed: EventEmitter<any> = new EventEmitter<any>();
  @Input() mainClass: string;
  @Input() maxLength: number = 500;
  selectedTag: SelectModel;
  @Input() selectPlaceholder: string = "";
  @Input() showSelectItem:boolean = true;
  selectConfiguration: { [key: string]: any };
  selectId: number;
  constructor(public elementRef: ElementRef, public renderer: Renderer, public http: RxHttp, @Inject(API_HOST_URI) hostUri: string) {
    super();
    this.mainSource = new Array<SelectModel>();
    this.dropSource = new Array<SelectModel>();
    this.element = elementRef.nativeElement as Element;
    this.selectConfiguration = ApplicationConfiguration.get("control.rxSelect");
    if (this.selectConfiguration && this.selectConfiguration.placeholder && this.selectPlaceholder == "")
      this.selectPlaceholder = this.selectConfiguration.placeholder;
    this.selectId = RandomNumber.next();
  }

  @Input() set source(value: Array<any>) {
    if (value) {
      this.userSource = value;
      if (this.keyValueProps)
        this.setMainSource(this.userSource);
    }
  }

  @Input() disabled: boolean

  @Input() keyValueProps: Array<string>;

  @Input() focus: boolean = false;

  @Input() lookup: string[];

  @Input() params: string[];

  @Input() queryParams: {
    [key:string]:any
  }

  @Input() autoComplete: boolean = false;

  @Input() minimumCharacterSearchLength: number;

  @Input() enableFreeText: boolean;

  @Input() set text(value: string) {
    if (value) {
      if (this.selectSearch && this.selectSearch.nativeElement)
        this.selectSearch.nativeElement.value = value;
      this.controlText = value;
    }
    
  };

  controlText: string;
  isObjectChanged: boolean = false;
  ngAfterContentInit(): void {
    this.checkValid(true);
    if (this.userSource && this.mainSource.length === 0)
      this.setMainSource(this.userSource);
    this.setValue();
    if(this.focus && this.selectSearch)
        this.renderer.invokeElementMethod(this.selectSearch.nativeElement, "focus", []);
    if (this.maxLength && this.selectSearch)
        this.selectSearch.nativeElement.maxLength = this.maxLength;
  } 

  setValue(isBlur: boolean = false, columnName: string = "key"): boolean {
    if (!this.autoComplete && this.currentValue && this.mainSource.length > 0) {
      var text = this.mainSource.filter(t => String(t[columnName]).toLowerCase() == String(this.currentValue).toLowerCase())[0];
      if (text) {
        this.writeValue(text.value);
        if (isBlur) {
          this.updateFormValue(text.key);
          this.selectSearch.nativeElement.value = text.value;
        }
        return true;
      } else {
  
        this.updateFormValue(undefined);
      }
      return false;
    }
    return true;
  }

  ngOnChanges(source: any): void {
    if (source.params || source.queryParams) {
      this.isObjectChanged = true;
      this.clear();
    }
  }

  private checkValid(isValid: boolean) {
    if (isValid)
      this.validTimeOutId = window.setTimeout(() => {
        for (var i = 0; i < this.element.classList.length; i++) {
          this.isInValid = this.element.classList[i] == "ng-invalid";
        }
        window.clearTimeout(this.validTimeOutId);
        this.validTimeOutId = undefined;
      }, 500);
    else
      this.isInValid = isValid;
  }
  private setMainSource(source: Array<any>) {
    this.mainSource = this.getTagModelSource(source);
    this.mainSource.forEach(t => this.dropSource.push(t));
  }


  private setDropSource(source: Array<SelectModel>) {
    this.dropSource = new Array<SelectModel>();
    source.forEach(t => this.dropSource.push(t));
  }

  private getTagModelSource(source: Array<any>): Array<SelectModel> {
    var textPattern = this.keyValueProps[0].split(/#/g);
    var tags = new Array<SelectModel>();
    source.forEach(t => {
      var text = '';
      textPattern.forEach(x => {
        if (x != "")
          if (t[x] != undefined)
            text += t[x];
          else
            text += x;
      })
      tags.push(new SelectModel(
        t[this.keyValueProps[1]], text, false));
    });
    return tags;
  }

  resetSource(source:any): void {
    this.userSource = source;
    this.mainSource = [];
    this.dropSource = [];
    this.setMainSource(source);
    this.currentValue = "";
    this.selectSearch.nativeElement.value = "";
    this.updateFormValue(undefined);
  }

  showItems(tags: string, clearExisting: boolean) {

  }

  clear(event?: any) {
    this.selectSearch.nativeElement.value = '';
    this.onBlur(event, this.selectSearch.nativeElement.value);
    this.changed.emit({ item: this.selectedTag, text: this.currentValue })
  }



  private registerOnChange(fn) {
    this.propagateChange = fn;
  }

  private registerOnTouched() { }

  private writeValue(value: any) {
    if (value) {
      this.currentValue = value;
      if (this.selectSearch && this.selectSearch.nativeElement)
        if (this.controlText)
          this.selectSearch.nativeElement.value = this.controlText;
        else
          this.selectSearch.nativeElement.value = value;
    } else {
      this.currentValue = undefined;
      if (this.selectSearch && this.selectSearch.nativeElement)
        this.selectSearch.nativeElement.value = "";
    }
  }

  caretClick(event: any): void {
    
    if (this.activeTag == undefined || this.activeTag == "") {
      var t = setTimeout(() => {
        this.selectSearch.nativeElement.focus();
        this.onFocus(event);
      },200)
    } 
  }

  onFocus(event: any): boolean {
    if ((!this.userSource && this.mainSource.length === 0 && this.lookup) || (this.autoComplete) || this.isObjectChanged) {
      if ((this.currentValue && this.currentValue.length >= this.minimumCharacterSearchLength) || (!this.autoComplete) ) {
        let params = [];
        if (this.params)
          this.params.forEach(t => params.push(t));
        if (this.autoComplete && this.currentValue)
          params.push(this.currentValue);
        this.isSpinner = true
        this.http.lookupRequest(this.lookup, params, this.queryParams,false).subscribe((t: any) => {
          this.userSource = t;
          this.mainSource = [];
          this.dropSource = [];
          this.setMainSource(t);
          this.showItemBox();
          this.isSpinner = false;
          this.isObjectChanged = false;
        })
      }
    }
    else
      if (!this.autoComplete)
        this.showItemBox();
    return false;
  }

  showItemBox() {
    this.setActiveTabClass();
    var selectedItem = this.dropSource.filter(t => t.value == this.currentValue)[0];
    if (selectedItem)
      selectedItem.active = true;
  }

  onBlur(event: any, value: string): void {
    
    if (this.timeOutId)
      window.clearTimeout(this.timeOutId);
    this.timeOutId = window.setTimeout(() => {
      this.clearActiveTabClass();
    }, 200)
    this.currentValue = value;
    if (!this.setValue(true, "value") || value == "") {
        if (value != "" && !this.enableFreeText) {
      this.currentValue = "";
      this.selectSearch.nativeElement.value = "";
      this.updateFormValue(undefined);
      this.selectedTag = undefined;
    this.blur.emit({ item: this.selectedTag, text: this.currentValue });
        } else {
            this.updateFormValue(value);
            this.blur.emit({ item: undefined, text: value });
  }
    }
    
  }

  onKeyup(event: KeyboardEvent, scroller: HTMLElement): void {
    if (event.key == "Tab") {
      this.onFocus(event)
      return;
    }
    var value = (<HTMLInputElement>event.target).value;
    if (value !== null && event.key !== "ArrowUp" && event.key !== "ArrowDown" && event.key !== "Enter" && event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      
      if (this.autoComplete) {
        this.currentValue = value;
        this.onFocus(event);
      } else {
        var regex = new RegExp(value.toLowerCase());
        this.dropSource = this.mainSource.filter(t => regex.test(t.value.toLowerCase()));
        this.setActiveTabClass();
      }
      if (this.enableFreeText)
        this.updateFormValue(value);
    }
  }

  onKeydown(event: KeyboardEvent, scroller: HTMLElement): void {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (this.dropSource.length !== this.dropIndex) {
        if (this.dropIndex !== 0)
          this.dropSource[this.dropIndex - 1].active = false;
        this.dropSource[this.dropIndex].active = true;
        (this.dropIndex !== this.dropSource.length - 1) ? this.dropIndex++ : 0;
        this.changeScroll(scroller);
        if (this.openDrop === "")
          this.setActiveTabClass();
      }
    }
    else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.dropSource[this.dropIndex].active = false;
      if (this.dropIndex !== 0)
        this.dropIndex--;
      this.dropSource[this.dropIndex].active = true;
      (this.dropIndex == 0) ? this.dropIndex++ : 0;
    } else if (event.key === "Enter") {
      event.preventDefault();
      const selectedTag = this.dropSource.filter(t => t.active);
      if (selectedTag.length > 0) {
        this.selectTag(selectedTag[0]);
        this.clearValue(event.target);
      }
    }
  }


  private setActiveTabClass() {
    this.activeTag = "chosen-container-active";
    this.openDrop = "chosen-with-drop";
  }

  private changeScroll(scroller: HTMLElement): void {
    if (this.dropIndex > 8) {
      var scrollerElement = document.getElementById(String(this.selectId));
      console.log(scrollerElement);
      scrollerElement.scrollTo({
        top: 100,
        behavior: "smooth"});
      console.log(scrollerElement.scrollTop);
    }
  }

  onChange(targetElement: HTMLSelectElement): void {
    let selectModel: SelectModel = this.dropSource[targetElement.selectedIndex];
    this.selectTag(selectModel);
  }
  enter(targetElement: any): void {
    this.onClick(this.selectedTag, targetElement);
  }

  onClick(tag: SelectModel, tagSearchElement: HTMLInputElement): void {
    this.selectTag(tag);
    this.clearValue(tagSearchElement);
    tagSearchElement.value = tag.value;
    this.currentValue = tag.value;
    this.changed.emit({ item: this.selectedTag, text: this.currentValue, sourceItem: this.getSourceItem(tag) })
  }

  getSourceItem(tag: SelectModel) {
      var sourceItem = this.userSource.filter(t => t[this.keyValueProps[1]] == tag.key)[0];
      return sourceItem;
  }

  selectTag(tag: SelectModel) {
    tag.active = false;
    this.selectedTag = tag;
    this.clearActiveTabClass();
    this.updateFormValue(this.selectedTag.key);

  }

  private updateFormValue(value: any): void {
    this.propagateChange(value);
  }

  private onMouseover(tag?: TagModel) {
    this.dropSource.forEach(t => t.active = false);
    if (tag) {
      this.selectActive = false;
      tag.active = true;
    } else
      this.selectActive = true;
  }

  private clearValue(element: any): void {
    element.value = "";
    this.renderer.invokeElementMethod(element, "focus", []);
  }

  private clearActiveTabClass() {
    this.activeTag = "";
    this.openDrop = "";
    this.dropIndex = 0;
    this.dropSource.forEach(tag => tag.active = false);
  }

  private subscribeFormControl() {
    this.currentFormControl.statusChanges.subscribe(t => {
      this.isInValid = t === "INVALID";
    })
  }

  validate(formControl: FormControl) {
    if (!this.currentFormControl) {
      this.currentFormControl = formControl;
      this.subscribeFormControl();
    }
    return null;
  }

  ngOnDestroy(): void {
    let tString = '';
    this.mainSource = []
  }
}
