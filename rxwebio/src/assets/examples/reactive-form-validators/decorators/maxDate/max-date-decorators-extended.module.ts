import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxDateCompleteComponent } from './complete/max-date-complete.component';
import { MaxDateValueComponent } from './value/max-date-value.component';
import { MaxDateConditionalExpressionComponent } from './conditionalExpression/max-date-conditional-expression.component';
import { MaxDateMessageComponent } from './message/max-date-message.component';
import { MaxDateFieldNameComponent } from './fieldName/max-date-field-name.component';
import { MaxDateOperatorComponent } from './operator/max-date-operator.component';
import { MaxDateDynamicComponent } from './dynamic/max-date-dynamic.component';
import { MaxDateAddComponent } from './add/max-date-add.component';
import { MaxDateEditComponent } from './edit/max-date-edit.component';

@NgModule({
  declarations: [
	MaxDateCompleteComponent,
	MaxDateValueComponent,
	MaxDateConditionalExpressionComponent,
	MaxDateMessageComponent,
	MaxDateFieldNameComponent,
	MaxDateOperatorComponent,
	MaxDateDynamicComponent,
	MaxDateAddComponent,
	MaxDateEditComponent,
  ],
entryComponents: [
	MaxDateCompleteComponent,
	MaxDateValueComponent,
	MaxDateConditionalExpressionComponent,
	MaxDateMessageComponent,
	MaxDateFieldNameComponent,
	MaxDateOperatorComponent,
	MaxDateDynamicComponent,
	MaxDateAddComponent,
	MaxDateEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxDateCompleteComponent,
	MaxDateValueComponent,
	MaxDateConditionalExpressionComponent,
	MaxDateMessageComponent,
	MaxDateFieldNameComponent,
	MaxDateOperatorComponent,
	MaxDateDynamicComponent,
	MaxDateAddComponent,
	MaxDateEditComponent,
  ],

})
export class  MaxDateDecoratorsExtendedModule { }
