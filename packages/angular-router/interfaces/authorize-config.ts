export class AuthorizeConfig {
    accessLevel: number | number[] | any;
    action: string;
    selectorName?: string;
    data?: { [key: string]: any }
}
