export interface StoreProcedureConfig {
    nextPage: number;
    length: number;
    onPageChanging: (nextPage: number) => void;
    onPageSorting?:(columnName:string,order:boolean,currentPage:number) => void
}