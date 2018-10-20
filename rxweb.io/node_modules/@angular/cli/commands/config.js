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
const fs_1 = require("fs");
const command_1 = require("../models/command");
const config_1 = require("../utilities/config");
const validCliPaths = new Map([
    ['cli.warnings.versionMismatch', 'boolean'],
    ['cli.warnings.typescriptMismatch', 'boolean'],
    ['cli.defaultCollection', 'string'],
    ['cli.packageManager', 'string'],
]);
/**
 * Splits a JSON path string into fragments. Fragments can be used to get the value referenced
 * by the path. For example, a path of "a[3].foo.bar[2]" would give you a fragment array of
 * ["a", 3, "foo", "bar", 2].
 * @param path The JSON string to parse.
 * @returns {string[]} The fragments for the string.
 * @private
 */
function parseJsonPath(path) {
    const fragments = (path || '').split(/\./g);
    const result = [];
    while (fragments.length > 0) {
        const fragment = fragments.shift();
        if (fragment == undefined) {
            break;
        }
        const match = fragment.match(/([^\[]+)((\[.*\])*)/);
        if (!match) {
            throw new Error('Invalid JSON path.');
        }
        result.push(match[1]);
        if (match[2]) {
            const indices = match[2].slice(1, -1).split('][');
            result.push(...indices);
        }
    }
    return result.filter(fragment => !!fragment);
}
function getValueFromPath(root, path) {
    const fragments = parseJsonPath(path);
    try {
        return fragments.reduce((value, current) => {
            if (value == undefined || typeof value != 'object') {
                return undefined;
            }
            else if (typeof current == 'string' && !Array.isArray(value)) {
                return value[current];
            }
            else if (typeof current == 'number' && Array.isArray(value)) {
                return value[current];
            }
            else {
                return undefined;
            }
        }, root);
    }
    catch (_a) {
        return undefined;
    }
}
function setValueFromPath(root, path, newValue) {
    const fragments = parseJsonPath(path);
    try {
        return fragments.reduce((value, current, index) => {
            if (value == undefined || typeof value != 'object') {
                return undefined;
            }
            else if (typeof current == 'string' && !Array.isArray(value)) {
                if (index === fragments.length - 1) {
                    value[current] = newValue;
                }
                else if (value[current] == undefined) {
                    if (typeof fragments[index + 1] == 'number') {
                        value[current] = [];
                    }
                    else if (typeof fragments[index + 1] == 'string') {
                        value[current] = {};
                    }
                }
                return value[current];
            }
            else if (typeof current == 'number' && Array.isArray(value)) {
                if (index === fragments.length - 1) {
                    value[current] = newValue;
                }
                else if (value[current] == undefined) {
                    if (typeof fragments[index + 1] == 'number') {
                        value[current] = [];
                    }
                    else if (typeof fragments[index + 1] == 'string') {
                        value[current] = {};
                    }
                }
                return value[current];
            }
            else {
                return undefined;
            }
        }, root);
    }
    catch (_a) {
        return undefined;
    }
}
function normalizeValue(value, path) {
    const cliOptionType = validCliPaths.get(path);
    if (cliOptionType) {
        switch (cliOptionType) {
            case 'boolean':
                if (value.trim() === 'true') {
                    return true;
                }
                else if (value.trim() === 'false') {
                    return false;
                }
                break;
            case 'number':
                const numberValue = Number(value);
                if (!Number.isNaN(numberValue)) {
                    return numberValue;
                }
                break;
            case 'string':
                return value;
        }
        throw new Error(`Invalid value type; expected a ${cliOptionType}.`);
    }
    if (typeof value === 'string') {
        try {
            return core_1.parseJson(value, core_1.JsonParseMode.Loose);
        }
        catch (e) {
            if (e instanceof core_1.InvalidJsonCharacterException && !value.startsWith('{')) {
                return value;
            }
            else {
                throw e;
            }
        }
    }
    return value;
}
class ConfigCommand extends command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'config';
        this.description = 'Get/set configuration values.';
        this.arguments = ['jsonPath', 'value'];
        this.options = [
            {
                name: 'global',
                type: Boolean,
                'default': false,
                aliases: ['g'],
                description: 'Get/set the value in the global configuration (in your home directory).',
            },
        ];
    }
    run(options) {
        const level = options.global ? 'global' : 'local';
        let config = config_1.getWorkspace(level);
        if (options.global && !config) {
            try {
                if (config_1.migrateLegacyGlobalConfig()) {
                    config =
                        config_1.getWorkspace(level);
                    this.logger.info(core_1.tags.oneLine `
            We found a global configuration that was used in Angular CLI 1.
            It has been automatically migrated.`);
                }
            }
            catch (_a) { }
        }
        if (options.value == undefined) {
            if (!config) {
                this.logger.error('No config found.');
                return 1;
            }
            return this.get(config._workspace, options);
        }
        else {
            return this.set(options);
        }
    }
    get(config, options) {
        let value;
        if (options.jsonPath) {
            value = getValueFromPath(config, options.jsonPath);
        }
        else {
            value = config;
        }
        if (value === undefined) {
            this.logger.error('Value cannot be found.');
            return 1;
        }
        else if (typeof value == 'object') {
            this.logger.info(JSON.stringify(value, null, 2));
        }
        else {
            this.logger.info(value.toString());
        }
    }
    set(options) {
        if (!options.jsonPath || !options.jsonPath.trim()) {
            throw new Error('Invalid Path.');
        }
        if (options.global
            && !options.jsonPath.startsWith('schematics.')
            && !validCliPaths.has(options.jsonPath)) {
            throw new Error('Invalid Path.');
        }
        const [config, configPath] = config_1.getWorkspaceRaw(options.global ? 'global' : 'local');
        if (!config || !configPath) {
            this.logger.error('Configuration file cannot be found.');
            return 1;
        }
        // TODO: Modify & save without destroying comments
        const configValue = config.value;
        const value = normalizeValue(options.value || '', options.jsonPath);
        const result = setValueFromPath(configValue, options.jsonPath, value);
        if (result === undefined) {
            this.logger.error('Value cannot be found.');
            return 1;
        }
        try {
            config_1.validateWorkspace(configValue);
        }
        catch (error) {
            this.logger.fatal(error.message);
            return 1;
        }
        const output = JSON.stringify(configValue, null, 2);
        fs_1.writeFileSync(configPath, output);
    }
}
exports.ConfigCommand = ConfigCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyL2NsaS9jb21tYW5kcy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCwrQ0FTOEI7QUFDOUIsMkJBQW1DO0FBQ25DLCtDQUFvRDtBQUNwRCxnREFLNkI7QUFTN0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDNUIsQ0FBQyw4QkFBOEIsRUFBRSxTQUFTLENBQUM7SUFDM0MsQ0FBQyxpQ0FBaUMsRUFBRSxTQUFTLENBQUM7SUFDOUMsQ0FBQyx1QkFBdUIsRUFBRSxRQUFRLENBQUM7SUFDbkMsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLENBQUM7Q0FDakMsQ0FBQyxDQUFDO0FBRUg7Ozs7Ozs7R0FPRztBQUNILHVCQUF1QixJQUFZO0lBQ2pDLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFFNUIsT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkMsSUFBSSxRQUFRLElBQUksU0FBUyxFQUFFO1lBQ3pCLE1BQU07U0FDUDtRQUVELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNaLE1BQU0sT0FBTyxHQUFHLEtBQUss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V0FBVyxDQUFDLENBQUM7U0FDaEM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVqQyxPQUFPLENBQUMsQ0FBQztTQUNWO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BELGtCQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FFRjtBQXpHRCxzQ0F5R0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEludmFsaWRKc29uQ2hhcmFjdGVyRXhjZXB0aW9uLFxuICBKc29uQXJyYXksXG4gIEpzb25PYmplY3QsXG4gIEpzb25QYXJzZU1vZGUsXG4gIEpzb25WYWx1ZSxcbiAgZXhwZXJpbWVudGFsLFxuICBwYXJzZUpzb24sXG4gIHRhZ3MsXG59IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IHdyaXRlRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBDb21tYW5kLCBPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvY29tbWFuZCc7XG5pbXBvcnQge1xuICBnZXRXb3Jrc3BhY2UsXG4gIGdldFdvcmtzcGFjZVJhdyxcbiAgbWlncmF0ZUxlZ2FjeUdsb2JhbENvbmZpZyxcbiAgdmFsaWRhdGVXb3Jrc3BhY2UsXG59IGZyb20gJy4uL3V0aWxpdGllcy9jb25maWcnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnT3B0aW9ucyB7XG4gIGpzb25QYXRoOiBzdHJpbmc7XG4gIHZhbHVlPzogc3RyaW5nO1xuICBnbG9iYWw/OiBib29sZWFuO1xufVxuXG5jb25zdCB2YWxpZENsaVBhdGhzID0gbmV3IE1hcChbXG4gIFsnY2xpLndhcm5pbmdzLnZlcnNpb25NaXNtYXRjaCcsICdib29sZWFuJ10sXG4gIFsnY2xpLndhcm5pbmdzLnR5cGVzY3JpcHRNaXNtYXRjaCcsICdib29sZWFuJ10sXG4gIFsnY2xpLmRlZmF1bHRDb2xsZWN0aW9uJywgJ3N0cmluZyddLFxuICBbJ2NsaS5wYWNrYWdlTWFuYWdlcicsICdzdHJpbmcnXSxcbl0pO1xuXG4vKipcbiAqIFNwbGl0cyBhIEpTT04gcGF0aCBzdHJpbmcgaW50byBmcmFnbWVudHMuIEZyYWdtZW50cyBjYW4gYmUgdXNlZCB0byBnZXQgdGhlIHZhbHVlIHJlZmVyZW5jZWRcbiAqIGJ5IHRoZSBwYXRoLiBGb3IgZXhhbXBsZSwgYSBwYXRoIG9mIFwiYVszXS5mb28uYmFyWzJdXCIgd291bGQgZ2l2ZSB5b3UgYSBmcmFnbWVudCBhcnJheSBvZlxuICogW1wiYVwiLCAzLCBcImZvb1wiLCBcImJhclwiLCAyXS5cbiAqIEBwYXJhbSBwYXRoIFRoZSBKU09OIHN0cmluZyB0byBwYXJzZS5cbiAqIEByZXR1cm5zIHtzdHJpbmdbXX0gVGhlIGZyYWdtZW50cyBmb3IgdGhlIHN0cmluZy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlSnNvblBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nW10ge1xuICBjb25zdCBmcmFnbWVudHMgPSAocGF0aCB8fCAnJykuc3BsaXQoL1xcLi9nKTtcbiAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xuXG4gIHdoaWxlIChmcmFnbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZnJhZ21lbnRzLnNoaWZ0KCk7XG4gICAgaWYgKGZyYWdtZW50ID09IHVuZGVmaW5lZCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgbWF0Y2ggPSBmcmFnbWVudC5tYXRjaCgvKFteXFxbXSspKChcXFsuKlxcXSkqKS8pO1xuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBKU09OIHBhdGguJyk7XG4gICAgfVxuXG4gICAgcmVzdWx0LnB1c2gobWF0Y2hbMV0pO1xuICAgIGlmIChtYXRjaFsyXSkge1xuICAgICAgY29uc3QgaW5kaWNlcyA9IG1hdGNoWzJdLnNsaWNlKDEsIC0xKS5zcGxpdCgnXVsnKTtcbiAgICAgIHJlc3VsdC5wdXNoKC4uLmluZGljZXMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQuZmlsdGVyKGZyYWdtZW50ID0+ICEhZnJhZ21lbnQpO1xufVxuXG5mdW5jdGlvbiBnZXRWYWx1ZUZyb21QYXRoPFQgZXh0ZW5kcyBKc29uQXJyYXkgfCBKc29uT2JqZWN0PihcbiAgcm9vdDogVCxcbiAgcGF0aDogc3RyaW5nLFxuKTogSnNvblZhbHVlIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgZnJhZ21lbnRzID0gcGFyc2VKc29uUGF0aChwYXRoKTtcblxuICB0cnkge1xuICAgIHJldHVybiBmcmFnbWVudHMucmVkdWNlKCh2YWx1ZTogSnNvblZhbHVlLCBjdXJyZW50OiBzdHJpbmcgfCBudW1iZXIpID0+IHtcbiAgICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQgfHwgdHlwZW9mIHZhbHVlICE9ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjdXJyZW50ID09ICdzdHJpbmcnICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdmFsdWVbY3VycmVudF07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjdXJyZW50ID09ICdudW1iZXInICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZVtjdXJyZW50XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSwgcm9vdCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0VmFsdWVGcm9tUGF0aDxUIGV4dGVuZHMgSnNvbkFycmF5IHwgSnNvbk9iamVjdD4oXG4gIHJvb3Q6IFQsXG4gIHBhdGg6IHN0cmluZyxcbiAgbmV3VmFsdWU6IEpzb25WYWx1ZSxcbik6IEpzb25WYWx1ZSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IGZyYWdtZW50cyA9IHBhcnNlSnNvblBhdGgocGF0aCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gZnJhZ21lbnRzLnJlZHVjZSgodmFsdWU6IEpzb25WYWx1ZSwgY3VycmVudDogc3RyaW5nIHwgbnVtYmVyLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB2YWx1ZSAhPSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY3VycmVudCA9PSAnc3RyaW5nJyAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBmcmFnbWVudHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHZhbHVlW2N1cnJlbnRdID0gbmV3VmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWVbY3VycmVudF0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBmcmFnbWVudHNbaW5kZXggKyAxXSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdmFsdWVbY3VycmVudF0gPSBbXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmcmFnbWVudHNbaW5kZXggKyAxXSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFsdWVbY3VycmVudF0gPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVbY3VycmVudF07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjdXJyZW50ID09ICdudW1iZXInICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gZnJhZ21lbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICB2YWx1ZVtjdXJyZW50XSA9IG5ld1ZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlW2N1cnJlbnRdID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgZnJhZ21lbnRzW2luZGV4ICsgMV0gPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHZhbHVlW2N1cnJlbnRdID0gW107XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZnJhZ21lbnRzW2luZGV4ICsgMV0gPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhbHVlW2N1cnJlbnRdID0ge307XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlW2N1cnJlbnRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LCByb290KTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpOiBKc29uVmFsdWUge1xuICBjb25zdCBjbGlPcHRpb25UeXBlID0gdmFsaWRDbGlQYXRocy5nZXQocGF0aCk7XG4gIGlmIChjbGlPcHRpb25UeXBlKSB7XG4gICAgc3dpdGNoIChjbGlPcHRpb25UeXBlKSB7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgaWYgKHZhbHVlLnRyaW0oKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUudHJpbSgpID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgY29uc3QgbnVtYmVyVmFsdWUgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICBpZiAoIU51bWJlci5pc05hTihudW1iZXJWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVtYmVyVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZhbHVlIHR5cGU7IGV4cGVjdGVkIGEgJHtjbGlPcHRpb25UeXBlfS5gKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBwYXJzZUpzb24odmFsdWUsIEpzb25QYXJzZU1vZGUuTG9vc2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgSW52YWxpZEpzb25DaGFyYWN0ZXJFeGNlcHRpb24gJiYgIXZhbHVlLnN0YXJ0c1dpdGgoJ3snKSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGNsYXNzIENvbmZpZ0NvbW1hbmQgZXh0ZW5kcyBDb21tYW5kIHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSAnY29uZmlnJztcbiAgcHVibGljIHJlYWRvbmx5IGRlc2NyaXB0aW9uID0gJ0dldC9zZXQgY29uZmlndXJhdGlvbiB2YWx1ZXMuJztcbiAgcHVibGljIHJlYWRvbmx5IGFyZ3VtZW50cyA9IFsnanNvblBhdGgnLCAndmFsdWUnXTtcbiAgcHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IE9wdGlvbltdID0gW1xuICAgIHtcbiAgICAgIG5hbWU6ICdnbG9iYWwnLFxuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICdkZWZhdWx0JzogZmFsc2UsXG4gICAgICBhbGlhc2VzOiBbJ2cnXSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnR2V0L3NldCB0aGUgdmFsdWUgaW4gdGhlIGdsb2JhbCBjb25maWd1cmF0aW9uIChpbiB5b3VyIGhvbWUgZGlyZWN0b3J5KS4nLFxuICAgIH0sXG4gIF07XG5cbiAgcHVibGljIHJ1bihvcHRpb25zOiBDb25maWdPcHRpb25zKSB7XG4gICAgY29uc3QgbGV2ZWwgPSBvcHRpb25zLmdsb2JhbCA/ICdnbG9iYWwnIDogJ2xvY2FsJztcblxuICAgIGxldCBjb25maWcgPVxuICAgICAgKGdldFdvcmtzcGFjZShsZXZlbCkgYXMge30gYXMgeyBfd29ya3NwYWNlOiBleHBlcmltZW50YWwud29ya3NwYWNlLldvcmtzcGFjZVNjaGVtYSB9KTtcblxuICAgIGlmIChvcHRpb25zLmdsb2JhbCAmJiAhY29uZmlnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAobWlncmF0ZUxlZ2FjeUdsb2JhbENvbmZpZygpKSB7XG4gICAgICAgICAgY29uZmlnID1cbiAgICAgICAgICAgIChnZXRXb3Jrc3BhY2UobGV2ZWwpIGFzIHt9IGFzIHsgX3dvcmtzcGFjZTogZXhwZXJpbWVudGFsLndvcmtzcGFjZS5Xb3Jrc3BhY2VTY2hlbWEgfSk7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyh0YWdzLm9uZUxpbmVgXG4gICAgICAgICAgICBXZSBmb3VuZCBhIGdsb2JhbCBjb25maWd1cmF0aW9uIHRoYXQgd2FzIHVzZWQgaW4gQW5ndWxhciBDTEkgMS5cbiAgICAgICAgICAgIEl0IGhhcyBiZWVuIGF1dG9tYXRpY2FsbHkgbWlncmF0ZWQuYCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge31cbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy52YWx1ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghY29uZmlnKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKCdObyBjb25maWcgZm91bmQuJyk7XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmdldChjb25maWcuX3dvcmtzcGFjZSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNldChvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldChjb25maWc6IGV4cGVyaW1lbnRhbC53b3Jrc3BhY2UuV29ya3NwYWNlU2NoZW1hLCBvcHRpb25zOiBDb25maWdPcHRpb25zKSB7XG4gICAgbGV0IHZhbHVlO1xuICAgIGlmIChvcHRpb25zLmpzb25QYXRoKSB7XG4gICAgICB2YWx1ZSA9IGdldFZhbHVlRnJvbVBhdGgoY29uZmlnIGFzIHt9IGFzIEpzb25PYmplY3QsIG9wdGlvbnMuanNvblBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IGNvbmZpZztcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoJ1ZhbHVlIGNhbm5vdCBiZSBmb3VuZC4nKTtcblxuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmluZm8oSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyh2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldChvcHRpb25zOiBDb25maWdPcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLmpzb25QYXRoIHx8ICFvcHRpb25zLmpzb25QYXRoLnRyaW0oKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFBhdGguJyk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmdsb2JhbFxuICAgICAgICAmJiAhb3B0aW9ucy5qc29uUGF0aC5zdGFydHNXaXRoKCdzY2hlbWF0aWNzLicpXG4gICAgICAgICYmICF2YWxpZENsaVBhdGhzLmhhcyhvcHRpb25zLmpzb25QYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFBhdGguJyk7XG4gICAgfVxuXG4gICAgY29uc3QgW2NvbmZpZywgY29uZmlnUGF0aF0gPSBnZXRXb3Jrc3BhY2VSYXcob3B0aW9ucy5nbG9iYWwgPyAnZ2xvYmFsJyA6ICdsb2NhbCcpO1xuICAgIGlmICghY29uZmlnIHx8ICFjb25maWdQYXRoKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcignQ29uZmlndXJhdGlvbiBmaWxlIGNhbm5vdCBiZSBmb3VuZC4nKTtcblxuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogTW9kaWZ5ICYgc2F2ZSB3aXRob3V0IGRlc3Ryb3lpbmcgY29tbWVudHNcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IGNvbmZpZy52YWx1ZTtcblxuICAgIGNvbnN0IHZhbHVlID0gbm9ybWFsaXplVmFsdWUob3B0aW9ucy52YWx1ZSB8fCAnJywgb3B0aW9ucy5qc29uUGF0aCk7XG4gICAgY29uc3QgcmVzdWx0ID0gc2V0VmFsdWVGcm9tUGF0aChjb25maWdWYWx1ZSwgb3B0aW9ucy5qc29uUGF0aCwgdmFsdWUpO1xuXG4gICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcignVmFsdWUgY2Fubm90IGJlIGZvdW5kLicpO1xuXG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgdmFsaWRhdGVXb3Jrc3BhY2UoY29uZmlnVmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmxvZ2dlci5mYXRhbChlcnJvci5tZXNzYWdlKTtcblxuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gSlNPTi5zdHJpbmdpZnkoY29uZmlnVmFsdWUsIG51bGwsIDIpO1xuICAgIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgb3V0cHV0KTtcbiAgfVxuXG59XG4iXX0=