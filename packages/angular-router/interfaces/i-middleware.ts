export interface IMiddleware {
    invoke(user: { [key: string]: any }, activateRouteSnapshot: any): Promise<boolean> | boolean;
}
