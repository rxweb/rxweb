import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlacklistDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/blacklist/blacklist-decorators-extended.module";
import { BlacklistTemplateDrivenValidationDirectivesExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-directives/blacklist/blacklist-validation-directives-extended.module";
import { BlacklistTemplateDrivenValidationDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/validation-decorators/blacklist/blacklist-validation-decorators-extended.module";
import { BlacklistValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/blacklist/blacklist-validators-extended.module";
import { BLACKLIST_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/sanitization/blacklist/blacklist.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { BLACKLIST_ROUTING } from "src/app/components/sanitization/blacklist/blacklist.routing";
import { PageModule } from "src/app/components/page/page.module";


@NgModule({
  imports: [BLACKLIST_ROUTING ,BlacklistDecoratorsExtendedModule ,PageModule,],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: BLACKLIST_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class BlacklistModule { }

