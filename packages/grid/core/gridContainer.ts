import { ContainerConfig } from "../interface/config/container-config";
import { GridColumnConfig } from "../interface/config/grid-column-config";

export const gridContainer:
    {
        get(instanceFunc: any): ContainerConfig,
        addColumn(instanceFunc: any,propertyName:string, columnConfig: GridColumnConfig): void,
    } = new (class {
        private instances: ContainerConfig[] = [];

        get(instanceFunc: any): ContainerConfig {
            let instance: ContainerConfig = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            return instance;
        }

        addColumn(instanceFunc: any,propertyName:string, columnConfig: GridColumnConfig) {
            let instance = this.get(instanceFunc) as ContainerConfig;
            if (!instance) {
                instance = { instance: instanceFunc };
                instance.columns = [];
                this.instances.push(instance);
            }
            columnConfig.name = propertyName;
            columnConfig.visible = columnConfig.visible === undefined ? true : columnConfig.visible;
            columnConfig.allowSorting = columnConfig.allowSorting === undefined ? true : columnConfig.allowSorting;
            instance.columns.push(columnConfig);
        }
    })();
