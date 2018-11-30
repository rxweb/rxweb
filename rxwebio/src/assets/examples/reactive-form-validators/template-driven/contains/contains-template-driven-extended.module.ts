import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ContainsCompleteTemplateDrivenComponent } from './complete/contains-complete.component';
import { ContainsValueTemplateDrivenComponent } from './value/contains-value.component';
import { ContainsConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/contains-conditional-expression.component';
import { ContainsMessageTemplateDrivenComponent } from './message/contains-message.component';
import { ContainsAddTemplateDrivenComponent } from './add/contains-add.component';

@NgModule({
  declarations: [
	ContainsCompleteTemplateDrivenComponent,
	ContainsValueTemplateDrivenComponent,
	ContainsConditionalExpressionTemplateDrivenComponent,
	ContainsMessageTemplateDrivenComponent,
	ContainsAddTemplateDrivenComponent,
  ],
entryComponents: [
	ContainsCompleteTemplateDrivenComponent,
	ContainsValueTemplateDrivenComponent,
	ContainsConditionalExpressionTemplateDrivenComponent,
	ContainsMessageTemplateDrivenComponent,
	ContainsAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ContainsCompleteTemplateDrivenComponent,
	ContainsValueTemplateDrivenComponent,
	ContainsConditionalExpressionTemplateDrivenComponent,
	ContainsMessageTemplateDrivenComponent,
	ContainsAddTemplateDrivenComponent,
  ],

})
export class  ContainsTemplateDrivenExtendedModule { }
