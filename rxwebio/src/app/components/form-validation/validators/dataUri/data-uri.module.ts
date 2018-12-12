import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DATA_URI_ROUTING } from "src/app/components/form-validation/validators/dataUri/data-uri.routing";
import { DataUriDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/dataUri/data-uri-decorators-extended.module";
import { DataUriValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/dataUri/data-uri-validators-extended.module";
import { DataUriTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/dataUri/data-uri-validation-directives-extended.module";
import { DataUriTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/dataUri/data-uri-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { DATA_URI_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/dataUri/data-uri.constants";



@NgModule({
  imports: [DATA_URI_ROUTING, DataUriDecoratorsExtendedModule, DataUriValidatorsExtendedModule, DataUriTemplateDrivenValidationDirectivesExtendedModule, DataUriTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: DATA_URI_COMPONENT_EXAMPLE_CONSTANT }]
})
export class DataUriModule { }

