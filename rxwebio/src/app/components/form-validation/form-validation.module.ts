import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FORM_VALIDATION_ROUTING } from "src/app/components/form-validation/form-validation.routing";
import { PageModule } from "src/app/components/form-validation/page/page.module";



@NgModule({
  imports: [FORM_VALIDATION_ROUTING, PageModule],
  exports: [RouterModule],
})
export class FormValidationModule { }

