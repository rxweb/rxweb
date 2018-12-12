import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { JSON_ROUTING } from "src/app/components/form-validation/validators/json/json.routing";
import { JsonDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/json/json-decorators-extended.module";
import { JsonValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/json/json-validators-extended.module";
import { JsonTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/json/json-validation-directives-extended.module";
import { JsonTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/json/json-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { JSON_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/json/json.constants";



@NgModule({
  imports: [JSON_ROUTING, JsonDecoratorsExtendedModule, JsonValidatorsExtendedModule, JsonTemplateDrivenValidationDirectivesExtendedModule, JsonTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: JSON_COMPONENT_EXAMPLE_CONSTANT }]
})
export class JsonModule { }

