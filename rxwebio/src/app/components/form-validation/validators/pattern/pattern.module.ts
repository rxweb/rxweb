import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { PATTERN_ROUTING } from "src/app/components/form-validation/validators/pattern/pattern.routing";
import { PatternDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/pattern/pattern-decorators-extended.module";
import { PatternValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/pattern/pattern-validators-extended.module";
import { PatternTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/pattern/pattern-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { PATTERN_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/pattern/pattern.constants";



@NgModule({
  imports: [PATTERN_ROUTING, PatternDecoratorsExtendedModule, PatternValidatorsExtendedModule, PatternTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: PATTERN_COMPONENT_EXAMPLE_CONSTANT }]
})
export class PatternModule { }

