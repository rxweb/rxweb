export interface ISlimScrollState {
    scrollPosition: number;
    isScrollAtStart: boolean;
    isScrollAtEnd: boolean;
}
export declare class SlimScrollState implements ISlimScrollState {
    scrollPosition: number;
    isScrollAtStart: boolean;
    isScrollAtEnd: boolean;
    constructor(obj?: ISlimScrollState);
}
