import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoneOfDecoratorsExtendedModule } from "src/assets/examples/reactive-form-validators/decorators/noneOf/none-of-decorators-extended.module";
import { NoneOfValidatorsExtendedModule } from "src/assets/examples/reactive-form-validators/validators/noneOf/none-of-validators-extended.module";
import { NONE_OF_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/form-validation/noneOf/none-of.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { NONE_OF_ROUTING } from "src/app/components/form-validation/noneOf/none-of.routing";
import { PageModule } from "src/app/components/page/page.module";


@NgModule({
  imports: [NONE_OF_ROUTING ,NoneOfDecoratorsExtendedModule , NoneOfValidatorsExtendedModule ,PageModule,],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: NONE_OF_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class NoneOfModule { }

