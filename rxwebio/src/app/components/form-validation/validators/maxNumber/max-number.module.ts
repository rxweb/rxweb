import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAX_NUMBER_ROUTING } from "src/app/components/form-validation/validators/maxNumber/max-number.routing";
import { MaxNumberDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/maxNumber/max-number-decorators-extended.module";
import { MaxNumberValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/maxNumber/max-number-validators-extended.module";
import { MaxNumberTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxNumber/max-number-validation-directives-extended.module";
import { MaxNumberTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxNumber/max-number-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { MAX_NUMBER_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/maxNumber/max-number.constants";



@NgModule({
  imports: [MAX_NUMBER_ROUTING, MaxNumberDecoratorsExtendedModule, MaxNumberValidatorsExtendedModule, MaxNumberTemplateDrivenValidationDirectivesExtendedModule, MaxNumberTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: MAX_NUMBER_COMPONENT_EXAMPLE_CONSTANT }]
})
export class MaxNumberModule { }

