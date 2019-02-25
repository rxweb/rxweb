import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FORM_DATA_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/howto/formData/form-data.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { FORM_DATA_ROUTING } from "src/app/components/howto/formData/form-data.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [FORM_DATA_ROUTING ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: FORM_DATA_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class FormDataModule { }

