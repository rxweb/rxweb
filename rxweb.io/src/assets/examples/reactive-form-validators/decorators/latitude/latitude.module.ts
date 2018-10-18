import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LatitudeCompleteComponent } from './complete/latitude-complete.component';
import { LatitudeConditionalExpressionComponent } from './conditionalExpression/latitude-conditional-expression.component';
import { LatitudeMessageComponent } from './message/latitude-message.component';
import { LatitudeDynamicComponent } from './dynamic/latitude-dynamic.component';
import { LatitudeAddComponent } from './add/latitude-add.component';
import { LatitudeEditComponent } from './edit/latitude-edit.component';

@NgModule({
  declarations: [
	LatitudeCompleteComponent,
	LatitudeConditionalExpressionComponent,
	LatitudeMessageComponent,
	LatitudeDynamicComponent,
	LatitudeAddComponent,
	LatitudeEditComponent,
  ],
entryComponents: [
	LatitudeCompleteComponent,
	LatitudeConditionalExpressionComponent,
	LatitudeMessageComponent,
	LatitudeDynamicComponent,
	LatitudeAddComponent,
	LatitudeEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LatitudeCompleteComponent,
	LatitudeConditionalExpressionComponent,
	LatitudeMessageComponent,
	LatitudeDynamicComponent,
	LatitudeAddComponent,
	LatitudeEditComponent,
  ],

})
export class  LatitudeExtendedModule { }
