import {  DirtyCompleteValidatorComponent } from "src/assets/examples/howto/validators/dirtyCheck/complete/dirty-check-complete.component";
import { DirtyCheckCompleteComponent } from "src/assets/examples/howto/decorators/dirtyCheck/complete/dirty-check-complete.component";




export const DIRTY_CHECK_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
    validators:
    {
        complete:DirtyCompleteValidatorComponent,   
    },
    decorators:
    {
        complete: DirtyCheckCompleteComponent
    }
}