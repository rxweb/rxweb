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
        define("@angular/common/locales/rm", ["require", "exports"], factory);
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
        'rm', [['AM', 'PM'], u, u], u,
        [
            ['D', 'G', 'M', 'M', 'G', 'V', 'S'], ['du', 'gli', 'ma', 'me', 'gie', 've', 'so'],
            ['dumengia', 'glindesdi', 'mardi', 'mesemna', 'gievgia', 'venderdi', 'sonda'],
            ['du', 'gli', 'ma', 'me', 'gie', 've', 'so']
        ],
        u,
        [
            ['S', 'F', 'M', 'A', 'M', 'Z', 'F', 'A', 'S', 'O', 'N', 'D'],
            [
                'schan.', 'favr.', 'mars', 'avr.', 'matg', 'zercl.', 'fan.', 'avust', 'sett.', 'oct.', 'nov.',
                'dec.'
            ],
            [
                'schaner', 'favrer', 'mars', 'avrigl', 'matg', 'zercladur', 'fanadur', 'avust', 'settember',
                'october', 'november', 'december'
            ]
        ],
        u, [['av. Cr.', 's. Cr.'], u, ['avant Cristus', 'suenter Cristus']], 1, [6, 0],
        ['dd-MM-yy', 'dd-MM-y', 'd \'da\' MMMM y', 'EEEE, \'ils\' d \'da\' MMMM y'],
        ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'], ['{1} {0}', u, u, u],
        ['.', '’', ';', '%', '+', '−', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##0.###', '#,##0 %', '#,##0.00 ¤', '#E0'], 'CHF', 'franc svizzer',
        { 'JPY': ['JP¥', '¥'], 'USD': ['US$', '$'] }, plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLGdCQUFnQixDQUFTO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxrQkFBZTtRQUNiLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzdCO1lBQ0UsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztZQUNqRixDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQztZQUM3RSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztTQUM3QztRQUNELENBQUM7UUFDRDtZQUNFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDNUQ7Z0JBQ0UsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU07Z0JBQzdGLE1BQU07YUFDUDtZQUNEO2dCQUNFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsV0FBVztnQkFDM0YsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVO2FBQ2xDO1NBQ0Y7UUFDRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLCtCQUErQixDQUFDO1FBQzNFLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQztRQUM5RCxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxlQUFlO1FBQ3JFLEVBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBQyxFQUFFLE1BQU07S0FDbkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLy8gVEhJUyBDT0RFIElTIEdFTkVSQVRFRCAtIERPIE5PVCBNT0RJRllcbi8vIFNlZSBhbmd1bGFyL3Rvb2xzL2d1bHAtdGFza3MvY2xkci9leHRyYWN0LmpzXG5cbmNvbnN0IHUgPSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIHBsdXJhbChuOiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAobiA9PT0gMSkgcmV0dXJuIDE7XG4gIHJldHVybiA1O1xufVxuXG5leHBvcnQgZGVmYXVsdCBbXG4gICdybScsIFtbJ0FNJywgJ1BNJ10sIHUsIHVdLCB1LFxuICBbXG4gICAgWydEJywgJ0cnLCAnTScsICdNJywgJ0cnLCAnVicsICdTJ10sIFsnZHUnLCAnZ2xpJywgJ21hJywgJ21lJywgJ2dpZScsICd2ZScsICdzbyddLFxuICAgIFsnZHVtZW5naWEnLCAnZ2xpbmRlc2RpJywgJ21hcmRpJywgJ21lc2VtbmEnLCAnZ2lldmdpYScsICd2ZW5kZXJkaScsICdzb25kYSddLFxuICAgIFsnZHUnLCAnZ2xpJywgJ21hJywgJ21lJywgJ2dpZScsICd2ZScsICdzbyddXG4gIF0sXG4gIHUsXG4gIFtcbiAgICBbJ1MnLCAnRicsICdNJywgJ0EnLCAnTScsICdaJywgJ0YnLCAnQScsICdTJywgJ08nLCAnTicsICdEJ10sXG4gICAgW1xuICAgICAgJ3NjaGFuLicsICdmYXZyLicsICdtYXJzJywgJ2F2ci4nLCAnbWF0ZycsICd6ZXJjbC4nLCAnZmFuLicsICdhdnVzdCcsICdzZXR0LicsICdvY3QuJywgJ25vdi4nLFxuICAgICAgJ2RlYy4nXG4gICAgXSxcbiAgICBbXG4gICAgICAnc2NoYW5lcicsICdmYXZyZXInLCAnbWFycycsICdhdnJpZ2wnLCAnbWF0ZycsICd6ZXJjbGFkdXInLCAnZmFuYWR1cicsICdhdnVzdCcsICdzZXR0ZW1iZXInLFxuICAgICAgJ29jdG9iZXInLCAnbm92ZW1iZXInLCAnZGVjZW1iZXInXG4gICAgXVxuICBdLFxuICB1LCBbWydhdi4gQ3IuJywgJ3MuIENyLiddLCB1LCBbJ2F2YW50IENyaXN0dXMnLCAnc3VlbnRlciBDcmlzdHVzJ11dLCAxLCBbNiwgMF0sXG4gIFsnZGQtTU0teXknLCAnZGQtTU0teScsICdkIFxcJ2RhXFwnIE1NTU0geScsICdFRUVFLCBcXCdpbHNcXCcgZCBcXCdkYVxcJyBNTU1NIHknXSxcbiAgWydISDptbScsICdISDptbTpzcycsICdISDptbTpzcyB6JywgJ0hIOm1tOnNzIHp6enonXSwgWyd7MX0gezB9JywgdSwgdSwgdV0sXG4gIFsnLicsICfigJknLCAnOycsICclJywgJysnLCAn4oiSJywgJ0UnLCAnw5cnLCAn4oCwJywgJ+KInicsICdOYU4nLCAnOiddLFxuICBbJyMsIyMwLiMjIycsICcjLCMjMMKgJScsICcjLCMjMC4wMMKgwqQnLCAnI0UwJ10sICdDSEYnLCAnZnJhbmMgc3ZpenplcicsXG4gIHsnSlBZJzogWydKUMKlJywgJ8KlJ10sICdVU0QnOiBbJ1VTJCcsICckJ119LCBwbHVyYWxcbl07XG4iXX0=