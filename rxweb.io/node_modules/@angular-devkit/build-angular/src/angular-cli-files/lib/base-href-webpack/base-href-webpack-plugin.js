"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
Object.defineProperty(exports, "__esModule", { value: true });
class BaseHrefWebpackPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        // Ignore if baseHref is not passed
        if (!this.options.baseHref && this.options.baseHref !== '') {
            return;
        }
        compiler.plugin('compilation', (compilation) => {
            compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
                // Check if base tag already exists
                const baseTagRegex = /<base.*?>/i;
                const baseTagMatches = htmlPluginData.html.match(baseTagRegex);
                if (!baseTagMatches) {
                    // Insert it in top of the head if not exist
                    htmlPluginData.html = htmlPluginData.html.replace(/<head>/i, '$&' + `<base href="${this.options.baseHref}">`);
                }
                else {
                    // Replace only href attribute if exists
                    const modifiedBaseTag = baseTagMatches[0].replace(/href="\S*?"/i, `href="${this.options.baseHref}"`);
                    htmlPluginData.html = htmlPluginData.html.replace(baseTagRegex, modifiedBaseTag);
                }
                callback(null, htmlPluginData);
            });
        });
    }
}
exports.BaseHrefWebpackPlugin = BaseHrefWebpackPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1ocmVmLXdlYnBhY2stcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9hbmd1bGFyL3NyYy9hbmd1bGFyLWNsaS1maWxlcy9saWIvYmFzZS1ocmVmLXdlYnBhY2svYmFzZS1ocmVmLXdlYnBhY2stcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFDSCxpQkFBaUI7QUFDakIsK0RBQStEOztBQU0vRDtJQUNFLFlBQTRCLE9BQXFDO1FBQXJDLFlBQU8sR0FBUCxPQUFPLENBQThCO0lBQUksQ0FBQztJQUV0RSxLQUFLLENBQUMsUUFBYTtRQUNqQixtQ0FBbUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLFdBQWdCLEVBQUUsRUFBRTtZQUNsRCxXQUFXLENBQUMsTUFBTSxDQUNoQiw0Q0FBNEMsRUFDNUMsQ0FBQyxjQUFtQixFQUFFLFFBQWtCLEVBQUUsRUFBRTtnQkFDMUMsbUNBQW1DO2dCQUNuQyxNQUFNLFlBQVksR0FBRyxZQUFZLENBQUM7Z0JBQ2xDLE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMvRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLDRDQUE0QztvQkFDNUMsY0FBYyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDL0MsU0FBUyxFQUFFLElBQUksR0FBRyxlQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQzNELENBQUM7Z0JBQ0osQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTix3Q0FBd0M7b0JBQ3hDLE1BQU0sZUFBZSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQy9DLGNBQWMsRUFBRSxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQ2xELENBQUM7b0JBQ0YsY0FBYyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQ25GLENBQUM7Z0JBRUQsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbENELHNEQWtDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbi8vIHRzbGludDpkaXNhYmxlXG4vLyBUT0RPOiBjbGVhbnVwIHRoaXMgZmlsZSwgaXQncyBjb3BpZWQgYXMgaXMgZnJvbSBBbmd1bGFyIENMSS5cblxuZXhwb3J0IGludGVyZmFjZSBCYXNlSHJlZldlYnBhY2tQbHVnaW5PcHRpb25zIHtcbiAgYmFzZUhyZWY6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VIcmVmV2VicGFja1BsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBCYXNlSHJlZldlYnBhY2tQbHVnaW5PcHRpb25zKSB7IH1cblxuICBhcHBseShjb21waWxlcjogYW55KTogdm9pZCB7XG4gICAgLy8gSWdub3JlIGlmIGJhc2VIcmVmIGlzIG5vdCBwYXNzZWRcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5iYXNlSHJlZiAmJiB0aGlzLm9wdGlvbnMuYmFzZUhyZWYgIT09ICcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29tcGlsZXIucGx1Z2luKCdjb21waWxhdGlvbicsIChjb21waWxhdGlvbjogYW55KSA9PiB7XG4gICAgICBjb21waWxhdGlvbi5wbHVnaW4oXG4gICAgICAgICdodG1sLXdlYnBhY2stcGx1Z2luLWJlZm9yZS1odG1sLXByb2Nlc3NpbmcnLFxuICAgICAgICAoaHRtbFBsdWdpbkRhdGE6IGFueSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgLy8gQ2hlY2sgaWYgYmFzZSB0YWcgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICBjb25zdCBiYXNlVGFnUmVnZXggPSAvPGJhc2UuKj8+L2k7XG4gICAgICAgICAgY29uc3QgYmFzZVRhZ01hdGNoZXMgPSBodG1sUGx1Z2luRGF0YS5odG1sLm1hdGNoKGJhc2VUYWdSZWdleCk7XG4gICAgICAgICAgaWYgKCFiYXNlVGFnTWF0Y2hlcykge1xuICAgICAgICAgICAgLy8gSW5zZXJ0IGl0IGluIHRvcCBvZiB0aGUgaGVhZCBpZiBub3QgZXhpc3RcbiAgICAgICAgICAgIGh0bWxQbHVnaW5EYXRhLmh0bWwgPSBodG1sUGx1Z2luRGF0YS5odG1sLnJlcGxhY2UoXG4gICAgICAgICAgICAgIC88aGVhZD4vaSwgJyQmJyArIGA8YmFzZSBocmVmPVwiJHt0aGlzLm9wdGlvbnMuYmFzZUhyZWZ9XCI+YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVwbGFjZSBvbmx5IGhyZWYgYXR0cmlidXRlIGlmIGV4aXN0c1xuICAgICAgICAgICAgY29uc3QgbW9kaWZpZWRCYXNlVGFnID0gYmFzZVRhZ01hdGNoZXNbMF0ucmVwbGFjZShcbiAgICAgICAgICAgICAgL2hyZWY9XCJcXFMqP1wiL2ksIGBocmVmPVwiJHt0aGlzLm9wdGlvbnMuYmFzZUhyZWZ9XCJgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaHRtbFBsdWdpbkRhdGEuaHRtbCA9IGh0bWxQbHVnaW5EYXRhLmh0bWwucmVwbGFjZShiYXNlVGFnUmVnZXgsIG1vZGlmaWVkQmFzZVRhZyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY2FsbGJhY2sobnVsbCwgaHRtbFBsdWdpbkRhdGEpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=