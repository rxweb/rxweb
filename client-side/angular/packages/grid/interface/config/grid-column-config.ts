import { TemplateConfig } from "./template-config";
import { CustomTemplateConfig } from "./custom-template-config";

export class GridColumnConfig{
    name?: string;
    columnIndex: number;
    headerTitle?: string;
    headerKey?: string;
    allowSorting?: boolean;
    allowSearch?: boolean;
    configuredHeaderTemplate?: CustomTemplateConfig;
    template?: TemplateConfig;
    configuredTemplate?: CustomTemplateConfig;
    class?: any[];
    headerClass?: any[];
    headerCellClass?: any[];
    cellClass?: any[];
    style?: {[key:string]:any}
    visible?: boolean = true;
    isAscending?: boolean;
    keyColumn?: boolean;
    parameter?: any;
    preventRowSelect?: boolean; 
    isFilter?: boolean;
}
