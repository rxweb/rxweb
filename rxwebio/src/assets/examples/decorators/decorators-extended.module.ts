import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { PropObjectAddComponent } from './propObject/prop-object-add.component';
import { PropArrayAddComponent } from "src/assets/examples/decorators/propArray/prop-array-add.component";
import { PropAddComponent } from './prop/prop-add.component';

@NgModule({
  declarations: [
    PropAddComponent,
	PropArrayAddComponent,
	PropObjectAddComponent
  ],
entryComponents: [
  PropAddComponent,
	PropArrayAddComponent,
	PropObjectAddComponent
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
  ],

})
export class DecoratorsExtendedModule { }
