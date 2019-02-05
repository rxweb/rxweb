import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/date/date-decorators-extended.module";
import { DateTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/date/date-validation-directives-extended.module";
import { DateTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/date/date-validation-decorators-extended.module";
import { DateValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/date/date-validators-extended.module";
import { DATE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/date/date.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { DATE_ROUTING } from "src/app/components/form-validation/date/date.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [DATE_ROUTING ,DateDecoratorsExtendedModule , DateValidatorsExtendedModule ,DateTemplateDrivenValidationDirectivesExtendedModule, DateTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: DATE_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class DateModule { }

