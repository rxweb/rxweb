import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { DIRTY_CHECK_ROUTING } from "src/app/components/how-to/dirtyCheck/dirty-check.routing";
import { PageModule } from "src/app/components/page/page.module";
import { DIRTY_CHECK_COMPONENT_EXAMPLE_CONSTANT } from './dirty-check.constants';
import { ErrorMessagesComponentExtendedModule } from 'src/assets/examples/how-to/errorMessage-extended.module';



@NgModule({
  imports: [DIRTY_CHECK_ROUTING ,PageModule,ErrorMessagesComponentExtendedModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: DIRTY_CHECK_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class DirtyCheckModule { }

