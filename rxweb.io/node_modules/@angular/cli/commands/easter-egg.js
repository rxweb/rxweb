"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const command_1 = require("../models/command");
function pickOne(of) {
    return of[Math.floor(Math.random() * of.length)];
}
class AwesomeCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'make-this-awesome';
        this.description = '';
        this.hidden = true;
        this.arguments = [];
        this.options = [];
    }
    run() {
        const phrase = pickOne([
            `You're on it, there's nothing for me to do!`,
            `Let's take a look... nope, it's all good!`,
            `You're doing fine.`,
            `You're already doing great.`,
            `Nothing to do; already awesome. Exiting.`,
            `Error 418: As Awesome As Can Get.`,
            `I spy with my little eye a great developer!`,
            `Noop... already awesome.`,
        ]);
        this.logger.info(core_1.terminal.green(phrase));
    }
}
exports.AwesomeCommand = AwesomeCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzdGVyLWVnZy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvY29tbWFuZHMvZWFzdGVyLWVnZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILCtDQUFnRDtBQUNoRCwrQ0FBb0Q7QUFFcEQsaUJBQWlCLEVBQVk7SUFDM0IsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVELG9CQUE0QixTQUFRLGlCQUFPO0lBQTNDOztRQUNrQixTQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFDM0IsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsV0FBTSxHQUFHLElBQUksQ0FBQztRQUNyQixjQUFTLEdBQWEsRUFBRSxDQUFDO1FBQ3pCLFlBQU8sR0FBYSxFQUFFLENBQUM7SUFlbEMsQ0FBQztJQWJDLEdBQUc7UUFDRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7WUFDckIsNkNBQTZDO1lBQzdDLDJDQUEyQztZQUMzQyxvQkFBb0I7WUFDcEIsNkJBQTZCO1lBQzdCLDBDQUEwQztZQUMxQyxtQ0FBbUM7WUFDbkMsNkNBQTZDO1lBQzdDLDBCQUEwQjtTQUMzQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBcEJELHdDQW9CQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgdGVybWluYWwgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBDb21tYW5kLCBPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvY29tbWFuZCc7XG5cbmZ1bmN0aW9uIHBpY2tPbmUob2Y6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgcmV0dXJuIG9mW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG9mLmxlbmd0aCldO1xufVxuXG5leHBvcnQgY2xhc3MgQXdlc29tZUNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSAnbWFrZS10aGlzLWF3ZXNvbWUnO1xuICBwdWJsaWMgcmVhZG9ubHkgZGVzY3JpcHRpb24gPSAnJztcbiAgcHVibGljIHJlYWRvbmx5IGhpZGRlbiA9IHRydWU7XG4gIHJlYWRvbmx5IGFyZ3VtZW50czogc3RyaW5nW10gPSBbXTtcbiAgcmVhZG9ubHkgb3B0aW9uczogT3B0aW9uW10gPSBbXTtcblxuICBydW4oKSB7XG4gICAgY29uc3QgcGhyYXNlID0gcGlja09uZShbXG4gICAgICBgWW91J3JlIG9uIGl0LCB0aGVyZSdzIG5vdGhpbmcgZm9yIG1lIHRvIGRvIWAsXG4gICAgICBgTGV0J3MgdGFrZSBhIGxvb2suLi4gbm9wZSwgaXQncyBhbGwgZ29vZCFgLFxuICAgICAgYFlvdSdyZSBkb2luZyBmaW5lLmAsXG4gICAgICBgWW91J3JlIGFscmVhZHkgZG9pbmcgZ3JlYXQuYCxcbiAgICAgIGBOb3RoaW5nIHRvIGRvOyBhbHJlYWR5IGF3ZXNvbWUuIEV4aXRpbmcuYCxcbiAgICAgIGBFcnJvciA0MTg6IEFzIEF3ZXNvbWUgQXMgQ2FuIEdldC5gLFxuICAgICAgYEkgc3B5IHdpdGggbXkgbGl0dGxlIGV5ZSBhIGdyZWF0IGRldmVsb3BlciFgLFxuICAgICAgYE5vb3AuLi4gYWxyZWFkeSBhd2Vzb21lLmAsXG4gICAgXSk7XG4gICAgdGhpcy5sb2dnZXIuaW5mbyh0ZXJtaW5hbC5ncmVlbihwaHJhc2UpKTtcbiAgfVxufVxuIl19