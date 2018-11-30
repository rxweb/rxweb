import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LessThanCompleteTemplateDrivenComponent } from './complete/less-than-complete.component';
import { LessThanFieldNameTemplateDrivenComponent } from './fieldName/less-than-field-name.component';
import { LessThanConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/less-than-conditional-expression.component';
import { LessThanMessageTemplateDrivenComponent } from './message/less-than-message.component';
import { LessThanAddTemplateDrivenComponent } from './add/less-than-add.component';

@NgModule({
  declarations: [
	LessThanCompleteTemplateDrivenComponent,
	LessThanFieldNameTemplateDrivenComponent,
	LessThanConditionalExpressionTemplateDrivenComponent,
	LessThanMessageTemplateDrivenComponent,
	LessThanAddTemplateDrivenComponent,
  ],
entryComponents: [
	LessThanCompleteTemplateDrivenComponent,
	LessThanFieldNameTemplateDrivenComponent,
	LessThanConditionalExpressionTemplateDrivenComponent,
	LessThanMessageTemplateDrivenComponent,
	LessThanAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LessThanCompleteTemplateDrivenComponent,
	LessThanFieldNameTemplateDrivenComponent,
	LessThanConditionalExpressionTemplateDrivenComponent,
	LessThanMessageTemplateDrivenComponent,
	LessThanAddTemplateDrivenComponent,
  ],

})
export class  LessThanTemplateDrivenExtendedModule { }
