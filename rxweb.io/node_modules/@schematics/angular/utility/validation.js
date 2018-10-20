"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
function validateName(name) {
    if (name && /^\d/.test(name)) {
        throw new schematics_1.SchematicsException(core_1.tags.oneLine `name (${name})
        can not start with a digit.`);
    }
}
exports.validateName = validateName;
// Must start with a letter, and must contain only alphanumeric characters or dashes.
// When adding a dash the segment after the dash must also start with a letter.
exports.htmlSelectorRe = /^[a-zA-Z][.0-9a-zA-Z]*(:?-[a-zA-Z][.0-9a-zA-Z]*)*$/;
function validateHtmlSelector(selector) {
    if (selector && !exports.htmlSelectorRe.test(selector)) {
        throw new schematics_1.SchematicsException(core_1.tags.oneLine `Selector (${selector})
        is invalid.`);
    }
}
exports.validateHtmlSelector = validateHtmlSelector;
function validateProjectName(projectName) {
    const errorIndex = getRegExpFailPosition(projectName);
    const unsupportedProjectNames = ['test', 'ember', 'ember-cli', 'vendor', 'app'];
    const packageNameRegex = /^(?:@[a-zA-Z0-9_-]+\/)?[a-zA-Z0-9_-]+$/;
    if (errorIndex !== null) {
        const firstMessage = core_1.tags.oneLine `
    Project name "${projectName}" is not valid. New project names must
    start with a letter, and must contain only alphanumeric characters or dashes.
    When adding a dash the segment after the dash must also start with a letter.
    `;
        const msg = core_1.tags.stripIndent `
    ${firstMessage}
    ${projectName}
    ${Array(errorIndex + 1).join(' ') + '^'}
    `;
        throw new schematics_1.SchematicsException(msg);
    }
    else if (unsupportedProjectNames.indexOf(projectName) !== -1) {
        throw new schematics_1.SchematicsException(`Project name ${JSON.stringify(projectName)} is not a supported name.`);
    }
    else if (!packageNameRegex.test(projectName)) {
        throw new schematics_1.SchematicsException(`Project name ${JSON.stringify(projectName)} is invalid.`);
    }
}
exports.validateProjectName = validateProjectName;
function getRegExpFailPosition(str) {
    const isScope = /^@.*\/.*/.test(str);
    if (isScope) {
        // Remove starting @
        str = str.replace(/^@/, '');
        // Change / to - for validation
        str = str.replace(/\//g, '-');
    }
    const parts = str.indexOf('-') >= 0 ? str.split('-') : [str];
    const matched = [];
    const projectNameRegexp = /^[a-zA-Z][.0-9a-zA-Z]*(-[.0-9a-zA-Z]*)*$/;
    parts.forEach(part => {
        if (part.match(projectNameRegexp)) {
            matched.push(part);
        }
    });
    const compare = matched.join('-');
    return (str !== compare) ? compare.length : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvdmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILCtDQUE0QztBQUM1QywyREFBaUU7QUFFakUsc0JBQTZCLElBQVk7SUFDdkMsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM1QixNQUFNLElBQUksZ0NBQW1CLENBQUMsV0FBSSxDQUFDLE9BQU8sQ0FBQSxTQUFTLElBQUk7b0NBQ3ZCLENBQUMsQ0FBQztLQUNuQztBQUNILENBQUM7QUFMRCxvQ0FLQztBQUVELHFGQUFxRjtBQUNyRiwrRUFBK0U7QUFDbEUsUUFBQSxjQUFjLEdBQUcsb0RBQW9ELENBQUM7QUFFbkYsOEJBQXFDLFFBQWdCO0lBQ25ELElBQUksUUFBUSxJQUFJLENBQUMsc0JBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDOUMsTUFBTSxJQUFJLGdDQUFtQixDQUFDLFdBQUksQ0FBQyxPQUFPLENBQUEsYUFBYSxRQUFRO29CQUMvQyxDQUFDLENBQUM7S0FDbkI7QUFDSCxDQUFDO0FBTEQsb0RBS0M7QUFHRCw2QkFBb0MsV0FBbUI7SUFDckQsTUFBTSxVQUFVLEdBQUcscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEQsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRixNQUFNLGdCQUFnQixHQUFHLHdDQUF3QyxDQUFDO0lBQ2xFLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtRQUN2QixNQUFNLFlBQVksR0FBRyxXQUFJLENBQUMsT0FBTyxDQUFBO29CQUNqQixXQUFXOzs7S0FHMUIsQ0FBQztRQUNGLE1BQU0sR0FBRyxHQUFHLFdBQUksQ0FBQyxXQUFXLENBQUE7TUFDMUIsWUFBWTtNQUNaLFdBQVc7TUFDWCxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHO0tBQ3RDLENBQUM7UUFDRixNQUFNLElBQUksZ0NBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM5RCxNQUFNLElBQUksZ0NBQW1CLENBQzNCLGdCQUFnQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0tBQzNFO1NBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUM5QyxNQUFNLElBQUksZ0NBQW1CLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQzFGO0FBQ0gsQ0FBQztBQXRCRCxrREFzQkM7QUFFRCwrQkFBK0IsR0FBVztJQUN4QyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLElBQUksT0FBTyxFQUFFO1FBQ1gsb0JBQW9CO1FBQ3BCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QiwrQkFBK0I7UUFDL0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQy9CO0lBRUQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0QsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO0lBRTdCLE1BQU0saUJBQWlCLEdBQUcsMENBQTBDLENBQUM7SUFFckUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxDLE9BQU8sQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgdGFncyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IFNjaGVtYXRpY3NFeGNlcHRpb24gfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZU5hbWUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gIGlmIChuYW1lICYmIC9eXFxkLy50ZXN0KG5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24odGFncy5vbmVMaW5lYG5hbWUgKCR7bmFtZX0pXG4gICAgICAgIGNhbiBub3Qgc3RhcnQgd2l0aCBhIGRpZ2l0LmApO1xuICB9XG59XG5cbi8vIE11c3Qgc3RhcnQgd2l0aCBhIGxldHRlciwgYW5kIG11c3QgY29udGFpbiBvbmx5IGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzIG9yIGRhc2hlcy5cbi8vIFdoZW4gYWRkaW5nIGEgZGFzaCB0aGUgc2VnbWVudCBhZnRlciB0aGUgZGFzaCBtdXN0IGFsc28gc3RhcnQgd2l0aCBhIGxldHRlci5cbmV4cG9ydCBjb25zdCBodG1sU2VsZWN0b3JSZSA9IC9eW2EtekEtWl1bLjAtOWEtekEtWl0qKDo/LVthLXpBLVpdWy4wLTlhLXpBLVpdKikqJC87XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUh0bWxTZWxlY3RvcihzZWxlY3Rvcjogc3RyaW5nKTogdm9pZCB7XG4gIGlmIChzZWxlY3RvciAmJiAhaHRtbFNlbGVjdG9yUmUudGVzdChzZWxlY3RvcikpIHtcbiAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbih0YWdzLm9uZUxpbmVgU2VsZWN0b3IgKCR7c2VsZWN0b3J9KVxuICAgICAgICBpcyBpbnZhbGlkLmApO1xuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUHJvamVjdE5hbWUocHJvamVjdE5hbWU6IHN0cmluZykge1xuICBjb25zdCBlcnJvckluZGV4ID0gZ2V0UmVnRXhwRmFpbFBvc2l0aW9uKHByb2plY3ROYW1lKTtcbiAgY29uc3QgdW5zdXBwb3J0ZWRQcm9qZWN0TmFtZXMgPSBbJ3Rlc3QnLCAnZW1iZXInLCAnZW1iZXItY2xpJywgJ3ZlbmRvcicsICdhcHAnXTtcbiAgY29uc3QgcGFja2FnZU5hbWVSZWdleCA9IC9eKD86QFthLXpBLVowLTlfLV0rXFwvKT9bYS16QS1aMC05Xy1dKyQvO1xuICBpZiAoZXJyb3JJbmRleCAhPT0gbnVsbCkge1xuICAgIGNvbnN0IGZpcnN0TWVzc2FnZSA9IHRhZ3Mub25lTGluZWBcbiAgICBQcm9qZWN0IG5hbWUgXCIke3Byb2plY3ROYW1lfVwiIGlzIG5vdCB2YWxpZC4gTmV3IHByb2plY3QgbmFtZXMgbXVzdFxuICAgIHN0YXJ0IHdpdGggYSBsZXR0ZXIsIGFuZCBtdXN0IGNvbnRhaW4gb25seSBhbHBoYW51bWVyaWMgY2hhcmFjdGVycyBvciBkYXNoZXMuXG4gICAgV2hlbiBhZGRpbmcgYSBkYXNoIHRoZSBzZWdtZW50IGFmdGVyIHRoZSBkYXNoIG11c3QgYWxzbyBzdGFydCB3aXRoIGEgbGV0dGVyLlxuICAgIGA7XG4gICAgY29uc3QgbXNnID0gdGFncy5zdHJpcEluZGVudGBcbiAgICAke2ZpcnN0TWVzc2FnZX1cbiAgICAke3Byb2plY3ROYW1lfVxuICAgICR7QXJyYXkoZXJyb3JJbmRleCArIDEpLmpvaW4oJyAnKSArICdeJ31cbiAgICBgO1xuICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKG1zZyk7XG4gIH0gZWxzZSBpZiAodW5zdXBwb3J0ZWRQcm9qZWN0TmFtZXMuaW5kZXhPZihwcm9qZWN0TmFtZSkgIT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oXG4gICAgICBgUHJvamVjdCBuYW1lICR7SlNPTi5zdHJpbmdpZnkocHJvamVjdE5hbWUpfSBpcyBub3QgYSBzdXBwb3J0ZWQgbmFtZS5gKTtcbiAgfSBlbHNlIGlmICghcGFja2FnZU5hbWVSZWdleC50ZXN0KHByb2plY3ROYW1lKSkge1xuICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKGBQcm9qZWN0IG5hbWUgJHtKU09OLnN0cmluZ2lmeShwcm9qZWN0TmFtZSl9IGlzIGludmFsaWQuYCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UmVnRXhwRmFpbFBvc2l0aW9uKHN0cjogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCB7XG4gIGNvbnN0IGlzU2NvcGUgPSAvXkAuKlxcLy4qLy50ZXN0KHN0cik7XG4gIGlmIChpc1Njb3BlKSB7XG4gICAgLy8gUmVtb3ZlIHN0YXJ0aW5nIEBcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXkAvLCAnJyk7XG4gICAgLy8gQ2hhbmdlIC8gdG8gLSBmb3IgdmFsaWRhdGlvblxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKC9cXC8vZywgJy0nKTtcbiAgfVxuXG4gIGNvbnN0IHBhcnRzID0gc3RyLmluZGV4T2YoJy0nKSA+PSAwID8gc3RyLnNwbGl0KCctJykgOiBbc3RyXTtcbiAgY29uc3QgbWF0Y2hlZDogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdCBwcm9qZWN0TmFtZVJlZ2V4cCA9IC9eW2EtekEtWl1bLjAtOWEtekEtWl0qKC1bLjAtOWEtekEtWl0qKSokLztcblxuICBwYXJ0cy5mb3JFYWNoKHBhcnQgPT4ge1xuICAgIGlmIChwYXJ0Lm1hdGNoKHByb2plY3ROYW1lUmVnZXhwKSkge1xuICAgICAgbWF0Y2hlZC5wdXNoKHBhcnQpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgY29tcGFyZSA9IG1hdGNoZWQuam9pbignLScpO1xuXG4gIHJldHVybiAoc3RyICE9PSBjb21wYXJlKSA/IGNvbXBhcmUubGVuZ3RoIDogbnVsbDtcbn1cbiJdfQ==