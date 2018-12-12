import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LatLongCompleteTemplateDrivenValidationDirectivesComponent } from './complete/lat-long-complete.component';
import { LatLongConditionalExpressionTemplateDrivenValidationDirectivesComponent } from './conditionalExpression/lat-long-conditional-expression.component';
import { LatLongMessageTemplateDrivenValidationDirectivesComponent } from './message/lat-long-message.component';
import { LatLongAddTemplateDrivenValidationDirectivesComponent } from './add/lat-long-add.component';

@NgModule({
  declarations: [
	LatLongCompleteTemplateDrivenValidationDirectivesComponent,
	LatLongConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LatLongMessageTemplateDrivenValidationDirectivesComponent,
	LatLongAddTemplateDrivenValidationDirectivesComponent,
  ],
entryComponents: [
	LatLongCompleteTemplateDrivenValidationDirectivesComponent,
	LatLongConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LatLongMessageTemplateDrivenValidationDirectivesComponent,
	LatLongAddTemplateDrivenValidationDirectivesComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LatLongCompleteTemplateDrivenValidationDirectivesComponent,
	LatLongConditionalExpressionTemplateDrivenValidationDirectivesComponent,
	LatLongMessageTemplateDrivenValidationDirectivesComponent,
	LatLongAddTemplateDrivenValidationDirectivesComponent,
  ],

})
export class  LatLongTemplateDrivenValidationDirectivesExtendedModule { }
