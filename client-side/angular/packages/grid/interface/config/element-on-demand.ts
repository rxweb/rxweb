export interface ElementOnDemand{
    element: HTMLElement;
    onLoad: () => HTMLElement;
    onDestroy: () => void;
}