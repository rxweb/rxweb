export interface PropConfig {
  name?: string;
  defaultValue?: any;
  ignore?: (x: any) => boolean;
  messageNexus?:{[key:string]:string};
  isPrimaryKey?: boolean;
}

export interface PropObjectConfig extends PropConfig {
    entityProvider?: Function;
    autoCreate?:boolean;
}

export interface PropArrayConfig extends PropObjectConfig {
    allowMaxIndex?: number;
    messageKey?: string;
    createBlank?: boolean;
}