export interface ComponentDecoratorConfig{
    instance: Function;
    decorators: FrameworkDecoratorConfig[];
}

export interface FrameworkDecoratorConfig {
    type: string;
    config: any;
}