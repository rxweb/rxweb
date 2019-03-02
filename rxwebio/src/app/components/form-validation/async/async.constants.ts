import { AsyncGlobalBasedComponent } from "src/assets/examples/reactive-form-validators/decorators/async/globalFunctionBased/async-global.component";
import { AsyncComponentBasedComponent } from "src/assets/examples/reactive-form-validators/decorators/async/componentFunctionBased/async-component.component";

export const ASYNC_COMPONENT_EXAMPLE_CONSTANT: { [key: string]: any } = {
	decorators:{
						global : AsyncGlobalBasedComponent,
						component: AsyncComponentBasedComponent,
			  }
}