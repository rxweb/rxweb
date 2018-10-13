import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MacCompleteComponent } from './complete/mac-complete.component';
import { MacConditionalExpressionComponent } from './conditionalExpression/mac-conditional-expression.component';
import { MacMessageComponent } from './message/mac-message.component';
import { MacDynamicComponent } from './dynamic/mac-dynamic.component';
import { MacAddComponent } from './add/mac-add.component';
import { MacEditComponent } from './edit/mac-edit.component';

@NgModule({
  declarations: [
	MacCompleteComponent,
	MacConditionalExpressionComponent,
	MacMessageComponent,
	MacDynamicComponent,
	MacAddComponent,
	MacEditComponent,
  ],
entryComponents: [
	MacCompleteComponent,
	MacConditionalExpressionComponent,
	MacMessageComponent,
	MacDynamicComponent,
	MacAddComponent,
	MacEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MacCompleteComponent,
	MacConditionalExpressionComponent,
	MacMessageComponent,
	MacDynamicComponent,
	MacAddComponent,
	MacEditComponent,
  ],

})
export class  MacExtendedModule { }
