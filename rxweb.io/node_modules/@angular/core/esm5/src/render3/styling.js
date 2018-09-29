/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RendererStyleFlags3, isProceduralRenderer } from './interfaces/renderer';
/**
 * Used clone a copy of a pre-computed template of a styling context.
 *
 * A pre-computed template is designed to be computed once for a given element
 * (instructions.ts has logic for caching this).
 */
export function allocStylingContext(lElement, templateStyleContext) {
    // each instance gets a copy
    var context = templateStyleContext.slice();
    context[0 /* ElementPosition */] = lElement;
    return context;
}
/**
 * Creates a styling context template where styling information is stored.
 * Any styles that are later referenced using `updateStyleProp` must be
 * passed in within this function. Initial values for those styles are to
 * be declared after all initial style properties are declared (this change in
 * mode between declarations and initial styles is made possible using a special
 * enum value found in `definition.ts`).
 *
 * @param initialStyleDeclarations a list of style declarations and initial style values
 *    that are used later within the styling context.
 *
 *    -> ['width', 'height', SPECIAL_ENUM_VAL, 'width', '100px']
 *       This implies that `width` and `height` will be later styled and that the `width`
 *       property has an initial value of `100px`.
 *
 * @param initialClassDeclarations a list of class declarations and initial class values
 *    that are used later within the styling context.
 *
 *    -> ['foo', 'bar', SPECIAL_ENUM_VAL, 'foo', true]
 *       This implies that `foo` and `bar` will be later styled and that the `foo`
 *       class will be applied to the element as an initial class since it's true
 */
export function createStylingContextTemplate(initialClassDeclarations, initialStyleDeclarations, styleSanitizer) {
    var initialStylingValues = [null];
    var context = [null, styleSanitizer || null, initialStylingValues, 0, 0, null];
    // we use two maps since a class name might collide with a CSS style prop
    var stylesLookup = {};
    var classesLookup = {};
    var totalStyleDeclarations = 0;
    if (initialStyleDeclarations) {
        var hasPassedDeclarations = false;
        for (var i = 0; i < initialStyleDeclarations.length; i++) {
            var v = initialStyleDeclarations[i];
            // this flag value marks where the declarations end the initial values begin
            if (v === 1 /* VALUES_MODE */) {
                hasPassedDeclarations = true;
            }
            else {
                var prop = v;
                if (hasPassedDeclarations) {
                    var value = initialStyleDeclarations[++i];
                    initialStylingValues.push(value);
                    stylesLookup[prop] = initialStylingValues.length - 1;
                }
                else {
                    totalStyleDeclarations++;
                    stylesLookup[prop] = 0;
                }
            }
        }
    }
    // make where the class offsets begin
    context[4 /* ClassOffsetPosition */] = totalStyleDeclarations;
    if (initialClassDeclarations) {
        var hasPassedDeclarations = false;
        for (var i = 0; i < initialClassDeclarations.length; i++) {
            var v = initialClassDeclarations[i];
            // this flag value marks where the declarations end the initial values begin
            if (v === 1 /* VALUES_MODE */) {
                hasPassedDeclarations = true;
            }
            else {
                var className = v;
                if (hasPassedDeclarations) {
                    var value = initialClassDeclarations[++i];
                    initialStylingValues.push(value);
                    classesLookup[className] = initialStylingValues.length - 1;
                }
                else {
                    classesLookup[className] = 0;
                }
            }
        }
    }
    var styleProps = Object.keys(stylesLookup);
    var classNames = Object.keys(classesLookup);
    var classNamesIndexStart = styleProps.length;
    var totalProps = styleProps.length + classNames.length;
    // *2 because we are filling for both single and multi style spaces
    var maxLength = totalProps * 3 /* Size */ * 2 + 6 /* SingleStylesStartPosition */;
    // we need to fill the array from the start so that we can access
    // both the multi and the single array positions in the same loop block
    for (var i = 6 /* SingleStylesStartPosition */; i < maxLength; i++) {
        context.push(null);
    }
    var singleStart = 6 /* SingleStylesStartPosition */;
    var multiStart = totalProps * 3 /* Size */ + 6 /* SingleStylesStartPosition */;
    // fill single and multi-level styles
    for (var i = 0; i < totalProps; i++) {
        var isClassBased_1 = i >= classNamesIndexStart;
        var prop = isClassBased_1 ? classNames[i - classNamesIndexStart] : styleProps[i];
        var indexForInitial = isClassBased_1 ? classesLookup[prop] : stylesLookup[prop];
        var initialValue = initialStylingValues[indexForInitial];
        var indexForMulti = i * 3 /* Size */ + multiStart;
        var indexForSingle = i * 3 /* Size */ + singleStart;
        var initialFlag = prepareInitialFlag(prop, isClassBased_1, styleSanitizer || null);
        setFlag(context, indexForSingle, pointers(initialFlag, indexForInitial, indexForMulti));
        setProp(context, indexForSingle, prop);
        setValue(context, indexForSingle, null);
        var flagForMulti = initialFlag | (initialValue !== null ? 1 /* Dirty */ : 0 /* None */);
        setFlag(context, indexForMulti, pointers(flagForMulti, indexForInitial, indexForSingle));
        setProp(context, indexForMulti, prop);
        setValue(context, indexForMulti, null);
    }
    // there is no initial value flag for the master index since it doesn't
    // reference an initial style value
    setFlag(context, 3 /* MasterFlagPosition */, pointers(0, 0, multiStart));
    setContextDirty(context, initialStylingValues.length > 1);
    return context;
}
var EMPTY_ARR = [];
var EMPTY_OBJ = {};
/**
 * Sets and resolves all `multi` styling on an `StylingContext` so that they can be
 * applied to the element once `renderStyling` is called.
 *
 * All missing styles/class (any values that are not provided in the new `styles`
 * or `classes` params) will resolve to `null` within their respective positions
 * in the context.
 *
 * @param context The styling context that will be updated with the
 *    newly provided style values.
 * @param classes The key/value map of CSS class names that will be used for the update.
 * @param styles The key/value map of CSS styles that will be used for the update.
 */
export function updateStylingMap(context, classes, styles) {
    var classNames = EMPTY_ARR;
    var applyAllClasses = false;
    var ignoreAllClassUpdates = false;
    // each time a string-based value pops up then it shouldn't require a deep
    // check of what's changed.
    if (typeof classes == 'string') {
        var cachedClassString = context[5 /* CachedCssClassString */];
        if (cachedClassString && cachedClassString === classes) {
            ignoreAllClassUpdates = true;
        }
        else {
            context[5 /* CachedCssClassString */] = classes;
            classNames = classes.split(/\s+/);
            // this boolean is used to avoid having to create a key/value map of `true` values
            // since a classname string implies that all those classes are added
            applyAllClasses = true;
        }
    }
    else {
        classNames = classes ? Object.keys(classes) : EMPTY_ARR;
        context[5 /* CachedCssClassString */] = null;
    }
    classes = (classes || EMPTY_OBJ);
    var styleProps = styles ? Object.keys(styles) : EMPTY_ARR;
    styles = styles || EMPTY_OBJ;
    var classesStartIndex = styleProps.length;
    var multiStartIndex = getMultiStartIndex(context);
    var dirty = false;
    var ctxIndex = multiStartIndex;
    var propIndex = 0;
    var propLimit = styleProps.length + classNames.length;
    // the main loop here will try and figure out how the shape of the provided
    // styles differ with respect to the context. Later if the context/styles/classes
    // are off-balance then they will be dealt in another loop after this one
    while (ctxIndex < context.length && propIndex < propLimit) {
        var isClassBased_2 = propIndex >= classesStartIndex;
        // when there is a cache-hit for a string-based class then we should
        // avoid doing any work diffing any of the changes
        if (!ignoreAllClassUpdates || !isClassBased_2) {
            var adjustedPropIndex = isClassBased_2 ? propIndex - classesStartIndex : propIndex;
            var newProp = isClassBased_2 ? classNames[adjustedPropIndex] : styleProps[adjustedPropIndex];
            var newValue = isClassBased_2 ? (applyAllClasses ? true : classes[newProp]) : styles[newProp];
            var prop = getProp(context, ctxIndex);
            if (prop === newProp) {
                var value = getValue(context, ctxIndex);
                var flag = getPointers(context, ctxIndex);
                if (hasValueChanged(flag, value, newValue)) {
                    setValue(context, ctxIndex, newValue);
                    var initialValue = getInitialValue(context, flag);
                    // there is no point in setting this to dirty if the previously
                    // rendered value was being referenced by the initial style (or null)
                    if (initialValue !== newValue) {
                        setDirty(context, ctxIndex, true);
                        dirty = true;
                    }
                }
            }
            else {
                var indexOfEntry = findEntryPositionByProp(context, newProp, ctxIndex);
                if (indexOfEntry > 0) {
                    // it was found at a later point ... just swap the values
                    var valueToCompare = getValue(context, indexOfEntry);
                    var flagToCompare = getPointers(context, indexOfEntry);
                    swapMultiContextEntries(context, ctxIndex, indexOfEntry);
                    if (valueToCompare !== newValue) {
                        var initialValue = getInitialValue(context, flagToCompare);
                        setValue(context, ctxIndex, newValue);
                        if (initialValue !== newValue) {
                            setDirty(context, ctxIndex, true);
                            dirty = true;
                        }
                    }
                }
                else {
                    // we only care to do this if the insertion is in the middle
                    var newFlag = prepareInitialFlag(newProp, isClassBased_2, getStyleSanitizer(context));
                    insertNewMultiProperty(context, ctxIndex, isClassBased_2, newProp, newFlag, newValue);
                    dirty = true;
                }
            }
        }
        ctxIndex += 3 /* Size */;
        propIndex++;
    }
    // this means that there are left-over values in the context that
    // were not included in the provided styles/classes and in this
    // case the  goal is to "remove" them from the context (by nullifying)
    while (ctxIndex < context.length) {
        var flag = getPointers(context, ctxIndex);
        var isClassBased_3 = (flag & 2 /* Class */) === 2 /* Class */;
        if (ignoreAllClassUpdates && isClassBased_3)
            break;
        var value = getValue(context, ctxIndex);
        var doRemoveValue = valueExists(value, isClassBased_3);
        if (doRemoveValue) {
            setDirty(context, ctxIndex, true);
            setValue(context, ctxIndex, null);
            dirty = true;
        }
        ctxIndex += 3 /* Size */;
    }
    // this means that there are left-over properties in the context that
    // were not detected in the context during the loop above. In that
    // case we want to add the new entries into the list
    var sanitizer = getStyleSanitizer(context);
    while (propIndex < propLimit) {
        var isClassBased_4 = propIndex >= classesStartIndex;
        if (ignoreAllClassUpdates && isClassBased_4)
            break;
        var adjustedPropIndex = isClassBased_4 ? propIndex - classesStartIndex : propIndex;
        var prop = isClassBased_4 ? classNames[adjustedPropIndex] : styleProps[adjustedPropIndex];
        var value = isClassBased_4 ? (applyAllClasses ? true : classes[prop]) : styles[prop];
        var flag = prepareInitialFlag(prop, isClassBased_4, sanitizer) | 1 /* Dirty */;
        context.push(flag, prop, value);
        propIndex++;
        dirty = true;
    }
    if (dirty) {
        setContextDirty(context, true);
    }
}
/**
 * Sets and resolves a single styling property/value on the provided `StylingContext` so
 * that they can be applied to the element once `renderStyling` is called.
 *
 * Note that prop-level styling values are considered higher priority than any styling that
 * has been applied using `updateStylingMap`, therefore, when styling values are rendered
 * then any styles/classes that have been applied using this function will be considered first
 * (then multi values second and then initial values as a backup).
 *
 * @param context The styling context that will be updated with the
 *    newly provided style value.
 * @param index The index of the property which is being updated.
 * @param value The CSS style value that will be assigned
 */
export function updateStyleProp(context, index, value) {
    var singleIndex = 6 /* SingleStylesStartPosition */ + index * 3 /* Size */;
    var currValue = getValue(context, singleIndex);
    var currFlag = getPointers(context, singleIndex);
    // didn't change ... nothing to make a note of
    if (hasValueChanged(currFlag, currValue, value)) {
        // the value will always get updated (even if the dirty flag is skipped)
        setValue(context, singleIndex, value);
        var indexForMulti = getMultiOrSingleIndex(currFlag);
        // if the value is the same in the multi-area then there's no point in re-assembling
        var valueForMulti = getValue(context, indexForMulti);
        if (!valueForMulti || valueForMulti !== value) {
            var multiDirty = false;
            var singleDirty = true;
            var isClassBased_5 = (currFlag & 2 /* Class */) === 2 /* Class */;
            // only when the value is set to `null` should the multi-value get flagged
            if (!valueExists(value, isClassBased_5) && valueExists(valueForMulti, isClassBased_5)) {
                multiDirty = true;
                singleDirty = false;
            }
            setDirty(context, indexForMulti, multiDirty);
            setDirty(context, singleIndex, singleDirty);
            setContextDirty(context, true);
        }
    }
}
/**
 * This method will toggle the referenced CSS class (by the provided index)
 * within the given context.
 *
 * @param context The styling context that will be updated with the
 *    newly provided class value.
 * @param index The index of the CSS class which is being updated.
 * @param addOrRemove Whether or not to add or remove the CSS class
 */
export function updateClassProp(context, index, addOrRemove) {
    var adjustedIndex = index + context[4 /* ClassOffsetPosition */];
    updateStyleProp(context, adjustedIndex, addOrRemove);
}
/**
 * Renders all queued styling using a renderer onto the given element.
 *
 * This function works by rendering any styles (that have been applied
 * using `updateStylingMap`) and any classes (that have been applied using
 * `updateStyleProp`) onto the provided element using the provided renderer.
 * Just before the styles/classes are rendered a final key/value style map
 * will be assembled (if `styleStore` or `classStore` are provided).
 *
 * @param lElement the element that the styles will be rendered on
 * @param context The styling context that will be used to determine
 *      what styles will be rendered
 * @param renderer the renderer that will be used to apply the styling
 * @param styleStore if provided, the updated style values will be applied
 *    to this key/value map instead of being renderered via the renderer.
 * @param classStore if provided, the updated class values will be applied
 *    to this key/value map instead of being renderered via the renderer.
 */
export function renderStyling(context, renderer, styleStore, classStore) {
    if (isContextDirty(context)) {
        var native = context[0 /* ElementPosition */].native;
        var multiStartIndex = getMultiStartIndex(context);
        var styleSanitizer = getStyleSanitizer(context);
        for (var i = 6 /* SingleStylesStartPosition */; i < context.length; i += 3 /* Size */) {
            // there is no point in rendering styles that have not changed on screen
            if (isDirty(context, i)) {
                var prop = getProp(context, i);
                var value = getValue(context, i);
                var flag = getPointers(context, i);
                var isClassBased_6 = flag & 2 /* Class */ ? true : false;
                var isInSingleRegion = i < multiStartIndex;
                var valueToApply = value;
                // VALUE DEFER CASE 1: Use a multi value instead of a null single value
                // this check implies that a single value was removed and we
                // should now defer to a multi value and use that (if set).
                if (isInSingleRegion && !valueExists(valueToApply, isClassBased_6)) {
                    // single values ALWAYS have a reference to a multi index
                    var multiIndex = getMultiOrSingleIndex(flag);
                    valueToApply = getValue(context, multiIndex);
                }
                // VALUE DEFER CASE 2: Use the initial value if all else fails (is falsy)
                // the initial value will always be a string or null,
                // therefore we can safely adopt it incase there's nothing else
                // note that this should always be a falsy check since `false` is used
                // for both class and style comparisons (styles can't be false and false
                // classes are turned off and should therefore defer to their initial values)
                if (!valueExists(valueToApply, isClassBased_6)) {
                    valueToApply = getInitialValue(context, flag);
                }
                if (isClassBased_6) {
                    setClass(native, prop, valueToApply ? true : false, renderer, classStore);
                }
                else {
                    var sanitizer = (flag & 4 /* Sanitize */) ? styleSanitizer : null;
                    setStyle(native, prop, valueToApply, renderer, sanitizer, styleStore);
                }
                setDirty(context, i, false);
            }
        }
        setContextDirty(context, false);
    }
}
/**
 * This function renders a given CSS prop/value entry using the
 * provided renderer. If a `store` value is provided then
 * that will be used a render context instead of the provided
 * renderer.
 *
 * @param native the DOM Element
 * @param prop the CSS style property that will be rendered
 * @param value the CSS style value that will be rendered
 * @param renderer
 * @param store an optional key/value map that will be used as a context to render styles on
 */
function setStyle(native, prop, value, renderer, sanitizer, store) {
    value = sanitizer && value ? sanitizer(prop, value) : value;
    if (store) {
        store[prop] = value;
    }
    else if (value) {
        ngDevMode && ngDevMode.rendererSetStyle++;
        isProceduralRenderer(renderer) ?
            renderer.setStyle(native, prop, value, RendererStyleFlags3.DashCase) :
            native['style'].setProperty(prop, value);
    }
    else {
        ngDevMode && ngDevMode.rendererRemoveStyle++;
        isProceduralRenderer(renderer) ?
            renderer.removeStyle(native, prop, RendererStyleFlags3.DashCase) :
            native['style'].removeProperty(prop);
    }
}
/**
 * This function renders a given CSS class value using the provided
 * renderer (by adding or removing it from the provided element).
 * If a `store` value is provided then that will be used a render
 * context instead of the provided renderer.
 *
 * @param native the DOM Element
 * @param prop the CSS style property that will be rendered
 * @param value the CSS style value that will be rendered
 * @param renderer
 * @param store an optional key/value map that will be used as a context to render styles on
 */
