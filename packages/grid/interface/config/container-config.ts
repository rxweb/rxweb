import { GridColumnConfig } from "./grid-column-config";

export interface ContainerConfig {
    instance: Function;
    columns?: GridColumnConfig[];
}