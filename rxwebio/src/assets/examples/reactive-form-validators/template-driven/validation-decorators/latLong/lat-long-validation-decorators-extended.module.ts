import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LatLongCompleteTemplateDrivenValidationDecoratorsComponent } from './complete/lat-long-complete.component';
import { LatLongConditionalExpressionTemplateDrivenValidationDecoratorsComponent } from './conditionalExpression/lat-long-conditional-expression.component';
import { LatLongMessageTemplateDrivenValidationDecoratorsComponent } from './message/lat-long-message.component';
import { LatLongAddTemplateDrivenValidationDecoratorsComponent } from './add/lat-long-add.component';

@NgModule({
  declarations: [
	LatLongCompleteTemplateDrivenValidationDecoratorsComponent,
	LatLongConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LatLongMessageTemplateDrivenValidationDecoratorsComponent,
	LatLongAddTemplateDrivenValidationDecoratorsComponent,
  ],
entryComponents: [
	LatLongCompleteTemplateDrivenValidationDecoratorsComponent,
	LatLongConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LatLongMessageTemplateDrivenValidationDecoratorsComponent,
	LatLongAddTemplateDrivenValidationDecoratorsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LatLongCompleteTemplateDrivenValidationDecoratorsComponent,
	LatLongConditionalExpressionTemplateDrivenValidationDecoratorsComponent,
	LatLongMessageTemplateDrivenValidationDecoratorsComponent,
	LatLongAddTemplateDrivenValidationDecoratorsComponent,
  ],

})
export class  LatLongTemplateDrivenValidationDecoratorsExtendedModule { }
