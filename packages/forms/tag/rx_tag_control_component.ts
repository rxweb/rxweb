import { ViewContainerRef, Component, Input, Output, EventEmitter, AfterContentInit, OnChanges, Renderer, ElementRef, forwardRef, OnDestroy, ViewChild, Inject } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from "@angular/forms"

import { ApplicationConfiguration } from '../../core';
import { RxHttp } from '../../http';
import { TagModel } from './tag.models';
import { Multilingual } from "../multilingual";
const API_HOST_URI: string = 'API_URL';

@Component({
  selector: 'rx-tag',
  templateUrl: "./rx_tag_control_component.html",
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RxTagComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => RxTagComponent), multi: true }
  ],
  exportAs: 'tag',
})
export class RxTagComponent extends Multilingual implements AfterContentInit, OnDestroy, OnChanges {
  @ViewChild('tagSearch') viewChild;
  private propagateChange: any = () => { };
  element: Element;
  private currentValue: string;
  openDrop: string;
  activeTag: string;
  userSource: Array<any>;
  selectedTags: Array<TagModel>;
  private dropSource: Array<TagModel>;
  private inActiveSource: Array<TagModel>;
  private mainSource: Array<TagModel>;
  private dropIndex: number = 0;
  private timeOutId: number;
  private validTimeOutId: number;
  private inputDisabled: boolean = false;
  private maxSelectionMessage: string;
  private splitCharacter: string;
  isLimitExceeded: boolean = false;
  private currentFormControl: FormControl;
  isInValid: boolean = false;
  isCalledFromWriteValue: boolean = false;
  isSpinner: boolean = false;
  isServerCalled: boolean = false;
  @Output() removed: EventEmitter<TagModel> = new EventEmitter<TagModel>();
  @Output() added: EventEmitter<TagModel> = new EventEmitter<TagModel>();
  @Input() mainClass: string;
  @Input() freeTextEnabled: boolean;
  @Input() lookup: string[];

  @Input() params: string[];

  @Input() queryParams: {
    [key: string]: any
  };

  constructor(public elementRef: ElementRef, public renderer: Renderer, public http: RxHttp, @Inject(API_HOST_URI) hostUri: string) {
    super();
    this.mainSource = new Array<TagModel>();
    this.selectedTags = new Array<TagModel>();
    this.dropSource = new Array<TagModel>();
    this.inActiveSource = new Array<TagModel>();
    this.maxSelectionMessage = ApplicationConfiguration.get("control.rxTag.message.maxSelection");
    this.splitCharacter = ApplicationConfiguration.get("control.rxTag.splitCharacter");
    if (!this.splitCharacter)
      this.splitCharacter = ",";
    this.element = elementRef.nativeElement as Element;
  }

  @Input() set source(value: Array<any>) {
    if (value) {
      this.userSource = value;
      if (this.keyValueProps)
        this.setMainSource(this.userSource);
    }
  }

  @Input() tagDisabled: boolean

  @Input() maxSelection: string;

  @Input() keyValueProps: Array<string>;


  @Input() focus: boolean = false;

  @Input() itemTexts: any;

