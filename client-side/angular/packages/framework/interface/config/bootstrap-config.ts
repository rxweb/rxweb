

export interface BootstrapConfig {
    template: { [key: string]: any };
    decorators?: {
        authorize?: any,
        multilingual?: any
    }
}