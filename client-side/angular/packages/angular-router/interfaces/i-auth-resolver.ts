export interface IAuthResolver {
    resolveAuth(): Promise<{ [key: string]: any }> | { [key: string]: any };
}
