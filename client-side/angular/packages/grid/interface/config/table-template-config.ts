import { EventSubscriber } from "../../domain/event-subscriber";
import { DesignClass } from "../../domain/design-class";
import { GridColumnConfig } from "./grid-column-config";
import { GridConfiguration } from "./grid-configuration";

export interface TableTemplateConfig {
    hideHeader: boolean;
    hideFooter: boolean;
    hideHeaderFooter: boolean;
    isDivBase: boolean;
    classConfig: DesignClass;
    eventSubscriber: EventSubscriber;
    allowSorting: boolean;
    gridColumns: GridColumnConfig[];
    multiLingualPath: string;
    isRowEvent: boolean;
    authorization: { [key: string]: any };
    authroizationMethod: Function;
    isTranslateModuleUsed: boolean;
    gridConfiguration: GridConfiguration
    onFilter: Function;
}