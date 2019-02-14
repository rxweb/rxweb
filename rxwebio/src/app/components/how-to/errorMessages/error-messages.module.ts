import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { ERROR_MESSAGES_ROUTING } from "src/app/components/how-to/errorMessages/error-messages.routing";
import { PageModule } from "src/app/components/page/page.module";
import { ERROR_MESSAGES_COMPONENT_EXAMPLE_CONSTANT } from './error-messages.constants';
import { ErrorMessagesComponentExtendedModule } from 'src/assets/examples/how-to/errorMessage-extended.module';



@NgModule({
  imports: [ERROR_MESSAGES_ROUTING ,PageModule,ErrorMessagesComponentExtendedModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: ERROR_MESSAGES_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ErrorMessagesModule { }

