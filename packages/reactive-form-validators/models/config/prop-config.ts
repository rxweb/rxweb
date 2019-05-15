export interface PropConfig {
  name?: string;
  defaultValue?: any;
  ignore?: (x: any) => boolean;
  isPrimaryKey?: boolean;
}
