import { Directive, Input, ElementRef, forwardRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, FormControl } from '@angular/forms';
import { APP_VALIDATORS } from '../../const/app-validators.const';
import { BaseValidator } from './base-validator.directive';
import {
     ELEMENT_VALUE, BLUR, FOCUS, BLANK
} from "../../const";
import { TEMPLATE_VALIDATION_CONFIG,CONDITIONAL_VALIDATOR,VALIDATOR_CONFIG  } from '../../const/app.const'
import { ApplicationUtil } from '../../util/app-util';
import { DecimalProvider } from "../../domain/element-processor/decimal.provider"
import { AlphaConfig, ArrayConfig, BaseConfig, ChoiceConfig, CompareConfig, ComposeConfig, ContainsConfig, CreditCardConfig, DateConfig, DefaultConfig, DigitConfig, EmailConfig, ExtensionConfig, FactorConfig, MessageConfig, NumberConfig, NumericConfig, PasswordConfig, RangeConfig, RequiredConfig, RuleConfig, SizeConfig, TimeConfig, DifferentConfig, RelationalOperatorConfig, UniqueConfig } from '../../models/config'
import { RegexValidator } from '../../util';
import { RxFormControl } from "../../services/form-control";
import { MaskProvider } from '../../domain/element-processor/mask.provider';


const NGMODEL_BINDING: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => RxFormControlDirective),
    multi: true
};

const ALLOW_VALIDATOR_WITHOUT_CONFIG = ['required', 'notEmpty', 'alpha', 'alphaNumeric', 'ascii', 'dataUri', 'digit', 'email', 'even', 'hexColor', 'json', 'latitude', 'latLong', 'leapYear', 'longitude', 'lowerCase', 'mac', 'odd', 'port', 'primeNumber', 'time', 'upperCase', 'url', 'unique','cusip','gird'];
const NUMERIC:string = "numeric";
const IS_FORMAT:string = "isFormat";
const DIGITS_INFO: string = "digitsInfo";
@Directive({
    selector: '[ngModel],[formControlName],[formControl]',
    providers: [NGMODEL_BINDING],
})
export class RxFormControlDirective extends BaseValidator implements OnInit, OnDestroy, Validator {
    private eventListeners: any[] = [];
    private isNumericSubscribed: boolean = false;
    private isFocusCalled: boolean = false;
    private isMasked: boolean = false;

    
    set validationControls(value: { [key: string]: FormControl }) {
        this.controls = value;
    }

    get validationControls() {
        return this.controls;
    }

    @Input() alpha: AlphaConfig;
    @Input() alphaNumeric: AlphaConfig;
    @Input() ascii: BaseConfig;
    @Input() compare: CompareConfig;
    @Input() compose: ComposeConfig;
    @Input() contains: ContainsConfig;
    @Input() creditCard: CreditCardConfig;
    @Input() dataUri: BaseConfig;
    @Input() different: DifferentConfig;
    @Input() digit: DigitConfig;
    @Input() email: EmailConfig;
    @Input() endsWith: DefaultConfig;
    @Input() even: BaseConfig;
    @Input() extension: ExtensionConfig;
    @Input() factor: FactorConfig;
    @Input() fileSize: SizeConfig;
    @Input() greaterThanEqualTo: RelationalOperatorConfig;
    @Input() greaterThan: RelationalOperatorConfig;
    @Input() hexColor: MessageConfig;
    @Input() json: DefaultConfig;
    @Input() latitude: BaseConfig;
    @Input() latLong: BaseConfig;
    @Input() leapYear: BaseConfig;
    @Input() lessThan: RelationalOperatorConfig;
    @Input() lessThanEqualTo: RelationalOperatorConfig;
    @Input() longitude: BaseConfig;
    @Input() lowerCase: MessageConfig;
    @Input() mac: BaseConfig;
    @Input() maxDate: DateConfig;
    @Input() maxLength: NumberConfig;
    @Input() maxNumber: NumberConfig;
    @Input() minDate: DateConfig;
    @Input() minLength: NumberConfig;
    @Input() minNumber: NumberConfig;
    @Input() numeric: NumericConfig;
    @Input() odd: BaseConfig;
    @Input() password: PasswordConfig;
    @Input() port: BaseConfig;
    @Input() primeNumber: BaseConfig;
    @Input() required: RequiredConfig;
    @Input() range: RangeConfig;
    @Input() rule: RuleConfig;
    @Input() startsWith: DefaultConfig;
    @Input() time: TimeConfig;
    @Input() upperCase: MessageConfig;
    @Input() url: DefaultConfig;
    @Input() unique: UniqueConfig;
    @Input() notEmpty: BaseConfig;
    @Input() cusip: BaseConfig;
    @Input() grid: BaseConfig;
    @Input() date:BaseConfig;



    constructor(private elementRef: ElementRef,
        private renderer: Renderer2, private decimalProvider: DecimalProvider) {
        super();
        this.element = elementRef.nativeElement as Node;
        this.setEventName();
    }

