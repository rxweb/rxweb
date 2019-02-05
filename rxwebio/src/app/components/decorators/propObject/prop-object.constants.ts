import { PropObjectAddComponent } from "src/assets/examples/decorators/propObject/add/prop-object-add.component";
import { PropObjectServerComponent } from "src/assets/examples/decorators/propObject/bindingServerProperty/prop-object-server.component";
import { PropArrayDefaultComponent } from "src/assets/examples/decorators/propArray/defaultValue/prop-array-default-component";
import { PropObjectDefaultComponent } from "src/assets/examples/decorators/propObject/defaultValue/prop-object-default.component";

export const PROP_OBJECT_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
        add:PropObjectAddComponent,
        server:PropObjectServerComponent,
        default:PropObjectDefaultComponent
    }
}