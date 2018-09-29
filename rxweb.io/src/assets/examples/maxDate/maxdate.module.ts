import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxDateCompleteComponent } from './complete/max-date-complete.component';
import { MaxDateValueComponent } from './value/max-date-value.component';
import { MaxDateConditionalExpressionsComponent } from './conditionalExpressions/max-date-conditional-expressions.component';
import { MaxDateMessageComponent } from './message/max-date-message.component';
import { MaxDateAddComponent } from './add/max-date-add.component';
import { MaxDateEditComponent } from './edit/max-date-edit.component';

@NgModule({
  declarations: [
	MaxDateCompleteComponent,
	MaxDateValueComponent,
	MaxDateConditionalExpressionsComponent,
	MaxDateMessageComponent,
	MaxDateAddComponent,
	MaxDateEditComponent,
  ],
entryComponents: [
	MaxDateCompleteComponent,
	MaxDateValueComponent,
	MaxDateConditionalExpressionsComponent,
	MaxDateMessageComponent,
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
	MaxDateConditionalExpressionsComponent,
	MaxDateMessageComponent,
	MaxDateAddComponent,
	MaxDateEditComponent,
  ],

})
export class  MaxDateExtendedModule { }
