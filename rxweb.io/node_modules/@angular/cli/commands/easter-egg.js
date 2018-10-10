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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzdGVyLWVnZy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhci9jbGkvY29tbWFuZHMvZWFzdGVyLWVnZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILCtDQUFnRDtBQUNoRCwrQ0FBb0Q7QUFFcEQsaUJBQWlCLEVBQVk7SUFDM0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQsb0JBQTRCLFNBQVEsaUJBQU87SUFBM0M7O1FBQ2tCLFNBQUksR0FBRyxtQkFBbUIsQ0FBQztRQUMzQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixXQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGNBQVMsR0FBYSxFQUFFLENBQUM7UUFDekIsWUFBTyxHQUFhLEVBQUUsQ0FBQztJQWVsQyxDQUFDO0lBYkMsR0FBRztRQUNELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUNyQiw2Q0FBNkM7WUFDN0MsMkNBQTJDO1lBQzNDLG9CQUFvQjtZQUNwQiw2QkFBNkI7WUFDN0IsMENBQTBDO1lBQzFDLG1DQUFtQztZQUNuQyw2Q0FBNkM7WUFDN0MsMEJBQTBCO1NBQzNCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0Y7QUFwQkQsd0NBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyB0ZXJtaW5hbCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IENvbW1hbmQsIE9wdGlvbiB9IGZyb20gJy4uL21vZGVscy9jb21tYW5kJztcblxuZnVuY3Rpb24gcGlja09uZShvZjogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gb2ZbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogb2YubGVuZ3RoKV07XG59XG5cbmV4cG9ydCBjbGFzcyBBd2Vzb21lQ29tbWFuZCBleHRlbmRzIENvbW1hbmQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9ICdtYWtlLXRoaXMtYXdlc29tZSc7XG4gIHB1YmxpYyByZWFkb25seSBkZXNjcmlwdGlvbiA9ICcnO1xuICBwdWJsaWMgcmVhZG9ubHkgaGlkZGVuID0gdHJ1ZTtcbiAgcmVhZG9ubHkgYXJndW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xuICByZWFkb25seSBvcHRpb25zOiBPcHRpb25bXSA9IFtdO1xuXG4gIHJ1bigpIHtcbiAgICBjb25zdCBwaHJhc2UgPSBwaWNrT25lKFtcbiAgICAgIGBZb3UncmUgb24gaXQsIHRoZXJlJ3Mgbm90aGluZyBmb3IgbWUgdG8gZG8hYCxcbiAgICAgIGBMZXQncyB0YWtlIGEgbG9vay4uLiBub3BlLCBpdCdzIGFsbCBnb29kIWAsXG4gICAgICBgWW91J3JlIGRvaW5nIGZpbmUuYCxcbiAgICAgIGBZb3UncmUgYWxyZWFkeSBkb2luZyBncmVhdC5gLFxuICAgICAgYE5vdGhpbmcgdG8gZG87IGFscmVhZHkgYXdlc29tZS4gRXhpdGluZy5gLFxuICAgICAgYEVycm9yIDQxODogQXMgQXdlc29tZSBBcyBDYW4gR2V0LmAsXG4gICAgICBgSSBzcHkgd2l0aCBteSBsaXR0bGUgZXllIGEgZ3JlYXQgZGV2ZWxvcGVyIWAsXG4gICAgICBgTm9vcC4uLiBhbHJlYWR5IGF3ZXNvbWUuYCxcbiAgICBdKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKHRlcm1pbmFsLmdyZWVuKHBocmFzZSkpO1xuICB9XG59XG4iXX0=