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
        define("@angular/common/locales/am", ["require", "exports"], factory);
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
        'am', [['ጠ', 'ከ'], ['ጥዋት', 'ከሰዓት'], u], u,
        [
            ['እ', 'ሰ', 'ማ', 'ረ', 'ሐ', 'ዓ', 'ቅ'],
            ['እሑድ', 'ሰኞ', 'ማክሰ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'],
            ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'],
            ['እ', 'ሰ', 'ማ', 'ረ', 'ሐ', 'ዓ', 'ቅ']
        ],
        u,
        [
            ['ጃ', 'ፌ', 'ማ', 'ኤ', 'ሜ', 'ጁ', 'ጁ', 'ኦ', 'ሴ', 'ኦ', 'ኖ', 'ዲ'],
            [
                'ጃንዩ', 'ፌብሩ', 'ማርች', 'ኤፕሪ', 'ሜይ', 'ጁን', 'ጁላይ',
                'ኦገስ', 'ሴፕቴ', 'ኦክቶ', 'ኖቬም', 'ዲሴም'
            ],
            [
                'ጃንዩወሪ', 'ፌብሩወሪ', 'ማርች', 'ኤፕሪል', 'ሜይ', 'ጁን',
                'ጁላይ', 'ኦገስት', 'ሴፕቴምበር', 'ኦክቶበር', 'ኖቬምበር',
                'ዲሴምበር'
            ]
        ],
        u, [['ዓ/ዓ', 'ዓ/ም'], u, ['ዓመተ ዓለም', 'ዓመተ ምሕረት']], 0, [6, 0],
        ['dd/MM/y', 'd MMM y', 'd MMMM y', 'EEEE ፣d MMMM y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'], ['{1} {0}', u, u, u],
        ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], 'ብር', 'የኢትዮጵያ ብር', {
            'AUD': ['AU$', '$'],
            'CNH': ['የቻይና ዩዋን'],
            'ETB': ['ብር'],
            'JPY': ['JP¥', '¥'],
            'THB': ['฿'],
            'TWD': ['NT$'],
            'USD': ['US$', '$']
        },
        plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9hbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLGdCQUFnQixDQUFTO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFlO1FBQ2IsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN6QztZQUNFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ25DLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ2hELENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1lBQ2pELENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ3BDO1FBQ0QsQ0FBQztRQUNEO1lBQ0UsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUM1RDtnQkFDRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLO2dCQUM3QyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSzthQUNsQztZQUNEO2dCQUNFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSTtnQkFDM0MsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU87Z0JBQ3pDLE9BQU87YUFDUjtTQUNGO1FBQ0QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixDQUFDO1FBQ3BELENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5RSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDO1FBQzlELENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUM5RCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDYixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNaLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNkLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7U0FDcEI7UUFDRCxNQUFNO0tBQ1AsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gVEhJUyBDT0RFIElTIEdFTkVSQVRFRCAtIERPIE5PVCBNT0RJRllcbi8vIFNlZSBhbmd1bGFyL3Rvb2xzL2d1bHAtdGFza3MvY2xkci9leHRyYWN0LmpzXG5cbmNvbnN0IHUgPSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIHBsdXJhbChuOiBudW1iZXIpOiBudW1iZXIge1xuICBsZXQgaSA9IE1hdGguZmxvb3IoTWF0aC5hYnMobikpO1xuICBpZiAoaSA9PT0gMCB8fCBuID09PSAxKSByZXR1cm4gMTtcbiAgcmV0dXJuIDU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgJ2FtJywgW1sn4YygJywgJ+GKqCddLCBbJ+GMpeGLi+GJtScsICfhiqjhiLDhi5PhibUnXSwgdV0sIHUsXG4gIFtcbiAgICBbJ+GKpScsICfhiLAnLCAn4YibJywgJ+GIqCcsICfhiJAnLCAn4YuTJywgJ+GJhSddLFxuICAgIFsn4Yql4YiR4Yu1JywgJ+GIsOGKnicsICfhiJvhiq3hiLAnLCAn4Yio4Ymh4YuVJywgJ+GIkOGImeGItScsICfhi5PhiK3hiaUnLCAn4YmF4Yuz4YicJ10sXG4gICAgWyfhiqXhiJHhi7UnLCAn4Yiw4YqeJywgJ+GIm+GKreGIsOGKnicsICfhiKjhiaHhi5UnLCAn4YiQ4YiZ4Yi1JywgJ+GLk+GIreGJpScsICfhiYXhi7PhiJwnXSxcbiAgICBbJ+GKpScsICfhiLAnLCAn4YibJywgJ+GIqCcsICfhiJAnLCAn4YuTJywgJ+GJhSddXG4gIF0sXG4gIHUsXG4gIFtcbiAgICBbJ+GMgycsICfhjYwnLCAn4YibJywgJ+GKpCcsICfhiJwnLCAn4YyBJywgJ+GMgScsICfhiqYnLCAn4Yi0JywgJ+GKpicsICfhipYnLCAn4YuyJ10sXG4gICAgW1xuICAgICAgJ+GMg+GKleGLqScsICfhjYzhiaXhiKknLCAn4Yib4Yit4Ym9JywgJ+GKpOGNleGIqicsICfhiJzhi60nLCAn4YyB4YqVJywgJ+GMgeGIi+GLrScsXG4gICAgICAn4Yqm4YyI4Yi1JywgJ+GItOGNleGJtCcsICfhiqbhiq3hibYnLCAn4YqW4Yms4YidJywgJ+GLsuGItOGInSdcbiAgICBdLFxuICAgIFtcbiAgICAgICfhjIPhipXhi6nhi4jhiKonLCAn4Y2M4Yml4Yip4YuI4YiqJywgJ+GIm+GIreGJvScsICfhiqThjZXhiKrhiI0nLCAn4Yic4YutJywgJ+GMgeGKlScsXG4gICAgICAn4YyB4YiL4YutJywgJ+GKpuGMiOGIteGJtScsICfhiLThjZXhibThiJ3hiaDhiK0nLCAn4Yqm4Yqt4Ym24Ymg4YitJywgJ+GKluGJrOGIneGJoOGIrScsXG4gICAgICAn4Yuy4Yi04Yid4Ymg4YitJ1xuICAgIF1cbiAgXSxcbiAgdSwgW1sn4YuTL+GLkycsICfhi5Mv4YidJ10sIHUsIFsn4YuT4YiY4YmwIOGLk+GIiOGInScsICfhi5PhiJjhibAg4Yid4YiV4Yio4Ym1J11dLCAwLCBbNiwgMF0sXG4gIFsnZGQvTU0veScsICdkIE1NTSB5JywgJ2QgTU1NTSB5JywgJ0VFRUUg4Y2jZCBNTU1NIHknXSxcbiAgWydoOm1tIGEnLCAnaDptbTpzcyBhJywgJ2g6bW06c3MgYSB6JywgJ2g6bW06c3MgYSB6enp6J10sIFsnezF9IHswfScsIHUsIHUsIHVdLFxuICBbJy4nLCAnLCcsICc7JywgJyUnLCAnKycsICctJywgJ0UnLCAnw5cnLCAn4oCwJywgJ+KInicsICdOYU4nLCAnOiddLFxuICBbJyMsIyMwLiMjIycsICcjLCMjMCUnLCAnwqQjLCMjMC4wMCcsICcjRTAnXSwgJ+GJpeGIrScsICfhi6jhiqLhibXhi67hjLXhi6sg4Yml4YitJywge1xuICAgICdBVUQnOiBbJ0FVJCcsICckJ10sXG4gICAgJ0NOSCc6IFsn4Yuo4Ym74Yut4YqTIOGLqeGLi+GKlSddLFxuICAgICdFVEInOiBbJ+GJpeGIrSddLFxuICAgICdKUFknOiBbJ0pQwqUnLCAnwqUnXSxcbiAgICAnVEhCJzogWyfguL8nXSxcbiAgICAnVFdEJzogWydOVCQnXSxcbiAgICAnVVNEJzogWydVUyQnLCAnJCddXG4gIH0sXG4gIHBsdXJhbFxuXTtcbiJdfQ==