function setClass(native, className, add, renderer, store) {
    if (store) {
        store[className] = add;
    }
    else if (add) {
        ngDevMode && ngDevMode.rendererAddClass++;
        isProceduralRenderer(renderer) ? renderer.addClass(native, className) :
            native['classList'].add(className);
    }
    else {
        ngDevMode && ngDevMode.rendererRemoveClass++;
        isProceduralRenderer(renderer) ? renderer.removeClass(native, className) :
            native['classList'].remove(className);
    }
}
function setDirty(context, index, isDirtyYes) {
    var adjustedIndex = index >= 6 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    if (isDirtyYes) {
        context[adjustedIndex] |= 1 /* Dirty */;
    }
    else {
        context[adjustedIndex] &= ~1 /* Dirty */;
    }
}
function isDirty(context, index) {
    var adjustedIndex = index >= 6 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    return (context[adjustedIndex] & 1 /* Dirty */) == 1 /* Dirty */;
}
function isClassBased(context, index) {
    var adjustedIndex = index >= 6 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    return (context[adjustedIndex] & 2 /* Class */) == 2 /* Class */;
}
function isSanitizable(context, index) {
    var adjustedIndex = index >= 6 /* SingleStylesStartPosition */ ? (index + 0 /* FlagsOffset */) : index;
    return (context[adjustedIndex] & 4 /* Sanitize */) == 4 /* Sanitize */;
}
function pointers(configFlag, staticIndex, dynamicIndex) {
    return (configFlag & 7 /* BitMask */) | (staticIndex << 3 /* BitCountSize */) |
        (dynamicIndex << (14 /* BitCountSize */ + 3 /* BitCountSize */));
}
function getInitialValue(context, flag) {
    var index = getInitialIndex(flag);
    return context[2 /* InitialStylesPosition */][index];
}
function getInitialIndex(flag) {
    return (flag >> 3 /* BitCountSize */) & 16383 /* BitMask */;
}
function getMultiOrSingleIndex(flag) {
    var index = (flag >> (14 /* BitCountSize */ + 3 /* BitCountSize */)) & 16383 /* BitMask */;
    return index >= 6 /* SingleStylesStartPosition */ ? index : -1;
}
function getMultiStartIndex(context) {
    return getMultiOrSingleIndex(context[3 /* MasterFlagPosition */]);
}
function getStyleSanitizer(context) {
    return context[1 /* StyleSanitizerPosition */];
}
function setProp(context, index, prop) {
    context[index + 1 /* PropertyOffset */] = prop;
}
function setValue(context, index, value) {
    context[index + 2 /* ValueOffset */] = value;
}
function setFlag(context, index, flag) {
    var adjustedIndex = index === 3 /* MasterFlagPosition */ ? index : (index + 0 /* FlagsOffset */);
    context[adjustedIndex] = flag;
}
function getPointers(context, index) {
    var adjustedIndex = index === 3 /* MasterFlagPosition */ ? index : (index + 0 /* FlagsOffset */);
    return context[adjustedIndex];
}
function getValue(context, index) {
    return context[index + 2 /* ValueOffset */];
}
function getProp(context, index) {
    return context[index + 1 /* PropertyOffset */];
}
export function isContextDirty(context) {
    return isDirty(context, 3 /* MasterFlagPosition */);
}
export function setContextDirty(context, isDirtyYes) {
    setDirty(context, 3 /* MasterFlagPosition */, isDirtyYes);
}
function findEntryPositionByProp(context, prop, startIndex) {
    for (var i = (startIndex || 0) + 1 /* PropertyOffset */; i < context.length; i += 3 /* Size */) {
        var thisProp = context[i];
        if (thisProp == prop) {
            return i - 1 /* PropertyOffset */;
        }
    }
    return -1;
}
function swapMultiContextEntries(context, indexA, indexB) {
    var tmpValue = getValue(context, indexA);
    var tmpProp = getProp(context, indexA);
    var tmpFlag = getPointers(context, indexA);
    var flagA = tmpFlag;
    var flagB = getPointers(context, indexB);
    var singleIndexA = getMultiOrSingleIndex(flagA);
    if (singleIndexA >= 0) {
        var _flag = getPointers(context, singleIndexA);
        var _initial = getInitialIndex(_flag);
        setFlag(context, singleIndexA, pointers(_flag, _initial, indexB));
    }
    var singleIndexB = getMultiOrSingleIndex(flagB);
    if (singleIndexB >= 0) {
        var _flag = getPointers(context, singleIndexB);
        var _initial = getInitialIndex(_flag);
        setFlag(context, singleIndexB, pointers(_flag, _initial, indexA));
    }
    setValue(context, indexA, getValue(context, indexB));
    setProp(context, indexA, getProp(context, indexB));
    setFlag(context, indexA, getPointers(context, indexB));
    setValue(context, indexB, tmpValue);
    setProp(context, indexB, tmpProp);
    setFlag(context, indexB, tmpFlag);
}
function updateSinglePointerValues(context, indexStartPosition) {
    for (var i = indexStartPosition; i < context.length; i += 3 /* Size */) {
        var multiFlag = getPointers(context, i);
        var singleIndex = getMultiOrSingleIndex(multiFlag);
        if (singleIndex > 0) {
            var singleFlag = getPointers(context, singleIndex);
            var initialIndexForSingle = getInitialIndex(singleFlag);
            var flagValue = (isDirty(context, singleIndex) ? 1 /* Dirty */ : 0 /* None */) |
                (isClassBased(context, singleIndex) ? 2 /* Class */ : 0 /* None */) |
                (isSanitizable(context, singleIndex) ? 4 /* Sanitize */ : 0 /* None */);
            var updatedFlag = pointers(flagValue, initialIndexForSingle, i);
            setFlag(context, singleIndex, updatedFlag);
        }
    }
}
function insertNewMultiProperty(context, index, classBased, name, flag, value) {
    var doShift = index < context.length;
    // prop does not exist in the list, add it in
    context.splice(index, 0, flag | 1 /* Dirty */ | (classBased ? 2 /* Class */ : 0 /* None */), name, value);
    if (doShift) {
        // because the value was inserted midway into the array then we
        // need to update all the shifted multi values' single value
        // pointers to point to the newly shifted location
        updateSinglePointerValues(context, index + 3 /* Size */);
    }
}
function valueExists(value, isClassBased) {
    if (isClassBased) {
        return value ? true : false;
    }
    return value !== null;
}
function prepareInitialFlag(name, isClassBased, sanitizer) {
    if (isClassBased) {
        return 2 /* Class */;
    }
    else if (sanitizer && sanitizer(name)) {
        return 4 /* Sanitize */;
    }
    return 0 /* None */;
}
function hasValueChanged(flag, a, b) {
    var isClassBased = flag & 2 /* Class */;
    var hasValues = a && b;
    var usesSanitizer = flag & 4 /* Sanitize */;
    // the toString() comparison ensures that a value is checked
    // ... otherwise (during sanitization bypassing) the === comparsion
    // would fail since a new String() instance is created
    if (!isClassBased && hasValues && usesSanitizer) {
        // we know for sure we're dealing with strings at this point
        return a.toString() !== b.toString();
    }
    // everything else is safe to check with a normal equality check
    return a !== b;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvc3R5bGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFLSCxPQUFPLEVBQVksbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQXdNM0Y7Ozs7O0dBS0c7QUFDSCxNQUFNLDhCQUNGLFFBQTZCLEVBQUUsb0JBQW9DO0lBQ3JFLDRCQUE0QjtJQUM1QixJQUFNLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLEVBQTJCLENBQUM7SUFDdEUsT0FBTyx5QkFBOEIsR0FBRyxRQUFRLENBQUM7SUFDakQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLHVDQUNGLHdCQUE0RSxFQUM1RSx3QkFBNEUsRUFDNUUsY0FBdUM7SUFDekMsSUFBTSxvQkFBb0IsR0FBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxJQUFNLE9BQU8sR0FBbUIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxJQUFJLElBQUksRUFBRSxvQkFBb0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRWpHLHlFQUF5RTtJQUN6RSxJQUFNLFlBQVksR0FBNEIsRUFBRSxDQUFDO0lBQ2pELElBQU0sYUFBYSxHQUE0QixFQUFFLENBQUM7SUFFbEQsSUFBSSxzQkFBc0IsR0FBRyxDQUFDLENBQUM7SUFDL0IsSUFBSSx3QkFBd0IsRUFBRTtRQUM1QixJQUFJLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNsQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsd0JBQXdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hELElBQU0sQ0FBQyxHQUFHLHdCQUF3QixDQUFDLENBQUMsQ0FBaUMsQ0FBQztZQUV0RSw0RUFBNEU7WUFDNUUsSUFBSSxDQUFDLHdCQUFvQyxFQUFFO2dCQUN6QyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsSUFBTSxJQUFJLEdBQUcsQ0FBVyxDQUFDO2dCQUN6QixJQUFJLHFCQUFxQixFQUFFO29CQUN6QixJQUFNLEtBQUssR0FBRyx3QkFBd0IsQ0FBQyxFQUFFLENBQUMsQ0FBVyxDQUFDO29CQUN0RCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2lCQUN0RDtxQkFBTTtvQkFDTCxzQkFBc0IsRUFBRSxDQUFDO29CQUN6QixZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QjthQUNGO1NBQ0Y7S0FDRjtJQUVELHFDQUFxQztJQUNyQyxPQUFPLDZCQUFrQyxHQUFHLHNCQUFzQixDQUFDO0lBRW5FLElBQUksd0JBQXdCLEVBQUU7UUFDNUIsSUFBSSxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4RCxJQUFNLENBQUMsR0FBRyx3QkFBd0IsQ0FBQyxDQUFDLENBQTJDLENBQUM7WUFDaEYsNEVBQTRFO1lBQzVFLElBQUksQ0FBQyx3QkFBb0MsRUFBRTtnQkFDekMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLElBQU0sU0FBUyxHQUFHLENBQVcsQ0FBQztnQkFDOUIsSUFBSSxxQkFBcUIsRUFBRTtvQkFDekIsSUFBTSxLQUFLLEdBQUcsd0JBQXdCLENBQUMsRUFBRSxDQUFDLENBQVksQ0FBQztvQkFDdkQsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDNUQ7cUJBQU07b0JBQ0wsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDOUI7YUFDRjtTQUNGO0tBQ0Y7SUFFRCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdDLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUMsSUFBTSxvQkFBb0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQy9DLElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUV6RCxtRUFBbUU7SUFDbkUsSUFBTSxTQUFTLEdBQUcsVUFBVSxlQUFvQixHQUFHLENBQUMsb0NBQXlDLENBQUM7SUFFOUYsaUVBQWlFO0lBQ2pFLHVFQUF1RTtJQUN2RSxLQUFLLElBQUksQ0FBQyxvQ0FBeUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEI7SUFFRCxJQUFNLFdBQVcsb0NBQXlDLENBQUM7SUFDM0QsSUFBTSxVQUFVLEdBQUcsVUFBVSxlQUFvQixvQ0FBeUMsQ0FBQztJQUUzRixxQ0FBcUM7SUFDckMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxJQUFNLGNBQVksR0FBRyxDQUFDLElBQUksb0JBQW9CLENBQUM7UUFDL0MsSUFBTSxJQUFJLEdBQUcsY0FBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRixJQUFNLGVBQWUsR0FBRyxjQUFZLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hGLElBQU0sWUFBWSxHQUFHLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTNELElBQU0sYUFBYSxHQUFHLENBQUMsZUFBb0IsR0FBRyxVQUFVLENBQUM7UUFDekQsSUFBTSxjQUFjLEdBQUcsQ0FBQyxlQUFvQixHQUFHLFdBQVcsQ0FBQztRQUMzRCxJQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsY0FBWSxFQUFFLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUVuRixPQUFPLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLE9BQU8sQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXhDLElBQU0sWUFBWSxHQUNkLFdBQVcsR0FBRyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxlQUFvQixDQUFDLGFBQWtCLENBQUMsQ0FBQztRQUNuRixPQUFPLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLE9BQU8sQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsdUVBQXVFO0lBQ3ZFLG1DQUFtQztJQUNuQyxPQUFPLENBQUMsT0FBTyw4QkFBbUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM5RSxlQUFlLENBQUMsT0FBTyxFQUFFLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUUxRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsSUFBTSxTQUFTLEdBQVUsRUFBRSxDQUFDO0FBQzVCLElBQU0sU0FBUyxHQUF5QixFQUFFLENBQUM7QUFDM0M7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsTUFBTSwyQkFDRixPQUF1QixFQUFFLE9BQTZDLEVBQ3RFLE1BQW9DO0lBQ3RDLElBQUksVUFBVSxHQUFhLFNBQVMsQ0FBQztJQUNyQyxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDNUIsSUFBSSxxQkFBcUIsR0FBRyxLQUFLLENBQUM7SUFFbEMsMEVBQTBFO0lBQzFFLDJCQUEyQjtJQUMzQixJQUFJLE9BQU8sT0FBTyxJQUFJLFFBQVEsRUFBRTtRQUM5QixJQUFNLGlCQUFpQixHQUFHLE9BQU8sOEJBQW9ELENBQUM7UUFDdEYsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsS0FBSyxPQUFPLEVBQUU7WUFDdEQscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1NBQzlCO2FBQU07WUFDTCxPQUFPLDhCQUFtQyxHQUFHLE9BQU8sQ0FBQztZQUNyRCxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxrRkFBa0Y7WUFDbEYsb0VBQW9FO1lBQ3BFLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDeEI7S0FDRjtTQUFNO1FBQ0wsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3hELE9BQU8sOEJBQW1DLEdBQUcsSUFBSSxDQUFDO0tBQ25EO0lBRUQsT0FBTyxHQUFHLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBd0IsQ0FBQztJQUV4RCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM1RCxNQUFNLEdBQUcsTUFBTSxJQUFJLFNBQVMsQ0FBQztJQUU3QixJQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDNUMsSUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFcEQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLElBQUksUUFBUSxHQUFHLGVBQWUsQ0FBQztJQUUvQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDbEIsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRXhELDJFQUEyRTtJQUMzRSxpRkFBaUY7SUFDakYseUVBQXlFO0lBQ3pFLE9BQU8sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksU0FBUyxHQUFHLFNBQVMsRUFBRTtRQUN6RCxJQUFNLGNBQVksR0FBRyxTQUFTLElBQUksaUJBQWlCLENBQUM7UUFFcEQsb0VBQW9FO1FBQ3BFLGtEQUFrRDtRQUNsRCxJQUFJLENBQUMscUJBQXFCLElBQUksQ0FBQyxjQUFZLEVBQUU7WUFDM0MsSUFBTSxpQkFBaUIsR0FBRyxjQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ25GLElBQU0sT0FBTyxHQUNULGNBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pGLElBQU0sUUFBUSxHQUNWLGNBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVqRixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDcEIsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDMUMsSUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRTtvQkFDMUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBRXRDLElBQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBRXBELCtEQUErRDtvQkFDL0QscUVBQXFFO29CQUNyRSxJQUFJLFlBQVksS0FBSyxRQUFRLEVBQUU7d0JBQzdCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNsQyxLQUFLLEdBQUcsSUFBSSxDQUFDO3FCQUNkO2lCQUNGO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBTSxZQUFZLEdBQUcsdUJBQXVCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDekUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO29CQUNwQix5REFBeUQ7b0JBQ3pELElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ3ZELElBQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ3pELHVCQUF1QixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQ3pELElBQUksY0FBYyxLQUFLLFFBQVEsRUFBRTt3QkFDL0IsSUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQzt3QkFDN0QsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ3RDLElBQUksWUFBWSxLQUFLLFFBQVEsRUFBRTs0QkFDN0IsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7NEJBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUM7eUJBQ2Q7cUJBQ0Y7aUJBQ0Y7cUJBQU07b0JBQ0wsNERBQTREO29CQUM1RCxJQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsY0FBWSxFQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3RGLHNCQUFzQixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsY0FBWSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3BGLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQ2Q7YUFDRjtTQUNGO1FBRUQsUUFBUSxnQkFBcUIsQ0FBQztRQUM5QixTQUFTLEVBQUUsQ0FBQztLQUNiO0lBRUQsaUVBQWlFO0lBQ2pFLCtEQUErRDtJQUMvRCxzRUFBc0U7SUFDdEUsT0FBTyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtRQUNoQyxJQUFNLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLElBQU0sY0FBWSxHQUFHLENBQUMsSUFBSSxnQkFBcUIsQ0FBQyxrQkFBdUIsQ0FBQztRQUN4RSxJQUFJLHFCQUFxQixJQUFJLGNBQVk7WUFBRSxNQUFNO1FBRWpELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUMsSUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxjQUFZLENBQUMsQ0FBQztRQUN2RCxJQUFJLGFBQWEsRUFBRTtZQUNqQixRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2Q7UUFDRCxRQUFRLGdCQUFxQixDQUFDO0tBQy9CO0lBRUQscUVBQXFFO0lBQ3JFLGtFQUFrRTtJQUNsRSxvREFBb0Q7SUFDcEQsSUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsT0FBTyxTQUFTLEdBQUcsU0FBUyxFQUFFO1FBQzVCLElBQU0sY0FBWSxHQUFHLFNBQVMsSUFBSSxpQkFBaUIsQ0FBQztRQUNwRCxJQUFJLHFCQUFxQixJQUFJLGNBQVk7WUFBRSxNQUFNO1FBRWpELElBQU0saUJBQWlCLEdBQUcsY0FBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNuRixJQUFNLElBQUksR0FBRyxjQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMxRixJQUFNLEtBQUssR0FDUCxjQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0UsSUFBTSxJQUFJLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxFQUFFLGNBQVksRUFBRSxTQUFTLENBQUMsZ0JBQXFCLENBQUM7UUFDcEYsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLFNBQVMsRUFBRSxDQUFDO1FBQ1osS0FBSyxHQUFHLElBQUksQ0FBQztLQUNkO0lBRUQsSUFBSSxLQUFLLEVBQUU7UUFDVCxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ2hDO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLDBCQUNGLE9BQXVCLEVBQUUsS0FBYSxFQUFFLEtBQThCO0lBQ3hFLElBQU0sV0FBVyxHQUFHLG9DQUF5QyxLQUFLLGVBQW9CLENBQUM7SUFDdkYsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNqRCxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRW5ELDhDQUE4QztJQUM5QyxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQy9DLHdFQUF3RTtRQUN4RSxRQUFRLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFNLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0RCxvRkFBb0Y7UUFDcEYsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsS0FBSyxLQUFLLEVBQUU7WUFDN0MsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztZQUV2QixJQUFNLGNBQVksR0FBRyxDQUFDLFFBQVEsZ0JBQXFCLENBQUMsa0JBQXVCLENBQUM7WUFFNUUsMEVBQTBFO1lBQzFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGNBQVksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUUsY0FBWSxDQUFDLEVBQUU7Z0JBQ2pGLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLFdBQVcsR0FBRyxLQUFLLENBQUM7YUFDckI7WUFFRCxRQUFRLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM3QyxRQUFRLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM1QyxlQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLDBCQUNGLE9BQXVCLEVBQUUsS0FBYSxFQUFFLFdBQW9CO0lBQzlELElBQU0sYUFBYSxHQUFHLEtBQUssR0FBRyxPQUFPLDZCQUFrQyxDQUFDO0lBQ3hFLGVBQWUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLHdCQUNGLE9BQXVCLEVBQUUsUUFBbUIsRUFBRSxVQUFpQyxFQUMvRSxVQUFxQztJQUN2QyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUMzQixJQUFNLE1BQU0sR0FBRyxPQUFPLHlCQUFnQyxDQUFDLE1BQU0sQ0FBQztRQUM5RCxJQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxJQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxLQUFLLElBQUksQ0FBQyxvQ0FBeUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFDbEUsQ0FBQyxnQkFBcUIsRUFBRTtZQUMzQix3RUFBd0U7WUFDeEUsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUN2QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxJQUFNLElBQUksR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFNLGNBQVksR0FBRyxJQUFJLGdCQUFxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDOUQsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsZUFBZSxDQUFDO2dCQUU3QyxJQUFJLFlBQVksR0FBd0IsS0FBSyxDQUFDO2dCQUU5Qyx1RUFBdUU7Z0JBQ3ZFLDREQUE0RDtnQkFDNUQsMkRBQTJEO2dCQUMzRCxJQUFJLGdCQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxjQUFZLENBQUMsRUFBRTtvQkFDaEUseURBQXlEO29CQUN6RCxJQUFNLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsWUFBWSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzlDO2dCQUVELHlFQUF5RTtnQkFDekUscURBQXFEO2dCQUNyRCwrREFBK0Q7Z0JBQy9ELHNFQUFzRTtnQkFDdEUsd0VBQXdFO2dCQUN4RSw2RUFBNkU7Z0JBQzdFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLGNBQVksQ0FBQyxFQUFFO29CQUM1QyxZQUFZLEdBQUcsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDL0M7Z0JBRUQsSUFBSSxjQUFZLEVBQUU7b0JBQ2hCLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUMzRTtxQkFBTTtvQkFDTCxJQUFNLFNBQVMsR0FBRyxDQUFDLElBQUksbUJBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ3pFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQTZCLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDeEY7Z0JBQ0QsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDN0I7U0FDRjtRQUVELGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDakM7QUFDSCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxrQkFDSSxNQUFXLEVBQUUsSUFBWSxFQUFFLEtBQW9CLEVBQUUsUUFBbUIsRUFDcEUsU0FBaUMsRUFBRSxLQUE0QjtJQUNqRSxLQUFLLEdBQUcsU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzVELElBQUksS0FBSyxFQUFFO1FBQ1QsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUNyQjtTQUFNLElBQUksS0FBSyxFQUFFO1FBQ2hCLFNBQVMsSUFBSSxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN0RSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztLQUM5QztTQUFNO1FBQ0wsU0FBUyxJQUFJLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQztBQUNILENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILGtCQUNJLE1BQVcsRUFBRSxTQUFpQixFQUFFLEdBQVksRUFBRSxRQUFtQixFQUNqRSxLQUFnQztJQUNsQyxJQUFJLEtBQUssRUFBRTtRQUNULEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDeEI7U0FBTSxJQUFJLEdBQUcsRUFBRTtRQUNkLFNBQVMsSUFBSSxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQ3JFO1NBQU07UUFDTCxTQUFTLElBQUksU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDN0Msb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN4RTtBQUNILENBQUM7QUFFRCxrQkFBa0IsT0FBdUIsRUFBRSxLQUFhLEVBQUUsVUFBbUI7SUFDM0UsSUFBTSxhQUFhLEdBQ2YsS0FBSyxxQ0FBMEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLHNCQUEyQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqRyxJQUFJLFVBQVUsRUFBRTtRQUNiLE9BQU8sQ0FBQyxhQUFhLENBQVksaUJBQXNCLENBQUM7S0FDMUQ7U0FBTTtRQUNKLE9BQU8sQ0FBQyxhQUFhLENBQVksSUFBSSxjQUFtQixDQUFDO0tBQzNEO0FBQ0gsQ0FBQztBQUVELGlCQUFpQixPQUF1QixFQUFFLEtBQWE7SUFDckQsSUFBTSxhQUFhLEdBQ2YsS0FBSyxxQ0FBMEMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLHNCQUEyQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNqRyxPQUFPLENBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBWSxnQkFBcUIsQ0FBQyxpQkFBc0IsQ0FBQztBQUN6RixDQUFDO0FBRUQsc0JBQXNCLE9BQXVCLEVBQUUsS0FBYTtJQUMxRCxJQUFNLGFBQWEsR0FDZixLQUFLLHFDQUEwQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssc0JBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2pHLE9BQU8sQ0FBRSxPQUFPLENBQUMsYUFBYSxDQUFZLGdCQUFxQixDQUFDLGlCQUFzQixDQUFDO0FBQ3pGLENBQUM7QUFFRCx1QkFBdUIsT0FBdUIsRUFBRSxLQUFhO0lBQzNELElBQU0sYUFBYSxHQUNmLEtBQUsscUNBQTBDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxzQkFBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDakcsT0FBTyxDQUFFLE9BQU8sQ0FBQyxhQUFhLENBQVksbUJBQXdCLENBQUMsb0JBQXlCLENBQUM7QUFDL0YsQ0FBQztBQUVELGtCQUFrQixVQUFrQixFQUFFLFdBQW1CLEVBQUUsWUFBb0I7SUFDN0UsT0FBTyxDQUFDLFVBQVUsa0JBQXVCLENBQUMsR0FBRyxDQUFDLFdBQVcsd0JBQTZCLENBQUM7UUFDbkYsQ0FBQyxZQUFZLElBQUksQ0FBQyw0Q0FBcUQsQ0FBQyxDQUFDLENBQUM7QUFDaEYsQ0FBQztBQUVELHlCQUF5QixPQUF1QixFQUFFLElBQVk7SUFDNUQsSUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sT0FBTywrQkFBb0MsQ0FBQyxLQUFLLENBQWtCLENBQUM7QUFDN0UsQ0FBQztBQUVELHlCQUF5QixJQUFZO0lBQ25DLE9BQU8sQ0FBQyxJQUFJLHdCQUE2QixDQUFDLHNCQUF1QixDQUFDO0FBQ3BFLENBQUM7QUFFRCwrQkFBK0IsSUFBWTtJQUN6QyxJQUFNLEtBQUssR0FDUCxDQUFDLElBQUksSUFBSSxDQUFDLDRDQUFxRCxDQUFDLENBQUMsc0JBQXVCLENBQUM7SUFDN0YsT0FBTyxLQUFLLHFDQUEwQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFFRCw0QkFBNEIsT0FBdUI7SUFDakQsT0FBTyxxQkFBcUIsQ0FBQyxPQUFPLDRCQUFpQyxDQUFXLENBQUM7QUFDbkYsQ0FBQztBQUVELDJCQUEyQixPQUF1QjtJQUNoRCxPQUFPLE9BQU8sZ0NBQXFDLENBQUM7QUFDdEQsQ0FBQztBQUVELGlCQUFpQixPQUF1QixFQUFFLEtBQWEsRUFBRSxJQUFZO0lBQ25FLE9BQU8sQ0FBQyxLQUFLLHlCQUE4QixDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3RELENBQUM7QUFFRCxrQkFBa0IsT0FBdUIsRUFBRSxLQUFhLEVBQUUsS0FBOEI7SUFDdEYsT0FBTyxDQUFDLEtBQUssc0JBQTJCLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDcEQsQ0FBQztBQUVELGlCQUFpQixPQUF1QixFQUFFLEtBQWEsRUFBRSxJQUFZO0lBQ25FLElBQU0sYUFBYSxHQUNmLEtBQUssK0JBQW9DLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLHNCQUEyQixDQUFDLENBQUM7SUFDM0YsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUNoQyxDQUFDO0FBRUQscUJBQXFCLE9BQXVCLEVBQUUsS0FBYTtJQUN6RCxJQUFNLGFBQWEsR0FDZixLQUFLLCtCQUFvQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxzQkFBMkIsQ0FBQyxDQUFDO0lBQzNGLE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBVyxDQUFDO0FBQzFDLENBQUM7QUFFRCxrQkFBa0IsT0FBdUIsRUFBRSxLQUFhO0lBQ3RELE9BQU8sT0FBTyxDQUFDLEtBQUssc0JBQTJCLENBQTRCLENBQUM7QUFDOUUsQ0FBQztBQUVELGlCQUFpQixPQUF1QixFQUFFLEtBQWE7SUFDckQsT0FBTyxPQUFPLENBQUMsS0FBSyx5QkFBOEIsQ0FBVyxDQUFDO0FBQ2hFLENBQUM7QUFFRCxNQUFNLHlCQUF5QixPQUF1QjtJQUNwRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLDZCQUFrQyxDQUFDO0FBQzNELENBQUM7QUFFRCxNQUFNLDBCQUEwQixPQUF1QixFQUFFLFVBQW1CO0lBQzFFLFFBQVEsQ0FBQyxPQUFPLDhCQUFtQyxVQUFVLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQsaUNBQ0ksT0FBdUIsRUFBRSxJQUFZLEVBQUUsVUFBbUI7SUFDNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMseUJBQThCLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQzNFLENBQUMsZ0JBQXFCLEVBQUU7UUFDM0IsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtZQUNwQixPQUFPLENBQUMseUJBQThCLENBQUM7U0FDeEM7S0FDRjtJQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDWixDQUFDO0FBRUQsaUNBQWlDLE9BQXVCLEVBQUUsTUFBYyxFQUFFLE1BQWM7SUFDdEYsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzQyxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFN0MsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDO0lBQ3BCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFekMsSUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsSUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFO1FBQ3JCLElBQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDakQsSUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDbkU7SUFFRCxJQUFNLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxJQUFJLFlBQVksSUFBSSxDQUFDLEVBQUU7UUFDckIsSUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqRCxJQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNuRTtJQUVELFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNyRCxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkQsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRXZELFFBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRCxtQ0FBbUMsT0FBdUIsRUFBRSxrQkFBMEI7SUFDcEYsS0FBSyxJQUFJLENBQUMsR0FBRyxrQkFBa0IsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLGdCQUFxQixFQUFFO1FBQzNFLElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBTSxXQUFXLEdBQUcscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDckQsSUFBTSxxQkFBcUIsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUQsSUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFBb0IsQ0FBQyxhQUFrQixDQUFDO2dCQUN0RixDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxlQUFvQixDQUFDLGFBQWtCLENBQUM7Z0JBQzdFLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLGtCQUF1QixDQUFDLGFBQWtCLENBQUMsQ0FBQztZQUN0RixJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQzVDO0tBQ0Y7QUFDSCxDQUFDO0FBRUQsZ0NBQ0ksT0FBdUIsRUFBRSxLQUFhLEVBQUUsVUFBbUIsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUN2RixLQUF1QjtJQUN6QixJQUFNLE9BQU8sR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUV2Qyw2Q0FBNkM7SUFDN0MsT0FBTyxDQUFDLE1BQU0sQ0FDVixLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksZ0JBQXFCLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxlQUFvQixDQUFDLGFBQWtCLENBQUMsRUFDM0YsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRWpCLElBQUksT0FBTyxFQUFFO1FBQ1gsK0RBQStEO1FBQy9ELDREQUE0RDtRQUM1RCxrREFBa0Q7UUFDbEQseUJBQXlCLENBQUMsT0FBTyxFQUFFLEtBQUssZUFBb0IsQ0FBQyxDQUFDO0tBQy9EO0FBQ0gsQ0FBQztBQUVELHFCQUFxQixLQUE4QixFQUFFLFlBQXNCO0lBQ3pFLElBQUksWUFBWSxFQUFFO1FBQ2hCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUM3QjtJQUNELE9BQU8sS0FBSyxLQUFLLElBQUksQ0FBQztBQUN4QixDQUFDO0FBRUQsNEJBQ0ksSUFBWSxFQUFFLFlBQXFCLEVBQUUsU0FBa0M7SUFDekUsSUFBSSxZQUFZLEVBQUU7UUFDaEIscUJBQTBCO0tBQzNCO1NBQU0sSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLHdCQUE2QjtLQUM5QjtJQUNELG9CQUF5QjtBQUMzQixDQUFDO0FBRUQseUJBQ0ksSUFBWSxFQUFFLENBQTBCLEVBQUUsQ0FBMEI7SUFDdEUsSUFBTSxZQUFZLEdBQUcsSUFBSSxnQkFBcUIsQ0FBQztJQUMvQyxJQUFNLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLElBQU0sYUFBYSxHQUFHLElBQUksbUJBQXdCLENBQUM7SUFDbkQsNERBQTREO0lBQzVELG1FQUFtRTtJQUNuRSxzREFBc0Q7SUFDdEQsSUFBSSxDQUFDLFlBQVksSUFBSSxTQUFTLElBQUksYUFBYSxFQUFFO1FBQy9DLDREQUE0RDtRQUM1RCxPQUFRLENBQVksQ0FBQyxRQUFRLEVBQUUsS0FBTSxDQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUQ7SUFFRCxnRUFBZ0U7SUFDaEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U3R5bGVTYW5pdGl6ZUZufSBmcm9tICcuLi9zYW5pdGl6YXRpb24vc3R5bGVfc2FuaXRpemVyJztcbmltcG9ydCB7SW5pdGlhbFN0eWxpbmdGbGFnc30gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtMRWxlbWVudE5vZGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7UmVuZGVyZXIzLCBSZW5kZXJlclN0eWxlRmxhZ3MzLCBpc1Byb2NlZHVyYWxSZW5kZXJlcn0gZnJvbSAnLi9pbnRlcmZhY2VzL3JlbmRlcmVyJztcblxuXG4vKipcbiAqIFRoZSBzdHlsaW5nIGNvbnRleHQgYWN0cyBhcyBhIHN0eWxpbmcgbWFuaWZlc3QgKHNoYXBlZCBhcyBhbiBhcnJheSkgZm9yIGRldGVybWluaW5nIHdoaWNoXG4gKiBzdHlsaW5nIHByb3BlcnRpZXMgaGF2ZSBiZWVuIGFzc2lnbmVkIHZpYSB0aGUgcHJvdmlkZWQgYHVwZGF0ZVN0eWxpbmdNYXBgLCBgdXBkYXRlU3R5bGVQcm9wYFxuICogYW5kIGB1cGRhdGVDbGFzc1Byb3BgIGZ1bmN0aW9ucy4gVGhlcmUgYXJlIGFsc28gdHdvIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uc1xuICogYGFsbG9jU3R5bGluZ0NvbnRleHRgIGFuZCBgY3JlYXRlU3R5bGluZ0NvbnRleHRUZW1wbGF0ZWAgd2hpY2ggYXJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICogYW5kL29yIGNsb25lIHRoZSBjb250ZXh0LlxuICpcbiAqIFRoZSBjb250ZXh0IGlzIGFuIGFycmF5IHdoZXJlIHRoZSBmaXJzdCB0d28gY2VsbHMgYXJlIHVzZWQgZm9yIHN0YXRpYyBkYXRhIChpbml0aWFsIHN0eWxpbmcpXG4gKiBhbmQgZGlydHkgZmxhZ3MgLyBpbmRleCBvZmZzZXRzKS4gVGhlIHJlbWFpbmluZyBzZXQgb2YgY2VsbHMgaXMgdXNlZCBmb3IgbXVsdGkgKG1hcCkgYW5kIHNpbmdsZVxuICogKHByb3ApIHN0eWxlIHZhbHVlcy5cbiAqXG4gKiBlYWNoIHZhbHVlIGZyb20gaGVyZSBvbndhcmRzIGlzIG1hcHBlZCBhcyBzbzpcbiAqIFtpXSA9IG11dGF0aW9uL3R5cGUgZmxhZyBmb3IgdGhlIHN0eWxlL2NsYXNzIHZhbHVlXG4gKiBbaSArIDFdID0gcHJvcCBzdHJpbmcgKG9yIG51bGwgaW5jYXNlIGl0IGhhcyBiZWVuIHJlbW92ZWQpXG4gKiBbaSArIDJdID0gdmFsdWUgc3RyaW5nIChvciBudWxsIGluY2FzZSBpdCBoYXMgYmVlbiByZW1vdmVkKVxuICpcbiAqIFRoZXJlIGFyZSB0aHJlZSB0eXBlcyBvZiBzdHlsaW5nIHR5cGVzIHN0b3JlZCBpbiB0aGlzIGNvbnRleHQ6XG4gKiAgIGluaXRpYWw6IGFueSBzdHlsZXMgdGhhdCBhcmUgcGFzc2VkIGluIG9uY2UgdGhlIGNvbnRleHQgaXMgY3JlYXRlZFxuICogICAgICAgICAgICAodGhlc2UgYXJlIHN0b3JlZCBpbiB0aGUgZmlyc3QgY2VsbCBvZiB0aGUgYXJyYXkgYW5kIHRoZSBmaXJzdFxuICogICAgICAgICAgICAgdmFsdWUgb2YgdGhpcyBhcnJheSBpcyBhbHdheXMgYG51bGxgIGV2ZW4gaWYgbm8gaW5pdGlhbCBzdHlsaW5nIGV4aXN0cy5cbiAqICAgICAgICAgICAgIHRoZSBgbnVsbGAgdmFsdWUgaXMgdGhlcmUgc28gdGhhdCBhbnkgbmV3IHN0eWxlcyBoYXZlIGEgcGFyZW50IHRvIHBvaW50XG4gKiAgICAgICAgICAgICB0by4gVGhpcyB3YXkgd2UgY2FuIGFsd2F5cyBhc3N1bWUgdGhhdCB0aGVyZSBpcyBhIHBhcmVudC4pXG4gKlxuICogICBzaW5nbGU6IGFueSBzdHlsZXMgdGhhdCBhcmUgdXBkYXRlZCB1c2luZyBgdXBkYXRlU3R5bGVQcm9wYCBvciBgdXBkYXRlQ2xhc3NQcm9wYCAoZml4ZWQgc2V0KVxuICpcbiAqICAgbXVsdGk6IGFueSBzdHlsZXMgdGhhdCBhcmUgdXBkYXRlZCB1c2luZyBgdXBkYXRlU3R5bGluZ01hcGAgKGR5bmFtaWMgc2V0KVxuICpcbiAqIE5vdGUgdGhhdCBjb250ZXh0IGlzIG9ubHkgdXNlZCB0byBjb2xsZWN0IHN0eWxlIGluZm9ybWF0aW9uLiBPbmx5IHdoZW4gYHJlbmRlclN0eWxpbmdgXG4gKiBpcyBjYWxsZWQgaXMgd2hlbiB0aGUgc3R5bGluZyBwYXlsb2FkIHdpbGwgYmUgcmVuZGVyZWQgKG9yIGJ1aWx0IGFzIGEga2V5L3ZhbHVlIG1hcCkuXG4gKlxuICogV2hlbiB0aGUgY29udGV4dCBpcyBjcmVhdGVkLCBkZXBlbmRpbmcgb24gd2hhdCBpbml0aWFsIHN0eWxpbmcgdmFsdWVzIGFyZSBwYXNzZWQgaW4sIHRoZVxuICogY29udGV4dCBpdHNlbGYgd2lsbCBiZSBwcmUtZmlsbGVkIHdpdGggc2xvdHMgYmFzZWQgb24gdGhlIGluaXRpYWwgc3R5bGUgcHJvcGVydGllcy4gU2F5XG4gKiBmb3IgZXhhbXBsZSB3ZSBoYXZlIGEgc2VyaWVzIG9mIGluaXRpYWwgc3R5bGVzIHRoYXQgbG9vayBsaWtlIHNvOlxuICpcbiAqICAgc3R5bGU9XCJ3aWR0aDoxMDBweDsgaGVpZ2h0OjIwMHB4O1wiXG4gKiAgIGNsYXNzPVwiZm9vXCJcbiAqXG4gKiBUaGVuIHRoZSBpbml0aWFsIHN0YXRlIG9mIHRoZSBjb250ZXh0IChvbmNlIGluaXRpYWxpemVkKSB3aWxsIGxvb2sgbGlrZSBzbzpcbiAqXG4gKiBgYGBcbiAqIGNvbnRleHQgPSBbXG4gKiAgIGVsZW1lbnQsXG4gKiAgIHN0eWxlU2FuaXRpemVyIHwgbnVsbCxcbiAqICAgW251bGwsICcxMDBweCcsICcyMDBweCcsIHRydWVdLCAgLy8gcHJvcGVydHkgbmFtZXMgYXJlIG5vdCBuZWVkZWQgc2luY2UgdGhleSBoYXZlIGFscmVhZHkgYmVlblxuICogd3JpdHRlbiB0byBET00uXG4gKlxuICogICBjb25maWdNYXN0ZXJWYWwsXG4gKiAgIDEsIC8vIHRoaXMgaW5zdHJ1Y3RzIGhvdyBtYW55IGBzdHlsZWAgdmFsdWVzIHRoZXJlIGFyZSBzbyB0aGF0IGNsYXNzIGluZGV4IHZhbHVlcyBjYW4gYmVcbiAqIG9mZnNldHRlZFxuICogICAnbGFzdCBjbGFzcyBzdHJpbmcgYXBwbGllZCcsXG4gKlxuICogICAvLyA2XG4gKiAgICd3aWR0aCcsXG4gKiAgIHBvaW50ZXJzKDEsIDE1KTsgIC8vIFBvaW50IHRvIHN0YXRpYyBgd2lkdGhgOiBgMTAwcHhgIGFuZCBtdWx0aSBgd2lkdGhgLlxuICogICBudWxsLFxuICpcbiAqICAgLy8gOVxuICogICAnaGVpZ2h0JyxcbiAqICAgcG9pbnRlcnMoMiwgMTgpOyAvLyBQb2ludCB0byBzdGF0aWMgYGhlaWdodGA6IGAyMDBweGAgYW5kIG11bHRpIGBoZWlnaHRgLlxuICogICBudWxsLFxuICpcbiAqICAgLy8gMTJcbiAqICAgJ2ZvbycsXG4gKiAgIHBvaW50ZXJzKDEsIDIxKTsgIC8vIFBvaW50IHRvIHN0YXRpYyBgZm9vYDogYHRydWVgIGFuZCBtdWx0aSBgZm9vYC5cbiAqICAgbnVsbCxcbiAqXG4gKiAgIC8vIDE1XG4gKiAgICd3aWR0aCcsXG4gKiAgIHBvaW50ZXJzKDEsIDYpOyAgLy8gUG9pbnQgdG8gc3RhdGljIGB3aWR0aGA6IGAxMDBweGAgYW5kIHNpbmdsZSBgd2lkdGhgLlxuICogICBudWxsLFxuICpcbiAqICAgLy8gMThcbiAqICAgJ2hlaWdodCcsXG4gKiAgIHBvaW50ZXJzKDIsIDkpOyAgLy8gUG9pbnQgdG8gc3RhdGljIGBoZWlnaHRgOiBgMjAwcHhgIGFuZCBzaW5nbGUgYGhlaWdodGAuXG4gKiAgIG51bGwsXG4gKlxuICogICAvLyAyMVxuICogICAnZm9vJyxcbiAqICAgcG9pbnRlcnMoMywgMTIpOyAgLy8gUG9pbnQgdG8gc3RhdGljIGBmb29gOiBgdHJ1ZWAgYW5kIHNpbmdsZSBgZm9vYC5cbiAqICAgbnVsbCxcbiAqIF1cbiAqXG4gKiBmdW5jdGlvbiBwb2ludGVycyhzdGF0aWNJbmRleDogbnVtYmVyLCBkeW5hbWljSW5kZXg6IG51bWJlcikge1xuICogICAvLyBjb21iaW5lIHRoZSB0d28gaW5kaWNlcyBpbnRvIGEgc2luZ2xlIHdvcmQuXG4gKiAgIHJldHVybiAoc3RhdGljSW5kZXggPDwgU3R5bGluZ0ZsYWdzLkJpdENvdW50U2l6ZSkgfFxuICogICAgIChkeW5hbWljSW5kZXggPDwgKFN0eWxpbmdJbmRleC5CaXRDb3VudFNpemUgKyBTdHlsaW5nRmxhZ3MuQml0Q291bnRTaXplKSk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBUaGUgdmFsdWVzIGFyZSBkdXBsaWNhdGVkIHNvIHRoYXQgc3BhY2UgaXMgc2V0IGFzaWRlIGZvciBib3RoIG11bHRpIChbc3R5bGVdIGFuZCBbY2xhc3NdKVxuICogYW5kIHNpbmdsZSAoW3N0eWxlLnByb3BdIG9yIFtjbGFzcy5uYW1lZF0pIHZhbHVlcy4gVGhlIHJlc3BlY3RpdmUgY29uZmlnIHZhbHVlc1xuICogKGNvbmZpZ1ZhbEEsIGNvbmZpZ1ZhbEIsIGV0Yy4uLikgYXJlIGEgY29tYmluYXRpb24gb2YgdGhlIFN0eWxpbmdGbGFncyB3aXRoIHR3byBpbmRleFxuICogdmFsdWVzOiB0aGUgYGluaXRpYWxJbmRleGAgKHdoaWNoIHBvaW50cyB0byB0aGUgaW5kZXggbG9jYXRpb24gb2YgdGhlIHN0eWxlIHZhbHVlIGluXG4gKiB0aGUgaW5pdGlhbCBzdHlsZXMgYXJyYXkgaW4gc2xvdCAwKSBhbmQgdGhlIGBkeW5hbWljSW5kZXhgICh3aGljaCBwb2ludHMgdG8gdGhlXG4gKiBtYXRjaGluZyBzaW5nbGUvbXVsdGkgaW5kZXggcG9zaXRpb24gaW4gdGhlIGNvbnRleHQgYXJyYXkgZm9yIHRoZSBzYW1lIHByb3ApLlxuICpcbiAqIFRoaXMgbWVhbnMgdGhhdCBldmVyeSB0aW1lIGB1cGRhdGVTdHlsZVByb3BgIG9yIGB1cGRhdGVDbGFzc1Byb3BgIGFyZSBjYWxsZWQgdGhlbiB0aGV5XG4gKiBtdXN0IGJlIGNhbGxlZCB1c2luZyBhbiBpbmRleCB2YWx1ZSAobm90IGEgcHJvcGVydHkgc3RyaW5nKSB3aGljaCByZWZlcmVuY2VzIHRoZSBpbmRleFxuICogdmFsdWUgb2YgdGhlIGluaXRpYWwgc3R5bGUgcHJvcC9jbGFzcyB3aGVuIHRoZSBjb250ZXh0IHdhcyBjcmVhdGVkLiBUaGlzIGFsc28gbWVhbnMgdGhhdFxuICogYHVwZGF0ZVN0eWxlUHJvcGAgb3IgYHVwZGF0ZUNsYXNzUHJvcGAgY2Fubm90IGJlIGNhbGxlZCB3aXRoIGEgbmV3IHByb3BlcnR5IChvbmx5XG4gKiBgdXBkYXRlU3R5bGluZ01hcGAgY2FuIGluY2x1ZGUgbmV3IENTUyBwcm9wZXJ0aWVzIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgY29udGV4dCkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3R5bGluZ0NvbnRleHQgZXh0ZW5kc1xuICAgIEFycmF5PEluaXRpYWxTdHlsZXN8bnVtYmVyfHN0cmluZ3xib29sZWFufExFbGVtZW50Tm9kZXxTdHlsZVNhbml0aXplRm58bnVsbD4ge1xuICAvKipcbiAgICogTG9jYXRpb24gb2YgZWxlbWVudCB0aGF0IGlzIHVzZWQgYXMgYSB0YXJnZXQgZm9yIHRoaXMgY29udGV4dC5cbiAgICovXG4gIFswXTogTEVsZW1lbnROb2RlfG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBzdHlsZSBzYW5pdGl6ZXIgdGhhdCBpcyB1c2VkIHdpdGhpbiB0aGlzIGNvbnRleHRcbiAgICovXG4gIFsxXTogU3R5bGVTYW5pdGl6ZUZufG51bGw7XG5cbiAgLyoqXG4gICAqIExvY2F0aW9uIG9mIGluaXRpYWwgZGF0YSBzaGFyZWQgYnkgYWxsIGluc3RhbmNlcyBvZiB0aGlzIHN0eWxlLlxuICAgKi9cbiAgWzJdOiBJbml0aWFsU3R5bGVzO1xuXG4gIC8qKlxuICAgKiBBIG51bWVyaWMgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBjb25maWd1cmF0aW9uIHN0YXR1cyAod2hldGhlciB0aGUgY29udGV4dCBpcyBkaXJ0eSBvciBub3QpXG4gICAqIG1peGVkIHRvZ2V0aGVyICh1c2luZyBiaXQgc2hpZnRpbmcpIHdpdGggYSBpbmRleCB2YWx1ZSB3aGljaCB0ZWxscyB0aGUgc3RhcnRpbmcgaW5kZXggdmFsdWVcbiAgICogb2Ygd2hlcmUgdGhlIG11bHRpIHN0eWxlIGVudHJpZXMgYmVnaW4uXG4gICAqL1xuICBbM106IG51bWJlcjtcblxuICAvKipcbiAgICogQSBudW1lcmljIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgY2xhc3MgaW5kZXggb2Zmc2V0IHZhbHVlLiBXaGVuZXZlciBhIHNpbmdsZSBjbGFzcyBpc1xuICAgKiBhcHBsaWVkICh1c2luZyBgZWxlbWVudENsYXNzUHJvcGApIGl0IHNob3VsZCBoYXZlIGFuIHN0eWxpbmcgaW5kZXggdmFsdWUgdGhhdCBkb2Vzbid0XG4gICAqIG5lZWQgdG8gdGFrZSBpbnRvIGFjY291bnQgYW55IHN0eWxlIHZhbHVlcyB0aGF0IGV4aXN0IGluIHRoZSBjb250ZXh0LlxuICAgKi9cbiAgWzRdOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBsYXN0IENMQVNTIFNUUklORyBWQUxVRSB0aGF0IHdhcyBpbnRlcnByZXRlZCBieSBlbGVtZW50U3R5bGluZ01hcC4gVGhpcyBpcyBjYWNoZWRcbiAgICogU28gdGhhdCB0aGUgYWxnb3JpdGhtIGNhbiBleGl0IGVhcmx5IGluY2FzZSB0aGUgc3RyaW5nIGhhcyBub3QgY2hhbmdlZC5cbiAgICovXG4gIFs1XTogc3RyaW5nfG51bGw7XG59XG5cbi8qKlxuICogVGhlIGluaXRpYWwgc3R5bGVzIGlzIHBvcHVsYXRlZCB3aGV0aGVyIG9yIG5vdCB0aGVyZSBhcmUgYW55IGluaXRpYWwgc3R5bGVzIHBhc3NlZCBpbnRvXG4gKiB0aGUgY29udGV4dCBkdXJpbmcgYWxsb2NhdGlvbi4gVGhlIDB0aCB2YWx1ZSBtdXN0IGJlIG51bGwgc28gdGhhdCBpbmRleCB2YWx1ZXMgb2YgYDBgIHdpdGhpblxuICogdGhlIGNvbnRleHQgZmxhZ3MgY2FuIGFsd2F5cyBwb2ludCB0byBhIG51bGwgdmFsdWUgc2FmZWx5IHdoZW4gbm90aGluZyBpcyBzZXQuXG4gKlxuICogQWxsIG90aGVyIGVudHJpZXMgaW4gdGhpcyBhcnJheSBhcmUgb2YgYHN0cmluZ2AgdmFsdWUgYW5kIGNvcnJlc3BvbmQgdG8gdGhlIHZhbHVlcyB0aGF0XG4gKiB3ZXJlIGV4dHJhY3RlZCBmcm9tIHRoZSBgc3R5bGU9XCJcImAgYXR0cmlidXRlIGluIHRoZSBIVE1MIGNvZGUgZm9yIHRoZSBwcm92aWRlZCB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbml0aWFsU3R5bGVzIGV4dGVuZHMgQXJyYXk8c3RyaW5nfG51bGx8Ym9vbGVhbj4geyBbMF06IG51bGw7IH1cblxuLyoqXG4gKiBVc2VkIHRvIHNldCB0aGUgY29udGV4dCB0byBiZSBkaXJ0eSBvciBub3QgYm90aCBvbiB0aGUgbWFzdGVyIGZsYWcgKHBvc2l0aW9uIDEpXG4gKiBvciBmb3IgZWFjaCBzaW5nbGUvbXVsdGkgcHJvcGVydHkgdGhhdCBleGlzdHMgaW4gdGhlIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIFN0eWxpbmdGbGFncyB7XG4gIC8vIEltcGxpZXMgbm8gY29uZmlndXJhdGlvbnNcbiAgTm9uZSA9IDBiMDAwLFxuICAvLyBXaGV0aGVyIG9yIG5vdCB0aGUgZW50cnkgb3IgY29udGV4dCBpdHNlbGYgaXMgZGlydHlcbiAgRGlydHkgPSAwYjAwMSxcbiAgLy8gV2hldGhlciBvciBub3QgdGhpcyBpcyBhIGNsYXNzLWJhc2VkIGFzc2lnbm1lbnRcbiAgQ2xhc3MgPSAwYjAxMCxcbiAgLy8gV2hldGhlciBvciBub3QgYSBzYW5pdGl6ZXIgd2FzIGFwcGxpZWQgdG8gdGhpcyBwcm9wZXJ0eVxuICBTYW5pdGl6ZSA9IDBiMTAwLFxuICAvLyBUaGUgbWF4IGFtb3VudCBvZiBiaXRzIHVzZWQgdG8gcmVwcmVzZW50IHRoZXNlIGNvbmZpZ3VyYXRpb24gdmFsdWVzXG4gIEJpdENvdW50U2l6ZSA9IDMsXG4gIC8vIFRoZXJlIGFyZSBvbmx5IHRocmVlIGJpdHMgaGVyZVxuICBCaXRNYXNrID0gMGIxMTFcbn1cblxuLyoqIFVzZWQgYXMgbnVtZXJpYyBwb2ludGVyIHZhbHVlcyB0byBkZXRlcm1pbmUgd2hhdCBjZWxscyB0byB1cGRhdGUgaW4gdGhlIGBTdHlsaW5nQ29udGV4dGAgKi9cbmV4cG9ydCBjb25zdCBlbnVtIFN0eWxpbmdJbmRleCB7XG4gIC8vIFBvc2l0aW9uIG9mIHdoZXJlIHRoZSBpbml0aWFsIHN0eWxlcyBhcmUgc3RvcmVkIGluIHRoZSBzdHlsaW5nIGNvbnRleHRcbiAgRWxlbWVudFBvc2l0aW9uID0gMCxcbiAgLy8gUG9zaXRpb24gb2Ygd2hlcmUgdGhlIHN0eWxlIHNhbml0aXplciBpcyBzdG9yZWQgd2l0aGluIHRoZSBzdHlsaW5nIGNvbnRleHRcbiAgU3R5bGVTYW5pdGl6ZXJQb3NpdGlvbiA9IDEsXG4gIC8vIFBvc2l0aW9uIG9mIHdoZXJlIHRoZSBpbml0aWFsIHN0eWxlcyBhcmUgc3RvcmVkIGluIHRoZSBzdHlsaW5nIGNvbnRleHRcbiAgSW5pdGlhbFN0eWxlc1Bvc2l0aW9uID0gMixcbiAgLy8gSW5kZXggb2YgbG9jYXRpb24gd2hlcmUgdGhlIHN0YXJ0IG9mIHNpbmdsZSBwcm9wZXJ0aWVzIGFyZSBzdG9yZWQuIChgdXBkYXRlU3R5bGVQcm9wYClcbiAgTWFzdGVyRmxhZ1Bvc2l0aW9uID0gMyxcbiAgLy8gSW5kZXggb2YgbG9jYXRpb24gd2hlcmUgdGhlIGNsYXNzIGluZGV4IG9mZnNldCB2YWx1ZSBpcyBsb2NhdGVkXG4gIENsYXNzT2Zmc2V0UG9zaXRpb24gPSA0LFxuICAvLyBQb3NpdGlvbiBvZiB3aGVyZSB0aGUgbGFzdCBzdHJpbmctYmFzZWQgQ1NTIGNsYXNzIHZhbHVlIHdhcyBzdG9yZWRcbiAgQ2FjaGVkQ3NzQ2xhc3NTdHJpbmcgPSA1LFxuICAvLyBMb2NhdGlvbiBvZiBzaW5nbGUgKHByb3ApIHZhbHVlIGVudHJpZXMgYXJlIHN0b3JlZCB3aXRoaW4gdGhlIGNvbnRleHRcbiAgU2luZ2xlU3R5bGVzU3RhcnRQb3NpdGlvbiA9IDYsXG4gIC8vIE11bHRpIGFuZCBzaW5nbGUgZW50cmllcyBhcmUgc3RvcmVkIGluIGBTdHlsaW5nQ29udGV4dGAgYXM6IEZsYWc7IFByb3BlcnR5TmFtZTsgIFByb3BlcnR5VmFsdWVcbiAgRmxhZ3NPZmZzZXQgPSAwLFxuICBQcm9wZXJ0eU9mZnNldCA9IDEsXG4gIFZhbHVlT2Zmc2V0ID0gMixcbiAgLy8gU2l6ZSBvZiBlYWNoIG11bHRpIG9yIHNpbmdsZSBlbnRyeSAoZmxhZyArIHByb3AgKyB2YWx1ZSlcbiAgU2l6ZSA9IDMsXG4gIC8vIEVhY2ggZmxhZyBoYXMgYSBiaW5hcnkgZGlnaXQgbGVuZ3RoIG9mIHRoaXMgdmFsdWVcbiAgQml0Q291bnRTaXplID0gMTQsICAvLyAoMzIgLSAzKSAvIDIgPSB+MTRcbiAgLy8gVGhlIGJpbmFyeSBkaWdpdCB2YWx1ZSBhcyBhIG1hc2tcbiAgQml0TWFzayA9IDBiMTExMTExMTExMTExMTEgIC8vIDE0IGJpdHNcbn1cblxuLyoqXG4gKiBVc2VkIGNsb25lIGEgY29weSBvZiBhIHByZS1jb21wdXRlZCB0ZW1wbGF0ZSBvZiBhIHN0eWxpbmcgY29udGV4dC5cbiAqXG4gKiBBIHByZS1jb21wdXRlZCB0ZW1wbGF0ZSBpcyBkZXNpZ25lZCB0byBiZSBjb21wdXRlZCBvbmNlIGZvciBhIGdpdmVuIGVsZW1lbnRcbiAqIChpbnN0cnVjdGlvbnMudHMgaGFzIGxvZ2ljIGZvciBjYWNoaW5nIHRoaXMpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWxsb2NTdHlsaW5nQ29udGV4dChcbiAgICBsRWxlbWVudDogTEVsZW1lbnROb2RlIHwgbnVsbCwgdGVtcGxhdGVTdHlsZUNvbnRleHQ6IFN0eWxpbmdDb250ZXh0KTogU3R5bGluZ0NvbnRleHQge1xuICAvLyBlYWNoIGluc3RhbmNlIGdldHMgYSBjb3B5XG4gIGNvbnN0IGNvbnRleHQgPSB0ZW1wbGF0ZVN0eWxlQ29udGV4dC5zbGljZSgpIGFzIGFueSBhcyBTdHlsaW5nQ29udGV4dDtcbiAgY29udGV4dFtTdHlsaW5nSW5kZXguRWxlbWVudFBvc2l0aW9uXSA9IGxFbGVtZW50O1xuICByZXR1cm4gY29udGV4dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc3R5bGluZyBjb250ZXh0IHRlbXBsYXRlIHdoZXJlIHN0eWxpbmcgaW5mb3JtYXRpb24gaXMgc3RvcmVkLlxuICogQW55IHN0eWxlcyB0aGF0IGFyZSBsYXRlciByZWZlcmVuY2VkIHVzaW5nIGB1cGRhdGVTdHlsZVByb3BgIG11c3QgYmVcbiAqIHBhc3NlZCBpbiB3aXRoaW4gdGhpcyBmdW5jdGlvbi4gSW5pdGlhbCB2YWx1ZXMgZm9yIHRob3NlIHN0eWxlcyBhcmUgdG9cbiAqIGJlIGRlY2xhcmVkIGFmdGVyIGFsbCBpbml0aWFsIHN0eWxlIHByb3BlcnRpZXMgYXJlIGRlY2xhcmVkICh0aGlzIGNoYW5nZSBpblxuICogbW9kZSBiZXR3ZWVuIGRlY2xhcmF0aW9ucyBhbmQgaW5pdGlhbCBzdHlsZXMgaXMgbWFkZSBwb3NzaWJsZSB1c2luZyBhIHNwZWNpYWxcbiAqIGVudW0gdmFsdWUgZm91bmQgaW4gYGRlZmluaXRpb24udHNgKS5cbiAqXG4gKiBAcGFyYW0gaW5pdGlhbFN0eWxlRGVjbGFyYXRpb25zIGEgbGlzdCBvZiBzdHlsZSBkZWNsYXJhdGlvbnMgYW5kIGluaXRpYWwgc3R5bGUgdmFsdWVzXG4gKiAgICB0aGF0IGFyZSB1c2VkIGxhdGVyIHdpdGhpbiB0aGUgc3R5bGluZyBjb250ZXh0LlxuICpcbiAqICAgIC0+IFsnd2lkdGgnLCAnaGVpZ2h0JywgU1BFQ0lBTF9FTlVNX1ZBTCwgJ3dpZHRoJywgJzEwMHB4J11cbiAqICAgICAgIFRoaXMgaW1wbGllcyB0aGF0IGB3aWR0aGAgYW5kIGBoZWlnaHRgIHdpbGwgYmUgbGF0ZXIgc3R5bGVkIGFuZCB0aGF0IHRoZSBgd2lkdGhgXG4gKiAgICAgICBwcm9wZXJ0eSBoYXMgYW4gaW5pdGlhbCB2YWx1ZSBvZiBgMTAwcHhgLlxuICpcbiAqIEBwYXJhbSBpbml0aWFsQ2xhc3NEZWNsYXJhdGlvbnMgYSBsaXN0IG9mIGNsYXNzIGRlY2xhcmF0aW9ucyBhbmQgaW5pdGlhbCBjbGFzcyB2YWx1ZXNcbiAqICAgIHRoYXQgYXJlIHVzZWQgbGF0ZXIgd2l0aGluIHRoZSBzdHlsaW5nIGNvbnRleHQuXG4gKlxuICogICAgLT4gWydmb28nLCAnYmFyJywgU1BFQ0lBTF9FTlVNX1ZBTCwgJ2ZvbycsIHRydWVdXG4gKiAgICAgICBUaGlzIGltcGxpZXMgdGhhdCBgZm9vYCBhbmQgYGJhcmAgd2lsbCBiZSBsYXRlciBzdHlsZWQgYW5kIHRoYXQgdGhlIGBmb29gXG4gKiAgICAgICBjbGFzcyB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnQgYXMgYW4gaW5pdGlhbCBjbGFzcyBzaW5jZSBpdCdzIHRydWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0eWxpbmdDb250ZXh0VGVtcGxhdGUoXG4gICAgaW5pdGlhbENsYXNzRGVjbGFyYXRpb25zPzogKHN0cmluZyB8IGJvb2xlYW4gfCBJbml0aWFsU3R5bGluZ0ZsYWdzKVtdIHwgbnVsbCxcbiAgICBpbml0aWFsU3R5bGVEZWNsYXJhdGlvbnM/OiAoc3RyaW5nIHwgYm9vbGVhbiB8IEluaXRpYWxTdHlsaW5nRmxhZ3MpW10gfCBudWxsLFxuICAgIHN0eWxlU2FuaXRpemVyPzogU3R5bGVTYW5pdGl6ZUZuIHwgbnVsbCk6IFN0eWxpbmdDb250ZXh0IHtcbiAgY29uc3QgaW5pdGlhbFN0eWxpbmdWYWx1ZXM6IEluaXRpYWxTdHlsZXMgPSBbbnVsbF07XG4gIGNvbnN0IGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0ID0gW251bGwsIHN0eWxlU2FuaXRpemVyIHx8IG51bGwsIGluaXRpYWxTdHlsaW5nVmFsdWVzLCAwLCAwLCBudWxsXTtcblxuICAvLyB3ZSB1c2UgdHdvIG1hcHMgc2luY2UgYSBjbGFzcyBuYW1lIG1pZ2h0IGNvbGxpZGUgd2l0aCBhIENTUyBzdHlsZSBwcm9wXG4gIGNvbnN0IHN0eWxlc0xvb2t1cDoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB7fTtcbiAgY29uc3QgY2xhc3Nlc0xvb2t1cDoge1trZXk6IHN0cmluZ106IG51bWJlcn0gPSB7fTtcblxuICBsZXQgdG90YWxTdHlsZURlY2xhcmF0aW9ucyA9IDA7XG4gIGlmIChpbml0aWFsU3R5bGVEZWNsYXJhdGlvbnMpIHtcbiAgICBsZXQgaGFzUGFzc2VkRGVjbGFyYXRpb25zID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbml0aWFsU3R5bGVEZWNsYXJhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHYgPSBpbml0aWFsU3R5bGVEZWNsYXJhdGlvbnNbaV0gYXMgc3RyaW5nIHwgSW5pdGlhbFN0eWxpbmdGbGFncztcblxuICAgICAgLy8gdGhpcyBmbGFnIHZhbHVlIG1hcmtzIHdoZXJlIHRoZSBkZWNsYXJhdGlvbnMgZW5kIHRoZSBpbml0aWFsIHZhbHVlcyBiZWdpblxuICAgICAgaWYgKHYgPT09IEluaXRpYWxTdHlsaW5nRmxhZ3MuVkFMVUVTX01PREUpIHtcbiAgICAgICAgaGFzUGFzc2VkRGVjbGFyYXRpb25zID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByb3AgPSB2IGFzIHN0cmluZztcbiAgICAgICAgaWYgKGhhc1Bhc3NlZERlY2xhcmF0aW9ucykge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gaW5pdGlhbFN0eWxlRGVjbGFyYXRpb25zWysraV0gYXMgc3RyaW5nO1xuICAgICAgICAgIGluaXRpYWxTdHlsaW5nVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgIHN0eWxlc0xvb2t1cFtwcm9wXSA9IGluaXRpYWxTdHlsaW5nVmFsdWVzLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG90YWxTdHlsZURlY2xhcmF0aW9ucysrO1xuICAgICAgICAgIHN0eWxlc0xvb2t1cFtwcm9wXSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBtYWtlIHdoZXJlIHRoZSBjbGFzcyBvZmZzZXRzIGJlZ2luXG4gIGNvbnRleHRbU3R5bGluZ0luZGV4LkNsYXNzT2Zmc2V0UG9zaXRpb25dID0gdG90YWxTdHlsZURlY2xhcmF0aW9ucztcblxuICBpZiAoaW5pdGlhbENsYXNzRGVjbGFyYXRpb25zKSB7XG4gICAgbGV0IGhhc1Bhc3NlZERlY2xhcmF0aW9ucyA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbENsYXNzRGVjbGFyYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB2ID0gaW5pdGlhbENsYXNzRGVjbGFyYXRpb25zW2ldIGFzIHN0cmluZyB8IGJvb2xlYW4gfCBJbml0aWFsU3R5bGluZ0ZsYWdzO1xuICAgICAgLy8gdGhpcyBmbGFnIHZhbHVlIG1hcmtzIHdoZXJlIHRoZSBkZWNsYXJhdGlvbnMgZW5kIHRoZSBpbml0aWFsIHZhbHVlcyBiZWdpblxuICAgICAgaWYgKHYgPT09IEluaXRpYWxTdHlsaW5nRmxhZ3MuVkFMVUVTX01PREUpIHtcbiAgICAgICAgaGFzUGFzc2VkRGVjbGFyYXRpb25zID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHYgYXMgc3RyaW5nO1xuICAgICAgICBpZiAoaGFzUGFzc2VkRGVjbGFyYXRpb25zKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBpbml0aWFsQ2xhc3NEZWNsYXJhdGlvbnNbKytpXSBhcyBib29sZWFuO1xuICAgICAgICAgIGluaXRpYWxTdHlsaW5nVmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICAgIGNsYXNzZXNMb29rdXBbY2xhc3NOYW1lXSA9IGluaXRpYWxTdHlsaW5nVmFsdWVzLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xhc3Nlc0xvb2t1cFtjbGFzc05hbWVdID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0eWxlUHJvcHMgPSBPYmplY3Qua2V5cyhzdHlsZXNMb29rdXApO1xuICBjb25zdCBjbGFzc05hbWVzID0gT2JqZWN0LmtleXMoY2xhc3Nlc0xvb2t1cCk7XG4gIGNvbnN0IGNsYXNzTmFtZXNJbmRleFN0YXJ0ID0gc3R5bGVQcm9wcy5sZW5ndGg7XG4gIGNvbnN0IHRvdGFsUHJvcHMgPSBzdHlsZVByb3BzLmxlbmd0aCArIGNsYXNzTmFtZXMubGVuZ3RoO1xuXG4gIC8vICoyIGJlY2F1c2Ugd2UgYXJlIGZpbGxpbmcgZm9yIGJvdGggc2luZ2xlIGFuZCBtdWx0aSBzdHlsZSBzcGFjZXNcbiAgY29uc3QgbWF4TGVuZ3RoID0gdG90YWxQcm9wcyAqIFN0eWxpbmdJbmRleC5TaXplICogMiArIFN0eWxpbmdJbmRleC5TaW5nbGVTdHlsZXNTdGFydFBvc2l0aW9uO1xuXG4gIC8vIHdlIG5lZWQgdG8gZmlsbCB0aGUgYXJyYXkgZnJvbSB0aGUgc3RhcnQgc28gdGhhdCB3ZSBjYW4gYWNjZXNzXG4gIC8vIGJvdGggdGhlIG11bHRpIGFuZCB0aGUgc2luZ2xlIGFycmF5IHBvc2l0aW9ucyBpbiB0aGUgc2FtZSBsb29wIGJsb2NrXG4gIGZvciAobGV0IGkgPSBTdHlsaW5nSW5kZXguU2luZ2xlU3R5bGVzU3RhcnRQb3NpdGlvbjsgaSA8IG1heExlbmd0aDsgaSsrKSB7XG4gICAgY29udGV4dC5wdXNoKG51bGwpO1xuICB9XG5cbiAgY29uc3Qgc2luZ2xlU3RhcnQgPSBTdHlsaW5nSW5kZXguU2luZ2xlU3R5bGVzU3RhcnRQb3NpdGlvbjtcbiAgY29uc3QgbXVsdGlTdGFydCA9IHRvdGFsUHJvcHMgKiBTdHlsaW5nSW5kZXguU2l6ZSArIFN0eWxpbmdJbmRleC5TaW5nbGVTdHlsZXNTdGFydFBvc2l0aW9uO1xuXG4gIC8vIGZpbGwgc2luZ2xlIGFuZCBtdWx0aS1sZXZlbCBzdHlsZXNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbFByb3BzOyBpKyspIHtcbiAgICBjb25zdCBpc0NsYXNzQmFzZWQgPSBpID49IGNsYXNzTmFtZXNJbmRleFN0YXJ0O1xuICAgIGNvbnN0IHByb3AgPSBpc0NsYXNzQmFzZWQgPyBjbGFzc05hbWVzW2kgLSBjbGFzc05hbWVzSW5kZXhTdGFydF0gOiBzdHlsZVByb3BzW2ldO1xuICAgIGNvbnN0IGluZGV4Rm9ySW5pdGlhbCA9IGlzQ2xhc3NCYXNlZCA/IGNsYXNzZXNMb29rdXBbcHJvcF0gOiBzdHlsZXNMb29rdXBbcHJvcF07XG4gICAgY29uc3QgaW5pdGlhbFZhbHVlID0gaW5pdGlhbFN0eWxpbmdWYWx1ZXNbaW5kZXhGb3JJbml0aWFsXTtcblxuICAgIGNvbnN0IGluZGV4Rm9yTXVsdGkgPSBpICogU3R5bGluZ0luZGV4LlNpemUgKyBtdWx0aVN0YXJ0O1xuICAgIGNvbnN0IGluZGV4Rm9yU2luZ2xlID0gaSAqIFN0eWxpbmdJbmRleC5TaXplICsgc2luZ2xlU3RhcnQ7XG4gICAgY29uc3QgaW5pdGlhbEZsYWcgPSBwcmVwYXJlSW5pdGlhbEZsYWcocHJvcCwgaXNDbGFzc0Jhc2VkLCBzdHlsZVNhbml0aXplciB8fCBudWxsKTtcblxuICAgIHNldEZsYWcoY29udGV4dCwgaW5kZXhGb3JTaW5nbGUsIHBvaW50ZXJzKGluaXRpYWxGbGFnLCBpbmRleEZvckluaXRpYWwsIGluZGV4Rm9yTXVsdGkpKTtcbiAgICBzZXRQcm9wKGNvbnRleHQsIGluZGV4Rm9yU2luZ2xlLCBwcm9wKTtcbiAgICBzZXRWYWx1ZShjb250ZXh0LCBpbmRleEZvclNpbmdsZSwgbnVsbCk7XG5cbiAgICBjb25zdCBmbGFnRm9yTXVsdGkgPVxuICAgICAgICBpbml0aWFsRmxhZyB8IChpbml0aWFsVmFsdWUgIT09IG51bGwgPyBTdHlsaW5nRmxhZ3MuRGlydHkgOiBTdHlsaW5nRmxhZ3MuTm9uZSk7XG4gICAgc2V0RmxhZyhjb250ZXh0LCBpbmRleEZvck11bHRpLCBwb2ludGVycyhmbGFnRm9yTXVsdGksIGluZGV4Rm9ySW5pdGlhbCwgaW5kZXhGb3JTaW5nbGUpKTtcbiAgICBzZXRQcm9wKGNvbnRleHQsIGluZGV4Rm9yTXVsdGksIHByb3ApO1xuICAgIHNldFZhbHVlKGNvbnRleHQsIGluZGV4Rm9yTXVsdGksIG51bGwpO1xuICB9XG5cbiAgLy8gdGhlcmUgaXMgbm8gaW5pdGlhbCB2YWx1ZSBmbGFnIGZvciB0aGUgbWFzdGVyIGluZGV4IHNpbmNlIGl0IGRvZXNuJ3RcbiAgLy8gcmVmZXJlbmNlIGFuIGluaXRpYWwgc3R5bGUgdmFsdWVcbiAgc2V0RmxhZyhjb250ZXh0LCBTdHlsaW5nSW5kZXguTWFzdGVyRmxhZ1Bvc2l0aW9uLCBwb2ludGVycygwLCAwLCBtdWx0aVN0YXJ0KSk7XG4gIHNldENvbnRleHREaXJ0eShjb250ZXh0LCBpbml0aWFsU3R5bGluZ1ZhbHVlcy5sZW5ndGggPiAxKTtcblxuICByZXR1cm4gY29udGV4dDtcbn1cblxuY29uc3QgRU1QVFlfQVJSOiBhbnlbXSA9IFtdO1xuY29uc3QgRU1QVFlfT0JKOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuLyoqXG4gKiBTZXRzIGFuZCByZXNvbHZlcyBhbGwgYG11bHRpYCBzdHlsaW5nIG9uIGFuIGBTdHlsaW5nQ29udGV4dGAgc28gdGhhdCB0aGV5IGNhbiBiZVxuICogYXBwbGllZCB0byB0aGUgZWxlbWVudCBvbmNlIGByZW5kZXJTdHlsaW5nYCBpcyBjYWxsZWQuXG4gKlxuICogQWxsIG1pc3Npbmcgc3R5bGVzL2NsYXNzIChhbnkgdmFsdWVzIHRoYXQgYXJlIG5vdCBwcm92aWRlZCBpbiB0aGUgbmV3IGBzdHlsZXNgXG4gKiBvciBgY2xhc3Nlc2AgcGFyYW1zKSB3aWxsIHJlc29sdmUgdG8gYG51bGxgIHdpdGhpbiB0aGVpciByZXNwZWN0aXZlIHBvc2l0aW9uc1xuICogaW4gdGhlIGNvbnRleHQuXG4gKlxuICogQHBhcmFtIGNvbnRleHQgVGhlIHN0eWxpbmcgY29udGV4dCB0aGF0IHdpbGwgYmUgdXBkYXRlZCB3aXRoIHRoZVxuICogICAgbmV3bHkgcHJvdmlkZWQgc3R5bGUgdmFsdWVzLlxuICogQHBhcmFtIGNsYXNzZXMgVGhlIGtleS92YWx1ZSBtYXAgb2YgQ1NTIGNsYXNzIG5hbWVzIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0aGUgdXBkYXRlLlxuICogQHBhcmFtIHN0eWxlcyBUaGUga2V5L3ZhbHVlIG1hcCBvZiBDU1Mgc3R5bGVzIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0aGUgdXBkYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3R5bGluZ01hcChcbiAgICBjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgY2xhc3Nlczoge1trZXk6IHN0cmluZ106IGFueX0gfCBzdHJpbmcgfCBudWxsLFxuICAgIHN0eWxlcz86IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCk6IHZvaWQge1xuICBsZXQgY2xhc3NOYW1lczogc3RyaW5nW10gPSBFTVBUWV9BUlI7XG4gIGxldCBhcHBseUFsbENsYXNzZXMgPSBmYWxzZTtcbiAgbGV0IGlnbm9yZUFsbENsYXNzVXBkYXRlcyA9IGZhbHNlO1xuXG4gIC8vIGVhY2ggdGltZSBhIHN0cmluZy1iYXNlZCB2YWx1ZSBwb3BzIHVwIHRoZW4gaXQgc2hvdWxkbid0IHJlcXVpcmUgYSBkZWVwXG4gIC8vIGNoZWNrIG9mIHdoYXQncyBjaGFuZ2VkLlxuICBpZiAodHlwZW9mIGNsYXNzZXMgPT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBjYWNoZWRDbGFzc1N0cmluZyA9IGNvbnRleHRbU3R5bGluZ0luZGV4LkNhY2hlZENzc0NsYXNzU3RyaW5nXSBhcyBzdHJpbmcgfCBudWxsO1xuICAgIGlmIChjYWNoZWRDbGFzc1N0cmluZyAmJiBjYWNoZWRDbGFzc1N0cmluZyA9PT0gY2xhc3Nlcykge1xuICAgICAgaWdub3JlQWxsQ2xhc3NVcGRhdGVzID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGV4dFtTdHlsaW5nSW5kZXguQ2FjaGVkQ3NzQ2xhc3NTdHJpbmddID0gY2xhc3NlcztcbiAgICAgIGNsYXNzTmFtZXMgPSBjbGFzc2VzLnNwbGl0KC9cXHMrLyk7XG4gICAgICAvLyB0aGlzIGJvb2xlYW4gaXMgdXNlZCB0byBhdm9pZCBoYXZpbmcgdG8gY3JlYXRlIGEga2V5L3ZhbHVlIG1hcCBvZiBgdHJ1ZWAgdmFsdWVzXG4gICAgICAvLyBzaW5jZSBhIGNsYXNzbmFtZSBzdHJpbmcgaW1wbGllcyB0aGF0IGFsbCB0aG9zZSBjbGFzc2VzIGFyZSBhZGRlZFxuICAgICAgYXBwbHlBbGxDbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY2xhc3NOYW1lcyA9IGNsYXNzZXMgPyBPYmplY3Qua2V5cyhjbGFzc2VzKSA6IEVNUFRZX0FSUjtcbiAgICBjb250ZXh0W1N0eWxpbmdJbmRleC5DYWNoZWRDc3NDbGFzc1N0cmluZ10gPSBudWxsO1xuICB9XG5cbiAgY2xhc3NlcyA9IChjbGFzc2VzIHx8IEVNUFRZX09CSikgYXN7W2tleTogc3RyaW5nXTogYW55fTtcblxuICBjb25zdCBzdHlsZVByb3BzID0gc3R5bGVzID8gT2JqZWN0LmtleXMoc3R5bGVzKSA6IEVNUFRZX0FSUjtcbiAgc3R5bGVzID0gc3R5bGVzIHx8IEVNUFRZX09CSjtcblxuICBjb25zdCBjbGFzc2VzU3RhcnRJbmRleCA9IHN0eWxlUHJvcHMubGVuZ3RoO1xuICBjb25zdCBtdWx0aVN0YXJ0SW5kZXggPSBnZXRNdWx0aVN0YXJ0SW5kZXgoY29udGV4dCk7XG5cbiAgbGV0IGRpcnR5ID0gZmFsc2U7XG4gIGxldCBjdHhJbmRleCA9IG11bHRpU3RhcnRJbmRleDtcblxuICBsZXQgcHJvcEluZGV4ID0gMDtcbiAgY29uc3QgcHJvcExpbWl0ID0gc3R5bGVQcm9wcy5sZW5ndGggKyBjbGFzc05hbWVzLmxlbmd0aDtcblxuICAvLyB0aGUgbWFpbiBsb29wIGhlcmUgd2lsbCB0cnkgYW5kIGZpZ3VyZSBvdXQgaG93IHRoZSBzaGFwZSBvZiB0aGUgcHJvdmlkZWRcbiAgLy8gc3R5bGVzIGRpZmZlciB3aXRoIHJlc3BlY3QgdG8gdGhlIGNvbnRleHQuIExhdGVyIGlmIHRoZSBjb250ZXh0L3N0eWxlcy9jbGFzc2VzXG4gIC8vIGFyZSBvZmYtYmFsYW5jZSB0aGVuIHRoZXkgd2lsbCBiZSBkZWFsdCBpbiBhbm90aGVyIGxvb3AgYWZ0ZXIgdGhpcyBvbmVcbiAgd2hpbGUgKGN0eEluZGV4IDwgY29udGV4dC5sZW5ndGggJiYgcHJvcEluZGV4IDwgcHJvcExpbWl0KSB7XG4gICAgY29uc3QgaXNDbGFzc0Jhc2VkID0gcHJvcEluZGV4ID49IGNsYXNzZXNTdGFydEluZGV4O1xuXG4gICAgLy8gd2hlbiB0aGVyZSBpcyBhIGNhY2hlLWhpdCBmb3IgYSBzdHJpbmctYmFzZWQgY2xhc3MgdGhlbiB3ZSBzaG91bGRcbiAgICAvLyBhdm9pZCBkb2luZyBhbnkgd29yayBkaWZmaW5nIGFueSBvZiB0aGUgY2hhbmdlc1xuICAgIGlmICghaWdub3JlQWxsQ2xhc3NVcGRhdGVzIHx8ICFpc0NsYXNzQmFzZWQpIHtcbiAgICAgIGNvbnN0IGFkanVzdGVkUHJvcEluZGV4ID0gaXNDbGFzc0Jhc2VkID8gcHJvcEluZGV4IC0gY2xhc3Nlc1N0YXJ0SW5kZXggOiBwcm9wSW5kZXg7XG4gICAgICBjb25zdCBuZXdQcm9wOiBzdHJpbmcgPVxuICAgICAgICAgIGlzQ2xhc3NCYXNlZCA/IGNsYXNzTmFtZXNbYWRqdXN0ZWRQcm9wSW5kZXhdIDogc3R5bGVQcm9wc1thZGp1c3RlZFByb3BJbmRleF07XG4gICAgICBjb25zdCBuZXdWYWx1ZTogc3RyaW5nfGJvb2xlYW4gPVxuICAgICAgICAgIGlzQ2xhc3NCYXNlZCA/IChhcHBseUFsbENsYXNzZXMgPyB0cnVlIDogY2xhc3Nlc1tuZXdQcm9wXSkgOiBzdHlsZXNbbmV3UHJvcF07XG5cbiAgICAgIGNvbnN0IHByb3AgPSBnZXRQcm9wKGNvbnRleHQsIGN0eEluZGV4KTtcbiAgICAgIGlmIChwcm9wID09PSBuZXdQcm9wKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUoY29udGV4dCwgY3R4SW5kZXgpO1xuICAgICAgICBjb25zdCBmbGFnID0gZ2V0UG9pbnRlcnMoY29udGV4dCwgY3R4SW5kZXgpO1xuICAgICAgICBpZiAoaGFzVmFsdWVDaGFuZ2VkKGZsYWcsIHZhbHVlLCBuZXdWYWx1ZSkpIHtcbiAgICAgICAgICBzZXRWYWx1ZShjb250ZXh0LCBjdHhJbmRleCwgbmV3VmFsdWUpO1xuXG4gICAgICAgICAgY29uc3QgaW5pdGlhbFZhbHVlID0gZ2V0SW5pdGlhbFZhbHVlKGNvbnRleHQsIGZsYWcpO1xuXG4gICAgICAgICAgLy8gdGhlcmUgaXMgbm8gcG9pbnQgaW4gc2V0dGluZyB0aGlzIHRvIGRpcnR5IGlmIHRoZSBwcmV2aW91c2x5XG4gICAgICAgICAgLy8gcmVuZGVyZWQgdmFsdWUgd2FzIGJlaW5nIHJlZmVyZW5jZWQgYnkgdGhlIGluaXRpYWwgc3R5bGUgKG9yIG51bGwpXG4gICAgICAgICAgaWYgKGluaXRpYWxWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHNldERpcnR5KGNvbnRleHQsIGN0eEluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGluZGV4T2ZFbnRyeSA9IGZpbmRFbnRyeVBvc2l0aW9uQnlQcm9wKGNvbnRleHQsIG5ld1Byb3AsIGN0eEluZGV4KTtcbiAgICAgICAgaWYgKGluZGV4T2ZFbnRyeSA+IDApIHtcbiAgICAgICAgICAvLyBpdCB3YXMgZm91bmQgYXQgYSBsYXRlciBwb2ludCAuLi4ganVzdCBzd2FwIHRoZSB2YWx1ZXNcbiAgICAgICAgICBjb25zdCB2YWx1ZVRvQ29tcGFyZSA9IGdldFZhbHVlKGNvbnRleHQsIGluZGV4T2ZFbnRyeSk7XG4gICAgICAgICAgY29uc3QgZmxhZ1RvQ29tcGFyZSA9IGdldFBvaW50ZXJzKGNvbnRleHQsIGluZGV4T2ZFbnRyeSk7XG4gICAgICAgICAgc3dhcE11bHRpQ29udGV4dEVudHJpZXMoY29udGV4dCwgY3R4SW5kZXgsIGluZGV4T2ZFbnRyeSk7XG4gICAgICAgICAgaWYgKHZhbHVlVG9Db21wYXJlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFZhbHVlID0gZ2V0SW5pdGlhbFZhbHVlKGNvbnRleHQsIGZsYWdUb0NvbXBhcmUpO1xuICAgICAgICAgICAgc2V0VmFsdWUoY29udGV4dCwgY3R4SW5kZXgsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpbml0aWFsVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIHNldERpcnR5KGNvbnRleHQsIGN0eEluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3ZSBvbmx5IGNhcmUgdG8gZG8gdGhpcyBpZiB0aGUgaW5zZXJ0aW9uIGlzIGluIHRoZSBtaWRkbGVcbiAgICAgICAgICBjb25zdCBuZXdGbGFnID0gcHJlcGFyZUluaXRpYWxGbGFnKG5ld1Byb3AsIGlzQ2xhc3NCYXNlZCwgZ2V0U3R5bGVTYW5pdGl6ZXIoY29udGV4dCkpO1xuICAgICAgICAgIGluc2VydE5ld011bHRpUHJvcGVydHkoY29udGV4dCwgY3R4SW5kZXgsIGlzQ2xhc3NCYXNlZCwgbmV3UHJvcCwgbmV3RmxhZywgbmV3VmFsdWUpO1xuICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGN0eEluZGV4ICs9IFN0eWxpbmdJbmRleC5TaXplO1xuICAgIHByb3BJbmRleCsrO1xuICB9XG5cbiAgLy8gdGhpcyBtZWFucyB0aGF0IHRoZXJlIGFyZSBsZWZ0LW92ZXIgdmFsdWVzIGluIHRoZSBjb250ZXh0IHRoYXRcbiAgLy8gd2VyZSBub3QgaW5jbHVkZWQgaW4gdGhlIHByb3ZpZGVkIHN0eWxlcy9jbGFzc2VzIGFuZCBpbiB0aGlzXG4gIC8vIGNhc2UgdGhlICBnb2FsIGlzIHRvIFwicmVtb3ZlXCIgdGhlbSBmcm9tIHRoZSBjb250ZXh0IChieSBudWxsaWZ5aW5nKVxuICB3aGlsZSAoY3R4SW5kZXggPCBjb250ZXh0Lmxlbmd0aCkge1xuICAgIGNvbnN0IGZsYWcgPSBnZXRQb2ludGVycyhjb250ZXh0LCBjdHhJbmRleCk7XG4gICAgY29uc3QgaXNDbGFzc0Jhc2VkID0gKGZsYWcgJiBTdHlsaW5nRmxhZ3MuQ2xhc3MpID09PSBTdHlsaW5nRmxhZ3MuQ2xhc3M7XG4gICAgaWYgKGlnbm9yZUFsbENsYXNzVXBkYXRlcyAmJiBpc0NsYXNzQmFzZWQpIGJyZWFrO1xuXG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZShjb250ZXh0LCBjdHhJbmRleCk7XG4gICAgY29uc3QgZG9SZW1vdmVWYWx1ZSA9IHZhbHVlRXhpc3RzKHZhbHVlLCBpc0NsYXNzQmFzZWQpO1xuICAgIGlmIChkb1JlbW92ZVZhbHVlKSB7XG4gICAgICBzZXREaXJ0eShjb250ZXh0LCBjdHhJbmRleCwgdHJ1ZSk7XG4gICAgICBzZXRWYWx1ZShjb250ZXh0LCBjdHhJbmRleCwgbnVsbCk7XG4gICAgICBkaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIGN0eEluZGV4ICs9IFN0eWxpbmdJbmRleC5TaXplO1xuICB9XG5cbiAgLy8gdGhpcyBtZWFucyB0aGF0IHRoZXJlIGFyZSBsZWZ0LW92ZXIgcHJvcGVydGllcyBpbiB0aGUgY29udGV4dCB0aGF0XG4gIC8vIHdlcmUgbm90IGRldGVjdGVkIGluIHRoZSBjb250ZXh0IGR1cmluZyB0aGUgbG9vcCBhYm92ZS4gSW4gdGhhdFxuICAvLyBjYXNlIHdlIHdhbnQgdG8gYWRkIHRoZSBuZXcgZW50cmllcyBpbnRvIHRoZSBsaXN0XG4gIGNvbnN0IHNhbml0aXplciA9IGdldFN0eWxlU2FuaXRpemVyKGNvbnRleHQpO1xuICB3aGlsZSAocHJvcEluZGV4IDwgcHJvcExpbWl0KSB7XG4gICAgY29uc3QgaXNDbGFzc0Jhc2VkID0gcHJvcEluZGV4ID49IGNsYXNzZXNTdGFydEluZGV4O1xuICAgIGlmIChpZ25vcmVBbGxDbGFzc1VwZGF0ZXMgJiYgaXNDbGFzc0Jhc2VkKSBicmVhaztcblxuICAgIGNvbnN0IGFkanVzdGVkUHJvcEluZGV4ID0gaXNDbGFzc0Jhc2VkID8gcHJvcEluZGV4IC0gY2xhc3Nlc1N0YXJ0SW5kZXggOiBwcm9wSW5kZXg7XG4gICAgY29uc3QgcHJvcCA9IGlzQ2xhc3NCYXNlZCA/IGNsYXNzTmFtZXNbYWRqdXN0ZWRQcm9wSW5kZXhdIDogc3R5bGVQcm9wc1thZGp1c3RlZFByb3BJbmRleF07XG4gICAgY29uc3QgdmFsdWU6IHN0cmluZ3xib29sZWFuID1cbiAgICAgICAgaXNDbGFzc0Jhc2VkID8gKGFwcGx5QWxsQ2xhc3NlcyA/IHRydWUgOiBjbGFzc2VzW3Byb3BdKSA6IHN0eWxlc1twcm9wXTtcbiAgICBjb25zdCBmbGFnID0gcHJlcGFyZUluaXRpYWxGbGFnKHByb3AsIGlzQ2xhc3NCYXNlZCwgc2FuaXRpemVyKSB8IFN0eWxpbmdGbGFncy5EaXJ0eTtcbiAgICBjb250ZXh0LnB1c2goZmxhZywgcHJvcCwgdmFsdWUpO1xuICAgIHByb3BJbmRleCsrO1xuICAgIGRpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIGlmIChkaXJ0eSkge1xuICAgIHNldENvbnRleHREaXJ0eShjb250ZXh0LCB0cnVlKTtcbiAgfVxufVxuXG4vKipcbiAqIFNldHMgYW5kIHJlc29sdmVzIGEgc2luZ2xlIHN0eWxpbmcgcHJvcGVydHkvdmFsdWUgb24gdGhlIHByb3ZpZGVkIGBTdHlsaW5nQ29udGV4dGAgc29cbiAqIHRoYXQgdGhleSBjYW4gYmUgYXBwbGllZCB0byB0aGUgZWxlbWVudCBvbmNlIGByZW5kZXJTdHlsaW5nYCBpcyBjYWxsZWQuXG4gKlxuICogTm90ZSB0aGF0IHByb3AtbGV2ZWwgc3R5bGluZyB2YWx1ZXMgYXJlIGNvbnNpZGVyZWQgaGlnaGVyIHByaW9yaXR5IHRoYW4gYW55IHN0eWxpbmcgdGhhdFxuICogaGFzIGJlZW4gYXBwbGllZCB1c2luZyBgdXBkYXRlU3R5bGluZ01hcGAsIHRoZXJlZm9yZSwgd2hlbiBzdHlsaW5nIHZhbHVlcyBhcmUgcmVuZGVyZWRcbiAqIHRoZW4gYW55IHN0eWxlcy9jbGFzc2VzIHRoYXQgaGF2ZSBiZWVuIGFwcGxpZWQgdXNpbmcgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNvbnNpZGVyZWQgZmlyc3RcbiAqICh0aGVuIG11bHRpIHZhbHVlcyBzZWNvbmQgYW5kIHRoZW4gaW5pdGlhbCB2YWx1ZXMgYXMgYSBiYWNrdXApLlxuICpcbiAqIEBwYXJhbSBjb250ZXh0IFRoZSBzdHlsaW5nIGNvbnRleHQgdGhhdCB3aWxsIGJlIHVwZGF0ZWQgd2l0aCB0aGVcbiAqICAgIG5ld2x5IHByb3ZpZGVkIHN0eWxlIHZhbHVlLlxuICogQHBhcmFtIGluZGV4IFRoZSBpbmRleCBvZiB0aGUgcHJvcGVydHkgd2hpY2ggaXMgYmVpbmcgdXBkYXRlZC5cbiAqIEBwYXJhbSB2YWx1ZSBUaGUgQ1NTIHN0eWxlIHZhbHVlIHRoYXQgd2lsbCBiZSBhc3NpZ25lZFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3R5bGVQcm9wKFxuICAgIGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyLCB2YWx1ZTogc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwpOiB2b2lkIHtcbiAgY29uc3Qgc2luZ2xlSW5kZXggPSBTdHlsaW5nSW5kZXguU2luZ2xlU3R5bGVzU3RhcnRQb3NpdGlvbiArIGluZGV4ICogU3R5bGluZ0luZGV4LlNpemU7XG4gIGNvbnN0IGN1cnJWYWx1ZSA9IGdldFZhbHVlKGNvbnRleHQsIHNpbmdsZUluZGV4KTtcbiAgY29uc3QgY3VyckZsYWcgPSBnZXRQb2ludGVycyhjb250ZXh0LCBzaW5nbGVJbmRleCk7XG5cbiAgLy8gZGlkbid0IGNoYW5nZSAuLi4gbm90aGluZyB0byBtYWtlIGEgbm90ZSBvZlxuICBpZiAoaGFzVmFsdWVDaGFuZ2VkKGN1cnJGbGFnLCBjdXJyVmFsdWUsIHZhbHVlKSkge1xuICAgIC8vIHRoZSB2YWx1ZSB3aWxsIGFsd2F5cyBnZXQgdXBkYXRlZCAoZXZlbiBpZiB0aGUgZGlydHkgZmxhZyBpcyBza2lwcGVkKVxuICAgIHNldFZhbHVlKGNvbnRleHQsIHNpbmdsZUluZGV4LCB2YWx1ZSk7XG4gICAgY29uc3QgaW5kZXhGb3JNdWx0aSA9IGdldE11bHRpT3JTaW5nbGVJbmRleChjdXJyRmxhZyk7XG5cbiAgICAvLyBpZiB0aGUgdmFsdWUgaXMgdGhlIHNhbWUgaW4gdGhlIG11bHRpLWFyZWEgdGhlbiB0aGVyZSdzIG5vIHBvaW50IGluIHJlLWFzc2VtYmxpbmdcbiAgICBjb25zdCB2YWx1ZUZvck11bHRpID0gZ2V0VmFsdWUoY29udGV4dCwgaW5kZXhGb3JNdWx0aSk7XG4gICAgaWYgKCF2YWx1ZUZvck11bHRpIHx8IHZhbHVlRm9yTXVsdGkgIT09IHZhbHVlKSB7XG4gICAgICBsZXQgbXVsdGlEaXJ0eSA9IGZhbHNlO1xuICAgICAgbGV0IHNpbmdsZURpcnR5ID0gdHJ1ZTtcblxuICAgICAgY29uc3QgaXNDbGFzc0Jhc2VkID0gKGN1cnJGbGFnICYgU3R5bGluZ0ZsYWdzLkNsYXNzKSA9PT0gU3R5bGluZ0ZsYWdzLkNsYXNzO1xuXG4gICAgICAvLyBvbmx5IHdoZW4gdGhlIHZhbHVlIGlzIHNldCB0byBgbnVsbGAgc2hvdWxkIHRoZSBtdWx0aS12YWx1ZSBnZXQgZmxhZ2dlZFxuICAgICAgaWYgKCF2YWx1ZUV4aXN0cyh2YWx1ZSwgaXNDbGFzc0Jhc2VkKSAmJiB2YWx1ZUV4aXN0cyh2YWx1ZUZvck11bHRpLCBpc0NsYXNzQmFzZWQpKSB7XG4gICAgICAgIG11bHRpRGlydHkgPSB0cnVlO1xuICAgICAgICBzaW5nbGVEaXJ0eSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBzZXREaXJ0eShjb250ZXh0LCBpbmRleEZvck11bHRpLCBtdWx0aURpcnR5KTtcbiAgICAgIHNldERpcnR5KGNvbnRleHQsIHNpbmdsZUluZGV4LCBzaW5nbGVEaXJ0eSk7XG4gICAgICBzZXRDb250ZXh0RGlydHkoY29udGV4dCwgdHJ1ZSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2Qgd2lsbCB0b2dnbGUgdGhlIHJlZmVyZW5jZWQgQ1NTIGNsYXNzIChieSB0aGUgcHJvdmlkZWQgaW5kZXgpXG4gKiB3aXRoaW4gdGhlIGdpdmVuIGNvbnRleHQuXG4gKlxuICogQHBhcmFtIGNvbnRleHQgVGhlIHN0eWxpbmcgY29udGV4dCB0aGF0IHdpbGwgYmUgdXBkYXRlZCB3aXRoIHRoZVxuICogICAgbmV3bHkgcHJvdmlkZWQgY2xhc3MgdmFsdWUuXG4gKiBAcGFyYW0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBDU1MgY2xhc3Mgd2hpY2ggaXMgYmVpbmcgdXBkYXRlZC5cbiAqIEBwYXJhbSBhZGRPclJlbW92ZSBXaGV0aGVyIG9yIG5vdCB0byBhZGQgb3IgcmVtb3ZlIHRoZSBDU1MgY2xhc3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNsYXNzUHJvcChcbiAgICBjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlciwgYWRkT3JSZW1vdmU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgY29uc3QgYWRqdXN0ZWRJbmRleCA9IGluZGV4ICsgY29udGV4dFtTdHlsaW5nSW5kZXguQ2xhc3NPZmZzZXRQb3NpdGlvbl07XG4gIHVwZGF0ZVN0eWxlUHJvcChjb250ZXh0LCBhZGp1c3RlZEluZGV4LCBhZGRPclJlbW92ZSk7XG59XG5cbi8qKlxuICogUmVuZGVycyBhbGwgcXVldWVkIHN0eWxpbmcgdXNpbmcgYSByZW5kZXJlciBvbnRvIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd29ya3MgYnkgcmVuZGVyaW5nIGFueSBzdHlsZXMgKHRoYXQgaGF2ZSBiZWVuIGFwcGxpZWRcbiAqIHVzaW5nIGB1cGRhdGVTdHlsaW5nTWFwYCkgYW5kIGFueSBjbGFzc2VzICh0aGF0IGhhdmUgYmVlbiBhcHBsaWVkIHVzaW5nXG4gKiBgdXBkYXRlU3R5bGVQcm9wYCkgb250byB0aGUgcHJvdmlkZWQgZWxlbWVudCB1c2luZyB0aGUgcHJvdmlkZWQgcmVuZGVyZXIuXG4gKiBKdXN0IGJlZm9yZSB0aGUgc3R5bGVzL2NsYXNzZXMgYXJlIHJlbmRlcmVkIGEgZmluYWwga2V5L3ZhbHVlIHN0eWxlIG1hcFxuICogd2lsbCBiZSBhc3NlbWJsZWQgKGlmIGBzdHlsZVN0b3JlYCBvciBgY2xhc3NTdG9yZWAgYXJlIHByb3ZpZGVkKS5cbiAqXG4gKiBAcGFyYW0gbEVsZW1lbnQgdGhlIGVsZW1lbnQgdGhhdCB0aGUgc3R5bGVzIHdpbGwgYmUgcmVuZGVyZWQgb25cbiAqIEBwYXJhbSBjb250ZXh0IFRoZSBzdHlsaW5nIGNvbnRleHQgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lXG4gKiAgICAgIHdoYXQgc3R5bGVzIHdpbGwgYmUgcmVuZGVyZWRcbiAqIEBwYXJhbSByZW5kZXJlciB0aGUgcmVuZGVyZXIgdGhhdCB3aWxsIGJlIHVzZWQgdG8gYXBwbHkgdGhlIHN0eWxpbmdcbiAqIEBwYXJhbSBzdHlsZVN0b3JlIGlmIHByb3ZpZGVkLCB0aGUgdXBkYXRlZCBzdHlsZSB2YWx1ZXMgd2lsbCBiZSBhcHBsaWVkXG4gKiAgICB0byB0aGlzIGtleS92YWx1ZSBtYXAgaW5zdGVhZCBvZiBiZWluZyByZW5kZXJlcmVkIHZpYSB0aGUgcmVuZGVyZXIuXG4gKiBAcGFyYW0gY2xhc3NTdG9yZSBpZiBwcm92aWRlZCwgdGhlIHVwZGF0ZWQgY2xhc3MgdmFsdWVzIHdpbGwgYmUgYXBwbGllZFxuICogICAgdG8gdGhpcyBrZXkvdmFsdWUgbWFwIGluc3RlYWQgb2YgYmVpbmcgcmVuZGVyZXJlZCB2aWEgdGhlIHJlbmRlcmVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU3R5bGluZyhcbiAgICBjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgcmVuZGVyZXI6IFJlbmRlcmVyMywgc3R5bGVTdG9yZT86IHtba2V5OiBzdHJpbmddOiBhbnl9LFxuICAgIGNsYXNzU3RvcmU/OiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0pIHtcbiAgaWYgKGlzQ29udGV4dERpcnR5KGNvbnRleHQpKSB7XG4gICAgY29uc3QgbmF0aXZlID0gY29udGV4dFtTdHlsaW5nSW5kZXguRWxlbWVudFBvc2l0aW9uXSAhLm5hdGl2ZTtcbiAgICBjb25zdCBtdWx0aVN0YXJ0SW5kZXggPSBnZXRNdWx0aVN0YXJ0SW5kZXgoY29udGV4dCk7XG4gICAgY29uc3Qgc3R5bGVTYW5pdGl6ZXIgPSBnZXRTdHlsZVNhbml0aXplcihjb250ZXh0KTtcbiAgICBmb3IgKGxldCBpID0gU3R5bGluZ0luZGV4LlNpbmdsZVN0eWxlc1N0YXJ0UG9zaXRpb247IGkgPCBjb250ZXh0Lmxlbmd0aDtcbiAgICAgICAgIGkgKz0gU3R5bGluZ0luZGV4LlNpemUpIHtcbiAgICAgIC8vIHRoZXJlIGlzIG5vIHBvaW50IGluIHJlbmRlcmluZyBzdHlsZXMgdGhhdCBoYXZlIG5vdCBjaGFuZ2VkIG9uIHNjcmVlblxuICAgICAgaWYgKGlzRGlydHkoY29udGV4dCwgaSkpIHtcbiAgICAgICAgY29uc3QgcHJvcCA9IGdldFByb3AoY29udGV4dCwgaSk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUoY29udGV4dCwgaSk7XG4gICAgICAgIGNvbnN0IGZsYWcgPSBnZXRQb2ludGVycyhjb250ZXh0LCBpKTtcbiAgICAgICAgY29uc3QgaXNDbGFzc0Jhc2VkID0gZmxhZyAmIFN0eWxpbmdGbGFncy5DbGFzcyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgY29uc3QgaXNJblNpbmdsZVJlZ2lvbiA9IGkgPCBtdWx0aVN0YXJ0SW5kZXg7XG5cbiAgICAgICAgbGV0IHZhbHVlVG9BcHBseTogc3RyaW5nfGJvb2xlYW58bnVsbCA9IHZhbHVlO1xuXG4gICAgICAgIC8vIFZBTFVFIERFRkVSIENBU0UgMTogVXNlIGEgbXVsdGkgdmFsdWUgaW5zdGVhZCBvZiBhIG51bGwgc2luZ2xlIHZhbHVlXG4gICAgICAgIC8vIHRoaXMgY2hlY2sgaW1wbGllcyB0aGF0IGEgc2luZ2xlIHZhbHVlIHdhcyByZW1vdmVkIGFuZCB3ZVxuICAgICAgICAvLyBzaG91bGQgbm93IGRlZmVyIHRvIGEgbXVsdGkgdmFsdWUgYW5kIHVzZSB0aGF0IChpZiBzZXQpLlxuICAgICAgICBpZiAoaXNJblNpbmdsZVJlZ2lvbiAmJiAhdmFsdWVFeGlzdHModmFsdWVUb0FwcGx5LCBpc0NsYXNzQmFzZWQpKSB7XG4gICAgICAgICAgLy8gc2luZ2xlIHZhbHVlcyBBTFdBWVMgaGF2ZSBhIHJlZmVyZW5jZSB0byBhIG11bHRpIGluZGV4XG4gICAgICAgICAgY29uc3QgbXVsdGlJbmRleCA9IGdldE11bHRpT3JTaW5nbGVJbmRleChmbGFnKTtcbiAgICAgICAgICB2YWx1ZVRvQXBwbHkgPSBnZXRWYWx1ZShjb250ZXh0LCBtdWx0aUluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFZBTFVFIERFRkVSIENBU0UgMjogVXNlIHRoZSBpbml0aWFsIHZhbHVlIGlmIGFsbCBlbHNlIGZhaWxzIChpcyBmYWxzeSlcbiAgICAgICAgLy8gdGhlIGluaXRpYWwgdmFsdWUgd2lsbCBhbHdheXMgYmUgYSBzdHJpbmcgb3IgbnVsbCxcbiAgICAgICAgLy8gdGhlcmVmb3JlIHdlIGNhbiBzYWZlbHkgYWRvcHQgaXQgaW5jYXNlIHRoZXJlJ3Mgbm90aGluZyBlbHNlXG4gICAgICAgIC8vIG5vdGUgdGhhdCB0aGlzIHNob3VsZCBhbHdheXMgYmUgYSBmYWxzeSBjaGVjayBzaW5jZSBgZmFsc2VgIGlzIHVzZWRcbiAgICAgICAgLy8gZm9yIGJvdGggY2xhc3MgYW5kIHN0eWxlIGNvbXBhcmlzb25zIChzdHlsZXMgY2FuJ3QgYmUgZmFsc2UgYW5kIGZhbHNlXG4gICAgICAgIC8vIGNsYXNzZXMgYXJlIHR1cm5lZCBvZmYgYW5kIHNob3VsZCB0aGVyZWZvcmUgZGVmZXIgdG8gdGhlaXIgaW5pdGlhbCB2YWx1ZXMpXG4gICAgICAgIGlmICghdmFsdWVFeGlzdHModmFsdWVUb0FwcGx5LCBpc0NsYXNzQmFzZWQpKSB7XG4gICAgICAgICAgdmFsdWVUb0FwcGx5ID0gZ2V0SW5pdGlhbFZhbHVlKGNvbnRleHQsIGZsYWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQ2xhc3NCYXNlZCkge1xuICAgICAgICAgIHNldENsYXNzKG5hdGl2ZSwgcHJvcCwgdmFsdWVUb0FwcGx5ID8gdHJ1ZSA6IGZhbHNlLCByZW5kZXJlciwgY2xhc3NTdG9yZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2FuaXRpemVyID0gKGZsYWcgJiBTdHlsaW5nRmxhZ3MuU2FuaXRpemUpID8gc3R5bGVTYW5pdGl6ZXIgOiBudWxsO1xuICAgICAgICAgIHNldFN0eWxlKG5hdGl2ZSwgcHJvcCwgdmFsdWVUb0FwcGx5IGFzIHN0cmluZyB8IG51bGwsIHJlbmRlcmVyLCBzYW5pdGl6ZXIsIHN0eWxlU3RvcmUpO1xuICAgICAgICB9XG4gICAgICAgIHNldERpcnR5KGNvbnRleHQsIGksIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRDb250ZXh0RGlydHkoY29udGV4dCwgZmFsc2UpO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiByZW5kZXJzIGEgZ2l2ZW4gQ1NTIHByb3AvdmFsdWUgZW50cnkgdXNpbmcgdGhlXG4gKiBwcm92aWRlZCByZW5kZXJlci4gSWYgYSBgc3RvcmVgIHZhbHVlIGlzIHByb3ZpZGVkIHRoZW5cbiAqIHRoYXQgd2lsbCBiZSB1c2VkIGEgcmVuZGVyIGNvbnRleHQgaW5zdGVhZCBvZiB0aGUgcHJvdmlkZWRcbiAqIHJlbmRlcmVyLlxuICpcbiAqIEBwYXJhbSBuYXRpdmUgdGhlIERPTSBFbGVtZW50XG4gKiBAcGFyYW0gcHJvcCB0aGUgQ1NTIHN0eWxlIHByb3BlcnR5IHRoYXQgd2lsbCBiZSByZW5kZXJlZFxuICogQHBhcmFtIHZhbHVlIHRoZSBDU1Mgc3R5bGUgdmFsdWUgdGhhdCB3aWxsIGJlIHJlbmRlcmVkXG4gKiBAcGFyYW0gcmVuZGVyZXJcbiAqIEBwYXJhbSBzdG9yZSBhbiBvcHRpb25hbCBrZXkvdmFsdWUgbWFwIHRoYXQgd2lsbCBiZSB1c2VkIGFzIGEgY29udGV4dCB0byByZW5kZXIgc3R5bGVzIG9uXG4gKi9cbmZ1bmN0aW9uIHNldFN0eWxlKFxuICAgIG5hdGl2ZTogYW55LCBwcm9wOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudWxsLCByZW5kZXJlcjogUmVuZGVyZXIzLFxuICAgIHNhbml0aXplcjogU3R5bGVTYW5pdGl6ZUZuIHwgbnVsbCwgc3RvcmU/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICB2YWx1ZSA9IHNhbml0aXplciAmJiB2YWx1ZSA/IHNhbml0aXplcihwcm9wLCB2YWx1ZSkgOiB2YWx1ZTtcbiAgaWYgKHN0b3JlKSB7XG4gICAgc3RvcmVbcHJvcF0gPSB2YWx1ZTtcbiAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgIG5nRGV2TW9kZSAmJiBuZ0Rldk1vZGUucmVuZGVyZXJTZXRTdHlsZSsrO1xuICAgIGlzUHJvY2VkdXJhbFJlbmRlcmVyKHJlbmRlcmVyKSA/XG4gICAgICAgIHJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZSwgcHJvcCwgdmFsdWUsIFJlbmRlcmVyU3R5bGVGbGFnczMuRGFzaENhc2UpIDpcbiAgICAgICAgbmF0aXZlWydzdHlsZSddLnNldFByb3BlcnR5KHByb3AsIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBuZ0Rldk1vZGUgJiYgbmdEZXZNb2RlLnJlbmRlcmVyUmVtb3ZlU3R5bGUrKztcbiAgICBpc1Byb2NlZHVyYWxSZW5kZXJlcihyZW5kZXJlcikgP1xuICAgICAgICByZW5kZXJlci5yZW1vdmVTdHlsZShuYXRpdmUsIHByb3AsIFJlbmRlcmVyU3R5bGVGbGFnczMuRGFzaENhc2UpIDpcbiAgICAgICAgbmF0aXZlWydzdHlsZSddLnJlbW92ZVByb3BlcnR5KHByb3ApO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiByZW5kZXJzIGEgZ2l2ZW4gQ1NTIGNsYXNzIHZhbHVlIHVzaW5nIHRoZSBwcm92aWRlZFxuICogcmVuZGVyZXIgKGJ5IGFkZGluZyBvciByZW1vdmluZyBpdCBmcm9tIHRoZSBwcm92aWRlZCBlbGVtZW50KS5cbiAqIElmIGEgYHN0b3JlYCB2YWx1ZSBpcyBwcm92aWRlZCB0aGVuIHRoYXQgd2lsbCBiZSB1c2VkIGEgcmVuZGVyXG4gKiBjb250ZXh0IGluc3RlYWQgb2YgdGhlIHByb3ZpZGVkIHJlbmRlcmVyLlxuICpcbiAqIEBwYXJhbSBuYXRpdmUgdGhlIERPTSBFbGVtZW50XG4gKiBAcGFyYW0gcHJvcCB0aGUgQ1NTIHN0eWxlIHByb3BlcnR5IHRoYXQgd2lsbCBiZSByZW5kZXJlZFxuICogQHBhcmFtIHZhbHVlIHRoZSBDU1Mgc3R5bGUgdmFsdWUgdGhhdCB3aWxsIGJlIHJlbmRlcmVkXG4gKiBAcGFyYW0gcmVuZGVyZXJcbiAqIEBwYXJhbSBzdG9yZSBhbiBvcHRpb25hbCBrZXkvdmFsdWUgbWFwIHRoYXQgd2lsbCBiZSB1c2VkIGFzIGEgY29udGV4dCB0byByZW5kZXIgc3R5bGVzIG9uXG4gKi9cbmZ1bmN0aW9uIHNldENsYXNzKFxuICAgIG5hdGl2ZTogYW55LCBjbGFzc05hbWU6IHN0cmluZywgYWRkOiBib29sZWFuLCByZW5kZXJlcjogUmVuZGVyZXIzLFxuICAgIHN0b3JlPzoge1trZXk6IHN0cmluZ106IGJvb2xlYW59KSB7XG4gIGlmIChzdG9yZSkge1xuICAgIHN0b3JlW2NsYXNzTmFtZV0gPSBhZGQ7XG4gIH0gZWxzZSBpZiAoYWRkKSB7XG4gICAgbmdEZXZNb2RlICYmIG5nRGV2TW9kZS5yZW5kZXJlckFkZENsYXNzKys7XG4gICAgaXNQcm9jZWR1cmFsUmVuZGVyZXIocmVuZGVyZXIpID8gcmVuZGVyZXIuYWRkQ2xhc3MobmF0aXZlLCBjbGFzc05hbWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVbJ2NsYXNzTGlzdCddLmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIG5nRGV2TW9kZSAmJiBuZ0Rldk1vZGUucmVuZGVyZXJSZW1vdmVDbGFzcysrO1xuICAgIGlzUHJvY2VkdXJhbFJlbmRlcmVyKHJlbmRlcmVyKSA/IHJlbmRlcmVyLnJlbW92ZUNsYXNzKG5hdGl2ZSwgY2xhc3NOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlWydjbGFzc0xpc3QnXS5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXREaXJ0eShjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlciwgaXNEaXJ0eVllczogYm9vbGVhbikge1xuICBjb25zdCBhZGp1c3RlZEluZGV4ID1cbiAgICAgIGluZGV4ID49IFN0eWxpbmdJbmRleC5TaW5nbGVTdHlsZXNTdGFydFBvc2l0aW9uID8gKGluZGV4ICsgU3R5bGluZ0luZGV4LkZsYWdzT2Zmc2V0KSA6IGluZGV4O1xuICBpZiAoaXNEaXJ0eVllcykge1xuICAgIChjb250ZXh0W2FkanVzdGVkSW5kZXhdIGFzIG51bWJlcikgfD0gU3R5bGluZ0ZsYWdzLkRpcnR5O1xuICB9IGVsc2Uge1xuICAgIChjb250ZXh0W2FkanVzdGVkSW5kZXhdIGFzIG51bWJlcikgJj0gflN0eWxpbmdGbGFncy5EaXJ0eTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0RpcnR5KGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gIGNvbnN0IGFkanVzdGVkSW5kZXggPVxuICAgICAgaW5kZXggPj0gU3R5bGluZ0luZGV4LlNpbmdsZVN0eWxlc1N0YXJ0UG9zaXRpb24gPyAoaW5kZXggKyBTdHlsaW5nSW5kZXguRmxhZ3NPZmZzZXQpIDogaW5kZXg7XG4gIHJldHVybiAoKGNvbnRleHRbYWRqdXN0ZWRJbmRleF0gYXMgbnVtYmVyKSAmIFN0eWxpbmdGbGFncy5EaXJ0eSkgPT0gU3R5bGluZ0ZsYWdzLkRpcnR5O1xufVxuXG5mdW5jdGlvbiBpc0NsYXNzQmFzZWQoY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgY29uc3QgYWRqdXN0ZWRJbmRleCA9XG4gICAgICBpbmRleCA+PSBTdHlsaW5nSW5kZXguU2luZ2xlU3R5bGVzU3RhcnRQb3NpdGlvbiA/IChpbmRleCArIFN0eWxpbmdJbmRleC5GbGFnc09mZnNldCkgOiBpbmRleDtcbiAgcmV0dXJuICgoY29udGV4dFthZGp1c3RlZEluZGV4XSBhcyBudW1iZXIpICYgU3R5bGluZ0ZsYWdzLkNsYXNzKSA9PSBTdHlsaW5nRmxhZ3MuQ2xhc3M7XG59XG5cbmZ1bmN0aW9uIGlzU2FuaXRpemFibGUoY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgY29uc3QgYWRqdXN0ZWRJbmRleCA9XG4gICAgICBpbmRleCA+PSBTdHlsaW5nSW5kZXguU2luZ2xlU3R5bGVzU3RhcnRQb3NpdGlvbiA/IChpbmRleCArIFN0eWxpbmdJbmRleC5GbGFnc09mZnNldCkgOiBpbmRleDtcbiAgcmV0dXJuICgoY29udGV4dFthZGp1c3RlZEluZGV4XSBhcyBudW1iZXIpICYgU3R5bGluZ0ZsYWdzLlNhbml0aXplKSA9PSBTdHlsaW5nRmxhZ3MuU2FuaXRpemU7XG59XG5cbmZ1bmN0aW9uIHBvaW50ZXJzKGNvbmZpZ0ZsYWc6IG51bWJlciwgc3RhdGljSW5kZXg6IG51bWJlciwgZHluYW1pY0luZGV4OiBudW1iZXIpIHtcbiAgcmV0dXJuIChjb25maWdGbGFnICYgU3R5bGluZ0ZsYWdzLkJpdE1hc2spIHwgKHN0YXRpY0luZGV4IDw8IFN0eWxpbmdGbGFncy5CaXRDb3VudFNpemUpIHxcbiAgICAgIChkeW5hbWljSW5kZXggPDwgKFN0eWxpbmdJbmRleC5CaXRDb3VudFNpemUgKyBTdHlsaW5nRmxhZ3MuQml0Q291bnRTaXplKSk7XG59XG5cbmZ1bmN0aW9uIGdldEluaXRpYWxWYWx1ZShjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgZmxhZzogbnVtYmVyKTogc3RyaW5nfG51bGwge1xuICBjb25zdCBpbmRleCA9IGdldEluaXRpYWxJbmRleChmbGFnKTtcbiAgcmV0dXJuIGNvbnRleHRbU3R5bGluZ0luZGV4LkluaXRpYWxTdHlsZXNQb3NpdGlvbl1baW5kZXhdIGFzIG51bGwgfCBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGdldEluaXRpYWxJbmRleChmbGFnOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gKGZsYWcgPj4gU3R5bGluZ0ZsYWdzLkJpdENvdW50U2l6ZSkgJiBTdHlsaW5nSW5kZXguQml0TWFzaztcbn1cblxuZnVuY3Rpb24gZ2V0TXVsdGlPclNpbmdsZUluZGV4KGZsYWc6IG51bWJlcik6IG51bWJlciB7XG4gIGNvbnN0IGluZGV4ID1cbiAgICAgIChmbGFnID4+IChTdHlsaW5nSW5kZXguQml0Q291bnRTaXplICsgU3R5bGluZ0ZsYWdzLkJpdENvdW50U2l6ZSkpICYgU3R5bGluZ0luZGV4LkJpdE1hc2s7XG4gIHJldHVybiBpbmRleCA+PSBTdHlsaW5nSW5kZXguU2luZ2xlU3R5bGVzU3RhcnRQb3NpdGlvbiA/IGluZGV4IDogLTE7XG59XG5cbmZ1bmN0aW9uIGdldE11bHRpU3RhcnRJbmRleChjb250ZXh0OiBTdHlsaW5nQ29udGV4dCk6IG51bWJlciB7XG4gIHJldHVybiBnZXRNdWx0aU9yU2luZ2xlSW5kZXgoY29udGV4dFtTdHlsaW5nSW5kZXguTWFzdGVyRmxhZ1Bvc2l0aW9uXSkgYXMgbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBnZXRTdHlsZVNhbml0aXplcihjb250ZXh0OiBTdHlsaW5nQ29udGV4dCk6IFN0eWxlU2FuaXRpemVGbnxudWxsIHtcbiAgcmV0dXJuIGNvbnRleHRbU3R5bGluZ0luZGV4LlN0eWxlU2FuaXRpemVyUG9zaXRpb25dO1xufVxuXG5mdW5jdGlvbiBzZXRQcm9wKGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyLCBwcm9wOiBzdHJpbmcpIHtcbiAgY29udGV4dFtpbmRleCArIFN0eWxpbmdJbmRleC5Qcm9wZXJ0eU9mZnNldF0gPSBwcm9wO1xufVxuXG5mdW5jdGlvbiBzZXRWYWx1ZShjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlciwgdmFsdWU6IHN0cmluZyB8IG51bGwgfCBib29sZWFuKSB7XG4gIGNvbnRleHRbaW5kZXggKyBTdHlsaW5nSW5kZXguVmFsdWVPZmZzZXRdID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHNldEZsYWcoY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIsIGZsYWc6IG51bWJlcikge1xuICBjb25zdCBhZGp1c3RlZEluZGV4ID1cbiAgICAgIGluZGV4ID09PSBTdHlsaW5nSW5kZXguTWFzdGVyRmxhZ1Bvc2l0aW9uID8gaW5kZXggOiAoaW5kZXggKyBTdHlsaW5nSW5kZXguRmxhZ3NPZmZzZXQpO1xuICBjb250ZXh0W2FkanVzdGVkSW5kZXhdID0gZmxhZztcbn1cblxuZnVuY3Rpb24gZ2V0UG9pbnRlcnMoY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBhZGp1c3RlZEluZGV4ID1cbiAgICAgIGluZGV4ID09PSBTdHlsaW5nSW5kZXguTWFzdGVyRmxhZ1Bvc2l0aW9uID8gaW5kZXggOiAoaW5kZXggKyBTdHlsaW5nSW5kZXguRmxhZ3NPZmZzZXQpO1xuICByZXR1cm4gY29udGV4dFthZGp1c3RlZEluZGV4XSBhcyBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIGdldFZhbHVlKGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyKTogc3RyaW5nfGJvb2xlYW58bnVsbCB7XG4gIHJldHVybiBjb250ZXh0W2luZGV4ICsgU3R5bGluZ0luZGV4LlZhbHVlT2Zmc2V0XSBhcyBzdHJpbmcgfCBib29sZWFuIHwgbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcChjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBjb250ZXh0W2luZGV4ICsgU3R5bGluZ0luZGV4LlByb3BlcnR5T2Zmc2V0XSBhcyBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnRleHREaXJ0eShjb250ZXh0OiBTdHlsaW5nQ29udGV4dCk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNEaXJ0eShjb250ZXh0LCBTdHlsaW5nSW5kZXguTWFzdGVyRmxhZ1Bvc2l0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldENvbnRleHREaXJ0eShjb250ZXh0OiBTdHlsaW5nQ29udGV4dCwgaXNEaXJ0eVllczogYm9vbGVhbik6IHZvaWQge1xuICBzZXREaXJ0eShjb250ZXh0LCBTdHlsaW5nSW5kZXguTWFzdGVyRmxhZ1Bvc2l0aW9uLCBpc0RpcnR5WWVzKTtcbn1cblxuZnVuY3Rpb24gZmluZEVudHJ5UG9zaXRpb25CeVByb3AoXG4gICAgY29udGV4dDogU3R5bGluZ0NvbnRleHQsIHByb3A6IHN0cmluZywgc3RhcnRJbmRleD86IG51bWJlcik6IG51bWJlciB7XG4gIGZvciAobGV0IGkgPSAoc3RhcnRJbmRleCB8fCAwKSArIFN0eWxpbmdJbmRleC5Qcm9wZXJ0eU9mZnNldDsgaSA8IGNvbnRleHQubGVuZ3RoO1xuICAgICAgIGkgKz0gU3R5bGluZ0luZGV4LlNpemUpIHtcbiAgICBjb25zdCB0aGlzUHJvcCA9IGNvbnRleHRbaV07XG4gICAgaWYgKHRoaXNQcm9wID09IHByb3ApIHtcbiAgICAgIHJldHVybiBpIC0gU3R5bGluZ0luZGV4LlByb3BlcnR5T2Zmc2V0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIHN3YXBNdWx0aUNvbnRleHRFbnRyaWVzKGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleEE6IG51bWJlciwgaW5kZXhCOiBudW1iZXIpIHtcbiAgY29uc3QgdG1wVmFsdWUgPSBnZXRWYWx1ZShjb250ZXh0LCBpbmRleEEpO1xuICBjb25zdCB0bXBQcm9wID0gZ2V0UHJvcChjb250ZXh0LCBpbmRleEEpO1xuICBjb25zdCB0bXBGbGFnID0gZ2V0UG9pbnRlcnMoY29udGV4dCwgaW5kZXhBKTtcblxuICBsZXQgZmxhZ0EgPSB0bXBGbGFnO1xuICBsZXQgZmxhZ0IgPSBnZXRQb2ludGVycyhjb250ZXh0LCBpbmRleEIpO1xuXG4gIGNvbnN0IHNpbmdsZUluZGV4QSA9IGdldE11bHRpT3JTaW5nbGVJbmRleChmbGFnQSk7XG4gIGlmIChzaW5nbGVJbmRleEEgPj0gMCkge1xuICAgIGNvbnN0IF9mbGFnID0gZ2V0UG9pbnRlcnMoY29udGV4dCwgc2luZ2xlSW5kZXhBKTtcbiAgICBjb25zdCBfaW5pdGlhbCA9IGdldEluaXRpYWxJbmRleChfZmxhZyk7XG4gICAgc2V0RmxhZyhjb250ZXh0LCBzaW5nbGVJbmRleEEsIHBvaW50ZXJzKF9mbGFnLCBfaW5pdGlhbCwgaW5kZXhCKSk7XG4gIH1cblxuICBjb25zdCBzaW5nbGVJbmRleEIgPSBnZXRNdWx0aU9yU2luZ2xlSW5kZXgoZmxhZ0IpO1xuICBpZiAoc2luZ2xlSW5kZXhCID49IDApIHtcbiAgICBjb25zdCBfZmxhZyA9IGdldFBvaW50ZXJzKGNvbnRleHQsIHNpbmdsZUluZGV4Qik7XG4gICAgY29uc3QgX2luaXRpYWwgPSBnZXRJbml0aWFsSW5kZXgoX2ZsYWcpO1xuICAgIHNldEZsYWcoY29udGV4dCwgc2luZ2xlSW5kZXhCLCBwb2ludGVycyhfZmxhZywgX2luaXRpYWwsIGluZGV4QSkpO1xuICB9XG5cbiAgc2V0VmFsdWUoY29udGV4dCwgaW5kZXhBLCBnZXRWYWx1ZShjb250ZXh0LCBpbmRleEIpKTtcbiAgc2V0UHJvcChjb250ZXh0LCBpbmRleEEsIGdldFByb3AoY29udGV4dCwgaW5kZXhCKSk7XG4gIHNldEZsYWcoY29udGV4dCwgaW5kZXhBLCBnZXRQb2ludGVycyhjb250ZXh0LCBpbmRleEIpKTtcblxuICBzZXRWYWx1ZShjb250ZXh0LCBpbmRleEIsIHRtcFZhbHVlKTtcbiAgc2V0UHJvcChjb250ZXh0LCBpbmRleEIsIHRtcFByb3ApO1xuICBzZXRGbGFnKGNvbnRleHQsIGluZGV4QiwgdG1wRmxhZyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNpbmdsZVBvaW50ZXJWYWx1ZXMoY29udGV4dDogU3R5bGluZ0NvbnRleHQsIGluZGV4U3RhcnRQb3NpdGlvbjogbnVtYmVyKSB7XG4gIGZvciAobGV0IGkgPSBpbmRleFN0YXJ0UG9zaXRpb247IGkgPCBjb250ZXh0Lmxlbmd0aDsgaSArPSBTdHlsaW5nSW5kZXguU2l6ZSkge1xuICAgIGNvbnN0IG11bHRpRmxhZyA9IGdldFBvaW50ZXJzKGNvbnRleHQsIGkpO1xuICAgIGNvbnN0IHNpbmdsZUluZGV4ID0gZ2V0TXVsdGlPclNpbmdsZUluZGV4KG11bHRpRmxhZyk7XG4gICAgaWYgKHNpbmdsZUluZGV4ID4gMCkge1xuICAgICAgY29uc3Qgc2luZ2xlRmxhZyA9IGdldFBvaW50ZXJzKGNvbnRleHQsIHNpbmdsZUluZGV4KTtcbiAgICAgIGNvbnN0IGluaXRpYWxJbmRleEZvclNpbmdsZSA9IGdldEluaXRpYWxJbmRleChzaW5nbGVGbGFnKTtcbiAgICAgIGNvbnN0IGZsYWdWYWx1ZSA9IChpc0RpcnR5KGNvbnRleHQsIHNpbmdsZUluZGV4KSA/IFN0eWxpbmdGbGFncy5EaXJ0eSA6IFN0eWxpbmdGbGFncy5Ob25lKSB8XG4gICAgICAgICAgKGlzQ2xhc3NCYXNlZChjb250ZXh0LCBzaW5nbGVJbmRleCkgPyBTdHlsaW5nRmxhZ3MuQ2xhc3MgOiBTdHlsaW5nRmxhZ3MuTm9uZSkgfFxuICAgICAgICAgIChpc1Nhbml0aXphYmxlKGNvbnRleHQsIHNpbmdsZUluZGV4KSA/IFN0eWxpbmdGbGFncy5TYW5pdGl6ZSA6IFN0eWxpbmdGbGFncy5Ob25lKTtcbiAgICAgIGNvbnN0IHVwZGF0ZWRGbGFnID0gcG9pbnRlcnMoZmxhZ1ZhbHVlLCBpbml0aWFsSW5kZXhGb3JTaW5nbGUsIGkpO1xuICAgICAgc2V0RmxhZyhjb250ZXh0LCBzaW5nbGVJbmRleCwgdXBkYXRlZEZsYWcpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnROZXdNdWx0aVByb3BlcnR5KFxuICAgIGNvbnRleHQ6IFN0eWxpbmdDb250ZXh0LCBpbmRleDogbnVtYmVyLCBjbGFzc0Jhc2VkOiBib29sZWFuLCBuYW1lOiBzdHJpbmcsIGZsYWc6IG51bWJlcixcbiAgICB2YWx1ZTogc3RyaW5nIHwgYm9vbGVhbik6IHZvaWQge1xuICBjb25zdCBkb1NoaWZ0ID0gaW5kZXggPCBjb250ZXh0Lmxlbmd0aDtcblxuICAvLyBwcm9wIGRvZXMgbm90IGV4aXN0IGluIHRoZSBsaXN0LCBhZGQgaXQgaW5cbiAgY29udGV4dC5zcGxpY2UoXG4gICAgICBpbmRleCwgMCwgZmxhZyB8IFN0eWxpbmdGbGFncy5EaXJ0eSB8IChjbGFzc0Jhc2VkID8gU3R5bGluZ0ZsYWdzLkNsYXNzIDogU3R5bGluZ0ZsYWdzLk5vbmUpLFxuICAgICAgbmFtZSwgdmFsdWUpO1xuXG4gIGlmIChkb1NoaWZ0KSB7XG4gICAgLy8gYmVjYXVzZSB0aGUgdmFsdWUgd2FzIGluc2VydGVkIG1pZHdheSBpbnRvIHRoZSBhcnJheSB0aGVuIHdlXG4gICAgLy8gbmVlZCB0byB1cGRhdGUgYWxsIHRoZSBzaGlmdGVkIG11bHRpIHZhbHVlcycgc2luZ2xlIHZhbHVlXG4gICAgLy8gcG9pbnRlcnMgdG8gcG9pbnQgdG8gdGhlIG5ld2x5IHNoaWZ0ZWQgbG9jYXRpb25cbiAgICB1cGRhdGVTaW5nbGVQb2ludGVyVmFsdWVzKGNvbnRleHQsIGluZGV4ICsgU3R5bGluZ0luZGV4LlNpemUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbHVlRXhpc3RzKHZhbHVlOiBzdHJpbmcgfCBudWxsIHwgYm9vbGVhbiwgaXNDbGFzc0Jhc2VkPzogYm9vbGVhbikge1xuICBpZiAoaXNDbGFzc0Jhc2VkKSB7XG4gICAgcmV0dXJuIHZhbHVlID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG4gIHJldHVybiB2YWx1ZSAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUluaXRpYWxGbGFnKFxuICAgIG5hbWU6IHN0cmluZywgaXNDbGFzc0Jhc2VkOiBib29sZWFuLCBzYW5pdGl6ZXI/OiBTdHlsZVNhbml0aXplRm4gfCBudWxsKSB7XG4gIGlmIChpc0NsYXNzQmFzZWQpIHtcbiAgICByZXR1cm4gU3R5bGluZ0ZsYWdzLkNsYXNzO1xuICB9IGVsc2UgaWYgKHNhbml0aXplciAmJiBzYW5pdGl6ZXIobmFtZSkpIHtcbiAgICByZXR1cm4gU3R5bGluZ0ZsYWdzLlNhbml0aXplO1xuICB9XG4gIHJldHVybiBTdHlsaW5nRmxhZ3MuTm9uZTtcbn1cblxuZnVuY3Rpb24gaGFzVmFsdWVDaGFuZ2VkKFxuICAgIGZsYWc6IG51bWJlciwgYTogc3RyaW5nIHwgYm9vbGVhbiB8IG51bGwsIGI6IHN0cmluZyB8IGJvb2xlYW4gfCBudWxsKTogYm9vbGVhbiB7XG4gIGNvbnN0IGlzQ2xhc3NCYXNlZCA9IGZsYWcgJiBTdHlsaW5nRmxhZ3MuQ2xhc3M7XG4gIGNvbnN0IGhhc1ZhbHVlcyA9IGEgJiYgYjtcbiAgY29uc3QgdXNlc1Nhbml0aXplciA9IGZsYWcgJiBTdHlsaW5nRmxhZ3MuU2FuaXRpemU7XG4gIC8vIHRoZSB0b1N0cmluZygpIGNvbXBhcmlzb24gZW5zdXJlcyB0aGF0IGEgdmFsdWUgaXMgY2hlY2tlZFxuICAvLyAuLi4gb3RoZXJ3aXNlIChkdXJpbmcgc2FuaXRpemF0aW9uIGJ5cGFzc2luZykgdGhlID09PSBjb21wYXJzaW9uXG4gIC8vIHdvdWxkIGZhaWwgc2luY2UgYSBuZXcgU3RyaW5nKCkgaW5zdGFuY2UgaXMgY3JlYXRlZFxuICBpZiAoIWlzQ2xhc3NCYXNlZCAmJiBoYXNWYWx1ZXMgJiYgdXNlc1Nhbml0aXplcikge1xuICAgIC8vIHdlIGtub3cgZm9yIHN1cmUgd2UncmUgZGVhbGluZyB3aXRoIHN0cmluZ3MgYXQgdGhpcyBwb2ludFxuICAgIHJldHVybiAoYSBhcyBzdHJpbmcpLnRvU3RyaW5nKCkgIT09IChiIGFzIHN0cmluZykudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8vIGV2ZXJ5dGhpbmcgZWxzZSBpcyBzYWZlIHRvIGNoZWNrIHdpdGggYSBub3JtYWwgZXF1YWxpdHkgY2hlY2tcbiAgcmV0dXJuIGEgIT09IGI7XG59XG4iXX0=