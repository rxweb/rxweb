import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { FORM_DATA_ROUTING } from "src/app/components/how-to/formData/form-data.routing";
import { PageModule } from "src/app/components/page/page.module";
import { FORM_DATA_COMPONENT_EXAMPLE_CONSTANT } from './form-data.constants';
import { ErrorMessagesComponentExtendedModule } from 'src/assets/examples/how-to/errorMessage-extended.module';



@NgModule({
  imports: [FORM_DATA_ROUTING ,PageModule,ErrorMessagesComponentExtendedModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: FORM_DATA_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class FormDataModule { }

