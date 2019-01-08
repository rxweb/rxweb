import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { OneOfCompleteComponent } from './complete/one-of-complete.component';
import { OneOfConditionalExpressionComponent } from './conditionalExpression/one-of-conditional-expression.component';
import { OneOfMatchValuesComponent } from './matchValues/one-of-match-values.component';
import { OneOfMessageComponent } from './message/one-of-message.component';
import { OneOfDynamicComponent } from './dynamic/one-of-dynamic.component';
import { OneOfAddComponent } from './add/one-of-add.component';

@NgModule({
  declarations: [
	OneOfCompleteComponent,
	OneOfConditionalExpressionComponent,
	OneOfMatchValuesComponent,
	OneOfMessageComponent,
	OneOfDynamicComponent,
	OneOfAddComponent,
  ],
entryComponents: [
	OneOfCompleteComponent,
	OneOfConditionalExpressionComponent,
	OneOfMatchValuesComponent,
	OneOfMessageComponent,
	OneOfDynamicComponent,
	OneOfAddComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	OneOfCompleteComponent,
	OneOfConditionalExpressionComponent,
	OneOfMatchValuesComponent,
	OneOfMessageComponent,
	OneOfDynamicComponent,
	OneOfAddComponent,
  ],

})
export class  OneOfDecoratorsExtendedModule { }
