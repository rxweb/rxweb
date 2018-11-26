import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PORT_ROUTING } from "src/app/components/form-validation/validators/port/port.routing";
import { PortDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/port/port-decorators-extended.module";
import { PortValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/port/port-validators-extended.module";
import { PortTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/port/port-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { PORT_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/port/port.constants";



@NgModule({
  imports: [PORT_ROUTING, PortDecoratorsExtendedModule, PortValidatorsExtendedModule, PortTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: PORT_COMPONENT_EXAMPLE_CONSTANT }]
})
export class PortModule { }

