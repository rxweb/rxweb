import { Renderer2 } from "@angular/core";
import {
    KEY_DOWN, KEY_PRESS, PASTE, BLUR, FOCUS
} from "../../const";
import { FormControl } from "@angular/forms";
import { MaskConfig } from "../../models/config/mask-config";
import { getConfigObject } from "../../util/config-provider";
import { ObjectMaker } from "../../util/object-maker";
import { AnnotationTypes } from "../../core/validator.static";
import { FormProvider } from "../../util/form-provider";
import { RegexValidator } from "../../util/regex-validator";

export class MaskProvider {

    private eventListeners: any[] = [];

    type: string = 'text';

    slotChar: string = '_';

    autoClear: boolean = false;

    value: any;

    defs: any;

    tests: any[];

    partialPosition: any;

    firstNonMaskPos: number;

    lastRequiredNonMaskPos: any;

    len: number;

    oldVal: string;

    buffer: any;

    defaultBuffer: string;

    focusText: string;

    caretTimeoutId: any;

    androidChrome: boolean;

    focus: boolean;

    filled: boolean;

    constructor(private input: HTMLInputElement, private mask: string, private renderer: Renderer2, private formControl: FormControl, private config: MaskConfig) {
        this.bind();
    }

    bind() {
        if (RegexValidator.isNotBlank(this.formControl.value))
            this.input.value = this.formControl.value;
        this.tests = [];
        this.partialPosition = this.mask.length;
        this.len = this.mask.length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            'a': '[A-Za-z]',
            '*': '[A-Za-z0-9]'
        };


        this.androidChrome = false;

