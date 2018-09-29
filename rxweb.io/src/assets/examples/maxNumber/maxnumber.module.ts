import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaxNumberCompleteComponent } from './complete/max-number-complete.component';
import { MaxNumberValueComponent } from './value/max-number-value.component';
import { MaxNumberConditionalExpressionsComponent } from './conditionalExpressions/max-number-conditional-expressions.component';
import { MaxNumberMessageComponent } from './message/max-number-message.component';
import { MaxNumberAddComponent } from './add/max-number-add.component';
import { MaxNumberEditComponent } from './edit/max-number-edit.component';

@NgModule({
  declarations: [
	MaxNumberCompleteComponent,
	MaxNumberValueComponent,
	MaxNumberConditionalExpressionsComponent,
	MaxNumberMessageComponent,
	MaxNumberAddComponent,
	MaxNumberEditComponent,
  ],
entryComponents: [
	MaxNumberCompleteComponent,
	MaxNumberValueComponent,
	MaxNumberConditionalExpressionsComponent,
	MaxNumberMessageComponent,
	MaxNumberAddComponent,
	MaxNumberEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MaxNumberCompleteComponent,
	MaxNumberValueComponent,
	MaxNumberConditionalExpressionsComponent,
	MaxNumberMessageComponent,
	MaxNumberAddComponent,
	MaxNumberEditComponent,
  ],

})
export class  MaxNumberExtendedModule { }
