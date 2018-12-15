import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RANGE_ROUTING } from "src/app/components/form-validation/validators/range/range.routing";
import { RangeDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/range/range-decorators-extended.module";
import { RangeValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/range/range-validators-extended.module";
import { RangeTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/range/range-validation-directives-extended.module";
import { RangeTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/range/range-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { RANGE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/range/range.constants";



@NgModule({
  imports: [RANGE_ROUTING, RangeDecoratorsExtendedModule, RangeValidatorsExtendedModule, RangeTemplateDrivenValidationDirectivesExtendedModule, RangeTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: RANGE_COMPONENT_EXAMPLE_CONSTANT }]
})
export class RangeModule { }

