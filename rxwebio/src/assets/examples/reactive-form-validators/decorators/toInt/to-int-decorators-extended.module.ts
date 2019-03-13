import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ToIntCompleteComponent } from './complete/to-int-complete.component';
import { ToIntRadixComponent } from './radix/to-int-radix.component';

@NgModule({
  declarations: [
	ToIntCompleteComponent,
	ToIntRadixComponent,
  ],
entryComponents: [
	ToIntCompleteComponent,
	ToIntRadixComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
	ToIntCompleteComponent,
	ToIntRadixComponent,
  ],

})
export class  ToIntDecoratorsExtendedModule { }
