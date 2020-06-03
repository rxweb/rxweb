export interface IFilter {
    onPreInit(): Promise<boolean> | boolean;
}
