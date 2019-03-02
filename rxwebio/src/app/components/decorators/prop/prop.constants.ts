import { PropAddComponent } from "src/assets/examples/decorators/prop/add/prop-add.component";
import { PropServerComponent } from "src/assets/examples/decorators/prop/bindingServerProperty/prop-server.component";
import { PropDefaultComponent } from "src/assets/examples/decorators/prop/defaultValue/prop-default.component";

export const PROP_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
    decorators:
    {
        add:PropAddComponent,
        server:PropServerComponent,
        default:PropDefaultComponent
    }
}