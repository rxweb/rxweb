import { ComponentContainer } from './component_container';
export const DynamicComponentContainer:
    {
        register(componentContainers: ComponentContainer[]): void,
        get(component: any): ComponentContainer;
    } = new (class {
        private componentContainers: ComponentContainer[] = [];

        register(componentContainer: ComponentContainer[]): void {
            componentContainer.forEach(t => {
                var container = this.componentContainers.filter(f => f.component instanceof t.component)
                if (container.length == 0) {
                    this.componentContainers.push(t);
                }
            });
        };

        get(component: any): ComponentContainer {
            var container = this.componentContainers.filter(f => f.component === component)[0];
            return container;
        }
    })();