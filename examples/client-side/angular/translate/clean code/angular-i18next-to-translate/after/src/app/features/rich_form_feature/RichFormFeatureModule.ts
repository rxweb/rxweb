import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichFormComponent } from './rich-form.component';
import { RichFormFeatureRouterModule } from './RichFormFeatureRouterModule';
import { RxTranslateModule } from '@rxweb/translate';




export const declarations = [
  RichFormComponent
];

export const providers = [
  FormBuilder
];

@NgModule({
  bootstrap: declarations,
  declarations: declarations,
  providers: providers,
  imports: [
    //core
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //feature
    RichFormFeatureRouterModule,

    //lib
      RxTranslateModule
  ]
})
export class RichFormFeatureModule {}
