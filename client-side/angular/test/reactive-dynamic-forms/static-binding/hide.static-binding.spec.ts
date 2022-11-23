import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElement} from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('hide', () => {

        it('"hide" prop, should be false.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text" }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.hide).toBeFalsy();
            let element = getElement(options.nativeElement, "input");
            expect(element.style.display).toBeFalsy();
        }));

        it('"hide" prop, should be true.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text", ui: { hide: true } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.hide).toBeTruthy();
            let element = getElement(options.nativeElement, "input");
            expect(element.parentElement.style.display).toEqual("none");
        }));

        //end
    })

})