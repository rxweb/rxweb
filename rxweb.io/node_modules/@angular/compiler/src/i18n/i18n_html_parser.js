/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/src/i18n/i18n_html_parser", ["require", "exports", "@angular/compiler/src/core", "@angular/compiler/src/ml_parser/interpolation_config", "@angular/compiler/src/ml_parser/parser", "@angular/compiler/src/i18n/digest", "@angular/compiler/src/i18n/extractor_merger", "@angular/compiler/src/i18n/serializers/xliff", "@angular/compiler/src/i18n/serializers/xliff2", "@angular/compiler/src/i18n/serializers/xmb", "@angular/compiler/src/i18n/serializers/xtb", "@angular/compiler/src/i18n/translation_bundle"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/compiler/src/core");
    var interpolation_config_1 = require("@angular/compiler/src/ml_parser/interpolation_config");
    var parser_1 = require("@angular/compiler/src/ml_parser/parser");
    var digest_1 = require("@angular/compiler/src/i18n/digest");
    var extractor_merger_1 = require("@angular/compiler/src/i18n/extractor_merger");
    var xliff_1 = require("@angular/compiler/src/i18n/serializers/xliff");
    var xliff2_1 = require("@angular/compiler/src/i18n/serializers/xliff2");
    var xmb_1 = require("@angular/compiler/src/i18n/serializers/xmb");
    var xtb_1 = require("@angular/compiler/src/i18n/serializers/xtb");
    var translation_bundle_1 = require("@angular/compiler/src/i18n/translation_bundle");
    var I18NHtmlParser = /** @class */ (function () {
        function I18NHtmlParser(_htmlParser, translations, translationsFormat, missingTranslation, console) {
            if (missingTranslation === void 0) { missingTranslation = core_1.MissingTranslationStrategy.Warning; }
            this._htmlParser = _htmlParser;
            if (translations) {
                var serializer = createSerializer(translationsFormat);
                this._translationBundle =
                    translation_bundle_1.TranslationBundle.load(translations, 'i18n', serializer, missingTranslation, console);
            }
            else {
                this._translationBundle =
                    new translation_bundle_1.TranslationBundle({}, null, digest_1.digest, undefined, missingTranslation, console);
            }
        }
        I18NHtmlParser.prototype.parse = function (source, url, parseExpansionForms, interpolationConfig) {
            if (parseExpansionForms === void 0) { parseExpansionForms = false; }
            if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
            var parseResult = this._htmlParser.parse(source, url, parseExpansionForms, interpolationConfig);
            if (parseResult.errors.length) {
                return new parser_1.ParseTreeResult(parseResult.rootNodes, parseResult.errors);
            }
            return extractor_merger_1.mergeTranslations(parseResult.rootNodes, this._translationBundle, interpolationConfig, [], {});
        };
        return I18NHtmlParser;
    }());
    exports.I18NHtmlParser = I18NHtmlParser;
    function createSerializer(format) {
        format = (format || 'xlf').toLowerCase();
        switch (format) {
            case 'xmb':
                return new xmb_1.Xmb();
            case 'xtb':
                return new xtb_1.Xtb();
            case 'xliff2':
            case 'xlf2':
                return new xliff2_1.Xliff2();
            case 'xliff':
            case 'xlf':
            default:
                return new xliff_1.Xliff();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9odG1sX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9pMThuL2kxOG5faHRtbF9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCxtREFBbUQ7SUFFbkQsNkZBQW9HO0lBQ3BHLGlFQUFvRDtJQUdwRCw0REFBZ0M7SUFDaEMsZ0ZBQXFEO0lBRXJELHNFQUEwQztJQUMxQyx3RUFBNEM7SUFDNUMsa0VBQXNDO0lBQ3RDLGtFQUFzQztJQUN0QyxvRkFBdUQ7SUFFdkQ7UUFNRSx3QkFDWSxXQUF1QixFQUFFLFlBQXFCLEVBQUUsa0JBQTJCLEVBQ25GLGtCQUFtRixFQUNuRixPQUFpQjtZQURqQixtQ0FBQSxFQUFBLHFCQUFpRCxpQ0FBMEIsQ0FBQyxPQUFPO1lBRDNFLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1lBR2pDLElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsa0JBQWtCO29CQUNuQixzQ0FBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDM0Y7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGtCQUFrQjtvQkFDbkIsSUFBSSxzQ0FBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQU0sRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDckY7UUFDSCxDQUFDO1FBRUQsOEJBQUssR0FBTCxVQUNJLE1BQWMsRUFBRSxHQUFXLEVBQUUsbUJBQW9DLEVBQ2pFLG1CQUF1RTtZQUQxQyxvQ0FBQSxFQUFBLDJCQUFvQztZQUNqRSxvQ0FBQSxFQUFBLHNCQUEyQyxtREFBNEI7WUFDekUsSUFBTSxXQUFXLEdBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBRWxGLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLE9BQU8sSUFBSSx3QkFBZSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZFO1lBRUQsT0FBTyxvQ0FBaUIsQ0FDcEIsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25GLENBQUM7UUFDSCxxQkFBQztJQUFELENBQUMsQUFqQ0QsSUFpQ0M7SUFqQ1ksd0NBQWM7SUFtQzNCLDBCQUEwQixNQUFlO1FBQ3ZDLE1BQU0sR0FBRyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV6QyxRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssS0FBSztnQkFDUixPQUFPLElBQUksU0FBRyxFQUFFLENBQUM7WUFDbkIsS0FBSyxLQUFLO2dCQUNSLE9BQU8sSUFBSSxTQUFHLEVBQUUsQ0FBQztZQUNuQixLQUFLLFFBQVEsQ0FBQztZQUNkLEtBQUssTUFBTTtnQkFDVCxPQUFPLElBQUksZUFBTSxFQUFFLENBQUM7WUFDdEIsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLEtBQUssQ0FBQztZQUNYO2dCQUNFLE9BQU8sSUFBSSxhQUFLLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3l9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHtIdG1sUGFyc2VyfSBmcm9tICcuLi9tbF9wYXJzZXIvaHRtbF9wYXJzZXInO1xuaW1wb3J0IHtERUZBVUxUX0lOVEVSUE9MQVRJT05fQ09ORklHLCBJbnRlcnBvbGF0aW9uQ29uZmlnfSBmcm9tICcuLi9tbF9wYXJzZXIvaW50ZXJwb2xhdGlvbl9jb25maWcnO1xuaW1wb3J0IHtQYXJzZVRyZWVSZXN1bHR9IGZyb20gJy4uL21sX3BhcnNlci9wYXJzZXInO1xuaW1wb3J0IHtDb25zb2xlfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtkaWdlc3R9IGZyb20gJy4vZGlnZXN0JztcbmltcG9ydCB7bWVyZ2VUcmFuc2xhdGlvbnN9IGZyb20gJy4vZXh0cmFjdG9yX21lcmdlcic7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gJy4vc2VyaWFsaXplcnMvc2VyaWFsaXplcic7XG5pbXBvcnQge1hsaWZmfSBmcm9tICcuL3NlcmlhbGl6ZXJzL3hsaWZmJztcbmltcG9ydCB7WGxpZmYyfSBmcm9tICcuL3NlcmlhbGl6ZXJzL3hsaWZmMic7XG5pbXBvcnQge1htYn0gZnJvbSAnLi9zZXJpYWxpemVycy94bWInO1xuaW1wb3J0IHtYdGJ9IGZyb20gJy4vc2VyaWFsaXplcnMveHRiJztcbmltcG9ydCB7VHJhbnNsYXRpb25CdW5kbGV9IGZyb20gJy4vdHJhbnNsYXRpb25fYnVuZGxlJztcblxuZXhwb3J0IGNsYXNzIEkxOE5IdG1sUGFyc2VyIGltcGxlbWVudHMgSHRtbFBhcnNlciB7XG4gIC8vIEBvdmVycmlkZVxuICBnZXRUYWdEZWZpbml0aW9uOiBhbnk7XG5cbiAgcHJpdmF0ZSBfdHJhbnNsYXRpb25CdW5kbGU6IFRyYW5zbGF0aW9uQnVuZGxlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfaHRtbFBhcnNlcjogSHRtbFBhcnNlciwgdHJhbnNsYXRpb25zPzogc3RyaW5nLCB0cmFuc2xhdGlvbnNGb3JtYXQ/OiBzdHJpbmcsXG4gICAgICBtaXNzaW5nVHJhbnNsYXRpb246IE1pc3NpbmdUcmFuc2xhdGlvblN0cmF0ZWd5ID0gTWlzc2luZ1RyYW5zbGF0aW9uU3RyYXRlZ3kuV2FybmluZyxcbiAgICAgIGNvbnNvbGU/OiBDb25zb2xlKSB7XG4gICAgaWYgKHRyYW5zbGF0aW9ucykge1xuICAgICAgY29uc3Qgc2VyaWFsaXplciA9IGNyZWF0ZVNlcmlhbGl6ZXIodHJhbnNsYXRpb25zRm9ybWF0KTtcbiAgICAgIHRoaXMuX3RyYW5zbGF0aW9uQnVuZGxlID1cbiAgICAgICAgICBUcmFuc2xhdGlvbkJ1bmRsZS5sb2FkKHRyYW5zbGF0aW9ucywgJ2kxOG4nLCBzZXJpYWxpemVyLCBtaXNzaW5nVHJhbnNsYXRpb24sIGNvbnNvbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90cmFuc2xhdGlvbkJ1bmRsZSA9XG4gICAgICAgICAgbmV3IFRyYW5zbGF0aW9uQnVuZGxlKHt9LCBudWxsLCBkaWdlc3QsIHVuZGVmaW5lZCwgbWlzc2luZ1RyYW5zbGF0aW9uLCBjb25zb2xlKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZShcbiAgICAgIHNvdXJjZTogc3RyaW5nLCB1cmw6IHN0cmluZywgcGFyc2VFeHBhbnNpb25Gb3JtczogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgaW50ZXJwb2xhdGlvbkNvbmZpZzogSW50ZXJwb2xhdGlvbkNvbmZpZyA9IERFRkFVTFRfSU5URVJQT0xBVElPTl9DT05GSUcpOiBQYXJzZVRyZWVSZXN1bHQge1xuICAgIGNvbnN0IHBhcnNlUmVzdWx0ID1cbiAgICAgICAgdGhpcy5faHRtbFBhcnNlci5wYXJzZShzb3VyY2UsIHVybCwgcGFyc2VFeHBhbnNpb25Gb3JtcywgaW50ZXJwb2xhdGlvbkNvbmZpZyk7XG5cbiAgICBpZiAocGFyc2VSZXN1bHQuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG5ldyBQYXJzZVRyZWVSZXN1bHQocGFyc2VSZXN1bHQucm9vdE5vZGVzLCBwYXJzZVJlc3VsdC5lcnJvcnMpO1xuICAgIH1cblxuICAgIHJldHVybiBtZXJnZVRyYW5zbGF0aW9ucyhcbiAgICAgICAgcGFyc2VSZXN1bHQucm9vdE5vZGVzLCB0aGlzLl90cmFuc2xhdGlvbkJ1bmRsZSwgaW50ZXJwb2xhdGlvbkNvbmZpZywgW10sIHt9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTZXJpYWxpemVyKGZvcm1hdD86IHN0cmluZyk6IFNlcmlhbGl6ZXIge1xuICBmb3JtYXQgPSAoZm9ybWF0IHx8ICd4bGYnKS50b0xvd2VyQ2FzZSgpO1xuXG4gIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgY2FzZSAneG1iJzpcbiAgICAgIHJldHVybiBuZXcgWG1iKCk7XG4gICAgY2FzZSAneHRiJzpcbiAgICAgIHJldHVybiBuZXcgWHRiKCk7XG4gICAgY2FzZSAneGxpZmYyJzpcbiAgICBjYXNlICd4bGYyJzpcbiAgICAgIHJldHVybiBuZXcgWGxpZmYyKCk7XG4gICAgY2FzZSAneGxpZmYnOlxuICAgIGNhc2UgJ3hsZic6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBuZXcgWGxpZmYoKTtcbiAgfVxufVxuIl19