import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAX_LENGTH_ROUTING } from "src/app/components/form-validation/validators/maxLength/max-length.routing";
import { MaxLengthDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/maxLength/max-length-decorators-extended.module";
import { MaxLengthValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/maxLength/max-length-validators-extended.module";
import { MaxLengthTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/maxLength/max-length-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { MAX_LENGTH_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/maxLength/max-length.constants";



@NgModule({
  imports: [MAX_LENGTH_ROUTING, MaxLengthDecoratorsExtendedModule, MaxLengthValidatorsExtendedModule, MaxLengthTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: MAX_LENGTH_COMPONENT_EXAMPLE_CONSTANT }]
})
export class MaxLengthModule { }

