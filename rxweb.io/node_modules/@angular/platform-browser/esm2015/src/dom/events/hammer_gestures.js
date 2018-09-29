/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable, InjectionToken, Optional, ɵConsole as Console } from '@angular/core';
import { DOCUMENT } from '../dom_tokens';
import { EventManagerPlugin } from './event_manager';
/** *
 * Supported HammerJS recognizer event names.
  @type {?} */
const EVENT_NAMES = {
    // pan
    'pan': true,
    'panstart': true,
    'panmove': true,
    'panend': true,
    'pancancel': true,
    'panleft': true,
    'panright': true,
    'panup': true,
    'pandown': true,
    // pinch
    'pinch': true,
    'pinchstart': true,
    'pinchmove': true,
    'pinchend': true,
    'pinchcancel': true,
    'pinchin': true,
    'pinchout': true,
    // press
    'press': true,
    'pressup': true,
    // rotate
    'rotate': true,
    'rotatestart': true,
    'rotatemove': true,
    'rotateend': true,
    'rotatecancel': true,
    // swipe
    'swipe': true,
    'swipeleft': true,
    'swiperight': true,
    'swipeup': true,
    'swipedown': true,
    // tap
    'tap': true,
};
/** *
 * DI token for providing [HammerJS](http://hammerjs.github.io/) support to Angular.
 * @see `HammerGestureConfig`
 *
 * \@experimental
  @type {?} */
export const HAMMER_GESTURE_CONFIG = new InjectionToken('HammerGestureConfig');
/** @typedef {?} */
var HammerLoader;
export { HammerLoader };
/** *
 * Injection token used to provide a {\@link HammerLoader} to Angular.
  @type {?} */
export const HAMMER_LOADER = new InjectionToken('HammerLoader');
/**
 * @record
 */
export function HammerInstance() { }
/** @type {?} */
HammerInstance.prototype.on;
/** @type {?} */
HammerInstance.prototype.off;
/**
 * An injectable [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
 * for gesture recognition. Configures specific event recognition.
 * \@experimental
 */
