import { EventSubscriber } from "../../domain/event-subscriber";
import { DesignClass } from "../../domain/design-class";
import { GridColumnConfig } from "./grid-column-config";

export interface TableTemplateConfig{
    hideHeaderFooter: boolean;
    isDivBase: boolean;
    classConfig: DesignClass;
    eventSubscriber: EventSubscriber;
    allowSorting: boolean;
    gridColumns: GridColumnConfig[];
    multiLingualPath: string;
    isRowEvent: boolean;
}