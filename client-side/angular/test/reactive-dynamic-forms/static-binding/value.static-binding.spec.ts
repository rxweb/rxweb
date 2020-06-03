import { fakeAsync, tick} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElementValue, getElements } from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('value', () => {

       it('value should be undefined.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text" }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value).toBeUndefined();
            let elementValue = getElementValue(options.nativeElement, "input");
            expect(elementValue == "").toBeTruthy();
        }));

        it('value should be "Bharat".', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text", value: "Bharat" }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value).toEqual("Bharat");
            let elementValue = getElementValue(options.nativeElement, "input");
            expect(elementValue == "Bharat").toBeTruthy();
        }));

        it('should checked value', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["hobbies"], component: BindingComponent, serverData: [{ name: "hobbies", type: "checkbox",value:1, source: [{ value: 1, text: 'Chess' }, {value:2,text:'Cricket'}] }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.hobbies.value).toEqual(1);
            let elements = getElements(options.nativeElement, "input");
            
            expect(elements[0].checked).toBeTruthy();
            expect(elements[1].checked).toBeFalsy();

        }));

        it('should checked all values', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["hobbies"], component: BindingComponent, serverData: [{ name: "hobbies", type: "checkbox", value: [1, 2], multiselect: true, source: [{ value: 1, text: 'Chess' }, { value: 2, text: 'Cricket' }] }], tagName: 'input' })
            tick(100); 
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.hobbies.value).toEqual([1,2]);
            let elements = getElements(options.nativeElement, "input");
            
            expect(elements[0].checked).toBeTruthy();
            expect(elements[1].checked).toBeTruthy();

        }));

        //end
    })

})