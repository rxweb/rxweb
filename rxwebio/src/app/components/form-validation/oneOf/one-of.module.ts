import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { OneOfDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/oneOf/one-of-decorators-extended.module";
// import { OneOfTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/oneOf/one-of-validation-directives-extended.module";
// import { OneOfTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/oneOf/one-of-validation-decorators-extended.module";
import { OneOfValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/oneOf/one-of-validators-extended.module";
import { ONE_OF_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/oneOf/one-of.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { ONE_OF_ROUTING } from "src/app/components/form-validation/oneOf/one-of.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [ONE_OF_ROUTING ,OneOfDecoratorsExtendedModule , OneOfValidatorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: ONE_OF_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class OneOfModule { }

