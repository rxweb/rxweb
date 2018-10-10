import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { VALIDATION_DECORATORS_ROUTING } from './validation-decorators.routing';
@NgModule({
  imports: [VALIDATION_DECORATORS_ROUTING],
  exports: [RouterModule],
})
export class ValidationDecoratorsModule { }

