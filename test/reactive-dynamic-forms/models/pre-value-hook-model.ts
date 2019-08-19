import { FormControlConfig, Hooks} from "@rxweb/reactive-dynamic-forms";

export class PreValueHookModel extends FormControlConfig {

    hooks: Hooks = {
        preValue: (value: any) => {
            return value == "India";
        }
    }

}