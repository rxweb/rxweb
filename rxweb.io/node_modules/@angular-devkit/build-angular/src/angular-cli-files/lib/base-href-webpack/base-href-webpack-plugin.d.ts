/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export interface BaseHrefWebpackPluginOptions {
    baseHref: string;
}
export declare class BaseHrefWebpackPlugin {
    readonly options: BaseHrefWebpackPluginOptions;
    constructor(options: BaseHrefWebpackPluginOptions);
    apply(compiler: any): void;
}