        let maskTokens = this.mask.split('');
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c == '?') {
                this.len--;
                this.partialPosition = i;
            }
            else if (this.defs[c]) {
                this.tests.push(new RegExp(this.defs[c]));
                if (this.firstNonMaskPos === null) {
                    this.firstNonMaskPos = this.tests.length - 1;
                }
                if (i < this.partialPosition) {
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
            }
            else {
                this.tests.push(null);
            }
        }

        this.buffer = [];
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c != '?') {
                if (this.defs[c])
                    this.buffer.push(this.getPlaceholder(i));
                else
                    this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');
        this.focusText = this.input.value;
        this.bindEvents();
        this.checkVal(); 
    }

    bindEvents() {
        this.eventListeners.push(this.renderer.listen(this.input, FOCUS, this.onFocus.bind(this)));
        this.eventListeners.push(this.renderer.listen(this.input, BLUR, this.onBlur.bind(this)));
        this.eventListeners.push(this.renderer.listen(this.input, KEY_DOWN, this.onKeyDown.bind(this)));
        this.eventListeners.push(this.renderer.listen(this.input, KEY_PRESS, this.onKeyPress.bind(this)));
        this.eventListeners.push(this.renderer.listen(this.input, "input", this.onInput.bind(this)));
        this.eventListeners.push(this.renderer.listen(this.input, PASTE, this.handleInputChange.bind(this)));
    }
    isInvalid: boolean = false;
    validate() {
        
        let config = getConfigObject(this.config, this.formControl);
        if (RegexValidator.isNotBlank(this.getUnmaskedValue()) && FormProvider.ProcessRule(this.formControl, config)) {
            if (this.isInvalid) {
                return ObjectMaker.toJson(AnnotationTypes.mask, config, [this.formControl.value]);
            }
            
        }
        return ObjectMaker.null();
    }

    writeValue(value: any): void {
        this.value = value;

        if (this.input) {
            if (this.value == undefined || this.value == null) {
                this.input.value = '';
            }
            this.checkVal();
        }

        this.updateFilledState();
    }

    caret(first?: number, last?: number) {
        let range, begin, end;

        if (!this.input.offsetParent || this.input !== document.activeElement) {
            return;
        }

        if (typeof first == 'number') {
            begin = first;
            end = (typeof last === 'number') ? last : begin;
            if (this.input.setSelectionRange) {
                this.input.setSelectionRange(begin, end);
            }
            else if (this.input['createTextRange']) {
                range = this.input['createTextRange']();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        }
        else {
            if (this.input.setSelectionRange) {
                begin = this.input.selectionStart;
                end = this.input.selectionEnd;
            }
            else if (document['selection'] && document['selection'].createRange) {
                range = document['selection'].createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }

            return { begin: begin, end: end };
        }
    }

    isCompleted(): boolean {
        let completed: boolean;
        for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
            if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
                return false;
            }
        }
        this.isInvalid = false;
        this.formControl.updateValueAndValidity();
        return true;
    }

    getPlaceholder(i: number) {
        if (i < this.slotChar.length) {
            return this.slotChar.charAt(i);
        }
        return this.slotChar.charAt(0);
    }

    seekNext(pos) {
        while (++pos < this.len && !this.tests[pos]);
        return pos;
    }

    seekPrev(pos) {
        while (--pos >= 0 && !this.tests[pos]);
        return pos;
    }

    shiftL(begin: number, end: number) {
        let i, j;

        if (begin < 0) {
            return;
        }

        for (i = begin, j = this.seekNext(end); i < this.len; i++) {
            if (this.tests[i]) {
                if (j < this.len && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                } else {
                    break;
                }

                j = this.seekNext(j);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos, begin));
    }

    shiftR(pos) {
        let i, c, j, t;

        for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.len && this.tests[j].test(t)) {
                    c = t;
                } else {
                    break;
                }
            }
        }
    }

    handleAndroidInput(e) {
        var curVal = this.input.value;
        var pos = this.caret();
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin - 1])
                pos.begin--;
            if (pos.begin === 0) {
                while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin])
                    pos.begin++;
            }
            this.caret(pos.begin, pos.begin);
        } else {
            var pos2 = this.checkVal(true);
            while (pos.begin < this.len && !this.tests[pos.begin])
                pos.begin++;

            this.caret(pos.begin, pos.begin);
        }

        if (this.isCompleted()) {
            this.isInvalid = false;
        } else {
            this.isInvalid = true;
            this.formControl.updateValueAndValidity();
        }
    }

    onBlur(e) {
        
        
        this.focus = false;
        this.checkVal();
        this.updateModel(e);
        this.updateFilledState();
        if (this.input.value != this.focusText) {
            let event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            this.input.dispatchEvent(event);
            let maskedValue = this.input.value;
            this.formControl.setValue(this.getUnmaskedValue());
            this.input.value = maskedValue;
        }
    }

    onKeyDown(e) {
        let k = e.which || e.keyCode,
            pos,
            begin,
            end;
        let iPhone = false;
        this.oldVal = this.input.value;

        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret();
            begin = pos.begin;
            end = pos.end;


            if (end - begin === 0) {
                begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = k === 46 ? this.seekNext(end) : end;
            }

            this.clearBuffer(begin, end);
            this.shiftL(begin, end - 1);
            this.setControlValue(e,false);
            this.updateModel(e);
            e.preventDefault();
        } else if (k === 13) { 
            this.onBlur(e);
            this.setControlValue(e, false);
            this.updateModel(e);
        } else if (k === 27) { 
            this.input.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(e);
            this.setControlValue(e, false);
            e.preventDefault();
            
        }
        
    }

    onKeyPress(e) {
        var k = e.which || e.keyCode,
            pos = this.caret(),
            p,
            c,
            next,
            completed;

        if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
            return;
        } else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end - 1);
            }

            p = this.seekNext(pos.begin - 1);
            if (p < this.len) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);

                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);


                    this.caret(next);
                    if (pos.begin <= this.lastRequiredNonMaskPos) {
                        completed = this.isCompleted();
                    }
                }
            }
            e.preventDefault();
        }

        this.updateModel(e);
        if (completed === undefined)
            completed = this.isCompleted()
        this.setControlValue(e, completed);
        
    }
    internalProcess: boolean = false;
    clearBuffer(start, end) {
        let i;
        for (i = start; i < end && i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
            }
        }
    }

    writeBuffer() {
        this.input.value = this.buffer.join('');
    }

    checkVal(allow?: boolean) {
        let test = this.input.value,
            lastMatch = -1,
            i,
            c,
            pos;

        for (i = 0, pos = 0; i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
                while (pos++ < test.length) {
                    c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        this.buffer[i] = c;
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    this.clearBuffer(i + 1, this.len);
                    break;
                }
            } else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if (i < this.partialPosition) {
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        } else if (lastMatch + 1 < this.partialPosition) {
            if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
                this.isInvalid = true
            } else {
                this.isInvalid = true
                this.writeBuffer();
            }
        } else {
            this.writeBuffer();
            this.input.value = this.input.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos);
    }

    onFocus(event) {
        
        this.focus = true;

        clearTimeout(this.caretTimeoutId);
        let pos;

        this.focusText = this.input.value;

        pos = this.checkVal();

        this.caretTimeoutId = setTimeout(() => {
            if (this.input !== document.activeElement) {
                return;
            }
            this.writeBuffer();
            if (pos == this.mask.replace("?", "").length) {
                this.caret(0, pos);
            } else {
                this.caret(pos);
            }
            this.updateFilledState();
        }, 10);
    }

    onInput(event) {
        if (this.androidChrome)
            this.handleAndroidInput(event);
        else
            this.handleInputChange(event);
    }

    setControlValue(e, isValid) {
        this.isInvalid = !isValid;
        let value = this.input.value;
        let controlValue = '';
        if (!this.isInvalid)
            controlValue = this.getUnmaskedValue()
        this.formControl.setValue(controlValue);
        this.input.value = value;
        if (!isValid)
        this.onFocus(e);
    }

    handleInputChange(event) {
        setTimeout(() => {
            var pos = this.checkVal(true);
            this.caret(pos);
            this.updateModel(event);
            this.setControlValue(event, this.isCompleted());
        }, 0);
    }

    getUnmaskedValue() {
        let unmaskedBuffer = [];
        for (let i = 0; i < this.buffer.length; i++) {
            let c = this.buffer[i];
            if (this.tests[i] && c != this.getPlaceholder(i)) {
                unmaskedBuffer.push(c);
            }
        }

        return unmaskedBuffer.join('');
    }

    updateModel(e) {
    }

    updateFilledState() {
        this.filled = this.input && this.input.value != '';
    }

    onDestroy() {
        let eventCount = this.eventListeners.length;
        for (var i = 0; i < eventCount; i++) {
            this.eventListeners[0]();
            this.eventListeners.splice(0, 1);
        }
        this.eventListeners = [];
    }
}