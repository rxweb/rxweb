import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { AsyncComponentBasedComponent } from './componentFunctionBased/async-component.component';
import {  AsyncGlobalBasedComponent } from './globalFunctionBased/async-global.component';

@NgModule({
  declarations: [
    AsyncComponentBasedComponent,AsyncGlobalBasedComponent
  ],
entryComponents: [
	AsyncComponentBasedComponent,AsyncGlobalBasedComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    AsyncComponentBasedComponent,AsyncGlobalBasedComponent
  ],

})
export class  AsyncDecoratorsExtendedModule { }
