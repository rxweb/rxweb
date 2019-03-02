import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DateCompleteComponent } from './complete/date-complete.component';
import { DateConditionalExpressionComponent } from './conditionalExpression/date-conditional-expression.component';
import { DateMessageComponent } from './message/date-message.component';
import { DateDynamicComponent } from './dynamic/date-dynamic.component';
import { DateAddComponent } from './add/date-add.component';
import { DateEditComponent } from './edit/date-edit.component';

@NgModule({
  declarations: [
	DateCompleteComponent,
	DateConditionalExpressionComponent,
	DateMessageComponent,
	DateDynamicComponent,
	DateAddComponent,
	DateEditComponent,
  ],
entryComponents: [
	DateCompleteComponent,
	DateConditionalExpressionComponent,
	DateMessageComponent,
	DateDynamicComponent,
	DateAddComponent,
	DateEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	DateCompleteComponent,
	DateConditionalExpressionComponent,
	DateMessageComponent,
	DateDynamicComponent,
	DateAddComponent,
	DateEditComponent,
  ],

})
export class  DateDecoratorsExtendedModule { }
