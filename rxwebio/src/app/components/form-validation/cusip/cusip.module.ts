import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CusipDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/cusip/cusip-decorators-extended.module";
import { CusipTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/cusip/cusip-validation-directives-extended.module";
import { CusipTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/cusip/cusip-validation-decorators-extended.module";

import { CusipValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/cusip/cusip-validators-extended.module";
import { CUSIP_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/cusip/cusip.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { CUSIP_ROUTING } from "src/app/components/form-validation/cusip/cusip.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [CUSIP_ROUTING ,CusipDecoratorsExtendedModule ,CusipValidatorsExtendedModule,CusipTemplateDrivenValidationDirectivesExtendedModule, CusipTemplateDrivenValidationDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: CUSIP_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class CusipModule { }

