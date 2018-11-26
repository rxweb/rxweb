import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxLengthCompleteTemplateDrivenComponent } from './complete/max-length-complete.component';
import { MaxLengthValueTemplateDrivenComponent } from './value/max-length-value.component';
import { MaxLengthConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/max-length-conditional-expression.component';
import { MaxLengthMessageTemplateDrivenComponent } from './message/max-length-message.component';
import { MaxLengthAddTemplateDrivenComponent } from './add/max-length-add.component';

@NgModule({
  declarations: [
	MaxLengthCompleteTemplateDrivenComponent,
	MaxLengthValueTemplateDrivenComponent,
	MaxLengthConditionalExpressionTemplateDrivenComponent,
	MaxLengthMessageTemplateDrivenComponent,
	MaxLengthAddTemplateDrivenComponent,
  ],
entryComponents: [
	MaxLengthCompleteTemplateDrivenComponent,
	MaxLengthValueTemplateDrivenComponent,
	MaxLengthConditionalExpressionTemplateDrivenComponent,
	MaxLengthMessageTemplateDrivenComponent,
	MaxLengthAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxLengthCompleteTemplateDrivenComponent,
	MaxLengthValueTemplateDrivenComponent,
	MaxLengthConditionalExpressionTemplateDrivenComponent,
	MaxLengthMessageTemplateDrivenComponent,
	MaxLengthAddTemplateDrivenComponent,
  ],

})
export class  MaxLengthTemplateDrivenExtendedModule { }
