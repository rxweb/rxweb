import { SanitizeConfig } from "../interface/sanitize-config";
import { PIPE_CONFIG } from "../const/pipe-config.const";

export function sanitize(config: SanitizeConfig ) {
    return function (
        target: any,
    ) {
        PIPE_CONFIG[config.name] = target;
    }
}

