import { Directive, ContentChildren, OnDestroy, QueryList } from "@angular/core"

import { RxTooltipDirective } from "./rx_tooltip_control_directive"

@Directive({
    selector: '[rxTooltipGroup]',
    exportAs: 'tooltipGroup'
})
export class RxTooltipGroupDirective implements OnDestroy {
    @ContentChildren(RxTooltipDirective) private tooltips: QueryList<RxTooltipDirective>;

    show() {
        if (this.tooltips && this.tooltips.length > 0)
            this.tooltips.forEach(t => t.show());
    }

    hide() {
        if (this.tooltips && this.tooltips.length > 0)
            this.tooltips.forEach(t => t.hide());
    }

    ngOnDestroy(): void {
        this.tooltips = undefined;
    }
}