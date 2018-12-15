import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LEAP_YEAR_ROUTING } from "src/app/components/form-validation/validators/leapYear/leap-year.routing";
import { LeapYearDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/leapYear/leap-year-decorators-extended.module";
import { LeapYearValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/leapYear/leap-year-validators-extended.module";
import { LeapYearTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/leapYear/leap-year-validation-directives-extended.module";
import { LeapYearTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/leapYear/leap-year-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { LEAP_YEAR_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/leapYear/leap-year.constants";



@NgModule({
  imports: [LEAP_YEAR_ROUTING, LeapYearDecoratorsExtendedModule, LeapYearValidatorsExtendedModule, LeapYearTemplateDrivenValidationDirectivesExtendedModule, LeapYearTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: LEAP_YEAR_COMPONENT_EXAMPLE_CONSTANT }]
})
export class LeapYearModule { }

