import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPARE_ROUTING } from "src/app/components/form-validation/validators/compare/compare.routing";
import { CompareDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/compare/compare-decorators-extended.module";
import { CompareValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/compare/compare-validators-extended.module";
import { CompareTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/compare/compare-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { COMPARE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/compare/compare.constants";



@NgModule({
  imports: [COMPARE_ROUTING, CompareDecoratorsExtendedModule, CompareValidatorsExtendedModule, CompareTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: COMPARE_COMPONENT_EXAMPLE_CONSTANT }]
})
export class CompareModule { }

