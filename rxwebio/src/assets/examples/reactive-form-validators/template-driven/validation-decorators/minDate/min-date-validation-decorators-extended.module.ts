import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinDateCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/min-date-complete.component';
import { MinDateValueTemplateDrivenValidationDecoratorsComponent } from './value/min-date-value.component';
import { MinDateConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/min-date-conditional-expression.component';
import { MinDateMessageTemplateDrivenValidationDecoratorsComponent } from './message/min-date-message.component';
import { MinDateFieldNameTemplateDrivenValidationDecoratorsComponent } from './fieldName/min-date-field-name.component';
import { MinDateOperatorTemplateDrivenValidationDecoratorsComponent } from './operator/min-date-operator.component';
import { MinDateAddTemplateDrivenValidationDecoratorsComponent } from './add/min-date-add.component';

@NgModule({
  declarations: [
	MinDateCompleteTemplateDrivenValidationDecoratorsComponent,
	MinDateValueTemplateDrivenValidationDecoratorsComponent,
	MinDateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MinDateMessageTemplateDrivenValidationDecoratorsComponent,
	MinDateFieldNameTemplateDrivenValidationDecoratorsComponent,
	MinDateOperatorTemplateDrivenValidationDecoratorsComponent,
	MinDateAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	MinDateCompleteTemplateDrivenValidationDecoratorsComponent,
	MinDateValueTemplateDrivenValidationDecoratorsComponent,
	MinDateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MinDateMessageTemplateDrivenValidationDecoratorsComponent,
	MinDateFieldNameTemplateDrivenValidationDecoratorsComponent,
	MinDateOperatorTemplateDrivenValidationDecoratorsComponent,
	MinDateAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinDateCompleteTemplateDrivenValidationDecoratorsComponent,
	MinDateValueTemplateDrivenValidationDecoratorsComponent,
	MinDateConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	MinDateMessageTemplateDrivenValidationDecoratorsComponent,
	MinDateFieldNameTemplateDrivenValidationDecoratorsComponent,
	MinDateOperatorTemplateDrivenValidationDecoratorsComponent,
	MinDateAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  MinDateTemplateDrivenValidationDecoratorsExtendedModule { }
