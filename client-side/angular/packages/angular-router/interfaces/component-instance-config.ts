export interface ComponentInstanceConfig {
    name: string;
    resolver: Function;
    paramChanged: (params: { [key: string]: any }) => void;
    queryParamChanged: (queryParams: { [key: string]: any }) => void;
}