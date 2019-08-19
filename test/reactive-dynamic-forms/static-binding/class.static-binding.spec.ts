import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElement} from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('class', () => {

        it('"class" prop length should be zero.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text" }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.class).toEqual([]);
            let element = getElement(options.nativeElement, "input");
            expect(element.classList.length).toEqual(1);
        }));

        it('"test-class" should be defined.', fakeAsync(() => {
            let options = inputProcessor({ uiBindings: ["firstName"], component: BindingComponent, serverData: [{ name: "firstName", type: "text", ui: {class:["test-class"]} }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.class).toEqual(["test-class"]);
            let element = getElement(options.nativeElement, "input");

            expect(element.classList[1]).toEqual("test-class");
        }));

        //end
    })

})