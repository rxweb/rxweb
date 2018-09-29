import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { TimeCompleteComponent } from './complete/time-complete.component';
import { TimeConditionalExpressionsComponent } from './conditionalExpressions/time-conditional-expressions.component';
import { TimeAllowSecondsComponent } from './allowSeconds/time-allow-seconds.component';
import { TimeMessageComponent } from './message/time-message.component';
import { TimeAddComponent } from './add/time-add.component';
import { TimeEditComponent } from './edit/time-edit.component';

@NgModule({
  declarations: [
	TimeCompleteComponent,
	TimeConditionalExpressionsComponent,
	TimeAllowSecondsComponent,
	TimeMessageComponent,
	TimeAddComponent,
	TimeEditComponent,
  ],
entryComponents: [
	TimeCompleteComponent,
	TimeConditionalExpressionsComponent,
	TimeAllowSecondsComponent,
	TimeMessageComponent,
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
	TimeConditionalExpressionsComponent,
	TimeAllowSecondsComponent,
	TimeMessageComponent,
	TimeAddComponent,
	TimeEditComponent,
  ],

})
export class  TimeExtendedModule { }
