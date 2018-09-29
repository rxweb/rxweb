import { ISlimScrollOptions } from './slimscroll-options.class';
import { InjectionToken } from '@angular/core';
export interface ISlimScrollOptions {
    position?: string;
    barBackground?: string;
    barOpacity?: string;
    barWidth?: string;
    barBorderRadius?: string;
    barMargin?: string;
    gridBackground?: string;
    gridOpacity?: string;
    gridWidth?: string;
    gridBorderRadius?: string;
    gridMargin?: string;
    alwaysVisible?: boolean;
    visibleTimeout?: number;
}
export declare const SLIMSCROLL_DEFAULTS: InjectionToken<ISlimScrollOptions>;
export declare class SlimScrollOptions implements ISlimScrollOptions {
    position?: string;
    barBackground?: string;
    barOpacity?: string;
    barWidth?: string;
    barBorderRadius?: string;
    barMargin?: string;
    gridBackground?: string;
    gridOpacity?: string;
    gridWidth?: string;
    gridBorderRadius?: string;
    gridMargin?: string;
    alwaysVisible?: boolean;
    visibleTimeout?: number;
    constructor(obj?: ISlimScrollOptions);
    merge(obj?: ISlimScrollOptions): SlimScrollOptions;
}
