import { Directive, Input,ElementRef,Renderer, forwardRef, OnInit,OnDestroy } from '@angular/core';
import { NG_VALIDATORS, AbstractControl,FormControl} from '@angular/forms';
import { formatNumber } from "@angular/common"
import { APP_VALIDATORS} from '../../const/app-validators.const';
import { BaseValidator } from './base-validator.directive';
import {INPUT,SELECT,CHECKBOX,TEXTAREA,KEYPRESS, ONCHANGE,ONKEYUP,ONCLICK,
RADIO,FILE, ELEMENT_VALUE,BLUR,FOCUS,CHANGE,BLANK
  } from "../../const";
import { ApplicationUtil } from '../../util/app-util';
import { DecimalProvider } from "../../domain/element-processor/decimal.provider"
import {AlphaConfig,ArrayConfig,BaseConfig,ChoiceConfig,CompareConfig,ComposeConfig,ContainsConfig,CreditCardConfig,DateConfig,DefaultConfig,DigitConfig,EmailConfig,ExtensionConfig,FactorConfig,FieldConfig,HexColorConfig,MessageConfig,NumberConfig,NumericConfig,PasswordConfig,PatternConfig,RangeConfig,RequiredConfig,RuleConfig,SizeConfig,TimeConfig ,DifferentConfig,RelationalOperatorConfig } from '../../models/config'
const COMPOSE:string = 'compose';
const NGMODEL_BINDING: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RxFormControlDirective),
  multi: true
};

const ALLOW_VALIDATOR_WITHOUT_CONFIG = ['required','alpha','alphaNumeric','ascii','dataUri','digit','email','even','hexColor','json','latitude','latLong','leapYear','longitude','lowerCase','mac','odd','port','primeNumber','time','upperCase','url'];

@Directive({
  selector: '[ngModel],[formControlName],[formControl]',
  providers: [NGMODEL_BINDING],
})
export class RxFormControlDirective extends BaseValidator implements OnInit,OnDestroy{
  private eventListeners:any[] = [];
  set validationControls(value:{[key:string]:FormControl}){
      this.controls = value;
  }

  get validationControls(){
      return this.controls;
  }

  @Input() allOf:ArrayConfig;
  @Input() alpha:AlphaConfig;
  @Input() alphaNumeric:AlphaConfig;
  @Input() ascii:BaseConfig;
  @Input() choice:ChoiceConfig;
  @Input() compare:CompareConfig;
  @Input() compose:ComposeConfig;
  @Input() contains:ContainsConfig;
  @Input() creditCard:CreditCardConfig;
  @Input() dataUri:BaseConfig;
  @Input() different:DifferentConfig;
  @Input() digit:DigitConfig;
  @Input() email:EmailConfig;
  @Input() endsWith:DefaultConfig;
  @Input() even:BaseConfig;
  @Input() extension:ExtensionConfig;
  @Input() factor:FactorConfig;
  @Input() fileSize:SizeConfig;
  @Input() greaterThanEqualTo:RelationalOperatorConfig;
  @Input() greaterThan:RelationalOperatorConfig;
  @Input() hexColor:MessageConfig;
  @Input() json:DefaultConfig;
  @Input() latitude:BaseConfig;
  @Input() latLong:BaseConfig;
  @Input() leapYear:BaseConfig;
  @Input() lessThan:RelationalOperatorConfig;
  @Input() lessThanEqualTo:RelationalOperatorConfig;
  @Input() longitude:BaseConfig;
  @Input() lowerCase:MessageConfig;
  @Input() mac:BaseConfig;
  @Input() maxDate:DateConfig;
  @Input() maxLength:NumberConfig;
  @Input() maxNumber:NumberConfig;
  @Input() minDate:DateConfig;
  @Input() minLength:NumberConfig;
  @Input() minNumber:NumberConfig;
  @Input() noneOf:ArrayConfig;
  @Input() numeric:NumericConfig;
  @Input() odd:BaseConfig;
  @Input() oneOf:ArrayConfig;
  @Input() password:PasswordConfig;
  @Input() pattern:PatternConfig;
  @Input() port:BaseConfig;
  @Input() primeNumber:BaseConfig;
  @Input() required:RequiredConfig;
  @Input() range:RangeConfig;
  @Input() rule:RuleConfig;
  @Input() startsWith:DefaultConfig;
  @Input() time:TimeConfig;
  @Input() upperCase:MessageConfig;
  @Input() url:DefaultConfig;

  
  @Input() formControl:FormControl | AbstractControl;

  constructor(private elementRef: ElementRef,
        private renderer: Renderer,private decimalProvider:DecimalProvider){
        super();
        this.element = elementRef.nativeElement as Node;
        this.setEventName();
    }

  ngOnInit() {
      let validators = [];
      Object.keys(APP_VALIDATORS).forEach(validatorName=>{
        if((this[validatorName]) || (ALLOW_VALIDATOR_WITHOUT_CONFIG.indexOf(validatorName) != -1 && this[validatorName] == BLANK)){
          validators.push(APP_VALIDATORS[validatorName](this[validatorName]));
          if(this.name && !(this.formControlName && this.formControl))
            ApplicationUtil.configureControl(this.controlConfig,this[validatorName],validatorName);
        }
      })
      if(validators.length > 0)
        this.validator = APP_VALIDATORS[COMPOSE]({validators:validators})
      if(this.numeric && this.numeric.isFormat)
          this.bindNumericElementEvent();
  }

  bindNumericElementEvent(config?:NumericConfig){
    if(config)
      this.numeric = config;
    let listener = this.renderer.listen(this.element,BLUR,(event)=> {
        if(!(this.formControl && this.formControl.errors && this.formControl.errors.numeric)) {
          let value = this.decimalProvider.transFormDecimal(this.formControl.value,this.numeric.digitsInfo);
          this.setValueOnElement(value);
        }
    });
    this.eventListeners.push(listener)
    listener = this.renderer.listen(this.element,FOCUS,(event)=> {
        if(!(this.formControl && this.formControl.errors && this.formControl.errors.numeric) && this.formControl.value != null) {
        let value = this.decimalProvider.replacer(this.formControl.value);
        this.setValueOnElement(value);
        }
    });
    this.eventListeners.push(listener)
  }

  bindValueChangeEvent(){
    if(this.eventName != BLANK){
      let listener =  this.renderer.listen(this.element,this.eventName,()=> {
              Object.keys(this.validationControls).forEach(fieldName => {
                  this.validationControls[fieldName].updateValueAndValidity();
              })
        });
       this.eventListeners.push(listener);
    }
  }

  

  private setValueOnElement(value: any) {
        this.renderer.setElementProperty(this.element, ELEMENT_VALUE, value);
  }

  ngOnDestroy(){
    this.controls = undefined;
    let eventCount = this.eventListeners.length;
    for(var i=0;i<eventCount;i++){
      this.eventListeners[0]();
      this.eventListeners.splice(0,1);
    }
    this.eventListeners = [];
  }
}
