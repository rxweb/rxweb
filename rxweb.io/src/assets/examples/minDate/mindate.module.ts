import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinDateCompleteComponent } from './complete/min-date-complete.component';
import { MinDateValueComponent } from './value/min-date-value.component';
import { MinDateConditionalExpressionsComponent } from './conditionalExpressions/min-date-conditional-expressions.component';
import { MinDateMessageComponent } from './message/min-date-message.component';
import { MinDateAddComponent } from './add/min-date-add.component';
import { MinDateEditComponent } from './edit/min-date-edit.component';

@NgModule({
  declarations: [
	MinDateCompleteComponent,
	MinDateValueComponent,
	MinDateConditionalExpressionsComponent,
	MinDateMessageComponent,
	MinDateAddComponent,
	MinDateEditComponent,
  ],
entryComponents: [
	MinDateCompleteComponent,
	MinDateValueComponent,
	MinDateConditionalExpressionsComponent,
	MinDateMessageComponent,
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
	MinDateConditionalExpressionsComponent,
	MinDateMessageComponent,
	MinDateAddComponent,
	MinDateEditComponent,
  ],

})
export class  MinDateExtendedModule { }
