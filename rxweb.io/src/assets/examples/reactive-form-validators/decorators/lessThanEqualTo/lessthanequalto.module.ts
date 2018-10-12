import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LessThanEqualToCompleteComponent } from './complete/less-than-equal-to-complete.component';
import { LessThanEqualToFieldNameComponent } from './fieldName/less-than-equal-to-field-name.component';
import { LessThanEqualToConditionalExpressionComponent } from './conditionalExpression/less-than-equal-to-conditional-expression.component';
import { LessThanEqualToMessageComponent } from './message/less-than-equal-to-message.component';
import { LessThanEqualToDynamicComponent } from './dynamic/less-than-equal-to-dynamic.component';
import { LessThanEqualToAddComponent } from './add/less-than-equal-to-add.component';
import { LessThanEqualToEditComponent } from './edit/less-than-equal-to-edit.component';

@NgModule({
  declarations: [
	LessThanEqualToCompleteComponent,
	LessThanEqualToFieldNameComponent,
	LessThanEqualToConditionalExpressionComponent,
	LessThanEqualToMessageComponent,
	LessThanEqualToDynamicComponent,
	LessThanEqualToAddComponent,
	LessThanEqualToEditComponent,
  ],
entryComponents: [
	LessThanEqualToCompleteComponent,
	LessThanEqualToFieldNameComponent,
	LessThanEqualToConditionalExpressionComponent,
	LessThanEqualToMessageComponent,
	LessThanEqualToDynamicComponent,
	LessThanEqualToAddComponent,
	LessThanEqualToEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LessThanEqualToCompleteComponent,
	LessThanEqualToFieldNameComponent,
	LessThanEqualToConditionalExpressionComponent,
	LessThanEqualToMessageComponent,
	LessThanEqualToDynamicComponent,
	LessThanEqualToAddComponent,
	LessThanEqualToEditComponent,
  ],

})
export class  LessThanEqualToExtendedModule { }
