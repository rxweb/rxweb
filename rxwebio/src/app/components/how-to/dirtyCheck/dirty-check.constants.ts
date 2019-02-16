
import { DirtyCompleteComponent } from "src/assets/examples/how-to/dirtyCheck/decorators/complete/dirty-complete.component";
import { DirtyCompleteValidatorComponent } from "src/assets/examples/how-to/dirtyCheck/validators/complete/dirty-complete.component";



export const DIRTY_CHECK_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
    validators:
    {
        complete:DirtyCompleteValidatorComponent,   
    },
    decorators:
    {
        complete: DirtyCompleteComponent
    }
}