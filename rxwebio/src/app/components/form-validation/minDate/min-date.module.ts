import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MinDateDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/minDate/min-date-decorators-extended.module";
import { MinDateTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/minDate/min-date-validation-directives-extended.module";
import { MinDateTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/minDate/min-date-validation-decorators-extended.module";
import { MinDateValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/minDate/min-date-validators-extended.module";
import { MIN_DATE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/minDate/min-date.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { MIN_DATE_ROUTING } from "src/app/components/form-validation/minDate/min-date.routing";
import { PageModule } from "src/app/components/page/page.module";


@NgModule({
  imports: [MIN_DATE_ROUTING ,MinDateDecoratorsExtendedModule , MinDateValidatorsExtendedModule ,MinDateTemplateDrivenValidationDirectivesExtendedModule, MinDateTemplateDrivenValidationDecoratorsExtendedModule ,PageModule,],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: MIN_DATE_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class MinDateModule { }

