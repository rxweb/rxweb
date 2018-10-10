import * as webpack from 'webpack';
import { WebpackConfigOptions, WebpackTestOptions } from '../build-options';
/**
 * Enumerate loaders and their dependencies from this file to let the dependency validator
 * know they are used.
 *
 * require('istanbul-instrumenter-loader')
 *
 */
export declare function getTestConfig(wco: WebpackConfigOptions<WebpackTestOptions>): webpack.Configuration;
