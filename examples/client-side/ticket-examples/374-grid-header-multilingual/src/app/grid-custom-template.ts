import { TemplateConfig } from '@rxweb/grid';

export const ARTICLE_TYPE_ACTION_GRID_TEMPLATE: TemplateConfig = {
    ul: {
        class: 'formAction list-unstyled mb-0'.split(' '),
        childrens: [{
            li: {
                class: 'd-inline-block'.split(' '),
                childrens: [{
                    a: {
                        class: [
                            function () {
                                if (!this.isPublished) {
                                    return 'action-btn Order txt-primary mr-4 cursor-pointer'.split(' ');

                                } else {
                                    return 'action-btn Order txt-primary mr-4 cursor-pointer'.split(' ');
                                }
                            }
                        ],
                        childrens: [{
                            i: {
                                class: 'fa fa-arrow-down'.split(' '),
                                event: {
                                    click: 'onDown',
                                },
                                attributes: {
                                    title() {

                                        return 'Down';

                                    }
                                }
                            }
                        },
                        {
                            i: {
                                class: 'fa fa-arrow-up'.split(' '),
                                event: {
                                    click: 'onUp',
                                },
                                attributes: {
                                    title() {
                                        return 'Up';
                                    }
                                }
                            }
                        }],
                    }
                }]
            }

        }
        ]
    }
};

export const GRID_CUSTOM_TEMPLATES: { [key: string]: TemplateConfig } = {
    articleTypeActionTemplate: ARTICLE_TYPE_ACTION_GRID_TEMPLATE,
    groupHeader: {
        div: {
            class: [function (t) { return t.groupColumnCount == 2 ? 2 : 1; }],
            childrens: [{ text: { text: ":gridData.name" } }]

        }
    },
    parentTemplate: {
        div: {
            class: ["div-tr"]
        }
    }

}