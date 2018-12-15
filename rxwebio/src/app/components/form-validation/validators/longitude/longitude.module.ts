import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LONGITUDE_ROUTING } from "src/app/components/form-validation/validators/longitude/longitude.routing";
import { LongitudeDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/longitude/longitude-decorators-extended.module";
import { LongitudeValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/longitude/longitude-validators-extended.module";
import { LongitudeTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/longitude/longitude-validation-directives-extended.module";
import { LongitudeTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/longitude/longitude-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { LONGITUDE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/longitude/longitude.constants";



@NgModule({
  imports: [LONGITUDE_ROUTING, LongitudeDecoratorsExtendedModule, LongitudeValidatorsExtendedModule, LongitudeTemplateDrivenValidationDirectivesExtendedModule, LongitudeTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: LONGITUDE_COMPONENT_EXAMPLE_CONSTANT }]
})
export class LongitudeModule { }

