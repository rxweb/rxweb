import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LATITUDE_ROUTING } from "src/app/components/form-validation/validators/latitude/latitude.routing";
import { LatitudeDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/latitude/latitude-decorators-extended.module";
import { LatitudeValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/latitude/latitude-validators-extended.module";
import { LatitudeTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/latitude/latitude-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { LATITUDE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/latitude/latitude.constants";



@NgModule({
  imports: [LATITUDE_ROUTING, LatitudeDecoratorsExtendedModule, LatitudeValidatorsExtendedModule, LatitudeTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: LATITUDE_COMPONENT_EXAMPLE_CONSTANT }]
})
export class LatitudeModule { }

