import { gridColumn, grid, actionColumn } from "@rxweb/grid"
@actionColumn({
    name: 'action',
    allowSorting: false,
    configuredTemplate: { templateName: 'articleTypeActionTemplate' }, columnIndex: 3, headerTitle: 'Action', class: ['div-td'.split(' ')]
})
@grid({
    groupColumnHeader: [
        {
            parentTemplateName: "parentTemplate",
            items: [
                { templateName: "groupHeader", columns: ["id", "name"], data: { "name": "FirstColumn" }, index: 0 },
                { templateName: "groupHeader", columns: ["displayOrder"], data: { "name": "Second Column Group" }, index: 0 }
            ]
        }
    ]
})
export class vArticleLookUpBase {


    @gridColumn({ visible: false, columnIndex: 0, allowSorting: true, headerKey: 'id', keyColumn: true })
    id: number;




    @gridColumn({ visible: true, columnIndex: 1, allowSorting: true, headerTitle:"Name", keyColumn: false })
    name: string;



    @gridColumn({ visible: true, columnIndex: 2, allowSorting: true, headerTitle:"Display Order", keyColumn: false })
    displayOrder: string;

}