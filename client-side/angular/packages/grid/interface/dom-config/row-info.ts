import { ColumnInfo } from "./column-info";
import { IDomInfo } from "./i-dom-info";

export interface RowInfo extends IDomInfo {
    columns: ColumnInfo[];
}
