import { ResetCompleteComponent } from "src/assets/examples/how-to/resetForm/decorators/reset-complete.component";
import { ResetCompleteValidatorComponent } from "src/assets/examples/how-to/resetForm/validators/reset-complete.component";






export const RESET_FORM_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
    validators:
    {
        complete:ResetCompleteComponent
    },
    decorators:
    {
        complete:ResetCompleteValidatorComponent
    }
}