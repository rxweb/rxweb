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
class EjectCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'eject';
        this.description = 'Temporarily disabled. Ejects your app and output the proper '
            + 'webpack configuration and scripts.';
        this.arguments = [];
        this.options = [];
    }
    run() {
        this.logger.info(core_1.tags.stripIndents `
      The 'eject' command has been temporarily disabled, as it is not yet compatible with the new
      angular.json format. The new configuration format provides further flexibility to modify the
      configuration of your workspace without ejecting. Ejection will be re-enabled in a future
      release of the CLI.

      If you need to eject today, use CLI 1.7 to eject your project.
    `);
    }
}
EjectCommand.aliases = [];
exports.EjectCommand = EjectCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWplY3QuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXIvY2xpL2NvbW1hbmRzL2VqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsK0NBQTRDO0FBQzVDLCtDQUFvRDtBQUdwRCxrQkFBMEIsU0FBUSxpQkFBTztJQUF6Qzs7UUFDa0IsU0FBSSxHQUFHLE9BQU8sQ0FBQztRQUNmLGdCQUFXLEdBQUcsOERBQThEO2NBQzlELG9DQUFvQyxDQUFDO1FBQ25ELGNBQVMsR0FBYSxFQUFFLENBQUM7UUFDekIsWUFBTyxHQUFhLEVBQUUsQ0FBQztJQWF6QyxDQUFDO0lBVkMsR0FBRztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQUksQ0FBQyxZQUFZLENBQUE7Ozs7Ozs7S0FPakMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFYYSxvQkFBTyxHQUFHLEVBQUUsQ0FBQztBQU43QixvQ0FrQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IHRhZ3MgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBDb21tYW5kLCBPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvY29tbWFuZCc7XG5cblxuZXhwb3J0IGNsYXNzIEVqZWN0Q29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9ICdlamVjdCc7XG4gIHB1YmxpYyByZWFkb25seSBkZXNjcmlwdGlvbiA9ICdUZW1wb3JhcmlseSBkaXNhYmxlZC4gRWplY3RzIHlvdXIgYXBwIGFuZCBvdXRwdXQgdGhlIHByb3BlciAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICArICd3ZWJwYWNrIGNvbmZpZ3VyYXRpb24gYW5kIHNjcmlwdHMuJztcbiAgcHVibGljIHJlYWRvbmx5IGFyZ3VtZW50czogc3RyaW5nW10gPSBbXTtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IE9wdGlvbltdID0gW107XG4gIHB1YmxpYyBzdGF0aWMgYWxpYXNlcyA9IFtdO1xuXG4gIHJ1bigpIHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKHRhZ3Muc3RyaXBJbmRlbnRzYFxuICAgICAgVGhlICdlamVjdCcgY29tbWFuZCBoYXMgYmVlbiB0ZW1wb3JhcmlseSBkaXNhYmxlZCwgYXMgaXQgaXMgbm90IHlldCBjb21wYXRpYmxlIHdpdGggdGhlIG5ld1xuICAgICAgYW5ndWxhci5qc29uIGZvcm1hdC4gVGhlIG5ldyBjb25maWd1cmF0aW9uIGZvcm1hdCBwcm92aWRlcyBmdXJ0aGVyIGZsZXhpYmlsaXR5IHRvIG1vZGlmeSB0aGVcbiAgICAgIGNvbmZpZ3VyYXRpb24gb2YgeW91ciB3b3Jrc3BhY2Ugd2l0aG91dCBlamVjdGluZy4gRWplY3Rpb24gd2lsbCBiZSByZS1lbmFibGVkIGluIGEgZnV0dXJlXG4gICAgICByZWxlYXNlIG9mIHRoZSBDTEkuXG5cbiAgICAgIElmIHlvdSBuZWVkIHRvIGVqZWN0IHRvZGF5LCB1c2UgQ0xJIDEuNyB0byBlamVjdCB5b3VyIHByb2plY3QuXG4gICAgYCk7XG4gIH1cbn1cbiJdfQ==