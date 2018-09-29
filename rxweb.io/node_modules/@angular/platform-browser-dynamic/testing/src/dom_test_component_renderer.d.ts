/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TestComponentRenderer } from '@angular/core/testing';
/**
 * A DOM based implementation of the TestComponentRenderer.
 */
export declare class DOMTestComponentRenderer extends TestComponentRenderer {
    private _doc; /** TODO #9100 */
    constructor(_doc: any /** TODO #9100 */);
    insertRootElement(rootElId: string): void;
}
