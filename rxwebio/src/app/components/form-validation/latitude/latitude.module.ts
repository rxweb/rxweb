import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LatitudeDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/latitude/latitude-decorators-extended.module";
import { LatitudeTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/latitude/latitude-validation-directives-extended.module";
import { LatitudeTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/latitude/latitude-validation-decorators-extended.module";
import { LatitudeValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/latitude/latitude-validators-extended.module";
import { LATITUDE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/latitude/latitude.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { LATITUDE_ROUTING } from "src/app/components/form-validation/latitude/latitude.routing";
import { PageModule } from "src/app/components/page/page.module";


@NgModule({
  imports: [LATITUDE_ROUTING ,LatitudeDecoratorsExtendedModule , LatitudeValidatorsExtendedModule ,LatitudeTemplateDrivenValidationDirectivesExtendedModule, LatitudeTemplateDrivenValidationDecoratorsExtendedModule ,PageModule,],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: LATITUDE_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class LatitudeModule { }

