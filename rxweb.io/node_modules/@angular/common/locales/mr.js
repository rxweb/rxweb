/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(null, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/common/locales/mr", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY
    // See angular/tools/gulp-tasks/cldr/extract.js
    var u = undefined;
    function plural(n) {
        var i = Math.floor(Math.abs(n));
        if (i === 0 || n === 1)
            return 1;
        return 5;
    }
    exports.default = [
        'mr', [['स', 'सं'], ['म.पू.', 'म.उ.'], u], [['म.पू.', 'म.उ.'], u, u],
        [
            ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
            [
                'रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र',
                'शनि'
            ],
            [
                'रविवार', 'सोमवार', 'मंगळवार', 'बुधवार',
                'गुरुवार', 'शुक्रवार', 'शनिवार'
            ],
            ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श']
        ],
        u,
        [
            [
                'जा', 'फे', 'मा', 'ए', 'मे', 'जू', 'जु', 'ऑ', 'स', 'ऑ',
                'नो', 'डि'
            ],
            [
                'जाने', 'फेब्रु', 'मार्च', 'एप्रि', 'मे',
                'जून', 'जुलै', 'ऑग', 'सप्टें', 'ऑक्टो',
                'नोव्हें', 'डिसें'
            ],
            [
                'जानेवारी', 'फेब्रुवारी', 'मार्च',
                'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट',
                'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर',
                'डिसेंबर'
            ]
        ],
        u,
        [
            ['इ. स. पू.', 'इ. स.'], u,
            ['ईसवीसनपूर्व', 'ईसवीसन']
        ],
        0, [0, 0], ['d/M/yy', 'd MMM, y', 'd MMMM, y', 'EEEE, d MMMM, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', u, '{1} रोजी {0}', u],
        ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##,##0.###', '#,##0%', '¤#,##0.00', '[#E0]'], '₹', 'भारतीय रुपया',
        { 'JPY': ['JP¥', '¥'], 'THB': ['฿'], 'TWD': ['NT$'] }, plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9tci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLGdCQUFnQixDQUFTO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFlO1FBQ2IsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFO1lBQ0UsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUM7WUFDeEM7Z0JBQ0UsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPO2dCQUM1QyxLQUFLO2FBQ047WUFDRDtnQkFDRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRO2dCQUN2QyxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVE7YUFDaEM7WUFDRCxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztTQUN6QztRQUNELENBQUM7UUFDRDtZQUNFO2dCQUNFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBQ3RELElBQUksRUFBRSxJQUFJO2FBQ1g7WUFDRDtnQkFDRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSTtnQkFDeEMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU87Z0JBQ3RDLFNBQVMsRUFBRSxPQUFPO2FBQ25CO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLFlBQVksRUFBRSxPQUFPO2dCQUNqQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTztnQkFDdEMsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXO2dCQUNsQyxTQUFTO2FBQ1Y7U0FDRjtRQUNELENBQUM7UUFDRDtZQUNFLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDekIsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO1NBQzFCO1FBQ0QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLENBQUM7UUFDakUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQztRQUN4RCxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUNsQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDO1FBQzlELENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWM7UUFDckUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBRSxNQUFNO0tBQzVELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRISVMgQ09ERSBJUyBHRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZXG4vLyBTZWUgYW5ndWxhci90b29scy9ndWxwLXRhc2tzL2NsZHIvZXh0cmFjdC5qc1xuXG5jb25zdCB1ID0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBwbHVyYWwobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IGkgPSBNYXRoLmZsb29yKE1hdGguYWJzKG4pKTtcbiAgaWYgKGkgPT09IDAgfHwgbiA9PT0gMSkgcmV0dXJuIDE7XG4gIHJldHVybiA1O1xufVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gICdtcicsIFtbJ+CkuCcsICfgpLjgpIInXSwgWyfgpK4u4KSq4KWCLicsICfgpK4u4KSJLiddLCB1XSwgW1sn4KSuLuCkquClgi4nLCAn4KSuLuCkiS4nXSwgdSwgdV0sXG4gIFtcbiAgICBbJ+CksCcsICfgpLjgpYsnLCAn4KSu4KSCJywgJ+CkrOClgScsICfgpJfgpYEnLCAn4KS24KWBJywgJ+CktiddLFxuICAgIFtcbiAgICAgICfgpLDgpLXgpL8nLCAn4KS44KWL4KSuJywgJ+CkruCkguCkl+CksycsICfgpKzgpYHgpKcnLCAn4KSX4KWB4KSw4KWBJywgJ+CktuClgeCkleCljeCksCcsXG4gICAgICAn4KS24KSo4KS/J1xuICAgIF0sXG4gICAgW1xuICAgICAgJ+CksOCkteCkv+CkteCkvuCksCcsICfgpLjgpYvgpK7gpLXgpL7gpLAnLCAn4KSu4KSC4KSX4KSz4KS14KS+4KSwJywgJ+CkrOClgeCkp+CkteCkvuCksCcsXG4gICAgICAn4KSX4KWB4KSw4KWB4KS14KS+4KSwJywgJ+CktuClgeCkleCljeCksOCkteCkvuCksCcsICfgpLbgpKjgpL/gpLXgpL7gpLAnXG4gICAgXSxcbiAgICBbJ+CksCcsICfgpLjgpYsnLCAn4KSu4KSCJywgJ+CkrOClgScsICfgpJfgpYEnLCAn4KS24KWBJywgJ+CktiddXG4gIF0sXG4gIHUsXG4gIFtcbiAgICBbXG4gICAgICAn4KSc4KS+JywgJ+Ckq+ClhycsICfgpK7gpL4nLCAn4KSPJywgJ+CkruClhycsICfgpJzgpYInLCAn4KSc4KWBJywgJ+CkkScsICfgpLgnLCAn4KSRJyxcbiAgICAgICfgpKjgpYsnLCAn4KSh4KS/J1xuICAgIF0sXG4gICAgW1xuICAgICAgJ+CknOCkvuCkqOClhycsICfgpKvgpYfgpKzgpY3gpLDgpYEnLCAn4KSu4KS+4KSw4KWN4KSaJywgJ+Ckj+CkquCljeCksOCkvycsICfgpK7gpYcnLFxuICAgICAgJ+CknOClguCkqCcsICfgpJzgpYHgpLLgpYgnLCAn4KSR4KSXJywgJ+CkuOCkquCljeCkn+Clh+CkgicsICfgpJHgpJXgpY3gpJ/gpYsnLFxuICAgICAgJ+CkqOCli+CkteCljeCkueClh+CkgicsICfgpKHgpL/gpLjgpYfgpIInXG4gICAgXSxcbiAgICBbXG4gICAgICAn4KSc4KS+4KSo4KWH4KS14KS+4KSw4KWAJywgJ+Ckq+Clh+CkrOCljeCksOClgeCkteCkvuCksOClgCcsICfgpK7gpL7gpLDgpY3gpJonLFxuICAgICAgJ+Ckj+CkquCljeCksOCkv+CksicsICfgpK7gpYcnLCAn4KSc4KWC4KSoJywgJ+CknOClgeCksuCliCcsICfgpJHgpJfgpLjgpY3gpJ8nLFxuICAgICAgJ+CkuOCkquCljeCkn+Clh+CkguCkrOCksCcsICfgpJHgpJXgpY3gpJ/gpYvgpKzgpLAnLCAn4KSo4KWL4KS14KWN4KS54KWH4KSC4KSs4KSwJyxcbiAgICAgICfgpKHgpL/gpLjgpYfgpILgpKzgpLAnXG4gICAgXVxuICBdLFxuICB1LFxuICBbXG4gICAgWyfgpIcuIOCkuC4g4KSq4KWCLicsICfgpIcuIOCkuC4nXSwgdSxcbiAgICBbJ+CkiOCkuOCkteClgOCkuOCkqOCkquClguCksOCljeCktScsICfgpIjgpLjgpLXgpYDgpLjgpKgnXVxuICBdLFxuICAwLCBbMCwgMF0sIFsnZC9NL3l5JywgJ2QgTU1NLCB5JywgJ2QgTU1NTSwgeScsICdFRUVFLCBkIE1NTU0sIHknXSxcbiAgWydoOm1tIGEnLCAnaDptbTpzcyBhJywgJ2g6bW06c3MgYSB6JywgJ2g6bW06c3MgYSB6enp6J10sXG4gIFsnezF9LCB7MH0nLCB1LCAnezF9IOCksOCli+CknOClgCB7MH0nLCB1XSxcbiAgWycuJywgJywnLCAnOycsICclJywgJysnLCAnLScsICdFJywgJ8OXJywgJ+KAsCcsICfiiJ4nLCAnTmFOJywgJzonXSxcbiAgWycjLCMjLCMjMC4jIyMnLCAnIywjIzAlJywgJ8KkIywjIzAuMDAnLCAnWyNFMF0nXSwgJ+KCuScsICfgpK3gpL7gpLDgpKTgpYDgpK8g4KSw4KWB4KSq4KSv4KS+JyxcbiAgeydKUFknOiBbJ0pQwqUnLCAnwqUnXSwgJ1RIQic6IFsn4Li/J10sICdUV0QnOiBbJ05UJCddfSwgcGx1cmFsXG5dO1xuIl19