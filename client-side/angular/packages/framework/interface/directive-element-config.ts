export interface DirectiveElementConfig{
    element: HTMLElement;
    propName: string;
}
export interface ComponentDirectiveElement {
    componentId: string;
    directives?: { [key: string]: DirectiveElementConfig[] };
}