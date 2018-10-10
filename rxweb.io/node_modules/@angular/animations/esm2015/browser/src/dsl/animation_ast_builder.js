/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { AUTO_STYLE, style } from '@angular/animations';
import { getOrSetAsInMap } from '../render/shared';
import { NG_ANIMATING_SELECTOR, NG_TRIGGER_SELECTOR, SUBSTITUTION_EXPR_START, copyObj, extractStyleParams, iteratorToArray, normalizeAnimationEntry, resolveTiming, validateStyleParams, visitDslNode } from '../util';
import { parseTransitionExpr } from './animation_transition_expr';
/** @type {?} */
const SELF_TOKEN = ':self';
/** @type {?} */
const SELF_TOKEN_REGEX = new RegExp(`\s*${SELF_TOKEN}\s*,?`, 'g');
/**
 * @param {?} driver
 * @param {?} metadata
 * @param {?} errors
 * @return {?}
 */
export function buildAnimationAst(driver, metadata, errors) {
    return new AnimationAstBuilderVisitor(driver).build(metadata, errors);
}
/** @type {?} */
const ROOT_SELECTOR = '';
export class AnimationAstBuilderVisitor {
    /**
     * @param {?} _driver
     */
    constructor(_driver) {
        this._driver = _driver;
    }
    /**
     * @param {?} metadata
     * @param {?} errors
     * @return {?}
     */
    build(metadata, errors) {
        /** @type {?} */
        const context = new AnimationAstBuilderContext(errors);
        this._resetContextStyleTimingState(context);
        return /** @type {?} */ (visitDslNode(this, normalizeAnimationEntry(metadata), context));
    }
    /**
     * @param {?} context
     * @return {?}
     */
    _resetContextStyleTimingState(context) {
        context.currentQuerySelector = ROOT_SELECTOR;
        context.collectedStyles = {};
        context.collectedStyles[ROOT_SELECTOR] = {};
        context.currentTime = 0;
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitTrigger(metadata, context) {
        /** @type {?} */
        let queryCount = context.queryCount = 0;
        /** @type {?} */
        let depCount = context.depCount = 0;
        /** @type {?} */
        const states = [];
        /** @type {?} */
        const transitions = [];
        if (metadata.name.charAt(0) == '@') {
            context.errors.push('animation triggers cannot be prefixed with an `@` sign (e.g. trigger(\'@foo\', [...]))');
        }
        metadata.definitions.forEach(def => {
            this._resetContextStyleTimingState(context);
            if (def.type == 0 /* State */) {
                /** @type {?} */
                const stateDef = /** @type {?} */ (def);
                /** @type {?} */
                const name = stateDef.name;
                name.toString().split(/\s*,\s*/).forEach(n => {
                    stateDef.name = n;
                    states.push(this.visitState(stateDef, context));
                });
                stateDef.name = name;
            }
            else if (def.type == 1 /* Transition */) {
                /** @type {?} */
                const transition = this.visitTransition(/** @type {?} */ (def), context);
                queryCount += transition.queryCount;
                depCount += transition.depCount;
                transitions.push(transition);
            }
            else {
                context.errors.push('only state() and transition() definitions can sit inside of a trigger()');
            }
        });
        return {
            type: 7 /* Trigger */,
            name: metadata.name, states, transitions, queryCount, depCount,
            options: null
        };
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitState(metadata, context) {
        /** @type {?} */
        const styleAst = this.visitStyle(metadata.styles, context);
        /** @type {?} */
        const astParams = (metadata.options && metadata.options.params) || null;
        if (styleAst.containsDynamicStyles) {
            /** @type {?} */
            const missingSubs = new Set();
            /** @type {?} */
            const params = astParams || {};
            styleAst.styles.forEach(value => {
                if (isObject(value)) {
                    /** @type {?} */
                    const stylesObj = /** @type {?} */ (value);
                    Object.keys(stylesObj).forEach(prop => {
                        extractStyleParams(stylesObj[prop]).forEach(sub => {
                            if (!params.hasOwnProperty(sub)) {
                                missingSubs.add(sub);
                            }
                        });
                    });
                }
            });
            if (missingSubs.size) {
                /** @type {?} */
                const missingSubsArr = iteratorToArray(missingSubs.values());
                context.errors.push(`state("${metadata.name}", ...) must define default values for all the following style substitutions: ${missingSubsArr.join(', ')}`);
            }
        }
        return {
            type: 0 /* State */,
            name: metadata.name,
            style: styleAst,
            options: astParams ? { params: astParams } : null
        };
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitTransition(metadata, context) {
        context.queryCount = 0;
        context.depCount = 0;
        /** @type {?} */
        const animation = visitDslNode(this, normalizeAnimationEntry(metadata.animation), context);
        /** @type {?} */
        const matchers = parseTransitionExpr(metadata.expr, context.errors);
        return {
            type: 1 /* Transition */,
            matchers,
            animation,
            queryCount: context.queryCount,
            depCount: context.depCount,
            options: normalizeAnimationOptions(metadata.options)
        };
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitSequence(metadata, context) {
        return {
            type: 2 /* Sequence */,
            steps: metadata.steps.map(s => visitDslNode(this, s, context)),
            options: normalizeAnimationOptions(metadata.options)
        };
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitGroup(metadata, context) {
        /** @type {?} */
        const currentTime = context.currentTime;
        /** @type {?} */
        let furthestTime = 0;
        /** @type {?} */
        const steps = metadata.steps.map(step => {
            context.currentTime = currentTime;
            /** @type {?} */
            const innerAst = visitDslNode(this, step, context);
            furthestTime = Math.max(furthestTime, context.currentTime);
            return innerAst;
        });
        context.currentTime = furthestTime;
        return {
            type: 3 /* Group */,
            steps,
            options: normalizeAnimationOptions(metadata.options)
        };
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitAnimate(metadata, context) {
        /** @type {?} */
        const timingAst = constructTimingAst(metadata.timings, context.errors);
        context.currentAnimateTimings = timingAst;
        /** @type {?} */
        let styleAst;
        /** @type {?} */
        let styleMetadata = metadata.styles ? metadata.styles : style({});
        if (styleMetadata.type == 5 /* Keyframes */) {
            styleAst = this.visitKeyframes(/** @type {?} */ (styleMetadata), context);
        }
        else {
            /** @type {?} */
            let styleMetadata = /** @type {?} */ (metadata.styles);
            /** @type {?} */
            let isEmpty = false;
            if (!styleMetadata) {
                isEmpty = true;
                /** @type {?} */
                const newStyleData = {};
                if (timingAst.easing) {
                    newStyleData['easing'] = timingAst.easing;
                }
                styleMetadata = style(newStyleData);
            }
            context.currentTime += timingAst.duration + timingAst.delay;
            /** @type {?} */
            const _styleAst = this.visitStyle(styleMetadata, context);
            _styleAst.isEmptyStep = isEmpty;
            styleAst = _styleAst;
        }
        context.currentAnimateTimings = null;
        return {
            type: 4 /* Animate */,
            timings: timingAst,
            style: styleAst,
            options: null
        };
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitStyle(metadata, context) {
        /** @type {?} */
        const ast = this._makeStyleAst(metadata, context);
        this._validateStyleAst(ast, context);
        return ast;
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    _makeStyleAst(metadata, context) {
        /** @type {?} */
        const styles = [];
        if (Array.isArray(metadata.styles)) {
            (/** @type {?} */ (metadata.styles)).forEach(styleTuple => {
                if (typeof styleTuple == 'string') {
                    if (styleTuple == AUTO_STYLE) {
                        styles.push(/** @type {?} */ (styleTuple));
                    }
                    else {
                        context.errors.push(`The provided style string value ${styleTuple} is not allowed.`);
                    }
                }
                else {
                    styles.push(/** @type {?} */ (styleTuple));
                }
            });
        }
        else {
            styles.push(metadata.styles);
        }
        /** @type {?} */
        let containsDynamicStyles = false;
        /** @type {?} */
        let collectedEasing = null;
        styles.forEach(styleData => {
            if (isObject(styleData)) {
                /** @type {?} */
                const styleMap = /** @type {?} */ (styleData);
                /** @type {?} */
                const easing = styleMap['easing'];
                if (easing) {
                    collectedEasing = /** @type {?} */ (easing);
                    delete styleMap['easing'];
                }
                if (!containsDynamicStyles) {
                    for (let prop in styleMap) {
                        /** @type {?} */
                        const value = styleMap[prop];
                        if (value.toString().indexOf(SUBSTITUTION_EXPR_START) >= 0) {
                            containsDynamicStyles = true;
                            break;
                        }
                    }
                }
            }
        });
        return {
            type: 6 /* Style */,
            styles,
            easing: collectedEasing,
            offset: metadata.offset, containsDynamicStyles,
            options: null
        };
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    _validateStyleAst(ast, context) {
        /** @type {?} */
        const timings = context.currentAnimateTimings;
        /** @type {?} */
        let endTime = context.currentTime;
        /** @type {?} */
        let startTime = context.currentTime;
        if (timings && startTime > 0) {
            startTime -= timings.duration + timings.delay;
        }
        ast.styles.forEach(tuple => {
            if (typeof tuple == 'string')
                return;
            Object.keys(tuple).forEach(prop => {
                if (!this._driver.validateStyleProperty(prop)) {
                    context.errors.push(`The provided animation property "${prop}" is not a supported CSS property for animations`);
                    return;
                }
                /** @type {?} */
                const collectedStyles = context.collectedStyles[/** @type {?} */ ((context.currentQuerySelector))];
                /** @type {?} */
                const collectedEntry = collectedStyles[prop];
                /** @type {?} */
                let updateCollectedStyle = true;
                if (collectedEntry) {
                    if (startTime != endTime && startTime >= collectedEntry.startTime &&
                        endTime <= collectedEntry.endTime) {
                        context.errors.push(`The CSS property "${prop}" that exists between the times of "${collectedEntry.startTime}ms" and "${collectedEntry.endTime}ms" is also being animated in a parallel animation between the times of "${startTime}ms" and "${endTime}ms"`);
                        updateCollectedStyle = false;
                    }
                    // we always choose the smaller start time value since we
                    // want to have a record of the entire animation window where
                    // the style property is being animated in between
                    startTime = collectedEntry.startTime;
                }
                if (updateCollectedStyle) {
                    collectedStyles[prop] = { startTime, endTime };
                }
                if (context.options) {
                    validateStyleParams(tuple[prop], context.options, context.errors);
                }
            });
        });
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitKeyframes(metadata, context) {
        /** @type {?} */
        const ast = { type: 5 /* Keyframes */, styles: [], options: null };
        if (!context.currentAnimateTimings) {
            context.errors.push(`keyframes() must be placed inside of a call to animate()`);
            return ast;
        }
        /** @type {?} */
        const MAX_KEYFRAME_OFFSET = 1;
        /** @type {?} */
        let totalKeyframesWithOffsets = 0;
        /** @type {?} */
        const offsets = [];
        /** @type {?} */
        let offsetsOutOfOrder = false;
        /** @type {?} */
        let keyframesOutOfRange = false;
        /** @type {?} */
        let previousOffset = 0;
        /** @type {?} */
        const keyframes = metadata.steps.map(styles => {
            /** @type {?} */
            const style = this._makeStyleAst(styles, context);
            /** @type {?} */
            let offsetVal = style.offset != null ? style.offset : consumeOffset(style.styles);
            /** @type {?} */
            let offset = 0;
            if (offsetVal != null) {
                totalKeyframesWithOffsets++;
                offset = style.offset = offsetVal;
            }
            keyframesOutOfRange = keyframesOutOfRange || offset < 0 || offset > 1;
            offsetsOutOfOrder = offsetsOutOfOrder || offset < previousOffset;
            previousOffset = offset;
            offsets.push(offset);
            return style;
        });
        if (keyframesOutOfRange) {
            context.errors.push(`Please ensure that all keyframe offsets are between 0 and 1`);
        }
        if (offsetsOutOfOrder) {
            context.errors.push(`Please ensure that all keyframe offsets are in order`);
        }
        /** @type {?} */
        const length = metadata.steps.length;
        /** @type {?} */
        let generatedOffset = 0;
        if (totalKeyframesWithOffsets > 0 && totalKeyframesWithOffsets < length) {
            context.errors.push(`Not all style() steps within the declared keyframes() contain offsets`);
        }
        else if (totalKeyframesWithOffsets == 0) {
            generatedOffset = MAX_KEYFRAME_OFFSET / (length - 1);
        }
        /** @type {?} */
        const limit = length - 1;
        /** @type {?} */
        const currentTime = context.currentTime;
        /** @type {?} */
        const currentAnimateTimings = /** @type {?} */ ((context.currentAnimateTimings));
        /** @type {?} */
        const animateDuration = currentAnimateTimings.duration;
        keyframes.forEach((kf, i) => {
            /** @type {?} */
            const offset = generatedOffset > 0 ? (i == limit ? 1 : (generatedOffset * i)) : offsets[i];
            /** @type {?} */
            const durationUpToThisFrame = offset * animateDuration;
            context.currentTime = currentTime + currentAnimateTimings.delay + durationUpToThisFrame;
            currentAnimateTimings.duration = durationUpToThisFrame;
            this._validateStyleAst(kf, context);
            kf.offset = offset;
            ast.styles.push(kf);
        });
        return ast;
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitReference(metadata, context) {
        return {
            type: 8 /* Reference */,
            animation: visitDslNode(this, normalizeAnimationEntry(metadata.animation), context),
            options: normalizeAnimationOptions(metadata.options)
        };
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitAnimateChild(metadata, context) {
        context.depCount++;
        return {
            type: 9 /* AnimateChild */,
            options: normalizeAnimationOptions(metadata.options)
        };
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitAnimateRef(metadata, context) {
        return {
            type: 10 /* AnimateRef */,
            animation: this.visitReference(metadata.animation, context),
            options: normalizeAnimationOptions(metadata.options)
        };
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitQuery(metadata, context) {
        /** @type {?} */
        const parentSelector = /** @type {?} */ ((context.currentQuerySelector));
        /** @type {?} */
        const options = /** @type {?} */ ((metadata.options || {}));
        context.queryCount++;
        context.currentQuery = metadata;
        const [selector, includeSelf] = normalizeSelector(metadata.selector);
        context.currentQuerySelector =
            parentSelector.length ? (parentSelector + ' ' + selector) : selector;
        getOrSetAsInMap(context.collectedStyles, context.currentQuerySelector, {});
        /** @type {?} */
        const animation = visitDslNode(this, normalizeAnimationEntry(metadata.animation), context);
        context.currentQuery = null;
        context.currentQuerySelector = parentSelector;
        return {
            type: 11 /* Query */,
            selector,
            limit: options.limit || 0,
            optional: !!options.optional, includeSelf, animation,
            originalSelector: metadata.selector,
            options: normalizeAnimationOptions(metadata.options)
        };
    }
    /**
     * @param {?} metadata
     * @param {?} context
     * @return {?}
     */
    visitStagger(metadata, context) {
        if (!context.currentQuery) {
            context.errors.push(`stagger() can only be used inside of query()`);
        }
        /** @type {?} */
        const timings = metadata.timings === 'full' ?
            { duration: 0, delay: 0, easing: 'full' } :
            resolveTiming(metadata.timings, context.errors, true);
        return {
            type: 12 /* Stagger */,
            animation: visitDslNode(this, normalizeAnimationEntry(metadata.animation), context), timings,
            options: null
        };
    }
}
if (false) {
    /** @type {?} */
    AnimationAstBuilderVisitor.prototype._driver;
}
/**
 * @param {?} selector
 * @return {?}
 */
function normalizeSelector(selector) {
    /** @type {?} */
    const hasAmpersand = selector.split(/\s*,\s*/).find(token => token == SELF_TOKEN) ? true : false;
    if (hasAmpersand) {
        selector = selector.replace(SELF_TOKEN_REGEX, '');
    }
    // the :enter and :leave selectors are filled in at runtime during timeline building
    selector = selector.replace(/@\*/g, NG_TRIGGER_SELECTOR)
        .replace(/@\w+/g, match => NG_TRIGGER_SELECTOR + '-' + match.substr(1))
        .replace(/:animating/g, NG_ANIMATING_SELECTOR);
    return [selector, hasAmpersand];
}
/**
 * @param {?} obj
 * @return {?}
 */
function normalizeParams(obj) {
    return obj ? copyObj(obj) : null;
}
/** @typedef {?} */
var StyleTimeTuple;
export { StyleTimeTuple };
export class AnimationAstBuilderContext {
    /**
     * @param {?} errors
     */
    constructor(errors) {
        this.errors = errors;
        this.queryCount = 0;
        this.depCount = 0;
        this.currentTransition = null;
        this.currentQuery = null;
        this.currentQuerySelector = null;
        this.currentAnimateTimings = null;
        this.currentTime = 0;
        this.collectedStyles = {};
        this.options = null;
    }
}
if (false) {
    /** @type {?} */
    AnimationAstBuilderContext.prototype.queryCount;
    /** @type {?} */
    AnimationAstBuilderContext.prototype.depCount;
    /** @type {?} */
    AnimationAstBuilderContext.prototype.currentTransition;
    /** @type {?} */
    AnimationAstBuilderContext.prototype.currentQuery;
    /** @type {?} */
    AnimationAstBuilderContext.prototype.currentQuerySelector;
    /** @type {?} */
    AnimationAstBuilderContext.prototype.currentAnimateTimings;
    /** @type {?} */
    AnimationAstBuilderContext.prototype.currentTime;
    /** @type {?} */
    AnimationAstBuilderContext.prototype.collectedStyles;
    /** @type {?} */
    AnimationAstBuilderContext.prototype.options;
    /** @type {?} */
    AnimationAstBuilderContext.prototype.errors;
}
/**
 * @param {?} styles
 * @return {?}
 */
function consumeOffset(styles) {
    if (typeof styles == 'string')
        return null;
    /** @type {?} */
    let offset = null;
    if (Array.isArray(styles)) {
        styles.forEach(styleTuple => {
            if (isObject(styleTuple) && styleTuple.hasOwnProperty('offset')) {
                /** @type {?} */
                const obj = /** @type {?} */ (styleTuple);
                offset = parseFloat(/** @type {?} */ (obj['offset']));
                delete obj['offset'];
            }
        });
    }
    else if (isObject(styles) && styles.hasOwnProperty('offset')) {
        /** @type {?} */
        const obj = /** @type {?} */ (styles);
        offset = parseFloat(/** @type {?} */ (obj['offset']));
        delete obj['offset'];
    }
    return offset;
}
/**
 * @param {?} value
 * @return {?}
 */
function isObject(value) {
    return !Array.isArray(value) && typeof value == 'object';
}
/**
 * @param {?} value
 * @param {?} errors
 * @return {?}
 */
function constructTimingAst(value, errors) {
    /** @type {?} */
    let timings = null;
    if (value.hasOwnProperty('duration')) {
        timings = /** @type {?} */ (value);
    }
    else if (typeof value == 'number') {
        /** @type {?} */
        const duration = resolveTiming(/** @type {?} */ (value), errors).duration;
        return makeTimingAst(/** @type {?} */ (duration), 0, '');
    }
    /** @type {?} */
    const strValue = /** @type {?} */ (value);
    /** @type {?} */
    const isDynamic = strValue.split(/\s+/).some(v => v.charAt(0) == '{' && v.charAt(1) == '{');
    if (isDynamic) {
        /** @type {?} */
        const ast = /** @type {?} */ (makeTimingAst(0, 0, ''));
        ast.dynamic = true;
        ast.strValue = strValue;
        return /** @type {?} */ (ast);
    }
    timings = timings || resolveTiming(strValue, errors);
    return makeTimingAst(timings.duration, timings.delay, timings.easing);
}
/**
 * @param {?} options
 * @return {?}
 */
function normalizeAnimationOptions(options) {
    if (options) {
        options = copyObj(options);
        if (options['params']) {
            options['params'] = /** @type {?} */ ((normalizeParams(options['params'])));
        }
    }
    else {
        options = {};
    }
    return options;
}
/**
 * @param {?} duration
 * @param {?} delay
 * @param {?} easing
 * @return {?}
 */
function makeTimingAst(duration, delay, easing) {
    return { duration, delay, easing };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2FzdF9idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5pbWF0aW9ucy9icm93c2VyL3NyYy9kc2wvYW5pbWF0aW9uX2FzdF9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFPQSxPQUFPLEVBQUMsVUFBVSxFQUF1YyxLQUFLLEVBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUd2Z0IsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBaUMscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSx1QkFBdUIsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBSXJQLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDZCQUE2QixDQUFDOztBQUVoRSxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUM7O0FBQzNCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxVQUFVLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQzs7Ozs7OztBQXNDbEUsTUFBTSw0QkFDRixNQUF1QixFQUFFLFFBQWlELEVBQzFFLE1BQWE7SUFDZixPQUFPLElBQUksMEJBQTBCLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztDQUN2RTs7QUFFRCxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFFekIsTUFBTTs7OztJQUNKLFlBQW9CLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO0tBQUk7Ozs7OztJQUVoRCxLQUFLLENBQUMsUUFBK0MsRUFBRSxNQUFhOztRQUVsRSxNQUFNLE9BQU8sR0FBRyxJQUFJLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxDQUFD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LE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNyQixPQUFPLENBQUMsUUFBUSxDQUFDLHNCQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzFEO0tBQ0Y7U0FBTTtRQUNMLE9BQU8sR0FBRyxFQUFFLENBQUM7S0FDZDtJQUNELE9BQU8sT0FBTyxDQUFDO0NBQ2hCOzs7Ozs7O0FBRUQsdUJBQXVCLFFBQWdCLEVBQUUsS0FBYSxFQUFFLE1BQXFCO0lBQzNFLE9BQU8sRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDO0NBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBVVRPX1NUWUxFLCBBbmltYXRlVGltaW5ncywgQW5pbWF0aW9uQW5pbWF0ZUNoaWxkTWV0YWRhdGEsIEFuaW1hdGlvbkFuaW1hdGVNZXRhZGF0YSwgQW5pbWF0aW9uQW5pbWF0ZVJlZk1ldGFkYXRhLCBBbmltYXRpb25Hcm91cE1ldGFkYXRhLCBBbmltYXRpb25LZXlmcmFtZXNTZXF1ZW5jZU1ldGFkYXRhLCBBbmltYXRpb25NZXRhZGF0YSwgQW5pbWF0aW9uTWV0YWRhdGFUeXBlLCBBbmltYXRpb25PcHRpb25zLCBBbmltYXRpb25RdWVyeU1ldGFkYXRhLCBBbmltYXRpb25RdWVyeU9wdGlvbnMsIEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhLCBBbmltYXRpb25TZXF1ZW5jZU1ldGFkYXRhLCBBbmltYXRpb25TdGFnZ2VyTWV0YWRhdGEsIEFuaW1hdGlvblN0YXRlTWV0YWRhdGEsIEFuaW1hdGlvblN0eWxlTWV0YWRhdGEsIEFuaW1hdGlvblRyYW5zaXRpb25NZXRhZGF0YSwgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLCBzdHlsZSwgybVTdHlsZURhdGF9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge0FuaW1hdGlvbkRyaXZlcn0gZnJvbSAnLi4vcmVuZGVyL2FuaW1hdGlvbl9kcml2ZXInO1xuaW1wb3J0IHtnZXRPclNldEFzSW5NYXB9IGZyb20gJy4uL3JlbmRlci9zaGFyZWQnO1xuaW1wb3J0IHtFTlRFUl9TRUxFQ1RPUiwgTEVBVkVfU0VMRUNUT1IsIE5HX0FOSU1BVElOR19TRUxFQ1RPUiwgTkdfVFJJR0dFUl9TRUxFQ1RPUiwgU1VCU1RJVFVUSU9OX0VYUFJfU1RBUlQsIGNvcHlPYmosIGV4dHJhY3RTdHlsZVBhcmFtcywgaXRlcmF0b3JUb0FycmF5LCBub3JtYWxpemVBbmltYXRpb25FbnRyeSwgcmVzb2x2ZVRpbWluZywgdmFsaWRhdGVTdHlsZVBhcmFtcywgdmlzaXREc2xOb2RlfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtBbmltYXRlQXN0LCBBbmltYXRlQ2hpbGRBc3QsIEFuaW1hdGVSZWZBc3QsIEFzdCwgRHluYW1pY1RpbWluZ0FzdCwgR3JvdXBBc3QsIEtleWZyYW1lc0FzdCwgUXVlcnlBc3QsIFJlZmVyZW5jZUFzdCwgU2VxdWVuY2VBc3QsIFN0YWdnZXJBc3QsIFN0YXRlQXN0LCBTdHlsZUFzdCwgVGltaW5nQXN0LCBUcmFuc2l0aW9uQXN0LCBUcmlnZ2VyQXN0fSBmcm9tICcuL2FuaW1hdGlvbl9hc3QnO1xuaW1wb3J0IHtBbmltYXRpb25Ec2xWaXNpdG9yfSBmcm9tICcuL2FuaW1hdGlvbl9kc2xfdmlzaXRvcic7XG5pbXBvcnQge3BhcnNlVHJhbnNpdGlvbkV4cHJ9IGZyb20gJy4vYW5pbWF0aW9uX3RyYW5zaXRpb25fZXhwcic7XG5cbmNvbnN0IFNFTEZfVE9LRU4gPSAnOnNlbGYnO1xuY29uc3QgU0VMRl9UT0tFTl9SRUdFWCA9IG5ldyBSZWdFeHAoYFxccyoke1NFTEZfVE9LRU59XFxzKiw/YCwgJ2cnKTtcblxuLypcbiAqIFtWYWxpZGF0aW9uXVxuICogVGhlIHZpc2l0b3IgY29kZSBiZWxvdyB3aWxsIHRyYXZlcnNlIHRoZSBhbmltYXRpb24gQVNUIGdlbmVyYXRlZCBieSB0aGUgYW5pbWF0aW9uIHZlcmIgZnVuY3Rpb25zXG4gKiAodGhlIG91dHB1dCBpcyBhIHRyZWUgb2Ygb2JqZWN0cykgYW5kIGF0dGVtcHQgdG8gcGVyZm9ybSBhIHNlcmllcyBvZiB2YWxpZGF0aW9ucyBvbiB0aGUgZGF0YS4gVGhlXG4gKiBmb2xsb3dpbmcgY29ybmVyLWNhc2VzIHdpbGwgYmUgdmFsaWRhdGVkOlxuICpcbiAqIDEuIE92ZXJsYXAgb2YgYW5pbWF0aW9uc1xuICogR2l2ZW4gdGhhdCBhIENTUyBwcm9wZXJ0eSBjYW5ub3QgYmUgYW5pbWF0ZWQgaW4gbW9yZSB0aGFuIG9uZSBwbGFjZSBhdCB0aGUgc2FtZSB0aW1lLCBpdCdzXG4gKiBpbXBvcnRhbnQgdGhhdCB0aGlzIGJlaGF2aW91ciBpcyBkZXRlY3RlZCBhbmQgdmFsaWRhdGVkLiBUaGUgd2F5IGluIHdoaWNoIHRoaXMgb2NjdXJzIGlzIHRoYXRcbiAqIGVhY2ggdGltZSBhIHN0eWxlIHByb3BlcnR5IGlzIGV4YW1pbmVkLCBhIHN0cmluZy1tYXAgY29udGFpbmluZyB0aGUgcHJvcGVydHkgd2lsbCBiZSB1cGRhdGVkIHdpdGhcbiAqIHRoZSBzdGFydCBhbmQgZW5kIHRpbWVzIGZvciB3aGVuIHRoZSBwcm9wZXJ0eSBpcyB1c2VkIHdpdGhpbiBhbiBhbmltYXRpb24gc3RlcC5cbiAqXG4gKiBJZiB0aGVyZSBhcmUgdHdvIG9yIG1vcmUgcGFyYWxsZWwgYW5pbWF0aW9ucyB0aGF0IGFyZSBjdXJyZW50bHkgcnVubmluZyAodGhlc2UgYXJlIGludm9rZWQgYnkgdGhlXG4gKiBncm91cCgpKSBvbiB0aGUgc2FtZSBlbGVtZW50IHRoZW4gdGhlIHZhbGlkYXRvciB3aWxsIHRocm93IGFuIGVycm9yLiBTaW5jZSB0aGUgc3RhcnQvZW5kIHRpbWluZ1xuICogdmFsdWVzIGFyZSBjb2xsZWN0ZWQgZm9yIGVhY2ggcHJvcGVydHkgdGhlbiBpZiB0aGUgY3VycmVudCBhbmltYXRpb24gc3RlcCBpcyBhbmltYXRpbmcgdGhlIHNhbWVcbiAqIHByb3BlcnR5IGFuZCBpdHMgdGltaW5nIHZhbHVlcyBmYWxsIGFueXdoZXJlIGludG8gdGhlIHdpbmRvdyBvZiB0aW1lIHRoYXQgdGhlIHByb3BlcnR5IGlzXG4gKiBjdXJyZW50bHkgYmVpbmcgYW5pbWF0ZWQgd2l0aGluIHRoZW4gdGhpcyBpcyB3aGF0IGNhdXNlcyBhbiBlcnJvci5cbiAqXG4gKiAyLiBUaW1pbmcgdmFsdWVzXG4gKiBUaGUgdmFsaWRhdG9yIHdpbGwgdmFsaWRhdGUgdG8gc2VlIGlmIGEgdGltaW5nIHZhbHVlIG9mIGBkdXJhdGlvbiBkZWxheSBlYXNpbmdgIG9yXG4gKiBgZHVyYXRpb25OdW1iZXJgIGlzIHZhbGlkIG9yIG5vdC5cbiAqXG4gKiAobm90ZSB0aGF0IHVwb24gdmFsaWRhdGlvbiB0aGUgY29kZSBiZWxvdyB3aWxsIHJlcGxhY2UgdGhlIHRpbWluZyBkYXRhIHdpdGggYW4gb2JqZWN0IGNvbnRhaW5pbmdcbiAqIHtkdXJhdGlvbixkZWxheSxlYXNpbmd9LlxuICpcbiAqIDMuIE9mZnNldCBWYWxpZGF0aW9uXG4gKiBFYWNoIG9mIHRoZSBzdHlsZSgpIGNhbGxzIGFyZSBhbGxvd2VkIHRvIGhhdmUgYW4gb2Zmc2V0IHZhbHVlIHdoZW4gcGxhY2VkIGluc2lkZSBvZiBrZXlmcmFtZXMoKS5cbiAqIE9mZnNldHMgd2l0aGluIGtleWZyYW1lcygpIGFyZSBjb25zaWRlcmVkIHZhbGlkIHdoZW46XG4gKlxuICogICAtIE5vIG9mZnNldHMgYXJlIHVzZWQgYXQgYWxsXG4gKiAgIC0gRWFjaCBzdHlsZSgpIGVudHJ5IGNvbnRhaW5zIGFuIG9mZnNldCB2YWx1ZVxuICogICAtIEVhY2ggb2Zmc2V0IGlzIGJldHdlZW4gMCBhbmQgMVxuICogICAtIEVhY2ggb2Zmc2V0IGlzIGdyZWF0ZXIgdG8gb3IgZXF1YWwgdGhhbiB0aGUgcHJldmlvdXMgb25lXG4gKlxuICogT3RoZXJ3aXNlIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBbmltYXRpb25Bc3QoXG4gICAgZHJpdmVyOiBBbmltYXRpb25Ecml2ZXIsIG1ldGFkYXRhOiBBbmltYXRpb25NZXRhZGF0YSB8IEFuaW1hdGlvbk1ldGFkYXRhW10sXG4gICAgZXJyb3JzOiBhbnlbXSk6IEFzdDxBbmltYXRpb25NZXRhZGF0YVR5cGU+IHtcbiAgcmV0dXJuIG5ldyBBbmltYXRpb25Bc3RCdWlsZGVyVmlzaXRvcihkcml2ZXIpLmJ1aWxkKG1ldGFkYXRhLCBlcnJvcnMpO1xufVxuXG5jb25zdCBST09UX1NFTEVDVE9SID0gJyc7XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRpb25Bc3RCdWlsZGVyVmlzaXRvciBpbXBsZW1lbnRzIEFuaW1hdGlvbkRzbFZpc2l0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kcml2ZXI6IEFuaW1hdGlvbkRyaXZlcikge31cblxuICBidWlsZChtZXRhZGF0YTogQW5pbWF0aW9uTWV0YWRhdGF8QW5pbWF0aW9uTWV0YWRhdGFbXSwgZXJyb3JzOiBhbnlbXSk6XG4gICAgICBBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlPiB7XG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBBbmltYXRpb25Bc3RCdWlsZGVyQ29udGV4dChlcnJvcnMpO1xuICAgIHRoaXMuX3Jlc2V0Q29udGV4dFN0eWxlVGltaW5nU3RhdGUoY29udGV4dCk7XG4gICAgcmV0dXJuIDxBc3Q8QW5pbWF0aW9uTWV0YWRhdGFUeXBlPj52aXNpdERzbE5vZGUoXG4gICAgICAgIHRoaXMsIG5vcm1hbGl6ZUFuaW1hdGlvbkVudHJ5KG1ldGFkYXRhKSwgY29udGV4dCk7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldENvbnRleHRTdHlsZVRpbWluZ1N0YXRlKGNvbnRleHQ6IEFuaW1hdGlvbkFzdEJ1aWxkZXJDb250ZXh0KSB7XG4gICAgY29udGV4dC5jdXJyZW50UXVlcnlTZWxlY3RvciA9IFJPT1RfU0VMRUNUT1I7XG4gICAgY29udGV4dC5jb2xsZWN0ZWRTdHlsZXMgPSB7fTtcbiAgICBjb250ZXh0LmNvbGxlY3RlZFN0eWxlc1tST09UX1NFTEVDVE9SXSA9IHt9O1xuICAgIGNvbnRleHQuY3VycmVudFRpbWUgPSAwO1xuICB9XG5cbiAgdmlzaXRUcmlnZ2VyKG1ldGFkYXRhOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsIGNvbnRleHQ6IEFuaW1hdGlvbkFzdEJ1aWxkZXJDb250ZXh0KTpcbiAgICAgIFRyaWdnZXJBc3Qge1xuICAgIGxldCBxdWVyeUNvdW50ID0gY29udGV4dC5xdWVyeUNvdW50ID0gMDtcbiAgICBsZXQgZGVwQ291bnQgPSBjb250ZXh0LmRlcENvdW50ID0gMDtcbiAgICBjb25zdCBzdGF0ZXM6IFN0YXRlQXN0W10gPSBbXTtcbiAgICBjb25zdCB0cmFuc2l0aW9uczogVHJhbnNpdGlvbkFzdFtdID0gW107XG4gICAgaWYgKG1ldGFkYXRhLm5hbWUuY2hhckF0KDApID09ICdAJykge1xuICAgICAgY29udGV4dC5lcnJvcnMucHVzaChcbiAgICAgICAgICAnYW5pbWF0aW9uIHRyaWdnZXJzIGNhbm5vdCBiZSBwcmVmaXhlZCB3aXRoIGFuIGBAYCBzaWduIChlLmcuIHRyaWdnZXIoXFwnQGZvb1xcJywgWy4uLl0pKScpO1xuICAgIH1cblxuICAgIG1ldGFkYXRhLmRlZmluaXRpb25zLmZvckVhY2goZGVmID0+IHtcbiAgICAgIHRoaXMuX3Jlc2V0Q29udGV4dFN0eWxlVGltaW5nU3RhdGUoY29udGV4dCk7XG4gICAgICBpZiAoZGVmLnR5cGUgPT0gQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlN0YXRlKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlRGVmID0gZGVmIGFzIEFuaW1hdGlvblN0YXRlTWV0YWRhdGE7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBzdGF0ZURlZi5uYW1lO1xuICAgICAgICBuYW1lLnRvU3RyaW5nKCkuc3BsaXQoL1xccyosXFxzKi8pLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgc3RhdGVEZWYubmFtZSA9IG47XG4gICAgICAgICAgc3RhdGVzLnB1c2godGhpcy52aXNpdFN0YXRlKHN0YXRlRGVmLCBjb250ZXh0KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzdGF0ZURlZi5uYW1lID0gbmFtZTtcbiAgICAgIH0gZWxzZSBpZiAoZGVmLnR5cGUgPT0gQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlRyYW5zaXRpb24pIHtcbiAgICAgICAgY29uc3QgdHJhbnNpdGlvbiA9IHRoaXMudmlzaXRUcmFuc2l0aW9uKGRlZiBhcyBBbmltYXRpb25UcmFuc2l0aW9uTWV0YWRhdGEsIGNvbnRleHQpO1xuICAgICAgICBxdWVyeUNvdW50ICs9IHRyYW5zaXRpb24ucXVlcnlDb3VudDtcbiAgICAgICAgZGVwQ291bnQgKz0gdHJhbnNpdGlvbi5kZXBDb3VudDtcbiAgICAgICAgdHJhbnNpdGlvbnMucHVzaCh0cmFuc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHQuZXJyb3JzLnB1c2goXG4gICAgICAgICAgICAnb25seSBzdGF0ZSgpIGFuZCB0cmFuc2l0aW9uKCkgZGVmaW5pdGlvbnMgY2FuIHNpdCBpbnNpZGUgb2YgYSB0cmlnZ2VyKCknKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuVHJpZ2dlcixcbiAgICAgIG5hbWU6IG1ldGFkYXRhLm5hbWUsIHN0YXRlcywgdHJhbnNpdGlvbnMsIHF1ZXJ5Q291bnQsIGRlcENvdW50LFxuICAgICAgb3B0aW9uczogbnVsbFxuICAgIH07XG4gIH1cblxuICB2aXNpdFN0YXRlKG1ldGFkYXRhOiBBbmltYXRpb25TdGF0ZU1ldGFkYXRhLCBjb250ZXh0OiBBbmltYXRpb25Bc3RCdWlsZGVyQ29udGV4dCk6IFN0YXRlQXN0IHtcbiAgICBjb25zdCBzdHlsZUFzdCA9IHRoaXMudmlzaXRTdHlsZShtZXRhZGF0YS5zdHlsZXMsIGNvbnRleHQpO1xuICAgIGNvbnN0IGFzdFBhcmFtcyA9IChtZXRhZGF0YS5vcHRpb25zICYmIG1ldGFkYXRhLm9wdGlvbnMucGFyYW1zKSB8fCBudWxsO1xuICAgIGlmIChzdHlsZUFzdC5jb250YWluc0R5bmFtaWNTdHlsZXMpIHtcbiAgICAgIGNvbnN0IG1pc3NpbmdTdWJzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICBjb25zdCBwYXJhbXMgPSBhc3RQYXJhbXMgfHwge307XG4gICAgICBzdHlsZUFzdC5zdHlsZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICBjb25zdCBzdHlsZXNPYmogPSB2YWx1ZSBhcyBhbnk7XG4gICAgICAgICAgT2JqZWN0LmtleXMoc3R5bGVzT2JqKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgZXh0cmFjdFN0eWxlUGFyYW1zKHN0eWxlc09ialtwcm9wXSkuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXBhcmFtcy5oYXNPd25Qcm9wZXJ0eShzdWIpKSB7XG4gICAgICAgICAgICAgICAgbWlzc2luZ1N1YnMuYWRkKHN1Yik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChtaXNzaW5nU3Vicy5zaXplKSB7XG4gICAgICAgIGNvbnN0IG1pc3NpbmdTdWJzQXJyID0gaXRlcmF0b3JUb0FycmF5KG1pc3NpbmdTdWJzLnZhbHVlcygpKTtcbiAgICAgICAgY29udGV4dC5lcnJvcnMucHVzaChcbiAgICAgICAgICAgIGBzdGF0ZShcIiR7bWV0YWRhdGEubmFtZX1cIiwgLi4uKSBtdXN0IGRlZmluZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZSBmb2xsb3dpbmcgc3R5bGUgc3Vic3RpdHV0aW9uczogJHttaXNzaW5nU3Vic0Fyci5qb2luKCcsICcpfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuU3RhdGUsXG4gICAgICBuYW1lOiBtZXRhZGF0YS5uYW1lLFxuICAgICAgc3R5bGU6IHN0eWxlQXN0LFxuICAgICAgb3B0aW9uczogYXN0UGFyYW1zID8ge3BhcmFtczogYXN0UGFyYW1zfSA6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgdmlzaXRUcmFuc2l0aW9uKG1ldGFkYXRhOiBBbmltYXRpb25UcmFuc2l0aW9uTWV0YWRhdGEsIGNvbnRleHQ6IEFuaW1hdGlvbkFzdEJ1aWxkZXJDb250ZXh0KTpcbiAgICAgIFRyYW5zaXRpb25Bc3Qge1xuICAgIGNvbnRleHQucXVlcnlDb3VudCA9IDA7XG4gICAgY29udGV4dC5kZXBDb3VudCA9IDA7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gdmlzaXREc2xOb2RlKHRoaXMsIG5vcm1hbGl6ZUFuaW1hdGlvbkVudHJ5KG1ldGFkYXRhLmFuaW1hdGlvbiksIGNvbnRleHQpO1xuICAgIGNvbnN0IG1hdGNoZXJzID0gcGFyc2VUcmFuc2l0aW9uRXhwcihtZXRhZGF0YS5leHByLCBjb250ZXh0LmVycm9ycyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlRyYW5zaXRpb24sXG4gICAgICBtYXRjaGVycyxcbiAgICAgIGFuaW1hdGlvbixcbiAgICAgIHF1ZXJ5Q291bnQ6IGNvbnRleHQucXVlcnlDb3VudCxcbiAgICAgIGRlcENvdW50OiBjb250ZXh0LmRlcENvdW50LFxuICAgICAgb3B0aW9uczogbm9ybWFsaXplQW5pbWF0aW9uT3B0aW9ucyhtZXRhZGF0YS5vcHRpb25zKVxuICAgIH07XG4gIH1cblxuICB2aXNpdFNlcXVlbmNlKG1ldGFkYXRhOiBBbmltYXRpb25TZXF1ZW5jZU1ldGFkYXRhLCBjb250ZXh0OiBBbmltYXRpb25Bc3RCdWlsZGVyQ29udGV4dCk6XG4gICAgICBTZXF1ZW5jZUFzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TZXF1ZW5jZSxcbiAgICAgIHN0ZXBzOiBtZXRhZGF0YS5zdGVwcy5tYXAocyA9PiB2aXNpdERzbE5vZGUodGhpcywgcywgY29udGV4dCkpLFxuICAgICAgb3B0aW9uczogbm9ybWFsaXplQW5pbWF0aW9uT3B0aW9ucyhtZXRhZGF0YS5vcHRpb25zKVxuICAgIH07XG4gIH1cblxuICB2aXNpdEdyb3VwKG1ldGFkYXRhOiBBbmltYXRpb25Hcm91cE1ldGFkYXRhLCBjb250ZXh0OiBBbmltYXRpb25Bc3RCdWlsZGVyQ29udGV4dCk6IEdyb3VwQXN0IHtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IGNvbnRleHQuY3VycmVudFRpbWU7XG4gICAgbGV0IGZ1cnRoZXN0VGltZSA9IDA7XG4gICAgY29uc3Qgc3RlcHMgPSBtZXRhZGF0YS5zdGVwcy5tYXAoc3RlcCA9PiB7XG4gICAgICBjb250ZXh0LmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICBjb25zdCBpbm5lckFzdCA9IHZpc2l0RHNsTm9kZSh0aGlzLCBzdGVwLCBjb250ZXh0KTtcbiAgICAgIGZ1cnRoZXN0VGltZSA9IE1hdGgubWF4KGZ1cnRoZXN0VGltZSwgY29udGV4dC5jdXJyZW50VGltZSk7XG4gICAgICByZXR1cm4gaW5uZXJBc3Q7XG4gICAgfSk7XG5cbiAgICBjb250ZXh0LmN1cnJlbnRUaW1lID0gZnVydGhlc3RUaW1lO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuR3JvdXAsXG4gICAgICBzdGVwcyxcbiAgICAgIG9wdGlvbnM6IG5vcm1hbGl6ZUFuaW1hdGlvbk9wdGlvbnMobWV0YWRhdGEub3B0aW9ucylcbiAgICB9O1xuICB9XG5cbiAgdmlzaXRBbmltYXRlKG1ldGFkYXRhOiBBbmltYXRpb25BbmltYXRlTWV0YWRhdGEsIGNvbnRleHQ6IEFuaW1hdGlvbkFzdEJ1aWxkZXJDb250ZXh0KTpcbiAgICAgIEFuaW1hdGVBc3Qge1xuICAgIGNvbnN0IHRpbWluZ0FzdCA9IGNvbnN0cnVjdFRpbWluZ0FzdChtZXRhZGF0YS50aW1pbmdzLCBjb250ZXh0LmVycm9ycyk7XG4gICAgY29udGV4dC5jdXJyZW50QW5pbWF0ZVRpbWluZ3MgPSB0aW1pbmdBc3Q7XG5cbiAgICBsZXQgc3R5bGVBc3Q6IFN0eWxlQXN0fEtleWZyYW1lc0FzdDtcbiAgICBsZXQgc3R5bGVNZXRhZGF0YTogQW5pbWF0aW9uTWV0YWRhdGEgPSBtZXRhZGF0YS5zdHlsZXMgPyBtZXRhZGF0YS5zdHlsZXMgOiBzdHlsZSh7fSk7XG4gICAgaWYgKHN0eWxlTWV0YWRhdGEudHlwZSA9PSBBbmltYXRpb25NZXRhZGF0YVR5cGUuS2V5ZnJhbWVzKSB7XG4gICAgICBzdHlsZUFzdCA9IHRoaXMudmlzaXRLZXlmcmFtZXMoc3R5bGVNZXRhZGF0YSBhcyBBbmltYXRpb25LZXlmcmFtZXNTZXF1ZW5jZU1ldGFkYXRhLCBjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHN0eWxlTWV0YWRhdGEgPSBtZXRhZGF0YS5zdHlsZXMgYXMgQW5pbWF0aW9uU3R5bGVNZXRhZGF0YTtcbiAgICAgIGxldCBpc0VtcHR5ID0gZmFsc2U7XG4gICAgICBpZiAoIXN0eWxlTWV0YWRhdGEpIHtcbiAgICAgICAgaXNFbXB0eSA9IHRydWU7XG4gICAgICAgIGNvbnN0IG5ld1N0eWxlRGF0YToge1twcm9wOiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXJ9ID0ge307XG4gICAgICAgIGlmICh0aW1pbmdBc3QuZWFzaW5nKSB7XG4gICAgICAgICAgbmV3U3R5bGVEYXRhWydlYXNpbmcnXSA9IHRpbWluZ0FzdC5lYXNpbmc7XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGVNZXRhZGF0YSA9IHN0eWxlKG5ld1N0eWxlRGF0YSk7XG4gICAgICB9XG4gICAgICBjb250ZXh0LmN1cnJlbnRUaW1lICs9IHRpbWluZ0FzdC5kdXJhdGlvbiArIHRpbWluZ0FzdC5kZWxheTtcbiAgICAgIGNvbnN0IF9zdHlsZUFzdCA9IHRoaXMudmlzaXRTdHlsZShzdHlsZU1ldGFkYXRhLCBjb250ZXh0KTtcbiAgICAgIF9zdHlsZUFzdC5pc0VtcHR5U3RlcCA9IGlzRW1wdHk7XG4gICAgICBzdHlsZUFzdCA9IF9zdHlsZUFzdDtcbiAgICB9XG5cbiAgICBjb250ZXh0LmN1cnJlbnRBbmltYXRlVGltaW5ncyA9IG51bGw7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5BbmltYXRlLFxuICAgICAgdGltaW5nczogdGltaW5nQXN0LFxuICAgICAgc3R5bGU6IHN0eWxlQXN0LFxuICAgICAgb3B0aW9uczogbnVsbFxuICAgIH07XG4gIH1cblxuICB2aXNpdFN0eWxlKG1ldGFkYXRhOiBBbmltYXRpb25TdHlsZU1ldGFkYXRhLCBjb250ZXh0OiBBbmltYXRpb25Bc3RCdWlsZGVyQ29udGV4dCk6IFN0eWxlQXN0IHtcbiAgICBjb25zdCBhc3QgPSB0aGlzLl9tYWtlU3R5bGVBc3QobWV0YWRhdGEsIGNvbnRleHQpO1xuICAgIHRoaXMuX3ZhbGlkYXRlU3R5bGVBc3QoYXN0LCBjb250ZXh0KTtcbiAgICByZXR1cm4gYXN0O1xuICB9XG5cbiAgcHJpdmF0ZSBfbWFrZVN0eWxlQXN0KG1ldGFkYXRhOiBBbmltYXRpb25TdHlsZU1ldGFkYXRhLCBjb250ZXh0OiBBbmltYXRpb25Bc3RCdWlsZGVyQ29udGV4dCk6XG4gICAgICBTdHlsZUFzdCB7XG4gICAgY29uc3Qgc3R5bGVzOiAoybVTdHlsZURhdGEgfCBzdHJpbmcpW10gPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZXRhZGF0YS5zdHlsZXMpKSB7XG4gICAgICAobWV0YWRhdGEuc3R5bGVzIGFzKMm1U3R5bGVEYXRhIHwgc3RyaW5nKVtdKS5mb3JFYWNoKHN0eWxlVHVwbGUgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHN0eWxlVHVwbGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoc3R5bGVUdXBsZSA9PSBBVVRPX1NUWUxFKSB7XG4gICAgICAgICAgICBzdHlsZXMucHVzaChzdHlsZVR1cGxlIGFzIHN0cmluZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuZXJyb3JzLnB1c2goYFRoZSBwcm92aWRlZCBzdHlsZSBzdHJpbmcgdmFsdWUgJHtzdHlsZVR1cGxlfSBpcyBub3QgYWxsb3dlZC5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGVzLnB1c2goc3R5bGVUdXBsZSBhcyDJtVN0eWxlRGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMucHVzaChtZXRhZGF0YS5zdHlsZXMpO1xuICAgIH1cblxuICAgIGxldCBjb250YWluc0R5bmFtaWNTdHlsZXMgPSBmYWxzZTtcbiAgICBsZXQgY29sbGVjdGVkRWFzaW5nOiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gICAgc3R5bGVzLmZvckVhY2goc3R5bGVEYXRhID0+IHtcbiAgICAgIGlmIChpc09iamVjdChzdHlsZURhdGEpKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlTWFwID0gc3R5bGVEYXRhIGFzIMm1U3R5bGVEYXRhO1xuICAgICAgICBjb25zdCBlYXNpbmcgPSBzdHlsZU1hcFsnZWFzaW5nJ107XG4gICAgICAgIGlmIChlYXNpbmcpIHtcbiAgICAgICAgICBjb2xsZWN0ZWRFYXNpbmcgPSBlYXNpbmcgYXMgc3RyaW5nO1xuICAgICAgICAgIGRlbGV0ZSBzdHlsZU1hcFsnZWFzaW5nJ107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb250YWluc0R5bmFtaWNTdHlsZXMpIHtcbiAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHN0eWxlTWFwKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHN0eWxlTWFwW3Byb3BdO1xuICAgICAgICAgICAgaWYgKHZhbHVlLnRvU3RyaW5nKCkuaW5kZXhPZihTVUJTVElUVVRJT05fRVhQUl9TVEFSVCkgPj0gMCkge1xuICAgICAgICAgICAgICBjb250YWluc0R5bmFtaWNTdHlsZXMgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuU3R5bGUsXG4gICAgICBzdHlsZXMsXG4gICAgICBlYXNpbmc6IGNvbGxlY3RlZEVhc2luZyxcbiAgICAgIG9mZnNldDogbWV0YWRhdGEub2Zmc2V0LCBjb250YWluc0R5bmFtaWNTdHlsZXMsXG4gICAgICBvcHRpb25zOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRlU3R5bGVBc3QoYXN0OiBTdHlsZUFzdCwgY29udGV4dDogQW5pbWF0aW9uQXN0QnVpbGRlckNvbnRleHQpOiB2b2lkIHtcbiAgICBjb25zdCB0aW1pbmdzID0gY29udGV4dC5jdXJyZW50QW5pbWF0ZVRpbWluZ3M7XG4gICAgbGV0IGVuZFRpbWUgPSBjb250ZXh0LmN1cnJlbnRUaW1lO1xuICAgIGxldCBzdGFydFRpbWUgPSBjb250ZXh0LmN1cnJlbnRUaW1lO1xuICAgIGlmICh0aW1pbmdzICYmIHN0YXJ0VGltZSA+IDApIHtcbiAgICAgIHN0YXJ0VGltZSAtPSB0aW1pbmdzLmR1cmF0aW9uICsgdGltaW5ncy5kZWxheTtcbiAgICB9XG5cbiAgICBhc3Quc3R5bGVzLmZvckVhY2godHVwbGUgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0dXBsZSA9PSAnc3RyaW5nJykgcmV0dXJuO1xuXG4gICAgICBPYmplY3Qua2V5cyh0dXBsZSkuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9kcml2ZXIudmFsaWRhdGVTdHlsZVByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgY29udGV4dC5lcnJvcnMucHVzaChcbiAgICAgICAgICAgICAgYFRoZSBwcm92aWRlZCBhbmltYXRpb24gcHJvcGVydHkgXCIke3Byb3B9XCIgaXMgbm90IGEgc3VwcG9ydGVkIENTUyBwcm9wZXJ0eSBmb3IgYW5pbWF0aW9uc2ApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbGxlY3RlZFN0eWxlcyA9IGNvbnRleHQuY29sbGVjdGVkU3R5bGVzW2NvbnRleHQuY3VycmVudFF1ZXJ5U2VsZWN0b3IgIV07XG4gICAgICAgIGNvbnN0IGNvbGxlY3RlZEVudHJ5ID0gY29sbGVjdGVkU3R5bGVzW3Byb3BdO1xuICAgICAgICBsZXQgdXBkYXRlQ29sbGVjdGVkU3R5bGUgPSB0cnVlO1xuICAgICAgICBpZiAoY29sbGVjdGVkRW50cnkpIHtcbiAgICAgICAgICBpZiAoc3RhcnRUaW1lICE9IGVuZFRpbWUgJiYgc3RhcnRUaW1lID49IGNvbGxlY3RlZEVudHJ5LnN0YXJ0VGltZSAmJlxuICAgICAgICAgICAgICBlbmRUaW1lIDw9IGNvbGxlY3RlZEVudHJ5LmVuZFRpbWUpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZXJyb3JzLnB1c2goXG4gICAgICAgICAgICAgICAgYFRoZSBDU1MgcHJvcGVydHkgXCIke3Byb3B9XCIgdGhhdCBleGlzdHMgYmV0d2VlbiB0aGUgdGltZXMgb2YgXCIke2NvbGxlY3RlZEVudHJ5LnN0YXJ0VGltZX1tc1wiIGFuZCBcIiR7Y29sbGVjdGVkRW50cnkuZW5kVGltZX1tc1wiIGlzIGFsc28gYmVpbmcgYW5pbWF0ZWQgaW4gYSBwYXJhbGxlbCBhbmltYXRpb24gYmV0d2VlbiB0aGUgdGltZXMgb2YgXCIke3N0YXJ0VGltZX1tc1wiIGFuZCBcIiR7ZW5kVGltZX1tc1wiYCk7XG4gICAgICAgICAgICB1cGRhdGVDb2xsZWN0ZWRTdHlsZSA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHdlIGFsd2F5cyBjaG9vc2UgdGhlIHNtYWxsZXIgc3RhcnQgdGltZSB2YWx1ZSBzaW5jZSB3ZVxuICAgICAgICAgIC8vIHdhbnQgdG8gaGF2ZSBhIHJlY29yZCBvZiB0aGUgZW50aXJlIGFuaW1hdGlvbiB3aW5kb3cgd2hlcmVcbiAgICAgICAgICAvLyB0aGUgc3R5bGUgcHJvcGVydHkgaXMgYmVpbmcgYW5pbWF0ZWQgaW4gYmV0d2VlblxuICAgICAgICAgIHN0YXJ0VGltZSA9IGNvbGxlY3RlZEVudHJ5LnN0YXJ0VGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cGRhdGVDb2xsZWN0ZWRTdHlsZSkge1xuICAgICAgICAgIGNvbGxlY3RlZFN0eWxlc1twcm9wXSA9IHtzdGFydFRpbWUsIGVuZFRpbWV9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQub3B0aW9ucykge1xuICAgICAgICAgIHZhbGlkYXRlU3R5bGVQYXJhbXModHVwbGVbcHJvcF0sIGNvbnRleHQub3B0aW9ucywgY29udGV4dC5lcnJvcnMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHZpc2l0S2V5ZnJhbWVzKG1ldGFkYXRhOiBBbmltYXRpb25LZXlmcmFtZXNTZXF1ZW5jZU1ldGFkYXRhLCBjb250ZXh0OiBBbmltYXRpb25Bc3RCdWlsZGVyQ29udGV4dCk6XG4gICAgICBLZXlmcmFtZXNBc3Qge1xuICAgIGNvbnN0IGFzdDogS2V5ZnJhbWVzQXN0ID0ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5LZXlmcmFtZXMsIHN0eWxlczogW10sIG9wdGlvbnM6IG51bGx9O1xuICAgIGlmICghY29udGV4dC5jdXJyZW50QW5pbWF0ZVRpbWluZ3MpIHtcbiAgICAgIGNvbnRleHQuZXJyb3JzLnB1c2goYGtleWZyYW1lcygpIG11c3QgYmUgcGxhY2VkIGluc2lkZSBvZiBhIGNhbGwgdG8gYW5pbWF0ZSgpYCk7XG4gICAgICByZXR1cm4gYXN0O1xuICAgIH1cblxuICAgIGNvbnN0IE1BWF9LRVlGUkFNRV9PRkZTRVQgPSAxO1xuXG4gICAgbGV0IHRvdGFsS2V5ZnJhbWVzV2l0aE9mZnNldHMgPSAwO1xuICAgIGNvbnN0IG9mZnNldHM6IG51bWJlcltdID0gW107XG4gICAgbGV0IG9mZnNldHNPdXRPZk9yZGVyID0gZmFsc2U7XG4gICAgbGV0IGtleWZyYW1lc091dE9mUmFuZ2UgPSBmYWxzZTtcbiAgICBsZXQgcHJldmlvdXNPZmZzZXQ6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdCBrZXlmcmFtZXM6IFN0eWxlQXN0W10gPSBtZXRhZGF0YS5zdGVwcy5tYXAoc3R5bGVzID0+IHtcbiAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5fbWFrZVN0eWxlQXN0KHN0eWxlcywgY29udGV4dCk7XG4gICAgICBsZXQgb2Zmc2V0VmFsOiBudW1iZXJ8bnVsbCA9XG4gICAgICAgICAgc3R5bGUub2Zmc2V0ICE9IG51bGwgPyBzdHlsZS5vZmZzZXQgOiBjb25zdW1lT2Zmc2V0KHN0eWxlLnN0eWxlcyk7XG4gICAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICAgICAgaWYgKG9mZnNldFZhbCAhPSBudWxsKSB7XG4gICAgICAgIHRvdGFsS2V5ZnJhbWVzV2l0aE9mZnNldHMrKztcbiAgICAgICAgb2Zmc2V0ID0gc3R5bGUub2Zmc2V0ID0gb2Zmc2V0VmFsO1xuICAgICAgfVxuICAgICAga2V5ZnJhbWVzT3V0T2ZSYW5nZSA9IGtleWZyYW1lc091dE9mUmFuZ2UgfHwgb2Zmc2V0IDwgMCB8fCBvZmZzZXQgPiAxO1xuICAgICAgb2Zmc2V0c091dE9mT3JkZXIgPSBvZmZzZXRzT3V0T2ZPcmRlciB8fCBvZmZzZXQgPCBwcmV2aW91c09mZnNldDtcbiAgICAgIHByZXZpb3VzT2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgb2Zmc2V0cy5wdXNoKG9mZnNldCk7XG4gICAgICByZXR1cm4gc3R5bGU7XG4gICAgfSk7XG5cbiAgICBpZiAoa2V5ZnJhbWVzT3V0T2ZSYW5nZSkge1xuICAgICAgY29udGV4dC5lcnJvcnMucHVzaChgUGxlYXNlIGVuc3VyZSB0aGF0IGFsbCBrZXlmcmFtZSBvZmZzZXRzIGFyZSBiZXR3ZWVuIDAgYW5kIDFgKTtcbiAgICB9XG5cbiAgICBpZiAob2Zmc2V0c091dE9mT3JkZXIpIHtcbiAgICAgIGNvbnRleHQuZXJyb3JzLnB1c2goYFBsZWFzZSBlbnN1cmUgdGhhdCBhbGwga2V5ZnJhbWUgb2Zmc2V0cyBhcmUgaW4gb3JkZXJgKTtcbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSBtZXRhZGF0YS5zdGVwcy5sZW5ndGg7XG4gICAgbGV0IGdlbmVyYXRlZE9mZnNldCA9IDA7XG4gICAgaWYgKHRvdGFsS2V5ZnJhbWVzV2l0aE9mZnNldHMgPiAwICYmIHRvdGFsS2V5ZnJhbWVzV2l0aE9mZnNldHMgPCBsZW5ndGgpIHtcbiAgICAgIGNvbnRleHQuZXJyb3JzLnB1c2goYE5vdCBhbGwgc3R5bGUoKSBzdGVwcyB3aXRoaW4gdGhlIGRlY2xhcmVkIGtleWZyYW1lcygpIGNvbnRhaW4gb2Zmc2V0c2ApO1xuICAgIH0gZWxzZSBpZiAodG90YWxLZXlmcmFtZXNXaXRoT2Zmc2V0cyA9PSAwKSB7XG4gICAgICBnZW5lcmF0ZWRPZmZzZXQgPSBNQVhfS0VZRlJBTUVfT0ZGU0VUIC8gKGxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIGNvbnN0IGxpbWl0ID0gbGVuZ3RoIC0gMTtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IGNvbnRleHQuY3VycmVudFRpbWU7XG4gICAgY29uc3QgY3VycmVudEFuaW1hdGVUaW1pbmdzID0gY29udGV4dC5jdXJyZW50QW5pbWF0ZVRpbWluZ3MgITtcbiAgICBjb25zdCBhbmltYXRlRHVyYXRpb24gPSBjdXJyZW50QW5pbWF0ZVRpbWluZ3MuZHVyYXRpb247XG4gICAga2V5ZnJhbWVzLmZvckVhY2goKGtmLCBpKSA9PiB7XG4gICAgICBjb25zdCBvZmZzZXQgPSBnZW5lcmF0ZWRPZmZzZXQgPiAwID8gKGkgPT0gbGltaXQgPyAxIDogKGdlbmVyYXRlZE9mZnNldCAqIGkpKSA6IG9mZnNldHNbaV07XG4gICAgICBjb25zdCBkdXJhdGlvblVwVG9UaGlzRnJhbWUgPSBvZmZzZXQgKiBhbmltYXRlRHVyYXRpb247XG4gICAgICBjb250ZXh0LmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWUgKyBjdXJyZW50QW5pbWF0ZVRpbWluZ3MuZGVsYXkgKyBkdXJhdGlvblVwVG9UaGlzRnJhbWU7XG4gICAgICBjdXJyZW50QW5pbWF0ZVRpbWluZ3MuZHVyYXRpb24gPSBkdXJhdGlvblVwVG9UaGlzRnJhbWU7XG4gICAgICB0aGlzLl92YWxpZGF0ZVN0eWxlQXN0KGtmLCBjb250ZXh0KTtcbiAgICAgIGtmLm9mZnNldCA9IG9mZnNldDtcblxuICAgICAgYXN0LnN0eWxlcy5wdXNoKGtmKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICB2aXNpdFJlZmVyZW5jZShtZXRhZGF0YTogQW5pbWF0aW9uUmVmZXJlbmNlTWV0YWRhdGEsIGNvbnRleHQ6IEFuaW1hdGlvbkFzdEJ1aWxkZXJDb250ZXh0KTpcbiAgICAgIFJlZmVyZW5jZUFzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5SZWZlcmVuY2UsXG4gICAgICBhbmltYXRpb246IHZpc2l0RHNsTm9kZSh0aGlzLCBub3JtYWxpemVBbmltYXRpb25FbnRyeShtZXRhZGF0YS5hbmltYXRpb24pLCBjb250ZXh0KSxcbiAgICAgIG9wdGlvbnM6IG5vcm1hbGl6ZUFuaW1hdGlvbk9wdGlvbnMobWV0YWRhdGEub3B0aW9ucylcbiAgICB9O1xuICB9XG5cbiAgdmlzaXRBbmltYXRlQ2hpbGQobWV0YWRhdGE6IEFuaW1hdGlvbkFuaW1hdGVDaGlsZE1ldGFkYXRhLCBjb250ZXh0OiBBbmltYXRpb25Bc3RCdWlsZGVyQ29udGV4dCk6XG4gICAgICBBbmltYXRlQ2hpbGRBc3Qge1xuICAgIGNvbnRleHQuZGVwQ291bnQrKztcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLkFuaW1hdGVDaGlsZCxcbiAgICAgIG9wdGlvbnM6IG5vcm1hbGl6ZUFuaW1hdGlvbk9wdGlvbnMobWV0YWRhdGEub3B0aW9ucylcbiAgICB9O1xuICB9XG5cbiAgdmlzaXRBbmltYXRlUmVmKG1ldGFkYXRhOiBBbmltYXRpb25BbmltYXRlUmVmTWV0YWRhdGEsIGNvbnRleHQ6IEFuaW1hdGlvbkFzdEJ1aWxkZXJDb250ZXh0KTpcbiAgICAgIEFuaW1hdGVSZWZBc3Qge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuQW5pbWF0ZVJlZixcbiAgICAgIGFuaW1hdGlvbjogdGhpcy52aXNpdFJlZmVyZW5jZShtZXRhZGF0YS5hbmltYXRpb24sIGNvbnRleHQpLFxuICAgICAgb3B0aW9uczogbm9ybWFsaXplQW5pbWF0aW9uT3B0aW9ucyhtZXRhZGF0YS5vcHRpb25zKVxuICAgIH07XG4gIH1cblxuICB2aXNpdFF1ZXJ5KG1ldGFkYXRhOiBBbmltYXRpb25RdWVyeU1ldGFkYXRhLCBjb250ZXh0OiBBbmltYXRpb25Bc3RCdWlsZGVyQ29udGV4dCk6IFF1ZXJ5QXN0IHtcbiAgICBjb25zdCBwYXJlbnRTZWxlY3RvciA9IGNvbnRleHQuY3VycmVudFF1ZXJ5U2VsZWN0b3IgITtcbiAgICBjb25zdCBvcHRpb25zID0gKG1ldGFkYXRhLm9wdGlvbnMgfHwge30pIGFzIEFuaW1hdGlvblF1ZXJ5T3B0aW9ucztcblxuICAgIGNvbnRleHQucXVlcnlDb3VudCsrO1xuICAgIGNvbnRleHQuY3VycmVudFF1ZXJ5ID0gbWV0YWRhdGE7XG4gICAgY29uc3QgW3NlbGVjdG9yLCBpbmNsdWRlU2VsZl0gPSBub3JtYWxpemVTZWxlY3RvcihtZXRhZGF0YS5zZWxlY3Rvcik7XG4gICAgY29udGV4dC5jdXJyZW50UXVlcnlTZWxlY3RvciA9XG4gICAgICAgIHBhcmVudFNlbGVjdG9yLmxlbmd0aCA/IChwYXJlbnRTZWxlY3RvciArICcgJyArIHNlbGVjdG9yKSA6IHNlbGVjdG9yO1xuICAgIGdldE9yU2V0QXNJbk1hcChjb250ZXh0LmNvbGxlY3RlZFN0eWxlcywgY29udGV4dC5jdXJyZW50UXVlcnlTZWxlY3Rvciwge30pO1xuXG4gICAgY29uc3QgYW5pbWF0aW9uID0gdmlzaXREc2xOb2RlKHRoaXMsIG5vcm1hbGl6ZUFuaW1hdGlvbkVudHJ5KG1ldGFkYXRhLmFuaW1hdGlvbiksIGNvbnRleHQpO1xuICAgIGNvbnRleHQuY3VycmVudFF1ZXJ5ID0gbnVsbDtcbiAgICBjb250ZXh0LmN1cnJlbnRRdWVyeVNlbGVjdG9yID0gcGFyZW50U2VsZWN0b3I7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlF1ZXJ5LFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBsaW1pdDogb3B0aW9ucy5saW1pdCB8fCAwLFxuICAgICAgb3B0aW9uYWw6ICEhb3B0aW9ucy5vcHRpb25hbCwgaW5jbHVkZVNlbGYsIGFuaW1hdGlvbixcbiAgICAgIG9yaWdpbmFsU2VsZWN0b3I6IG1ldGFkYXRhLnNlbGVjdG9yLFxuICAgICAgb3B0aW9uczogbm9ybWFsaXplQW5pbWF0aW9uT3B0aW9ucyhtZXRhZGF0YS5vcHRpb25zKVxuICAgIH07XG4gIH1cblxuICB2aXNpdFN0YWdnZXIobWV0YWRhdGE6IEFuaW1hdGlvblN0YWdnZXJNZXRhZGF0YSwgY29udGV4dDogQW5pbWF0aW9uQXN0QnVpbGRlckNvbnRleHQpOlxuICAgICAgU3RhZ2dlckFzdCB7XG4gICAgaWYgKCFjb250ZXh0LmN1cnJlbnRRdWVyeSkge1xuICAgICAgY29udGV4dC5lcnJvcnMucHVzaChgc3RhZ2dlcigpIGNhbiBvbmx5IGJlIHVzZWQgaW5zaWRlIG9mIHF1ZXJ5KClgKTtcbiAgICB9XG4gICAgY29uc3QgdGltaW5ncyA9IG1ldGFkYXRhLnRpbWluZ3MgPT09ICdmdWxsJyA/XG4gICAgICAgIHtkdXJhdGlvbjogMCwgZGVsYXk6IDAsIGVhc2luZzogJ2Z1bGwnfSA6XG4gICAgICAgIHJlc29sdmVUaW1pbmcobWV0YWRhdGEudGltaW5ncywgY29udGV4dC5lcnJvcnMsIHRydWUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TdGFnZ2VyLFxuICAgICAgYW5pbWF0aW9uOiB2aXNpdERzbE5vZGUodGhpcywgbm9ybWFsaXplQW5pbWF0aW9uRW50cnkobWV0YWRhdGEuYW5pbWF0aW9uKSwgY29udGV4dCksIHRpbWluZ3MsXG4gICAgICBvcHRpb25zOiBudWxsXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVTZWxlY3RvcihzZWxlY3Rvcjogc3RyaW5nKTogW3N0cmluZywgYm9vbGVhbl0ge1xuICBjb25zdCBoYXNBbXBlcnNhbmQgPSBzZWxlY3Rvci5zcGxpdCgvXFxzKixcXHMqLykuZmluZCh0b2tlbiA9PiB0b2tlbiA9PSBTRUxGX1RPS0VOKSA/IHRydWUgOiBmYWxzZTtcbiAgaWYgKGhhc0FtcGVyc2FuZCkge1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZShTRUxGX1RPS0VOX1JFR0VYLCAnJyk7XG4gIH1cblxuICAvLyB0aGUgOmVudGVyIGFuZCA6bGVhdmUgc2VsZWN0b3JzIGFyZSBmaWxsZWQgaW4gYXQgcnVudGltZSBkdXJpbmcgdGltZWxpbmUgYnVpbGRpbmdcbiAgc2VsZWN0b3IgPSBzZWxlY3Rvci5yZXBsYWNlKC9AXFwqL2csIE5HX1RSSUdHRVJfU0VMRUNUT1IpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9AXFx3Ky9nLCBtYXRjaCA9PiBOR19UUklHR0VSX1NFTEVDVE9SICsgJy0nICsgbWF0Y2guc3Vic3RyKDEpKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvOmFuaW1hdGluZy9nLCBOR19BTklNQVRJTkdfU0VMRUNUT1IpO1xuXG4gIHJldHVybiBbc2VsZWN0b3IsIGhhc0FtcGVyc2FuZF07XG59XG5cblxuZnVuY3Rpb24gbm9ybWFsaXplUGFyYW1zKG9iajoge1trZXk6IHN0cmluZ106IGFueX0gfCBhbnkpOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsIHtcbiAgcmV0dXJuIG9iaiA/IGNvcHlPYmoob2JqKSA6IG51bGw7XG59XG5cbmV4cG9ydCB0eXBlIFN0eWxlVGltZVR1cGxlID0ge1xuICBzdGFydFRpbWU6IG51bWJlcjsgZW5kVGltZTogbnVtYmVyO1xufTtcblxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkFzdEJ1aWxkZXJDb250ZXh0IHtcbiAgcHVibGljIHF1ZXJ5Q291bnQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBkZXBDb3VudDogbnVtYmVyID0gMDtcbiAgcHVibGljIGN1cnJlbnRUcmFuc2l0aW9uOiBBbmltYXRpb25UcmFuc2l0aW9uTWV0YWRhdGF8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBjdXJyZW50UXVlcnk6IEFuaW1hdGlvblF1ZXJ5TWV0YWRhdGF8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBjdXJyZW50UXVlcnlTZWxlY3Rvcjogc3RyaW5nfG51bGwgPSBudWxsO1xuICBwdWJsaWMgY3VycmVudEFuaW1hdGVUaW1pbmdzOiBUaW1pbmdBc3R8bnVsbCA9IG51bGw7XG4gIHB1YmxpYyBjdXJyZW50VGltZTogbnVtYmVyID0gMDtcbiAgcHVibGljIGNvbGxlY3RlZFN0eWxlczoge1tzZWxlY3Rvck5hbWU6IHN0cmluZ106IHtbcHJvcE5hbWU6IHN0cmluZ106IFN0eWxlVGltZVR1cGxlfX0gPSB7fTtcbiAgcHVibGljIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnN8bnVsbCA9IG51bGw7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlcnJvcnM6IGFueVtdKSB7fVxufVxuXG5mdW5jdGlvbiBjb25zdW1lT2Zmc2V0KHN0eWxlczogybVTdHlsZURhdGEgfCBzdHJpbmcgfCAoybVTdHlsZURhdGEgfCBzdHJpbmcpW10pOiBudW1iZXJ8bnVsbCB7XG4gIGlmICh0eXBlb2Ygc3R5bGVzID09ICdzdHJpbmcnKSByZXR1cm4gbnVsbDtcblxuICBsZXQgb2Zmc2V0OiBudW1iZXJ8bnVsbCA9IG51bGw7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGVzKSkge1xuICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlVHVwbGUgPT4ge1xuICAgICAgaWYgKGlzT2JqZWN0KHN0eWxlVHVwbGUpICYmIHN0eWxlVHVwbGUuaGFzT3duUHJvcGVydHkoJ29mZnNldCcpKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHN0eWxlVHVwbGUgYXMgybVTdHlsZURhdGE7XG4gICAgICAgIG9mZnNldCA9IHBhcnNlRmxvYXQob2JqWydvZmZzZXQnXSBhcyBzdHJpbmcpO1xuICAgICAgICBkZWxldGUgb2JqWydvZmZzZXQnXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIGlmIChpc09iamVjdChzdHlsZXMpICYmIHN0eWxlcy5oYXNPd25Qcm9wZXJ0eSgnb2Zmc2V0JykpIHtcbiAgICBjb25zdCBvYmogPSBzdHlsZXMgYXMgybVTdHlsZURhdGE7XG4gICAgb2Zmc2V0ID0gcGFyc2VGbG9hdChvYmpbJ29mZnNldCddIGFzIHN0cmluZyk7XG4gICAgZGVsZXRlIG9ialsnb2Zmc2V0J107XG4gIH1cbiAgcmV0dXJuIG9mZnNldDtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gIUFycmF5LmlzQXJyYXkodmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0VGltaW5nQXN0KHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBBbmltYXRlVGltaW5ncywgZXJyb3JzOiBhbnlbXSkge1xuICBsZXQgdGltaW5nczogQW5pbWF0ZVRpbWluZ3N8bnVsbCA9IG51bGw7XG4gIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnZHVyYXRpb24nKSkge1xuICAgIHRpbWluZ3MgPSB2YWx1ZSBhcyBBbmltYXRlVGltaW5ncztcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IHJlc29sdmVUaW1pbmcodmFsdWUgYXMgbnVtYmVyLCBlcnJvcnMpLmR1cmF0aW9uO1xuICAgIHJldHVybiBtYWtlVGltaW5nQXN0KGR1cmF0aW9uIGFzIG51bWJlciwgMCwgJycpO1xuICB9XG5cbiAgY29uc3Qgc3RyVmFsdWUgPSB2YWx1ZSBhcyBzdHJpbmc7XG4gIGNvbnN0IGlzRHluYW1pYyA9IHN0clZhbHVlLnNwbGl0KC9cXHMrLykuc29tZSh2ID0+IHYuY2hhckF0KDApID09ICd7JyAmJiB2LmNoYXJBdCgxKSA9PSAneycpO1xuICBpZiAoaXNEeW5hbWljKSB7XG4gICAgY29uc3QgYXN0ID0gbWFrZVRpbWluZ0FzdCgwLCAwLCAnJykgYXMgYW55O1xuICAgIGFzdC5keW5hbWljID0gdHJ1ZTtcbiAgICBhc3Quc3RyVmFsdWUgPSBzdHJWYWx1ZTtcbiAgICByZXR1cm4gYXN0IGFzIER5bmFtaWNUaW1pbmdBc3Q7XG4gIH1cblxuICB0aW1pbmdzID0gdGltaW5ncyB8fCByZXNvbHZlVGltaW5nKHN0clZhbHVlLCBlcnJvcnMpO1xuICByZXR1cm4gbWFrZVRpbWluZ0FzdCh0aW1pbmdzLmR1cmF0aW9uLCB0aW1pbmdzLmRlbGF5LCB0aW1pbmdzLmVhc2luZyk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUFuaW1hdGlvbk9wdGlvbnMob3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyB8IG51bGwpOiBBbmltYXRpb25PcHRpb25zIHtcbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gY29weU9iaihvcHRpb25zKTtcbiAgICBpZiAob3B0aW9uc1sncGFyYW1zJ10pIHtcbiAgICAgIG9wdGlvbnNbJ3BhcmFtcyddID0gbm9ybWFsaXplUGFyYW1zKG9wdGlvbnNbJ3BhcmFtcyddKSAhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIG1ha2VUaW1pbmdBc3QoZHVyYXRpb246IG51bWJlciwgZGVsYXk6IG51bWJlciwgZWFzaW5nOiBzdHJpbmcgfCBudWxsKTogVGltaW5nQXN0IHtcbiAgcmV0dXJuIHtkdXJhdGlvbiwgZGVsYXksIGVhc2luZ307XG59XG4iXX0=