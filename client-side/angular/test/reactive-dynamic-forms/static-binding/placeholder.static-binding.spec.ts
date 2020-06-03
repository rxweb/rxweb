import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElement} from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('placeholder', () => {

        it('placeholder should be undefined.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text" }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.placeholder).toBeUndefined();
            let element = getElement(options.nativeElement, "input");
            expect(element.placeholder).toBeFalsy();
        }));

        it('placeholder text should be "Enter Your First Name".', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text", ui: { placeholder: "Enter Your First Name"} }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.placeholder).toEqual("Enter Your First Name");
            let element = getElement(options.nativeElement, "input");
            expect(element.placeholder).toEqual("Enter Your First Name");
        }));

        //end
    })

})