import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { conditionalErrorMessageAddComponent } from './add/conditionalErrorMessage-add.component';





@NgModule({
  declarations: [
    conditionalErrorMessageAddComponent
  ],
entryComponents: [
	conditionalErrorMessageAddComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	conditionalErrorMessageAddComponent
  ],

})
export class  ConditionalErrorMesageDecoratorsExtendedModule { }