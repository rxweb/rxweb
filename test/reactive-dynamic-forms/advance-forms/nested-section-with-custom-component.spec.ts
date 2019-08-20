import { fakeAsync, tick} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElementsByClassName, getElement } from '../base/element-checker'



describe('FormControlConfig Properties', () => {

    describe('nested section-with-custom-component', () => {

        fit('Bind nested section with custom component', fakeAsync(() => {
            let dynamicFormConfiguration = {
                additionalConfig: [
                    {
                        type: "#addressSection",
                        name: 'addressSection',
                        ui: { text: 'Address' },
                        childrens: ["address.name"],
                        skipDefaultView: true,
                    }
                ]
            }
            let options = inputProcessor({
                uiBindings: ["addressSection"], dynamicFormConfiguration: dynamicFormConfiguration, component: BindingComponent, serverData: [{name: 'address.name',type: 'text'}], tagName: 'input' })
            
            let elements = getElementsByClassName(options.nativeElement, "card-header");
            expect(elements[0].innerText).toEqual("Address");
            let element = getElement(options.nativeElement, "input");
            tick(100);
            expect(element).toBeTruthy();
        }));

        //end
    })

})