import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AsciiCompleteComponent } from './complete/ascii-complete.component';
import { AsciiConditionalExpressionComponent } from './conditionalExpression/ascii-conditional-expression.component';
import { AsciiMessageComponent } from './message/ascii-message.component';
import { AsciiDynamicComponent } from './dynamic/ascii-dynamic.component';
import { AsciiAddComponent } from './add/ascii-add.component';
import { AsciiEditComponent } from './edit/ascii-edit.component';

@NgModule({
  declarations: [
	AsciiCompleteComponent,
	AsciiConditionalExpressionComponent,
	AsciiMessageComponent,
	AsciiDynamicComponent,
	AsciiAddComponent,
	AsciiEditComponent,
  ],
entryComponents: [
	AsciiCompleteComponent,
	AsciiConditionalExpressionComponent,
	AsciiMessageComponent,
	AsciiDynamicComponent,
	AsciiAddComponent,
	AsciiEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	AsciiCompleteComponent,
	AsciiConditionalExpressionComponent,
	AsciiMessageComponent,
	AsciiDynamicComponent,
	AsciiAddComponent,
	AsciiEditComponent,
  ],

})
export class  AsciiDecoratorsExtendedModule { }
