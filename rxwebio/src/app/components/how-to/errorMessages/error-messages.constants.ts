import { ErrorMessagesComponent } from "src/assets/examples/how-to/errorMessage/decorators/complete/errorMessage-component";
import { SingleErrorMessagesComponent } from "src/assets/examples/how-to/errorMessage/decorators/single-message/errormessage-single.component";
import { ErrormessageSingleValidatorComponent } from "src/assets/examples/how-to/errorMessage/validators/single-message/errormessage-single.component";





export const ERROR_MESSAGES_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
    decorators:
    {
        complete:ErrorMessagesComponent,
        single:SingleErrorMessagesComponent
    },
    validators:
    {
        complete:ErrorMessagesComponent,
        single:ErrormessageSingleValidatorComponent
    }
}