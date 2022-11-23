export interface IDataResolver {
    resolve(): Promise<boolean> | boolean;
}
