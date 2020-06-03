import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElement} from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('readonly', () => {

        it('"readonly" prop, should be undefined.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text" }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.readonly).toBeFalsy();
            let element = getElement(options.nativeElement, "input");
            expect(element.readonly).toBeFalsy();
        }));

        it('"readonly" prop, should be undefined.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text", ui: { readonly: true } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.readonly).toBeTruthy();
            let element = getElement(options.nativeElement, "input");
            expect(element.readOnly).toBeTruthy();
        }));
        //end
    })

})