import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MIN_LENGTH_ROUTING } from "src/app/components/form-validation/validators/minLength/min-length.routing";
import { MinLengthDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/minLength/min-length-decorators-extended.module";
import { MinLengthValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/minLength/min-length-validators-extended.module";
import { MinLengthTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/minLength/min-length-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { MIN_LENGTH_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/minLength/min-length.constants";



@NgModule({
  imports: [MIN_LENGTH_ROUTING, MinLengthDecoratorsExtendedModule, MinLengthValidatorsExtendedModule, MinLengthTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: MIN_LENGTH_COMPONENT_EXAMPLE_CONSTANT }]
})
export class MinLengthModule { }

