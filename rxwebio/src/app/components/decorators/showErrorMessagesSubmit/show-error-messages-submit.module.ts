import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DecoratorsExtendedModule } from "src/assets/examples/decorators/decorators-extended.module";
import { SHOW_ERROR_MESSAGES_SUBMIT_COMPONENT_EXAMPLE_CONSTANT } from "src/app/components/decorators/showErrorMessagesSubmit/show-error-messages-submit.constants";
import { COMPONENT_EXAMPLE } from "src/app/domain/application.const";
import { SHOW_ERROR_MESSAGES_SUBMIT_ROUTING } from "src/app/components/decorators/showErrorMessagesSubmit/show-error-messages-submit.routing";
import { PageModule } from "src/app/components/page/page.module";



@NgModule({
  imports: [SHOW_ERROR_MESSAGES_SUBMIT_ROUTING ,DecoratorsExtendedModule,PageModule],
  exports: [RouterModule],
    providers:[{ provide: COMPONENT_EXAMPLE, useValue: SHOW_ERROR_MESSAGES_SUBMIT_COMPONENT_EXAMPLE_CONSTANT }]
  })
export class ShowErrorMessagesSubmitModule { }

