import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DecoratorsExtendedModule } from "src/assets/examples/decorators/decorators-extended.module";
import { PROP_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/decorators/prop/prop.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { PROP_ROUTING } from "src/app/components/decorators/prop/prop.routing";
import { PageModule } from "src/app/components/page/page.module";


@NgModule({
  imports: [PROP_ROUTING ,DecoratorsExtendedModule,PageModule,],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: PROP_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class PropModule { }

