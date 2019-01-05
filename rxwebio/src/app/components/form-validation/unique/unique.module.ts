import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageModule } from "src/app/components/page/page.module";
import { UNIQUE_ROUTING } from './unique.routing';
import { UniqueDecoratorsExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/unique/unique-decorators-extended.module';
import { UniqueValidatorsExtendedModule } from 'src/assets/examples/reactive-form-validators/validators/unique/unique-validators-extended.module';
import { UNIQUE_COMPONENT_EXAMPLE_CONSTANT } from './unique.constants';
import { COMPONENT_EXAMPLE } from 'src/app/domain/application.const';

@NgModule({
  imports: [UNIQUE_ROUTING ,UniqueDecoratorsExtendedModule, UniqueValidatorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: UNIQUE_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class UniqueModule { }

