import { GridColumnConfig } from "./grid-column-config";
import { GridConfiguration } from "./grid-configuration";

export interface ContainerConfig {
    instance: Function;
    columns?: GridColumnConfig[];
    configuration?: GridConfiguration;
}