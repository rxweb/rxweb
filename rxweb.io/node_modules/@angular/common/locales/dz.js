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
        define("@angular/common/locales/dz", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY
    // See angular/tools/gulp-tasks/cldr/extract.js
    var u = undefined;
    function plural(n) {
        return 5;
    }
    exports.default = [
        'dz', [['སྔ་ཆ་', 'ཕྱི་ཆ་'], u, u], u,
        [
            ['ཟླ', 'མིར', 'ལྷག', 'ཕུར', 'སངྶ', 'སྤེན', 'ཉི'],
            [
                'ཟླ་', 'མིར་', 'ལྷག་', 'ཕུར་', 'སངས་',
                'སྤེན་', 'ཉི་'
            ],
            [
                'གཟའ་ཟླ་བ་', 'གཟའ་མིག་དམར་',
                'གཟའ་ལྷག་པ་', 'གཟའ་ཕུར་བུ་',
                'གཟའ་པ་སངས་', 'གཟའ་སྤེན་པ་',
                'གཟའ་ཉི་མ་'
            ],
            [
                'ཟླ་', 'མིར་', 'ལྷག་', 'ཕུར་', 'སངས་',
                'སྤེན་', 'ཉི་'
            ]
        ],
        u,
        [
            ['༡', '༢', '༣', '4', '༥', '༦', '༧', '༨', '9', '༡༠', '༡༡', '༡༢'],
            ['༡', '༢', '༣', '༤', '༥', '༦', '༧', '༨', '༩', '༡༠', '༡༡', '12'],
            [
                'ཟླ་དངཔ་', 'ཟླ་གཉིས་པ་', 'ཟླ་གསུམ་པ་',
                'ཟླ་བཞི་པ་', 'ཟླ་ལྔ་པ་', 'ཟླ་དྲུག་པ',
                'ཟླ་བདུན་པ་', 'ཟླ་བརྒྱད་པ་',
                'ཟླ་དགུ་པ་', 'ཟླ་བཅུ་པ་',
                'ཟླ་བཅུ་གཅིག་པ་', 'ཟླ་བཅུ་གཉིས་པ་'
            ]
        ],
        [
            ['༡', '༢', '༣', '༤', '༥', '༦', '༧', '༨', '༩', '༡༠', '༡༡', '༡༢'],
            [
                'ཟླ་༡', 'ཟླ་༢', 'ཟླ་༣', 'ཟླ་༤', 'ཟླ་༥',
                'ཟླ་༦', 'ཟླ་༧', 'ཟླ་༨', 'ཟླ་༩', 'ཟླ་༡༠',
                'ཟླ་༡༡', 'ཟླ་༡༢'
            ],
            [
                'སྤྱི་ཟླ་དངཔ་', 'སྤྱི་ཟླ་གཉིས་པ་',
                'སྤྱི་ཟླ་གསུམ་པ་', 'སྤྱི་ཟླ་བཞི་པ',
                'སྤྱི་ཟླ་ལྔ་པ་', 'སྤྱི་ཟླ་དྲུག་པ',
                'སྤྱི་ཟླ་བདུན་པ་',
                'སྤྱི་ཟླ་བརྒྱད་པ་',
                'སྤྱི་ཟླ་དགུ་པ་', 'སྤྱི་ཟླ་བཅུ་པ་',
                'སྤྱི་ཟླ་བཅུ་གཅིག་པ་',
                'སྤྱི་ཟླ་བཅུ་གཉིས་པ་'
            ]
        ],
        [['BCE', 'CE'], u, u], 0, [6, 0],
        [
            'y-MM-dd', 'སྤྱི་ལོ་y ཟླ་MMM ཚེས་dd',
            'སྤྱི་ལོ་y MMMM ཚེས་ dd',
            'EEEE, སྤྱི་ལོ་y MMMM ཚེས་dd'
        ],
        [
            'ཆུ་ཚོད་ h སྐར་མ་ mm a', 'ཆུ་ཚོད་h:mm:ss a',
            'ཆུ་ཚོད་ h སྐར་མ་ mm:ss a z',
            'ཆུ་ཚོད་ h སྐར་མ་ mm:ss a zzzz'
        ],
        ['{1} {0}', u, u, u], ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##,##0.###', '#,##,##0 %', '¤#,##,##0.00', '#E0'], '₹',
        'རྒྱ་གར་གྱི་དངུལ་ རུ་པི', {
            'AUD': ['AU$', '$'],
            'BTN': ['Nu.'],
            'ILS': [u, '₪'],
            'JPY': ['JP¥', '¥'],
            'KRW': ['KR₩', '₩'],
            'THB': ['TH฿', '฿'],
            'USD': ['US$', '$'],
            'XAF': []
        },
        plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHouanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9kei50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLGdCQUFnQixDQUFTO1FBQ3ZCLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFlO1FBQ2IsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDcEM7WUFDRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQztZQUNoRDtnQkFDRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTTtnQkFDckMsT0FBTyxFQUFFLEtBQUs7YUFDZjtZQUNEO2dCQUNFLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixZQUFZLEVBQUUsYUFBYTtnQkFDM0IsWUFBWSxFQUFFLGFBQWE7Z0JBQzNCLFdBQVc7YUFDWjtZQUNEO2dCQUNFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNO2dCQUNyQyxPQUFPLEVBQUUsS0FBSzthQUNmO1NBQ0Y7UUFDRCxDQUFDO1FBQ0Q7WUFDRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQy9ELENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7WUFDL0Q7Z0JBQ0UsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZO2dCQUNyQyxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVc7Z0JBQ3BDLFlBQVksRUFBRSxhQUFhO2dCQUMzQixXQUFXLEVBQUUsV0FBVztnQkFDeEIsZ0JBQWdCLEVBQUUsZ0JBQWdCO2FBQ25DO1NBQ0Y7UUFDRDtZQUNFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7WUFDL0Q7Z0JBQ0UsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU07Z0JBQ3RDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPO2dCQUN2QyxPQUFPLEVBQUUsT0FBTzthQUNqQjtZQUNEO2dCQUNFLGNBQWMsRUFBRSxpQkFBaUI7Z0JBQ2pDLGlCQUFpQixFQUFFLGVBQWU7Z0JBQ2xDLGVBQWUsRUFBRSxnQkFBZ0I7Z0JBQ2pDLGlCQUFpQjtnQkFDakIsa0JBQWtCO2dCQUNsQixnQkFBZ0IsRUFBRSxnQkFBZ0I7Z0JBQ2xDLHFCQUFxQjtnQkFDckIscUJBQXFCO2FBQ3RCO1NBQ0Y7UUFDRCxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDO1lBQ0UsU0FBUyxFQUFFLHlCQUF5QjtZQUNwQyx3QkFBd0I7WUFDeEIsNkJBQTZCO1NBQzlCO1FBQ0Q7WUFDRSx1QkFBdUIsRUFBRSxrQkFBa0I7WUFDM0MsNEJBQTRCO1lBQzVCLCtCQUErQjtTQUNoQztRQUNELENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQztRQUNwRixDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLEtBQUssQ0FBQyxFQUFFLEdBQUc7UUFDMUQsd0JBQXdCLEVBQUU7WUFDeEIsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDZCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ2YsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztZQUNuQixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0QsTUFBTTtLQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRISVMgQ09ERSBJUyBHRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZXG4vLyBTZWUgYW5ndWxhci90b29scy9ndWxwLXRhc2tzL2NsZHIvZXh0cmFjdC5qc1xuXG5jb25zdCB1ID0gdW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBwbHVyYWwobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIDU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgJ2R6JywgW1sn4L2m4L6U4LyL4L2G4LyLJywgJ+C9leC+seC9suC8i+C9huC8iyddLCB1LCB1XSwgdSxcbiAgW1xuICAgIFsn4L2f4L6zJywgJ+C9mOC9suC9oicsICfgvaPgvrfgvYInLCAn4L2V4L204L2iJywgJ+C9puC9hOC+ticsICfgvabgvqTgvbrgvZMnLCAn4L2J4L2yJ10sXG4gICAgW1xuICAgICAgJ+C9n+C+s+C8iycsICfgvZjgvbLgvaLgvIsnLCAn4L2j4L634L2C4LyLJywgJ+C9leC9tOC9ouC8iycsICfgvabgvYTgvabgvIsnLFxuICAgICAgJ+C9puC+pOC9uuC9k+C8iycsICfgvYngvbLgvIsnXG4gICAgXSxcbiAgICBbXG4gICAgICAn4L2C4L2f4L2g4LyL4L2f4L6z4LyL4L2W4LyLJywgJ+C9guC9n+C9oOC8i+C9mOC9suC9guC8i+C9keC9mOC9ouC8iycsXG4gICAgICAn4L2C4L2f4L2g4LyL4L2j4L634L2C4LyL4L2U4LyLJywgJ+C9guC9n+C9oOC8i+C9leC9tOC9ouC8i+C9luC9tOC8iycsXG4gICAgICAn4L2C4L2f4L2g4LyL4L2U4LyL4L2m4L2E4L2m4LyLJywgJ+C9guC9n+C9oOC8i+C9puC+pOC9uuC9k+C8i+C9lOC8iycsXG4gICAgICAn4L2C4L2f4L2g4LyL4L2J4L2y4LyL4L2Y4LyLJ1xuICAgIF0sXG4gICAgW1xuICAgICAgJ+C9n+C+s+C8iycsICfgvZjgvbLgvaLgvIsnLCAn4L2j4L634L2C4LyLJywgJ+C9leC9tOC9ouC8iycsICfgvabgvYTgvabgvIsnLFxuICAgICAgJ+C9puC+pOC9uuC9k+C8iycsICfgvYngvbLgvIsnXG4gICAgXVxuICBdLFxuICB1LFxuICBbXG4gICAgWyfgvKEnLCAn4LyiJywgJ+C8oycsICc0JywgJ+C8pScsICfgvKYnLCAn4LynJywgJ+C8qCcsICc5JywgJ+C8oeC8oCcsICfgvKHgvKEnLCAn4Lyh4LyiJ10sXG4gICAgWyfgvKEnLCAn4LyiJywgJ+C8oycsICfgvKQnLCAn4LylJywgJ+C8picsICfgvKcnLCAn4LyoJywgJ+C8qScsICfgvKHgvKAnLCAn4Lyh4LyhJywgJzEyJ10sXG4gICAgW1xuICAgICAgJ+C9n+C+s+C8i+C9keC9hOC9lOC8iycsICfgvZ/gvrPgvIvgvYLgvYngvbLgvabgvIvgvZTgvIsnLCAn4L2f4L6z4LyL4L2C4L2m4L204L2Y4LyL4L2U4LyLJyxcbiAgICAgICfgvZ/gvrPgvIvgvZbgvZ7gvbLgvIvgvZTgvIsnLCAn4L2f4L6z4LyL4L2j4L6U4LyL4L2U4LyLJywgJ+C9n+C+s+C8i+C9keC+suC9tOC9guC8i+C9lCcsXG4gICAgICAn4L2f4L6z4LyL4L2W4L2R4L204L2T4LyL4L2U4LyLJywgJ+C9n+C+s+C8i+C9luC9ouC+kuC+seC9keC8i+C9lOC8iycsXG4gICAgICAn4L2f4L6z4LyL4L2R4L2C4L204LyL4L2U4LyLJywgJ+C9n+C+s+C8i+C9luC9heC9tOC8i+C9lOC8iycsXG4gICAgICAn4L2f4L6z4LyL4L2W4L2F4L204LyL4L2C4L2F4L2y4L2C4LyL4L2U4LyLJywgJ+C9n+C+s+C8i+C9luC9heC9tOC8i+C9guC9ieC9suC9puC8i+C9lOC8iydcbiAgICBdXG4gIF0sXG4gIFtcbiAgICBbJ+C8oScsICfgvKInLCAn4LyjJywgJ+C8pCcsICfgvKUnLCAn4LymJywgJ+C8pycsICfgvKgnLCAn4LypJywgJ+C8oeC8oCcsICfgvKHgvKEnLCAn4Lyh4LyiJ10sXG4gICAgW1xuICAgICAgJ+C9n+C+s+C8i+C8oScsICfgvZ/gvrPgvIvgvKInLCAn4L2f4L6z4LyL4LyjJywgJ+C9n+C+s+C8i+C8pCcsICfgvZ/gvrPgvIvgvKUnLFxuICAgICAgJ+C9n+C+s+C8i+C8picsICfgvZ/gvrPgvIvgvKcnLCAn4L2f4L6z4LyL4LyoJywgJ+C9n+C+s+C8i+C8qScsICfgvZ/gvrPgvIvgvKHgvKAnLFxuICAgICAgJ+C9n+C+s+C8i+C8oeC8oScsICfgvZ/gvrPgvIvgvKHgvKInXG4gICAgXSxcbiAgICBbXG4gICAgICAn4L2m4L6k4L6x4L2y4LyL4L2f4L6z4LyL4L2R4L2E4L2U4LyLJywgJ+C9puC+pOC+seC9suC8i+C9n+C+s+C8i+C9guC9ieC9suC9puC8i+C9lOC8iycsXG4gICAgICAn4L2m4L6k4L6x4L2y4LyL4L2f4L6z4LyL4L2C4L2m4L204L2Y4LyL4L2U4LyLJywgJ+C9puC+pOC+seC9suC8i+C9n+C+s+C8i+C9luC9nuC9suC8i+C9lCcsXG4gICAgICAn4L2m4L6k4L6x4L2y4LyL4L2f4L6z4LyL4L2j4L6U4LyL4L2U4LyLJywgJ+C9puC+pOC+seC9suC8i+C9n+C+s+C8i+C9keC+suC9tOC9guC8i+C9lCcsXG4gICAgICAn4L2m4L6k4L6x4L2y4LyL4L2f4L6z4LyL4L2W4L2R4L204L2T4LyL4L2U4LyLJyxcbiAgICAgICfgvabgvqTgvrHgvbLgvIvgvZ/gvrPgvIvgvZbgvaLgvpLgvrHgvZHgvIvgvZTgvIsnLFxuICAgICAgJ+C9puC+pOC+seC9suC8i+C9n+C+s+C8i+C9keC9guC9tOC8i+C9lOC8iycsICfgvabgvqTgvrHgvbLgvIvgvZ/gvrPgvIvgvZbgvYXgvbTgvIvgvZTgvIsnLFxuICAgICAgJ+C9puC+pOC+seC9suC8i+C9n+C+s+C8i+C9luC9heC9tOC8i+C9guC9heC9suC9guC8i+C9lOC8iycsXG4gICAgICAn4L2m4L6k4L6x4L2y4LyL4L2f4L6z4LyL4L2W4L2F4L204LyL4L2C4L2J4L2y4L2m4LyL4L2U4LyLJ1xuICAgIF1cbiAgXSxcbiAgW1snQkNFJywgJ0NFJ10sIHUsIHVdLCAwLCBbNiwgMF0sXG4gIFtcbiAgICAneS1NTS1kZCcsICfgvabgvqTgvrHgvbLgvIvgvaPgvbzgvIt5IOC9n+C+s+C8i01NTSDgvZrgvbrgvabgvItkZCcsXG4gICAgJ+C9puC+pOC+seC9suC8i+C9o+C9vOC8i3kgTU1NTSDgvZrgvbrgvabgvIsgZGQnLFxuICAgICdFRUVFLCDgvabgvqTgvrHgvbLgvIvgvaPgvbzgvIt5IE1NTU0g4L2a4L264L2m4LyLZGQnXG4gIF0sXG4gIFtcbiAgICAn4L2G4L204LyL4L2a4L284L2R4LyLIGgg4L2m4L6Q4L2i4LyL4L2Y4LyLIG1tIGEnLCAn4L2G4L204LyL4L2a4L284L2R4LyLaDptbTpzcyBhJyxcbiAgICAn4L2G4L204LyL4L2a4L284L2R4LyLIGgg4L2m4L6Q4L2i4LyL4L2Y4LyLIG1tOnNzIGEgeicsXG4gICAgJ+C9huC9tOC8i+C9muC9vOC9keC8iyBoIOC9puC+kOC9ouC8i+C9mOC8iyBtbTpzcyBhIHp6enonXG4gIF0sXG4gIFsnezF9IHswfScsIHUsIHUsIHVdLCBbJy4nLCAnLCcsICc7JywgJyUnLCAnKycsICctJywgJ0UnLCAnw5cnLCAn4oCwJywgJ+KInicsICdOYU4nLCAnOiddLFxuICBbJyMsIyMsIyMwLiMjIycsICcjLCMjLCMjMMKgJScsICfCpCMsIyMsIyMwLjAwJywgJyNFMCddLCAn4oK5JyxcbiAgJ+C9ouC+kuC+seC8i+C9guC9ouC8i+C9guC+seC9suC8i+C9keC9hOC9tOC9o+C8iyDgvaLgvbTgvIvgvZTgvbInLCB7XG4gICAgJ0FVRCc6IFsnQVUkJywgJyQnXSxcbiAgICAnQlROJzogWydOdS4nXSxcbiAgICAnSUxTJzogW3UsICfigqonXSxcbiAgICAnSlBZJzogWydKUMKlJywgJ8KlJ10sXG4gICAgJ0tSVyc6IFsnS1LigqknLCAn4oKpJ10sXG4gICAgJ1RIQic6IFsnVEjguL8nLCAn4Li/J10sXG4gICAgJ1VTRCc6IFsnVVMkJywgJyQnXSxcbiAgICAnWEFGJzogW11cbiAgfSxcbiAgcGx1cmFsXG5dO1xuIl19