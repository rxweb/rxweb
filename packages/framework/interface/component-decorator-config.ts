export interface ComponentDecoratorConfig{
    instance: Function;
    decorators: FrameworkDecoratorConfig[];
}

interface FrameworkDecoratorConfig {
    type: string;
    config: any;
}