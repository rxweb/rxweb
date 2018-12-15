import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { URL_ROUTING } from "src/app/components/form-validation/validators/url/url.routing";
import { UrlDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/url/url-decorators-extended.module";
import { UrlValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/url/url-validators-extended.module";
import { UrlTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/url/url-validation-directives-extended.module";
import { UrlTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/url/url-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { URL_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/url/url.constants";



@NgModule({
  imports: [URL_ROUTING, UrlDecoratorsExtendedModule, UrlValidatorsExtendedModule, UrlTemplateDrivenValidationDirectivesExtendedModule, UrlTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: URL_COMPONENT_EXAMPLE_CONSTANT }]
})
export class UrlModule { }

