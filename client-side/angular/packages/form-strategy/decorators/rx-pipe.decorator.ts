import { PIPE_CONFIG } from "../const/pipe-config.const";
import { PipeConfig } from "../interface/pipe-config";

export function rxPipe(config: PipeConfig) {
    return function (
        target: any,
    ) {
        PIPE_CONFIG[config.name] = target;
    }
}

