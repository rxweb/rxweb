"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const fs_1 = require("fs");
const transform_javascript_1 = require("../helpers/transform-javascript");
const class_fold_1 = require("../transforms/class-fold");
const import_tslib_1 = require("../transforms/import-tslib");
const prefix_classes_1 = require("../transforms/prefix-classes");
const prefix_functions_1 = require("../transforms/prefix-functions");
const scrub_file_1 = require("../transforms/scrub-file");
const wrap_enums_1 = require("../transforms/wrap-enums");
// Angular packages are known to have no side effects.
const whitelistedAngularModules = [
    /[\\/]node_modules[\\/]@angular[\\/]animations[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]common[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]compiler[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]core[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]forms[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]http[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]platform-browser-dynamic[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]platform-browser[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]platform-webworker-dynamic[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]platform-webworker[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]router[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]upgrade[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]material[\\/]/,
    /[\\/]node_modules[\\/]@angular[\\/]cdk[\\/]/,
];
// Factories created by AOT are known to have no side effects.
// In Angular 2/4 the file path for factories can be `.ts`, but in Angular 5 it is `.js`.
const ngFactories = [
    /\.ngfactory\.[jt]s/,
    /\.ngstyle\.[jt]s/,
];
function isKnownSideEffectFree(filePath) {
    return ngFactories.some((re) => re.test(filePath)) ||
        whitelistedAngularModules.some((re) => re.test(filePath));
}
function buildOptimizer(options) {
    const { inputFilePath } = options;
    let { originalFilePath, content } = options;
    if (!originalFilePath && inputFilePath) {
        originalFilePath = inputFilePath;
    }
    if (!inputFilePath && content === undefined) {
        throw new Error('Either filePath or content must be specified in options.');
    }
    if (content === undefined) {
        content = fs_1.readFileSync(inputFilePath, 'UTF-8');
    }
    if (!content) {
        return {
            content: null,
            sourceMap: null,
            emitSkipped: true,
        };
    }
    const isWebpackBundle = content.indexOf('__webpack_require__') !== -1;
    // Determine which transforms to apply.
    const getTransforms = [];
    let typeCheck = false;
    if (options.isSideEffectFree || originalFilePath && isKnownSideEffectFree(originalFilePath)) {
        getTransforms.push(
        // getPrefixFunctionsTransformer is rather dangerous, apply only to known pure es5 modules.
        // It will mark both `require()` calls and `console.log(stuff)` as pure.
        // We only apply it to whitelisted modules, since we know they are safe.
        // getPrefixFunctionsTransformer needs to be before getFoldFileTransformer.
        prefix_functions_1.getPrefixFunctionsTransformer, scrub_file_1.getScrubFileTransformer, class_fold_1.getFoldFileTransformer);
        typeCheck = true;
    }
    else if (scrub_file_1.testScrubFile(content)) {
        // Always test as these require the type checker
        getTransforms.push(scrub_file_1.getScrubFileTransformer, class_fold_1.getFoldFileTransformer);
        typeCheck = true;
    }
    // tests are not needed for fast path
    // usage will be expanded once transformers are verified safe
    const ignoreTest = !options.emitSourceMap && !typeCheck;
    if (prefix_classes_1.testPrefixClasses(content)) {
        getTransforms.unshift(prefix_classes_1.getPrefixClassesTransformer);
    }
    // This transform introduces import/require() calls, but this won't work properly on libraries
    // built with Webpack. These libraries use __webpack_require__() calls instead, which will break
    // with a new import that wasn't part of it's original module list.
    // We ignore this transform for such libraries.
    if (!isWebpackBundle && (ignoreTest || import_tslib_1.testImportTslib(content))) {
        getTransforms.unshift(import_tslib_1.getImportTslibTransformer);
    }
    getTransforms.unshift(wrap_enums_1.getWrapEnumsTransformer);
    const transformJavascriptOpts = {
        content: content,
        inputFilePath: options.inputFilePath,
        outputFilePath: options.outputFilePath,
        emitSourceMap: options.emitSourceMap,
        strict: options.strict,
        getTransforms,
        typeCheck,
    };
    return transform_javascript_1.transformJavascript(transformJavascriptOpts);
}
exports.buildOptimizer = buildOptimizer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtb3B0aW1pemVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9idWlsZF9vcHRpbWl6ZXIvc3JjL2J1aWxkLW9wdGltaXplci9idWlsZC1vcHRpbWl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0dBTUc7QUFDSCwyQkFBa0M7QUFDbEMsMEVBSXlDO0FBQ3pDLHlEQUFrRTtBQUNsRSw2REFBd0Y7QUFDeEYsaUVBQThGO0FBQzlGLHFFQUErRTtBQUMvRSx5REFBa0Y7QUFDbEYseURBQW1FO0FBR25FLHNEQUFzRDtBQUN0RCxNQUFNLHlCQUF5QixHQUFHO0lBQ2hDLG9EQUFvRDtJQUNwRCxnREFBZ0Q7SUFDaEQsa0RBQWtEO0lBQ2xELDhDQUE4QztJQUM5QywrQ0FBK0M7SUFDL0MsOENBQThDO0lBQzlDLGtFQUFrRTtJQUNsRSwwREFBMEQ7SUFDMUQsb0VBQW9FO0lBQ3BFLDREQUE0RDtJQUM1RCxnREFBZ0Q7SUFDaEQsaURBQWlEO0lBQ2pELGtEQUFrRDtJQUNsRCw2Q0FBNkM7Q0FDOUMsQ0FBQztBQUVGLDhEQUE4RDtBQUM5RCx5RkFBeUY7QUFDekYsTUFBTSxXQUFXLEdBQUc7SUFDbEIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtDQUNuQixDQUFDO0FBRUYsK0JBQStCLFFBQWdCO0lBQzdDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELHlCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFZRCx3QkFBK0IsT0FBOEI7SUFFM0QsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNsQyxJQUFJLEVBQUUs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bnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHtcbiAgVHJhbnNmb3JtSmF2YXNjcmlwdE9wdGlvbnMsXG4gIFRyYW5zZm9ybUphdmFzY3JpcHRPdXRwdXQsXG4gIHRyYW5zZm9ybUphdmFzY3JpcHQsXG59IGZyb20gJy4uL2hlbHBlcnMvdHJhbnNmb3JtLWphdmFzY3JpcHQnO1xuaW1wb3J0IHsgZ2V0Rm9sZEZpbGVUcmFuc2Zvcm1lciB9IGZyb20gJy4uL3RyYW5zZm9ybXMvY2xhc3MtZm9sZCc7XG5pbXBvcnQgeyBnZXRJbXBvcnRUc2xpYlRyYW5zZm9ybWVyLCB0ZXN0SW1wb3J0VHNsaWIgfSBmcm9tICcuLi90cmFuc2Zvcm1zL2ltcG9ydC10c2xpYic7XG5pbXBvcnQgeyBnZXRQcmVmaXhDbGFzc2VzVHJhbnNmb3JtZXIsIHRlc3RQcmVmaXhDbGFzc2VzIH0gZnJvbSAnLi4vdHJhbnNmb3Jtcy9wcmVmaXgtY2xhc3Nlcyc7XG5pbXBvcnQgeyBnZXRQcmVmaXhGdW5jdGlvbnNUcmFuc2Zvcm1lciB9IGZyb20gJy4uL3RyYW5zZm9ybXMvcHJlZml4LWZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBnZXRTY3J1YkZpbGVUcmFuc2Zvcm1lciwgdGVzdFNjcnViRmlsZSB9IGZyb20gJy4uL3RyYW5zZm9ybXMvc2NydWItZmlsZSc7XG5pbXBvcnQgeyBnZXRXcmFwRW51bXNUcmFuc2Zvcm1lciB9IGZyb20gJy4uL3RyYW5zZm9ybXMvd3JhcC1lbnVtcyc7XG5cblxuLy8gQW5ndWxhciBwYWNrYWdlcyBhcmUga25vd24gdG8gaGF2ZSBubyBzaWRlIGVmZmVjdHMuXG5jb25zdCB3aGl0ZWxpc3RlZEFuZ3VsYXJNb2R1bGVzID0gW1xuICAvW1xcXFwvXW5vZGVfbW9kdWxlc1tcXFxcL11AYW5ndWxhcltcXFxcL11hbmltYXRpb25zW1xcXFwvXS8sXG4gIC9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXUBhbmd1bGFyW1xcXFwvXWNvbW1vbltcXFxcL10vLFxuICAvW1xcXFwvXW5vZGVfbW9kdWxlc1tcXFxcL11AYW5ndWxhcltcXFxcL11jb21waWxlcltcXFxcL10vLFxuICAvW1xcXFwvXW5vZGVfbW9kdWxlc1tcXFxcL11AYW5ndWxhcltcXFxcL11jb3JlW1xcXFwvXS8sXG4gIC9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXUBhbmd1bGFyW1xcXFwvXWZvcm1zW1xcXFwvXS8sXG4gIC9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXUBhbmd1bGFyW1xcXFwvXWh0dHBbXFxcXC9dLyxcbiAgL1tcXFxcL11ub2RlX21vZHVsZXNbXFxcXC9dQGFuZ3VsYXJbXFxcXC9dcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljW1xcXFwvXS8sXG4gIC9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXUBhbmd1bGFyW1xcXFwvXXBsYXRmb3JtLWJyb3dzZXJbXFxcXC9dLyxcbiAgL1tcXFxcL11ub2RlX21vZHVsZXNbXFxcXC9dQGFuZ3VsYXJbXFxcXC9dcGxhdGZvcm0td2Vid29ya2VyLWR5bmFtaWNbXFxcXC9dLyxcbiAgL1tcXFxcL11ub2RlX21vZHVsZXNbXFxcXC9dQGFuZ3VsYXJbXFxcXC9dcGxhdGZvcm0td2Vid29ya2VyW1xcXFwvXS8sXG4gIC9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXUBhbmd1bGFyW1xcXFwvXXJvdXRlcltcXFxcL10vLFxuICAvW1xcXFwvXW5vZGVfbW9kdWxlc1tcXFxcL11AYW5ndWxhcltcXFxcL111cGdyYWRlW1xcXFwvXS8sXG4gIC9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXUBhbmd1bGFyW1xcXFwvXW1hdGVyaWFsW1xcXFwvXS8sXG4gIC9bXFxcXC9dbm9kZV9tb2R1bGVzW1xcXFwvXUBhbmd1bGFyW1xcXFwvXWNka1tcXFxcL10vLFxuXTtcblxuLy8gRmFjdG9yaWVzIGNyZWF0ZWQgYnkgQU9UIGFyZSBrbm93biB0byBoYXZlIG5vIHNpZGUgZWZmZWN0cy5cbi8vIEluIEFuZ3VsYXIgMi80IHRoZSBmaWxlIHBhdGggZm9yIGZhY3RvcmllcyBjYW4gYmUgYC50c2AsIGJ1dCBpbiBBbmd1bGFyIDUgaXQgaXMgYC5qc2AuXG5jb25zdCBuZ0ZhY3RvcmllcyA9IFtcbiAgL1xcLm5nZmFjdG9yeVxcLltqdF1zLyxcbiAgL1xcLm5nc3R5bGVcXC5banRdcy8sXG5dO1xuXG5mdW5jdGlvbiBpc0tub3duU2lkZUVmZmVjdEZyZWUoZmlsZVBhdGg6IHN0cmluZykge1xuICByZXR1cm4gbmdGYWN0b3JpZXMuc29tZSgocmUpID0+IHJlLnRlc3QoZmlsZVBhdGgpKSB8fFxuICAgIHdoaXRlbGlzdGVkQW5ndWxhck1vZHVsZXMuc29tZSgocmUpID0+IHJlLnRlc3QoZmlsZVBhdGgpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCdWlsZE9wdGltaXplck9wdGlvbnMge1xuICBjb250ZW50Pzogc3RyaW5nO1xuICBvcmlnaW5hbEZpbGVQYXRoPzogc3RyaW5nO1xuICBpbnB1dEZpbGVQYXRoPzogc3RyaW5nO1xuICBvdXRwdXRGaWxlUGF0aD86IHN0cmluZztcbiAgZW1pdFNvdXJjZU1hcD86IGJvb2xlYW47XG4gIHN0cmljdD86IGJvb2xlYW47XG4gIGlzU2lkZUVmZmVjdEZyZWU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRPcHRpbWl6ZXIob3B0aW9uczogQnVpbGRPcHRpbWl6ZXJPcHRpb25zKTogVHJhbnNmb3JtSmF2YXNjcmlwdE91dHB1dCB7XG5cbiAgY29uc3QgeyBpbnB1dEZpbGVQYXRoIH0gPSBvcHRpb25zO1xuICBsZXQgeyBvcmlnaW5hbEZpbGVQYXRoLCBjb250ZW50IH0gPSBvcHRpb25zO1xuXG4gIGlmICghb3JpZ2luYWxGaWxlUGF0aCAmJiBpbnB1dEZpbGVQYXRoKSB7XG4gICAgb3JpZ2luYWxGaWxlUGF0aCA9IGlucHV0RmlsZVBhdGg7XG4gIH1cblxuICBpZiAoIWlucHV0RmlsZVBhdGggJiYgY29udGVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFaXRoZXIgZmlsZVBhdGggb3IgY29udGVudCBtdXN0IGJlIHNwZWNpZmllZCBpbiBvcHRpb25zLicpO1xuICB9XG5cbiAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnRlbnQgPSByZWFkRmlsZVN5bmMoaW5wdXRGaWxlUGF0aCBhcyBzdHJpbmcsICdVVEYtOCcpO1xuICB9XG5cbiAgaWYgKCFjb250ZW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRlbnQ6IG51bGwsXG4gICAgICBzb3VyY2VNYXA6IG51bGwsXG4gICAgICBlbWl0U2tpcHBlZDogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgaXNXZWJwYWNrQnVuZGxlID0gY29udGVudC5pbmRleE9mKCdfX3dlYnBhY2tfcmVxdWlyZV9fJykgIT09IC0xO1xuXG4gIC8vIERldGVybWluZSB3aGljaCB0cmFuc2Zvcm1zIHRvIGFwcGx5LlxuICBjb25zdCBnZXRUcmFuc2Zvcm1zID0gW107XG5cbiAgbGV0IHR5cGVDaGVjayA9IGZhbHNlO1xuICBpZiAob3B0aW9ucy5pc1NpZGVFZmZlY3RGcmVlIHx8IG9yaWdpbmFsRmlsZVBhdGggJiYgaXNLbm93blNpZGVFZmZlY3RGcmVlKG9yaWdpbmFsRmlsZVBhdGgpKSB7XG4gICAgZ2V0VHJhbnNmb3Jtcy5wdXNoKFxuICAgICAgLy8gZ2V0UHJlZml4RnVuY3Rpb25zVHJhbnNmb3JtZXIgaXMgcmF0aGVyIGRhbmdlcm91cywgYXBwbHkgb25seSB0byBrbm93biBwdXJlIGVzNSBtb2R1bGVzLlxuICAgICAgLy8gSXQgd2lsbCBtYXJrIGJvdGggYHJlcXVpcmUoKWAgY2FsbHMgYW5kIGBjb25zb2xlLmxvZyhzdHVmZilgIGFzIHB1cmUuXG4gICAgICAvLyBXZSBvbmx5IGFwcGx5IGl0IHRvIHdoaXRlbGlzdGVkIG1vZHVsZXMsIHNpbmNlIHdlIGtub3cgdGhleSBhcmUgc2FmZS5cbiAgICAgIC8vIGdldFByZWZpeEZ1bmN0aW9uc1RyYW5zZm9ybWVyIG5lZWRzIHRvIGJlIGJlZm9yZSBnZXRGb2xkRmlsZVRyYW5zZm9ybWVyLlxuICAgICAgZ2V0UHJlZml4RnVuY3Rpb25zVHJhbnNmb3JtZXIsXG4gICAgICBnZXRTY3J1YkZpbGVUcmFuc2Zvcm1lcixcbiAgICAgIGdldEZvbGRGaWxlVHJhbnNmb3JtZXIsXG4gICAgKTtcbiAgICB0eXBlQ2hlY2sgPSB0cnVlO1xuICB9IGVsc2UgaWYgKHRlc3RTY3J1YkZpbGUoY29udGVudCkpIHtcbiAgICAvLyBBbHdheXMgdGVzdCBhcyB0aGVzZSByZXF1aXJlIHRoZSB0eXBlIGNoZWNrZXJcbiAgICBnZXRUcmFuc2Zvcm1zLnB1c2goXG4gICAgICBnZXRTY3J1YkZpbGVUcmFuc2Zvcm1lcixcbiAgICAgIGdldEZvbGRGaWxlVHJhbnNmb3JtZXIsXG4gICAgKTtcbiAgICB0eXBlQ2hlY2sgPSB0cnVlO1xuICB9XG5cbiAgLy8gdGVzdHMgYXJlIG5vdCBuZWVkZWQgZm9yIGZhc3QgcGF0aFxuICAvLyB1c2FnZSB3aWxsIGJlIGV4cGFuZGVkIG9uY2UgdHJhbnNmb3JtZXJzIGFyZSB2ZXJpZmllZCBzYWZlXG4gIGNvbnN0IGlnbm9yZVRlc3QgPSAhb3B0aW9ucy5lbWl0U291cmNlTWFwICYmICF0eXBlQ2hlY2s7XG5cbiAgaWYgKHRlc3RQcmVmaXhDbGFzc2VzKGNvbnRlbnQpKSB7XG4gICAgZ2V0VHJhbnNmb3Jtcy51bnNoaWZ0KGdldFByZWZpeENsYXNzZXNUcmFuc2Zvcm1lcik7XG4gIH1cblxuICAvLyBUaGlzIHRyYW5zZm9ybSBpbnRyb2R1Y2VzIGltcG9ydC9yZXF1aXJlKCkgY2FsbHMsIGJ1dCB0aGlzIHdvbid0IHdvcmsgcHJvcGVybHkgb24gbGlicmFyaWVzXG4gIC8vIGJ1aWx0IHdpdGggV2VicGFjay4gVGhlc2UgbGlicmFyaWVzIHVzZSBfX3dlYnBhY2tfcmVxdWlyZV9fKCkgY2FsbHMgaW5zdGVhZCwgd2hpY2ggd2lsbCBicmVha1xuICAvLyB3aXRoIGEgbmV3IGltcG9ydCB0aGF0IHdhc24ndCBwYXJ0IG9mIGl0J3Mgb3JpZ2luYWwgbW9kdWxlIGxpc3QuXG4gIC8vIFdlIGlnbm9yZSB0aGlzIHRyYW5zZm9ybSBmb3Igc3VjaCBsaWJyYXJpZXMuXG4gIGlmICghaXNXZWJwYWNrQnVuZGxlICYmIChpZ25vcmVUZXN0IHx8IHRlc3RJbXBvcnRUc2xpYihjb250ZW50KSkpIHtcbiAgICBnZXRUcmFuc2Zvcm1zLnVuc2hpZnQoZ2V0SW1wb3J0VHNsaWJUcmFuc2Zvcm1lcik7XG4gIH1cblxuICBnZXRUcmFuc2Zvcm1zLnVuc2hpZnQoZ2V0V3JhcEVudW1zVHJhbnNmb3JtZXIpO1xuXG4gIGNvbnN0IHRyYW5zZm9ybUphdmFzY3JpcHRPcHRzOiBUcmFuc2Zvcm1KYXZhc2NyaXB0T3B0aW9ucyA9IHtcbiAgICBjb250ZW50OiBjb250ZW50LFxuICAgIGlucHV0RmlsZVBhdGg6IG9wdGlvbnMuaW5wdXRGaWxlUGF0aCxcbiAgICBvdXRwdXRGaWxlUGF0aDogb3B0aW9ucy5vdXRwdXRGaWxlUGF0aCxcbiAgICBlbWl0U291cmNlTWFwOiBvcHRpb25zLmVtaXRTb3VyY2VNYXAsXG4gICAgc3RyaWN0OiBvcHRpb25zLnN0cmljdCxcbiAgICBnZXRUcmFuc2Zvcm1zLFxuICAgIHR5cGVDaGVjayxcbiAgfTtcblxuICByZXR1cm4gdHJhbnNmb3JtSmF2YXNjcmlwdCh0cmFuc2Zvcm1KYXZhc2NyaXB0T3B0cyk7XG59XG4iXX0=