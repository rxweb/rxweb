import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinDateCompleteComponent } from './complete/min-date-complete.component';
import { MinDateValueComponent } from './value/min-date-value.component';
import { MinDateConditionalExpressionComponent } from './conditionalExpression/min-date-conditional-expression.component';
import { MinDateMessageComponent } from './message/min-date-message.component';
import { MinDateDynamicComponent } from './dynamic/min-date-dynamic.component';
import { MinDateAddComponent } from './add/min-date-add.component';
import { MinDateEditComponent } from './edit/min-date-edit.component';

@NgModule({
  declarations: [
	MinDateCompleteComponent,
	MinDateValueComponent,
	MinDateConditionalExpressionComponent,
	MinDateMessageComponent,
	MinDateDynamicComponent,
	MinDateAddComponent,
	MinDateEditComponent,
  ],
entryComponents: [
	MinDateCompleteComponent,
	MinDateValueComponent,
	MinDateConditionalExpressionComponent,
	MinDateMessageComponent,
	MinDateDynamicComponent,
	MinDateAddComponent,
	MinDateEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinDateCompleteComponent,
	MinDateValueComponent,
	MinDateConditionalExpressionComponent,
	MinDateMessageComponent,
	MinDateDynamicComponent,
	MinDateAddComponent,
	MinDateEditComponent,
  ],

})
export class  MinDateExtendedModule { }
