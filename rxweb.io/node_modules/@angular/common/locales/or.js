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
        define("@angular/common/locales/or", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY
    // See angular/tools/gulp-tasks/cldr/extract.js
    var u = undefined;
    function plural(n) {
        if (n === 1)
            return 1;
        return 5;
    }
    exports.default = [
        'or', [['ପୂ', 'ଅ'], ['AM', 'PM'], u],
        [['AM', 'ଅପରାହ୍ନ'], ['ପୂର୍ବାହ୍ନ', 'ଅପରାହ୍ନ'], u],
        [
            ['ର', 'ସୋ', 'ମ', 'ବୁ', 'ଗୁ', 'ଶୁ', 'ଶ'],
            [
                'ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର',
                'ଶନି'
            ],
            [
                'ରବିବାର', 'ସୋମବାର', 'ମଙ୍ଗଳବାର', 'ବୁଧବାର',
                'ଗୁରୁବାର', 'ଶୁକ୍ରବାର', 'ଶନିବାର'
            ],
            [
                'ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର',
                'ଶନି'
            ]
        ],
        u,
        [
            [
                'ଜା', 'ଫେ', 'ମା', 'ଅ', 'ମଇ', 'ଜୁ', 'ଜୁ', 'ଅ', 'ସେ', 'ଅ',
                'ନ', 'ଡି'
            ],
            [
                'ଜାନୁଆରୀ', 'ଫେବୃଆରୀ', 'ମାର୍ଚ୍ଚ',
                'ଅପ୍ରେଲ', 'ମଇ', 'ଜୁନ', 'ଜୁଲାଇ', 'ଅଗଷ୍ଟ',
                'ସେପ୍ଟେମ୍ବର', 'ଅକ୍ଟୋବର', 'ନଭେମ୍ବର',
                'ଡିସେମ୍ବର'
            ],
            u
        ],
        u,
        [['BC', 'AD'], u, ['ଖ୍ରୀଷ୍ଟପୂର୍ବ', 'ଖ୍ରୀଷ୍ଟାବ୍ଦ']],
        0, [0, 0], ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', u, '{0} ଠାରେ {1}', u],
        ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##,##0.###', '#,##,##0%', '¤ #,##,##0.00', '#E0'], '₹',
        'ଭାରତୀୟ ଟଙ୍କା', {}, plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9vci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLGdCQUFnQixDQUFTO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxrQkFBZTtRQUNiLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRDtZQUNFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDO1lBQ3ZDO2dCQUNFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTztnQkFDN0MsS0FBSzthQUNOO1lBQ0Q7Z0JBQ0UsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUTtnQkFDeEMsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRO2FBQ2hDO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPO2dCQUM3QyxLQUFLO2FBQ047U0FDRjtRQUNELENBQUM7UUFDRDtZQUNFO2dCQUNFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUc7Z0JBQ3ZELEdBQUcsRUFBRSxJQUFJO2FBQ1Y7WUFDRDtnQkFDRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQy9CLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPO2dCQUN2QyxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ2xDLFVBQVU7YUFDWDtZQUNELENBQUM7U0FDRjtRQUNELENBQUM7UUFDRCxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNsRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQztRQUNqRSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO1FBQ3hELENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUM7UUFDOUQsQ0FBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUMsRUFBRSxHQUFHO1FBQzFELGNBQWMsRUFBRSxFQUFFLEVBQUUsTUFBTTtLQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUSElTIENPREUgSVMgR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWVxuLy8gU2VlIGFuZ3VsYXIvdG9vbHMvZ3VscC10YXNrcy9jbGRyL2V4dHJhY3QuanNcblxuY29uc3QgdSA9IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gcGx1cmFsKG46IG51bWJlcik6IG51bWJlciB7XG4gIGlmIChuID09PSAxKSByZXR1cm4gMTtcbiAgcmV0dXJuIDU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgJ29yJywgW1sn4Kyq4K2CJywgJ+CshSddLCBbJ0FNJywgJ1BNJ10sIHVdLFxuICBbWydBTScsICfgrIXgrKrgrLDgrL7grLngrY3grKgnXSwgWyfgrKrgrYLgrLDgrY3grKzgrL7grLngrY3grKgnLCAn4KyF4Kyq4Kyw4Ky+4Ky54K2N4KyoJ10sIHVdLFxuICBbXG4gICAgWyfgrLAnLCAn4Ky44K2LJywgJ+CsricsICfgrKzgrYEnLCAn4KyX4K2BJywgJ+CstuCtgScsICfgrLYnXSxcbiAgICBbXG4gICAgICAn4Kyw4Kys4Ky/JywgJ+CsuOCti+CsricsICfgrK7grJngrY3grJfgrLMnLCAn4Kys4K2B4KynJywgJ+Csl+CtgeCssOCtgScsICfgrLbgrYHgrJXgrY3grLAnLFxuICAgICAgJ+CstuCsqOCsvydcbiAgICBdLFxuICAgIFtcbiAgICAgICfgrLDgrKzgrL/grKzgrL7grLAnLCAn4Ky44K2L4Kyu4Kys4Ky+4KywJywgJ+CsruCsmeCtjeCsl+Css+CsrOCsvuCssCcsICfgrKzgrYHgrKfgrKzgrL7grLAnLFxuICAgICAgJ+Csl+CtgeCssOCtgeCsrOCsvuCssCcsICfgrLbgrYHgrJXgrY3grLDgrKzgrL7grLAnLCAn4Ky24Kyo4Ky/4Kys4Ky+4KywJ1xuICAgIF0sXG4gICAgW1xuICAgICAgJ+CssOCsrOCsvycsICfgrLjgrYvgrK4nLCAn4Kyu4KyZ4K2N4KyX4KyzJywgJ+CsrOCtgeCspycsICfgrJfgrYHgrLDgrYEnLCAn4Ky24K2B4KyV4K2N4KywJyxcbiAgICAgICfgrLbgrKjgrL8nXG4gICAgXVxuICBdLFxuICB1LFxuICBbXG4gICAgW1xuICAgICAgJ+CsnOCsvicsICfgrKvgrYcnLCAn4Kyu4Ky+JywgJ+CshScsICfgrK7grIcnLCAn4Kyc4K2BJywgJ+CsnOCtgScsICfgrIUnLCAn4Ky44K2HJywgJ+CshScsXG4gICAgICAn4KyoJywgJ+CsoeCsvydcbiAgICBdLFxuICAgIFtcbiAgICAgICfgrJzgrL7grKjgrYHgrIbgrLDgrYAnLCAn4Kyr4K2H4Kys4K2D4KyG4Kyw4K2AJywgJ+CsruCsvuCssOCtjeCsmuCtjeCsmicsXG4gICAgICAn4KyF4Kyq4K2N4Kyw4K2H4KyyJywgJ+CsruCshycsICfgrJzgrYHgrKgnLCAn4Kyc4K2B4Kyy4Ky+4KyHJywgJ+CsheCsl+Cst+CtjeCsnycsXG4gICAgICAn4Ky44K2H4Kyq4K2N4Kyf4K2H4Kyu4K2N4Kys4KywJywgJ+CsheCsleCtjeCsn+Cti+CsrOCssCcsICfgrKjgrK3grYfgrK7grY3grKzgrLAnLFxuICAgICAgJ+CsoeCsv+CsuOCth+CsruCtjeCsrOCssCdcbiAgICBdLFxuICAgIHVcbiAgXSxcbiAgdSxcbiAgW1snQkMnLCAnQUQnXSwgdSwgWyfgrJbgrY3grLDgrYDgrLfgrY3grJ/grKrgrYLgrLDgrY3grKwnLCAn4KyW4K2N4Kyw4K2A4Ky34K2N4Kyf4Ky+4Kys4K2N4KymJ11dLFxuICAwLCBbMCwgMF0sIFsnTS9kL3l5JywgJ01NTSBkLCB5JywgJ01NTU0gZCwgeScsICdFRUVFLCBNTU1NIGQsIHknXSxcbiAgWydoOm1tIGEnLCAnaDptbTpzcyBhJywgJ2g6bW06c3MgYSB6JywgJ2g6bW06c3MgYSB6enp6J10sXG4gIFsnezF9LCB7MH0nLCB1LCAnezB9IOCsoOCsvuCssOCthyB7MX0nLCB1XSxcbiAgWycuJywgJywnLCAnOycsICclJywgJysnLCAnLScsICdFJywgJ8OXJywgJ+KAsCcsICfiiJ4nLCAnTmFOJywgJzonXSxcbiAgWycjLCMjLCMjMC4jIyMnLCAnIywjIywjIzAlJywgJ8KkwqAjLCMjLCMjMC4wMCcsICcjRTAnXSwgJ+KCuScsXG4gICfgrK3grL7grLDgrKTgrYDgrZ8g4Kyf4KyZ4K2N4KyV4Ky+Jywge30sIHBsdXJhbFxuXTtcbiJdfQ==