import { RxFormControl } from "../services/form-control";
const CHECKBOX: string = 'checkbox';
const SELECT_MULTIPLE: string = "select-multiple";
export class FormControlDirective {

    _onChange: (e) => void;
    _onBlur: (e) => void;
    constructor(private element: HTMLInputElement, private formControl: RxFormControl) {
        this.bindEvent();
        this.setValue();
        this.subscribeOnChange();
    }

    private bindEvent() {
        this._onChange = this.onChange.bind(this);
        this._onBlur = this.onBlur.bind(this);
        this.element.addEventListener("input", this._onChange);
        this.element.addEventListener("blur", this._onBlur)
    }

    private onChange(event) {
        this.formControl.setValue(event.target.value);
    }

    private onBlur(event) {
        this.formControl.markAsTouched();
    }

    private setValueOnControl() {
        this.element.value = this.formControl.value != null ? this.formControl.value : '';
    }

    private setValue() {
        let value: any = this.formControl.value === "" || this.formControl.value === undefined ? "" : this.formControl.value;
        switch (this.element.type) {
            case CHECKBOX:
                this.element.checked = value !== null && value !== false;
                break;
            default:
                this.element.value = value;
                break;
        }
    }

    subscribeOnChange() {
        this.formControl.subscribe(() => {
            if (this.element.value != this.formControl.value)
                this.setValue();
            if (this.formControl.invalid) {
                if (!this.element.classList.contains("rx-invalid"))
                    this.element.classList.add("rx-invalid")
            } else {
                if (this.element.classList.contains("rx-invalid"))
                    this.element.classList.remove("rx-invalid")
            }
        })
    }

    destroy() {
        this.formControl.destroy();
        this.element.removeEventListener("input", this._onChange);
        this.element.removeEventListener("blur", this._onBlur);
    }
}