import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaxLengthDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/maxLength/max-length-decorators-extended.module";
import { MaxLengthTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/maxLength/max-length-validation-directives-extended.module";
import { MaxLengthTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/maxLength/max-length-validation-decorators-extended.module";
import { MaxLengthValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/maxLength/max-length-validators-extended.module";
import { MAX_LENGTH_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/maxLength/max-length.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { MAX_LENGTH_ROUTING } from "src/app/components/form-validation/maxLength/max-length.routing";
import { PageModule } from "src/app/components/page/page.module";


@NgModule({
  imports: [MAX_LENGTH_ROUTING ,MaxLengthDecoratorsExtendedModule , MaxLengthValidatorsExtendedModule ,MaxLengthTemplateDrivenValidationDirectivesExtendedModule, MaxLengthTemplateDrivenValidationDecoratorsExtendedModule ,PageModule,],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: MAX_LENGTH_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class MaxLengthModule { }

