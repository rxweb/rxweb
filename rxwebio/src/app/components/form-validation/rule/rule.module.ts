import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RuleDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/rule/rule-decorators-extended.module";

import { RULE_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/rule/rule.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { RULE_ROUTING } from "src/app/components/form-validation/rule/rule.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [RULE_ROUTING ,RuleDecoratorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: RULE_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class RuleModule { }

