/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Defines template and style encapsulation options available for Component's {@link Component}.
 *
 * See {@link Component#encapsulation encapsulation}.
 *
 */
export var ViewEncapsulation;
(function (ViewEncapsulation) {
    /**
     * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
     * Element and pre-processing the style rules provided via {@link Component#styles styles} or
     * {@link Component#styleUrls styleUrls}, and adding the new Host Element attribute to all
     * selectors.
     *
     * This is the default option.
     */
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    /**
     * @deprecated v6.1.0 - use {ViewEncapsulation.ShadowDom} instead.
     * Use the native encapsulation mechanism of the renderer.
     *
     * For the DOM this means using the deprecated [Shadow DOM
     * v0](https://w3c.github.io/webcomponents/spec/shadow/) and
     * creating a ShadowRoot for Component's Host Element.
     */
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    /**
     * Don't provide any template or style encapsulation.
     */
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
    /**
     * Use Shadow DOM to encapsulate styles.
     *
     * For the DOM this means using modern [Shadow
     * DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     * creating a ShadowRoot for Component's Host Element.
     *
     * ### Example
     * {@example core/ts/metadata/encapsulation.ts region='longform'}
     */
    ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
})(ViewEncapsulation || (ViewEncapsulation = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL21ldGFkYXRhL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUg7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQU4sSUFBWSxpQkFtQ1g7QUFuQ0QsV0FBWSxpQkFBaUI7SUFDM0I7Ozs7Ozs7T0FPRztJQUNILGlFQUFZLENBQUE7SUFDWjs7Ozs7OztPQU9HO0lBQ0gsNkRBQVUsQ0FBQTtJQUNWOztPQUVHO0lBQ0gseURBQVEsQ0FBQTtJQUVSOzs7Ozs7Ozs7T0FTRztJQUNILG1FQUFhLENBQUE7QUFDZixDQUFDLEVBbkNXLGlCQUFpQixLQUFqQixpQkFBaUIsUUFtQzVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIERlZmluZXMgdGVtcGxhdGUgYW5kIHN0eWxlIGVuY2Fwc3VsYXRpb24gb3B0aW9ucyBhdmFpbGFibGUgZm9yIENvbXBvbmVudCdzIHtAbGluayBDb21wb25lbnR9LlxuICpcbiAqIFNlZSB7QGxpbmsgQ29tcG9uZW50I2VuY2Fwc3VsYXRpb24gZW5jYXBzdWxhdGlvbn0uXG4gKlxuICovXG5leHBvcnQgZW51bSBWaWV3RW5jYXBzdWxhdGlvbiB7XG4gIC8qKlxuICAgKiBFbXVsYXRlIGBOYXRpdmVgIHNjb3Bpbmcgb2Ygc3R5bGVzIGJ5IGFkZGluZyBhbiBhdHRyaWJ1dGUgY29udGFpbmluZyBzdXJyb2dhdGUgaWQgdG8gdGhlIEhvc3RcbiAgICogRWxlbWVudCBhbmQgcHJlLXByb2Nlc3NpbmcgdGhlIHN0eWxlIHJ1bGVzIHByb3ZpZGVkIHZpYSB7QGxpbmsgQ29tcG9uZW50I3N0eWxlcyBzdHlsZXN9IG9yXG4gICAqIHtAbGluayBDb21wb25lbnQjc3R5bGVVcmxzIHN0eWxlVXJsc30sIGFuZCBhZGRpbmcgdGhlIG5ldyBIb3N0IEVsZW1lbnQgYXR0cmlidXRlIHRvIGFsbFxuICAgKiBzZWxlY3RvcnMuXG4gICAqXG4gICAqIFRoaXMgaXMgdGhlIGRlZmF1bHQgb3B0aW9uLlxuICAgKi9cbiAgRW11bGF0ZWQgPSAwLFxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdjYuMS4wIC0gdXNlIHtWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb219IGluc3RlYWQuXG4gICAqIFVzZSB0aGUgbmF0aXZlIGVuY2Fwc3VsYXRpb24gbWVjaGFuaXNtIG9mIHRoZSByZW5kZXJlci5cbiAgICpcbiAgICogRm9yIHRoZSBET00gdGhpcyBtZWFucyB1c2luZyB0aGUgZGVwcmVjYXRlZCBbU2hhZG93IERPTVxuICAgKiB2MF0oaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmNvbXBvbmVudHMvc3BlYy9zaGFkb3cvKSBhbmRcbiAgICogY3JlYXRpbmcgYSBTaGFkb3dSb290IGZvciBDb21wb25lbnQncyBIb3N0IEVsZW1lbnQuXG4gICAqL1xuICBOYXRpdmUgPSAxLFxuICAvKipcbiAgICogRG9uJ3QgcHJvdmlkZSBhbnkgdGVtcGxhdGUgb3Igc3R5bGUgZW5jYXBzdWxhdGlvbi5cbiAgICovXG4gIE5vbmUgPSAyLFxuXG4gIC8qKlxuICAgKiBVc2UgU2hhZG93IERPTSB0byBlbmNhcHN1bGF0ZSBzdHlsZXMuXG4gICAqXG4gICAqIEZvciB0aGUgRE9NIHRoaXMgbWVhbnMgdXNpbmcgbW9kZXJuIFtTaGFkb3dcbiAgICogRE9NXShodHRwczovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL3NoYWRvdy8pIGFuZFxuICAgKiBjcmVhdGluZyBhIFNoYWRvd1Jvb3QgZm9yIENvbXBvbmVudCdzIEhvc3QgRWxlbWVudC5cbiAgICpcbiAgICogIyMjIEV4YW1wbGVcbiAgICoge0BleGFtcGxlIGNvcmUvdHMvbWV0YWRhdGEvZW5jYXBzdWxhdGlvbi50cyByZWdpb249J2xvbmdmb3JtJ31cbiAgICovXG4gIFNoYWRvd0RvbSA9IDNcbn1cbiJdfQ==