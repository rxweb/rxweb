import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAX_DATE_ROUTING } from "src/app/components/form-validation/validators/maxDate/max-date.routing";
import { MaxDateDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/maxDate/max-date-decorators-extended.module";
import { MaxDateValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/maxDate/max-date-validators-extended.module";
import { MaxDateTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxDate/max-date-validation-directives-extended.module";
import { MaxDateTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxDate/max-date-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { MAX_DATE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/maxDate/max-date.constants";



@NgModule({
  imports: [MAX_DATE_ROUTING, MaxDateDecoratorsExtendedModule, MaxDateValidatorsExtendedModule, MaxDateTemplateDrivenValidationDirectivesExtendedModule, MaxDateTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: MAX_DATE_COMPONENT_EXAMPLE_CONSTANT }]
})
export class MaxDateModule { }

