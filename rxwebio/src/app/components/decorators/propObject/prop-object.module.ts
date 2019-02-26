import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DecoratorsExtendedModule } from "src/assets/examples/decorators/decorators-extended.module";
import { PROP_OBJECT_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/decorators/propObject/prop-object.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { PROP_OBJECT_ROUTING } from "src/app/components/decorators/propObject/prop-object.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [PROP_OBJECT_ROUTING ,DecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: PROP_OBJECT_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class PropObjectModule { }

