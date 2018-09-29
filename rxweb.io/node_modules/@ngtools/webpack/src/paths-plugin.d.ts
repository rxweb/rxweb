import * as ts from 'typescript';
import { Callback, NormalModuleFactoryRequest } from './webpack';
export declare function resolveWithPaths(request: NormalModuleFactoryRequest, callback: Callback<NormalModuleFactoryRequest>, compilerOptions: ts.CompilerOptions, host: ts.CompilerHost, cache?: ts.ModuleResolutionCache): void;
