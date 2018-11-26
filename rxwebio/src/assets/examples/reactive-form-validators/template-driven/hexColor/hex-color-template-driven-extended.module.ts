import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { HexColorCompleteTemplateDrivenComponent } from './complete/hex-color-complete.component';
import { HexColorConditionalExpressionTemplateDrivenComponent } from './conditionalExpression/hex-color-conditional-expression.component';
import { HexColorMessageTemplateDrivenComponent } from './message/hex-color-message.component';
import { HexColorAddTemplateDrivenComponent } from './add/hex-color-add.component';

@NgModule({
  declarations: [
	HexColorCompleteTemplateDrivenComponent,
	HexColorConditionalExpressionTemplateDrivenComponent,
	HexColorMessageTemplateDrivenComponent,
	HexColorAddTemplateDrivenComponent,
  ],
entryComponents: [
	HexColorCompleteTemplateDrivenComponent,
	HexColorConditionalExpressionTemplateDrivenComponent,
	HexColorMessageTemplateDrivenComponent,
	HexColorAddTemplateDrivenComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	HexColorCompleteTemplateDrivenComponent,
	HexColorConditionalExpressionTemplateDrivenComponent,
	HexColorMessageTemplateDrivenComponent,
	HexColorAddTemplateDrivenComponent,
  ],

})
export class  HexColorTemplateDrivenExtendedModule { }
