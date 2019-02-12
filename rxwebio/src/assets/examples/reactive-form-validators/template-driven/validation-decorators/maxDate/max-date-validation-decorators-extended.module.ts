import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxDateCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/max-date-complete.component';
import { MaxDateValueTemplateDrivenValidationDecoratorsComponent } from './value/max-date-value.component';
import { MaxDateConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/max-date-conditional-expression.component';
import { MaxDateMessageTemplateDrivenValidationDecoratorsComponent } from './message/max-date-message.component';
import { MaxDateFieldNameTemplateDrivenValidationDecoratorsComponent } from './fieldName/max-date-field-name.component';
import { MaxDateOperatorTemplateDrivenValidationDecoratorsComponent } from './operator/max-date-operator.component';
import { MaxDateAddTemplateDrivenValidationDecoratorsComponent } from './add/max-date-add.component';

@NgModule({
  declarations: [
	MaxDateCompleteTemplateDrivenValidationDecoratorsComponent,
	MaxDateValueTemplateDrivenValidationDecoratorsComponent,
	MaxDateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MaxDateMessageTemplateDrivenValidationDecoratorsComponent,
	MaxDateFieldNameTemplateDrivenValidationDecoratorsComponent,
	MaxDateOperatorTemplateDrivenValidationDecoratorsComponent,
	MaxDateAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	MaxDateCompleteTemplateDrivenValidationDecoratorsComponent,
	MaxDateValueTemplateDrivenValidationDecoratorsComponent,
	MaxDateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MaxDateMessageTemplateDrivenValidationDecoratorsComponent,
	MaxDateFieldNameTemplateDrivenValidationDecoratorsComponent,
	MaxDateOperatorTemplateDrivenValidationDecoratorsComponent,
	MaxDateAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxDateCompleteTemplateDrivenValidationDecoratorsComponent,
	MaxDateValueTemplateDrivenValidationDecoratorsComponent,
	MaxDateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MaxDateMessageTemplateDrivenValidationDecoratorsComponent,
	MaxDateFieldNameTemplateDrivenValidationDecoratorsComponent,
	MaxDateOperatorTemplateDrivenValidationDecoratorsComponent,
	MaxDateAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  MaxDateTemplateDrivenValidationDecoratorsExtendedModule { }
