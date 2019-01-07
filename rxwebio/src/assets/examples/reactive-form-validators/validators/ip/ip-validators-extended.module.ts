import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { IpCompleteValidatorComponent } from './complete/ip-complete.component';
import { IpVersionValidatorComponent } from './version/ip-version.component';
import { IpIsCidrValidatorComponent } from './isCidr/ip-is-cidr.component';
import { IpConditionalExpressionValidatorComponent } from './conditionalExpression/ip-conditional-expression.component';
import { IpMessageValidatorComponent } from './message/ip-message.component';
import { IpDynamicValidatorComponent } from './dynamic/ip-dynamic.component';
import { IpAddValidatorComponent } from './add/ip-add.component';

@NgModule({
  declarations: [
	IpCompleteValidatorComponent,
	IpVersionValidatorComponent,
	IpIsCidrValidatorComponent,
	IpConditionalExpressionValidatorComponent,
	IpMessageValidatorComponent,
	IpDynamicValidatorComponent,
	IpAddValidatorComponent,
  ],
entryComponents: [
	IpCompleteValidatorComponent,
	IpVersionValidatorComponent,
	IpIsCidrValidatorComponent,
	IpConditionalExpressionValidatorComponent,
	IpMessageValidatorComponent,
	IpDynamicValidatorComponent,
	IpAddValidatorComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	IpCompleteValidatorComponent,
	IpVersionValidatorComponent,
	IpIsCidrValidatorComponent,
	IpConditionalExpressionValidatorComponent,
	IpMessageValidatorComponent,
	IpDynamicValidatorComponent,
	IpAddValidatorComponent,
  ],

})
export class  IpValidatorsExtendedModule { }
