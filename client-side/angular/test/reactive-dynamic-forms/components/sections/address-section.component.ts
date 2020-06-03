import { Component } from "@angular/core"
import { dynamicComponent, AbstractControlConfig } from "@rxweb/reactive-dynamic-forms"

@dynamicComponent("addressSection")
@Component({
    template: `
        <div>
<div class="card" >
<div class="card-header" >{{controlConfig.config.ui.text}}</div>
<div class="card-body">
 <form>
    <div viewMode="basic" [rxwebDynamicForm]="dynamicFormBuildConfig" [uiBindings]="controlConfig.config.childrens">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
</div>
    `
})
export class AddressSectionComponent extends AbstractControlConfig {

}