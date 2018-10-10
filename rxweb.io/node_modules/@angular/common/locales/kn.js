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
        define("@angular/common/locales/kn", ["require", "exports"], factory);
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
        'kn', [['ಪೂ', 'ಅ'], ['ಪೂರ್ವಾಹ್ನ', 'ಅಪರಾಹ್ನ'], u],
        [['ಪೂರ್ವಾಹ್ನ', 'ಅಪರಾಹ್ನ'], u, u],
        [
            ['ಭಾ', 'ಸೋ', 'ಮಂ', 'ಬು', 'ಗು', 'ಶು', 'ಶ'],
            [
                'ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ',
                'ಶನಿ'
            ],
            [
                'ಭಾನುವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧವಾರ',
                'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ'
            ],
            [
                'ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ',
                'ಶನಿ'
            ]
        ],
        u,
        [
            [
                'ಜ', 'ಫೆ', 'ಮಾ', 'ಏ', 'ಮೇ', 'ಜೂ', 'ಜು', 'ಆ', 'ಸೆ', 'ಅ', 'ನ',
                'ಡಿ'
            ],
            [
                'ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿ',
                'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗ', 'ಸೆಪ್ಟೆಂ',
                'ಅಕ್ಟೋ', 'ನವೆಂ', 'ಡಿಸೆಂ'
            ],
            [
                'ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್',
                'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್',
                'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್',
                'ಡಿಸೆಂಬರ್'
            ]
        ],
        [
            [
                'ಜ', 'ಫೆ', 'ಮಾ', 'ಏ', 'ಮೇ', 'ಜೂ', 'ಜು', 'ಆ', 'ಸೆ', 'ಅ', 'ನ',
                'ಡಿ'
            ],
            [
                'ಜನ', 'ಫೆಬ್ರ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿ', 'ಮೇ',
                'ಜೂನ್', 'ಜುಲೈ', 'ಆಗ', 'ಸೆಪ್ಟೆಂ', 'ಅಕ್ಟೋ',
                'ನವೆಂ', 'ಡಿಸೆಂ'
            ],
            [
                'ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್',
                'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್',
                'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್',
                'ಡಿಸೆಂಬರ್'
            ]
        ],
        [
            ['ಕ್ರಿ.ಪೂ', 'ಕ್ರಿ.ಶ'], u,
            ['ಕ್ರಿಸ್ತ ಪೂರ್ವ', 'ಕ್ರಿಸ್ತ ಶಕ']
        ],
        0, [0, 0], ['d/M/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['hh:mm a', 'hh:mm:ss a', 'hh:mm:ss a z', 'hh:mm:ss a zzzz'], ['{1} {0}', u, u, u],
        ['.', ',', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '¤#,##0.00', '#E0'], '₹', 'ಭಾರತೀಯ ರೂಪಾಯಿ',
        { 'JPY': ['JP¥', '¥'], 'RON': [u, 'ಲೀ'], 'THB': ['฿'], 'TWD': ['NT$'] }, plural
    ];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9rbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILHlDQUF5QztJQUN6QywrQ0FBK0M7SUFFL0MsSUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXBCLGdCQUFnQixDQUFTO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELGtCQUFlO1FBQ2IsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQztZQUNFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDO1lBQ3pDO2dCQUNFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTztnQkFDN0MsS0FBSzthQUNOO1lBQ0Q7Z0JBQ0UsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUTtnQkFDeEMsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRO2FBQ2hDO1lBQ0Q7Z0JBQ0UsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPO2dCQUM3QyxLQUFLO2FBQ047U0FDRjtRQUNELENBQUM7UUFDRDtZQUNFO2dCQUNFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHO2dCQUMzRCxJQUFJO2FBQ0w7WUFDRDtnQkFDRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPO2dCQUN0QyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUztnQkFDckMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPO2FBQ3pCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsU0FBUztnQkFDeEMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUTtnQkFDOUIsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTO2dCQUNuQyxVQUFVO2FBQ1g7U0FDRjtRQUNEO1lBQ0U7Z0JBQ0UsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUc7Z0JBQzNELElBQUk7YUFDTDtZQUNEO2dCQUNFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJO2dCQUN0QyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTztnQkFDeEMsTUFBTSxFQUFFLE9BQU87YUFDaEI7WUFDRDtnQkFDRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTO2dCQUN4QyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRO2dCQUM5QixZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVM7Z0JBQ25DLFVBQVU7YUFDWDtTQUNGO1FBQ0Q7WUFDRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ3hCLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQztTQUNoQztRQUNELENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixDQUFDO1FBQ2pFLENBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDO1FBQzlELENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLGVBQWU7UUFDakUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsTUFBTTtLQUM5RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUSElTIENPREUgSVMgR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWVxuLy8gU2VlIGFuZ3VsYXIvdG9vbHMvZ3VscC10YXNrcy9jbGRyL2V4dHJhY3QuanNcblxuY29uc3QgdSA9IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gcGx1cmFsKG46IG51bWJlcik6IG51bWJlciB7XG4gIGxldCBpID0gTWF0aC5mbG9vcihNYXRoLmFicyhuKSk7XG4gIGlmIChpID09PSAwIHx8IG4gPT09IDEpIHJldHVybiAxO1xuICByZXR1cm4gNTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW1xuICAna24nLCBbWyfgsqrgs4InLCAn4LKFJ10sIFsn4LKq4LOC4LKw4LON4LK14LK+4LK54LON4LKoJywgJ+CyheCyquCysOCyvuCyueCzjeCyqCddLCB1XSxcbiAgW1sn4LKq4LOC4LKw4LON4LK14LK+4LK54LON4LKoJywgJ+CyheCyquCysOCyvuCyueCzjeCyqCddLCB1LCB1XSxcbiAgW1xuICAgIFsn4LKt4LK+JywgJ+CyuOCziycsICfgsq7gsoInLCAn4LKs4LOBJywgJ+Cyl+CzgScsICfgsrbgs4EnLCAn4LK2J10sXG4gICAgW1xuICAgICAgJ+CyreCyvuCyqOCzgScsICfgsrjgs4vgsq4nLCAn4LKu4LKC4LKX4LKzJywgJ+CyrOCzgeCypycsICfgspfgs4HgsrDgs4EnLCAn4LK24LOB4LKV4LON4LKwJyxcbiAgICAgICfgsrbgsqjgsr8nXG4gICAgXSxcbiAgICBbXG4gICAgICAn4LKt4LK+4LKo4LOB4LK14LK+4LKwJywgJ+CyuOCzi+CyruCyteCyvuCysCcsICfgsq7gsoLgspfgsrPgsrXgsr7gsrAnLCAn4LKs4LOB4LKn4LK14LK+4LKwJyxcbiAgICAgICfgspfgs4HgsrDgs4HgsrXgsr7gsrAnLCAn4LK24LOB4LKV4LON4LKw4LK14LK+4LKwJywgJ+CytuCyqOCyv+CyteCyvuCysCdcbiAgICBdLFxuICAgIFtcbiAgICAgICfgsq3gsr7gsqjgs4EnLCAn4LK44LOL4LKuJywgJ+CyruCyguCyl+CysycsICfgsqzgs4HgsqcnLCAn4LKX4LOB4LKw4LOBJywgJ+CytuCzgeCyleCzjeCysCcsXG4gICAgICAn4LK24LKo4LK/J1xuICAgIF1cbiAgXSxcbiAgdSxcbiAgW1xuICAgIFtcbiAgICAgICfgspwnLCAn4LKr4LOGJywgJ+CyruCyvicsICfgso8nLCAn4LKu4LOHJywgJ+CynOCzgicsICfgspzgs4EnLCAn4LKGJywgJ+CyuOCzhicsICfgsoUnLCAn4LKoJyxcbiAgICAgICfgsqHgsr8nXG4gICAgXSxcbiAgICBbXG4gICAgICAn4LKc4LKo4LK14LKw4LK/JywgJ+Cyq+CzhuCyrOCzjeCysOCyteCysOCyvycsICfgsq7gsr7gsrDgs43gsprgs40nLCAn4LKP4LKq4LON4LKw4LK/JyxcbiAgICAgICfgsq7gs4cnLCAn4LKc4LOC4LKo4LONJywgJ+CynOCzgeCysuCziCcsICfgsobgspcnLCAn4LK44LOG4LKq4LON4LKf4LOG4LKCJyxcbiAgICAgICfgsoXgspXgs43gsp/gs4snLCAn4LKo4LK14LOG4LKCJywgJ+CyoeCyv+CyuOCzhuCygidcbiAgICBdLFxuICAgIFtcbiAgICAgICfgspzgsqjgsrXgsrDgsr8nLCAn4LKr4LOG4LKs4LON4LKw4LK14LKw4LK/JywgJ+CyruCyvuCysOCzjeCymuCzjScsICfgso/gsqrgs43gsrDgsr/gsrLgs40nLFxuICAgICAgJ+CyruCzhycsICfgspzgs4Lgsqjgs40nLCAn4LKc4LOB4LKy4LOIJywgJ+CyhuCyl+CyuOCzjeCyn+CzjScsXG4gICAgICAn4LK44LOG4LKq4LON4LKf4LOG4LKC4LKs4LKw4LONJywgJ+CyheCyleCzjeCyn+Czi+CyrOCysOCzjScsICfgsqjgsrXgs4bgsoLgsqzgsrDgs40nLFxuICAgICAgJ+CyoeCyv+CyuOCzhuCyguCyrOCysOCzjSdcbiAgICBdXG4gIF0sXG4gIFtcbiAgICBbXG4gICAgICAn4LKcJywgJ+Cyq+CzhicsICfgsq7gsr4nLCAn4LKPJywgJ+CyruCzhycsICfgspzgs4InLCAn4LKc4LOBJywgJ+CyhicsICfgsrjgs4YnLCAn4LKFJywgJ+CyqCcsXG4gICAgICAn4LKh4LK/J1xuICAgIF0sXG4gICAgW1xuICAgICAgJ+CynOCyqCcsICfgsqvgs4bgsqzgs43gsrAnLCAn4LKu4LK+4LKw4LON4LKa4LONJywgJ+Cyj+CyquCzjeCysOCyvycsICfgsq7gs4cnLFxuICAgICAgJ+CynOCzguCyqOCzjScsICfgspzgs4HgsrLgs4gnLCAn4LKG4LKXJywgJ+CyuOCzhuCyquCzjeCyn+CzhuCygicsICfgsoXgspXgs43gsp/gs4snLFxuICAgICAgJ+CyqOCyteCzhuCygicsICfgsqHgsr/gsrjgs4bgsoInXG4gICAgXSxcbiAgICBbXG4gICAgICAn4LKc4LKo4LK14LKw4LK/JywgJ+Cyq+CzhuCyrOCzjeCysOCyteCysOCyvycsICfgsq7gsr7gsrDgs43gsprgs40nLCAn4LKP4LKq4LON4LKw4LK/4LKy4LONJyxcbiAgICAgICfgsq7gs4cnLCAn4LKc4LOC4LKo4LONJywgJ+CynOCzgeCysuCziCcsICfgsobgspfgsrjgs43gsp/gs40nLFxuICAgICAgJ+CyuOCzhuCyquCzjeCyn+CzhuCyguCyrOCysOCzjScsICfgsoXgspXgs43gsp/gs4vgsqzgsrDgs40nLCAn4LKo4LK14LOG4LKC4LKs4LKw4LONJyxcbiAgICAgICfgsqHgsr/gsrjgs4bgsoLgsqzgsrDgs40nXG4gICAgXVxuICBdLFxuICBbXG4gICAgWyfgspXgs43gsrDgsr8u4LKq4LOCJywgJ+CyleCzjeCysOCyvy7gsrYnXSwgdSxcbiAgICBbJ+CyleCzjeCysOCyv+CyuOCzjeCypCDgsqrgs4LgsrDgs43gsrUnLCAn4LKV4LON4LKw4LK/4LK44LON4LKkIOCytuCylSddXG4gIF0sXG4gIDAsIFswLCAwXSwgWydkL00veXknLCAnTU1NIGQsIHknLCAnTU1NTSBkLCB5JywgJ0VFRUUsIE1NTU0gZCwgeSddLFxuICBbJ2hoOm1tIGEnLCAnaGg6bW06c3MgYScsICdoaDptbTpzcyBhIHonLCAnaGg6bW06c3MgYSB6enp6J10sIFsnezF9IHswfScsIHUsIHUsIHVdLFxuICBbJy4nLCAnLCcsICc7JywgJyUnLCAnKycsICctJywgJ0UnLCAnw5cnLCAn4oCwJywgJ+KInicsICdOYU4nLCAnOiddLFxuICBbJyMsIyMwLiMjIycsICcjLCMjMCUnLCAnwqQjLCMjMC4wMCcsICcjRTAnXSwgJ+KCuScsICfgsq3gsr7gsrDgsqTgs4Dgsq8g4LKw4LOC4LKq4LK+4LKv4LK/JyxcbiAgeydKUFknOiBbJ0pQwqUnLCAnwqUnXSwgJ1JPTic6IFt1LCAn4LKy4LOAJ10sICdUSEInOiBbJ+C4vyddLCAnVFdEJzogWydOVCQnXX0sIHBsdXJhbFxuXTtcbiJdfQ==