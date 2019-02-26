import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExtensionDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/extension/extension-decorators-extended.module";
import { ExtensionTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/extension/extension-validation-directives-extended.module";
import { ExtensionTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/extension/extension-validation-decorators-extended.module";
import { ExtensionValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/extension/extension-validators-extended.module";
import { EXTENSION_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/extension/extension.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { EXTENSION_ROUTING } from "src/app/components/form-validation/extension/extension.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [EXTENSION_ROUTING ,ExtensionDecoratorsExtendedModule , ExtensionValidatorsExtendedModule ,ExtensionTemplateDrivenValidationDirectivesExtendedModule, ExtensionTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: EXTENSION_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ExtensionModule { }

