import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LeapYearCompleteComponent } from './complete/leap-year-complete.component';
import { LeapYearConditionalExpressionComponent } from './conditionalExpression/leap-year-conditional-expression.component';
import { LeapYearMessageComponent } from './message/leap-year-message.component';
import { LeapYearDynamicComponent } from './dynamic/leap-year-dynamic.component';
import { LeapYearAddComponent } from './add/leap-year-add.component';
import { LeapYearEditComponent } from './edit/leap-year-edit.component';

@NgModule({
  declarations: [
	LeapYearCompleteComponent,
	LeapYearConditionalExpressionComponent,
	LeapYearMessageComponent,
	LeapYearDynamicComponent,
	LeapYearAddComponent,
	LeapYearEditComponent,
  ],
entryComponents: [
	LeapYearCompleteComponent,
	LeapYearConditionalExpressionComponent,
	LeapYearMessageComponent,
	LeapYearDynamicComponent,
	LeapYearAddComponent,
	LeapYearEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LeapYearCompleteComponent,
	LeapYearConditionalExpressionComponent,
	LeapYearMessageComponent,
	LeapYearDynamicComponent,
	LeapYearAddComponent,
	LeapYearEditComponent,
  ],

})
export class  LeapYearExtendedModule { }
