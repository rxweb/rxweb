export interface IMultilingual {
    load(name: string) : boolean | Promise<boolean>;
}