  ngAfterContentInit(): void {
    this.checkValid(true);
    if (this.userSource && this.mainSource.length === 0) {
      this.setMainSource(this.userSource);
      if (this.currentValue)
        this.setSelectedTags(this.mainSource, this.currentValue);
    }
    else if (this.itemTexts && this.currentValue) {
      var selectedItemSource = [];
      var splitIds = this.currentValue.split(this.splitCharacter);
      this.itemTexts.split(this.splitCharacter).forEach((t, i) => {
        var jObject = {};
        jObject[this.keyValueProps[1]] = splitIds[i];
        var textPattern = this.keyValueProps[0].split(/#/g);
        jObject[textPattern[0]] = t;
        selectedItemSource.push(jObject);
      })
      var itemSource = this.getTagModelSource(selectedItemSource)
      if (this.currentValue)
        this.setSelectedTags(itemSource, this.currentValue);
    }
  }

  ngOnChanges(source: any): void {
    if (this.focus)
      var t = setTimeout(() => {
        this.applyFocus(this.viewChild.nativeElement);
      }, 1000)
  }

  private checkValid(isValid: boolean) {
    if (isValid)
      this.validTimeOutId = window.setTimeout(() => {
        for (var i = 0; i < this.element.classList.length; i++) {
          this.isInValid = this.element.classList[i] == "ng-invalid";
          if (this.isInValid)
            break;
        }
        window.clearTimeout(this.validTimeOutId);
        this.validTimeOutId = undefined;
      }, 500);
    else
      this.isInValid = isValid;
  }
  private setMainSource(source: Array<any>) {
    this.inActiveSource = new Array<TagModel>();
    this.mainSource = this.getTagModelSource(source);
    this.mainSource.forEach(t =>
      this.dropSource.push(t)
    );
  }

  private getTagModelSource(source: Array<any>): Array<TagModel> {
    var textPattern = this.keyValueProps[0].split(/#/g);
    var tags = new Array<TagModel>();
    source.forEach(t => {
      var text = '';
      textPattern.forEach(x => {
        if (x != "")
          if (t[x] != undefined)
            text += t[x];
          else
            text += x;
      })
      if ((t["status"] == undefined) || (t["status"] != undefined && t["status"] == true))
        tags.push(new TagModel(
          t[this.keyValueProps[1]], text, false));
      else
        this.inActiveSource.push(new TagModel(
          t[this.keyValueProps[1]], text, false, true));

    });
    return tags;
  }

  private setSelectedTags(source: Array<TagModel>, tags: string): void {
    this.selectedTags = new Array<TagModel>();
    tags.toString().split(this.splitCharacter).forEach(v => {
      if (v != "") {
        var baseId: any = v;
        var result = source.filter(t => t.id == baseId);
        if (result.length > 0 && this.selectedTags.filter(t => t.id == baseId).length === 0)
          this.selectTag(result[0]);
        else {
          result = this.inActiveSource.filter(t => t.id == baseId);
          if (result.length > 0 && this.selectedTags.filter(t => t.id == baseId).length === 0)
            this.selectTag(result[0]);
        }
      }
    });
  }

  private setDropSource(source: Array<TagModel>) {
    this.dropSource = new Array<TagModel>();
    source.forEach(t => this.dropSource.push(t));
  }
  applyFocus(tagSearch: any) {
    tagSearch.focus()
    this.focus = false;
  }
  reset(): void {
    this.setDropSource(this.mainSource);
    this.setSelectedTags(this.mainSource, "");
    this.propagateChange(undefined);
  }

  changeTagSource(source: Array<any>) {
    this.inActiveSource = new Array<TagModel>();
    var tagModels = this.getTagModelSource(source);
    this.setDropSource(tagModels);
    this.setSelectedTags(tagModels, this.getTagString());
  }

  showTag(tags: string, clearExisting: boolean) {
    if (tags && !this.limitExceded()) {
      if (clearExisting && tags.split(this.splitCharacter).length > parseInt(this.maxSelection)) {
        return;
      }
      this.selectedTags.forEach(tag => this.dropSource.push(tag));
      tags = clearExisting ? tags : this.getTagString() + this.splitCharacter + tags;
      this.setSelectedTags(this.dropSource, tags);
    }
  }

  clear() {
    this.isCalledFromWriteValue = false;
    this.selectedTags.forEach(t => this.dropSource.push(t));
    this.selectedTags = new Array<TagModel>();
    this.updateFormValue();

  }

  selectAll(): void {
    var dropTags = new Array<TagModel>();
    this.dropSource.forEach(t => dropTags.push(t));
    dropTags.forEach(t => this.selectTag(t));
  }

  private getTagString(): string {
    let tagString: string = '';
    var selectCount = 0;
    this.selectedTags.forEach(t => {
      if ((selectCount === this.selectedTags.length - 1)) {
        if (t.id == -1)
          tagString += t.text;
        else
          tagString += t.id
      } else {
        if (t.id == -1)
          tagString += t.text + this.splitCharacter;
        else
          tagString += t.id + this.splitCharacter;
      }
      selectCount++
    });
    return tagString;
  }

  private registerOnChange(fn) {
    this.propagateChange = fn;
  }

  private registerOnTouched() { }

  private writeValue(value: any) {
    if (value)
      this.currentValue = value;
    if (this.selectedTags.count() > 0) {
      this.isCalledFromWriteValue = true;
      this.ngAfterContentInit()
    }

  }

  removeTag(tag: TagModel) {
    if (!this.tagDisabled) {
      this.removed.emit(tag);
      var indexOf = this.selectedTags.indexOf(tag);
      this.selectedTags.splice(indexOf, 1);
      if (!tag.isRecordInvactive && tag.id != -1)
        if (this.isServerCalled || !this.lookup)
          this.dropSource.push(tag);
      this.updateFormValue();
    }
  }

  onFocus(event: any): void {
    if ((!this.userSource && this.mainSource.length === 0 && this.lookup)) {
      let params = [];
      if (this.params)
        this.params.forEach(t => params.push(t));
      this.isSpinner = true
      this.http.lookupRequest(this.lookup, params, this.queryParams).subscribe((t: any) => {
        this.source = t;
        if (this.currentValue)
          this.setSelectedTags(this.mainSource, this.currentValue);
        this.setActiveTabClass();
        this.isSpinner = false;
        this.isServerCalled = true;
      })
    }
    else
      this.setActiveTabClass();
  }

  onBlur(event: any): void {
    if (this.timeOutId)
      window.clearTimeout(this.timeOutId);
    this.timeOutId = window.setTimeout(() => {
      if (this.freeTextEnabled) {
        this.enter(event.target)
      }
      this.clearActiveTabClass();
    }, 200)
  }

  onKeyup(event: KeyboardEvent, scroller: HTMLElement): void {
    var value = (<HTMLInputElement>event.srcElement).value;
    var regex = new RegExp(value.toLocaleLowerCase());
    if (value !== null && event.keyCode !== 40 && event.keyCode !== 13 && event.keyCode !== 37) {
      this.dropSource = this.mainSource.filter(t => regex.test(t.text.toLowerCase()));
      this.selectedTags.forEach(t => {
        if (this.dropSource.length > 0) {
          var indexOf = this.dropSource.indexOf(t);
          if (indexOf != -1)
            this.dropSource.splice(indexOf, 1);
        }
      });
      this.setActiveTabClass();
    }
  }

  onKeydown(event: KeyboardEvent, scroller: HTMLElement): void {
    if (event.keyCode === 40) {
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
    else if (event.keyCode === 38) {
      event.preventDefault();
      this.dropSource[this.dropIndex].active = false;
      if (this.dropIndex !== 0)
        this.dropIndex--;
      this.dropSource[this.dropIndex].active = true;
      (this.dropIndex == 0) ? this.dropIndex++ : 0;
    } else if (event.keyCode === 13) {
      event.preventDefault();
      const selectedTag = this.dropSource.filter(t => t.active);
      if (selectedTag.length > 0) {
        this.selectTag(selectedTag[0]);
        this.clearValue(event.srcElement);
      }
    }
  }
  private limitExceded(): boolean {
    this.isLimitExceeded = !(parseInt(this.maxSelection) !== this.selectedTags.length)
    return this.isLimitExceeded;
  }
  private setActiveTabClass() {
    if (this.limitExceded())
      this.maxSelectionMessage = this.maxSelectionMessage.replace('#maxSelection#', this.maxSelection);
    this.activeTag = "chosen-container-active";
    this.openDrop = "chosen-with-drop";
  }

  private changeScroll(scroller: HTMLElement): void {
    if (this.dropIndex > 8) {
      scroller.scrollTop = scroller.scrollTop - 50;
    }
  }

  enter(targetElement: any): void {
    if (this.freeTextEnabled) {
      var value = targetElement.value;
      if (value) {
        var tagModel = new TagModel(-1, value, true);
        var result = this.selectedTags.filter(t => t.text.toLowerCase() == value.toLowerCase())[0];
        if (!result) {
          this.selectedTags.push(tagModel);
          this.added.emit(tagModel);
          this.updateFormValue();
        }
        this.clearValue(targetElement);
      }
    }
  }
  onClick(tag: TagModel, tagSearchElement: HTMLElement): void {
    this.selectTag(tag);
    this.clearValue(tagSearchElement);
  }

  selectTag(tag: TagModel) {
    this.added.emit(tag);
    tag.active = false;
    var indexOf = this.dropSource.indexOf(tag);
    this.dropSource.splice(indexOf, 1);
    this.selectedTags.push(tag);
    this.clearActiveTabClass();
    if (!this.isCalledFromWriteValue)
      this.updateFormValue();
    this.isCalledFromWriteValue = false;
  }

  private updateFormValue(): void {
    var value = "";
    var count = 0;
    this.selectedTags.forEach(t => {
      if (count === 0) {
        if (t.id == -1)
          value += t.text;
        else
          value += t.id
      }
      else {
        if (t.id == -1)
          value += this.splitCharacter + t.text;
        else
          value += this.splitCharacter + t.id;
      }
      count++;
    });
    if (!this.isServerCalled)
      this.currentValue = value;
    this.propagateChange(this.selectedTags.length == 0 ? undefined : value);
  }

  private onMouseover(tag: TagModel) {
    this.dropSource.forEach(t => t.active = false);
    tag.active = true;
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
    this.selectedTags.forEach(t => tString += t.id);
    this.selectedTags = []
    this.mainSource = []
  }
}
