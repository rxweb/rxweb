import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RESET_FORM_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/howto/resetForm/reset-form.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { RESET_FORM_ROUTING } from "src/app/components/howto/resetForm/reset-form.routing";
import { PageModule } from "src/app/components/page/page.module";
import { ResetFormDecoratorsExtendedModule } from 'src/assets/examples/how-to/decorators/resetForm/reset-form-decorators-extended.module';
import { ResetFormValidatorsExtendedModule } from 'src/assets/examples/how-to/validators/resetForm/reset-form-validators-extended.module';


@NgModule({
  imports: [RESET_FORM_ROUTING ,PageModule,ResetFormDecoratorsExtendedModule,ResetFormValidatorsExtendedModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: RESET_FORM_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ResetFormModule { }

