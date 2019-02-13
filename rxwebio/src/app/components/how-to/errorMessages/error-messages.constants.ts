import { ErrorMessagesComponent } from "src/assets/examples/how-to/errorMessage/complete/errorMessage-component";
import { SingleErrorMessagesComponent } from "src/assets/examples/how-to/errorMessage/single-message/single-errorMessage-component";



export const ERROR_MESSAGES_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
    validators:
    {
        complete:ErrorMessagesComponent,
        single:SingleErrorMessagesComponent
    }
}