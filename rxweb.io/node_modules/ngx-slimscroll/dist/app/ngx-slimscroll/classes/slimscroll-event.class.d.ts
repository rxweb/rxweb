export interface ISlimScrollEvent {
    type: 'scrollToBottom' | 'scrollToTop' | 'scrollToPercent' | 'scrollTo' | 'recalculate';
    y?: number;
    percent?: number;
    duration?: number;
    easing?: 'linear' | 'inQuad' | 'outQuad' | 'inOutQuad' | 'inCubic' | 'outCubic' | 'inOutCubic' | 'inQuart' | 'outQuart' | 'inOutQuart' | 'inQuint' | 'outQuint' | 'inOutQuint';
}
export declare class SlimScrollEvent implements ISlimScrollEvent {
    type: 'scrollToBottom' | 'scrollToTop' | 'scrollToPercent' | 'scrollTo' | 'recalculate';
    y?: number;
    percent?: number;
    duration?: number;
    easing: 'linear' | 'inQuad' | 'outQuad' | 'inOutQuad' | 'inCubic' | 'outCubic' | 'inOutCubic' | 'inQuart' | 'outQuart' | 'inOutQuart' | 'inQuint' | 'outQuint' | 'inOutQuint';
    constructor(obj?: ISlimScrollEvent);
}
