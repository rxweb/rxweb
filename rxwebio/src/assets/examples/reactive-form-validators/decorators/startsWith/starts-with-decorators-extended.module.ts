import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { StartsWithCompleteComponent } from './complete/starts-with-complete.component';
import { StartsWithValueComponent } from './value/starts-with-value.component';
import { StartsWithConditionalExpressionComponent } from './conditionalExpression/starts-with-conditional-expression.component';
import { StartsWithMessageComponent } from './message/starts-with-message.component';
import { StartsWithDynamicComponent } from './dynamic/starts-with-dynamic.component';
import { StartsWithAddComponent } from './add/starts-with-add.component';
import { StartsWithEditComponent } from './edit/starts-with-edit.component';

@NgModule({
  declarations: [
	StartsWithCompleteComponent,
	StartsWithValueComponent,
	StartsWithConditionalExpressionComponent,
	StartsWithMessageComponent,
	StartsWithDynamicComponent,
	StartsWithAddComponent,
	StartsWithEditComponent,
  ],
entryComponents: [
	StartsWithCompleteComponent,
	StartsWithValueComponent,
	StartsWithConditionalExpressionComponent,
	StartsWithMessageComponent,
	StartsWithDynamicComponent,
	StartsWithAddComponent,
	StartsWithEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	StartsWithCompleteComponent,
	StartsWithValueComponent,
	StartsWithConditionalExpressionComponent,
	StartsWithMessageComponent,
	StartsWithDynamicComponent,
	StartsWithAddComponent,
	StartsWithEditComponent,
  ],

})
export class  StartsWithDecoratorsExtendedModule { }
