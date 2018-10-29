import { Directive, Input,ElementRef,Renderer, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';

import { APP_VALIDATORS} from '../../const/app-validators.const';
import { BaseValidator } from './base-validator.directive';
import {AlphaConfig,ArrayConfig,BaseConfig,ChoiceConfig,CompareConfig,ComposeConfig,ContainsConfig,CreditCardConfig,DateConfig,DefaultConfig,DigitConfig,EmailConfig,ExtensionConfig,FactorConfig,FieldConfig,HexColorConfig,MessageConfig,NumberConfig,NumericConfig,PasswordConfig,PatternConfig,RangeConfig,RequiredConfig,RuleConfig,SizeConfig,TimeConfig ,DifferentConfig,RelationalOperatorConfig } from '../../models/config'
const COMPOSE:string = 'compose';
const NGMODEL_BINDING: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NgModelDirective),
  multi: true
};

@Directive({
  selector: '[ngModel]:not([formControlName]):not([formControl])',
  providers: [NGMODEL_BINDING]
})
export class NgModelDirective extends BaseValidator implements OnInit {
  element: Node;
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
  @Input() minNumber:ArrayConfig;
  @Input() noneOf:NumericConfig;
  @Input() numeric:BaseConfig;
  @Input() odd:ArrayConfig;
  @Input() oneOf:PasswordConfig;
  @Input() password:PatternConfig;
  @Input() pattern:BaseConfig;
  @Input() port:BaseConfig;
  @Input() primeNumber:RangeConfig;
  @Input() required:RequiredConfig;
  @Input() range:RangeConfig;
  @Input() rule:RuleConfig;
  @Input() startsWith:DefaultConfig;
  @Input() time:TimeConfig;
  @Input() upperCase:MessageConfig;
  @Input() url:DefaultConfig;

  @Input() name;
  constructor(private elementRef: ElementRef,
        private renderer: Renderer){
        super();
        this.element = elementRef.nativeElement as Node;
    }

  ngOnInit() {
      let validators = [];
      Object.keys(APP_VALIDATORS).forEach(validatorName=>{
        if((validatorName != COMPOSE && this[validatorName]) || (['required','alpha','aphaNumeric','ascii','dataUri','digit','email','even','hexColor','json','latitude','latLong','leapYear','longitude','lowerCase','mac','odd','port','primeNumber','time','upperCase','url'].indexOf(validatorName) != -1 && this[validatorName] == ''))
          validators.push(APP_VALIDATORS[validatorName](this[validatorName]));
      })
      if(validators.length > 0)
        this.validator = APP_VALIDATORS[COMPOSE]({validators:validators})
  }
}
