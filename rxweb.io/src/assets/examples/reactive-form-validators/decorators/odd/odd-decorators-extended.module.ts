import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { OddCompleteComponent } from './complete/odd-complete.component';
import { OddConditionalExpressionComponent } from './conditionalExpression/odd-conditional-expression.component';
import { OddMessageComponent } from './message/odd-message.component';
import { OddDynamicComponent } from './dynamic/odd-dynamic.component';
import { OddAddComponent } from './add/odd-add.component';
import { OddEditComponent } from './edit/odd-edit.component';

@NgModule({
  declarations: [
	OddCompleteComponent,
	OddConditionalExpressionComponent,
	OddMessageComponent,
	OddDynamicComponent,
	OddAddComponent,
	OddEditComponent,
  ],
entryComponents: [
	OddCompleteComponent,
	OddConditionalExpressionComponent,
	OddMessageComponent,
	OddDynamicComponent,
	OddAddComponent,
	OddEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	OddCompleteComponent,
	OddConditionalExpressionComponent,
	OddMessageComponent,
	OddDynamicComponent,
	OddAddComponent,
	OddEditComponent,
  ],

})
export class  OddDecoratorsExtendedModule { }
