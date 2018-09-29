/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Specifies automatic styling.
 */
export var AUTO_STYLE = '*';
/**
 * Creates a named animation trigger, containing a  list of `state()`
 * and `transition()` entries to be evaluated when the expression
 * bound to the trigger changes.
 *
 * @param name An identifying string.
 * @param definitions  An animation definition object, containing an array of `state()`
 * and `transition()` declarations.
 *
 * @return An object that encapsulates the trigger data.
 *
 * @usageNotes
 * Define an animation trigger in the `animations` section of `@Component` metadata.
 * In the template, reference the trigger by name and bind it to a trigger expression that
 * evaluates to a defined animation state, using the following format:
 *
 * `[@triggerName]="expression"`
 *
 * Animation trigger bindings convert all values to strings, and then match the
 * previous and current values against any linked transitions.
 * Booleans can be specified as `1` or `true` and `0` or `false`.
 *
 * ### Usage Example
 *
 * The following example creates an animation trigger reference based on the provided
 * name value.
 * The provided animation value is expected to be an array consisting of state and
 * transition declarations.
 *
 * ```typescript
 * @Component({
 *   selector: "my-component",
 *   templateUrl: "my-component-tpl.html",
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *       state(...),
 *       state(...),
 *       transition(...),
 *       transition(...)
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "something";
 * }
 * ```
 *
 * The template associated with this component makes use of the defined trigger
 * by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * ### Using an inline function
 * The `transition` animation method also supports reading an inline function which can decide
 * if its associated animation should be run.
 *
 * ```typescript
 * // this method is run each time the `myAnimationTrigger` trigger value changes.
 * function myInlineMatcherFn(fromState: string, toState: string, element: any, params: {[key:
 string]: any}): boolean {
 *   // notice that `element` and `params` are also available here
 *   return toState == 'yes-please-animate';
 * }
 *
 * @Component({
 *   selector: 'my-component',
 *   templateUrl: 'my-component-tpl.html',
 *   animations: [
 *     trigger('myAnimationTrigger', [
 *       transition(myInlineMatcherFn, [
 *         // the animation sequence code
 *       ]),
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "yes-please-animate";
 * }
 * ```
 *
 * ### Disabling Animations
 * When true, the special animation control binding `@.disabled` binding prevents
 * all animations from rendering.
 * Place the  `@.disabled` binding on an element to disable
 * animations on the element itself, as well as any inner animation triggers
 * within the element.
 *
 * The following example shows how to use this feature:
 *
 * ```typescript
 * @Component({
 *   selector: 'my-component',
 *   template: `
 *     <div [@.disabled]="isDisabled">
 *       <div [@childAnimation]="exp"></div>
 *     </div>
 *   `,
 *   animations: [
 *     trigger("childAnimation", [
 *       // ...
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   isDisabled = true;
 *   exp = '...';
 * }
 * ```
 *
 * When `@.disabled` is true, it prevents the `@childAnimation` trigger from animating,
 * along with any inner animations.
 *
 * ### Disable animations application-wide
 * When an area of the template is set to have animations disabled,
 * **all** inner components have their animations disabled as well.
 * This means that you can disable all animations for an app
 * by placing a host binding set on `@.disabled` on the topmost Angular component.
 *
 * ```typescript
 * import {Component, HostBinding} from '@angular/core';
 *
 * @Component({
 *   selector: 'app-component',
 *   templateUrl: 'app.component.html',
 * })
 * class AppComponent {
 *   @HostBinding('@.disabled')
 *   public animationsDisabled = true;
 * }
 * ```
 *
 * ### Overriding disablement of inner animations
 * Despite inner animations being disabled, a parent animation can `query()`
 * for inner elements located in disabled areas of the template and still animate
 * them if needed. This is also the case for when a sub animation is
 * queried by a parent and then later animated using `animateChild()`.
 *
 * ### Detecting when an animation is disabled
 * If a region of the DOM (or the entire application) has its animations disabled, the animation
 * trigger callbacks still fire, but for zero seconds. When the callback fires, it provides
 * an instance of an `AnimationEvent`. If animations are disabled,
 * the `.disabled` flag on the event is true.
 *
 * @experimental Animation support is experimental.
 */
export function trigger(name, definitions) {
    return { type: 7 /* Trigger */, name: name, definitions: definitions, options: {} };
}
/**
 * Defines an animation step that combines styling information with timing information.
 *
 * @param timings Sets `AnimateTimings` for the parent animation.
 * A string in the format "duration [delay] [easing]".
 *  - Duration and delay are expressed as a number and optional time unit,
 * such as "1s" or "10ms" for one second and 10 milliseconds, respectively.
 * The default unit is milliseconds.
 *  - The easing value controls how the animation accelerates and decelerates
 * during its runtime. Value is one of  `ease`, `ease-in`, `ease-out`,
 * `ease-in-out`, or a `cubic-bezier()` function call.
 * If not supplied, no easing is applied.
 *
 * For example, the string "1s 100ms ease-out" specifies a duration of
 * 1000 milliseconds, and delay of 100 ms, and the "ease-out" easing style,
 * which decelerates near the end of the duration.
 * @param styles Sets AnimationStyles for the parent animation.
 * A function call to either `style()` or `keyframes()`
 * that returns a collection of CSS style entries to be applied to the parent animation.
 * When null, uses the styles from the destination state.
 * This is useful when describing an animation step that will complete an animation;
 * see "Animating to the final state" in `transitions()`.
 * @returns An object that encapsulates the animation step.
 *
 * @usageNotes
 * Call within an animation `sequence()`, `{@link animations/group group()}`, or
 * `transition()` call to specify an animation step
 * that applies given style data to the parent animation for a given amount of time.
 *
 * ### Syntax Examples
 * **Timing examples**
 *
 * The following examples show various `timings` specifications.
 * - `animate(500)` : Duration is 500 milliseconds.
 * - `animate("1s")` : Duration is 1000 milliseconds.
 * - `animate("100ms 0.5s")` : Duration is 100 milliseconds, delay is 500 milliseconds.
 * - `animate("5s ease-in")` : Duration is 5000 milliseconds, easing in.
 * - `animate("5s 10ms cubic-bezier(.17,.67,.88,.1)")` : Duration is 5000 milliseconds, delay is 10
 * milliseconds, easing according to a bezier curve.
 *
 * **Style examples**
 *
 * The following example calls `style()` to set a single CSS style.
 * ```typescript
 * animate(500, style({ background: "red" }))
 * ```
 * The following example calls `keyframes()` to set a CSS style
 * to different values for successive keyframes.
 * ```typescript
 * animate(500, keyframes(
 *  [
 *   style({ background: "blue" })),
 *   style({ background: "red" }))
 *  ])
 * ```
 */
export function animate(timings, styles) {
    if (styles === void 0) { styles = null; }
    return { type: 4 /* Animate */, styles: styles, timings: timings };
}
/**
 * @description Defines a list of animation steps to be run in parallel.
 *
 * @param steps An array of animation step objects.
 * - When steps are defined by `style()` or `animate()`
 * function calls, each call within the group is executed instantly.
 * - To specify offset styles to be applied at a later time, define steps with
 * `keyframes()`, or use `animate()` calls with a delay value.
 * For example:
 *
 * ```typescript
 * group([
 *   animate("1s", { background: "black" }))
 *   animate("2s", { color: "white" }))
 * ])
 * ```
 *
 * @param options An options object containing a delay and
 * developer-defined parameters that provide styling defaults and
 * can be overridden on invocation.
 *
 * @return An object that encapsulates the group data.
 *
 * @usageNotes
 * Grouped animations are useful when a series of styles must be
 * animated at different starting times and closed off at different ending times.
 *
 * When called within a `sequence()` or a
 * `transition()` call, does not continue to the next
 * instruction until all of the inner animation steps have completed.
 */
export function group(steps, options) {
    if (options === void 0) { options = null; }
    return { type: 3 /* Group */, steps: steps, options: options };
}
/**
 * Defines a list of animation steps to be run sequentially, one by one.
 *
 * @param steps An array of animation step objects.
 * - Steps defined by `style()` calls apply the styling data immediately.
 * - Steps defined by `animate()` calls apply the styling data over time
 *   as specified by the timing data.
 *
 * ```typescript
 * sequence([
 *   style({ opacity: 0 })),
 *   animate("1s", { opacity: 1 }))
 * ])
 * ```
 *
 * @param options An options object containing a delay and
 * developer-defined parameters that provide styling defaults and
 * can be overridden on invocation.
 *
 * @return An object that encapsulates the sequence data.
 *
 * @usageNotes
 * When you pass an array of steps to a
 * `transition()` call, the steps run sequentially by default.
 * Compare this to the `{@link animations/group group()}` call, which runs animation steps in parallel.
 *
 * When a sequence is used within a `{@link animations/group group()}` or a `transition()` call,
 * execution continues to the next instruction only after each of the inner animation
 * steps have completed.
 *
 **/
export function sequence(steps, options) {
    if (options === void 0) { options = null; }
    return { type: 2 /* Sequence */, steps: steps, options: options };
}
/**
 * Declares a key/value object containing CSS properties/styles that
 * can then be used for an animation `state`, within an animation `sequence`,
 * or as styling data for calls to `animate()` and `keyframes()`.
 *
 * @param tokens A set of CSS styles or HTML styles associated with an animation state.
 * The value can be any of the following:
 * - A key-value style pair associating a CSS property with a value.
 * - An array of key-value style pairs.
 * - An asterisk (*), to use auto-styling, where styles are derived from the element
 * being animated and applied to the animation when it starts.
 *
 * Auto-styling can be used to define a state that depends on layout or other
 * environmental factors.
 *
 * @return An object that encapsulates the style data.
 *
 * @usageNotes
 * The following examples create animation styles that collect a set of
 * CSS property values:
 *
 * ```typescript
 * // string values for CSS properties
 * style({ background: "red", color: "blue" })
 *
 * // numerical pixel values
 * style({ width: 100, height: 0 })
 * ```
 *
 * The following example uses auto-styling to allow a component to animate from
 * a height of 0 up to the height of the parent element:
 *
 * ```
 * style({ height: 0 }),
 * animate("1s", style({ height: "*" }))
 * ```
 *
 **/
export function style(tokens) {
    return { type: 6 /* Style */, styles: tokens, offset: null };
}
/**
 * Declares an animation state within a trigger attached to an element.
 *
 * @param name One or more names for the defined state in a comma-separated string.
 * The following reserved state names can be supplied to define a style for specific use
 * cases:
 *
 * - `void` You can associate styles with this name to be used when
 * the element is detached from the application. For example, when an `ngIf` evaluates
 * to false, the state of the associated element is void.
 *  - `*` (asterisk) Indicates the default state. You can associate styles with this name
 * to be used as the fallback when the state that is being animated is not declared
 * within the trigger.
 *
 * @param styles A set of CSS styles associated with this state, created using the
 * `style()` function.
 * This set of styles persists on the element once the state has been reached.
 * @param options Parameters that can be passed to the state when it is invoked.
 * 0 or more key-value pairs.
 * @return An object that encapsulates the new state data.
 *
 * @usageNotes
 * Use the `trigger()` function to register states to an animation trigger.
 * Use the `transition()` function to animate between states.
 * When a state is active within a component, its associated styles persist on the element,
 * even when the animation ends.
 **/
export function state(name, styles, options) {
    return { type: 0 /* State */, name: name, styles: styles, options: options };
}
/**
 * Defines a set of animation styles, associating each style with an optional `offset` value.
 *
 * @param steps A set of animation styles with optional offset data.
 * The optional `offset` value for a style specifies a percentage of the total animation
 * time at which that style is applied.
 * @returns An object that encapsulates the keyframes data.
 *
 * @usageNotes
 * Use with the `animate()` call. Instead of applying animations
 * from the current state
 * to the destination state, keyframes describe how each style entry is applied and at what point
 * within the animation arc.
 * Compare [CSS Keyframe Animations](https://www.w3schools.com/css/css3_animations.asp).
 *
 * ### Usage
 *
 * In the following example, the offset values describe
 * when each `backgroundColor` value is applied. The color is red at the start, and changes to
 * blue when 20% of the total time has elapsed.
 *
 * ```typescript
 * // the provided offset values
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red", offset: 0 }),
 *   style({ backgroundColor: "blue", offset: 0.2 }),
 *   style({ backgroundColor: "orange", offset: 0.3 }),
 *   style({ backgroundColor: "black", offset: 1 })
 * ]))
 * ```
 *
 * If there are no `offset` values specified in the style entries, the offsets
 * are calculated automatically.
 *
 * ```typescript
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red" }) // offset = 0
 *   style({ backgroundColor: "blue" }) // offset = 0.33
 *   style({ backgroundColor: "orange" }) // offset = 0.66
 *   style({ backgroundColor: "black" }) // offset = 1
 * ]))
 *```
 */
export function keyframes(steps) {
    return { type: 5 /* Keyframes */, steps: steps };
}
/**
 * Declares an animation transition as a sequence of animation steps to run when a given
 * condition is satisfied. The condition is a Boolean expression or function that compares
 * the previous and current animation states, and returns true if this transition should occur.
 * When the state criteria of a defined transition are met, the associated animation is
 * triggered.
 *
 * @param stateChangeExpr A Boolean expression or function that compares the previous and current
 * animation states, and returns true if this transition should occur. Note that  "true" and "false"
 * match 1 and 0, respectively. An expression is evaluated each time a state change occurs in the
 * animation trigger element.
 * The animation steps run when the expression evaluates to true.
 *
 * - A state-change string takes the form "state1 => state2", where each side is a defined animation
 * state, or an asterix (*) to refer to a dynamic start or end state.
 *   - The expression string can contain multiple comma-separated statements;
 * for example "state1 => state2, state3 => state4".
 *   - Special values `:enter` and `:leave` initiate a transition on the entry and exit states,
 * equivalent to  "void => *"  and "* => void".
 *   - Special values `:increment` and `:decrement` initiate a transition when a numeric value has
 * increased or decreased in value.
 * - A function is executed each time a state change occurs in the animation trigger element.
 * The animation steps run when the function returns true.
 *
 * @param steps One or more animation objects, as returned by the `animate()` or
 * `sequence()` function, that form a transformation from one state to another.
 * A sequence is used by default when you pass an array.
 * @param options An options object that can contain a delay value for the start of the animation,
 * and additional developer-defined parameters. Provided values for additional parameters are used
 * as defaults, and override values can be passed to the caller on invocation.
 * @returns An object that encapsulates the transition data.
 *
 * @usageNotes
 * The template associated with a component binds an animation trigger to an element.
 *
 * ```HTML
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * All transitions are defined within an animation trigger,
 * along with named states that the transitions change to and from.
 *
 * ```typescript
 * trigger("myAnimationTrigger", [
 *  // define states
 *  state("on", style({ background: "green" })),
 *  state("off", style({ background: "grey" })),
 *  ...]
 * ```
 *
 * Note that when you call the `sequence()` function within a `{@link animations/group group()}`
 * or a `transition()` call, execution does not continue to the next instruction
 * until each of the inner animation steps have completed.
 *
 * ### Syntax examples
 *
 * The following examples define transitions between the two defined states (and default states),
 * using various options:
 *
 * ```typescript
 * // Transition occurs when the state value
 * // bound to "myAnimationTrigger" changes from "on" to "off"
 * transition("on => off", animate(500))
 * // Run the same animation for both directions
 * transition("on <=> off", animate(500))
 * // Define multiple state-change pairs separated by commas
 * transition("on => off, off => void", animate(500))
 * ```
 *
 * ### Special values for state-change expressions
 *
 * - Catch-all state change for when an element is inserted into the page and the
 * destination state is unknown:
 *
 * ```typescript
 * transition("void => *", [
 *  style({ opacity: 0 }),
 *  animate(500)
 *  ])
 * ```
 *
 * - Capture a state change between any states:
 *
 *  `transition("* => *", animate("1s 0s"))`
 *
 * - Entry and exit transitions:
 *
 * ```typescript
 * transition(":enter", [
 *   style({ opacity: 0 }),
 *   animate(500, style({ opacity: 1 }))
 *   ]),
 * transition(":leave", [
 *   animate(500, style({ opacity: 0 }))
 *   ])
 * ```
 *
 * - Use `:increment` and `:decrement` to initiate transitions:
 *
 * ```typescript
 * transition(":increment", group([
 *  query(':enter', [
 *     style({ left: '100%' }),
 *     animate('0.5s ease-out', style('*'))
 *   ]),
 *  query(':leave', [
 *     animate('0.5s ease-out', style({ left: '-100%' }))
 *  ])
 * ]))
 *
 * transition(":decrement", group([
 *  query(':enter', [
 *     style({ left: '100%' }),
 *     animate('0.5s ease-out', style('*'))
 *   ]),
 *  query(':leave', [
 *     animate('0.5s ease-out', style({ left: '-100%' }))
 *  ])
 * ]))
 * ```
 *
 * ### State-change functions
 *
 * Here is an example of a `fromState` specified as a state-change function that invokes an
 * animation when true:
 *
 * ```typescript
 * transition((fromState, toState) =>
 *  {
 *   return fromState == "off" && toState == "on";
 *  },
 *  animate("1s 0s"))
 * ```
 *
 * ### Animating to the final state
 *
 * If the final step in a transition is a call to `animate()` that uses a timing value
 * with no style data, that step is automatically considered the final animation arc,
 * for the element to reach the final state. Angular automatically adds or removes
 * CSS styles to ensure that the element is in the correct final state.
 *
 * The following example defines a transition that starts by hiding the element,
 * then makes sure that it animates properly to whatever state is currently active for trigger:
 *
 * ```typescript
 * transition("void => *", [
 *   style({ opacity: 0 }),
 *   animate(500)
 *  ])
 * ```
 * ### Boolean value matching
 * If a trigger binding value is a Boolean, it can be matched using a transition expression
 * that compares true and false or 1 and 0. For example:
 *
 * ```
 * // in the template
 * <div [@openClose]="open ? true : false">...</div>
 * // in the component metadata
 * trigger('openClose', [
 *   state('true', style({ height: '*' })),
 *   state('false', style({ height: '0px' })),
 *   transition('false <=> true', animate(500))
 * ])
 * ```
 **/
