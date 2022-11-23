import { PropValidationConfig } from "../prop-validation-config"
import { ModelConfig } from './model-config';
import { ErrorConfig } from "./error-config";
import { DisableConfig } from "./disable-config";
import { ElementClassConfig } from "./element-class-config";

export interface PropsConfig extends ModelConfig {
    validationConfig?: PropValidationConfig;
    error?: ErrorConfig;
    disable?: DisableConfig;
    elementClass?: ElementClassConfig;
    ignore?: (x: any) => boolean;
}

