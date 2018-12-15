import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ENDS_WITH_ROUTING } from "src/app/components/form-validation/validators/endsWith/ends-with.routing";
import { EndsWithDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/endsWith/ends-with-decorators-extended.module";
import { EndsWithValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/endsWith/ends-with-validators-extended.module";
import { EndsWithTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/endsWith/ends-with-validation-directives-extended.module";
import { EndsWithTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/endsWith/ends-with-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { ENDS_WITH_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/endsWith/ends-with.constants";



@NgModule({
  imports: [ENDS_WITH_ROUTING, EndsWithDecoratorsExtendedModule, EndsWithValidatorsExtendedModule, EndsWithTemplateDrivenValidationDirectivesExtendedModule, EndsWithTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: ENDS_WITH_COMPONENT_EXAMPLE_CONSTANT }]
})
export class EndsWithModule { }

