"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const process = require("process");
const benchmark_1 = require("./benchmark");
const gather_diagnostics_1 = require("./gather_diagnostics");
const type_checker_1 = require("./type_checker");
let typeChecker;
let lastCancellationToken;
// only listen to messages if started from the AngularCompilerPlugin
if (process.argv.indexOf(type_checker_1.AUTO_START_ARG) >= 0) {
    process.on('message', (message) => {
        benchmark_1.time('TypeChecker.message');
        switch (message.kind) {
            case type_checker_1.MESSAGE_KIND.Init:
                const initMessage = message;
                typeChecker = new type_checker_1.TypeChecker(initMessage.compilerOptions, initMessage.basePath, initMessage.jitMode, initMessage.rootNames);
                break;
            case type_checker_1.MESSAGE_KIND.Update:
                if (!typeChecker) {
                    throw new Error('TypeChecker: update message received before initialization');
                }
                if (lastCancellationToken) {
                    // This cancellation token doesn't seem to do much, messages don't seem to be processed
                    // before the diagnostics finish.
                    lastCancellationToken.requestCancellation();
                }
                const updateMessage = message;
                lastCancellationToken = new gather_diagnostics_1.CancellationToken();
                typeChecker.update(updateMessage.rootNames, updateMessage.changedCompilationFiles, lastCancellationToken);
                break;
            default:
                throw new Error(`TypeChecker: Unexpected message received: ${message}.`);
        }
        benchmark_1.timeEnd('TypeChecker.message');
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZV9jaGVja2VyX3dvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvbmd0b29scy93ZWJwYWNrL3NyYy90eXBlX2NoZWNrZXJfd29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsbUNBQW1DO0FBQ25DLDJDQUE0QztBQUM1Qyw2REFBeUQ7QUFDekQsaURBT3dCO0FBRXhCLElBQUksV0FBd0IsQ0FBQztBQUM3QixJQUFJLHFCQUF3QyxDQUFDO0FBRTdDLG9FQUFvRTtBQUNwRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyw2QkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE9BQTJCLEVBQUUsRUFBRTtRQUNwRCxnQkFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSywyQkFBWSxDQUFDLElBQUk7Z0JBQ3BCLE1BQU0sV0FBVyxHQUFHLE9BQXNCLENBQUM7Z0JBQzNDLFdBQVcsR0FBRyxJQUFJLDBCQUFXLENBQzNCLFdBQVcsQ0FBQyxlQUFlLEVBQzNCLFdBQVcsQ0FBQyxRQUFRLEVBQ3BCLFdBQVcsQ0FBQyxPQUFPLEVBQ25CLFdBQVcsQ0FBQyxTQUFTLENBQ3RCLENBQUM7Z0JBQ0YsS0FBSyxDQUFDO1lBQ1IsS0FBSywyQkFBWSxDQUFDLE1BQU07Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO2dCQUNoRixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztvQkFDMUIsdUZBQXVGO29CQUN2RixpQ0FBaUM7b0JBQ2pDLHFCQUFxQixDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzlDLENBQUM7Z0JBQ0QsTUFBTSxhQUFhLEdBQUcsT0FBd0IsQ0FBQztnQkFDL0MscUJBQXFCLEdBQUcsSUFBSSxzQ0FBaUIsRUFBRSxDQUFDO2dCQUNoRCxXQUFXLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLHVCQUF1QixFQUMvRSxxQkFBcUIsQ0FBQyxDQUFDO2dCQUN6QixLQUFLLENBQUM7WUFDUjtnQkFDRSxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQzdFLENBQUM7UUFDRCxtQkFBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgcHJvY2VzcyBmcm9tICdwcm9jZXNzJztcbmltcG9ydCB7IHRpbWUsIHRpbWVFbmQgfSBmcm9tICcuL2JlbmNobWFyayc7XG5pbXBvcnQgeyBDYW5jZWxsYXRpb25Ub2tlbiB9IGZyb20gJy4vZ2F0aGVyX2RpYWdub3N0aWNzJztcbmltcG9ydCB7XG4gIEFVVE9fU1RBUlRfQVJHLFxuICBJbml0TWVzc2FnZSxcbiAgTUVTU0FHRV9LSU5ELFxuICBUeXBlQ2hlY2tlcixcbiAgVHlwZUNoZWNrZXJNZXNzYWdlLFxuICBVcGRhdGVNZXNzYWdlLFxufSBmcm9tICcuL3R5cGVfY2hlY2tlcic7XG5cbmxldCB0eXBlQ2hlY2tlcjogVHlwZUNoZWNrZXI7XG5sZXQgbGFzdENhbmNlbGxhdGlvblRva2VuOiBDYW5jZWxsYXRpb25Ub2tlbjtcblxuLy8gb25seSBsaXN0ZW4gdG8gbWVzc2FnZXMgaWYgc3RhcnRlZCBmcm9tIHRoZSBBbmd1bGFyQ29tcGlsZXJQbHVnaW5cbmlmIChwcm9jZXNzLmFyZ3YuaW5kZXhPZihBVVRPX1NUQVJUX0FSRykgPj0gMCkge1xuICBwcm9jZXNzLm9uKCdtZXNzYWdlJywgKG1lc3NhZ2U6IFR5cGVDaGVja2VyTWVzc2FnZSkgPT4ge1xuICAgIHRpbWUoJ1R5cGVDaGVja2VyLm1lc3NhZ2UnKTtcbiAgICBzd2l0Y2ggKG1lc3NhZ2Uua2luZCkge1xuICAgICAgY2FzZSBNRVNTQUdFX0tJTkQuSW5pdDpcbiAgICAgICAgY29uc3QgaW5pdE1lc3NhZ2UgPSBtZXNzYWdlIGFzIEluaXRNZXNzYWdlO1xuICAgICAgICB0eXBlQ2hlY2tlciA9IG5ldyBUeXBlQ2hlY2tlcihcbiAgICAgICAgICBpbml0TWVzc2FnZS5jb21waWxlck9wdGlvbnMsXG4gICAgICAgICAgaW5pdE1lc3NhZ2UuYmFzZVBhdGgsXG4gICAgICAgICAgaW5pdE1lc3NhZ2Uuaml0TW9kZSxcbiAgICAgICAgICBpbml0TWVzc2FnZS5yb290TmFtZXMsXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBNRVNTQUdFX0tJTkQuVXBkYXRlOlxuICAgICAgICBpZiAoIXR5cGVDaGVja2VyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUeXBlQ2hlY2tlcjogdXBkYXRlIG1lc3NhZ2UgcmVjZWl2ZWQgYmVmb3JlIGluaXRpYWxpemF0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RDYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICAgIC8vIFRoaXMgY2FuY2VsbGF0aW9uIHRva2VuIGRvZXNuJ3Qgc2VlbSB0byBkbyBtdWNoLCBtZXNzYWdlcyBkb24ndCBzZWVtIHRvIGJlIHByb2Nlc3NlZFxuICAgICAgICAgIC8vIGJlZm9yZSB0aGUgZGlhZ25vc3RpY3MgZmluaXNoLlxuICAgICAgICAgIGxhc3RDYW5jZWxsYXRpb25Ub2tlbi5yZXF1ZXN0Q2FuY2VsbGF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXBkYXRlTWVzc2FnZSA9IG1lc3NhZ2UgYXMgVXBkYXRlTWVzc2FnZTtcbiAgICAgICAgbGFzdENhbmNlbGxhdGlvblRva2VuID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgIHR5cGVDaGVja2VyLnVwZGF0ZSh1cGRhdGVNZXNzYWdlLnJvb3ROYW1lcywgdXBkYXRlTWVzc2FnZS5jaGFuZ2VkQ29tcGlsYXRpb25GaWxlcyxcbiAgICAgICAgICBsYXN0Q2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVHlwZUNoZWNrZXI6IFVuZXhwZWN0ZWQgbWVzc2FnZSByZWNlaXZlZDogJHttZXNzYWdlfS5gKTtcbiAgICB9XG4gICAgdGltZUVuZCgnVHlwZUNoZWNrZXIubWVzc2FnZScpO1xuICB9KTtcbn1cbiJdfQ==