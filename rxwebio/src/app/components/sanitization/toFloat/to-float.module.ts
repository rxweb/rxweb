import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToFloatDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/toFloat/to-float-decorators-extended.module";

import { TO_FLOAT_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/sanitization/toFloat/to-float.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { TO_FLOAT_ROUTING } from "src/app/components/sanitization/toFloat/to-float.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [TO_FLOAT_ROUTING ,ToFloatDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: TO_FLOAT_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ToFloatModule { }

