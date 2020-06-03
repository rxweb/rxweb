import { fakeAsync } from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import {  getElement } from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('additional-config', () => {

        it('bind  element additional attribute through addition config.', fakeAsync(() => {
            let options = inputProcessor({
                uiBindings: ["rating"], component: BindingComponent, serverData: [{ name: "rating", type: "range", additionalConfig: { prop: { min: 0, max: 3, step: 1 } } }], tagName: 'input'
            })
            let element = getElement(options.nativeElement, "input");
            expect(element.min).toEqual('0');
            expect(element.max).toEqual('3');
            expect(element.step).toEqual('1');
        }));

        it('bind  element additional attribute through addition config with custom props.', fakeAsync(() => {
            let options = inputProcessor({
                uiBindings: ["rating"], component: BindingComponent, serverData: [{
                    name: "rating", type: "range", props: { min: 0, max: 3, step: 1 }, additionalConfig: { prop: { min: ":props.min",max:":props.max",step:":props.step"} }
                }], tagName: 'input'
            })
            let element = getElement(options.nativeElement, "input");
            expect(element.min).toEqual('0');
            expect(element.max).toEqual('3');
            expect(element.step).toEqual('1');
        }));

        

        //end
    })

})