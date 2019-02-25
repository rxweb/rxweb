import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FORM_DATA_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/howto/formData/form-data.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { FORM_DATA_ROUTING } from "src/app/components/howto/formData/form-data.routing";
import { PageModule } from "src/app/components/page/page.module";
import { FormDataDecoratorsExtendedModule } from 'src/assets/examples/howto/decorators/formData/form-data-decorators-extended.module';
import { FormDataValidatorsExtendedModule } from 'src/assets/examples/howto/validators/formData/form-data-validators-extended.module';




@NgModule({
  imports: [FORM_DATA_ROUTING ,PageModule,FormDataDecoratorsExtendedModule,FormDataValidatorsExtendedModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: FORM_DATA_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class FormDataModule { }

