import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { TimeCompleteComponent } from './complete/time-complete.component';
import { TimeConditionalExpressionComponent } from './conditionalExpression/time-conditional-expression.component';
import { TimeAllowSecondsComponent } from './allowSeconds/time-allow-seconds.component';
import { TimeMessageComponent } from './message/time-message.component';
import { TimeDynamicComponent } from './dynamic/time-dynamic.component';
import { TimeAddComponent } from './add/time-add.component';
import { TimeEditComponent } from './edit/time-edit.component';

@NgModule({
  declarations: [
	TimeCompleteComponent,
	TimeConditionalExpressionComponent,
	TimeAllowSecondsComponent,
	TimeMessageComponent,
	TimeDynamicComponent,
	TimeAddComponent,
	TimeEditComponent,
  ],
entryComponents: [
	TimeCompleteComponent,
	TimeConditionalExpressionComponent,
	TimeAllowSecondsComponent,
	TimeMessageComponent,
	TimeDynamicComponent,
	TimeAddComponent,
	TimeEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	TimeCompleteComponent,
	TimeConditionalExpressionComponent,
	TimeAllowSecondsComponent,
	TimeMessageComponent,
	TimeDynamicComponent,
	TimeAddComponent,
	TimeEditComponent,
  ],

})
export class  TimeExtendedModule { }
