import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { elementAttributeCheck, notFoundElementByTagName, getElement} from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('label', () => {

        it('label should be undefined.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text" }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.label).toBeUndefined();
            expect(notFoundElementByTagName(options.nativeElement, "label")).toBeTruthy();
        }));

        it('label text should be "First Name".', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text", ui: {label:'First Name'} }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.label).toEqual('First Name');
            expect(elementAttributeCheck(getElement(options.nativeElement, "label"),"innerText",'First Name')).toBeTruthy();
        }));

        //end
    })

})