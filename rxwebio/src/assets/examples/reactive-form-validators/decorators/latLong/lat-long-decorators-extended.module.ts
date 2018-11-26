import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { LatLongCompleteComponent } from './complete/lat-long-complete.component';
import { LatLongConditionalExpressionComponent } from './conditionalExpression/lat-long-conditional-expression.component';
import { LatLongMessageComponent } from './message/lat-long-message.component';
import { LatLongDynamicComponent } from './dynamic/lat-long-dynamic.component';
import { LatLongAddComponent } from './add/lat-long-add.component';
import { LatLongEditComponent } from './edit/lat-long-edit.component';

@NgModule({
  declarations: [
	LatLongCompleteComponent,
	LatLongConditionalExpressionComponent,
	LatLongMessageComponent,
	LatLongDynamicComponent,
	LatLongAddComponent,
	LatLongEditComponent,
  ],
entryComponents: [
	LatLongCompleteComponent,
	LatLongConditionalExpressionComponent,
	LatLongMessageComponent,
	LatLongDynamicComponent,
	LatLongAddComponent,
	LatLongEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	LatLongCompleteComponent,
	LatLongConditionalExpressionComponent,
	LatLongMessageComponent,
	LatLongDynamicComponent,
	LatLongAddComponent,
	LatLongEditComponent,
  ],

})
export class  LatLongDecoratorsExtendedModule { }
