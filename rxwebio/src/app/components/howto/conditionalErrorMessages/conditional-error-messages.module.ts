import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CONDITIONAL_ERROR_MESSAGES_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/howto/conditionalErrorMessages/conditional-error-messages.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { CONDITIONAL_ERROR_MESSAGES_ROUTING } from "src/app/components/howto/conditionalErrorMessages/conditional-error-messages.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [CONDITIONAL_ERROR_MESSAGES_ROUTING ,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: CONDITIONAL_ERROR_MESSAGES_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ConditionalErrorMessagesModule { }

