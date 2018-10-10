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
const child_process_1 = require("child_process");
const util_1 = require("util");
const config_1 = require("./config");
const execPromise = util_1.promisify(child_process_1.exec);
const packageManager = config_1.getPackageManager();
function checkYarnOrCNPM() {
    // Don't show messages if user has already changed the default.
    if (packageManager !== 'default') {
        return Promise.resolve();
    }
    return Promise
        .all([checkYarn(), checkCNPM()])
        .then((data) => {
        const [isYarnInstalled, isCNPMInstalled] = data;
        if (isYarnInstalled && isCNPMInstalled) {
            console.log(core_1.terminal.yellow('You can `ng config -g cli.packageManager yarn` '
                + 'or `ng config -g cli.packageManager cnpm`.'));
        }
        else if (isYarnInstalled) {
            console.log(core_1.terminal.yellow('You can `ng config -g cli.packageManager yarn`.'));
        }
        else if (isCNPMInstalled) {
            console.log(core_1.terminal.yellow('You can `ng config -g cli.packageManager cnpm`.'));
        }
        else {
            if (packageManager !== 'default' && packageManager !== 'npm') {
                console.log(core_1.terminal.yellow(`Seems that ${packageManager} is not installed.`));
                console.log(core_1.terminal.yellow('You can `ng config -g cli.packageManager npm`.'));
            }
        }
    });
}
exports.checkYarnOrCNPM = checkYarnOrCNPM;
function checkYarn() {
    return execPromise('yarn --version')
        .then(() => true, () => false);
}
function checkCNPM() {
    return execPromise('cnpm --version')
        .then(() => true, () => false);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stcGFja2FnZS1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyL2NsaS91dGlsaXRpZXMvY2hlY2stcGFja2FnZS1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsK0NBQWdEO0FBQ2hELGlEQUFxQztBQUNyQywrQkFBaUM7QUFDakMscUNBQTZDO0FBRTdDLE1BQU0sV0FBVyxHQUFHLGdCQUFTLENBQUMsb0JBQUksQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sY0FBYyxHQUFHLDBCQUFpQixFQUFFLENBQUM7QUFHM0M7SUFFRSwrREFBK0Q7SUFDL0QsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU87U0FDVCxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQy9CLElBQUksQ0FBQyxDQUFDLElBQW9CLEVBQUUsRUFBRTtRQUM3QixNQUFNLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNoRCxFQUFFLENBQUMsQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQVEsQ0FBQyxNQUFNLENBQUMsaURBQWlEO2tCQUN6RSw0Q0FBNEMsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDLENBQUM7UUFDbEYsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDLENBQUM7UUFDbEYsQ0FBQztRQUFDLElBQUksQ0FBRSxDQUFDO1lBQ1AsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLFNBQVMsSUFBSSxjQUFjLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsY0FBYyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7Z0JBQy9FLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLENBQUM7WUFDakYsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNULENBQUM7QUF6QkQsMENBeUJDO0FBRUQ7SUFDRSxNQUFNLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDO1NBQ2pDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVEO0lBQ0UsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztTQUNqQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IHRlcm1pbmFsIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBnZXRQYWNrYWdlTWFuYWdlciB9IGZyb20gJy4vY29uZmlnJztcblxuY29uc3QgZXhlY1Byb21pc2UgPSBwcm9taXNpZnkoZXhlYyk7XG5jb25zdCBwYWNrYWdlTWFuYWdlciA9IGdldFBhY2thZ2VNYW5hZ2VyKCk7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrWWFybk9yQ05QTSgpIHtcblxuICAvLyBEb24ndCBzaG93IG1lc3NhZ2VzIGlmIHVzZXIgaGFzIGFscmVhZHkgY2hhbmdlZCB0aGUgZGVmYXVsdC5cbiAgaWYgKHBhY2thZ2VNYW5hZ2VyICE9PSAnZGVmYXVsdCcpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICByZXR1cm4gUHJvbWlzZVxuICAgICAgLmFsbChbY2hlY2tZYXJuKCksIGNoZWNrQ05QTSgpXSlcbiAgICAgIC50aGVuKChkYXRhOiBBcnJheTxib29sZWFuPikgPT4ge1xuICAgICAgICBjb25zdCBbaXNZYXJuSW5zdGFsbGVkLCBpc0NOUE1JbnN0YWxsZWRdID0gZGF0YTtcbiAgICAgICAgaWYgKGlzWWFybkluc3RhbGxlZCAmJiBpc0NOUE1JbnN0YWxsZWQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0ZXJtaW5hbC55ZWxsb3coJ1lvdSBjYW4gYG5nIGNvbmZpZyAtZyBjbGkucGFja2FnZU1hbmFnZXIgeWFybmAgJ1xuICAgICAgICAgICAgKyAnb3IgYG5nIGNvbmZpZyAtZyBjbGkucGFja2FnZU1hbmFnZXIgY25wbWAuJykpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzWWFybkluc3RhbGxlZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRlcm1pbmFsLnllbGxvdygnWW91IGNhbiBgbmcgY29uZmlnIC1nIGNsaS5wYWNrYWdlTWFuYWdlciB5YXJuYC4nKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNDTlBNSW5zdGFsbGVkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2codGVybWluYWwueWVsbG93KCdZb3UgY2FuIGBuZyBjb25maWcgLWcgY2xpLnBhY2thZ2VNYW5hZ2VyIGNucG1gLicpKTtcbiAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgaWYgKHBhY2thZ2VNYW5hZ2VyICE9PSAnZGVmYXVsdCcgJiYgcGFja2FnZU1hbmFnZXIgIT09ICducG0nKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXJtaW5hbC55ZWxsb3coYFNlZW1zIHRoYXQgJHtwYWNrYWdlTWFuYWdlcn0gaXMgbm90IGluc3RhbGxlZC5gKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXJtaW5hbC55ZWxsb3coJ1lvdSBjYW4gYG5nIGNvbmZpZyAtZyBjbGkucGFja2FnZU1hbmFnZXIgbnBtYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tZYXJuKCkge1xuICByZXR1cm4gZXhlY1Byb21pc2UoJ3lhcm4gLS12ZXJzaW9uJylcbiAgICAudGhlbigoKSA9PiB0cnVlLCAoKSA9PiBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQ05QTSgpIHtcbiAgcmV0dXJuIGV4ZWNQcm9taXNlKCdjbnBtIC0tdmVyc2lvbicpXG4gICAgLnRoZW4oKCkgPT4gdHJ1ZSwgKCkgPT4gZmFsc2UpO1xufVxuIl19