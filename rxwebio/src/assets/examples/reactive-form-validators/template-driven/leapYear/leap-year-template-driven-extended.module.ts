import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LeapYearCompleteTemplateDrivenComponent } from './complete/leap-year-complete.component';
import { LeapYearConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/leap-year-conditional-expression.component';
import { LeapYearMessageTemplateDrivenComponent } from './message/leap-year-message.component';
import { LeapYearAddTemplateDrivenComponent } from './add/leap-year-add.component';

@NgModule({
  declarations: [
	LeapYearCompleteTemplateDrivenComponent,
	LeapYearConditionalExpressionTemplateDrivenComponent,
	LeapYearMessageTemplateDrivenComponent,
	LeapYearAddTemplateDrivenComponent,
  ],
entryComponents: [
	LeapYearCompleteTemplateDrivenComponent,
	LeapYearConditionalExpressionTemplateDrivenComponent,
	LeapYearMessageTemplateDrivenComponent,
	LeapYearAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LeapYearCompleteTemplateDrivenComponent,
	LeapYearConditionalExpressionTemplateDrivenComponent,
	LeapYearMessageTemplateDrivenComponent,
	LeapYearAddTemplateDrivenComponent,
  ],

})
export class  LeapYearTemplateDrivenExtendedModule { }
