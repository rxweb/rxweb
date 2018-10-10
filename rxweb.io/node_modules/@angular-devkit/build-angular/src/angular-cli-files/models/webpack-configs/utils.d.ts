import { ExtraEntryPoint, ExtraEntryPointObject } from '../../../browser/schema';
export declare const ngAppResolve: (resolvePath: string) => string;
export interface HashFormat {
    chunk: string;
    extract: string;
    file: string;
    script: string;
}
export declare function getOutputHashFormat(option: string, length?: number): HashFormat;
export declare type NormalizedEntryPoint = ExtraEntryPointObject & {
    bundleName: string;
};
export declare function normalizeExtraEntryPoints(extraEntryPoints: ExtraEntryPoint[], defaultBundleName: string): NormalizedEntryPoint[];
