import { FormControlStrategy } from "../model/form-control-strategy"
export function extractFormControlStrategy(controlsConfig: any, controlStrategies: {
        [key: string]: FormControlStrategy
    }) {
        Object.keys(controlsConfig).forEach(name => {
            if (Array.isArray(controlsConfig[name])) {
                for (var i = 1; i < controlsConfig[name].length; i++) {
                    let formStrategy = controlsConfig[name][i];
                    if (formStrategy instanceof FormControlStrategy) {
                        controlStrategies[name] = formStrategy
                        controlsConfig[name].splice(i, 1);
                    }
                }
            }
        })
    }