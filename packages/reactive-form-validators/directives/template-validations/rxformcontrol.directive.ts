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

    @Input() rxalpha: AlphaConfig;
    @Input() rxalphaNumeric: AlphaConfig;
    @Input() rxascii: BaseConfig;
    @Input() rxcompare: CompareConfig;
    @Input() rxcompose: ComposeConfig;
    @Input() rxcontains: ContainsConfig;
    @Input() rxcreditCard: CreditCardConfig;
    @Input() rxdataUri: BaseConfig;
    @Input() rxdifferent: DifferentConfig;
    @Input() rxdigit: DigitConfig;
    @Input() rxemail: EmailConfig;
    @Input() rxendsWith: DefaultConfig;
    @Input() rxeven: BaseConfig;
    @Input() rxextension: ExtensionConfig;
    @Input() rxfactor: FactorConfig;
    @Input() rxfileSize: SizeConfig;
    @Input() rxgreaterThanEqualTo: RelationalOperatorConfig;
    @Input() rxgreaterThan: RelationalOperatorConfig;
    @Input() rxhexColor: MessageConfig;
    @Input() rxjson: DefaultConfig;
    @Input() rxlatitude: BaseConfig;
    @Input() rxlatLong: BaseConfig;
    @Input() rxleapYear: BaseConfig;
    @Input() rxlessThan: RelationalOperatorConfig;
    @Input() rxlessThanEqualTo: RelationalOperatorConfig;
    @Input() rxlongitude: BaseConfig;
    @Input() rxlowerCase: MessageConfig;
    @Input() rxmac: BaseConfig;
    @Input() rxmaxDate: DateConfig;
    @Input() rxmaxLength: NumberConfig;
    @Input() rxmaxNumber: NumberConfig;
    @Input() rxminDate: DateConfig;
    @Input() rxminLength: NumberConfig;
    @Input() rxminNumber: NumberConfig;
    @Input() rxnumeric: NumericConfig;
    @Input() rxodd: BaseConfig;
    @Input() rxpassword: PasswordConfig;
    @Input() rxport: BaseConfig;
    @Input() rxprimeNumber: BaseConfig;
    @Input() rxrequired: RequiredConfig;
    @Input() rxrange: RangeConfig;
    @Input() rxrule: RuleConfig;
    @Input() rxstartsWith: DefaultConfig;
    @Input() rxtime: TimeConfig;
    @Input() rxupperCase: MessageConfig;
    @Input() rxurl: DefaultConfig;
    @Input() rxunique: UniqueConfig;
    @Input() rxnotEmpty: BaseConfig;
    @Input() rxcusip: BaseConfig;
    @Input() rxgrid: BaseConfig;
    @Input() rxdate:BaseConfig;



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
        if (this.rxnumeric && (this.rxnumeric.isFormat || this.rxnumeric.digitsInfo)) {
            this.bindNumericElementEvent();
        }
        
    }


    blurEvent(){
        if (!(this.formControl && this.formControl.errors && this.formControl.errors.numeric)) {
            if (this.formControl.value !== null && this.formControl.value !== undefined) {
                let value = this.decimalProvider.transFormDecimal(this.formControl.value, this.rxnumeric.digitsInfo);
                value = (!this.rxnumeric.isFormat) ? this.decimalProvider.replacer(value) : value;
                this.setValueOnElement(value);
            }
            this.isFocusCalled = false;
        }
    }

    bindNumericElementEvent(config?: NumericConfig) {
        if (config)
            this.rxnumeric = config;
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
