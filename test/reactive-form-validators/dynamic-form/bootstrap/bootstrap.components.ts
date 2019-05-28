import { Component, NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AbstractDynamicControl, RxDynamicReactiveFormsModule, RxReactiveFormsModule, DynamicReactiveFormConfig } from "@rxweb/reactive-form-validators";

@Component({
    template: `<input type='text' [rxwebError]="formControl.errorMessage" [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl" />
                <span [rxwebError]="formControl.errorMessage" ></span>
            `
})
export class BootstrapInputComponent extends AbstractDynamicControl { }

@Component({
    template: `
    <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">{{controlConfig.prependText.left}}</div>
        </div>
      <input type='text' [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl"/>
      </div>
`
})
export class BootstrapPrependInputComponent extends AbstractDynamicControl { }

@Component({
    template: ` <select class="form-control" [formControl]="formControl">
      <option *ngFor="let item of controlConfig.source" [value]="item.value">{{item.key}}</option>
    </select>'`
})
export class BootstrapSelectComponent extends AbstractDynamicControl { }

@Component({
    template: `<textarea [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl"></textarea>`
})
export class BootstrapTextareaComponent extends AbstractDynamicControl { }

@Component({
    template: `<input type="file" [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl"/>`
})
export class BootstrapFileComponent extends AbstractDynamicControl { }

@Component({
    template: `<input type="range" [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl"/>`
})
export class BootstrapRangeComponent extends AbstractDynamicControl { }

@Component({
    template: `<div [rxwebAction]="['checkBoxAndRadioControlRootElement']" *ngFor="let item of controlConfig.source">
                  <input [rxwebAction]="['focus','readonly','cssClassNames']" [formControl]="formControl" type="checkbox" [value]="item.key" />
                  <label [rxwebAction]="['checkboxAndRadioControlLabel']">
                    {{item.text}}
                  </label>
              </div>`
})
export class BootstrapCheckboxComponent extends AbstractDynamicControl { }

@Component({
    template: `<div  [rxwebAction]="['checkBoxAndRadioControlRootElement']" *ngFor="let item of controlConfig.source">
                  <input  [rxwebAction]="['focus','readonly','cssClassNames']" [formControl]="formControl" type="radio" [value]="item.key" />
                  <label [rxwebAction]="['checkboxAndRadioControlLabel']" >{{item.text}}</label>
              </div>`
})
export class BootstrapRadioButtonComponent extends AbstractDynamicControl { }


@Component({
    template: `
      <div  [rxwebAction]="['group']">
        <label hideIfNoValue="label" [rxwebAction]="['label']"></label>
        <rxweb-control [controlsConfig]="controlsConfig" [controlTemplates]="controlTemplates" [formControlConfig]="controlConfig" [name]="controlConfig.config.type"></rxweb-control>
        <small hideIfNoValue="description" [rxwebAction]="['description']"></small>
      </div>
`
})
export class BootstrapBasicLayoutComponent extends AbstractDynamicControl {

}

@Component({
    template: `
     <div class="form-group row">
    <label  [rxwebAction]="['label']" ></label>
    <div [rxwebAction]="['formGrid.control']">
      <rxweb-control [controlsConfig]="controlsConfig" [controlTemplates]="controlTemplates" [formControlConfig]="controlConfig" [name]="controlConfig.config.type"></rxweb-control>
    </div>
  </div>        
`
})
export class BootstrapHorizontalLayoutComponent extends AbstractDynamicControl { }

@NgModule({
    declarations: [BootstrapInputComponent, BootstrapPrependInputComponent,
        BootstrapSelectComponent,
        BootstrapTextareaComponent,
        BootstrapFileComponent,
        BootstrapRangeComponent,
        BootstrapCheckboxComponent,
        BootstrapRadioButtonComponent,
        BootstrapBasicLayoutComponent,
        BootstrapHorizontalLayoutComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RxDynamicReactiveFormsModule,RxReactiveFormsModule],
    providers: [],
    exports: [BootstrapInputComponent, BootstrapPrependInputComponent,
        BootstrapSelectComponent,
        BootstrapTextareaComponent,
        BootstrapFileComponent,
        BootstrapRangeComponent,
        BootstrapCheckboxComponent,
        BootstrapRadioButtonComponent,
        BootstrapBasicLayoutComponent,
        BootstrapHorizontalLayoutComponent],
    entryComponents: [
        DynamicReactiveFormConfig.registerComponent({ 'prependTextbox': { component: BootstrapPrependInputComponent }, "bootstrap-horizontal": { component: BootstrapHorizontalLayoutComponent }, "checkbox": { component: BootstrapCheckboxComponent }, "bootstrap-basic": { component: BootstrapBasicLayoutComponent }, "bootstrap-advance": { component: BootstrapBasicLayoutComponent },'textbox': { component: BootstrapInputComponent }})

    ]
})
export class RxwebBootstrapModule {
    static forRoot(): ModuleWithProviders { return { ngModule: RxwebBootstrapModule, providers: [] }; }
}