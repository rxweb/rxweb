import { EventSubscriber } from "../../domain/event-subscriber";
import { DesignClass } from "../../domain/design-class";
import { GridColumnConfig } from "./grid-column-config";

export interface TableTemplateConfig{
    classConfig: DesignClass;
    eventSubscriber: EventSubscriber;
    allowSorting: boolean;
    gridColumns: GridColumnConfig[];
    multiLingualPath: string;
    isRowEvent: boolean;
}