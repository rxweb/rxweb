import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { STARTS_WITH_ROUTING } from "src/app/components/form-validation/validators/startsWith/starts-with.routing";
import { StartsWithDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/startsWith/starts-with-decorators-extended.module";
import { StartsWithValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/startsWith/starts-with-validators-extended.module";
import { StartsWithTemplateDrivenExtendedModule } from "src/assets/examples/reactive-form-validators/template-driven/startsWith/starts-with-template-driven-extended.module";
import { PageModule } from "src/app/components/form-validation/page/page.module";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { STARTS_WITH_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/validators/startsWith/starts-with.constants";



@NgModule({
  imports: [STARTS_WITH_ROUTING, StartsWithDecoratorsExtendedModule, StartsWithValidatorsExtendedModule, StartsWithTemplateDrivenExtendedModule,PageModule],
  exports: [RouterModule],
  providers:[{ provide: COMPONENT_EXAMPLE, useValue: STARTS_WITH_COMPONENT_EXAMPLE_CONSTANT }]
})
export class StartsWithModule { }

