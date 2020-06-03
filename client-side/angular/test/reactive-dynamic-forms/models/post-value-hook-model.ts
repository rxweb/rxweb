import { FormControlConfig, Hooks } from "@rxweb/reactive-dynamic-forms";

export class PostValueHookModel extends FormControlConfig {

    hooks: Hooks = {
        postValue: () => {
            if (this.value == "Bharat")
                this.controlsConfig.lastName.value = "Patel"
        }
    }

}