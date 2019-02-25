import { ErrorMessagesComponent } from "src/assets/examples/how-to/decorators/errorMessage/complete/errorMessage-component";
import { ErrormessageSingleValidatorComponent } from "src/assets/examples/how-to/validators/errorMessage/single-message/errormessage-single.component";
import { SingleErrorMessagesComponent } from "src/assets/examples/how-to/decorators/errorMessage/single-message/errormessage-single.component";
import { ErrormessageSingleComponent } from "src/assets/examples/how-to/validators/errorMessage/complete/errorMessage-component";






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