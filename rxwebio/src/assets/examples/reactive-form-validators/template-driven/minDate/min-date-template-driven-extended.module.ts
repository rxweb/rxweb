import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MinDateCompleteTemplateDrivenComponent } from './complete/min-date-complete.component';
import { MinDateValueTemplateDrivenComponent } from './value/min-date-value.component';
import { MinDateConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/min-date-conditional-expression.component';
import { MinDateMessageTemplateDrivenComponent } from './message/min-date-message.component';
import { MinDateAddTemplateDrivenComponent } from './add/min-date-add.component';

@NgModule({
  declarations: [
	MinDateCompleteTemplateDrivenComponent,
	MinDateValueTemplateDrivenComponent,
	MinDateConditionalExpressionTemplateDrivenComponent,
	MinDateMessageTemplateDrivenComponent,
	MinDateAddTemplateDrivenComponent,
  ],
entryComponents: [
	MinDateCompleteTemplateDrivenComponent,
	MinDateValueTemplateDrivenComponent,
	MinDateConditionalExpressionTemplateDrivenComponent,
	MinDateMessageTemplateDrivenComponent,
	MinDateAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MinDateCompleteTemplateDrivenComponent,
	MinDateValueTemplateDrivenComponent,
	MinDateConditionalExpressionTemplateDrivenComponent,
	MinDateMessageTemplateDrivenComponent,
	MinDateAddTemplateDrivenComponent,
  ],

})
export class  MinDateTemplateDrivenExtendedModule { }
