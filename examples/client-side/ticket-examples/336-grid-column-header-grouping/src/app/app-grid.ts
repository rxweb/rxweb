import {  GridDesigner,ElementConfig } from "@rxweb/grid"
export class AppGrid extends GridDesigner {

    constructor(source: any[], model: Function, gridConfiguration?: any) {
        super(source, model, gridConfiguration);
        this.allowSorting = true;
        this.isDivBase = true;
        this.startNodeName = "div";

        this.designClass.tableClass = 'div-table'.split(' ');
        this.designClass.cellClass = ['sorting'];
        this.designClass.headerClass = 'div-thead'.split(' ');
        this.designClass.headerRowClass = 'div-tr'.split(' ');
        this.designClass.headerCellClass = 'div-th'.split(' ');
        this.designClass.bodyClass = 'div-tbody'.split(' ');
        // this.designClass.rowClass = "div-tr".split(' ');
        this.designClass.cellClass = 'div-td'.split(' ');
        this.designClass.ascendingClass = ['fa', 'fa-sort-amount-up', 'sort-indicator', 'ml-2'];
        this.designClass.descendingClass = ['fa', 'fa-sort-amount-down', 'sort-indicator', 'ml-2'];
        this.designClass.rowClass = [function () { return 'div-tr'.split(' '); }];

        this.footerDesignClass.rootClass = 'card-footer card-footer row justify-content-between align-items-center no-gutters'.split(' ');
        this.footerDesignClass.dropDownTemplateClass.rootClass = 'col-sm-auto d-flex align-items-center selectList'.split(' ');
        this.footerDesignClass.dropDownTemplateClass.controlClass = 'form-control form-control-sm cursor-pointer mx-2'.split(' ');
        this.footerDesignClass.textTemplateClass.rootClass = 'dataTables_info mb-3 mb-lg-0'.split(' ');
        this.footerDesignClass.paginatorClass.rootClass = 'pagination pagination-noborder mb-3 mb-lg-0'.split(' ');
        this.footerDesignClass.paginatorClass.unorderedListItemClass = 'pagination pagination-noborder mb-3 mb-lg-0 cursor-pointer'.split(' ');;
        this.footerDesignClass.paginatorClass.listItemClass =
            ['paginate_button', 'page-item', function () { return this.active ? 'active' : ''; }];
        this.footerDesignClass.paginatorClass.anchorClass = 'page-link'.split(' ');
        this.footerDesignClass.dropDownTemplateClass.labelClass = 'd-flex align-items-center font-14'.split(' ');

        this.maxPerPage = 10;
        this.pagingSource = [10, 25, 50, 75, 100];
    }

    get tableElementConfig(): ElementConfig {
        return {
            class: ["table-responsive"],
            childrens: [{
                table: {
                    class: this.designClass.tableClass,
                    childrens: [this.headerTemplate, this.bodyTemplate]
                }
            }]
        };
    }

    clearGrid(elementId) {
        const element = document.getElementById(elementId);
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

}