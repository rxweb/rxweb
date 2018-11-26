import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { TimeCompleteTemplateDrivenComponent } from './complete/time-complete.component';
import { TimeConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/time-conditional-expression.component';
import { TimeAllowSecondsTemplateDrivenComponent } from './allowSeconds/time-allow-seconds.component';
import { TimeMessageTemplateDrivenComponent } from './message/time-message.component';
import { TimeAddTemplateDrivenComponent } from './add/time-add.component';

@NgModule({
  declarations: [
	TimeCompleteTemplateDrivenComponent,
	TimeConditionalExpressionTemplateDrivenComponent,
	TimeAllowSecondsTemplateDrivenComponent,
	TimeMessageTemplateDrivenComponent,
	TimeAddTemplateDrivenComponent,
  ],
entryComponents: [
	TimeCompleteTemplateDrivenComponent,
	TimeConditionalExpressionTemplateDrivenComponent,
	TimeAllowSecondsTemplateDrivenComponent,
	TimeMessageTemplateDrivenComponent,
	TimeAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	TimeCompleteTemplateDrivenComponent,
	TimeConditionalExpressionTemplateDrivenComponent,
	TimeAllowSecondsTemplateDrivenComponent,
	TimeMessageTemplateDrivenComponent,
	TimeAddTemplateDrivenComponent,
  ],

})
export class  TimeTemplateDrivenExtendedModule { }
