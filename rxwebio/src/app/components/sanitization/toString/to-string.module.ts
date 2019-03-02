import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToStringDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/toString/to-string-decorators-extended.module";

import { TO_STRING_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/sanitization/toString/to-string.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { TO_STRING_ROUTING } from "src/app/components/sanitization/toString/to-string.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [TO_STRING_ROUTING ,ToStringDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: TO_STRING_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ToStringModule { }

