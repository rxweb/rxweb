import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComposeValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/compose/compose-validators-extended.module";
import { COMPOSE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/compose/compose.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { COMPOSE_ROUTING } from "src/app/components/form-validation/compose/compose.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [COMPOSE_ROUTING , ComposeValidatorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: COMPOSE_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ComposeModule { }

