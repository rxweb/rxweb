/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { AnimationStateStyles, AnimationTransitionFactory } from './animation_transition_factory';
/**
 * \@experimental Animation support is experimental.
 * @param {?} name
 * @param {?} ast
 * @return {?}
 */
export function buildTrigger(name, ast) {
    return new AnimationTrigger(name, ast);
}
/**
 * \@experimental Animation support is experimental.
 */
export class AnimationTrigger {
    /**
     * @param {?} name
     * @param {?} ast
     */
    constructor(name, ast) {
        this.name = name;
        this.ast = ast;
        this.transitionFactories = [];
        this.states = {};
        ast.states.forEach(ast => {
            /** @type {?} */
            const defaultParams = (ast.options && ast.options.params) || {};
            this.states[ast.name] = new AnimationStateStyles(ast.style, defaultParams);
        });
        balanceProperties(this.states, 'true', '1');
        balanceProperties(this.states, 'false', '0');
        ast.transitions.forEach(ast => {
            this.transitionFactories.push(new AnimationTransitionFactory(name, ast, this.states));
        });
        this.fallbackTransition = createFallbackTransition(name, this.states);
    }
    /**
     * @return {?}
     */
    get containsQueries() { return this.ast.queryCount > 0; }
    /**
     * @param {?} currentState
     * @param {?} nextState
     * @param {?} element
     * @param {?} params
     * @return {?}
     */
    matchTransition(currentState, nextState, element, params) {
        /** @type {?} */
        const entry = this.transitionFactories.find(f => f.match(currentState, nextState, element, params));
        return entry || null;
    }
    /**
     * @param {?} currentState
     * @param {?} params
     * @param {?} errors
     * @return {?}
     */
    matchStyles(currentState, params, errors) {
        return this.fallbackTransition.buildStyles(currentState, params, errors);
    }
}
if (false) {
    /** @type {?} */
    AnimationTrigger.prototype.transitionFactories;
    /** @type {?} */
    AnimationTrigger.prototype.fallbackTransition;
    /** @type {?} */
    AnimationTrigger.prototype.states;
    /** @type {?} */
    AnimationTrigger.prototype.name;
    /** @type {?} */
    AnimationTrigger.prototype.ast;
}
/**
 * @param {?} triggerName
 * @param {?} states
 * @return {?}
 */
function createFallbackTransition(triggerName, states) {
    /** @type {?} */
    const matchers = [(fromState, toState) => true];
    /** @type {?} */
    const animation = { type: 2 /* Sequence */, steps: [], options: null };
    /** @type {?} */
    const transition = {
        type: 1 /* Transition */,
        animation,
        matchers,
        options: null,
        queryCount: 0,
        depCount: 0
    };
    return new AnimationTransitionFactory(triggerName, transition, states);
}
/**
 * @param {?} obj
 * @param {?} key1
 * @param {?} key2
 * @return {?}
 */
