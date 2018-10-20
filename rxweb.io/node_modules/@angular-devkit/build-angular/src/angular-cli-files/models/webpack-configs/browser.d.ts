/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { WebpackConfigOptions } from '../build-options';
/**
+ * license-webpack-plugin has a peer dependency on webpack-sources, list it in a comment to
+ * let the dependency validator know it is used.
+ *
+ * require('webpack-sources')
+ */
export declare function getBrowserConfig(wco: WebpackConfigOptions): {
    devtool: string | boolean;
    resolve: {
        mainFields: string[];
    };
    output: {
        crossOriginLoading: string | boolean;
    };
    optimization: {
        runtimeChunk: string;
        splitChunks: {
            maxAsyncRequests: number;
            cacheGroups: {
                default: boolean | {
                    chunks: string;
                    minChunks: number;
                    priority: number;
                } | undefined;
                common: boolean | {
                    name: string;
                    chunks: string;
                    minChunks: number;
                    enforce: boolean;
                    priority: number;
                } | undefined;
                vendors: boolean;
                vendor: boolean | {
                    name: string;
                    chunks: string;
                    enforce: boolean;
                    test: (module: any, chunks: {
                        name: string;
                    }[]) => boolean;
                } | undefined;
            };
        };
    };
    plugins: any[];
    node: boolean;
};