    ngOnInit() {
        let validators = [];
        Object.keys(APP_VALIDATORS).forEach(validatorName => {
            if ((this[validatorName]) || (ALLOW_VALIDATOR_WITHOUT_CONFIG.indexOf(validatorName) != -1 && this[validatorName] == BLANK)) {
                validators.push(APP_VALIDATORS[validatorName](this[validatorName]));
                if (this.name && !(this.formControlName && this.formControl)) {
                    ApplicationUtil.configureControl(this.controlConfig, this[validatorName], validatorName);
                }

            }
        })
        if (validators.length > 0)
            this.validators = validators
        if (this.numeric && (this.numeric.isFormat || this.numeric.digitsInfo)) {
            this.bindNumericElementEvent();
        }
        
    }


    blurEvent(){
        if (!(this.formControl && this.formControl.errors && this.formControl.errors.numeric)) {
            if (this.formControl.value !== null && this.formControl.value !== undefined) {
                let value = this.decimalProvider.transFormDecimal(this.formControl.value, this.numeric.digitsInfo);
                value = (!this.numeric.isFormat) ? this.decimalProvider.replacer(value) : value;
                this.setValueOnElement(value);
            }
            this.isFocusCalled = false;
        }
    }

    bindNumericElementEvent(config?: NumericConfig) {
        if (config)
            this.numeric = config;
        let listener = this.renderer.listen(this.element, BLUR, this.blurEvent.bind(this));
        this.eventListeners.push(listener)
        listener = this.renderer.listen(this.element, FOCUS, (event) => {
            this.isFocusCalled = true;
            if (!(this.formControl && this.formControl.errors && this.formControl.errors.numeric) && this.formControl.value != null) {
                let value = this.decimalProvider.replacer(this.element.value);
                this.setValueOnElement(value);
            }
        });
        this.eventListeners.push(listener)
    }

    bindValueChangeEvent() {
        if (this.eventName != BLANK) {
            let listener = this.renderer.listen(this.element, this.eventName, () => {
                Object.keys(this.validationControls).forEach(fieldName => {
                    this.validationControls[fieldName].updateValueAndValidity();
                })
            });
            this.eventListeners.push(listener);
        }
    }

    subscribeNumericFormatter() {
        if (this.formControl[VALIDATOR_CONFIG] && this.formControl[VALIDATOR_CONFIG][NUMERIC] && (this.formControl[VALIDATOR_CONFIG][NUMERIC][IS_FORMAT] || this.formControl[VALIDATOR_CONFIG][NUMERIC][DIGITS_INFO])) {
            if(!this.isNumericSubscribed){
                this.bindNumericElementEvent(this.formControl[VALIDATOR_CONFIG][NUMERIC]);
                this.isNumericSubscribed = true;
            }
            if(!this.isFocusCalled && RegexValidator.isNotBlank(this.formControl.value)){
                this.blurEvent();
            }
        }
        
    }

    subscribeMaskValidator() {
        if (this.formControl[VALIDATOR_CONFIG] && this.formControl[VALIDATOR_CONFIG]["mask"] && !this.isMasked) {
            let config = this.formControl[VALIDATOR_CONFIG]["mask"];
            this.maskProvider = new MaskProvider(this.element, config.mask, this.renderer, this.formControl as FormControl, config);
            this.isMasked = true;
        }
    }

    private setValueOnElement(value: any) {
        this.renderer.setProperty(this.element, ELEMENT_VALUE, value);
    }

    private setTemplateValidators(control:AbstractControl){
        for(let validatorName in control[VALIDATOR_CONFIG])
        {
            this[validatorName] = control[VALIDATOR_CONFIG][validatorName];
        }
        delete control[TEMPLATE_VALIDATION_CONFIG];
        delete control[VALIDATOR_CONFIG]
        this.ngOnInit();
    }

    private updateOnElementClass(element: HTMLElement) {
        var previousClassName: string = '';
        return function (className: string) {
            if (previousClassName)
                element.classList.remove(previousClassName);
            if (className)
                element.classList.add(className)
            previousClassName = className;
        }
    }
    
    private setValidatorConfig(control:AbstractControl){
        if (!this.formControl) { 
            this.formControl = control;
            let rxFormControl = this.formControl as RxFormControl;
            if (rxFormControl.updateOnElementClass)
                rxFormControl.updateOnElementClass = this.updateOnElementClass(this.element);
        }
        
        this.subscribeMaskValidator();
        this.subscribeNumericFormatter();
    if(control[TEMPLATE_VALIDATION_CONFIG])
        this.setTemplateValidators(control);
    if (control[CONDITIONAL_VALIDATOR]) {
        this.conditionalValidator = control[CONDITIONAL_VALIDATOR];
        delete control[CONDITIONAL_VALIDATOR];
    }

    }

    validate(control: AbstractControl): { [key: string]: any } {
        this.setValidatorConfig(control);
        if (this.conditionalValidator)
            this.conditionalValidator(control);
        if (!this.isProcessed)
            this.setModelConfig(control);
        return ((this.validators && this.validators.length > 0) || this.maskProvider) ? this.validation(control) : null;
    }

    ngOnDestroy() {
        this.controls = undefined;
        let eventCount = this.eventListeners.length;
        for (var i = 0; i < eventCount; i++) {
            this.eventListeners[0]();
            this.eventListeners.splice(0, 1);
        }
        this.eventListeners = [];
        if (this.maskProvider)
            this.maskProvider.onDestroy();
    }
}
