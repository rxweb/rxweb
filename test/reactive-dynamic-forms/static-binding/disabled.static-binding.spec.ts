import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElement} from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('disabled', () => {

        it('should not be disabled.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text", ui: { disabled: false } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.disabled).toBeFalsy();
            let element = getElement(options.nativeElement, "input");
            expect(element.disabled).toBeFalsy();
        }));

        it('should be disabled.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text", ui: { disabled: true } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.disabled).toBeTruthy();
            let element = getElement(options.nativeElement, "input");
            expect(element.disabled).toBeTruthy();
        }));

        //end
    })

})