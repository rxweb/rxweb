export interface ActionFnConfig {
    label?: () => string;
    filter?: () => any[] | Promise<any[]>;
    placeholder?: () => string;
    hide?: () => boolean;
    description?: () => string;
    disabled?: () => boolean;
    readonly?: () => boolean;
    focus?: () => boolean;
    class?:()=>string[]
}

export interface ActionResult {
    img: string;
    source:any[]
    label: string;
    placeholder: string;
    filter: any[];
    hide: boolean;
    description: string;
    disabled: boolean;
    readonly: boolean;
    focus: boolean;
    class: string[];
    prependText: string;
}

export interface Hooks {
    preValue?: (value: any) => boolean;
    postValue?: () => void;
}

