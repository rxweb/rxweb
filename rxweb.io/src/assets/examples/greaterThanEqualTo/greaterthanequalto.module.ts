import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { GreaterThanEqualToCompleteComponent } from './complete/greater-than-equal-to-complete.component';
import { GreaterThanEqualToFieldNameComponent } from './fieldName/greater-than-equal-to-field-name.component';
import { GreaterThanEqualToConditionalExpressionComponent } from './conditionalExpression/greater-than-equal-to-conditional-expression.component';
import { GreaterThanEqualToMessageComponent } from './message/greater-than-equal-to-message.component';
import { GreaterThanEqualToAddComponent } from './add/greater-than-equal-to-add.component';
import { GreaterThanEqualToEditComponent } from './edit/greater-than-equal-to-edit.component';

@NgModule({
  declarations: [
	GreaterThanEqualToCompleteComponent,
	GreaterThanEqualToFieldNameComponent,
	GreaterThanEqualToConditionalExpressionComponent,
	GreaterThanEqualToMessageComponent,
	GreaterThanEqualToAddComponent,
	GreaterThanEqualToEditComponent,
  ],
entryComponents: [
	GreaterThanEqualToCompleteComponent,
	GreaterThanEqualToFieldNameComponent,
	GreaterThanEqualToConditionalExpressionComponent,
	GreaterThanEqualToMessageComponent,
	GreaterThanEqualToAddComponent,
	GreaterThanEqualToEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	GreaterThanEqualToCompleteComponent,
	GreaterThanEqualToFieldNameComponent,
	GreaterThanEqualToConditionalExpressionComponent,
	GreaterThanEqualToMessageComponent,
	GreaterThanEqualToAddComponent,
	GreaterThanEqualToEditComponent,
  ],

})
export class  GreaterThanEqualToExtendedModule { }
