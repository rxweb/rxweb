import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToDateDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/toDate/to-date-decorators-extended.module";
import { ToDateTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/toDate/to-date-validation-directives-extended.module";
import { ToDateTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/toDate/to-date-validation-decorators-extended.module";
import { ToDateValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/toDate/to-date-validators-extended.module";
import { TO_DATE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/sanitization/toDate/to-date.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { TO_DATE_ROUTING } from "src/app/components/sanitization/toDate/to-date.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [TO_DATE_ROUTING ,ToDateDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: TO_DATE_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ToDateModule { }

