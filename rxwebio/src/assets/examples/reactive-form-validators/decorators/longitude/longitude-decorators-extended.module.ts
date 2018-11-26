import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LongitudeCompleteComponent } from './complete/longitude-complete.component';
import { LongitudeConditionalExpressionComponent } from './conditionalExpression/longitude-conditional-expression.component';
import { LongitudeMessageComponent } from './message/longitude-message.component';
import { LongitudeDynamicComponent } from './dynamic/longitude-dynamic.component';
import { LongitudeAddComponent } from './add/longitude-add.component';
import { LongitudeEditComponent } from './edit/longitude-edit.component';

@NgModule({
  declarations: [
	LongitudeCompleteComponent,
	LongitudeConditionalExpressionComponent,
	LongitudeMessageComponent,
	LongitudeDynamicComponent,
	LongitudeAddComponent,
	LongitudeEditComponent,
  ],
entryComponents: [
	LongitudeCompleteComponent,
	LongitudeConditionalExpressionComponent,
	LongitudeMessageComponent,
	LongitudeDynamicComponent,
	LongitudeAddComponent,
	LongitudeEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LongitudeCompleteComponent,
	LongitudeConditionalExpressionComponent,
	LongitudeMessageComponent,
	LongitudeDynamicComponent,
	LongitudeAddComponent,
	LongitudeEditComponent,
  ],

})
export class  LongitudeDecoratorsExtendedModule { }