export function transition(stateChangeExpr, steps, options) {
    if (options === void 0) { options = null; }
    return { type: 1 /* Transition */, expr: stateChangeExpr, animation: steps, options: options };
}
/**
 * Produces a reusable animation that can be invoked in another animation or sequence,
 * by calling the `useAnimation()` function.
 *
 * @param steps One or more animation objects, as returned by the `animate()`
 * or `sequence()` function, that form a transformation from one state to another.
 * A sequence is used by default when you pass an array.
 * @param options An options object that can contain a delay value for the start of the
 * animation, and additional developer-defined parameters.
 * Provided values for additional parameters are used as defaults,
 * and override values can be passed to the caller on invocation.
 * @returns An object that encapsulates the animation data.
 *
 * @usageNotes
 * The following example defines a reusable animation, providing some default parameter
 * values.
 *
 * ```typescript
 * var fadeAnimation = animation([
 *   style({ opacity: '{{ start }}' }),
 *   animate('{{ time }}',
 *   style({ opacity: '{{ end }}'}))
 *   ],
 *   { params: { time: '1000ms', start: 0, end: 1 }});
 * ```
 *
 * The following invokes the defined animation with a call to `useAnimation()`,
 * passing in override parameter values.
 *
 * ```js
 * useAnimation(fadeAnimation, {
 *   params: {
 *     time: '2s',
 *     start: 1,
 *     end: 0
 *   }
 * })
 * ```
 *
 * If any of the passed-in parameter values are missing from this call,
 * the default values are used. If one or more parameter values are missing before a step is
 * animated, `useAnimation()` throws an error.
 */
export function animation(steps, options) {
    if (options === void 0) { options = null; }
    return { type: 8 /* Reference */, animation: steps, options: options };
}
/**
 * Executes a queried inner animation element within an animation sequence.
 *
 * @param options An options object that can contain a delay value for the start of the
 * animation, and additional override values for developer-defined parameters.
 * @return An object that encapsulates the child animation data.
 *
 * @usageNotes
 * Each time an animation is triggered in Angular, the parent animation
 * has priority and any child animations are blocked. In order
 * for a child animation to run, the parent animation must query each of the elements
 * containing child animations, and run them using this function.
 *
 * Note that this feature designed to be used with `query()` and it will only work
 * with animations that are assigned using the Angular animation library. CSS keyframes
 * and transitions are not handled by this API.
 */
export function animateChild(options) {
    if (options === void 0) { options = null; }
    return { type: 9 /* AnimateChild */, options: options };
}
/**
 * Starts a reusable animation that is created using the `animation()` function.
 *
 * @param animation The reusable animation to start.
 * @param options An options object that can contain a delay value for the start of
 * the animation, and additional override values for developer-defined parameters.
 * @return An object that contains the animation parameters.
 */
export function useAnimation(animation, options) {
    if (options === void 0) { options = null; }
    return { type: 10 /* AnimateRef */, animation: animation, options: options };
}
/**
 * Finds one or more inner elements within the current element that is
 * being animated within a sequence. Use with `animateChild()`.
 *
 * @param selector The element to query, or a set of elements that contain Angular-specific
 * characteristics, specified with one or more of the following tokens.
 *  - `query(":enter")` or `query(":leave")` : Query for newly inserted/removed elements.
 *  - `query(":animating")` : Query all currently animating elements.
 *  - `query("@triggerName")` : Query elements that contain an animation trigger.
 *  - `query("@*")` : Query all elements that contain an animation triggers.
 *  - `query(":self")` : Include the current element into the animation sequence.
 *
 * @param animation One or more animation steps to apply to the queried element or elements.
 * An array is treated as an animation sequence.
 * @param options An options object. Use the 'limit' field to limit the total number of
 * items to collect.
 * @return An object that encapsulates the query data.
 *
 * @usageNotes
 * Tokens can be merged into a combined query selector string. For example:
 *
 * ```typescript
 *  query(':self, .record:enter, .record:leave, @subTrigger', [...])
 * ```
 *
 * The `query()` function collects multiple elements and works internally by using
 * `element.querySelectorAll`. Use the `limit` field of an options object to limit
 * the total number of items to be collected. For example:
 *
 * ```js
 * query('div', [
 *   animate(...),
 *   animate(...)
 * ], { limit: 1 })
 * ```
 *
 * By default, throws an error when zero items are found. Set the
 * `optional` flag to ignore this error. For example:
 *
 * ```js
 * query('.some-element-that-may-not-be-there', [
 *   animate(...),
 *   animate(...)
 * ], { optional: true })
 * ```
 *
 * ### Usage Example
 *
 * The following example queries for inner elements and animates them
 * individually using `animateChild()`.
 *
 * ```typescript
 * @Component({
 *   selector: 'inner',
 *   template: `
 *     <div [@queryAnimation]="exp">
 *       <h1>Title</h1>
 *       <div class="content">
 *         Blah blah blah
 *       </div>
 *     </div>
 *   `,
 *   animations: [
 *    trigger('queryAnimation', [
 *      transition('* => goAnimate', [
 *        // hide the inner elements
 *        query('h1', style({ opacity: 0 })),
 *        query('.content', style({ opacity: 0 })),
 *
 *        // animate the inner elements in, one by one
 *        query('h1', animate(1000, style({ opacity: 1 })),
 *        query('.content', animate(1000, style({ opacity: 1 })),
 *      ])
 *    ])
 *  ]
 * })
 * class Cmp {
 *   exp = '';
 *
 *   goAnimate() {
 *     this.exp = 'goAnimate';
 *   }
 * }
 * ```
 */
export function query(selector, animation, options) {
    if (options === void 0) { options = null; }
    return { type: 11 /* Query */, selector: selector, animation: animation, options: options };
}
/**
 * Use within an animation `query()` call to issue a timing gap after
 * each queried item is animated.
 *
 * @param timings A delay value.
 * @param animation One ore more animation steps.
 * @returns An object that encapsulates the stagger data.
 *
 * @usageNotes
 * In the following example, a container element wraps a list of items stamped out
 * by an `ngFor`. The container element contains an animation trigger that will later be set
 * to query for each of the inner items.
 *
 * Each time items are added, the opacity fade-in animation runs,
 * and each removed item is faded out.
 * When either of these animations occur, the stagger effect is
 * applied after each item's animation is started.
 *
 * ```html
 * <!-- list.component.html -->
 * <button (click)="toggle()">Show / Hide Items</button>
 * <hr />
 * <div [@listAnimation]="items.length">
 *   <div *ngFor="let item of items">
 *     {{ item }}
 *   </div>
 * </div>
 * ```
 *
 * Here is the component code:
 *
 * ```typescript
 * import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
 * @Component({
 *   templateUrl: 'list.component.html',
 *   animations: [
 *     trigger('listAnimation', [
 *     ...
 *     ])
 *   ]
 * })
 * class ListComponent {
 *   items = [];
 *
 *   showItems() {
 *     this.items = [0,1,2,3,4];
 *   }
 *
 *   hideItems() {
 *     this.items = [];
 *   }
 *
 *   toggle() {
 *     this.items.length ? this.hideItems() : this.showItems();
 *    }
 *  }
 * ```
 *
 * Here is the animation trigger code:
 *
 * ```typescript
 * trigger('listAnimation', [
 *   transition('* => *', [ // each time the binding value changes
 *     query(':leave', [
 *       stagger(100, [
 *         animate('0.5s', style({ opacity: 0 }))
 *       ])
 *     ]),
 *     query(':enter', [
 *       style({ opacity: 0 }),
 *       stagger(100, [
 *         animate('0.5s', style({ opacity: 1 }))
 *       ])
 *     ])
 *   ])
 * ])
 * ```
 */
