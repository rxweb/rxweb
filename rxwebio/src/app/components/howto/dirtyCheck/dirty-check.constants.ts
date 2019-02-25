import { DirtyCompleteValidatorComponent } from "src/assets/examples/howto/validators/dirtyCheck/complete/dirty-complete.component";
import { DirtyCompleteComponent } from "src/assets/examples/howto/decorators/dirtyCheck/complete/dirty-complete.component";




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