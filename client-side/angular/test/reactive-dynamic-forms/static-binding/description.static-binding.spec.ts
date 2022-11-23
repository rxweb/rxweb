import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { elementAttributeCheck, notFoundElementByTagName, getElement} from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('description', () => {

        it('description should be undefined.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text" }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.description).toBeUndefined();
            expect(notFoundElementByTagName(options.nativeElement, "small")).toBeTruthy();
        }));

        it('description text should be "First Name".', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text", ui: {description:'Enter your First Name'} }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.description).toEqual('Enter your First Name');
            expect(elementAttributeCheck(getElement(options.nativeElement, "small"), "innerText",'Enter your First Name')).toBeTruthy();
        }));

        //end
    })

})