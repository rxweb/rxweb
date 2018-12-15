import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PATTERN_ROUTING } from "src/app/components/form-validation/validators/pattern/pattern.routing";
import { PatternDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/pattern/pattern-decorators-extended.module";
import { PatternValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/pattern/pattern-validators-extended.module";
import { PatternTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/pattern/pattern-validation-directives-extended.module";
import { PatternTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/pattern/pattern-validation-decorators-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { PATTERN_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/pattern/pattern.constants";



@NgModule({
  imports: [PATTERN_ROUTING, PatternDecoratorsExtendedModule, PatternValidatorsExtendedModule, PatternTemplateDrivenValidationDirectivesExtendedModule, PatternTemplateDrivenValidationDecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: PATTERN_COMPONENT_EXAMPLE_CONSTANT }]
})
export class PatternModule { }

