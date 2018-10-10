import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { REACTIVE_FORM_VALIDATORS_ROUTING } from './reactive-form-validators.routing';
@NgModule({
  imports: [REACTIVE_FORM_VALIDATORS_ROUTING],
  exports: [RouterModule],
})
export class ReactiveFormValidatorsModule { }

