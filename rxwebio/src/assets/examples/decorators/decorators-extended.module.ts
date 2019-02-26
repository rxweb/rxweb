import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule, propArray } from '@rxweb/reactive-form-validators';
import { PropObjectAddComponent } from './propObject/add/prop-object-add.component';

import { PropAddComponent } from './prop/add/prop-add.component';
import { PropServerComponent } from './prop/bindingServerProperty/prop-server.component';
import { PropDefaultComponent } from './prop/defaultValue/prop-default.component';
import { PropArrayAddComponent } from './propArray/add/prop-array-add.component';
import { PropArrayDefaultComponent } from './propArray/defaultValue/prop-array-default-component';
import { PropArrayServerComponent } from './propArray/bindingServerProperty/prop-array-server.component';

import { PropObjectDefaultComponent } from './propObject/defaultValue/prop-object-default.component';
import { PropObjectServerComponent } from './propObject/bindingServerProperty/prop-object-server.component';
import { DisabledControlConditionallyAddComponent } from './disabledControlConditionally/add/disabledControlConditionally-add.component';
import { ShowErrorMessagesSubmitAddComponent } from './showErrorMessagesSubmit/add/showErrorMessagesSubmit-add.component';


@NgModule({
  declarations: [
    PropAddComponent,
    PropServerComponent,
  PropArrayAddComponent,
  PropArrayServerComponent,
  PropArrayDefaultComponent,
  PropObjectAddComponent,
  PropObjectDefaultComponent,
  PropObjectServerComponent,
  PropDefaultComponent,
  DisabledControlConditionallyAddComponent,
  ShowErrorMessagesSubmitAddComponent
  ],
entryComponents: [
  PropAddComponent,
    PropServerComponent,
  PropArrayAddComponent,
  PropArrayServerComponent,
  PropArrayDefaultComponent,
  PropObjectAddComponent,
  PropObjectDefaultComponent,
  PropObjectServerComponent,
  PropDefaultComponent,
  DisabledControlConditionallyAddComponent,
  ShowErrorMessagesSubmitAddComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule,FormsModule,RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    PropAddComponent,
    PropArrayAddComponent,
  PropObjectAddComponent,
  DisabledControlConditionallyAddComponent,
  ShowErrorMessagesSubmitAddComponent
  ],

})
export class DecoratorsExtendedModule { }
