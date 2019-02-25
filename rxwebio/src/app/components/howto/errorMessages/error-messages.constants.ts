import { ErrorMessagesComponent } from "src/assets/examples/howto/decorators/errorMessage/complete/errorMessage-component";
import { SingleErrorMessagesComponent } from "src/assets/examples/howto/decorators/errorMessage/single-message/errormessage-single.component";
import { ErrormessageSingleComponent } from "src/assets/examples/howto/validators/errorMessage/complete/errorMessage-component";
import { ErrormessageSingleValidatorComponent } from "src/assets/examples/howto/validators/errorMessage/single-message/errormessage-single.component";






export const ERROR_MESSAGES_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
    decorators:
    {
        complete:ErrorMessagesComponent,
        single:SingleErrorMessagesComponent
    },
    validators:
    {
        complete:ErrormessageSingleComponent,
        single:ErrormessageSingleValidatorComponent
    }
}