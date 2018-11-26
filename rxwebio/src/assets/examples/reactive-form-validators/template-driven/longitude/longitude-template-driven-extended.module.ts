import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LongitudeCompleteTemplateDrivenComponent } from './complete/longitude-complete.component';
import { LongitudeConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/longitude-conditional-expression.component';
import { LongitudeMessageTemplateDrivenComponent } from './message/longitude-message.component';
import { LongitudeAddTemplateDrivenComponent } from './add/longitude-add.component';

@NgModule({
  declarations: [
	LongitudeCompleteTemplateDrivenComponent,
	LongitudeConditionalExpressionTemplateDrivenComponent,
	LongitudeMessageTemplateDrivenComponent,
	LongitudeAddTemplateDrivenComponent,
  ],
entryComponents: [
	LongitudeCompleteTemplateDrivenComponent,
	LongitudeConditionalExpressionTemplateDrivenComponent,
	LongitudeMessageTemplateDrivenComponent,
	LongitudeAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LongitudeCompleteTemplateDrivenComponent,
	LongitudeConditionalExpressionTemplateDrivenComponent,
	LongitudeMessageTemplateDrivenComponent,
	LongitudeAddTemplateDrivenComponent,
  ],

})
export class  LongitudeTemplateDrivenExtendedModule { }
