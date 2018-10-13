import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { VALIDATION_VALIDATORS_ROUTING } from './validation-validators.routing';
@NgModule({
  imports: [VALIDATION_VALIDATORS_ROUTING],
  exports: [RouterModule],
})
export class ValidationValidatorsModule { }

