import { BaseConfig } from './base-config'
import { Observable } from 'rxjs';
export interface BaseConfigFn<T> extends BaseConfig {
    dynamicConfig?: (
        parent: { [key: string]: any },
        root: { [key: string]: any },
        config: any) => any;

    validatorConfig?: Observable<Partial<T>>;
}