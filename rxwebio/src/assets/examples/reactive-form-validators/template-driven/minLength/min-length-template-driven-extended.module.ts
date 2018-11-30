import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinLengthCompleteTemplateDrivenComponent } from './complete/min-length-complete.component';
import { MinLengthValueTemplateDrivenComponent } from './value/min-length-value.component';
import { MinLengthMessageTemplateDrivenComponent } from './message/min-length-message.component';
import { MinLengthConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/min-length-conditional-expression.component';
import { MinLengthAddTemplateDrivenComponent } from './add/min-length-add.component';

@NgModule({
  declarations: [
	MinLengthCompleteTemplateDrivenComponent,
	MinLengthValueTemplateDrivenComponent,
	MinLengthMessageTemplateDrivenComponent,
	MinLengthConditionalExpressionTemplateDrivenComponent,
	MinLengthAddTemplateDrivenComponent,
  ],
entryComponents: [
	MinLengthCompleteTemplateDrivenComponent,
	MinLengthValueTemplateDrivenComponent,
	MinLengthMessageTemplateDrivenComponent,
	MinLengthConditionalExpressionTemplateDrivenComponent,
	MinLengthAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinLengthCompleteTemplateDrivenComponent,
	MinLengthValueTemplateDrivenComponent,
	MinLengthMessageTemplateDrivenComponent,
	MinLengthConditionalExpressionTemplateDrivenComponent,
	MinLengthAddTemplateDrivenComponent,
  ],

})
export class  MinLengthTemplateDrivenExtendedModule { }
