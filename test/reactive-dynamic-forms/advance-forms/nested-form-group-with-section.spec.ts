import { fakeAsync, tick} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { getElementsByClassName, getElement } from '../base/element-checker'

describe('FormControlConfig Properties', () => {

    describe('nested section', () => {

        it('Bind nested formgroup in nested section', fakeAsync(() => {
            let dynamicFormConfiguration = {
                additionalConfig: [
                    {
                        type: 'card',
                        name: 'addressSection',
                        childrens: [{ type: 'card-header', ui: { text: 'Address' } }, { type: 'card-body', childrens: ['address.name'] }],
                        skipDefaultView: true
                    }]
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