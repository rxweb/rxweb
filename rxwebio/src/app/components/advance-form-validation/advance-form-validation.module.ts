import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADVANCE_FORM_VALIDATION_ROUTING } from "src/app/components/advance-form-validation/advance-form-validation.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [ADVANCE_FORM_VALIDATION_ROUTING ,PageModule],
  exports: [RouterModule],
  })
export class AdvanceFormValidationModule { }