export function stagger(timings, animation) {
    return { type: 12 /* Stagger */, timings: timings, animation: animation };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX21ldGFkYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5pbWF0aW9ucy9zcmMvYW5pbWF0aW9uX21ldGFkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQW1KSDs7R0FFRztBQUNILE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7QUF5UDlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtSkc7QUFDSCxNQUFNLGtCQUFrQixJQUFZLEVBQUUsV0FBZ0M7SUFDcEUsT0FBTyxFQUFDLElBQUksaUJBQStCLEVBQUUsSUFBSSxNQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBQyxDQUFDO0FBQy9FLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVERztBQUNILE1BQU0sa0JBQ0YsT0FBd0IsRUFBRSxNQUNYO0lBRFcsdUJBQUEsRUFBQSxhQUNYO0lBQ2pCLE9BQU8sRUFBQyxJQUFJLGlCQUErQixFQUFFLE1BQU0sUUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUM7QUFDaEUsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxNQUFNLGdCQUNGLEtBQTBCLEVBQUUsT0FBdUM7SUFBdkMsd0JBQUEsRUFBQSxjQUF1QztJQUNyRSxPQUFPLEVBQUMsSUFBSSxlQUE2QixFQUFFLEtBQUssT0FBQSxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUM7QUFDN0QsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE4Qkk7QUFDSixNQUFNLG1CQUFtQixLQUEwQixFQUFFLE9BQXVDO0lBQXZDLHdCQUFBLEVBQUEsY0FBdUM7SUFFMUYsT0FBTyxFQUFDLElBQUksa0JBQWdDLEVBQUUsS0FBSyxPQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUMsQ0FBQztBQUNoRSxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQ0k7QUFDSixNQUFNLGdCQUNGLE1BQzJDO0lBQzdDLE9BQU8sRUFBQyxJQUFJLGVBQTZCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7QUFDM0UsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTBCSTtBQUNKLE1BQU0sZ0JBQ0YsSUFBWSxFQUFFLE1BQThCLEVBQzVDLE9BQXlDO0lBQzNDLE9BQU8sRUFBQyxJQUFJLGVBQTZCLEVBQUUsSUFBSSxNQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUMsQ0FBQztBQUNwRSxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDRztBQUNILE1BQU0sb0JBQW9CLEtBQStCO0lBQ3ZELE9BQU8sRUFBQyxJQUFJLG1CQUFpQyxFQUFFLEtBQUssT0FBQSxFQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxS0k7QUFDSixNQUFNLHFCQUNGLGVBQ3NFLEVBQ3RFLEtBQThDLEVBQzlDLE9BQXVDO0lBQXZDLHdCQUFBLEVBQUEsY0FBdUM7SUFDekMsT0FBTyxFQUFDLElBQUksb0JBQWtDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUM7QUFDcEcsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQ0c7QUFDSCxNQUFNLG9CQUNGLEtBQThDLEVBQzlDLE9BQXVDO0lBQXZDLHdCQUFBLEVBQUEsY0FBdUM7SUFDekMsT0FBTyxFQUFDLElBQUksbUJBQWlDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLFNBQUEsRUFBQyxDQUFDO0FBQzVFLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sdUJBQXVCLE9BQTBDO0lBQTFDLHdCQUFBLEVBQUEsY0FBMEM7SUFFckUsT0FBTyxFQUFDLElBQUksc0JBQW9DLEVBQUUsT0FBTyxTQUFBLEVBQUMsQ0FBQztBQUM3RCxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQU0sdUJBQ0YsU0FBcUMsRUFDckMsT0FBdUM7SUFBdkMsd0JBQUEsRUFBQSxjQUF1QztJQUN6QyxPQUFPLEVBQUMsSUFBSSxxQkFBa0MsRUFBRSxTQUFTLFdBQUEsRUFBRSxPQUFPLFNBQUEsRUFBQyxDQUFDO0FBQ3RFLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0ZHO0FBQ0gsTUFBTSxnQkFDRixRQUFnQixFQUFFLFNBQWtELEVBQ3BFLE9BQTRDO0lBQTVDLHdCQUFBLEVBQUEsY0FBNEM7SUFDOUMsT0FBTyxFQUFDLElBQUksZ0JBQTZCLEVBQUUsUUFBUSxVQUFBLEVBQUUsU0FBUyxXQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkVHO0FBQ0gsTUFBTSxrQkFDRixPQUF3QixFQUN4QixTQUFrRDtJQUNwRCxPQUFPLEVBQUMsSUFBSSxrQkFBK0IsRUFBRSxPQUFPLFNBQUEsRUFBRSxTQUFTLFdBQUEsRUFBQyxDQUFDO0FBQ25FLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNldCBvZiBDU1Mgc3R5bGVzIGZvciB1c2UgaW4gYW4gYW5pbWF0aW9uIHN0eWxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIMm1U3R5bGVEYXRhIHsgW2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcjsgfVxuXG4vKipcbiogUmVwcmVzZW50cyBhbmltYXRpb24tc3RlcCB0aW1pbmcgcGFyYW1ldGVycyBmb3IgYW4gYW5pbWF0aW9uIHN0ZXAuICBcbiogQHNlZSBgYW5pbWF0ZSgpYFxuKi9cbmV4cG9ydCBkZWNsYXJlIHR5cGUgQW5pbWF0ZVRpbWluZ3MgPSB7XG4gIC8qKlxuICAgKiBUaGUgZnVsbCBkdXJhdGlvbiBvZiBhbiBhbmltYXRpb24gc3RlcC4gQSBudW1iZXIgYW5kIG9wdGlvbmFsIHRpbWUgdW5pdCxcbiAgICogc3VjaCBhcyBcIjFzXCIgb3IgXCIxMG1zXCIgZm9yIG9uZSBzZWNvbmQgYW5kIDEwIG1pbGxpc2Vjb25kcywgcmVzcGVjdGl2ZWx5LlxuICAgKiBUaGUgZGVmYXVsdCB1bml0IGlzIG1pbGxpc2Vjb25kcy5cbiAgICovXG4gIGR1cmF0aW9uOiBudW1iZXIsXG4gIC8qKlxuICAgKiBUaGUgZGVsYXkgaW4gYXBwbHlpbmcgYW4gYW5pbWF0aW9uIHN0ZXAuIEEgbnVtYmVyIGFuZCBvcHRpb25hbCB0aW1lIHVuaXQuXG4gICAqIFRoZSBkZWZhdWx0IHVuaXQgaXMgbWlsbGlzZWNvbmRzLlxuICAgKi9cbiAgZGVsYXk6IG51bWJlcixcbiAgLyoqXG4gICAqIEFuIGVhc2luZyBzdHlsZSB0aGF0IGNvbnRyb2xzIGhvdyBhbiBhbmltYXRpb25zIHN0ZXAgYWNjZWxlcmF0ZXNcbiAgICogYW5kIGRlY2VsZXJhdGVzIGR1cmluZyBpdHMgcnVuIHRpbWUuIEFuIGVhc2luZyBmdW5jdGlvbiBzdWNoIGFzIGBjdWJpYy1iZXppZXIoKWAsXG4gICAqIG9yIG9uZSBvZiB0aGUgZm9sbG93aW5nIGNvbnN0YW50czpcbiAgICogLSBgZWFzZS1pbmBcbiAgICogLSBgZWFzZS1vdXRgXG4gICAqIC0gYGVhc2UtaW4tYW5kLW91dGBcbiAgICovXG4gIGVhc2luZzogc3RyaW5nIHwgbnVsbFxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gT3B0aW9ucyB0aGF0IGNvbnRyb2wgYW5pbWF0aW9uIHN0eWxpbmcgYW5kIHRpbWluZy5cbiAqXG4gKiBUaGUgZm9sbG93aW5nIGFuaW1hdGlvbiBmdW5jdGlvbnMgYWNjZXB0IGBBbmltYXRpb25PcHRpb25zYCBkYXRhOlxuICpcbiAqIC0gYHRyYW5zaXRpb24oKWBcbiAqIC0gYHNlcXVlbmNlKClgXG4gKiAtIGB7QGxpbmsgYW5pbWF0aW9ucy9ncm91cCBncm91cCgpfWBcbiAqIC0gYHF1ZXJ5KClgXG4gKiAtIGBhbmltYXRpb24oKWBcbiAqIC0gYHVzZUFuaW1hdGlvbigpYFxuICogLSBgYW5pbWF0ZUNoaWxkKClgXG4gKlxuICogUHJvZ3JhbW1hdGljIGFuaW1hdGlvbnMgYnVpbHQgdXNpbmcgdGhlIGBBbmltYXRpb25CdWlsZGVyYCBzZXJ2aWNlIGFsc29cbiAqIG1ha2UgdXNlIG9mIGBBbmltYXRpb25PcHRpb25zYC5cbiAqL1xuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdGlvbk9wdGlvbnMge1xuICAvKipcbiAgICogU2V0cyBhIHRpbWUtZGVsYXkgZm9yIGluaXRpYXRpbmcgYW4gYW5pbWF0aW9uIGFjdGlvbi5cbiAgICogQSBudW1iZXIgYW5kIG9wdGlvbmFsIHRpbWUgdW5pdCwgc3VjaCBhcyBcIjFzXCIgb3IgXCIxMG1zXCIgZm9yIG9uZSBzZWNvbmRcbiAgICogYW5kIDEwIG1pbGxpc2Vjb25kcywgcmVzcGVjdGl2ZWx5LlRoZSBkZWZhdWx0IHVuaXQgaXMgbWlsbGlzZWNvbmRzLlxuICAgKiBEZWZhdWx0IHZhbHVlIGlzIDAsIG1lYW5pbmcgbm8gZGVsYXkuXG4gICAqL1xuICBkZWxheT86IG51bWJlcnxzdHJpbmc7XG4gIC8qKlxuICAqIEEgc2V0IG9mIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMgdGhhdCBtb2RpZnkgc3R5bGluZyBhbmQgdGltaW5nXG4gICogd2hlbiBhbiBhbmltYXRpb24gYWN0aW9uIHN0YXJ0cy4gQW4gYXJyYXkgb2Yga2V5LXZhbHVlIHBhaXJzLCB3aGVyZSB0aGUgcHJvdmlkZWQgdmFsdWVcbiAgKiBpcyB1c2VkIGFzIGEgZGVmYXVsdC5cbiAgKi9cbiAgcGFyYW1zPzoge1tuYW1lOiBzdHJpbmddOiBhbnl9O1xufVxuXG4vKipcbiAqIEFkZHMgZHVyYXRpb24gb3B0aW9ucyB0byBjb250cm9sIGFuaW1hdGlvbiBzdHlsaW5nIGFuZCB0aW1pbmcgZm9yIGEgY2hpbGQgYW5pbWF0aW9uLlxuICpcbiAqIEBzZWUgYGFuaW1hdGVDaGlsZCgpYFxuICovXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0ZUNoaWxkT3B0aW9ucyBleHRlbmRzIEFuaW1hdGlvbk9wdGlvbnMgeyBkdXJhdGlvbj86IG51bWJlcnxzdHJpbmc7IH1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gQ29uc3RhbnRzIGZvciB0aGUgY2F0ZWdvcmllcyBvZiBwYXJhbWV0ZXJzIHRoYXQgY2FuIGJlIGRlZmluZWQgZm9yIGFuaW1hdGlvbnMuXG4gKlxuICogQSBjb3JyZXNwb25kaW5nIGZ1bmN0aW9uIGRlZmluZXMgYSBzZXQgb2YgcGFyYW1ldGVycyBmb3IgZWFjaCBjYXRlZ29yeSwgYW5kXG4gKiBjb2xsZWN0cyB0aGVtIGludG8gYSBjb3JyZXNwb25kaW5nIGBBbmltYXRpb25NZXRhZGF0YWAgb2JqZWN0LlxuICovXG5leHBvcnQgY29uc3QgZW51bSBBbmltYXRpb25NZXRhZGF0YVR5cGUge1xuICAvKipcbiAgICogQXNzb2NpYXRlcyBhIG5hbWVkIGFuaW1hdGlvbiBzdGF0ZSB3aXRoIGEgc2V0IG9mIENTUyBzdHlsZXMuXG4gICAqIFNlZSBgc3RhdGUoKWBcbiAgICovXG4gIFN0YXRlID0gMCxcbiAgLyoqXG4gICAqIERhdGEgZm9yIGEgdHJhbnNpdGlvbiBmcm9tIG9uZSBhbmltYXRpb24gc3RhdGUgdG8gYW5vdGhlci5cbiAgICogU2VlIGB0cmFuc2l0aW9uKClgXG4gICAqL1xuICBUcmFuc2l0aW9uID0gMSxcbiAgLyoqXG4gICAqIENvbnRhaW5zIGEgc2V0IG9mIGFuaW1hdGlvbiBzdGVwcy5cbiAgICogU2VlIGBzZXF1ZW5jZSgpYFxuICAgKi9cbiAgU2VxdWVuY2UgPSAyLFxuICAvKipcbiAgICogQ29udGFpbnMgYSBzZXQgb2YgYW5pbWF0aW9uIHN0ZXBzLlxuICAgKiBTZWUgYHtAbGluayBhbmltYXRpb25zL2dyb3VwIGdyb3VwKCl9YFxuICAgKi9cbiAgR3JvdXAgPSAzLFxuICAvKipcbiAgICogQ29udGFpbnMgYW4gYW5pbWF0aW9uIHN0ZXAuXG4gICAqIFNlZSBgYW5pbWF0ZSgpYFxuICAgKi9cbiAgQW5pbWF0ZSA9IDQsXG4gIC8qKlxuICAgKiBDb250YWlucyBhIHNldCBvZiBhbmltYXRpb24gc3RlcHMuXG4gICAqIFNlZSBga2V5ZnJhbWVzKClgXG4gICAqL1xuICBLZXlmcmFtZXMgPSA1LFxuICAvKipcbiAgICogQ29udGFpbnMgYSBzZXQgb2YgQ1NTIHByb3BlcnR5LXZhbHVlIHBhaXJzIGludG8gYSBuYW1lZCBzdHlsZS5cbiAgICogU2VlIGBzdHlsZSgpYFxuICAgKi9cbiAgU3R5bGUgPSA2LFxuICAvKipcbiAgICogQXNzb2NpYXRlcyBhbiBhbmltYXRpb24gd2l0aCBhbiBlbnRyeSB0cmlnZ2VyIHRoYXQgY2FuIGJlIGF0dGFjaGVkIHRvIGFuIGVsZW1lbnQuXG4gICAqIFNlZSBgdHJpZ2dlcigpYFxuICAgKi9cbiAgVHJpZ2dlciA9IDcsXG4gIC8qKlxuICAgKiBDb250YWlucyBhIHJlLXVzYWJsZSBhbmltYXRpb24uXG4gICAqIFNlZSBgYW5pbWF0aW9uKClgXG4gICAqL1xuICBSZWZlcmVuY2UgPSA4LFxuICAvKipcbiAgICogQ29udGFpbnMgZGF0YSB0byB1c2UgaW4gZXhlY3V0aW5nIGNoaWxkIGFuaW1hdGlvbnMgcmV0dXJuZWQgYnkgYSBxdWVyeS5cbiAgICogU2VlIGBhbmltYXRlQ2hpbGQoKWBcbiAgICovXG4gIEFuaW1hdGVDaGlsZCA9IDksXG4gIC8qKlxuICAgKiBDb250YWlucyBhbmltYXRpb24gcGFyYW1ldGVycyBmb3IgYSByZS11c2FibGUgYW5pbWF0aW9uLlxuICAgKiBTZWUgYHVzZUFuaW1hdGlvbigpYFxuICAgKi9cbiAgQW5pbWF0ZVJlZiA9IDEwLFxuICAvKipcbiAgICogQ29udGFpbnMgY2hpbGQtYW5pbWF0aW9uIHF1ZXJ5IGRhdGEuXG4gICAqIFNlZSBgcXVlcnkoKWBcbiAgICovXG4gIFF1ZXJ5ID0gMTEsXG4gIC8qKlxuICAgKiBDb250YWlucyBkYXRhIGZvciBzdGFnZ2VyaW5nIGFuIGFuaW1hdGlvbiBzZXF1ZW5jZS5cbiAgICogU2VlIGBzdGFnZ2VyKClgXG4gICAqL1xuICBTdGFnZ2VyID0gMTJcbn1cblxuLyoqXG4gKiBTcGVjaWZpZXMgYXV0b21hdGljIHN0eWxpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBBVVRPX1NUWUxFID0gJyonO1xuXG4vKipcbiAqIEJhc2UgZm9yIGFuaW1hdGlvbiBkYXRhIHN0cnVjdHVyZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uTWV0YWRhdGEgeyB0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGU7IH1cblxuLyoqXG4gKiBDb250YWlucyBhbiBhbmltYXRpb24gdHJpZ2dlci4gSW5zdGFudGlhdGVkIGFuZCByZXR1cm5lZCBieSB0aGVcbiAqIGB0cmlnZ2VyKClgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAgKiBUaGUgdHJpZ2dlciBuYW1lLCB1c2VkIHRvIGFzc29jaWF0ZSBpdCB3aXRoIGFuIGVsZW1lbnQuIFVuaXF1ZSB3aXRoaW4gdGhlIGNvbXBvbmVudC5cbiAgICAqL1xuICBuYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBbiBhbmltYXRpb24gZGVmaW5pdGlvbiBvYmplY3QsIGNvbnRhaW5pbmcgYW4gYXJyYXkgb2Ygc3RhdGUgYW5kIHRyYW5zaXRpb24gZGVjbGFyYXRpb25zLlxuICAgKi9cbiAgZGVmaW5pdGlvbnM6IEFuaW1hdGlvbk1ldGFkYXRhW107XG4gIC8qKlxuICAgKiBBbiBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIGEgZGVsYXkgYW5kXG4gICAqIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMgdGhhdCBwcm92aWRlIHN0eWxpbmcgZGVmYXVsdHMgYW5kXG4gICAqIGNhbiBiZSBvdmVycmlkZGVuIG9uIGludm9jYXRpb24uIERlZmF1bHQgZGVsYXkgaXMgMC5cbiAgICovXG4gIG9wdGlvbnM6IHtwYXJhbXM/OiB7W25hbWU6IHN0cmluZ106IGFueX19fG51bGw7XG59XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIGFuIGFuaW1hdGlvbiBzdGF0ZSBieSBhc3NvY2lhdGluZyBhIHN0YXRlIG5hbWUgd2l0aCBhIHNldCBvZiBDU1Mgc3R5bGVzLlxuICogSW5zdGFudGlhdGVkIGFuZCByZXR1cm5lZCBieSB0aGUgYHN0YXRlKClgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvblN0YXRlTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XG4gIC8qKlxuICAgKiBUaGUgc3RhdGUgbmFtZSwgdW5pcXVlIHdpdGhpbiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogIFRoZSBDU1Mgc3R5bGVzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHN0YXRlLlxuICAgKi9cbiAgc3R5bGVzOiBBbmltYXRpb25TdHlsZU1ldGFkYXRhO1xuICAvKipcbiAgICogQW4gb3B0aW9ucyBvYmplY3QgY29udGFpbmluZ1xuICAgKiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgcHJvdmlkZSBzdHlsaW5nIGRlZmF1bHRzIGFuZFxuICAgKiBjYW4gYmUgb3ZlcnJpZGRlbiBvbiBpbnZvY2F0aW9uLlxuICAgKi9cbiAgb3B0aW9ucz86IHtwYXJhbXM6IHtbbmFtZTogc3RyaW5nXTogYW55fX07XG59XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIGFuIGFuaW1hdGlvbiB0cmFuc2l0aW9uLiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5IHRoZVxuICogYHRyYW5zaXRpb24oKWAgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uVHJhbnNpdGlvbk1ldGFkYXRhIGV4dGVuZHMgQW5pbWF0aW9uTWV0YWRhdGEge1xuICAvKipcbiAgICogQW4gZXhwcmVzc2lvbiB0aGF0IGRlc2NyaWJlcyBhIHN0YXRlIGNoYW5nZS5cbiAgICovXG4gIGV4cHI6IHN0cmluZ3xcbiAgICAgICgoZnJvbVN0YXRlOiBzdHJpbmcsIHRvU3RhdGU6IHN0cmluZywgZWxlbWVudD86IGFueSxcbiAgICAgICAgcGFyYW1zPzoge1trZXk6IHN0cmluZ106IGFueX0pID0+IGJvb2xlYW4pO1xuICAvKipcbiAgICogT25lIG9yIG1vcmUgYW5pbWF0aW9uIG9iamVjdHMgdG8gd2hpY2ggdGhpcyB0cmFuc2l0aW9uIGFwcGxpZXMuXG4gICAqL1xuICBhbmltYXRpb246IEFuaW1hdGlvbk1ldGFkYXRhfEFuaW1hdGlvbk1ldGFkYXRhW107XG4gIC8qKlxuICAgKiBBbiBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIGEgZGVsYXkgYW5kXG4gICAqIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMgdGhhdCBwcm92aWRlIHN0eWxpbmcgZGVmYXVsdHMgYW5kXG4gICAqIGNhbiBiZSBvdmVycmlkZGVuIG9uIGludm9jYXRpb24uIERlZmF1bHQgZGVsYXkgaXMgMC5cbiAgICovXG4gIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnN8bnVsbDtcbn1cblxuLyoqXG4gKiBFbmNhcHN1bGF0ZXMgYSByZXVzYWJsZSBhbmltYXRpb24sIHdoaWNoIGlzIGEgY29sbGVjdGlvbiBvZiBpbmRpdmlkdWFsIGFuaW1hdGlvbiBzdGVwcy5cbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGBhbmltYXRpb24oKWAgZnVuY3Rpb24sIGFuZFxuICogcGFzc2VkIHRvIHRoZSBgdXNlQW5pbWF0aW9uKClgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhIGV4dGVuZHMgQW5pbWF0aW9uTWV0YWRhdGEge1xuICAvKipcbiAgICogIE9uZSBvciBtb3JlIGFuaW1hdGlvbiBzdGVwIG9iamVjdHMuXG4gICAqL1xuICBhbmltYXRpb246IEFuaW1hdGlvbk1ldGFkYXRhfEFuaW1hdGlvbk1ldGFkYXRhW107XG4gIC8qKlxuICAgKiBBbiBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIGEgZGVsYXkgYW5kXG4gICAqIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMgdGhhdCBwcm92aWRlIHN0eWxpbmcgZGVmYXVsdHMgYW5kXG4gICAqIGNhbiBiZSBvdmVycmlkZGVuIG9uIGludm9jYXRpb24uIERlZmF1bHQgZGVsYXkgaXMgMC5cbiAgICovXG4gIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnN8bnVsbDtcbn1cblxuLyoqXG4gKiBFbmNhcHN1bGF0ZXMgYW4gYW5pbWF0aW9uIHF1ZXJ5LiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5XG4gKiB0aGUgYHF1ZXJ5KClgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvblF1ZXJ5TWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XG4gIC8qKlxuICAgKiAgVGhlIENTUyBzZWxlY3RvciBmb3IgdGhpcyBxdWVyeS5cbiAgICovXG4gIHNlbGVjdG9yOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBPbmUgb3IgbW9yZSBhbmltYXRpb24gc3RlcCBvYmplY3RzLlxuICAgKi9cbiAgYW5pbWF0aW9uOiBBbmltYXRpb25NZXRhZGF0YXxBbmltYXRpb25NZXRhZGF0YVtdO1xuICAvKipcbiAgICogQSBxdWVyeSBvcHRpb25zIG9iamVjdC5cbiAgICovXG4gIG9wdGlvbnM6IEFuaW1hdGlvblF1ZXJ5T3B0aW9uc3xudWxsO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhIGtleWZyYW1lcyBzZXF1ZW5jZS4gSW5zdGFudGlhdGVkIGFuZCByZXR1cm5lZCBieVxuICogdGhlIGBrZXlmcmFtZXMoKWAgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uS2V5ZnJhbWVzU2VxdWVuY2VNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGFuaW1hdGlvbiBzdHlsZXMuXG4gICAqL1xuICBzdGVwczogQW5pbWF0aW9uU3R5bGVNZXRhZGF0YVtdO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhbiBhbmltYXRpb24gc3R5bGUuIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnlcbiAqIHRoZSBgc3R5bGUoKWAgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uU3R5bGVNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIEEgc2V0IG9mIENTUyBzdHlsZSBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgc3R5bGVzOiAnKid8e1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcn18QXJyYXk8e1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcn18JyonPjtcbiAgLyoqXG4gICAqIEEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgYW5pbWF0ZSB0aW1lIGF0IHdoaWNoIHRoZSBzdHlsZSBpcyB0byBiZSBhcHBsaWVkLlxuICAgKi9cbiAgb2Zmc2V0OiBudW1iZXJ8bnVsbDtcbn1cblxuLyoqXG4gKiBFbmNhcHN1bGF0ZXMgYW4gYW5pbWF0aW9uIHN0ZXAuIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnlcbiAqIHRoZSBgYW5pbWF0ZSgpYCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb25BbmltYXRlTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XG4gIC8qKlxuICAgKiBUaGUgdGltaW5nIGRhdGEgZm9yIHRoZSBzdGVwLlxuICAgKi9cbiAgdGltaW5nczogc3RyaW5nfG51bWJlcnxBbmltYXRlVGltaW5ncztcbiAgLyoqXG4gICAqIEEgc2V0IG9mIHN0eWxlcyB1c2VkIGluIHRoZSBzdGVwLlxuICAgKi9cbiAgc3R5bGVzOiBBbmltYXRpb25TdHlsZU1ldGFkYXRhfEFuaW1hdGlvbktleWZyYW1lc1NlcXVlbmNlTWV0YWRhdGF8bnVsbDtcbn1cblxuLyoqXG4gKiBFbmNhcHN1bGF0ZXMgYSBjaGlsZCBhbmltYXRpb24sIHRoYXQgY2FuIGJlIHJ1biBleHBsaWNpdGx5IHdoZW4gdGhlIHBhcmVudCBpcyBydW4uXG4gKiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5IHRoZSBgYW5pbWF0ZUNoaWxkYCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb25BbmltYXRlQ2hpbGRNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgYSBkZWxheSBhbmRcbiAgICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcbiAgICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi4gRGVmYXVsdCBkZWxheSBpcyAwLlxuICAgKi9cbiAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9uc3xudWxsO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhIHJldXNhYmxlIGFuaW1hdGlvbi5cbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGB1c2VBbmltYXRpb24oKWAgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uQW5pbWF0ZVJlZk1ldGFkYXRhIGV4dGVuZHMgQW5pbWF0aW9uTWV0YWRhdGEge1xuICAvKipcbiAgICogQW4gYW5pbWF0aW9uIHJlZmVyZW5jZSBvYmplY3QuXG4gICAqL1xuICBhbmltYXRpb246IEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhO1xuICAvKipcbiAgICogQW4gb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBhIGRlbGF5IGFuZFxuICAgKiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgcHJvdmlkZSBzdHlsaW5nIGRlZmF1bHRzIGFuZFxuICAgKiBjYW4gYmUgb3ZlcnJpZGRlbiBvbiBpbnZvY2F0aW9uLiBEZWZhdWx0IGRlbGF5IGlzIDAuXG4gICAqL1xuICBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zfG51bGw7XG59XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIGFuIGFuaW1hdGlvbiBzZXF1ZW5jZS5cbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGBzZXF1ZW5jZSgpYCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb25TZXF1ZW5jZU1ldGFkYXRhIGV4dGVuZHMgQW5pbWF0aW9uTWV0YWRhdGEge1xuICAvKipcbiAgICogIEFuIGFycmF5IG9mIGFuaW1hdGlvbiBzdGVwIG9iamVjdHMuXG4gICAqL1xuICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGFbXTtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgYSBkZWxheSBhbmRcbiAgICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcbiAgICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi4gRGVmYXVsdCBkZWxheSBpcyAwLlxuICAgKi9cbiAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9uc3xudWxsO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhbiBhbmltYXRpb24gZ3JvdXAuXG4gKiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5IHRoZSBge0BsaW5rIGFuaW1hdGlvbnMvZ3JvdXAgZ3JvdXAoKX1gIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvbkdyb3VwTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XG4gIC8qKlxuICAgKiBPbmUgb3IgbW9yZSBhbmltYXRpb24gb3Igc3R5bGUgc3RlcHMgdGhhdCBmb3JtIHRoaXMgZ3JvdXAuXG4gICAqL1xuICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGFbXTtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgYSBkZWxheSBhbmRcbiAgICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcbiAgICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi4gRGVmYXVsdCBkZWxheSBpcyAwLlxuICAgKi9cbiAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9uc3xudWxsO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhbmltYXRpb24gcXVlcnkgb3B0aW9ucy5cbiAqIFBhc3NlZCB0byB0aGUgYHF1ZXJ5KClgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0aW9uUXVlcnlPcHRpb25zIGV4dGVuZHMgQW5pbWF0aW9uT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoaXMgcXVlcnkgaXMgb3B0aW9uYWwsIGZhbHNlIGlmIGl0IGlzIHJlcXVpcmVkLiBEZWZhdWx0IGlzIGZhbHNlLlxuICAgKiBBIHJlcXVpcmVkIHF1ZXJ5IHRocm93cyBhbiBlcnJvciBpZiBubyBlbGVtZW50cyBhcmUgcmV0cmlldmVkIHdoZW5cbiAgICogdGhlIHF1ZXJ5IGlzIGV4ZWN1dGVkLiBBbiBvcHRpb25hbCBxdWVyeSBkb2VzIG5vdC5cbiAgICpcbiAgICovXG4gIG9wdGlvbmFsPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEEgbWF4aW11bSB0b3RhbCBudW1iZXIgb2YgcmVzdWx0cyB0byByZXR1cm4gZnJvbSB0aGUgcXVlcnkuXG4gICAqIElmIG5lZ2F0aXZlLCByZXN1bHRzIGFyZSBsaW1pdGVkIGZyb20gdGhlIGVuZCBvZiB0aGUgcXVlcnkgbGlzdCB0b3dhcmRzIHRoZSBiZWdpbm5pbmcuXG4gICAqIEJ5IGRlZmF1bHQsIHJlc3VsdHMgYXJlIG5vdCBsaW1pdGVkLlxuICAgKi9cbiAgbGltaXQ/OiBudW1iZXI7XG59XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIHBhcmFtZXRlcnMgZm9yIHN0YWdnZXJpbmcgdGhlIHN0YXJ0IHRpbWVzIG9mIGEgc2V0IG9mIGFuaW1hdGlvbiBzdGVwcy5cbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGBzdGFnZ2VyKClgIGZ1bmN0aW9uLlxuICoqL1xuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb25TdGFnZ2VyTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XG4gIC8qKlxuICAgKiBUaGUgdGltaW5nIGRhdGEgZm9yIHRoZSBzdGVwcy5cbiAgICovXG4gIHRpbWluZ3M6IHN0cmluZ3xudW1iZXI7XG4gIC8qKlxuICAgKiBPbmUgb3IgbW9yZSBhbmltYXRpb24gc3RlcHMuXG4gICAqL1xuICBhbmltYXRpb246IEFuaW1hdGlvbk1ldGFkYXRhfEFuaW1hdGlvbk1ldGFkYXRhW107XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5hbWVkIGFuaW1hdGlvbiB0cmlnZ2VyLCBjb250YWluaW5nIGEgIGxpc3Qgb2YgYHN0YXRlKClgXG4gKiBhbmQgYHRyYW5zaXRpb24oKWAgZW50cmllcyB0byBiZSBldmFsdWF0ZWQgd2hlbiB0aGUgZXhwcmVzc2lvblxuICogYm91bmQgdG8gdGhlIHRyaWdnZXIgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gbmFtZSBBbiBpZGVudGlmeWluZyBzdHJpbmcuXG4gKiBAcGFyYW0gZGVmaW5pdGlvbnMgIEFuIGFuaW1hdGlvbiBkZWZpbml0aW9uIG9iamVjdCwgY29udGFpbmluZyBhbiBhcnJheSBvZiBgc3RhdGUoKWBcbiAqIGFuZCBgdHJhbnNpdGlvbigpYCBkZWNsYXJhdGlvbnMuXG4gKlxuICogQHJldHVybiBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIHRyaWdnZXIgZGF0YS5cbiAqIFxuICogQHVzYWdlTm90ZXNcbiAqIERlZmluZSBhbiBhbmltYXRpb24gdHJpZ2dlciBpbiB0aGUgYGFuaW1hdGlvbnNgIHNlY3Rpb24gb2YgYEBDb21wb25lbnRgIG1ldGFkYXRhLlxuICogSW4gdGhlIHRlbXBsYXRlLCByZWZlcmVuY2UgdGhlIHRyaWdnZXIgYnkgbmFtZSBhbmQgYmluZCBpdCB0byBhIHRyaWdnZXIgZXhwcmVzc2lvbiB0aGF0XG4gKiBldmFsdWF0ZXMgdG8gYSBkZWZpbmVkIGFuaW1hdGlvbiBzdGF0ZSwgdXNpbmcgdGhlIGZvbGxvd2luZyBmb3JtYXQ6XG4gKlxuICogYFtAdHJpZ2dlck5hbWVdPVwiZXhwcmVzc2lvblwiYFxuICpcbiAqIEFuaW1hdGlvbiB0cmlnZ2VyIGJpbmRpbmdzIGNvbnZlcnQgYWxsIHZhbHVlcyB0byBzdHJpbmdzLCBhbmQgdGhlbiBtYXRjaCB0aGUgXG4gKiBwcmV2aW91cyBhbmQgY3VycmVudCB2YWx1ZXMgYWdhaW5zdCBhbnkgbGlua2VkIHRyYW5zaXRpb25zLlxuICogQm9vbGVhbnMgY2FuIGJlIHNwZWNpZmllZCBhcyBgMWAgb3IgYHRydWVgIGFuZCBgMGAgb3IgYGZhbHNlYC5cbiAqXG4gKiAjIyMgVXNhZ2UgRXhhbXBsZVxuICogXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgY3JlYXRlcyBhbiBhbmltYXRpb24gdHJpZ2dlciByZWZlcmVuY2UgYmFzZWQgb24gdGhlIHByb3ZpZGVkXG4gKiBuYW1lIHZhbHVlLlxuICogVGhlIHByb3ZpZGVkIGFuaW1hdGlvbiB2YWx1ZSBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheSBjb25zaXN0aW5nIG9mIHN0YXRlIGFuZFxuICogdHJhbnNpdGlvbiBkZWNsYXJhdGlvbnMuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiBcIm15LWNvbXBvbmVudFwiLFxuICogICB0ZW1wbGF0ZVVybDogXCJteS1jb21wb25lbnQtdHBsLmh0bWxcIixcbiAqICAgYW5pbWF0aW9uczogW1xuICogICAgIHRyaWdnZXIoXCJteUFuaW1hdGlvblRyaWdnZXJcIiwgW1xuICogICAgICAgc3RhdGUoLi4uKSxcbiAqICAgICAgIHN0YXRlKC4uLiksXG4gKiAgICAgICB0cmFuc2l0aW9uKC4uLiksXG4gKiAgICAgICB0cmFuc2l0aW9uKC4uLilcbiAqICAgICBdKVxuICogICBdXG4gKiB9KVxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBteVN0YXR1c0V4cCA9IFwic29tZXRoaW5nXCI7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBUaGUgdGVtcGxhdGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY29tcG9uZW50IG1ha2VzIHVzZSBvZiB0aGUgZGVmaW5lZCB0cmlnZ2VyXG4gKiBieSBiaW5kaW5nIHRvIGFuIGVsZW1lbnQgd2l0aGluIGl0cyB0ZW1wbGF0ZSBjb2RlLlxuICpcbiAqIGBgYGh0bWxcbiAqIDwhLS0gc29tZXdoZXJlIGluc2lkZSBvZiBteS1jb21wb25lbnQtdHBsLmh0bWwgLS0+XG4gKiA8ZGl2IFtAbXlBbmltYXRpb25UcmlnZ2VyXT1cIm15U3RhdHVzRXhwXCI+Li4uPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiAjIyMgVXNpbmcgYW4gaW5saW5lIGZ1bmN0aW9uXG4gKiBUaGUgYHRyYW5zaXRpb25gIGFuaW1hdGlvbiBtZXRob2QgYWxzbyBzdXBwb3J0cyByZWFkaW5nIGFuIGlubGluZSBmdW5jdGlvbiB3aGljaCBjYW4gZGVjaWRlXG4gKiBpZiBpdHMgYXNzb2NpYXRlZCBhbmltYXRpb24gc2hvdWxkIGJlIHJ1bi5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyB0aGlzIG1ldGhvZCBpcyBydW4gZWFjaCB0aW1lIHRoZSBgbXlBbmltYXRpb25UcmlnZ2VyYCB0cmlnZ2VyIHZhbHVlIGNoYW5nZXMuXG4gKiBmdW5jdGlvbiBteUlubGluZU1hdGNoZXJGbihmcm9tU3RhdGU6IHN0cmluZywgdG9TdGF0ZTogc3RyaW5nLCBlbGVtZW50OiBhbnksIHBhcmFtczoge1trZXk6XG4gc3RyaW5nXTogYW55fSk6IGJvb2xlYW4ge1xuICogICAvLyBub3RpY2UgdGhhdCBgZWxlbWVudGAgYW5kIGBwYXJhbXNgIGFyZSBhbHNvIGF2YWlsYWJsZSBoZXJlXG4gKiAgIHJldHVybiB0b1N0YXRlID09ICd5ZXMtcGxlYXNlLWFuaW1hdGUnO1xuICogfVxuICpcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ215LWNvbXBvbmVudCcsXG4gKiAgIHRlbXBsYXRlVXJsOiAnbXktY29tcG9uZW50LXRwbC5odG1sJyxcbiAqICAgYW5pbWF0aW9uczogW1xuICogICAgIHRyaWdnZXIoJ215QW5pbWF0aW9uVHJpZ2dlcicsIFtcbiAqICAgICAgIHRyYW5zaXRpb24obXlJbmxpbmVNYXRjaGVyRm4sIFtcbiAqICAgICAgICAgLy8gdGhlIGFuaW1hdGlvbiBzZXF1ZW5jZSBjb2RlXG4gKiAgICAgICBdKSxcbiAqICAgICBdKVxuICogICBdXG4gKiB9KVxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBteVN0YXR1c0V4cCA9IFwieWVzLXBsZWFzZS1hbmltYXRlXCI7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiAjIyMgRGlzYWJsaW5nIEFuaW1hdGlvbnNcbiAqIFdoZW4gdHJ1ZSwgdGhlIHNwZWNpYWwgYW5pbWF0aW9uIGNvbnRyb2wgYmluZGluZyBgQC5kaXNhYmxlZGAgYmluZGluZyBwcmV2ZW50cyBcbiAqIGFsbCBhbmltYXRpb25zIGZyb20gcmVuZGVyaW5nLlxuICogUGxhY2UgdGhlICBgQC5kaXNhYmxlZGAgYmluZGluZyBvbiBhbiBlbGVtZW50IHRvIGRpc2FibGVcbiAqIGFuaW1hdGlvbnMgb24gdGhlIGVsZW1lbnQgaXRzZWxmLCBhcyB3ZWxsIGFzIGFueSBpbm5lciBhbmltYXRpb24gdHJpZ2dlcnNcbiAqIHdpdGhpbiB0aGUgZWxlbWVudC5cbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgc2hvd3MgaG93IHRvIHVzZSB0aGlzIGZlYXR1cmU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktY29tcG9uZW50JyxcbiAqICAgdGVtcGxhdGU6IGBcbiAqICAgICA8ZGl2IFtALmRpc2FibGVkXT1cImlzRGlzYWJsZWRcIj5cbiAqICAgICAgIDxkaXYgW0BjaGlsZEFuaW1hdGlvbl09XCJleHBcIj48L2Rpdj5cbiAqICAgICA8L2Rpdj5cbiAqICAgYCxcbiAqICAgYW5pbWF0aW9uczogW1xuICogICAgIHRyaWdnZXIoXCJjaGlsZEFuaW1hdGlvblwiLCBbXG4gKiAgICAgICAvLyAuLi5cbiAqICAgICBdKVxuICogICBdXG4gKiB9KVxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBpc0Rpc2FibGVkID0gdHJ1ZTtcbiAqICAgZXhwID0gJy4uLic7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBXaGVuIGBALmRpc2FibGVkYCBpcyB0cnVlLCBpdCBwcmV2ZW50cyB0aGUgYEBjaGlsZEFuaW1hdGlvbmAgdHJpZ2dlciBmcm9tIGFuaW1hdGluZyxcbiAqIGFsb25nIHdpdGggYW55IGlubmVyIGFuaW1hdGlvbnMuXG4gKlxuICogIyMjIERpc2FibGUgYW5pbWF0aW9ucyBhcHBsaWNhdGlvbi13aWRlXG4gKiBXaGVuIGFuIGFyZWEgb2YgdGhlIHRlbXBsYXRlIGlzIHNldCB0byBoYXZlIGFuaW1hdGlvbnMgZGlzYWJsZWQsIFxuICogKiphbGwqKiBpbm5lciBjb21wb25lbnRzIGhhdmUgdGhlaXIgYW5pbWF0aW9ucyBkaXNhYmxlZCBhcyB3ZWxsLlxuICogVGhpcyBtZWFucyB0aGF0IHlvdSBjYW4gZGlzYWJsZSBhbGwgYW5pbWF0aW9ucyBmb3IgYW4gYXBwXG4gKiBieSBwbGFjaW5nIGEgaG9zdCBiaW5kaW5nIHNldCBvbiBgQC5kaXNhYmxlZGAgb24gdGhlIHRvcG1vc3QgQW5ndWxhciBjb21wb25lbnQuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnQsIEhvc3RCaW5kaW5nfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdhcHAtY29tcG9uZW50JyxcbiAqICAgdGVtcGxhdGVVcmw6ICdhcHAuY29tcG9uZW50Lmh0bWwnLFxuICogfSlcbiAqIGNsYXNzIEFwcENvbXBvbmVudCB7XG4gKiAgIEBIb3N0QmluZGluZygnQC5kaXNhYmxlZCcpXG4gKiAgIHB1YmxpYyBhbmltYXRpb25zRGlzYWJsZWQgPSB0cnVlO1xuICogfVxuICogYGBgXG4gKlxuICogIyMjIE92ZXJyaWRpbmcgZGlzYWJsZW1lbnQgb2YgaW5uZXIgYW5pbWF0aW9uc1xuICogRGVzcGl0ZSBpbm5lciBhbmltYXRpb25zIGJlaW5nIGRpc2FibGVkLCBhIHBhcmVudCBhbmltYXRpb24gY2FuIGBxdWVyeSgpYFxuICogZm9yIGlubmVyIGVsZW1lbnRzIGxvY2F0ZWQgaW4gZGlzYWJsZWQgYXJlYXMgb2YgdGhlIHRlbXBsYXRlIGFuZCBzdGlsbCBhbmltYXRlIFxuICogdGhlbSBpZiBuZWVkZWQuIFRoaXMgaXMgYWxzbyB0aGUgY2FzZSBmb3Igd2hlbiBhIHN1YiBhbmltYXRpb24gaXMgXG4gKiBxdWVyaWVkIGJ5IGEgcGFyZW50IGFuZCB0aGVuIGxhdGVyIGFuaW1hdGVkIHVzaW5nIGBhbmltYXRlQ2hpbGQoKWAuXG4gKlxuICogIyMjIERldGVjdGluZyB3aGVuIGFuIGFuaW1hdGlvbiBpcyBkaXNhYmxlZFxuICogSWYgYSByZWdpb24gb2YgdGhlIERPTSAob3IgdGhlIGVudGlyZSBhcHBsaWNhdGlvbikgaGFzIGl0cyBhbmltYXRpb25zIGRpc2FibGVkLCB0aGUgYW5pbWF0aW9uXG4gKiB0cmlnZ2VyIGNhbGxiYWNrcyBzdGlsbCBmaXJlLCBidXQgZm9yIHplcm8gc2Vjb25kcy4gV2hlbiB0aGUgY2FsbGJhY2sgZmlyZXMsIGl0IHByb3ZpZGVzXG4gKiBhbiBpbnN0YW5jZSBvZiBhbiBgQW5pbWF0aW9uRXZlbnRgLiBJZiBhbmltYXRpb25zIGFyZSBkaXNhYmxlZCxcbiAqIHRoZSBgLmRpc2FibGVkYCBmbGFnIG9uIHRoZSBldmVudCBpcyB0cnVlLlxuICpcbiAqIEBleHBlcmltZW50YWwgQW5pbWF0aW9uIHN1cHBvcnQgaXMgZXhwZXJpbWVudGFsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlcihuYW1lOiBzdHJpbmcsIGRlZmluaXRpb25zOiBBbmltYXRpb25NZXRhZGF0YVtdKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgcmV0dXJuIHt0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuVHJpZ2dlciwgbmFtZSwgZGVmaW5pdGlvbnMsIG9wdGlvbnM6IHt9fTtcbn1cblxuLyoqXG4gKiBEZWZpbmVzIGFuIGFuaW1hdGlvbiBzdGVwIHRoYXQgY29tYmluZXMgc3R5bGluZyBpbmZvcm1hdGlvbiB3aXRoIHRpbWluZyBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcGFyYW0gdGltaW5ncyBTZXRzIGBBbmltYXRlVGltaW5nc2AgZm9yIHRoZSBwYXJlbnQgYW5pbWF0aW9uLlxuICogQSBzdHJpbmcgaW4gdGhlIGZvcm1hdCBcImR1cmF0aW9uIFtkZWxheV0gW2Vhc2luZ11cIi5cbiAqICAtIER1cmF0aW9uIGFuZCBkZWxheSBhcmUgZXhwcmVzc2VkIGFzIGEgbnVtYmVyIGFuZCBvcHRpb25hbCB0aW1lIHVuaXQsXG4gKiBzdWNoIGFzIFwiMXNcIiBvciBcIjEwbXNcIiBmb3Igb25lIHNlY29uZCBhbmQgMTAgbWlsbGlzZWNvbmRzLCByZXNwZWN0aXZlbHkuXG4gKiBUaGUgZGVmYXVsdCB1bml0IGlzIG1pbGxpc2Vjb25kcy5cbiAqICAtIFRoZSBlYXNpbmcgdmFsdWUgY29udHJvbHMgaG93IHRoZSBhbmltYXRpb24gYWNjZWxlcmF0ZXMgYW5kIGRlY2VsZXJhdGVzXG4gKiBkdXJpbmcgaXRzIHJ1bnRpbWUuIFZhbHVlIGlzIG9uZSBvZiAgYGVhc2VgLCBgZWFzZS1pbmAsIGBlYXNlLW91dGAsXG4gKiBgZWFzZS1pbi1vdXRgLCBvciBhIGBjdWJpYy1iZXppZXIoKWAgZnVuY3Rpb24gY2FsbC5cbiAqIElmIG5vdCBzdXBwbGllZCwgbm8gZWFzaW5nIGlzIGFwcGxpZWQuXG4gKlxuICogRm9yIGV4YW1wbGUsIHRoZSBzdHJpbmcgXCIxcyAxMDBtcyBlYXNlLW91dFwiIHNwZWNpZmllcyBhIGR1cmF0aW9uIG9mXG4gKiAxMDAwIG1pbGxpc2Vjb25kcywgYW5kIGRlbGF5IG9mIDEwMCBtcywgYW5kIHRoZSBcImVhc2Utb3V0XCIgZWFzaW5nIHN0eWxlLFxuICogd2hpY2ggZGVjZWxlcmF0ZXMgbmVhciB0aGUgZW5kIG9mIHRoZSBkdXJhdGlvbi5cbiAqIEBwYXJhbSBzdHlsZXMgU2V0cyBBbmltYXRpb25TdHlsZXMgZm9yIHRoZSBwYXJlbnQgYW5pbWF0aW9uLlxuICogQSBmdW5jdGlvbiBjYWxsIHRvIGVpdGhlciBgc3R5bGUoKWAgb3IgYGtleWZyYW1lcygpYFxuICogdGhhdCByZXR1cm5zIGEgY29sbGVjdGlvbiBvZiBDU1Mgc3R5bGUgZW50cmllcyB0byBiZSBhcHBsaWVkIHRvIHRoZSBwYXJlbnQgYW5pbWF0aW9uLlxuICogV2hlbiBudWxsLCB1c2VzIHRoZSBzdHlsZXMgZnJvbSB0aGUgZGVzdGluYXRpb24gc3RhdGUuXG4gKiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGRlc2NyaWJpbmcgYW4gYW5pbWF0aW9uIHN0ZXAgdGhhdCB3aWxsIGNvbXBsZXRlIGFuIGFuaW1hdGlvbjtcbiAqIHNlZSBcIkFuaW1hdGluZyB0byB0aGUgZmluYWwgc3RhdGVcIiBpbiBgdHJhbnNpdGlvbnMoKWAuXG4gKiBAcmV0dXJucyBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIGFuaW1hdGlvbiBzdGVwLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBDYWxsIHdpdGhpbiBhbiBhbmltYXRpb24gYHNlcXVlbmNlKClgLCBge0BsaW5rIGFuaW1hdGlvbnMvZ3JvdXAgZ3JvdXAoKX1gLCBvclxuICogYHRyYW5zaXRpb24oKWAgY2FsbCB0byBzcGVjaWZ5IGFuIGFuaW1hdGlvbiBzdGVwXG4gKiB0aGF0IGFwcGxpZXMgZ2l2ZW4gc3R5bGUgZGF0YSB0byB0aGUgcGFyZW50IGFuaW1hdGlvbiBmb3IgYSBnaXZlbiBhbW91bnQgb2YgdGltZS5cbiAqXG4gKiAjIyMgU3ludGF4IEV4YW1wbGVzXG4gKiAqKlRpbWluZyBleGFtcGxlcyoqXG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlcyBzaG93IHZhcmlvdXMgYHRpbWluZ3NgIHNwZWNpZmljYXRpb25zLlxuICogLSBgYW5pbWF0ZSg1MDApYCA6IER1cmF0aW9uIGlzIDUwMCBtaWxsaXNlY29uZHMuXG4gKiAtIGBhbmltYXRlKFwiMXNcIilgIDogRHVyYXRpb24gaXMgMTAwMCBtaWxsaXNlY29uZHMuXG4gKiAtIGBhbmltYXRlKFwiMTAwbXMgMC41c1wiKWAgOiBEdXJhdGlvbiBpcyAxMDAgbWlsbGlzZWNvbmRzLCBkZWxheSBpcyA1MDAgbWlsbGlzZWNvbmRzLlxuICogLSBgYW5pbWF0ZShcIjVzIGVhc2UtaW5cIilgIDogRHVyYXRpb24gaXMgNTAwMCBtaWxsaXNlY29uZHMsIGVhc2luZyBpbi5cbiAqIC0gYGFuaW1hdGUoXCI1cyAxMG1zIGN1YmljLWJlemllciguMTcsLjY3LC44OCwuMSlcIilgIDogRHVyYXRpb24gaXMgNTAwMCBtaWxsaXNlY29uZHMsIGRlbGF5IGlzIDEwXG4gKiBtaWxsaXNlY29uZHMsIGVhc2luZyBhY2NvcmRpbmcgdG8gYSBiZXppZXIgY3VydmUuXG4gKlxuICogKipTdHlsZSBleGFtcGxlcyoqXG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIGNhbGxzIGBzdHlsZSgpYCB0byBzZXQgYSBzaW5nbGUgQ1NTIHN0eWxlLlxuICogYGBgdHlwZXNjcmlwdFxuICogYW5pbWF0ZSg1MDAsIHN0eWxlKHsgYmFja2dyb3VuZDogXCJyZWRcIiB9KSlcbiAqIGBgYFxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIGNhbGxzIGBrZXlmcmFtZXMoKWAgdG8gc2V0IGEgQ1NTIHN0eWxlXG4gKiB0byBkaWZmZXJlbnQgdmFsdWVzIGZvciBzdWNjZXNzaXZlIGtleWZyYW1lcy5cbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGFuaW1hdGUoNTAwLCBrZXlmcmFtZXMoXG4gKiAgW1xuICogICBzdHlsZSh7IGJhY2tncm91bmQ6IFwiYmx1ZVwiIH0pKSxcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kOiBcInJlZFwiIH0pKVxuICogIF0pXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGUoXG4gICAgdGltaW5nczogc3RyaW5nIHwgbnVtYmVyLCBzdHlsZXM6IEFuaW1hdGlvblN0eWxlTWV0YWRhdGEgfCBBbmltYXRpb25LZXlmcmFtZXNTZXF1ZW5jZU1ldGFkYXRhIHxcbiAgICAgICAgbnVsbCA9IG51bGwpOiBBbmltYXRpb25BbmltYXRlTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5BbmltYXRlLCBzdHlsZXMsIHRpbWluZ3N9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBEZWZpbmVzIGEgbGlzdCBvZiBhbmltYXRpb24gc3RlcHMgdG8gYmUgcnVuIGluIHBhcmFsbGVsLlxuICpcbiAqIEBwYXJhbSBzdGVwcyBBbiBhcnJheSBvZiBhbmltYXRpb24gc3RlcCBvYmplY3RzLlxuICogLSBXaGVuIHN0ZXBzIGFyZSBkZWZpbmVkIGJ5IGBzdHlsZSgpYCBvciBgYW5pbWF0ZSgpYFxuICogZnVuY3Rpb24gY2FsbHMsIGVhY2ggY2FsbCB3aXRoaW4gdGhlIGdyb3VwIGlzIGV4ZWN1dGVkIGluc3RhbnRseS5cbiAqIC0gVG8gc3BlY2lmeSBvZmZzZXQgc3R5bGVzIHRvIGJlIGFwcGxpZWQgYXQgYSBsYXRlciB0aW1lLCBkZWZpbmUgc3RlcHMgd2l0aFxuICogYGtleWZyYW1lcygpYCwgb3IgdXNlIGBhbmltYXRlKClgIGNhbGxzIHdpdGggYSBkZWxheSB2YWx1ZS5cbiAqIEZvciBleGFtcGxlOlxuICogXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBncm91cChbXG4gKiAgIGFuaW1hdGUoXCIxc1wiLCB7IGJhY2tncm91bmQ6IFwiYmxhY2tcIiB9KSlcbiAqICAgYW5pbWF0ZShcIjJzXCIsIHsgY29sb3I6IFwid2hpdGVcIiB9KSlcbiAqIF0pXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIGEgZGVsYXkgYW5kXG4gKiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgcHJvdmlkZSBzdHlsaW5nIGRlZmF1bHRzIGFuZFxuICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgZ3JvdXAgZGF0YS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogR3JvdXBlZCBhbmltYXRpb25zIGFyZSB1c2VmdWwgd2hlbiBhIHNlcmllcyBvZiBzdHlsZXMgbXVzdCBiZSBcbiAqIGFuaW1hdGVkIGF0IGRpZmZlcmVudCBzdGFydGluZyB0aW1lcyBhbmQgY2xvc2VkIG9mZiBhdCBkaWZmZXJlbnQgZW5kaW5nIHRpbWVzLlxuICpcbiAqIFdoZW4gY2FsbGVkIHdpdGhpbiBhIGBzZXF1ZW5jZSgpYCBvciBhXG4gKiBgdHJhbnNpdGlvbigpYCBjYWxsLCBkb2VzIG5vdCBjb250aW51ZSB0byB0aGUgbmV4dFxuICogaW5zdHJ1Y3Rpb24gdW50aWwgYWxsIG9mIHRoZSBpbm5lciBhbmltYXRpb24gc3RlcHMgaGF2ZSBjb21wbGV0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncm91cChcbiAgICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGFbXSwgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyB8IG51bGwgPSBudWxsKTogQW5pbWF0aW9uR3JvdXBNZXRhZGF0YSB7XG4gIHJldHVybiB7dHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLkdyb3VwLCBzdGVwcywgb3B0aW9uc307XG59XG5cbi8qKlxuICogRGVmaW5lcyBhIGxpc3Qgb2YgYW5pbWF0aW9uIHN0ZXBzIHRvIGJlIHJ1biBzZXF1ZW50aWFsbHksIG9uZSBieSBvbmUuXG4gKlxuICogQHBhcmFtIHN0ZXBzIEFuIGFycmF5IG9mIGFuaW1hdGlvbiBzdGVwIG9iamVjdHMuXG4gKiAtIFN0ZXBzIGRlZmluZWQgYnkgYHN0eWxlKClgIGNhbGxzIGFwcGx5IHRoZSBzdHlsaW5nIGRhdGEgaW1tZWRpYXRlbHkuXG4gKiAtIFN0ZXBzIGRlZmluZWQgYnkgYGFuaW1hdGUoKWAgY2FsbHMgYXBwbHkgdGhlIHN0eWxpbmcgZGF0YSBvdmVyIHRpbWVcbiAqICAgYXMgc3BlY2lmaWVkIGJ5IHRoZSB0aW1pbmcgZGF0YS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBzZXF1ZW5jZShbXG4gKiAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gKiAgIGFuaW1hdGUoXCIxc1wiLCB7IG9wYWNpdHk6IDEgfSkpXG4gKiBdKVxuICogYGBgXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBhIGRlbGF5IGFuZFxuICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcbiAqIGNhbiBiZSBvdmVycmlkZGVuIG9uIGludm9jYXRpb24uXG4gKlxuICogQHJldHVybiBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIHNlcXVlbmNlIGRhdGEuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFdoZW4geW91IHBhc3MgYW4gYXJyYXkgb2Ygc3RlcHMgdG8gYVxuICogYHRyYW5zaXRpb24oKWAgY2FsbCwgdGhlIHN0ZXBzIHJ1biBzZXF1ZW50aWFsbHkgYnkgZGVmYXVsdC5cbiAqIENvbXBhcmUgdGhpcyB0byB0aGUgYHtAbGluayBhbmltYXRpb25zL2dyb3VwIGdyb3VwKCl9YCBjYWxsLCB3aGljaCBydW5zIGFuaW1hdGlvbiBzdGVwcyBpbiBwYXJhbGxlbC5cbiAqXG4gKiBXaGVuIGEgc2VxdWVuY2UgaXMgdXNlZCB3aXRoaW4gYSBge0BsaW5rIGFuaW1hdGlvbnMvZ3JvdXAgZ3JvdXAoKX1gIG9yIGEgYHRyYW5zaXRpb24oKWAgY2FsbCxcbiAqIGV4ZWN1dGlvbiBjb250aW51ZXMgdG8gdGhlIG5leHQgaW5zdHJ1Y3Rpb24gb25seSBhZnRlciBlYWNoIG9mIHRoZSBpbm5lciBhbmltYXRpb25cbiAqIHN0ZXBzIGhhdmUgY29tcGxldGVkLlxuICpcbiAqKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZShzdGVwczogQW5pbWF0aW9uTWV0YWRhdGFbXSwgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9ucyB8IG51bGwgPSBudWxsKTpcbiAgICBBbmltYXRpb25TZXF1ZW5jZU1ldGFkYXRhIHtcbiAgcmV0dXJuIHt0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuU2VxdWVuY2UsIHN0ZXBzLCBvcHRpb25zfTtcbn1cblxuLyoqXG4gKiBEZWNsYXJlcyBhIGtleS92YWx1ZSBvYmplY3QgY29udGFpbmluZyBDU1MgcHJvcGVydGllcy9zdHlsZXMgdGhhdFxuICogY2FuIHRoZW4gYmUgdXNlZCBmb3IgYW4gYW5pbWF0aW9uIGBzdGF0ZWAsIHdpdGhpbiBhbiBhbmltYXRpb24gYHNlcXVlbmNlYCxcbiAqIG9yIGFzIHN0eWxpbmcgZGF0YSBmb3IgY2FsbHMgdG8gYGFuaW1hdGUoKWAgYW5kIGBrZXlmcmFtZXMoKWAuXG4gKlxuICogQHBhcmFtIHRva2VucyBBIHNldCBvZiBDU1Mgc3R5bGVzIG9yIEhUTUwgc3R5bGVzIGFzc29jaWF0ZWQgd2l0aCBhbiBhbmltYXRpb24gc3RhdGUuXG4gKiBUaGUgdmFsdWUgY2FuIGJlIGFueSBvZiB0aGUgZm9sbG93aW5nOlxuICogLSBBIGtleS12YWx1ZSBzdHlsZSBwYWlyIGFzc29jaWF0aW5nIGEgQ1NTIHByb3BlcnR5IHdpdGggYSB2YWx1ZS5cbiAqIC0gQW4gYXJyYXkgb2Yga2V5LXZhbHVlIHN0eWxlIHBhaXJzLlxuICogLSBBbiBhc3RlcmlzayAoKiksIHRvIHVzZSBhdXRvLXN0eWxpbmcsIHdoZXJlIHN0eWxlcyBhcmUgZGVyaXZlZCBmcm9tIHRoZSBlbGVtZW50XG4gKiBiZWluZyBhbmltYXRlZCBhbmQgYXBwbGllZCB0byB0aGUgYW5pbWF0aW9uIHdoZW4gaXQgc3RhcnRzLlxuICpcbiAqIEF1dG8tc3R5bGluZyBjYW4gYmUgdXNlZCB0byBkZWZpbmUgYSBzdGF0ZSB0aGF0IGRlcGVuZHMgb24gbGF5b3V0IG9yIG90aGVyIFxuICogZW52aXJvbm1lbnRhbCBmYWN0b3JzLlxuICpcbiAqIEByZXR1cm4gQW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSBzdHlsZSBkYXRhLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGVzIGNyZWF0ZSBhbmltYXRpb24gc3R5bGVzIHRoYXQgY29sbGVjdCBhIHNldCBvZlxuICogQ1NTIHByb3BlcnR5IHZhbHVlczpcbiAqIFxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gc3RyaW5nIHZhbHVlcyBmb3IgQ1NTIHByb3BlcnRpZXNcbiAqIHN0eWxlKHsgYmFja2dyb3VuZDogXCJyZWRcIiwgY29sb3I6IFwiYmx1ZVwiIH0pXG4gKlxuICogLy8gbnVtZXJpY2FsIHBpeGVsIHZhbHVlc1xuICogc3R5bGUoeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDAgfSlcbiAqIGBgYFxuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSB1c2VzIGF1dG8tc3R5bGluZyB0byBhbGxvdyBhIGNvbXBvbmVudCB0byBhbmltYXRlIGZyb21cbiAqIGEgaGVpZ2h0IG9mIDAgdXAgdG8gdGhlIGhlaWdodCBvZiB0aGUgcGFyZW50IGVsZW1lbnQ6XG4gKlxuICogYGBgXG4gKiBzdHlsZSh7IGhlaWdodDogMCB9KSxcbiAqIGFuaW1hdGUoXCIxc1wiLCBzdHlsZSh7IGhlaWdodDogXCIqXCIgfSkpXG4gKiBgYGBcbiAqXG4gKiovXG5leHBvcnQgZnVuY3Rpb24gc3R5bGUoXG4gICAgdG9rZW5zOiAnKicgfCB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyfSB8XG4gICAgQXJyYXk8JyonfHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXJ9Pik6IEFuaW1hdGlvblN0eWxlTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TdHlsZSwgc3R5bGVzOiB0b2tlbnMsIG9mZnNldDogbnVsbH07XG59XG5cbi8qKlxuICogRGVjbGFyZXMgYW4gYW5pbWF0aW9uIHN0YXRlIHdpdGhpbiBhIHRyaWdnZXIgYXR0YWNoZWQgdG8gYW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gbmFtZSBPbmUgb3IgbW9yZSBuYW1lcyBmb3IgdGhlIGRlZmluZWQgc3RhdGUgaW4gYSBjb21tYS1zZXBhcmF0ZWQgc3RyaW5nLlxuICogVGhlIGZvbGxvd2luZyByZXNlcnZlZCBzdGF0ZSBuYW1lcyBjYW4gYmUgc3VwcGxpZWQgdG8gZGVmaW5lIGEgc3R5bGUgZm9yIHNwZWNpZmljIHVzZVxuICogY2FzZXM6XG4gKlxuICogLSBgdm9pZGAgWW91IGNhbiBhc3NvY2lhdGUgc3R5bGVzIHdpdGggdGhpcyBuYW1lIHRvIGJlIHVzZWQgd2hlblxuICogdGhlIGVsZW1lbnQgaXMgZGV0YWNoZWQgZnJvbSB0aGUgYXBwbGljYXRpb24uIEZvciBleGFtcGxlLCB3aGVuIGFuIGBuZ0lmYCBldmFsdWF0ZXNcbiAqIHRvIGZhbHNlLCB0aGUgc3RhdGUgb2YgdGhlIGFzc29jaWF0ZWQgZWxlbWVudCBpcyB2b2lkLlxuICogIC0gYCpgIChhc3RlcmlzaykgSW5kaWNhdGVzIHRoZSBkZWZhdWx0IHN0YXRlLiBZb3UgY2FuIGFzc29jaWF0ZSBzdHlsZXMgd2l0aCB0aGlzIG5hbWVcbiAqIHRvIGJlIHVzZWQgYXMgdGhlIGZhbGxiYWNrIHdoZW4gdGhlIHN0YXRlIHRoYXQgaXMgYmVpbmcgYW5pbWF0ZWQgaXMgbm90IGRlY2xhcmVkXG4gKiB3aXRoaW4gdGhlIHRyaWdnZXIuXG4gKlxuICogQHBhcmFtIHN0eWxlcyBBIHNldCBvZiBDU1Mgc3R5bGVzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHN0YXRlLCBjcmVhdGVkIHVzaW5nIHRoZVxuICogYHN0eWxlKClgIGZ1bmN0aW9uLlxuICogVGhpcyBzZXQgb2Ygc3R5bGVzIHBlcnNpc3RzIG9uIHRoZSBlbGVtZW50IG9uY2UgdGhlIHN0YXRlIGhhcyBiZWVuIHJlYWNoZWQuXG4gKiBAcGFyYW0gb3B0aW9ucyBQYXJhbWV0ZXJzIHRoYXQgY2FuIGJlIHBhc3NlZCB0byB0aGUgc3RhdGUgd2hlbiBpdCBpcyBpbnZva2VkLlxuICogMCBvciBtb3JlIGtleS12YWx1ZSBwYWlycy5cbiAqIEByZXR1cm4gQW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSBuZXcgc3RhdGUgZGF0YS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVXNlIHRoZSBgdHJpZ2dlcigpYCBmdW5jdGlvbiB0byByZWdpc3RlciBzdGF0ZXMgdG8gYW4gYW5pbWF0aW9uIHRyaWdnZXIuXG4gKiBVc2UgdGhlIGB0cmFuc2l0aW9uKClgIGZ1bmN0aW9uIHRvIGFuaW1hdGUgYmV0d2VlbiBzdGF0ZXMuXG4gKiBXaGVuIGEgc3RhdGUgaXMgYWN0aXZlIHdpdGhpbiBhIGNvbXBvbmVudCwgaXRzIGFzc29jaWF0ZWQgc3R5bGVzIHBlcnNpc3Qgb24gdGhlIGVsZW1lbnQsXG4gKiBldmVuIHdoZW4gdGhlIGFuaW1hdGlvbiBlbmRzLlxuICoqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlKFxuICAgIG5hbWU6IHN0cmluZywgc3R5bGVzOiBBbmltYXRpb25TdHlsZU1ldGFkYXRhLFxuICAgIG9wdGlvbnM/OiB7cGFyYW1zOiB7W25hbWU6IHN0cmluZ106IGFueX19KTogQW5pbWF0aW9uU3RhdGVNZXRhZGF0YSB7XG4gIHJldHVybiB7dHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlN0YXRlLCBuYW1lLCBzdHlsZXMsIG9wdGlvbnN9O1xufVxuXG4vKipcbiAqIERlZmluZXMgYSBzZXQgb2YgYW5pbWF0aW9uIHN0eWxlcywgYXNzb2NpYXRpbmcgZWFjaCBzdHlsZSB3aXRoIGFuIG9wdGlvbmFsIGBvZmZzZXRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBzdGVwcyBBIHNldCBvZiBhbmltYXRpb24gc3R5bGVzIHdpdGggb3B0aW9uYWwgb2Zmc2V0IGRhdGEuXG4gKiBUaGUgb3B0aW9uYWwgYG9mZnNldGAgdmFsdWUgZm9yIGEgc3R5bGUgc3BlY2lmaWVzIGEgcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgYW5pbWF0aW9uXG4gKiB0aW1lIGF0IHdoaWNoIHRoYXQgc3R5bGUgaXMgYXBwbGllZC5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUga2V5ZnJhbWVzIGRhdGEuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFVzZSB3aXRoIHRoZSBgYW5pbWF0ZSgpYCBjYWxsLiBJbnN0ZWFkIG9mIGFwcGx5aW5nIGFuaW1hdGlvbnNcbiAqIGZyb20gdGhlIGN1cnJlbnQgc3RhdGVcbiAqIHRvIHRoZSBkZXN0aW5hdGlvbiBzdGF0ZSwga2V5ZnJhbWVzIGRlc2NyaWJlIGhvdyBlYWNoIHN0eWxlIGVudHJ5IGlzIGFwcGxpZWQgYW5kIGF0IHdoYXQgcG9pbnRcbiAqIHdpdGhpbiB0aGUgYW5pbWF0aW9uIGFyYy5cbiAqIENvbXBhcmUgW0NTUyBLZXlmcmFtZSBBbmltYXRpb25zXShodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2Nzcy9jc3MzX2FuaW1hdGlvbnMuYXNwKS5cbiAqXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBJbiB0aGUgZm9sbG93aW5nIGV4YW1wbGUsIHRoZSBvZmZzZXQgdmFsdWVzIGRlc2NyaWJlXG4gKiB3aGVuIGVhY2ggYGJhY2tncm91bmRDb2xvcmAgdmFsdWUgaXMgYXBwbGllZC4gVGhlIGNvbG9yIGlzIHJlZCBhdCB0aGUgc3RhcnQsIGFuZCBjaGFuZ2VzIHRvXG4gKiBibHVlIHdoZW4gMjAlIG9mIHRoZSB0b3RhbCB0aW1lIGhhcyBlbGFwc2VkLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIHRoZSBwcm92aWRlZCBvZmZzZXQgdmFsdWVzXG4gKiBhbmltYXRlKFwiNXNcIiwga2V5ZnJhbWVzKFtcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCIsIG9mZnNldDogMCB9KSxcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwiYmx1ZVwiLCBvZmZzZXQ6IDAuMiB9KSxcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwib3JhbmdlXCIsIG9mZnNldDogMC4zIH0pLFxuICogICBzdHlsZSh7IGJhY2tncm91bmRDb2xvcjogXCJibGFja1wiLCBvZmZzZXQ6IDEgfSlcbiAqIF0pKVxuICogYGBgXG4gKlxuICogSWYgdGhlcmUgYXJlIG5vIGBvZmZzZXRgIHZhbHVlcyBzcGVjaWZpZWQgaW4gdGhlIHN0eWxlIGVudHJpZXMsIHRoZSBvZmZzZXRzXG4gKiBhcmUgY2FsY3VsYXRlZCBhdXRvbWF0aWNhbGx5LlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGFuaW1hdGUoXCI1c1wiLCBrZXlmcmFtZXMoW1xuICogICBzdHlsZSh7IGJhY2tncm91bmRDb2xvcjogXCJyZWRcIiB9KSAvLyBvZmZzZXQgPSAwXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZENvbG9yOiBcImJsdWVcIiB9KSAvLyBvZmZzZXQgPSAwLjMzXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZENvbG9yOiBcIm9yYW5nZVwiIH0pIC8vIG9mZnNldCA9IDAuNjZcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwiYmxhY2tcIiB9KSAvLyBvZmZzZXQgPSAxXG4gKiBdKSlcbiAqYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrZXlmcmFtZXMoc3RlcHM6IEFuaW1hdGlvblN0eWxlTWV0YWRhdGFbXSk6IEFuaW1hdGlvbktleWZyYW1lc1NlcXVlbmNlTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5LZXlmcmFtZXMsIHN0ZXBzfTtcbn1cblxuLyoqXG4gKiBEZWNsYXJlcyBhbiBhbmltYXRpb24gdHJhbnNpdGlvbiBhcyBhIHNlcXVlbmNlIG9mIGFuaW1hdGlvbiBzdGVwcyB0byBydW4gd2hlbiBhIGdpdmVuXG4gKiBjb25kaXRpb24gaXMgc2F0aXNmaWVkLiBUaGUgY29uZGl0aW9uIGlzIGEgQm9vbGVhbiBleHByZXNzaW9uIG9yIGZ1bmN0aW9uIHRoYXQgY29tcGFyZXNcbiAqIHRoZSBwcmV2aW91cyBhbmQgY3VycmVudCBhbmltYXRpb24gc3RhdGVzLCBhbmQgcmV0dXJucyB0cnVlIGlmIHRoaXMgdHJhbnNpdGlvbiBzaG91bGQgb2NjdXIuXG4gKiBXaGVuIHRoZSBzdGF0ZSBjcml0ZXJpYSBvZiBhIGRlZmluZWQgdHJhbnNpdGlvbiBhcmUgbWV0LCB0aGUgYXNzb2NpYXRlZCBhbmltYXRpb24gaXNcbiAqIHRyaWdnZXJlZC5cbiAqXG4gKiBAcGFyYW0gc3RhdGVDaGFuZ2VFeHByIEEgQm9vbGVhbiBleHByZXNzaW9uIG9yIGZ1bmN0aW9uIHRoYXQgY29tcGFyZXMgdGhlIHByZXZpb3VzIGFuZCBjdXJyZW50XG4gKiBhbmltYXRpb24gc3RhdGVzLCBhbmQgcmV0dXJucyB0cnVlIGlmIHRoaXMgdHJhbnNpdGlvbiBzaG91bGQgb2NjdXIuIE5vdGUgdGhhdCAgXCJ0cnVlXCIgYW5kIFwiZmFsc2VcIlxuICogbWF0Y2ggMSBhbmQgMCwgcmVzcGVjdGl2ZWx5LiBBbiBleHByZXNzaW9uIGlzIGV2YWx1YXRlZCBlYWNoIHRpbWUgYSBzdGF0ZSBjaGFuZ2Ugb2NjdXJzIGluIHRoZVxuICogYW5pbWF0aW9uIHRyaWdnZXIgZWxlbWVudC5cbiAqIFRoZSBhbmltYXRpb24gc3RlcHMgcnVuIHdoZW4gdGhlIGV4cHJlc3Npb24gZXZhbHVhdGVzIHRvIHRydWUuXG4gKlxuICogLSBBIHN0YXRlLWNoYW5nZSBzdHJpbmcgdGFrZXMgdGhlIGZvcm0gXCJzdGF0ZTEgPT4gc3RhdGUyXCIsIHdoZXJlIGVhY2ggc2lkZSBpcyBhIGRlZmluZWQgYW5pbWF0aW9uXG4gKiBzdGF0ZSwgb3IgYW4gYXN0ZXJpeCAoKikgdG8gcmVmZXIgdG8gYSBkeW5hbWljIHN0YXJ0IG9yIGVuZCBzdGF0ZS5cbiAqICAgLSBUaGUgZXhwcmVzc2lvbiBzdHJpbmcgY2FuIGNvbnRhaW4gbXVsdGlwbGUgY29tbWEtc2VwYXJhdGVkIHN0YXRlbWVudHM7XG4gKiBmb3IgZXhhbXBsZSBcInN0YXRlMSA9PiBzdGF0ZTIsIHN0YXRlMyA9PiBzdGF0ZTRcIi5cbiAqICAgLSBTcGVjaWFsIHZhbHVlcyBgOmVudGVyYCBhbmQgYDpsZWF2ZWAgaW5pdGlhdGUgYSB0cmFuc2l0aW9uIG9uIHRoZSBlbnRyeSBhbmQgZXhpdCBzdGF0ZXMsXG4gKiBlcXVpdmFsZW50IHRvICBcInZvaWQgPT4gKlwiICBhbmQgXCIqID0+IHZvaWRcIi5cbiAqICAgLSBTcGVjaWFsIHZhbHVlcyBgOmluY3JlbWVudGAgYW5kIGA6ZGVjcmVtZW50YCBpbml0aWF0ZSBhIHRyYW5zaXRpb24gd2hlbiBhIG51bWVyaWMgdmFsdWUgaGFzXG4gKiBpbmNyZWFzZWQgb3IgZGVjcmVhc2VkIGluIHZhbHVlLlxuICogLSBBIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGVhY2ggdGltZSBhIHN0YXRlIGNoYW5nZSBvY2N1cnMgaW4gdGhlIGFuaW1hdGlvbiB0cmlnZ2VyIGVsZW1lbnQuXG4gKiBUaGUgYW5pbWF0aW9uIHN0ZXBzIHJ1biB3aGVuIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUuXG4gKlxuICogQHBhcmFtIHN0ZXBzIE9uZSBvciBtb3JlIGFuaW1hdGlvbiBvYmplY3RzLCBhcyByZXR1cm5lZCBieSB0aGUgYGFuaW1hdGUoKWAgb3JcbiAqIGBzZXF1ZW5jZSgpYCBmdW5jdGlvbiwgdGhhdCBmb3JtIGEgdHJhbnNmb3JtYXRpb24gZnJvbSBvbmUgc3RhdGUgdG8gYW5vdGhlci5cbiAqIEEgc2VxdWVuY2UgaXMgdXNlZCBieSBkZWZhdWx0IHdoZW4geW91IHBhc3MgYW4gYXJyYXkuXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBvcHRpb25zIG9iamVjdCB0aGF0IGNhbiBjb250YWluIGEgZGVsYXkgdmFsdWUgZm9yIHRoZSBzdGFydCBvZiB0aGUgYW5pbWF0aW9uLFxuICogYW5kIGFkZGl0aW9uYWwgZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycy4gUHJvdmlkZWQgdmFsdWVzIGZvciBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgYXJlIHVzZWRcbiAqIGFzIGRlZmF1bHRzLCBhbmQgb3ZlcnJpZGUgdmFsdWVzIGNhbiBiZSBwYXNzZWQgdG8gdGhlIGNhbGxlciBvbiBpbnZvY2F0aW9uLlxuICogQHJldHVybnMgQW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSB0cmFuc2l0aW9uIGRhdGEuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFRoZSB0ZW1wbGF0ZSBhc3NvY2lhdGVkIHdpdGggYSBjb21wb25lbnQgYmluZHMgYW4gYW5pbWF0aW9uIHRyaWdnZXIgdG8gYW4gZWxlbWVudC5cbiAqXG4gKiBgYGBIVE1MXG4gKiA8IS0tIHNvbWV3aGVyZSBpbnNpZGUgb2YgbXktY29tcG9uZW50LXRwbC5odG1sIC0tPlxuICogPGRpdiBbQG15QW5pbWF0aW9uVHJpZ2dlcl09XCJteVN0YXR1c0V4cFwiPi4uLjwvZGl2PlxuICogYGBgXG4gKlxuICogQWxsIHRyYW5zaXRpb25zIGFyZSBkZWZpbmVkIHdpdGhpbiBhbiBhbmltYXRpb24gdHJpZ2dlcixcbiAqIGFsb25nIHdpdGggbmFtZWQgc3RhdGVzIHRoYXQgdGhlIHRyYW5zaXRpb25zIGNoYW5nZSB0byBhbmQgZnJvbS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiB0cmlnZ2VyKFwibXlBbmltYXRpb25UcmlnZ2VyXCIsIFtcbiAqICAvLyBkZWZpbmUgc3RhdGVzXG4gKiAgc3RhdGUoXCJvblwiLCBzdHlsZSh7IGJhY2tncm91bmQ6IFwiZ3JlZW5cIiB9KSksXG4gKiAgc3RhdGUoXCJvZmZcIiwgc3R5bGUoeyBiYWNrZ3JvdW5kOiBcImdyZXlcIiB9KSksXG4gKiAgLi4uXVxuICogYGBgXG4gKlxuICogTm90ZSB0aGF0IHdoZW4geW91IGNhbGwgdGhlIGBzZXF1ZW5jZSgpYCBmdW5jdGlvbiB3aXRoaW4gYSBge0BsaW5rIGFuaW1hdGlvbnMvZ3JvdXAgZ3JvdXAoKX1gXG4gKiBvciBhIGB0cmFuc2l0aW9uKClgIGNhbGwsIGV4ZWN1dGlvbiBkb2VzIG5vdCBjb250aW51ZSB0byB0aGUgbmV4dCBpbnN0cnVjdGlvblxuICogdW50aWwgZWFjaCBvZiB0aGUgaW5uZXIgYW5pbWF0aW9uIHN0ZXBzIGhhdmUgY29tcGxldGVkLlxuICpcbiAqICMjIyBTeW50YXggZXhhbXBsZXNcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGVzIGRlZmluZSB0cmFuc2l0aW9ucyBiZXR3ZWVuIHRoZSB0d28gZGVmaW5lZCBzdGF0ZXMgKGFuZCBkZWZhdWx0IHN0YXRlcyksXG4gKiB1c2luZyB2YXJpb3VzIG9wdGlvbnM6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gVHJhbnNpdGlvbiBvY2N1cnMgd2hlbiB0aGUgc3RhdGUgdmFsdWVcbiAqIC8vIGJvdW5kIHRvIFwibXlBbmltYXRpb25UcmlnZ2VyXCIgY2hhbmdlcyBmcm9tIFwib25cIiB0byBcIm9mZlwiXG4gKiB0cmFuc2l0aW9uKFwib24gPT4gb2ZmXCIsIGFuaW1hdGUoNTAwKSlcbiAqIC8vIFJ1biB0aGUgc2FtZSBhbmltYXRpb24gZm9yIGJvdGggZGlyZWN0aW9uc1xuICogdHJhbnNpdGlvbihcIm9uIDw9PiBvZmZcIiwgYW5pbWF0ZSg1MDApKVxuICogLy8gRGVmaW5lIG11bHRpcGxlIHN0YXRlLWNoYW5nZSBwYWlycyBzZXBhcmF0ZWQgYnkgY29tbWFzXG4gKiB0cmFuc2l0aW9uKFwib24gPT4gb2ZmLCBvZmYgPT4gdm9pZFwiLCBhbmltYXRlKDUwMCkpXG4gKiBgYGBcbiAqXG4gKiAjIyMgU3BlY2lhbCB2YWx1ZXMgZm9yIHN0YXRlLWNoYW5nZSBleHByZXNzaW9uc1xuICpcbiAqIC0gQ2F0Y2gtYWxsIHN0YXRlIGNoYW5nZSBmb3Igd2hlbiBhbiBlbGVtZW50IGlzIGluc2VydGVkIGludG8gdGhlIHBhZ2UgYW5kIHRoZVxuICogZGVzdGluYXRpb24gc3RhdGUgaXMgdW5rbm93bjpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiB0cmFuc2l0aW9uKFwidm9pZCA9PiAqXCIsIFtcbiAqICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXG4gKiAgYW5pbWF0ZSg1MDApXG4gKiAgXSlcbiAqIGBgYFxuICpcbiAqIC0gQ2FwdHVyZSBhIHN0YXRlIGNoYW5nZSBiZXR3ZWVuIGFueSBzdGF0ZXM6XG4gKlxuICogIGB0cmFuc2l0aW9uKFwiKiA9PiAqXCIsIGFuaW1hdGUoXCIxcyAwc1wiKSlgXG4gKlxuICogLSBFbnRyeSBhbmQgZXhpdCB0cmFuc2l0aW9uczpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiB0cmFuc2l0aW9uKFwiOmVudGVyXCIsIFtcbiAqICAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxuICogICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxuICogICBdKSxcbiAqIHRyYW5zaXRpb24oXCI6bGVhdmVcIiwgW1xuICogICBhbmltYXRlKDUwMCwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICogICBdKVxuICogYGBgXG4gKlxuICogLSBVc2UgYDppbmNyZW1lbnRgIGFuZCBgOmRlY3JlbWVudGAgdG8gaW5pdGlhdGUgdHJhbnNpdGlvbnM6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdHJhbnNpdGlvbihcIjppbmNyZW1lbnRcIiwgZ3JvdXAoW1xuICogIHF1ZXJ5KCc6ZW50ZXInLCBbXG4gKiAgICAgc3R5bGUoeyBsZWZ0OiAnMTAwJScgfSksXG4gKiAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLW91dCcsIHN0eWxlKCcqJykpXG4gKiAgIF0pLFxuICogIHF1ZXJ5KCc6bGVhdmUnLCBbXG4gKiAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLW91dCcsIHN0eWxlKHsgbGVmdDogJy0xMDAlJyB9KSlcbiAqICBdKVxuICogXSkpXG4gKlxuICogdHJhbnNpdGlvbihcIjpkZWNyZW1lbnRcIiwgZ3JvdXAoW1xuICogIHF1ZXJ5KCc6ZW50ZXInLCBbXG4gKiAgICAgc3R5bGUoeyBsZWZ0OiAnMTAwJScgfSksXG4gKiAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLW91dCcsIHN0eWxlKCcqJykpXG4gKiAgIF0pLFxuICogIHF1ZXJ5KCc6bGVhdmUnLCBbXG4gKiAgICAgYW5pbWF0ZSgnMC41cyBlYXNlLW91dCcsIHN0eWxlKHsgbGVmdDogJy0xMDAlJyB9KSlcbiAqICBdKVxuICogXSkpXG4gKiBgYGBcbiAqXG4gKiAjIyMgU3RhdGUtY2hhbmdlIGZ1bmN0aW9uc1xuICpcbiAqIEhlcmUgaXMgYW4gZXhhbXBsZSBvZiBhIGBmcm9tU3RhdGVgIHNwZWNpZmllZCBhcyBhIHN0YXRlLWNoYW5nZSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYW5cbiAqIGFuaW1hdGlvbiB3aGVuIHRydWU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdHJhbnNpdGlvbigoZnJvbVN0YXRlLCB0b1N0YXRlKSA9PlxuICogIHtcbiAqICAgcmV0dXJuIGZyb21TdGF0ZSA9PSBcIm9mZlwiICYmIHRvU3RhdGUgPT0gXCJvblwiO1xuICogIH0sXG4gKiAgYW5pbWF0ZShcIjFzIDBzXCIpKVxuICogYGBgXG4gKlxuICogIyMjIEFuaW1hdGluZyB0byB0aGUgZmluYWwgc3RhdGVcbiAqXG4gKiBJZiB0aGUgZmluYWwgc3RlcCBpbiBhIHRyYW5zaXRpb24gaXMgYSBjYWxsIHRvIGBhbmltYXRlKClgIHRoYXQgdXNlcyBhIHRpbWluZyB2YWx1ZVxuICogd2l0aCBubyBzdHlsZSBkYXRhLCB0aGF0IHN0ZXAgaXMgYXV0b21hdGljYWxseSBjb25zaWRlcmVkIHRoZSBmaW5hbCBhbmltYXRpb24gYXJjLFxuICogZm9yIHRoZSBlbGVtZW50IHRvIHJlYWNoIHRoZSBmaW5hbCBzdGF0ZS4gQW5ndWxhciBhdXRvbWF0aWNhbGx5IGFkZHMgb3IgcmVtb3Zlc1xuICogQ1NTIHN0eWxlcyB0byBlbnN1cmUgdGhhdCB0aGUgZWxlbWVudCBpcyBpbiB0aGUgY29ycmVjdCBmaW5hbCBzdGF0ZS5cbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgZGVmaW5lcyBhIHRyYW5zaXRpb24gdGhhdCBzdGFydHMgYnkgaGlkaW5nIHRoZSBlbGVtZW50LFxuICogdGhlbiBtYWtlcyBzdXJlIHRoYXQgaXQgYW5pbWF0ZXMgcHJvcGVybHkgdG8gd2hhdGV2ZXIgc3RhdGUgaXMgY3VycmVudGx5IGFjdGl2ZSBmb3IgdHJpZ2dlcjpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiB0cmFuc2l0aW9uKFwidm9pZCA9PiAqXCIsIFtcbiAqICAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxuICogICBhbmltYXRlKDUwMClcbiAqICBdKVxuICogYGBgXG4gKiAjIyMgQm9vbGVhbiB2YWx1ZSBtYXRjaGluZ1xuICogSWYgYSB0cmlnZ2VyIGJpbmRpbmcgdmFsdWUgaXMgYSBCb29sZWFuLCBpdCBjYW4gYmUgbWF0Y2hlZCB1c2luZyBhIHRyYW5zaXRpb24gZXhwcmVzc2lvblxuICogdGhhdCBjb21wYXJlcyB0cnVlIGFuZCBmYWxzZSBvciAxIGFuZCAwLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGBcbiAqIC8vIGluIHRoZSB0ZW1wbGF0ZVxuICogPGRpdiBbQG9wZW5DbG9zZV09XCJvcGVuID8gdHJ1ZSA6IGZhbHNlXCI+Li4uPC9kaXY+XG4gKiAvLyBpbiB0aGUgY29tcG9uZW50IG1ldGFkYXRhXG4gKiB0cmlnZ2VyKCdvcGVuQ2xvc2UnLCBbXG4gKiAgIHN0YXRlKCd0cnVlJywgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXG4gKiAgIHN0YXRlKCdmYWxzZScsIHN0eWxlKHsgaGVpZ2h0OiAnMHB4JyB9KSksXG4gKiAgIHRyYW5zaXRpb24oJ2ZhbHNlIDw9PiB0cnVlJywgYW5pbWF0ZSg1MDApKVxuICogXSlcbiAqIGBgYFxuICoqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zaXRpb24oXG4gICAgc3RhdGVDaGFuZ2VFeHByOiBzdHJpbmcgfCAoKGZyb21TdGF0ZTogc3RyaW5nLCB0b1N0YXRlOiBzdHJpbmcsIGVsZW1lbnQ/OiBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcz86IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiBib29sZWFuKSxcbiAgICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGEgfCBBbmltYXRpb25NZXRhZGF0YVtdLFxuICAgIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnMgfCBudWxsID0gbnVsbCk6IEFuaW1hdGlvblRyYW5zaXRpb25NZXRhZGF0YSB7XG4gIHJldHVybiB7dHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlRyYW5zaXRpb24sIGV4cHI6IHN0YXRlQ2hhbmdlRXhwciwgYW5pbWF0aW9uOiBzdGVwcywgb3B0aW9uc307XG59XG5cbi8qKlxuICogUHJvZHVjZXMgYSByZXVzYWJsZSBhbmltYXRpb24gdGhhdCBjYW4gYmUgaW52b2tlZCBpbiBhbm90aGVyIGFuaW1hdGlvbiBvciBzZXF1ZW5jZSxcbiAqIGJ5IGNhbGxpbmcgdGhlIGB1c2VBbmltYXRpb24oKWAgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHN0ZXBzIE9uZSBvciBtb3JlIGFuaW1hdGlvbiBvYmplY3RzLCBhcyByZXR1cm5lZCBieSB0aGUgYGFuaW1hdGUoKWBcbiAqIG9yIGBzZXF1ZW5jZSgpYCBmdW5jdGlvbiwgdGhhdCBmb3JtIGEgdHJhbnNmb3JtYXRpb24gZnJvbSBvbmUgc3RhdGUgdG8gYW5vdGhlci5cbiAqIEEgc2VxdWVuY2UgaXMgdXNlZCBieSBkZWZhdWx0IHdoZW4geW91IHBhc3MgYW4gYXJyYXkuXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBvcHRpb25zIG9iamVjdCB0aGF0IGNhbiBjb250YWluIGEgZGVsYXkgdmFsdWUgZm9yIHRoZSBzdGFydCBvZiB0aGVcbiAqIGFuaW1hdGlvbiwgYW5kIGFkZGl0aW9uYWwgZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycy5cbiAqIFByb3ZpZGVkIHZhbHVlcyBmb3IgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGFyZSB1c2VkIGFzIGRlZmF1bHRzLFxuICogYW5kIG92ZXJyaWRlIHZhbHVlcyBjYW4gYmUgcGFzc2VkIHRvIHRoZSBjYWxsZXIgb24gaW52b2NhdGlvbi5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgYW5pbWF0aW9uIGRhdGEuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBkZWZpbmVzIGEgcmV1c2FibGUgYW5pbWF0aW9uLCBwcm92aWRpbmcgc29tZSBkZWZhdWx0IHBhcmFtZXRlclxuICogdmFsdWVzLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHZhciBmYWRlQW5pbWF0aW9uID0gYW5pbWF0aW9uKFtcbiAqICAgc3R5bGUoeyBvcGFjaXR5OiAne3sgc3RhcnQgfX0nIH0pLFxuICogICBhbmltYXRlKCd7eyB0aW1lIH19JyxcbiAqICAgc3R5bGUoeyBvcGFjaXR5OiAne3sgZW5kIH19J30pKVxuICogICBdLFxuICogICB7IHBhcmFtczogeyB0aW1lOiAnMTAwMG1zJywgc3RhcnQ6IDAsIGVuZDogMSB9fSk7XG4gKiBgYGBcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGludm9rZXMgdGhlIGRlZmluZWQgYW5pbWF0aW9uIHdpdGggYSBjYWxsIHRvIGB1c2VBbmltYXRpb24oKWAsXG4gKiBwYXNzaW5nIGluIG92ZXJyaWRlIHBhcmFtZXRlciB2YWx1ZXMuXG4gKlxuICogYGBganNcbiAqIHVzZUFuaW1hdGlvbihmYWRlQW5pbWF0aW9uLCB7XG4gKiAgIHBhcmFtczoge1xuICogICAgIHRpbWU6ICcycycsXG4gKiAgICAgc3RhcnQ6IDEsXG4gKiAgICAgZW5kOiAwXG4gKiAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBJZiBhbnkgb2YgdGhlIHBhc3NlZC1pbiBwYXJhbWV0ZXIgdmFsdWVzIGFyZSBtaXNzaW5nIGZyb20gdGhpcyBjYWxsLFxuICogdGhlIGRlZmF1bHQgdmFsdWVzIGFyZSB1c2VkLiBJZiBvbmUgb3IgbW9yZSBwYXJhbWV0ZXIgdmFsdWVzIGFyZSBtaXNzaW5nIGJlZm9yZSBhIHN0ZXAgaXNcbiAqIGFuaW1hdGVkLCBgdXNlQW5pbWF0aW9uKClgIHRocm93cyBhbiBlcnJvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGlvbihcbiAgICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGEgfCBBbmltYXRpb25NZXRhZGF0YVtdLFxuICAgIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnMgfCBudWxsID0gbnVsbCk6IEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhIHtcbiAgcmV0dXJuIHt0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuUmVmZXJlbmNlLCBhbmltYXRpb246IHN0ZXBzLCBvcHRpb25zfTtcbn1cblxuLyoqXG4gKiBFeGVjdXRlcyBhIHF1ZXJpZWQgaW5uZXIgYW5pbWF0aW9uIGVsZW1lbnQgd2l0aGluIGFuIGFuaW1hdGlvbiBzZXF1ZW5jZS5cbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBvcHRpb25zIG9iamVjdCB0aGF0IGNhbiBjb250YWluIGEgZGVsYXkgdmFsdWUgZm9yIHRoZSBzdGFydCBvZiB0aGVcbiAqIGFuaW1hdGlvbiwgYW5kIGFkZGl0aW9uYWwgb3ZlcnJpZGUgdmFsdWVzIGZvciBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzLlxuICogQHJldHVybiBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIGNoaWxkIGFuaW1hdGlvbiBkYXRhLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBFYWNoIHRpbWUgYW4gYW5pbWF0aW9uIGlzIHRyaWdnZXJlZCBpbiBBbmd1bGFyLCB0aGUgcGFyZW50IGFuaW1hdGlvblxuICogaGFzIHByaW9yaXR5IGFuZCBhbnkgY2hpbGQgYW5pbWF0aW9ucyBhcmUgYmxvY2tlZC4gSW4gb3JkZXJcbiAqIGZvciBhIGNoaWxkIGFuaW1hdGlvbiB0byBydW4sIHRoZSBwYXJlbnQgYW5pbWF0aW9uIG11c3QgcXVlcnkgZWFjaCBvZiB0aGUgZWxlbWVudHNcbiAqIGNvbnRhaW5pbmcgY2hpbGQgYW5pbWF0aW9ucywgYW5kIHJ1biB0aGVtIHVzaW5nIHRoaXMgZnVuY3Rpb24uXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgZmVhdHVyZSBkZXNpZ25lZCB0byBiZSB1c2VkIHdpdGggYHF1ZXJ5KClgIGFuZCBpdCB3aWxsIG9ubHkgd29ya1xuICogd2l0aCBhbmltYXRpb25zIHRoYXQgYXJlIGFzc2lnbmVkIHVzaW5nIHRoZSBBbmd1bGFyIGFuaW1hdGlvbiBsaWJyYXJ5LiBDU1Mga2V5ZnJhbWVzXG4gKiBhbmQgdHJhbnNpdGlvbnMgYXJlIG5vdCBoYW5kbGVkIGJ5IHRoaXMgQVBJLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0ZUNoaWxkKG9wdGlvbnM6IEFuaW1hdGVDaGlsZE9wdGlvbnMgfCBudWxsID0gbnVsbCk6XG4gICAgQW5pbWF0aW9uQW5pbWF0ZUNoaWxkTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5BbmltYXRlQ2hpbGQsIG9wdGlvbnN9O1xufVxuXG4vKipcbiAqIFN0YXJ0cyBhIHJldXNhYmxlIGFuaW1hdGlvbiB0aGF0IGlzIGNyZWF0ZWQgdXNpbmcgdGhlIGBhbmltYXRpb24oKWAgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIGFuaW1hdGlvbiBUaGUgcmV1c2FibGUgYW5pbWF0aW9uIHRvIHN0YXJ0LlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QgdGhhdCBjYW4gY29udGFpbiBhIGRlbGF5IHZhbHVlIGZvciB0aGUgc3RhcnQgb2YgXG4gKiB0aGUgYW5pbWF0aW9uLCBhbmQgYWRkaXRpb25hbCBvdmVycmlkZSB2YWx1ZXMgZm9yIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMuXG4gKiBAcmV0dXJuIEFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBhbmltYXRpb24gcGFyYW1ldGVycy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUFuaW1hdGlvbihcbiAgICBhbmltYXRpb246IEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhLFxuICAgIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnMgfCBudWxsID0gbnVsbCk6IEFuaW1hdGlvbkFuaW1hdGVSZWZNZXRhZGF0YSB7XG4gIHJldHVybiB7dHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLkFuaW1hdGVSZWYsIGFuaW1hdGlvbiwgb3B0aW9uc307XG59XG5cbi8qKlxuICogRmluZHMgb25lIG9yIG1vcmUgaW5uZXIgZWxlbWVudHMgd2l0aGluIHRoZSBjdXJyZW50IGVsZW1lbnQgdGhhdCBpc1xuICogYmVpbmcgYW5pbWF0ZWQgd2l0aGluIGEgc2VxdWVuY2UuIFVzZSB3aXRoIGBhbmltYXRlQ2hpbGQoKWAuXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yIFRoZSBlbGVtZW50IHRvIHF1ZXJ5LCBvciBhIHNldCBvZiBlbGVtZW50cyB0aGF0IGNvbnRhaW4gQW5ndWxhci1zcGVjaWZpY1xuICogY2hhcmFjdGVyaXN0aWNzLCBzcGVjaWZpZWQgd2l0aCBvbmUgb3IgbW9yZSBvZiB0aGUgZm9sbG93aW5nIHRva2Vucy5cbiAqICAtIGBxdWVyeShcIjplbnRlclwiKWAgb3IgYHF1ZXJ5KFwiOmxlYXZlXCIpYCA6IFF1ZXJ5IGZvciBuZXdseSBpbnNlcnRlZC9yZW1vdmVkIGVsZW1lbnRzLlxuICogIC0gYHF1ZXJ5KFwiOmFuaW1hdGluZ1wiKWAgOiBRdWVyeSBhbGwgY3VycmVudGx5IGFuaW1hdGluZyBlbGVtZW50cy5cbiAqICAtIGBxdWVyeShcIkB0cmlnZ2VyTmFtZVwiKWAgOiBRdWVyeSBlbGVtZW50cyB0aGF0IGNvbnRhaW4gYW4gYW5pbWF0aW9uIHRyaWdnZXIuXG4gKiAgLSBgcXVlcnkoXCJAKlwiKWAgOiBRdWVyeSBhbGwgZWxlbWVudHMgdGhhdCBjb250YWluIGFuIGFuaW1hdGlvbiB0cmlnZ2Vycy5cbiAqICAtIGBxdWVyeShcIjpzZWxmXCIpYCA6IEluY2x1ZGUgdGhlIGN1cnJlbnQgZWxlbWVudCBpbnRvIHRoZSBhbmltYXRpb24gc2VxdWVuY2UuXG4gKlxuICogQHBhcmFtIGFuaW1hdGlvbiBPbmUgb3IgbW9yZSBhbmltYXRpb24gc3RlcHMgdG8gYXBwbHkgdG8gdGhlIHF1ZXJpZWQgZWxlbWVudCBvciBlbGVtZW50cy5cbiAqIEFuIGFycmF5IGlzIHRyZWF0ZWQgYXMgYW4gYW5pbWF0aW9uIHNlcXVlbmNlLlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QuIFVzZSB0aGUgJ2xpbWl0JyBmaWVsZCB0byBsaW1pdCB0aGUgdG90YWwgbnVtYmVyIG9mXG4gKiBpdGVtcyB0byBjb2xsZWN0LlxuICogQHJldHVybiBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIHF1ZXJ5IGRhdGEuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFRva2VucyBjYW4gYmUgbWVyZ2VkIGludG8gYSBjb21iaW5lZCBxdWVyeSBzZWxlY3RvciBzdHJpbmcuIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICBxdWVyeSgnOnNlbGYsIC5yZWNvcmQ6ZW50ZXIsIC5yZWNvcmQ6bGVhdmUsIEBzdWJUcmlnZ2VyJywgWy4uLl0pXG4gKiBgYGBcbiAqXG4gKiBUaGUgYHF1ZXJ5KClgIGZ1bmN0aW9uIGNvbGxlY3RzIG11bHRpcGxlIGVsZW1lbnRzIGFuZCB3b3JrcyBpbnRlcm5hbGx5IGJ5IHVzaW5nXG4gKiBgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsYC4gVXNlIHRoZSBgbGltaXRgIGZpZWxkIG9mIGFuIG9wdGlvbnMgb2JqZWN0IHRvIGxpbWl0XG4gKiB0aGUgdG90YWwgbnVtYmVyIG9mIGl0ZW1zIHRvIGJlIGNvbGxlY3RlZC4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHF1ZXJ5KCdkaXYnLCBbXG4gKiAgIGFuaW1hdGUoLi4uKSxcbiAqICAgYW5pbWF0ZSguLi4pXG4gKiBdLCB7IGxpbWl0OiAxIH0pXG4gKiBgYGBcbiAqXG4gKiBCeSBkZWZhdWx0LCB0aHJvd3MgYW4gZXJyb3Igd2hlbiB6ZXJvIGl0ZW1zIGFyZSBmb3VuZC4gU2V0IHRoZVxuICogYG9wdGlvbmFsYCBmbGFnIHRvIGlnbm9yZSB0aGlzIGVycm9yLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogcXVlcnkoJy5zb21lLWVsZW1lbnQtdGhhdC1tYXktbm90LWJlLXRoZXJlJywgW1xuICogICBhbmltYXRlKC4uLiksXG4gKiAgIGFuaW1hdGUoLi4uKVxuICogXSwgeyBvcHRpb25hbDogdHJ1ZSB9KVxuICogYGBgXG4gKlxuICogIyMjIFVzYWdlIEV4YW1wbGVcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgcXVlcmllcyBmb3IgaW5uZXIgZWxlbWVudHMgYW5kIGFuaW1hdGVzIHRoZW1cbiAqIGluZGl2aWR1YWxseSB1c2luZyBgYW5pbWF0ZUNoaWxkKClgLiBcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdpbm5lcicsXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPGRpdiBbQHF1ZXJ5QW5pbWF0aW9uXT1cImV4cFwiPlxuICogICAgICAgPGgxPlRpdGxlPC9oMT5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gKiAgICAgICAgIEJsYWggYmxhaCBibGFoXG4gKiAgICAgICA8L2Rpdj5cbiAqICAgICA8L2Rpdj5cbiAqICAgYCxcbiAqICAgYW5pbWF0aW9uczogW1xuICogICAgdHJpZ2dlcigncXVlcnlBbmltYXRpb24nLCBbXG4gKiAgICAgIHRyYW5zaXRpb24oJyogPT4gZ29BbmltYXRlJywgW1xuICogICAgICAgIC8vIGhpZGUgdGhlIGlubmVyIGVsZW1lbnRzXG4gKiAgICAgICAgcXVlcnkoJ2gxJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAqICAgICAgICBxdWVyeSgnLmNvbnRlbnQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxuICpcbiAqICAgICAgICAvLyBhbmltYXRlIHRoZSBpbm5lciBlbGVtZW50cyBpbiwgb25lIGJ5IG9uZVxuICogICAgICAgIHF1ZXJ5KCdoMScsIGFuaW1hdGUoMTAwMCwgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSxcbiAqICAgICAgICBxdWVyeSgnLmNvbnRlbnQnLCBhbmltYXRlKDEwMDAsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXG4gKiAgICAgIF0pXG4gKiAgICBdKVxuICogIF1cbiAqIH0pXG4gKiBjbGFzcyBDbXAge1xuICogICBleHAgPSAnJztcbiAqXG4gKiAgIGdvQW5pbWF0ZSgpIHtcbiAqICAgICB0aGlzLmV4cCA9ICdnb0FuaW1hdGUnO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5KFxuICAgIHNlbGVjdG9yOiBzdHJpbmcsIGFuaW1hdGlvbjogQW5pbWF0aW9uTWV0YWRhdGEgfCBBbmltYXRpb25NZXRhZGF0YVtdLFxuICAgIG9wdGlvbnM6IEFuaW1hdGlvblF1ZXJ5T3B0aW9ucyB8IG51bGwgPSBudWxsKTogQW5pbWF0aW9uUXVlcnlNZXRhZGF0YSB7XG4gIHJldHVybiB7dHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlF1ZXJ5LCBzZWxlY3RvciwgYW5pbWF0aW9uLCBvcHRpb25zfTtcbn1cblxuLyoqXG4gKiBVc2Ugd2l0aGluIGFuIGFuaW1hdGlvbiBgcXVlcnkoKWAgY2FsbCB0byBpc3N1ZSBhIHRpbWluZyBnYXAgYWZ0ZXJcbiAqIGVhY2ggcXVlcmllZCBpdGVtIGlzIGFuaW1hdGVkLlxuICpcbiAqIEBwYXJhbSB0aW1pbmdzIEEgZGVsYXkgdmFsdWUuXG4gKiBAcGFyYW0gYW5pbWF0aW9uIE9uZSBvcmUgbW9yZSBhbmltYXRpb24gc3RlcHMuXG4gKiBAcmV0dXJucyBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIHN0YWdnZXIgZGF0YS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogSW4gdGhlIGZvbGxvd2luZyBleGFtcGxlLCBhIGNvbnRhaW5lciBlbGVtZW50IHdyYXBzIGEgbGlzdCBvZiBpdGVtcyBzdGFtcGVkIG91dFxuICogYnkgYW4gYG5nRm9yYC4gVGhlIGNvbnRhaW5lciBlbGVtZW50IGNvbnRhaW5zIGFuIGFuaW1hdGlvbiB0cmlnZ2VyIHRoYXQgd2lsbCBsYXRlciBiZSBzZXRcbiAqIHRvIHF1ZXJ5IGZvciBlYWNoIG9mIHRoZSBpbm5lciBpdGVtcy5cbiAqXG4gKiBFYWNoIHRpbWUgaXRlbXMgYXJlIGFkZGVkLCB0aGUgb3BhY2l0eSBmYWRlLWluIGFuaW1hdGlvbiBydW5zLFxuICogYW5kIGVhY2ggcmVtb3ZlZCBpdGVtIGlzIGZhZGVkIG91dC5cbiAqIFdoZW4gZWl0aGVyIG9mIHRoZXNlIGFuaW1hdGlvbnMgb2NjdXIsIHRoZSBzdGFnZ2VyIGVmZmVjdCBpc1xuICogYXBwbGllZCBhZnRlciBlYWNoIGl0ZW0ncyBhbmltYXRpb24gaXMgc3RhcnRlZC5cbiAqXG4gKiBgYGBodG1sXG4gKiA8IS0tIGxpc3QuY29tcG9uZW50Lmh0bWwgLS0+XG4gKiA8YnV0dG9uIChjbGljayk9XCJ0b2dnbGUoKVwiPlNob3cgLyBIaWRlIEl0ZW1zPC9idXR0b24+XG4gKiA8aHIgLz5cbiAqIDxkaXYgW0BsaXN0QW5pbWF0aW9uXT1cIml0ZW1zLmxlbmd0aFwiPlxuICogICA8ZGl2ICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCI+XG4gKiAgICAge3sgaXRlbSB9fVxuICogICA8L2Rpdj5cbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogSGVyZSBpcyB0aGUgY29tcG9uZW50IGNvZGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHt0cmlnZ2VyLCB0cmFuc2l0aW9uLCBzdHlsZSwgYW5pbWF0ZSwgcXVlcnksIHN0YWdnZXJ9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuICogQENvbXBvbmVudCh7XG4gKiAgIHRlbXBsYXRlVXJsOiAnbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gKiAgIGFuaW1hdGlvbnM6IFtcbiAqICAgICB0cmlnZ2VyKCdsaXN0QW5pbWF0aW9uJywgW1xuICogICAgIC4uLlxuICogICAgIF0pXG4gKiAgIF1cbiAqIH0pXG4gKiBjbGFzcyBMaXN0Q29tcG9uZW50IHtcbiAqICAgaXRlbXMgPSBbXTtcbiAqXG4gKiAgIHNob3dJdGVtcygpIHtcbiAqICAgICB0aGlzLml0ZW1zID0gWzAsMSwyLDMsNF07XG4gKiAgIH1cbiAqXG4gKiAgIGhpZGVJdGVtcygpIHtcbiAqICAgICB0aGlzLml0ZW1zID0gW107XG4gKiAgIH1cbiAqXG4gKiAgIHRvZ2dsZSgpIHtcbiAqICAgICB0aGlzLml0ZW1zLmxlbmd0aCA/IHRoaXMuaGlkZUl0ZW1zKCkgOiB0aGlzLnNob3dJdGVtcygpO1xuICogICAgfVxuICogIH1cbiAqIGBgYFxuICpcbiAqIEhlcmUgaXMgdGhlIGFuaW1hdGlvbiB0cmlnZ2VyIGNvZGU6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdHJpZ2dlcignbGlzdEFuaW1hdGlvbicsIFtcbiAqICAgdHJhbnNpdGlvbignKiA9PiAqJywgWyAvLyBlYWNoIHRpbWUgdGhlIGJpbmRpbmcgdmFsdWUgY2hhbmdlc1xuICogICAgIHF1ZXJ5KCc6bGVhdmUnLCBbXG4gKiAgICAgICBzdGFnZ2VyKDEwMCwgW1xuICogICAgICAgICBhbmltYXRlKCcwLjVzJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICogICAgICAgXSlcbiAqICAgICBdKSxcbiAqICAgICBxdWVyeSgnOmVudGVyJywgW1xuICogICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxuICogICAgICAgc3RhZ2dlcigxMDAsIFtcbiAqICAgICAgICAgYW5pbWF0ZSgnMC41cycsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcbiAqICAgICAgIF0pXG4gKiAgICAgXSlcbiAqICAgXSlcbiAqIF0pXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YWdnZXIoXG4gICAgdGltaW5nczogc3RyaW5nIHwgbnVtYmVyLFxuICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uTWV0YWRhdGEgfCBBbmltYXRpb25NZXRhZGF0YVtdKTogQW5pbWF0aW9uU3RhZ2dlck1ldGFkYXRhIHtcbiAgcmV0dXJuIHt0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuU3RhZ2dlciwgdGltaW5ncywgYW5pbWF0aW9ufTtcbn1cbiJdfQ==