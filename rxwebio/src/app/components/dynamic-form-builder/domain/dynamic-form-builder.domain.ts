import { RxFormBuilder } from "@rxweb/reactive-form-validators";
import { ComponentFactoryResolver } from "@angular/core";
import { RxToast, RxPopup } from "@rx/view";
import { FormBuilder } from "@angular/forms";

export class DynamicFormBuilderDomain {
    pascalCase(value){
        return value.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();})
    }
}
