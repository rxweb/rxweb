import { FooterDesignClass } from "../../domain/footer-design-class";
import { EventSubscriber } from "../../domain/event-subscriber";
import { Item } from "@rxweb/dom";

export interface PaginatorTemplateConfig {
    designClass: FooterDesignClass;
    dropdownOptions: any[];
    eventSubscriber: EventSubscriber;
    onMaxPerPageChanging: Function;
    onPageChanging: Function;
    paginatorSource: Item[];
    isTop: boolean;
}