export interface PropConfig {
  name?: string;
  defaultValue?: any;
  ignore?: (x: any) => boolean;
  isPrimaryKey?: boolean;
}

export interface PropObjectConfig extends PropConfig {
    entityProvider?: Function;
}