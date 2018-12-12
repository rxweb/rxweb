import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { EXTENSION_ROUTING } from "src/app/components/form-validation/validators/extension/extension.routing";
import { ExtensionDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/extension/extension-decorators-extended.module";
import { ExtensionValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/extension/extension-validators-extended.module";
import { ExtensionTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/extension/extension-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { EXTENSION_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/extension/extension.constants";



@NgModule({
  imports: [EXTENSION_ROUTING, ExtensionDecoratorsExtendedModule, ExtensionValidatorsExtendedModule, ExtensionTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: EXTENSION_COMPONENT_EXAMPLE_CONSTANT }]
})
export class ExtensionModule { }

