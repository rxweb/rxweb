import { PropDescriptor } from './prop-descriptor';
export declare abstract class BaseFormControlConfig extends PropDescriptor {
    private configs;
    config: {
        [key: string]: any;
    };
    source: any[];
    constructor(configs: {
        [key: string]: any;
    });
    complete(): void;
    refresh(actionName?: string): void;
    private setActionValue;
    private updateActionValue;
    private _actionResult;
    private controlNotifications;
}