function balanceProperties(obj, key1, key2) {
    if (obj.hasOwnProperty(key1)) {
        if (!obj.hasOwnProperty(key2)) {
            obj[key2] = obj[key1];
        }
    }
    else if (obj.hasOwnProperty(key2)) {
        obj[key1] = obj[key2];
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3RyaWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL2RzbC9hbmltYXRpb25fdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBWUEsT0FBTyxFQUFDLG9CQUFvQixFQUFFLDBCQUEwQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7QUFPaEcsTUFBTSx1QkFBdUIsSUFBWSxFQUFFLEdBQWU7SUFDeEQsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztDQUN4Qzs7OztBQUtELE1BQU07Ozs7O0lBS0osWUFBbUIsSUFBWSxFQUFTLEdBQWU7UUFBcEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQVk7bUNBSkksRUFBRTtzQkFFQSxFQUFFO1FBRzdELEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztZQUN2QixNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQzVFLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTdDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3ZGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxrQkFBa0IsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZFOzs7O0lBRUQsSUFBSSxlQUFlLEtBQUssT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRTs7Ozs7Ozs7SUFFekQsZUFBZSxDQUFDLFlBQWlCLEVBQUUsU0FBYyxFQUFFLE9BQVksRUFBRSxNQUE0Qjs7UUFFM0YsTUFBTSxLQUFLLEdBQ1AsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxRixPQUFPLEtBQUssSUFBSSxJQUFJLENBQUM7S0FDdEI7Ozs7Ozs7SUFFRCxXQUFXLENBQUMsWUFBaUIsRUFBRSxNQUE0QixFQUFFLE1BQWE7UUFDeEUsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDMUU7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsa0NBQ0ksV0FBbUIsRUFDbkIsTUFBbUQ7O0lBQ3JELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxTQUFjLEVBQUUsT0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDMUQsTUFBTSxTQUFTLEdBQWdCLEVBQUMsSUFBSSxrQkFBZ0MsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQzs7SUFDaEcsTUFBTSxVQUFVLEdBQWtCO1FBQ2hDLElBQUksb0JBQWtDO1FBQ3RDLFNBQVM7UUFDVCxRQUFRO1FBQ1IsT0FBTyxFQUFFLElBQUk7UUFDYixVQUFVLEVBQUUsQ0FBQztRQUNiLFFBQVEsRUFBRSxDQUFDO0tBQ1osQ0FBQztJQUNGLE9BQU8sSUFBSSwwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ3hFOzs7Ozs7O0FBRUQsMkJBQTJCLEdBQXlCLEVBQUUsSUFBWSxFQUFFLElBQVk7SUFDOUUsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7S0FDRjtTQUFNLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvbk1ldGFkYXRhVHlwZSwgybVTdHlsZURhdGF9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQge2NvcHlTdHlsZXMsIGludGVycG9sYXRlUGFyYW1zfSBmcm9tICcuLi91dGlsJztcblxuaW1wb3J0IHtTZXF1ZW5jZUFzdCwgU3R5bGVBc3QsIFRyYW5zaXRpb25Bc3QsIFRyaWdnZXJBc3R9IGZyb20gJy4vYW5pbWF0aW9uX2FzdCc7XG5pbXBvcnQge0FuaW1hdGlvblN0YXRlU3R5bGVzLCBBbmltYXRpb25UcmFuc2l0aW9uRmFjdG9yeX0gZnJvbSAnLi9hbmltYXRpb25fdHJhbnNpdGlvbl9mYWN0b3J5JztcblxuXG5cbi8qKlxuICogQGV4cGVyaW1lbnRhbCBBbmltYXRpb24gc3VwcG9ydCBpcyBleHBlcmltZW50YWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFRyaWdnZXIobmFtZTogc3RyaW5nLCBhc3Q6IFRyaWdnZXJBc3QpOiBBbmltYXRpb25UcmlnZ2VyIHtcbiAgcmV0dXJuIG5ldyBBbmltYXRpb25UcmlnZ2VyKG5hbWUsIGFzdCk7XG59XG5cbi8qKlxuKiBAZXhwZXJpbWVudGFsIEFuaW1hdGlvbiBzdXBwb3J0IGlzIGV4cGVyaW1lbnRhbC5cbiovXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uVHJpZ2dlciB7XG4gIHB1YmxpYyB0cmFuc2l0aW9uRmFjdG9yaWVzOiBBbmltYXRpb25UcmFuc2l0aW9uRmFjdG9yeVtdID0gW107XG4gIHB1YmxpYyBmYWxsYmFja1RyYW5zaXRpb246IEFuaW1hdGlvblRyYW5zaXRpb25GYWN0b3J5O1xuICBwdWJsaWMgc3RhdGVzOiB7W3N0YXRlTmFtZTogc3RyaW5nXTogQW5pbWF0aW9uU3RhdGVTdHlsZXN9ID0ge307XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIGFzdDogVHJpZ2dlckFzdCkge1xuICAgIGFzdC5zdGF0ZXMuZm9yRWFjaChhc3QgPT4ge1xuICAgICAgY29uc3QgZGVmYXVsdFBhcmFtcyA9IChhc3Qub3B0aW9ucyAmJiBhc3Qub3B0aW9ucy5wYXJhbXMpIHx8IHt9O1xuICAgICAgdGhpcy5zdGF0ZXNbYXN0Lm5hbWVdID0gbmV3IEFuaW1hdGlvblN0YXRlU3R5bGVzKGFzdC5zdHlsZSwgZGVmYXVsdFBhcmFtcyk7XG4gICAgfSk7XG5cbiAgICBiYWxhbmNlUHJvcGVydGllcyh0aGlzLnN0YXRlcywgJ3RydWUnLCAnMScpO1xuICAgIGJhbGFuY2VQcm9wZXJ0aWVzKHRoaXMuc3RhdGVzLCAnZmFsc2UnLCAnMCcpO1xuXG4gICAgYXN0LnRyYW5zaXRpb25zLmZvckVhY2goYXN0ID0+IHtcbiAgICAgIHRoaXMudHJhbnNpdGlvbkZhY3Rvcmllcy5wdXNoKG5ldyBBbmltYXRpb25UcmFuc2l0aW9uRmFjdG9yeShuYW1lLCBhc3QsIHRoaXMuc3RhdGVzKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZhbGxiYWNrVHJhbnNpdGlvbiA9IGNyZWF0ZUZhbGxiYWNrVHJhbnNpdGlvbihuYW1lLCB0aGlzLnN0YXRlcyk7XG4gIH1cblxuICBnZXQgY29udGFpbnNRdWVyaWVzKCkgeyByZXR1cm4gdGhpcy5hc3QucXVlcnlDb3VudCA+IDA7IH1cblxuICBtYXRjaFRyYW5zaXRpb24oY3VycmVudFN0YXRlOiBhbnksIG5leHRTdGF0ZTogYW55LCBlbGVtZW50OiBhbnksIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOlxuICAgICAgQW5pbWF0aW9uVHJhbnNpdGlvbkZhY3Rvcnl8bnVsbCB7XG4gICAgY29uc3QgZW50cnkgPVxuICAgICAgICB0aGlzLnRyYW5zaXRpb25GYWN0b3JpZXMuZmluZChmID0+IGYubWF0Y2goY3VycmVudFN0YXRlLCBuZXh0U3RhdGUsIGVsZW1lbnQsIHBhcmFtcykpO1xuICAgIHJldHVybiBlbnRyeSB8fCBudWxsO1xuICB9XG5cbiAgbWF0Y2hTdHlsZXMoY3VycmVudFN0YXRlOiBhbnksIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0sIGVycm9yczogYW55W10pOiDJtVN0eWxlRGF0YSB7XG4gICAgcmV0dXJuIHRoaXMuZmFsbGJhY2tUcmFuc2l0aW9uLmJ1aWxkU3R5bGVzKGN1cnJlbnRTdGF0ZSwgcGFyYW1zLCBlcnJvcnMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZhbGxiYWNrVHJhbnNpdGlvbihcbiAgICB0cmlnZ2VyTmFtZTogc3RyaW5nLFxuICAgIHN0YXRlczoge1tzdGF0ZU5hbWU6IHN0cmluZ106IEFuaW1hdGlvblN0YXRlU3R5bGVzfSk6IEFuaW1hdGlvblRyYW5zaXRpb25GYWN0b3J5IHtcbiAgY29uc3QgbWF0Y2hlcnMgPSBbKGZyb21TdGF0ZTogYW55LCB0b1N0YXRlOiBhbnkpID0+IHRydWVdO1xuICBjb25zdCBhbmltYXRpb246IFNlcXVlbmNlQXN0ID0ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TZXF1ZW5jZSwgc3RlcHM6IFtdLCBvcHRpb25zOiBudWxsfTtcbiAgY29uc3QgdHJhbnNpdGlvbjogVHJhbnNpdGlvbkFzdCA9IHtcbiAgICB0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuVHJhbnNpdGlvbixcbiAgICBhbmltYXRpb24sXG4gICAgbWF0Y2hlcnMsXG4gICAgb3B0aW9uczogbnVsbCxcbiAgICBxdWVyeUNvdW50OiAwLFxuICAgIGRlcENvdW50OiAwXG4gIH07XG4gIHJldHVybiBuZXcgQW5pbWF0aW9uVHJhbnNpdGlvbkZhY3RvcnkodHJpZ2dlck5hbWUsIHRyYW5zaXRpb24sIHN0YXRlcyk7XG59XG5cbmZ1bmN0aW9uIGJhbGFuY2VQcm9wZXJ0aWVzKG9iajoge1trZXk6IHN0cmluZ106IGFueX0sIGtleTE6IHN0cmluZywga2V5Mjogc3RyaW5nKSB7XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5MSkpIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkyKSkge1xuICAgICAgb2JqW2tleTJdID0gb2JqW2tleTFdO1xuICAgIH1cbiAgfSBlbHNlIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5MikpIHtcbiAgICBvYmpba2V5MV0gPSBvYmpba2V5Ml07XG4gIH1cbn1cbiJdfQ==