export class HammerGestureConfig {
    constructor() {
        /**
         * A set of supported event names for gestures to be used in Angular.
         * Angular supports all built-in recognizers, as listed in
         * [HammerJS documentation](http://hammerjs.github.io/).
         */
        this.events = [];
        /**
         * Maps gesture event names to a set of configuration options
         * that specify overrides to the default values for specific properties.
         *
         * The key is a supported event name to be configured,
         * and the options object contains a set of properties, with override values
         * to be applied to the named recognizer event.
         * For example, to disable recognition of the rotate event, specify
         *  `{"rotate": {"enable": false}}`.
         *
         * Properties that are not present take the HammerJS default values.
         * For information about which properties are supported for which events,
         * and their allowed and default values, see
         * [HammerJS documentation](http://hammerjs.github.io/).
         *
         */
        this.overrides = {};
    }
    /**
     * Creates a [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
     * and attaches it to a given HTML element.
     * @param {?} element The element that will recognize gestures.
     * @return {?} A HammerJS event-manager object.
     */
    buildHammer(element) {
        /** @type {?} */
        const mc = new /** @type {?} */ ((Hammer))(element, this.options);
        mc.get('pinch').set({ enable: true });
        mc.get('rotate').set({ enable: true });
        for (const eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    }
}
HammerGestureConfig.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * A set of supported event names for gestures to be used in Angular.
     * Angular supports all built-in recognizers, as listed in
     * [HammerJS documentation](http://hammerjs.github.io/).
     * @type {?}
     */
    HammerGestureConfig.prototype.events;
    /**
     * Maps gesture event names to a set of configuration options
     * that specify overrides to the default values for specific properties.
     *
     * The key is a supported event name to be configured,
     * and the options object contains a set of properties, with override values
     * to be applied to the named recognizer event.
     * For example, to disable recognition of the rotate event, specify
     *  `{"rotate": {"enable": false}}`.
     *
     * Properties that are not present take the HammerJS default values.
     * For information about which properties are supported for which events,
     * and their allowed and default values, see
     * [HammerJS documentation](http://hammerjs.github.io/).
     *
     * @type {?}
     */
    HammerGestureConfig.prototype.overrides;
    /**
     * Properties whose default values can be overridden for a given event.
     * Different sets of properties apply to different events.
     * For information about which properties are supported for which events,
     * and their allowed and default values, see
     * [HammerJS documentation](http://hammerjs.github.io/).
     * @type {?}
     */
    HammerGestureConfig.prototype.options;
}
export class HammerGesturesPlugin extends EventManagerPlugin {
    /**
     * @param {?} doc
     * @param {?} _config
     * @param {?} console
     * @param {?=} loader
     */
    constructor(doc, _config, console, loader) {
        super(doc);
        this._config = _config;
        this.console = console;
        this.loader = loader;
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    supports(eventName) {
        if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
            return false;
        }
        if (!(/** @type {?} */ (window)).Hammer && !this.loader) {
            this.console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not ` +
                `loaded and no custom loader has been specified.`);
            return false;
        }
        return true;
    }
    /**
     * @param {?} element
     * @param {?} eventName
     * @param {?} handler
     * @return {?}
     */
    addEventListener(element, eventName, handler) {
        /** @type {?} */
        const zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        // If Hammer is not present but a loader is specified, we defer adding the event listener
        // until Hammer is loaded.
        if (!(/** @type {?} */ (window)).Hammer && this.loader) {
            /** @type {?} */
            let cancelRegistration = false;
            /** @type {?} */
            let deregister = () => { cancelRegistration = true; };
            this.loader()
                .then(() => {
                // If Hammer isn't actually loaded when the custom loader resolves, give up.
                if (!(/** @type {?} */ (window)).Hammer) {
                    this.console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
                    deregister = () => { };
                    return;
                }
                if (!cancelRegistration) {
                    // Now that Hammer is loaded and the listener is being loaded for real,
                    // the deregistration function changes from canceling registration to removal.
                    deregister = this.addEventListener(element, eventName, handler);
                }
            })
                .catch(() => {
                this.console.warn(`The "${eventName}" event cannot be bound because the custom ` +
                    `Hammer.JS loader failed.`);
                deregister = () => { };
            });
            // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
            // can change the behavior of `deregister` once the listener is added. Using a closure in
            // this way allows us to avoid any additional data structures to track listener removal.
            return () => { deregister(); };
        }
        return zone.runOutsideAngular(() => {
            /** @type {?} */
            const mc = this._config.buildHammer(element);
            /** @type {?} */
            const callback = function (eventObj) {
                zone.runGuarded(function () { handler(eventObj); });
            };
            mc.on(eventName, callback);
            return () => mc.off(eventName, callback);
        });
    }
    /**
     * @param {?} eventName
     * @return {?}
     */
    isCustomEvent(eventName) { return this._config.events.indexOf(eventName) > -1; }
}
HammerGesturesPlugin.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HammerGesturesPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: HammerGestureConfig, decorators: [{ type: Inject, args: [HAMMER_GESTURE_CONFIG,] }] },
    { type: Console },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [HAMMER_LOADER,] }] }
];
if (false) {
    /** @type {?} */
    HammerGesturesPlugin.prototype._config;
    /** @type {?} */
    HammerGesturesPlugin.prototype.console;
    /** @type {?} */
    HammerGesturesPlugin.prototype.loader;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWVyX2dlc3R1cmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFFBQVEsSUFBSSxPQUFPLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV2QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUtuRCxNQUFNLFdBQVcsR0FBRzs7SUFFbEIsS0FBSyxFQUFFLElBQUk7SUFDWCxVQUFVLEVBQUUsSUFBSTtJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLFFBQVEsRUFBRSxJQUFJO0lBQ2QsV0FBVyxFQUFFLElBQUk7SUFDakIsU0FBUyxFQUFFLElBQUk7SUFDZixVQUFVLEVBQUUsSUFBSTtJQUNoQixPQUFPLEVBQUUsSUFBSTtJQUNiLFNBQVMsRUFBRSxJQUFJOztJQUVmLE9BQU8sRUFBRSxJQUFJO0lBQ2IsWUFBWSxFQUFFLElBQUk7SUFDbEIsV0FBVyxFQUFFLElBQUk7SUFDakIsVUFBVSxFQUFFLElBQUk7SUFDaEIsYUFBYSxFQUFFLElBQUk7SUFDbkIsU0FBUyxFQUFFLElBQUk7SUFDZixVQUFVLEVBQUUsSUFBSTs7SUFFaEIsT0FBTyxFQUFFLElBQUk7SUFDYixTQUFTLEVBQUUsSUFBSTs7SUFFZixRQUFRLEVBQUUsSUFBSTtJQUNkLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFlBQVksRUFBRSxJQUFJO0lBQ2xCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGNBQWMsRUFBRSxJQUFJOztJQUVwQixPQUFPLEVBQUUsSUFBSTtJQUNiLFdBQVcsRUFB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OzRDQUdKLE1BQU0sU0FBQyxRQUFRO1lBQ2dDLG1CQUFtQix1QkFBbEUsTUFBTSxTQUFDLHFCQUFxQjtZQTNJK0IsT0FBTzs0Q0E0SWxFLFFBQVEsWUFBSSxNQUFNLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCwgybVDb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICcuLi9kb21fdG9rZW5zJztcblxuaW1wb3J0IHtFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5cbi8qKlxuICogU3VwcG9ydGVkIEhhbW1lckpTIHJlY29nbml6ZXIgZXZlbnQgbmFtZXMuXG4gKi9cbmNvbnN0IEVWRU5UX05BTUVTID0ge1xuICAvLyBwYW5cbiAgJ3Bhbic6IHRydWUsXG4gICdwYW5zdGFydCc6IHRydWUsXG4gICdwYW5tb3ZlJzogdHJ1ZSxcbiAgJ3BhbmVuZCc6IHRydWUsXG4gICdwYW5jYW5jZWwnOiB0cnVlLFxuICAncGFubGVmdCc6IHRydWUsXG4gICdwYW5yaWdodCc6IHRydWUsXG4gICdwYW51cCc6IHRydWUsXG4gICdwYW5kb3duJzogdHJ1ZSxcbiAgLy8gcGluY2hcbiAgJ3BpbmNoJzogdHJ1ZSxcbiAgJ3BpbmNoc3RhcnQnOiB0cnVlLFxuICAncGluY2htb3ZlJzogdHJ1ZSxcbiAgJ3BpbmNoZW5kJzogdHJ1ZSxcbiAgJ3BpbmNoY2FuY2VsJzogdHJ1ZSxcbiAgJ3BpbmNoaW4nOiB0cnVlLFxuICAncGluY2hvdXQnOiB0cnVlLFxuICAvLyBwcmVzc1xuICAncHJlc3MnOiB0cnVlLFxuICAncHJlc3N1cCc6IHRydWUsXG4gIC8vIHJvdGF0ZVxuICAncm90YXRlJzogdHJ1ZSxcbiAgJ3JvdGF0ZXN0YXJ0JzogdHJ1ZSxcbiAgJ3JvdGF0ZW1vdmUnOiB0cnVlLFxuICAncm90YXRlZW5kJzogdHJ1ZSxcbiAgJ3JvdGF0ZWNhbmNlbCc6IHRydWUsXG4gIC8vIHN3aXBlXG4gICdzd2lwZSc6IHRydWUsXG4gICdzd2lwZWxlZnQnOiB0cnVlLFxuICAnc3dpcGVyaWdodCc6IHRydWUsXG4gICdzd2lwZXVwJzogdHJ1ZSxcbiAgJ3N3aXBlZG93bic6IHRydWUsXG4gIC8vIHRhcFxuICAndGFwJzogdHJ1ZSxcbn07XG5cbi8qKlxuICogREkgdG9rZW4gZm9yIHByb3ZpZGluZyBbSGFtbWVySlNdKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vKSBzdXBwb3J0IHRvIEFuZ3VsYXIuXG4gKiBAc2VlIGBIYW1tZXJHZXN0dXJlQ29uZmlnYFxuICpcbiAqIEBleHBlcmltZW50YWxcbiAqL1xuZXhwb3J0IGNvbnN0IEhBTU1FUl9HRVNUVVJFX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxIYW1tZXJHZXN0dXJlQ29uZmlnPignSGFtbWVyR2VzdHVyZUNvbmZpZycpO1xuXG5cbi8qKiBGdW5jdGlvbiB0aGF0IGxvYWRzIEhhbW1lckpTLCByZXR1cm5pbmcgYSBwcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgb25jZSBIYW1tZXJKcyBpcyBsb2FkZWQuICovXG5leHBvcnQgdHlwZSBIYW1tZXJMb2FkZXIgPSAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIHVzZWQgdG8gcHJvdmlkZSBhIHtAbGluayBIYW1tZXJMb2FkZXJ9IHRvIEFuZ3VsYXIuICovXG5leHBvcnQgY29uc3QgSEFNTUVSX0xPQURFUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxIYW1tZXJMb2FkZXI+KCdIYW1tZXJMb2FkZXInKTtcblxuZXhwb3J0IGludGVyZmFjZSBIYW1tZXJJbnN0YW5jZSB7XG4gIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZDtcbiAgb2ZmKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZDtcbn1cblxuLyoqXG4gKiBBbiBpbmplY3RhYmxlIFtIYW1tZXJKUyBNYW5hZ2VyXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2FwaS8jaGFtbWVyLm1hbmFnZXIpXG4gKiBmb3IgZ2VzdHVyZSByZWNvZ25pdGlvbi4gQ29uZmlndXJlcyBzcGVjaWZpYyBldmVudCByZWNvZ25pdGlvbi5cbiAqIEBleHBlcmltZW50YWxcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhhbW1lckdlc3R1cmVDb25maWcge1xuICAvKipcbiAgICogQSBzZXQgb2Ygc3VwcG9ydGVkIGV2ZW50IG5hbWVzIGZvciBnZXN0dXJlcyB0byBiZSB1c2VkIGluIEFuZ3VsYXIuXG4gICAqIEFuZ3VsYXIgc3VwcG9ydHMgYWxsIGJ1aWx0LWluIHJlY29nbml6ZXJzLCBhcyBsaXN0ZWQgaW5cbiAgICogW0hhbW1lckpTIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vKS5cbiAgICovXG4gIGV2ZW50czogc3RyaW5nW10gPSBbXTtcblxuICAvKipcbiAgKiBNYXBzIGdlc3R1cmUgZXZlbnQgbmFtZXMgdG8gYSBzZXQgb2YgY29uZmlndXJhdGlvbiBvcHRpb25zXG4gICogdGhhdCBzcGVjaWZ5IG92ZXJyaWRlcyB0byB0aGUgZGVmYXVsdCB2YWx1ZXMgZm9yIHNwZWNpZmljIHByb3BlcnRpZXMuXG4gICpcbiAgKiBUaGUga2V5IGlzIGEgc3VwcG9ydGVkIGV2ZW50IG5hbWUgdG8gYmUgY29uZmlndXJlZCxcbiAgKiBhbmQgdGhlIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5zIGEgc2V0IG9mIHByb3BlcnRpZXMsIHdpdGggb3ZlcnJpZGUgdmFsdWVzXG4gICogdG8gYmUgYXBwbGllZCB0byB0aGUgbmFtZWQgcmVjb2duaXplciBldmVudC5cbiAgKiBGb3IgZXhhbXBsZSwgdG8gZGlzYWJsZSByZWNvZ25pdGlvbiBvZiB0aGUgcm90YXRlIGV2ZW50LCBzcGVjaWZ5XG4gICogIGB7XCJyb3RhdGVcIjoge1wiZW5hYmxlXCI6IGZhbHNlfX1gLlxuICAqXG4gICogUHJvcGVydGllcyB0aGF0IGFyZSBub3QgcHJlc2VudCB0YWtlIHRoZSBIYW1tZXJKUyBkZWZhdWx0IHZhbHVlcy5cbiAgKiBGb3IgaW5mb3JtYXRpb24gYWJvdXQgd2hpY2ggcHJvcGVydGllcyBhcmUgc3VwcG9ydGVkIGZvciB3aGljaCBldmVudHMsXG4gICogYW5kIHRoZWlyIGFsbG93ZWQgYW5kIGRlZmF1bHQgdmFsdWVzLCBzZWVcbiAgKiBbSGFtbWVySlMgZG9jdW1lbnRhdGlvbl0oaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby8pLlxuICAqXG4gICovXG4gIG92ZXJyaWRlczoge1trZXk6IHN0cmluZ106IE9iamVjdH0gPSB7fTtcblxuICAvKipcbiAgICogUHJvcGVydGllcyB3aG9zZSBkZWZhdWx0IHZhbHVlcyBjYW4gYmUgb3ZlcnJpZGRlbiBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogRGlmZmVyZW50IHNldHMgb2YgcHJvcGVydGllcyBhcHBseSB0byBkaWZmZXJlbnQgZXZlbnRzLlxuICAgKiBGb3IgaW5mb3JtYXRpb24gYWJvdXQgd2hpY2ggcHJvcGVydGllcyBhcmUgc3VwcG9ydGVkIGZvciB3aGljaCBldmVudHMsXG4gICAqIGFuZCB0aGVpciBhbGxvd2VkIGFuZCBkZWZhdWx0IHZhbHVlcywgc2VlXG4gICAqIFtIYW1tZXJKUyBkb2N1bWVudGF0aW9uXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvLykuXG4gICAqL1xuICBvcHRpb25zPzoge1xuICAgIGNzc1Byb3BzPzogYW55OyBkb21FdmVudHM/OiBib29sZWFuOyBlbmFibGU/OiBib29sZWFuIHwgKChtYW5hZ2VyOiBhbnkpID0+IGJvb2xlYW4pO1xuICAgIHByZXNldD86IGFueVtdO1xuICAgIHRvdWNoQWN0aW9uPzogc3RyaW5nO1xuICAgIHJlY29nbml6ZXJzPzogYW55W107XG4gICAgaW5wdXRDbGFzcz86IGFueTtcbiAgICBpbnB1dFRhcmdldD86IEV2ZW50VGFyZ2V0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgW0hhbW1lckpTIE1hbmFnZXJdKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vYXBpLyNoYW1tZXIubWFuYWdlcilcbiAgICogYW5kIGF0dGFjaGVzIGl0IHRvIGEgZ2l2ZW4gSFRNTCBlbGVtZW50LlxuICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IHdpbGwgcmVjb2duaXplIGdlc3R1cmVzLlxuICAgKiBAcmV0dXJucyBBIEhhbW1lckpTIGV2ZW50LW1hbmFnZXIgb2JqZWN0LlxuICAgKi9cbiAgYnVpbGRIYW1tZXIoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIYW1tZXJJbnN0YW5jZSB7XG4gICAgY29uc3QgbWMgPSBuZXcgSGFtbWVyICEoZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcblxuICAgIG1jLmdldCgncGluY2gnKS5zZXQoe2VuYWJsZTogdHJ1ZX0pO1xuICAgIG1jLmdldCgncm90YXRlJykuc2V0KHtlbmFibGU6IHRydWV9KTtcblxuICAgIGZvciAoY29uc3QgZXZlbnROYW1lIGluIHRoaXMub3ZlcnJpZGVzKSB7XG4gICAgICBtYy5nZXQoZXZlbnROYW1lKS5zZXQodGhpcy5vdmVycmlkZXNbZXZlbnROYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1jO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIYW1tZXJHZXN0dXJlc1BsdWdpbiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnksXG4gICAgICBASW5qZWN0KEhBTU1FUl9HRVNUVVJFX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBIYW1tZXJHZXN0dXJlQ29uZmlnLCBwcml2YXRlIGNvbnNvbGU6IENvbnNvbGUsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEhBTU1FUl9MT0FERVIpIHByaXZhdGUgbG9hZGVyPzogSGFtbWVyTG9hZGVyfG51bGwpIHtcbiAgICBzdXBlcihkb2MpO1xuICB9XG5cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIUVWRU5UX05BTUVTLmhhc093blByb3BlcnR5KGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpKSAmJiAhdGhpcy5pc0N1c3RvbUV2ZW50KGV2ZW50TmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoISh3aW5kb3cgYXMgYW55KS5IYW1tZXIgJiYgIXRoaXMubG9hZGVyKSB7XG4gICAgICB0aGlzLmNvbnNvbGUud2FybihcbiAgICAgICAgICBgVGhlIFwiJHtldmVudE5hbWV9XCIgZXZlbnQgY2Fubm90IGJlIGJvdW5kIGJlY2F1c2UgSGFtbWVyLkpTIGlzIG5vdCBgICtcbiAgICAgICAgICBgbG9hZGVkIGFuZCBubyBjdXN0b20gbG9hZGVyIGhhcyBiZWVuIHNwZWNpZmllZC5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICBjb25zdCB6b25lID0gdGhpcy5tYW5hZ2VyLmdldFpvbmUoKTtcbiAgICBldmVudE5hbWUgPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIElmIEhhbW1lciBpcyBub3QgcHJlc2VudCBidXQgYSBsb2FkZXIgaXMgc3BlY2lmaWVkLCB3ZSBkZWZlciBhZGRpbmcgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgLy8gdW50aWwgSGFtbWVyIGlzIGxvYWRlZC5cbiAgICBpZiAoISh3aW5kb3cgYXMgYW55KS5IYW1tZXIgJiYgdGhpcy5sb2FkZXIpIHtcbiAgICAgIC8vIFRoaXMgYGFkZEV2ZW50TGlzdGVuZXJgIG1ldGhvZCByZXR1cm5zIGEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoZSBhZGRlZCBsaXN0ZW5lci5cbiAgICAgIC8vIFVudGlsIEhhbW1lciBpcyBsb2FkZWQsIHRoZSByZXR1cm5lZCBmdW5jdGlvbiBuZWVkcyB0byAqY2FuY2VsKiB0aGUgcmVnaXN0cmF0aW9uIHJhdGhlclxuICAgICAgLy8gdGhhbiByZW1vdmUgYW55dGhpbmcuXG4gICAgICBsZXQgY2FuY2VsUmVnaXN0cmF0aW9uID0gZmFsc2U7XG4gICAgICBsZXQgZGVyZWdpc3RlcjogRnVuY3Rpb24gPSAoKSA9PiB7IGNhbmNlbFJlZ2lzdHJhdGlvbiA9IHRydWU7IH07XG5cbiAgICAgIHRoaXMubG9hZGVyKClcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBJZiBIYW1tZXIgaXNuJ3QgYWN0dWFsbHkgbG9hZGVkIHdoZW4gdGhlIGN1c3RvbSBsb2FkZXIgcmVzb2x2ZXMsIGdpdmUgdXAuXG4gICAgICAgICAgICBpZiAoISh3aW5kb3cgYXMgYW55KS5IYW1tZXIpIHtcbiAgICAgICAgICAgICAgdGhpcy5jb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgICBgVGhlIGN1c3RvbSBIQU1NRVJfTE9BREVSIGNvbXBsZXRlZCwgYnV0IEhhbW1lci5KUyBpcyBub3QgcHJlc2VudC5gKTtcbiAgICAgICAgICAgICAgZGVyZWdpc3RlciA9ICgpID0+IHt9O1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghY2FuY2VsUmVnaXN0cmF0aW9uKSB7XG4gICAgICAgICAgICAgIC8vIE5vdyB0aGF0IEhhbW1lciBpcyBsb2FkZWQgYW5kIHRoZSBsaXN0ZW5lciBpcyBiZWluZyBsb2FkZWQgZm9yIHJlYWwsXG4gICAgICAgICAgICAgIC8vIHRoZSBkZXJlZ2lzdHJhdGlvbiBmdW5jdGlvbiBjaGFuZ2VzIGZyb20gY2FuY2VsaW5nIHJlZ2lzdHJhdGlvbiB0byByZW1vdmFsLlxuICAgICAgICAgICAgICBkZXJlZ2lzdGVyID0gdGhpcy5hZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgYFRoZSBcIiR7ZXZlbnROYW1lfVwiIGV2ZW50IGNhbm5vdCBiZSBib3VuZCBiZWNhdXNlIHRoZSBjdXN0b20gYCArXG4gICAgICAgICAgICAgICAgYEhhbW1lci5KUyBsb2FkZXIgZmFpbGVkLmApO1xuICAgICAgICAgICAgZGVyZWdpc3RlciA9ICgpID0+IHt9O1xuICAgICAgICAgIH0pO1xuXG4gICAgICAvLyBSZXR1cm4gYSBmdW5jdGlvbiB0aGF0ICpleGVjdXRlcyogYGRlcmVnaXN0ZXJgIChhbmQgbm90IGBkZXJlZ2lzdGVyYCBpdHNlbGYpIHNvIHRoYXQgd2VcbiAgICAgIC8vIGNhbiBjaGFuZ2UgdGhlIGJlaGF2aW9yIG9mIGBkZXJlZ2lzdGVyYCBvbmNlIHRoZSBsaXN0ZW5lciBpcyBhZGRlZC4gVXNpbmcgYSBjbG9zdXJlIGluXG4gICAgICAvLyB0aGlzIHdheSBhbGxvd3MgdXMgdG8gYXZvaWQgYW55IGFkZGl0aW9uYWwgZGF0YSBzdHJ1Y3R1cmVzIHRvIHRyYWNrIGxpc3RlbmVyIHJlbW92YWwuXG4gICAgICByZXR1cm4gKCkgPT4geyBkZXJlZ2lzdGVyKCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgLy8gQ3JlYXRpbmcgdGhlIG1hbmFnZXIgYmluZCBldmVudHMsIG11c3QgYmUgZG9uZSBvdXRzaWRlIG9mIGFuZ3VsYXJcbiAgICAgIGNvbnN0IG1jID0gdGhpcy5fY29uZmlnLmJ1aWxkSGFtbWVyKGVsZW1lbnQpO1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbihldmVudE9iajogSGFtbWVySW5wdXQpIHtcbiAgICAgICAgem9uZS5ydW5HdWFyZGVkKGZ1bmN0aW9uKCkgeyBoYW5kbGVyKGV2ZW50T2JqKTsgfSk7XG4gICAgICB9O1xuICAgICAgbWMub24oZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm4gKCkgPT4gbWMub2ZmKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH0pO1xuICB9XG5cbiAgaXNDdXN0b21FdmVudChldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY29uZmlnLmV2ZW50cy5pbmRleE9mKGV2ZW50TmFtZSkgPiAtMTsgfVxufVxuIl19