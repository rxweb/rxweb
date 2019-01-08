import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';


import { NoneOfAddComponent } from './add/none-of-add.component';
import { NoneOfCompleteComponent } from './complete/none-of-complete.component';
import { NoneOfConditionalExpressionComponent } from './conditionalExpression/none-of-conditional-expression.component';
import { NoneOfMatchValuesComponent } from './matchValues/none-of-match-values.component';
import { NoneOfDynamicComponent } from './dynamic/none-of-dynamic.component';
import { NoneOfMessageComponent } from './message/none-of-message.component';

@NgModule({
  declarations: [
	NoneOfCompleteComponent,
	NoneOfConditionalExpressionComponent,
	NoneOfMatchValuesComponent,
	NoneOfMessageComponent,
	NoneOfDynamicComponent,
	NoneOfAddComponent,
  ],
entryComponents: [
	NoneOfCompleteComponent,
	NoneOfConditionalExpressionComponent,
	NoneOfMatchValuesComponent,
	NoneOfMessageComponent,
	NoneOfDynamicComponent,
	NoneOfAddComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	NoneOfCompleteComponent,
	NoneOfConditionalExpressionComponent,
	NoneOfMatchValuesComponent,
	NoneOfMessageComponent,
	NoneOfDynamicComponent,
	NoneOfAddComponent,
  ],

})
export class  NoneOfDecoratorsExtendedModule { }
