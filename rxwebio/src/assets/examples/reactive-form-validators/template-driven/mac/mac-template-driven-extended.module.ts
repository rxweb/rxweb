import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MacCompleteTemplateDrivenComponent } from './complete/mac-complete.component';
import { MacConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/mac-conditional-expression.component';
import { MacMessageTemplateDrivenComponent } from './message/mac-message.component';
import { MacAddTemplateDrivenComponent } from './add/mac-add.component';

@NgModule({
  declarations: [
	MacCompleteTemplateDrivenComponent,
	MacConditionalExpressionTemplateDrivenComponent,
	MacMessageTemplateDrivenComponent,
	MacAddTemplateDrivenComponent,
  ],
entryComponents: [
	MacCompleteTemplateDrivenComponent,
	MacConditionalExpressionTemplateDrivenComponent,
	MacMessageTemplateDrivenComponent,
	MacAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	MacCompleteTemplateDrivenComponent,
	MacConditionalExpressionTemplateDrivenComponent,
	MacMessageTemplateDrivenComponent,
	MacAddTemplateDrivenComponent,
  ],

})
export class  MacTemplateDrivenExtendedModule { }
