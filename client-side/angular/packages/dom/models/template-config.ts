

export class TemplateConfig {
    div?: ElementConfig;
    span?: ElementConfig;
    table?: ElementConfig;
    thead?: ElementConfig;
    tr?: ElementConfig;
    th?: ElementConfig;
    tbody?: ElementConfig;
    td?: ElementConfig;
    text?: TextConfig;
    i?: ElementConfig;
    select?: ElementConfig;
    option?: ElementConfig;
    ul?: ElementConfig;
    li?: ElementConfig;
    a?: ElementConfig;
    label?: ElementConfig;
    img?: ElementConfig;
    h2?: ElementConfig;
    p?: ElementConfig;
    button?: ElementConfig
}

export class ElementConfig {
    if?: Function;
    style?: { [key: string]: any };
    class?: any[];
    attributes?: { [key: string]: any };
    text?: any[];
    childrens?: TemplateConfig[];
    sourceItems?: any;
    source?: Function;
    event?: { [key: string]: any }
    id?: string;
    parameterConfig?: any
}

export class TextConfig {
    text: string | Function;
}