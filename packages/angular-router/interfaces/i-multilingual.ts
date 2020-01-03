export interface IMultilingual {
    resolve(name: string) : boolean | Promise<boolean>;
}
