import { NgModule } from '@angular/core';

import { ValidationOnBlurDirective } from './directives/ValidationOnBlurDirective';
import { ValidationDirtyChecker } from './services/ValidationDirtyChecker';


export const declarations = [
  ValidationOnBlurDirective
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: [
    ValidationDirtyChecker
  ]
})
export class ValidationModule {
}
