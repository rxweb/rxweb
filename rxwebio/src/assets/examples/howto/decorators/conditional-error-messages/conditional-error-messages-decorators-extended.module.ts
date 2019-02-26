import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ConditionalErrorMessageAddComponent } from './add/conditionalErrorMessage-add.component';





@NgModule({
  declarations: [
    ConditionalErrorMessageAddComponent
  ],
entryComponents: [
	ConditionalErrorMessageAddComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ConditionalErrorMessageAddComponent
  ],

})
export class  Conditional_error_messagesDecoratorsExtendedModule { }