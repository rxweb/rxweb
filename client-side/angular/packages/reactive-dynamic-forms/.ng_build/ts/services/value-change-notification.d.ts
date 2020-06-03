export declare class ValueChangeNotification {
    private attributeChangeSubscriptions;
    onPropValueChanged(controlId: number, subscription: {
        [key: string]: any;
    }, func: Function): void;
    notifyValueChanged(name: any, value: any, oldValue: any, isProps?: boolean): void;
    private isNotEqual;
    destroy(controlId: number): void;
}
