import { ContainerConfig } from "../interface/config/container-config";
import { GridColumnConfig } from "../interface/config/grid-column-config";
import { GridConfiguration } from "../interface/config/grid-configuration";

export const gridContainer:
    {
        setGridConfiguration(instanceFunc: any, configuration: GridConfiguration),
        get(instanceFunc: any): ContainerConfig,
        addColumn(instanceFunc: any, propertyName: string, columnConfig: GridColumnConfig): void,
    } = new (class {
        private instances: ContainerConfig[] = [];

        setGridConfiguration(instanceFunc: any, configuration: GridConfiguration) {
            let instance: ContainerConfig = this.get(instanceFunc);
            if (instance) 
                instance.configuration = configuration
        }

        get(instanceFunc: any): ContainerConfig {
            let instance: ContainerConfig = this.instances.filter(instance => instance.instance === instanceFunc)[0];
            return instance;
        }

        addColumn(instanceFunc: any, propertyName: string, columnConfig: GridColumnConfig) {
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
