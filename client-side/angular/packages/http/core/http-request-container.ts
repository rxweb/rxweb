import { ServiceContainerConfig } from "../interface/service-container-config";
import { BaseHttpClientConfig } from "../interface/base-http-client-config";

export const httpRequestContainer:
    {
        register(target: any, config: any,type:string);
        get(target: any): ServiceContainerConfig[];
        getConfig();
        registerConfig(baseConfig: BaseHttpClientConfig);
    } = new (class {

        private serviceContainers: ServiceContainerConfig[] = new Array<ServiceContainerConfig>();
        private baseConfig: BaseHttpClientConfig;

        register(target: any, config: any, type: string): void {
            let serviceContainer = this.serviceContainers.filter(t => t.target == target && t.type == type)[0]
            if (!serviceContainer)
                this.serviceContainers.push({ target: target, config: config,type:type });
        }

        registerConfig(httpClientConfig: BaseHttpClientConfig) {
            this.baseConfig = httpClientConfig;
        }
    


        get(target: any): ServiceContainerConfig[] {
            return this.serviceContainers.filter(t => t.target == target);
        }


        getConfig() {
            return this.baseConfig;
        }

        

    })();
