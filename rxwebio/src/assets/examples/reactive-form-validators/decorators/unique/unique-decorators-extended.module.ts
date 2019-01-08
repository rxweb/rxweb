import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { UniqueCompleteComponent } from './complete/unique-complete.component';
import { UniqueMessageComponent } from './message/unique-message.component';
import { UniqueAddComponent } from './add/unique-add.component';


@NgModule({
  declarations: [
	UniqueCompleteComponent,
	UniqueMessageComponent,
	UniqueAddComponent,
  ],
entryComponents: [
	UniqueCompleteComponent,
	UniqueMessageComponent,
	UniqueAddComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	UniqueCompleteComponent,
	UniqueMessageComponent,
	UniqueAddComponent,
  ],

})
export class  UniqueDecoratorsExtendedModule { }
