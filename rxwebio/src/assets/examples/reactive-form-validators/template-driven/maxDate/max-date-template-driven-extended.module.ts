import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxDateCompleteTemplateDrivenComponent } from './complete/max-date-complete.component';
import { MaxDateValueTemplateDrivenComponent } from './value/max-date-value.component';
import { MaxDateConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/max-date-conditional-expression.component';
import { MaxDateMessageTemplateDrivenComponent } from './message/max-date-message.component';
import { MaxDateFieldNameTemplateDrivenComponent } from './fieldName/max-date-field-name.component';
import { MaxDateAddTemplateDrivenComponent } from './add/max-date-add.component';

@NgModule({
  declarations: [
	MaxDateCompleteTemplateDrivenComponent,
	MaxDateValueTemplateDrivenComponent,
	MaxDateConditionalExpressionTemplateDrivenComponent,
	MaxDateMessageTemplateDrivenComponent,
	MaxDateFieldNameTemplateDrivenComponent,
	MaxDateAddTemplateDrivenComponent,
  ],
entryComponents: [
	MaxDateCompleteTemplateDrivenComponent,
	MaxDateValueTemplateDrivenComponent,
	MaxDateConditionalExpressionTemplateDrivenComponent,
	MaxDateMessageTemplateDrivenComponent,
	MaxDateFieldNameTemplateDrivenComponent,
	MaxDateAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxDateCompleteTemplateDrivenComponent,
	MaxDateValueTemplateDrivenComponent,
	MaxDateConditionalExpressionTemplateDrivenComponent,
	MaxDateMessageTemplateDrivenComponent,
	MaxDateFieldNameTemplateDrivenComponent,
	MaxDateAddTemplateDrivenComponent,
  ],

})
export class  MaxDateTemplateDrivenExtendedModule { }
