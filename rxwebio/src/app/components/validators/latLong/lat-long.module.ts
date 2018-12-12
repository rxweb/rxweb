import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LAT_LONG_ROUTING } from "src/app/components/form-validation/validators/latLong/lat-long.routing";
import { LatLongDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/latLong/lat-long-decorators-extended.module";
import { LatLongValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/latLong/lat-long-validators-extended.module";
import { LatLongTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/latLong/lat-long-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { LAT_LONG_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/latLong/lat-long.constants";



@NgModule({
  imports: [LAT_LONG_ROUTING, LatLongDecoratorsExtendedModule, LatLongValidatorsExtendedModule, LatLongTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: LAT_LONG_COMPONENT_EXAMPLE_CONSTANT }]
})
export class LatLongModule { }

