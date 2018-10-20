/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, InjectionToken, Optional, ɵConsole as Console } from '@angular/core';
import { DOCUMENT } from '../dom_tokens';
import { EventManagerPlugin } from './event_manager';
/**
 * Supported HammerJS recognizer event names.
 */
var EVENT_NAMES = {
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
/**
 * DI token for providing [HammerJS](http://hammerjs.github.io/) support to Angular.
 * @see `HammerGestureConfig`
 *
 * @experimental
 */
export var HAMMER_GESTURE_CONFIG = new InjectionToken('HammerGestureConfig');
/** Injection token used to provide a {@link HammerLoader} to Angular. */
export var HAMMER_LOADER = new InjectionToken('HammerLoader');
/**
 * An injectable [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
 * for gesture recognition. Configures specific event recognition.
 * @experimental
 */
var HammerGestureConfig = /** @class */ (function () {
    function HammerGestureConfig() {
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
     * @param element The element that will recognize gestures.
     * @returns A HammerJS event-manager object.
     */
    HammerGestureConfig.prototype.buildHammer = function (element) {
        var mc = new Hammer(element, this.options);
        mc.get('pinch').set({ enable: true });
        mc.get('rotate').set({ enable: true });
        for (var eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    };
    HammerGestureConfig = tslib_1.__decorate([
        Injectable()
    ], HammerGestureConfig);
    return HammerGestureConfig;
}());
export { HammerGestureConfig };
var HammerGesturesPlugin = /** @class */ (function (_super) {
    tslib_1.__extends(HammerGesturesPlugin, _super);
    function HammerGesturesPlugin(doc, _config, console, loader) {
        var _this = _super.call(this, doc) || this;
        _this._config = _config;
        _this.console = console;
        _this.loader = loader;
        return _this;
    }
    HammerGesturesPlugin.prototype.supports = function (eventName) {
        if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
            return false;
        }
        if (!window.Hammer && !this.loader) {
            this.console.warn("The \"" + eventName + "\" event cannot be bound because Hammer.JS is not " +
                "loaded and no custom loader has been specified.");
            return false;
        }
        return true;
    };
    HammerGesturesPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var _this = this;
        var zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        // If Hammer is not present but a loader is specified, we defer adding the event listener
        // until Hammer is loaded.
        if (!window.Hammer && this.loader) {
            // This `addEventListener` method returns a function to remove the added listener.
            // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
            // than remove anything.
            var cancelRegistration_1 = false;
            var deregister_1 = function () { cancelRegistration_1 = true; };
            this.loader()
                .then(function () {
                // If Hammer isn't actually loaded when the custom loader resolves, give up.
                if (!window.Hammer) {
                    _this.console.warn("The custom HAMMER_LOADER completed, but Hammer.JS is not present.");
                    deregister_1 = function () { };
                    return;
                }
                if (!cancelRegistration_1) {
                    // Now that Hammer is loaded and the listener is being loaded for real,
                    // the deregistration function changes from canceling registration to removal.
                    deregister_1 = _this.addEventListener(element, eventName, handler);
                }
            })
                .catch(function () {
                _this.console.warn("The \"" + eventName + "\" event cannot be bound because the custom " +
                    "Hammer.JS loader failed.");
                deregister_1 = function () { };
            });
            // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
            // can change the behavior of `deregister` once the listener is added. Using a closure in
            // this way allows us to avoid any additional data structures to track listener removal.
            return function () { deregister_1(); };
        }
        return zone.runOutsideAngular(function () {
            // Creating the manager bind events, must be done outside of angular
            var mc = _this._config.buildHammer(element);
            var callback = function (eventObj) {
                zone.runGuarded(function () { handler(eventObj); });
            };
            mc.on(eventName, callback);
            return function () {
                mc.off(eventName, callback);
                // destroy mc to prevent memory leak
                if (typeof mc.destroy === 'function') {
                    mc.destroy();
                }
            };
        });
    };
    HammerGesturesPlugin.prototype.isCustomEvent = function (eventName) { return this._config.events.indexOf(eventName) > -1; };
    HammerGesturesPlugin = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(DOCUMENT)),
        tslib_1.__param(1, Inject(HAMMER_GESTURE_CONFIG)),
        tslib_1.__param(3, Optional()), tslib_1.__param(3, Inject(HAMMER_LOADER)),
        tslib_1.__metadata("design:paramtypes", [Object, HammerGestureConfig, Console, Object])
    ], HammerGesturesPlugin);
    return HammerGesturesPlugin;
}(EventManagerPlugin));
export { HammerGesturesPlugin };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWVyX2dlc3R1cmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxJQUFJLE9BQU8sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVoRyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRW5EOztHQUVHO0FBQ0gsSUFBTSxXQUFXLEdBQUc7SUFDbEIsTUFBTTtJQUNOLEtBQUssRUFBRSxJQUFJO0lBQ1gsVUFBVSxFQUFFLElBQUk7SUFDaEIsU0FBUyxFQUFFLElBQUk7SUFDZixRQUFRLEVBQUUsSUFBSTtJQUNkLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsVUFBVSxFQUFFLElBQUk7SUFDaEIsT0FBTyxFQUFFLElBQUk7SUFDYixTQUFTLEVBQUUsSUFBSTtJQUNmLFFBQVE7SUFDUixPQUFPLEVBQUUsSUFBSTtJQUNiLFlBQVksRUFBRSxJQUFJO0lBQ2xCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFNBQVMsRUFBRSxJQUFJO0lBQ2YsVUFBVSxFQUFFLElBQUk7SUFDaEIsUUFBUTtJQUNSLE9BQU8sRUFBRSxJQUFJO0lBQ2IsU0FBUyxFQUFFLElBQUk7SUFDZixTQUFTO0lBQ1QsUUFBUSxFQUFFLElBQUk7SUFDZCxhQUFhLEVBQUUsSUFBSTtJQUNuQixZQUFZLEVBQUUsSUFBSTtJQUNsQixXQUFXLEVBQUUsSUFB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USxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUM7WUFDRixFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMzQixPQUFPO2dCQUNMLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QixvQ0FBb0M7Z0JBQ3BDLElBQUksT0FBTyxFQUFFLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtvQkFDcEMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNkO1lBQ0gsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNENBQWEsR0FBYixVQUFjLFNBQWlCLElBQWEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBbEZ0RixvQkFBb0I7UUFEaEMsVUFBVSxFQUFFO1FBR04sbUJBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2hCLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBQzdCLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO3lEQURjLG1CQUFtQixFQUFtQixPQUFPO09BSHRGLG9CQUFvQixDQW1GaEM7SUFBRCwyQkFBQztDQUFBLEFBbkZELENBQTBDLGtCQUFrQixHQW1GM0Q7U0FuRlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsLCDJtUNvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJy4uL2RvbV90b2tlbnMnO1xuXG5pbXBvcnQge0V2ZW50TWFuYWdlclBsdWdpbn0gZnJvbSAnLi9ldmVudF9tYW5hZ2VyJztcblxuLyoqXG4gKiBTdXBwb3J0ZWQgSGFtbWVySlMgcmVjb2duaXplciBldmVudCBuYW1lcy5cbiAqL1xuY29uc3QgRVZFTlRfTkFNRVMgPSB7XG4gIC8vIHBhblxuICAncGFuJzogdHJ1ZSxcbiAgJ3BhbnN0YXJ0JzogdHJ1ZSxcbiAgJ3Bhbm1vdmUnOiB0cnVlLFxuICAncGFuZW5kJzogdHJ1ZSxcbiAgJ3BhbmNhbmNlbCc6IHRydWUsXG4gICdwYW5sZWZ0JzogdHJ1ZSxcbiAgJ3BhbnJpZ2h0JzogdHJ1ZSxcbiAgJ3BhbnVwJzogdHJ1ZSxcbiAgJ3BhbmRvd24nOiB0cnVlLFxuICAvLyBwaW5jaFxuICAncGluY2gnOiB0cnVlLFxuICAncGluY2hzdGFydCc6IHRydWUsXG4gICdwaW5jaG1vdmUnOiB0cnVlLFxuICAncGluY2hlbmQnOiB0cnVlLFxuICAncGluY2hjYW5jZWwnOiB0cnVlLFxuICAncGluY2hpbic6IHRydWUsXG4gICdwaW5jaG91dCc6IHRydWUsXG4gIC8vIHByZXNzXG4gICdwcmVzcyc6IHRydWUsXG4gICdwcmVzc3VwJzogdHJ1ZSxcbiAgLy8gcm90YXRlXG4gICdyb3RhdGUnOiB0cnVlLFxuICAncm90YXRlc3RhcnQnOiB0cnVlLFxuICAncm90YXRlbW92ZSc6IHRydWUsXG4gICdyb3RhdGVlbmQnOiB0cnVlLFxuICAncm90YXRlY2FuY2VsJzogdHJ1ZSxcbiAgLy8gc3dpcGVcbiAgJ3N3aXBlJzogdHJ1ZSxcbiAgJ3N3aXBlbGVmdCc6IHRydWUsXG4gICdzd2lwZXJpZ2h0JzogdHJ1ZSxcbiAgJ3N3aXBldXAnOiB0cnVlLFxuICAnc3dpcGVkb3duJzogdHJ1ZSxcbiAgLy8gdGFwXG4gICd0YXAnOiB0cnVlLFxufTtcblxuLyoqXG4gKiBESSB0b2tlbiBmb3IgcHJvdmlkaW5nIFtIYW1tZXJKU10oaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby8pIHN1cHBvcnQgdG8gQW5ndWxhci5cbiAqIEBzZWUgYEhhbW1lckdlc3R1cmVDb25maWdgXG4gKlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5leHBvcnQgY29uc3QgSEFNTUVSX0dFU1RVUkVfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPEhhbW1lckdlc3R1cmVDb25maWc+KCdIYW1tZXJHZXN0dXJlQ29uZmlnJyk7XG5cblxuLyoqIEZ1bmN0aW9uIHRoYXQgbG9hZHMgSGFtbWVySlMsIHJldHVybmluZyBhIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCBvbmNlIEhhbW1lckpzIGlzIGxvYWRlZC4gKi9cbmV4cG9ydCB0eXBlIEhhbW1lckxvYWRlciA9ICgpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIGEge0BsaW5rIEhhbW1lckxvYWRlcn0gdG8gQW5ndWxhci4gKi9cbmV4cG9ydCBjb25zdCBIQU1NRVJfTE9BREVSID0gbmV3IEluamVjdGlvblRva2VuPEhhbW1lckxvYWRlcj4oJ0hhbW1lckxvYWRlcicpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhhbW1lckluc3RhbmNlIHtcbiAgb24oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkO1xuICBvZmYoZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkO1xuICBkZXN0cm95PygpOiB2b2lkO1xufVxuXG4vKipcbiAqIEFuIGluamVjdGFibGUgW0hhbW1lckpTIE1hbmFnZXJdKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vYXBpLyNoYW1tZXIubWFuYWdlcilcbiAqIGZvciBnZXN0dXJlIHJlY29nbml0aW9uLiBDb25maWd1cmVzIHNwZWNpZmljIGV2ZW50IHJlY29nbml0aW9uLlxuICogQGV4cGVyaW1lbnRhbFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSGFtbWVyR2VzdHVyZUNvbmZpZyB7XG4gIC8qKlxuICAgKiBBIHNldCBvZiBzdXBwb3J0ZWQgZXZlbnQgbmFtZXMgZm9yIGdlc3R1cmVzIHRvIGJlIHVzZWQgaW4gQW5ndWxhci5cbiAgICogQW5ndWxhciBzdXBwb3J0cyBhbGwgYnVpbHQtaW4gcmVjb2duaXplcnMsIGFzIGxpc3RlZCBpblxuICAgKiBbSGFtbWVySlMgZG9jdW1lbnRhdGlvbl0oaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby8pLlxuICAgKi9cbiAgZXZlbnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAqIE1hcHMgZ2VzdHVyZSBldmVudCBuYW1lcyB0byBhIHNldCBvZiBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgKiB0aGF0IHNwZWNpZnkgb3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHZhbHVlcyBmb3Igc3BlY2lmaWMgcHJvcGVydGllcy5cbiAgKlxuICAqIFRoZSBrZXkgaXMgYSBzdXBwb3J0ZWQgZXZlbnQgbmFtZSB0byBiZSBjb25maWd1cmVkLFxuICAqIGFuZCB0aGUgb3B0aW9ucyBvYmplY3QgY29udGFpbnMgYSBzZXQgb2YgcHJvcGVydGllcywgd2l0aCBvdmVycmlkZSB2YWx1ZXNcbiAgKiB0byBiZSBhcHBsaWVkIHRvIHRoZSBuYW1lZCByZWNvZ25pemVyIGV2ZW50LlxuICAqIEZvciBleGFtcGxlLCB0byBkaXNhYmxlIHJlY29nbml0aW9uIG9mIHRoZSByb3RhdGUgZXZlbnQsIHNwZWNpZnlcbiAgKiAgYHtcInJvdGF0ZVwiOiB7XCJlbmFibGVcIjogZmFsc2V9fWAuXG4gICpcbiAgKiBQcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBwcmVzZW50IHRha2UgdGhlIEhhbW1lckpTIGRlZmF1bHQgdmFsdWVzLlxuICAqIEZvciBpbmZvcm1hdGlvbiBhYm91dCB3aGljaCBwcm9wZXJ0aWVzIGFyZSBzdXBwb3J0ZWQgZm9yIHdoaWNoIGV2ZW50cyxcbiAgKiBhbmQgdGhlaXIgYWxsb3dlZCBhbmQgZGVmYXVsdCB2YWx1ZXMsIHNlZVxuICAqIFtIYW1tZXJKUyBkb2N1bWVudGF0aW9uXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvLykuXG4gICpcbiAgKi9cbiAgb3ZlcnJpZGVzOiB7W2tleTogc3RyaW5nXTogT2JqZWN0fSA9IHt9O1xuXG4gIC8qKlxuICAgKiBQcm9wZXJ0aWVzIHdob3NlIGRlZmF1bHQgdmFsdWVzIGNhbiBiZSBvdmVycmlkZGVuIGZvciBhIGdpdmVuIGV2ZW50LlxuICAgKiBEaWZmZXJlbnQgc2V0cyBvZiBwcm9wZXJ0aWVzIGFwcGx5IHRvIGRpZmZlcmVudCBldmVudHMuXG4gICAqIEZvciBpbmZvcm1hdGlvbiBhYm91dCB3aGljaCBwcm9wZXJ0aWVzIGFyZSBzdXBwb3J0ZWQgZm9yIHdoaWNoIGV2ZW50cyxcbiAgICogYW5kIHRoZWlyIGFsbG93ZWQgYW5kIGRlZmF1bHQgdmFsdWVzLCBzZWVcbiAgICogW0hhbW1lckpTIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vKS5cbiAgICovXG4gIG9wdGlvbnM/OiB7XG4gICAgY3NzUHJvcHM/OiBhbnk7IGRvbUV2ZW50cz86IGJvb2xlYW47IGVuYWJsZT86IGJvb2xlYW4gfCAoKG1hbmFnZXI6IGFueSkgPT4gYm9vbGVhbik7XG4gICAgcHJlc2V0PzogYW55W107XG4gICAgdG91Y2hBY3Rpb24/OiBzdHJpbmc7XG4gICAgcmVjb2duaXplcnM/OiBhbnlbXTtcbiAgICBpbnB1dENsYXNzPzogYW55O1xuICAgIGlucHV0VGFyZ2V0PzogRXZlbnRUYXJnZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBbSGFtbWVySlMgTWFuYWdlcl0oaHR0cDovL2hhbW1lcmpzLmdpdGh1Yi5pby9hcGkvI2hhbW1lci5tYW5hZ2VyKVxuICAgKiBhbmQgYXR0YWNoZXMgaXQgdG8gYSBnaXZlbiBIVE1MIGVsZW1lbnQuXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IHRoYXQgd2lsbCByZWNvZ25pemUgZ2VzdHVyZXMuXG4gICAqIEByZXR1cm5zIEEgSGFtbWVySlMgZXZlbnQtbWFuYWdlciBvYmplY3QuXG4gICAqL1xuICBidWlsZEhhbW1lcihlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhhbW1lckluc3RhbmNlIHtcbiAgICBjb25zdCBtYyA9IG5ldyBIYW1tZXIgIShlbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuXG4gICAgbWMuZ2V0KCdwaW5jaCcpLnNldCh7ZW5hYmxlOiB0cnVlfSk7XG4gICAgbWMuZ2V0KCdyb3RhdGUnKS5zZXQoe2VuYWJsZTogdHJ1ZX0pO1xuXG4gICAgZm9yIChjb25zdCBldmVudE5hbWUgaW4gdGhpcy5vdmVycmlkZXMpIHtcbiAgICAgIG1jLmdldChldmVudE5hbWUpLnNldCh0aGlzLm92ZXJyaWRlc1tldmVudE5hbWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWM7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhhbW1lckdlc3R1cmVzUGx1Z2luIGV4dGVuZHMgRXZlbnRNYW5hZ2VyUGx1Z2luIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2M6IGFueSxcbiAgICAgIEBJbmplY3QoSEFNTUVSX0dFU1RVUkVfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IEhhbW1lckdlc3R1cmVDb25maWcsIHByaXZhdGUgY29uc29sZTogQ29uc29sZSxcbiAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoSEFNTUVSX0xPQURFUikgcHJpdmF0ZSBsb2FkZXI/OiBIYW1tZXJMb2FkZXJ8bnVsbCkge1xuICAgIHN1cGVyKGRvYyk7XG4gIH1cblxuICBzdXBwb3J0cyhldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghRVZFTlRfTkFNRVMuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lLnRvTG93ZXJDYXNlKCkpICYmICF0aGlzLmlzQ3VzdG9tRXZlbnQoZXZlbnROYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLkhhbW1lciAmJiAhdGhpcy5sb2FkZXIpIHtcbiAgICAgIHRoaXMuY29uc29sZS53YXJuKFxuICAgICAgICAgIGBUaGUgXCIke2V2ZW50TmFtZX1cIiBldmVudCBjYW5ub3QgYmUgYm91bmQgYmVjYXVzZSBIYW1tZXIuSlMgaXMgbm90IGAgK1xuICAgICAgICAgIGBsb2FkZWQgYW5kIG5vIGN1c3RvbSBsb2FkZXIgaGFzIGJlZW4gc3BlY2lmaWVkLmApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICAgIGNvbnN0IHpvbmUgPSB0aGlzLm1hbmFnZXIuZ2V0Wm9uZSgpO1xuICAgIGV2ZW50TmFtZSA9IGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgLy8gSWYgSGFtbWVyIGlzIG5vdCBwcmVzZW50IGJ1dCBhIGxvYWRlciBpcyBzcGVjaWZpZWQsIHdlIGRlZmVyIGFkZGluZyB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAvLyB1bnRpbCBIYW1tZXIgaXMgbG9hZGVkLlxuICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLkhhbW1lciAmJiB0aGlzLmxvYWRlcikge1xuICAgICAgLy8gVGhpcyBgYWRkRXZlbnRMaXN0ZW5lcmAgbWV0aG9kIHJldHVybnMgYSBmdW5jdGlvbiB0byByZW1vdmUgdGhlIGFkZGVkIGxpc3RlbmVyLlxuICAgICAgLy8gVW50aWwgSGFtbWVyIGlzIGxvYWRlZCwgdGhlIHJldHVybmVkIGZ1bmN0aW9uIG5lZWRzIHRvICpjYW5jZWwqIHRoZSByZWdpc3RyYXRpb24gcmF0aGVyXG4gICAgICAvLyB0aGFuIHJlbW92ZSBhbnl0aGluZy5cbiAgICAgIGxldCBjYW5jZWxSZWdpc3RyYXRpb24gPSBmYWxzZTtcbiAgICAgIGxldCBkZXJlZ2lzdGVyOiBGdW5jdGlvbiA9ICgpID0+IHsgY2FuY2VsUmVnaXN0cmF0aW9uID0gdHJ1ZTsgfTtcblxuICAgICAgdGhpcy5sb2FkZXIoKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIElmIEhhbW1lciBpc24ndCBhY3R1YWxseSBsb2FkZWQgd2hlbiB0aGUgY3VzdG9tIGxvYWRlciByZXNvbHZlcywgZ2l2ZSB1cC5cbiAgICAgICAgICAgIGlmICghKHdpbmRvdyBhcyBhbnkpLkhhbW1lcikge1xuICAgICAgICAgICAgICB0aGlzLmNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgIGBUaGUgY3VzdG9tIEhBTU1FUl9MT0FERVIgY29tcGxldGVkLCBidXQgSGFtbWVyLkpTIGlzIG5vdCBwcmVzZW50LmApO1xuICAgICAgICAgICAgICBkZXJlZ2lzdGVyID0gKCkgPT4ge307XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFjYW5jZWxSZWdpc3RyYXRpb24pIHtcbiAgICAgICAgICAgICAgLy8gTm93IHRoYXQgSGFtbWVyIGlzIGxvYWRlZCBhbmQgdGhlIGxpc3RlbmVyIGlzIGJlaW5nIGxvYWRlZCBmb3IgcmVhbCxcbiAgICAgICAgICAgICAgLy8gdGhlIGRlcmVnaXN0cmF0aW9uIGZ1bmN0aW9uIGNoYW5nZXMgZnJvbSBjYW5jZWxpbmcgcmVnaXN0cmF0aW9uIHRvIHJlbW92YWwuXG4gICAgICAgICAgICAgIGRlcmVnaXN0ZXIgPSB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICBgVGhlIFwiJHtldmVudE5hbWV9XCIgZXZlbnQgY2Fubm90IGJlIGJvdW5kIGJlY2F1c2UgdGhlIGN1c3RvbSBgICtcbiAgICAgICAgICAgICAgICBgSGFtbWVyLkpTIGxvYWRlciBmYWlsZWQuYCk7XG4gICAgICAgICAgICBkZXJlZ2lzdGVyID0gKCkgPT4ge307XG4gICAgICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgKmV4ZWN1dGVzKiBgZGVyZWdpc3RlcmAgKGFuZCBub3QgYGRlcmVnaXN0ZXJgIGl0c2VsZikgc28gdGhhdCB3ZVxuICAgICAgLy8gY2FuIGNoYW5nZSB0aGUgYmVoYXZpb3Igb2YgYGRlcmVnaXN0ZXJgIG9uY2UgdGhlIGxpc3RlbmVyIGlzIGFkZGVkLiBVc2luZyBhIGNsb3N1cmUgaW5cbiAgICAgIC8vIHRoaXMgd2F5IGFsbG93cyB1cyB0byBhdm9pZCBhbnkgYWRkaXRpb25hbCBkYXRhIHN0cnVjdHVyZXMgdG8gdHJhY2sgbGlzdGVuZXIgcmVtb3ZhbC5cbiAgICAgIHJldHVybiAoKSA9PiB7IGRlcmVnaXN0ZXIoKTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBDcmVhdGluZyB0aGUgbWFuYWdlciBiaW5kIGV2ZW50cywgbXVzdCBiZSBkb25lIG91dHNpZGUgb2YgYW5ndWxhclxuICAgICAgY29uc3QgbWMgPSB0aGlzLl9jb25maWcuYnVpbGRIYW1tZXIoZWxlbWVudCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKGV2ZW50T2JqOiBIYW1tZXJJbnB1dCkge1xuICAgICAgICB6b25lLnJ1bkd1YXJkZWQoZnVuY3Rpb24oKSB7IGhhbmRsZXIoZXZlbnRPYmopOyB9KTtcbiAgICAgIH07XG4gICAgICBtYy5vbihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIG1jLm9mZihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgICAgLy8gZGVzdHJveSBtYyB0byBwcmV2ZW50IG1lbW9yeSBsZWFrXG4gICAgICAgIGlmICh0eXBlb2YgbWMuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG1jLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzQ3VzdG9tRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NvbmZpZy5ldmVudHMuaW5kZXhPZihldmVudE5hbWUpID4gLTE7IH1cbn1cbiJdfQ==