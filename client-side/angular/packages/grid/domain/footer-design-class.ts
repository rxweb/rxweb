class DropdownDesignClass {
    rootClass: any[] = [];
    controlClass: any[] = [];
    labelClass: any[] = [];
}
class TextDesignClass {
    rootClass: any[] = [];
}

class PaginatorDesignClass {
    rootClass: any[] = [];
    unorderedListItemClass: any[] = [];
    listItemClass: any[] = [];
    anchorClass: any[] = [];
    iconClass: any[] = [];
}
export class FooterDesignClass{
    dropDownTemplateClass: DropdownDesignClass = new DropdownDesignClass();
    textTemplateClass: TextDesignClass = new TextDesignClass();
    paginatorClass: PaginatorDesignClass = new PaginatorDesignClass();
    rootClass: any[] = [];
}