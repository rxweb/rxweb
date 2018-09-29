"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const child_process_1 = require("child_process");
const path = require("path");
function default_1(factoryOptions = {}) {
    const rootDirectory = factoryOptions.rootDirectory || process.cwd();
    return (options, context) => __awaiter(this, void 0, void 0, function* () {
        const authorName = options.authorName;
        const authorEmail = options.authorEmail;
        const execute = (args, ignoreErrorStream) => {
            const outputStream = 'ignore';
            const errorStream = ignoreErrorStream ? 'ignore' : process.stderr;
            const spawnOptions = {
                stdio: [process.stdin, outputStream, errorStream],
                shell: true,
                cwd: path.join(rootDirectory, options.workingDirectory || ''),
                env: Object.assign({}, process.env, (authorName
                    ? { GIT_AUTHOR_NAME: authorName, GIT_COMMITTER_NAME: authorName }
                    : {}), (authorEmail
                    ? { GIT_AUTHOR_EMAIL: authorEmail, GIT_COMMITTER_EMAIL: authorEmail }
                    : {})),
            };
            return new Promise((resolve, reject) => {
                child_process_1.spawn('git', args, spawnOptions)
                    .on('close', (code) => {
                    if (code === 0) {
                        resolve();
                    }
                    else {
                        reject(code);
                    }
                });
            });
        };
        const hasCommand = yield execute(['--version'])
            .then(() => true, () => false);
        if (!hasCommand) {
            return;
        }
        const insideRepo = yield execute(['rev-parse', '--is-inside-work-tree'], true)
            .then(() => true, () => false);
        if (insideRepo) {
            context.logger.info(core_1.tags.oneLine `
        Directory is already under version control.
        Skipping initialization of git.
      `);
            return;
        }
        // if git is not found or an error was thrown during the `git`
        // init process just swallow any errors here
        // NOTE: This will be removed once task error handling is implemented
        try {
            yield execute(['init']);
            yield execute(['add', '.']);
            if (options.commit) {
                const message = options.message || 'initial commit';
                yield execute(['commit', `-m "${message}"`]);
            }
            context.logger.info('Successfully initialized git.');
        }
        catch (_a) { }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3MvdGFza3MvcmVwby1pbml0L2V4ZWN1dG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwrQ0FBNEM7QUFDNUMsaURBQW9EO0FBQ3BELDZCQUE2QjtBQVE3QixtQkFDRSxpQkFBMEQsRUFBRTtJQUU1RCxNQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVwRSxNQUFNLENBQUMsQ0FBTyxPQUF5QyxFQUFFLE9BQXlCLEVBQUUsRUFBRTtRQUNwRixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3RDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFFeEMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFjLEVBQUUsaUJBQTJCLEVBQUUsRUFBRTtZQUM5RCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7WUFDOUIsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNsRSxNQUFNLFlBQVksR0FBaUI7Z0JBQ2pDLEtBQUssRUFBRyxDQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBRTtnQkFDcEQsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7Z0JBQzdELEdBQUcsb0JBQ0UsT0FBTyxDQUFDLEdBQUcsRUFDWCxDQUFDLFVBQVU7b0JBQ1osQ0FBQyxDQUFDLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUU7b0JBQ2pFLENBQUMsQ0FBQyxFQUFFLENBQ0wsRUFDRSxDQUFDLFdBQVc7b0JBQ2IsQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRTtvQkFDckUsQ0FBQyxDQUFDLEVBQUUsQ0FDTCxDQUNGO2FBQ0YsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDM0MscUJBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQztxQkFDN0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFO29CQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDZixPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDZixDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixNQUFNLFVBQVUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzVDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxNQUFNLFVBQVUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSx1QkFBdUIsQ0FBQyxFQUFFLElBQUksQ0FBQzthQUMzRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFJLENBQUMsT0FBTyxDQUFBOzs7T0FHL0IsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELDhEQUE4RDtRQUM5RCw0Q0FBNEM7UUFDNUMscUVBQXFFO1FBQ3JFLElBQUksQ0FBQztZQUNILE1BQU0sT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTVCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLGdCQUFnQixDQUFDO2dCQUVwRCxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxDQUFDO1lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsSUFBRCxDQUFDLENBQUEsQ0FBQztJQUNaLENBQUMsQ0FBQSxDQUFDO0FBQ0osQ0FBQztBQTFFRCw0QkEwRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQgeyB0YWdzIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgU3Bhd25PcHRpb25zLCBzcGF3biB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFNjaGVtYXRpY0NvbnRleHQsIFRhc2tFeGVjdXRvciB9IGZyb20gJy4uLy4uL3NyYyc7XG5pbXBvcnQge1xuICBSZXBvc2l0b3J5SW5pdGlhbGl6ZXJUYXNrRmFjdG9yeU9wdGlvbnMsXG4gIFJlcG9zaXRvcnlJbml0aWFsaXplclRhc2tPcHRpb25zLFxufSBmcm9tICcuL29wdGlvbnMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKFxuICBmYWN0b3J5T3B0aW9uczogUmVwb3NpdG9yeUluaXRpYWxpemVyVGFza0ZhY3RvcnlPcHRpb25zID0ge30sXG4pOiBUYXNrRXhlY3V0b3I8UmVwb3NpdG9yeUluaXRpYWxpemVyVGFza09wdGlvbnM+IHtcbiAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IGZhY3RvcnlPcHRpb25zLnJvb3REaXJlY3RvcnkgfHwgcHJvY2Vzcy5jd2QoKTtcblxuICByZXR1cm4gYXN5bmMgKG9wdGlvbnM6IFJlcG9zaXRvcnlJbml0aWFsaXplclRhc2tPcHRpb25zLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgY29uc3QgYXV0aG9yTmFtZSA9IG9wdGlvbnMuYXV0aG9yTmFtZTtcbiAgICBjb25zdCBhdXRob3JFbWFpbCA9IG9wdGlvbnMuYXV0aG9yRW1haWw7XG5cbiAgICBjb25zdCBleGVjdXRlID0gKGFyZ3M6IHN0cmluZ1tdLCBpZ25vcmVFcnJvclN0cmVhbT86IGJvb2xlYW4pID0+IHtcbiAgICAgIGNvbnN0IG91dHB1dFN0cmVhbSA9ICdpZ25vcmUnO1xuICAgICAgY29uc3QgZXJyb3JTdHJlYW0gPSBpZ25vcmVFcnJvclN0cmVhbSA/ICdpZ25vcmUnIDogcHJvY2Vzcy5zdGRlcnI7XG4gICAgICBjb25zdCBzcGF3bk9wdGlvbnM6IFNwYXduT3B0aW9ucyA9IHtcbiAgICAgICAgc3RkaW86ICBbIHByb2Nlc3Muc3RkaW4sIG91dHB1dFN0cmVhbSwgZXJyb3JTdHJlYW0gXSxcbiAgICAgICAgc2hlbGw6IHRydWUsXG4gICAgICAgIGN3ZDogcGF0aC5qb2luKHJvb3REaXJlY3RvcnksIG9wdGlvbnMud29ya2luZ0RpcmVjdG9yeSB8fCAnJyksXG4gICAgICAgIGVudjoge1xuICAgICAgICAgIC4uLnByb2Nlc3MuZW52LFxuICAgICAgICAgIC4uLihhdXRob3JOYW1lXG4gICAgICAgICAgICA/IHsgR0lUX0FVVEhPUl9OQU1FOiBhdXRob3JOYW1lLCBHSVRfQ09NTUlUVEVSX05BTUU6IGF1dGhvck5hbWUgfVxuICAgICAgICAgICAgOiB7fVxuICAgICAgICAgICksXG4gICAgICAgICAgLi4uKGF1dGhvckVtYWlsXG4gICAgICAgICAgICA/IHsgR0lUX0FVVEhPUl9FTUFJTDogYXV0aG9yRW1haWwsIEdJVF9DT01NSVRURVJfRU1BSUw6IGF1dGhvckVtYWlsIH1cbiAgICAgICAgICAgIDoge31cbiAgICAgICAgICApLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc3Bhd24oJ2dpdCcsIGFyZ3MsIHNwYXduT3B0aW9ucylcbiAgICAgICAgICAub24oJ2Nsb3NlJywgKGNvZGU6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGNvZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBoYXNDb21tYW5kID0gYXdhaXQgZXhlY3V0ZShbJy0tdmVyc2lvbiddKVxuICAgICAgLnRoZW4oKCkgPT4gdHJ1ZSwgKCkgPT4gZmFsc2UpO1xuICAgIGlmICghaGFzQ29tbWFuZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGluc2lkZVJlcG8gPSBhd2FpdCBleGVjdXRlKFsncmV2LXBhcnNlJywgJy0taXMtaW5zaWRlLXdvcmstdHJlZSddLCB0cnVlKVxuICAgICAgLnRoZW4oKCkgPT4gdHJ1ZSwgKCkgPT4gZmFsc2UpO1xuICAgIGlmIChpbnNpZGVSZXBvKSB7XG4gICAgICBjb250ZXh0LmxvZ2dlci5pbmZvKHRhZ3Mub25lTGluZWBcbiAgICAgICAgRGlyZWN0b3J5IGlzIGFscmVhZHkgdW5kZXIgdmVyc2lvbiBjb250cm9sLlxuICAgICAgICBTa2lwcGluZyBpbml0aWFsaXphdGlvbiBvZiBnaXQuXG4gICAgICBgKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIGdpdCBpcyBub3QgZm91bmQgb3IgYW4gZXJyb3Igd2FzIHRocm93biBkdXJpbmcgdGhlIGBnaXRgXG4gICAgLy8gaW5pdCBwcm9jZXNzIGp1c3Qgc3dhbGxvdyBhbnkgZXJyb3JzIGhlcmVcbiAgICAvLyBOT1RFOiBUaGlzIHdpbGwgYmUgcmVtb3ZlZCBvbmNlIHRhc2sgZXJyb3IgaGFuZGxpbmcgaXMgaW1wbGVtZW50ZWRcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZXhlY3V0ZShbJ2luaXQnXSk7XG4gICAgICBhd2FpdCBleGVjdXRlKFsnYWRkJywgJy4nXSk7XG5cbiAgICAgIGlmIChvcHRpb25zLmNvbW1pdCkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gb3B0aW9ucy5tZXNzYWdlIHx8ICdpbml0aWFsIGNvbW1pdCc7XG5cbiAgICAgICAgYXdhaXQgZXhlY3V0ZShbJ2NvbW1pdCcsIGAtbSBcIiR7bWVzc2FnZX1cImBdKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5sb2dnZXIuaW5mbygnU3VjY2Vzc2Z1bGx5IGluaXRpYWxpemVkIGdpdC4nKTtcbiAgICB9IGNhdGNoIHt9XG4gIH07XG59XG4iXX0=