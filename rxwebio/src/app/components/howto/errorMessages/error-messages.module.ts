import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorMessagesDecoratorsExtendedModule } from "src/assets/examples/howto/decorators/errorMessages/error-messages-decorators-extended.module";
import { ErrorMessagesValidatorsExtendedModule } from "src/assets/examples/howto/validators/errorMessages/error-messages-validators-extended.module";
import { ERROR_MESSAGES_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/howto/errorMessages/error-messages.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { ERROR_MESSAGES_ROUTING } from "src/app/components/howto/errorMessages/error-messages.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [ERROR_MESSAGES_ROUTING ,ErrorMessagesDecoratorsExtendedModule , ErrorMessagesValidatorsExtendedModule ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: ERROR_MESSAGES_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ErrorMessagesModule { }

