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
const base_1 = require("./base");
const is_binary_1 = require("./utils/is-binary");
class OptionIsNotDefinedException extends core_1.BaseException {
    constructor(name) { super(`Option "${name}" is not defined.`); }
}
exports.OptionIsNotDefinedException = OptionIsNotDefinedException;
class UnknownPipeException extends core_1.BaseException {
    constructor(name) { super(`Pipe "${name}" is not defined.`); }
}
exports.UnknownPipeException = UnknownPipeException;
class InvalidPipeException extends core_1.BaseException {
    constructor(name) { super(`Pipe "${name}" is invalid.`); }
}
exports.InvalidPipeException = InvalidPipeException;
exports.kPathTemplateComponentRE = /__(.+?)__/g;
exports.kPathTemplatePipeRE = /@([^@]+)/;
function applyContentTemplate(options) {
    return (entry) => {
        const { path, content } = entry;
        if (is_binary_1.isBinary(content)) {
            return entry;
        }
        return {
            path: path,
            content: Buffer.from(core_1.template(content.toString('utf-8'), {})(options)),
        };
    };
}
exports.applyContentTemplate = applyContentTemplate;
function contentTemplate(options) {
    return base_1.forEach(applyContentTemplate(options));
}
exports.contentTemplate = contentTemplate;
function applyPathTemplate(options) {
    return (entry) => {
        let path = entry.path;
        const content = entry.content;
        const original = path;
        // Path template.
        path = core_1.normalize(path.replace(exports.kPathTemplateComponentRE, (_, match) => {
            const [name, ...pipes] = match.split(exports.kPathTemplatePipeRE);
            const value = typeof options[name] == 'function'
                ? options[name].call(options, original)
                : options[name];
            if (value === undefined) {
                throw new OptionIsNotDefinedException(name);
            }
            return pipes.reduce((acc, pipe) => {
                if (!pipe) {
                    return acc;
                }
                if (!(pipe in options)) {
                    throw new UnknownPipeException(pipe);
                }
                if (typeof options[pipe] != 'function') {
                    throw new InvalidPipeException(pipe);
                }
                // Coerce to string.
                return '' + options[pipe](acc);
            }, '' + value);
        }));
        return { path, content };
    };
}
exports.applyPathTemplate = applyPathTemplate;
function pathTemplate(options) {
    return base_1.forEach(applyPathTemplate(options));
}
exports.pathTemplate = pathTemplate;
function template(options) {
    return base_1.chain([
        contentTemplate(options),
        pathTemplate(options),
    ]);
}
exports.template = template;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL3J1bGVzL3RlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztHQU1HO0FBQ0gsK0NBQTBGO0FBRzFGLGlDQUF3QztBQUN4QyxpREFBNkM7QUFHN0MsaUNBQXlDLFNBQVEsb0JBQWE7SUFDNUQsWUFBWSxJQUFZLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN6RTtBQUZELGtFQUVDO0FBR0QsMEJBQWtDLFNBQVEsb0JBQWE7SUFDckQsWUFBWSxJQUFZLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUN2RTtBQUZELG9EQUVDO0FBR0QsMEJBQWtDLFNBQVEsb0JBQWE7SUFDckQsWUFBWSxJQUFZLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbkU7QUFGRCxvREFFQztBQUdZLFFBQUEsd0JBQXdCLEdBQUcsWUFBWSxDQUFDO0FBQ3hDLFFBQUEsbUJBQW1CLEdBQUcsVUFBVSxDQUFDO0FBVTlDLDhCQUFnRSxPQUFVO0lBQ3hFLE9BQU8sQ0FBQyxLQUFnQixFQUFFLEVBQUU7UUFDMUIsTUFBTSxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxvQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzRSxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVpELG9EQVlDO0FBR0QseUJBQTJELE9BQVU7SUFDbkUsT0FBTyxjQUFPLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRkQsMENBRUM7QUFHRCwyQkFBNkQsT0FBVTtJQUNyRSxPQUFPLENBQUMsS0FBZ0IsRUFBRSxFQUFFO1FBQzFCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDdEIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM5QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFdEIsaUJBQWlCO1FBQ2pCLElBQUksR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0NBQXdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbkUsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsMkJBQW1CLENBQUMsQ0FBQztZQUMxRCxNQUFNLEtBQUssR0FBRyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVO2dCQUM5QyxDQUFDLENBQUUsT0FBTyxDQUFDLElBQUksQ0FBMEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztnQkFDakUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVsQixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QztZQUVELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVCxPQUFPLEdBQUcsQ0FBQztpQkFDWjtnQkFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEVBQUU7b0JBQ3RCLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdEM7Z0JBQ0QsSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLEVBQUU7b0JBQ3RDLE1BQU0sSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdEM7Z0JBRUQsb0JBQW9CO2dCQUNwQixPQUFPLEVBQUUsR0FBSSxPQUFPLENBQUMsSUFBSSxDQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNELENBQUMsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVKLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQW5DRCw4Q0FtQ0M7QUFHRCxzQkFBd0QsT0FBVTtJQUNoRSxPQUFPLGNBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFGRCxvQ0FFQztBQUdELGtCQUFvRCxPQUFVO0lBQzVELE9BQU8sWUFBSyxDQUFDO1FBQ1gsZUFBZSxDQUFDLE9BQU8sQ0FBQztRQUN4QixZQUFZLENBQUMsT0FBTyxDQUFDO0tBQ3RCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFMRCw0QkFLQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24sIG5vcm1hbGl6ZSwgdGVtcGxhdGUgYXMgdGVtcGxhdGVJbXBsIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgRmlsZU9wZXJhdG9yLCBSdWxlIH0gZnJvbSAnLi4vZW5naW5lL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBGaWxlRW50cnkgfSBmcm9tICcuLi90cmVlL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBjaGFpbiwgZm9yRWFjaCB9IGZyb20gJy4vYmFzZSc7XG5pbXBvcnQgeyBpc0JpbmFyeSB9IGZyb20gJy4vdXRpbHMvaXMtYmluYXJ5JztcblxuXG5leHBvcnQgY2xhc3MgT3B0aW9uSXNOb3REZWZpbmVkRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykgeyBzdXBlcihgT3B0aW9uIFwiJHtuYW1lfVwiIGlzIG5vdCBkZWZpbmVkLmApOyB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFVua25vd25QaXBlRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykgeyBzdXBlcihgUGlwZSBcIiR7bmFtZX1cIiBpcyBub3QgZGVmaW5lZC5gKTsgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkUGlwZUV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHsgc3VwZXIoYFBpcGUgXCIke25hbWV9XCIgaXMgaW52YWxpZC5gKTsgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBrUGF0aFRlbXBsYXRlQ29tcG9uZW50UkUgPSAvX18oLis/KV9fL2c7XG5leHBvcnQgY29uc3Qga1BhdGhUZW1wbGF0ZVBpcGVSRSA9IC9AKFteQF0rKS87XG5cblxuZXhwb3J0IHR5cGUgVGVtcGxhdGVWYWx1ZSA9IGJvb2xlYW4gfCBzdHJpbmcgfCBudW1iZXIgfCB1bmRlZmluZWQ7XG5leHBvcnQgdHlwZSBUZW1wbGF0ZVBpcGVGdW5jdGlvbiA9ICh4OiBzdHJpbmcpID0+IFRlbXBsYXRlVmFsdWU7XG5leHBvcnQgdHlwZSBUZW1wbGF0ZU9wdGlvbnMgPSB7XG4gIFtrZXk6IHN0cmluZ106IFRlbXBsYXRlVmFsdWUgfCBUZW1wbGF0ZU9wdGlvbnMgfCBUZW1wbGF0ZVBpcGVGdW5jdGlvbixcbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q29udGVudFRlbXBsYXRlPFQgZXh0ZW5kcyBUZW1wbGF0ZU9wdGlvbnM+KG9wdGlvbnM6IFQpOiBGaWxlT3BlcmF0b3Ige1xuICByZXR1cm4gKGVudHJ5OiBGaWxlRW50cnkpID0+IHtcbiAgICBjb25zdCB7cGF0aCwgY29udGVudH0gPSBlbnRyeTtcbiAgICBpZiAoaXNCaW5hcnkoY29udGVudCkpIHtcbiAgICAgIHJldHVybiBlbnRyeTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogcGF0aCxcbiAgICAgIGNvbnRlbnQ6IEJ1ZmZlci5mcm9tKHRlbXBsYXRlSW1wbChjb250ZW50LnRvU3RyaW5nKCd1dGYtOCcpLCB7fSkob3B0aW9ucykpLFxuICAgIH07XG4gIH07XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnRUZW1wbGF0ZTxUIGV4dGVuZHMgVGVtcGxhdGVPcHRpb25zPihvcHRpb25zOiBUKTogUnVsZSB7XG4gIHJldHVybiBmb3JFYWNoKGFwcGx5Q29udGVudFRlbXBsYXRlKG9wdGlvbnMpKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQYXRoVGVtcGxhdGU8VCBleHRlbmRzIFRlbXBsYXRlT3B0aW9ucz4ob3B0aW9uczogVCk6IEZpbGVPcGVyYXRvciB7XG4gIHJldHVybiAoZW50cnk6IEZpbGVFbnRyeSkgPT4ge1xuICAgIGxldCBwYXRoID0gZW50cnkucGF0aDtcbiAgICBjb25zdCBjb250ZW50ID0gZW50cnkuY29udGVudDtcbiAgICBjb25zdCBvcmlnaW5hbCA9IHBhdGg7XG5cbiAgICAvLyBQYXRoIHRlbXBsYXRlLlxuICAgIHBhdGggPSBub3JtYWxpemUocGF0aC5yZXBsYWNlKGtQYXRoVGVtcGxhdGVDb21wb25lbnRSRSwgKF8sIG1hdGNoKSA9PiB7XG4gICAgICBjb25zdCBbbmFtZSwgLi4ucGlwZXNdID0gbWF0Y2guc3BsaXQoa1BhdGhUZW1wbGF0ZVBpcGVSRSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBvcHRpb25zW25hbWVdID09ICdmdW5jdGlvbidcbiAgICAgICAgPyAob3B0aW9uc1tuYW1lXSBhcyBUZW1wbGF0ZVBpcGVGdW5jdGlvbikuY2FsbChvcHRpb25zLCBvcmlnaW5hbClcbiAgICAgICAgOiBvcHRpb25zW25hbWVdO1xuXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgT3B0aW9uSXNOb3REZWZpbmVkRXhjZXB0aW9uKG5hbWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGlwZXMucmVkdWNlKChhY2M6IHN0cmluZywgcGlwZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIGlmICghcGlwZSkge1xuICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEocGlwZSBpbiBvcHRpb25zKSkge1xuICAgICAgICAgIHRocm93IG5ldyBVbmtub3duUGlwZUV4Y2VwdGlvbihwaXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnNbcGlwZV0gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkUGlwZUV4Y2VwdGlvbihwaXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvZXJjZSB0byBzdHJpbmcuXG4gICAgICAgIHJldHVybiAnJyArIChvcHRpb25zW3BpcGVdIGFzIFRlbXBsYXRlUGlwZUZ1bmN0aW9uKShhY2MpO1xuICAgICAgfSwgJycgKyB2YWx1ZSk7XG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIHsgcGF0aCwgY29udGVudCB9O1xuICB9O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoVGVtcGxhdGU8VCBleHRlbmRzIFRlbXBsYXRlT3B0aW9ucz4ob3B0aW9uczogVCk6IFJ1bGUge1xuICByZXR1cm4gZm9yRWFjaChhcHBseVBhdGhUZW1wbGF0ZShvcHRpb25zKSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlPFQgZXh0ZW5kcyBUZW1wbGF0ZU9wdGlvbnM+KG9wdGlvbnM6IFQpOiBSdWxlIHtcbiAgcmV0dXJuIGNoYWluKFtcbiAgICBjb250ZW50VGVtcGxhdGUob3B0aW9ucyksXG4gICAgcGF0aFRlbXBsYXRlKG9wdGlvbnMpLFxuICBdKTtcbn1cbiJdfQ==