import { Component, AfterContentInit,Input} from "@angular/core"
import { HtmlControlTemplateDirective } from '../directives/html-control-template.directive';
import { RxwebDynamicFormComponent } from './rx-web-dynamic-form.component';

@Component({
  template:`<ng-template [controlHost]="{templateRef:control.templateRef, data:data, $implicit: data}">
            </ng-template>`,
  selector:'rxweb-control'
})
export class RxwebControlComponent implements AfterContentInit {

    @Input() type:string;

    @Input() dynamicForm:RxwebDynamicFormComponent;

    @Input() data:any;

    private control:any

    


  ngAfterContentInit() {
    if(this.dynamicForm && this.dynamicForm.htmlControlTemplates){
       let htmlControl = this.dynamicForm.htmlControlTemplates.filter(t=> t.type == this.type)[0]
       if(htmlControl)
          this.control = htmlControl;
    }
  }

  
}

