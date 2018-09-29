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
        define("@angular/common/locales/fa-AF", ["require", "exports"], factory);
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
        'fa-AF', [['ق', 'ب'], ['ق.ظ.', 'ب.ظ.'], ['قبل\u200cازظهر', 'بعدازظهر']],
        [['ق.ظ.', 'ب.ظ.'], u, ['قبل\u200cازظهر', 'بعدازظهر']],
        [
            ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
            [
                'یکشنبه', 'دوشنبه', 'سه\u200cشنبه', 'چهارشنبه', 'پنجشنبه',
                'جمعه', 'شنبه'
            ],
            u, ['۱ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش']
        ],
        u,
        [
            ['ج', 'ف', 'م', 'ا', 'م', 'ج', 'ج', 'ا', 'س', 'ا', 'ن', 'د'],
            [
                'جنو', 'فبروری', 'مارچ', 'اپریل', 'می', 'جون', 'جول', 'اگست',
                'سپتمبر', 'اکتوبر', 'نومبر', 'دسم'
            ],
            [
                'جنوری', 'فبروری', 'مارچ', 'اپریل', 'می', 'جون', 'جولای',
                'اگست', 'سپتمبر', 'اکتوبر', 'نومبر', 'دسمبر'
            ]
        ],
        [
            ['ج', 'ف', 'م', 'ا', 'م', 'ج', 'ج', 'ا', 'س', 'ا', 'ن', 'د'],
            [
                'جنوری', 'فبروری', 'مارچ', 'اپریل', 'می', 'جون', 'جولای',
                'اگست', 'سپتمبر', 'اکتوبر', 'نومبر', 'دسمبر'
            ],
            u
        ],
        [['ق', 'م'], ['ق.م.', 'م.'], ['قبل از میلاد', 'میلادی']], 6, [4, 5],
        ['y/M/d', 'd MMM y', 'd MMMM y', 'EEEE d MMMM y'],
        ['H:mm', 'H:mm:ss', 'H:mm:ss (z)', 'H:mm:ss (zzzz)'],
        ['{1}،\u200f {0}', u, '{1}، ساعت {0}', u],
        ['.', ',', ';', '%', '\u200e+', '\u200e−', 'E', '×', '‰', '∞', 'ناعدد', ':'],
        ['#,##0.###', '#,##0%', '¤ #,##0.00', '#E0'], '؋', 'افغانی افغانستان', {
            'AFN': ['؋'],
            'CAD': ['$CA', '$'],
            'CNY': ['¥CN', '¥'],
            'HKD': ['$HK', '$'],
            'IRR': ['ریال'],
            'MXN': ['$MX', '$'],
            'NZD': ['$NZ', '$'],
            'THB': ['฿'],
            'XCD': ['$EC', '$']
        },
        plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmEtQUYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9mYS1BRi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLGdCQUFnQixDQUFTO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFlO1FBQ2IsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN2RSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JEO1lBQ0UsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDbkM7Z0JBQ0UsUUFBUSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLFNBQVM7Z0JBQ3pELE1BQU0sRUFBRSxNQUFNO2FBQ2Y7WUFDRCxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDNUM7UUFDRCxDQUFDO1FBQ0Q7WUFDRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQzVEO2dCQUNFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNO2dCQUM1RCxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLO2FBQ25DO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTztnQkFDeEQsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU87YUFDN0M7U0FDRjtRQUNEO1lBQ0UsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUM1RDtnQkFDRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPO2dCQUN4RCxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTzthQUM3QztZQUNELENBQUM7U0FDRjtRQUNELENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxDQUFDO1FBQ2pELENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUM7UUFDcEQsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUN6QyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDO1FBQzVFLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixFQUFFO1lBQ3JFLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNaLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNmLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDWixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1NBQ3BCO1FBQ0QsTUFBTTtLQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRISVMgQ09ERSBJUyBHRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZXG4vLyBTZWUgYW5ndWxhci90b29scy9ndWxwLXRhc2tzL2NsZHIvZXh0cmFjdC5qc1xuXG5jb25zdCB1ID0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBwbHVyYWwobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IGkgPSBNYXRoLmZsb29yKE1hdGguYWJzKG4pKTtcbiAgaWYgKGkgPT09IDAgfHwgbiA9PT0gMSkgcmV0dXJuIDE7XG4gIHJldHVybiA1O1xufVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gICdmYS1BRicsIFtbJ9mCJywgJ9ioJ10sIFsn2YIu2LguJywgJ9ioLti4LiddLCBbJ9mC2KjZhFxcdTIwMGPYp9iy2LjZh9ixJywgJ9io2LnYr9in2LLYuNmH2LEnXV0sXG4gIFtbJ9mCLti4LicsICfYqC7YuC4nXSwgdSwgWyfZgtio2YRcXHUyMDBj2KfYsti42YfYsScsICfYqNi52K/Yp9iy2LjZh9ixJ11dLFxuICBbXG4gICAgWyfbjCcsICfYrycsICfYsycsICfahicsICfZvicsICfYrCcsICfYtCddLFxuICAgIFtcbiAgICAgICfbjNqp2LTZhtio2YcnLCAn2K/ZiNi02YbYqNmHJywgJ9iz2YdcXHUyMDBj2LTZhtio2YcnLCAn2obZh9in2LHYtNmG2KjZhycsICfZvtmG2KzYtNmG2KjZhycsXG4gICAgICAn2KzZhdi52YcnLCAn2LTZhtio2YcnXG4gICAgXSxcbiAgICB1LCBbJ9ux2LQnLCAn27LYtCcsICfbs9i0JywgJ9u02LQnLCAn27XYtCcsICfYrCcsICfYtCddXG4gIF0sXG4gIHUsXG4gIFtcbiAgICBbJ9isJywgJ9mBJywgJ9mFJywgJ9inJywgJ9mFJywgJ9isJywgJ9isJywgJ9inJywgJ9izJywgJ9inJywgJ9mGJywgJ9ivJ10sXG4gICAgW1xuICAgICAgJ9is2YbZiCcsICfZgdio2LHZiNix24wnLCAn2YXYp9ix2oYnLCAn2KfZvtix24zZhCcsICfZhduMJywgJ9is2YjZhicsICfYrNmI2YQnLCAn2Kfar9iz2KonLFxuICAgICAgJ9iz2b7YqtmF2KjYsScsICfYp9qp2KrZiNio2LEnLCAn2YbZiNmF2KjYsScsICfYr9iz2YUnXG4gICAgXSxcbiAgICBbXG4gICAgICAn2KzZhtmI2LHbjCcsICfZgdio2LHZiNix24wnLCAn2YXYp9ix2oYnLCAn2KfZvtix24zZhCcsICfZhduMJywgJ9is2YjZhicsICfYrNmI2YTYp9uMJyxcbiAgICAgICfYp9qv2LPYqicsICfYs9m+2KrZhdio2LEnLCAn2Kfaqdiq2YjYqNixJywgJ9mG2YjZhdio2LEnLCAn2K/Ys9mF2KjYsSdcbiAgICBdXG4gIF0sXG4gIFtcbiAgICBbJ9isJywgJ9mBJywgJ9mFJywgJ9inJywgJ9mFJywgJ9isJywgJ9isJywgJ9inJywgJ9izJywgJ9inJywgJ9mGJywgJ9ivJ10sXG4gICAgW1xuICAgICAgJ9is2YbZiNix24wnLCAn2YHYqNix2YjYsduMJywgJ9mF2KfYsdqGJywgJ9in2b7YsduM2YQnLCAn2YXbjCcsICfYrNmI2YYnLCAn2KzZiNmE2KfbjCcsXG4gICAgICAn2Kfar9iz2KonLCAn2LPZvtiq2YXYqNixJywgJ9in2qnYqtmI2KjYsScsICfZhtmI2YXYqNixJywgJ9iv2LPZhdio2LEnXG4gICAgXSxcbiAgICB1XG4gIF0sXG4gIFtbJ9mCJywgJ9mFJ10sIFsn2YIu2YUuJywgJ9mFLiddLCBbJ9mC2KjZhCDYp9iyINmF24zZhNin2K8nLCAn2YXbjNmE2KfYr9uMJ11dLCA2LCBbNCwgNV0sXG4gIFsneS9NL2QnLCAnZCBNTU0geScsICdkIE1NTU0geScsICdFRUVFIGQgTU1NTSB5J10sXG4gIFsnSDptbScsICdIOm1tOnNzJywgJ0g6bW06c3MgKHopJywgJ0g6bW06c3MgKHp6enopJ10sXG4gIFsnezF92IxcXHUyMDBmIHswfScsIHUsICd7MX3YjCDYs9in2LnYqiB7MH0nLCB1XSxcbiAgWycuJywgJywnLCAnOycsICclJywgJ1xcdTIwMGUrJywgJ1xcdTIwMGXiiJInLCAnRScsICfDlycsICfigLAnLCAn4oieJywgJ9mG2KfYudiv2K8nLCAnOiddLFxuICBbJyMsIyMwLiMjIycsICcjLCMjMCUnLCAnwqTCoCMsIyMwLjAwJywgJyNFMCddLCAn2IsnLCAn2KfZgdi62KfZhtuMINin2YHYutin2YbYs9iq2KfZhicsIHtcbiAgICAnQUZOJzogWyfYiyddLFxuICAgICdDQUQnOiBbJyRDQScsICckJ10sXG4gICAgJ0NOWSc6IFsnwqVDTicsICfCpSddLFxuICAgICdIS0QnOiBbJyRISycsICckJ10sXG4gICAgJ0lSUic6IFsn2LHbjNin2YQnXSxcbiAgICAnTVhOJzogWyckTVgnLCAnJCddLFxuICAgICdOWkQnOiBbJyROWicsICckJ10sXG4gICAgJ1RIQic6IFsn4Li/J10sXG4gICAgJ1hDRCc6IFsnJEVDJywgJyQnXVxuICB9LFxuICBwbHVyYWxcbl07XG4iXX0=