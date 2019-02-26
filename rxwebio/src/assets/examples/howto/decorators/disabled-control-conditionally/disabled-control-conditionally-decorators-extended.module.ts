import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { DisableControlConditionallyDecoratorAddComponent } from './add/disableControlConditionally-add.component';






@NgModule({
  declarations: [
    DisableControlConditionallyDecoratorAddComponent
  ],
entryComponents: [
	DisableControlConditionallyDecoratorAddComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    DisableControlConditionallyDecoratorAddComponent
  ],

})
export class  Disabled_control_conditionallyDecoratorsExtendedModule { }