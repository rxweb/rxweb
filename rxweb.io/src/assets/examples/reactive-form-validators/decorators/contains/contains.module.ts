import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ContainsCompleteComponent } from './complete/contains-complete.component';
import { ContainsValueComponent } from './value/contains-value.component';
import { ContainsConditionalExpressionComponent } from './conditionalExpression/contains-conditional-expression.component';
import { ContainsMessageComponent } from './message/contains-message.component';
import { ContainsDynamicComponent } from './dynamic/contains-dynamic.component';
import { ContainsAddComponent } from './add/contains-add.component';
import { ContainsEditComponent } from './edit/contains-edit.component';

@NgModule({
  declarations: [
	ContainsCompleteComponent,
	ContainsValueComponent,
	ContainsConditionalExpressionComponent,
	ContainsMessageComponent,
	ContainsDynamicComponent,
	ContainsAddComponent,
	ContainsEditComponent,
  ],
entryComponents: [
	ContainsCompleteComponent,
	ContainsValueComponent,
	ContainsConditionalExpressionComponent,
	ContainsMessageComponent,
	ContainsDynamicComponent,
	ContainsAddComponent,
	ContainsEditComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ContainsCompleteComponent,
	ContainsValueComponent,
	ContainsConditionalExpressionComponent,
	ContainsMessageComponent,
	ContainsDynamicComponent,
	ContainsAddComponent,
	ContainsEditComponent,
  ],

})
export class  ContainsExtendedModule { }
