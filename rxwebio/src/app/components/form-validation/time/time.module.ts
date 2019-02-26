import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimeDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/time/time-decorators-extended.module";
import { TimeTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/time/time-validation-directives-extended.module";
import { TimeTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/time/time-validation-decorators-extended.module";
import { TimeValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/time/time-validators-extended.module";
import { TIME_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/time/time.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { TIME_ROUTING } from "src/app/components/form-validation/time/time.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [TIME_ROUTING ,TimeDecoratorsExtendedModule , TimeValidatorsExtendedModule ,TimeTemplateDrivenValidationDirectivesExtendedModule, TimeTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: TIME_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class TimeModule { }

