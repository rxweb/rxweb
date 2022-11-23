import { ValueChangeNotification } from "./value-change-notification";
export declare class PropDescriptor extends ValueChangeNotification {
    protected isDefinedFilter: boolean;
    props: {
        [key: string]: any;
    };
    protected checkFilterFunction(): void;
    defineProp(propName: string): void;
    protected overrideProps(): void;
    protected overrideErrorsProp(formControl: any): void;
}
