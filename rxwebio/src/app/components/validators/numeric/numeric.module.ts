import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NUMERIC_ROUTING } from "src/app/components/form-validation/validators/numeric/numeric.routing";
import { NumericDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/numeric/numeric-decorators-extended.module";
import { NumericValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/numeric/numeric-validators-extended.module";
import { NumericTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/numeric/numeric-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { NUMERIC_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/numeric/numeric.constants";



@NgModule({
  imports: [NUMERIC_ROUTING, NumericDecoratorsExtendedModule, NumericValidatorsExtendedModule, NumericTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: NUMERIC_COMPONENT_EXAMPLE_CONSTANT }]
})
export class NumericModule { }

