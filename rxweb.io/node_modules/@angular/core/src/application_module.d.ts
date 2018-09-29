/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef } from './application_ref';
import { IterableDiffers, KeyValueDiffers } from './change_detection/change_detection';
import { StaticProvider } from './di';
export declare function _iterableDiffersFactory(): IterableDiffers;
export declare function _keyValueDiffersFactory(): KeyValueDiffers;
export declare function _localeFactory(locale?: string): string;
export declare const APPLICATION_MODULE_PROVIDERS: StaticProvider[];
/**
 * This module includes the providers of @angular/core that are needed
 * to bootstrap components via `ApplicationRef`.
 *
 * @experimental
 */
export declare class ApplicationModule {
    constructor(appRef: ApplicationRef);
}
