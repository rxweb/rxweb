import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AllOfCompleteComponent } from './complete/all-of-complete.component';
import { AllOfConditionalExpressionComponent } from './conditionalExpression/all-of-conditional-expression.component';
import { AllOfAddComponent } from './add/all-of-add.component';
import { AllOfMessageComponent } from './message/all-of-message.component';
import { AllOfDynamicComponent } from './dynamic/all-of-dynamic.component';
import { AllOfMatchValuesComponent } from './matchValues/all-of-match-values.component';



@NgModule({
  declarations: [
	AllOfCompleteComponent,
	AllOfConditionalExpressionComponent,
	AllOfMatchValuesComponent,
	AllOfMessageComponent,
	AllOfDynamicComponent,
	AllOfAddComponent,
  ],
entryComponents: [
	AllOfCompleteComponent,
	AllOfConditionalExpressionComponent,
	AllOfMatchValuesComponent,
	AllOfMessageComponent,
	AllOfDynamicComponent,
	AllOfAddComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AllOfCompleteComponent,
	AllOfConditionalExpressionComponent,
	AllOfMatchValuesComponent,
	AllOfMessageComponent,
	AllOfDynamicComponent,
	AllOfAddComponent,
  ],

})
export class  AllOfDecoratorsExtendedModule { }
