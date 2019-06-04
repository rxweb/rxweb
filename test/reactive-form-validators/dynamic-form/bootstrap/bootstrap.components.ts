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
    template: `<input type='color' [rxwebError]="formControl.errorMessage" [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl" />
                <span [rxwebError]="formControl.errorMessage" ></span>
            `
})
export class BootstrapInputColorComponent extends AbstractDynamicControl { }

@Component({
    template: `<input type='date' [rxwebError]="formControl.errorMessage" [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl" />
                <span [rxwebError]="formControl.errorMessage" ></span>
            `
})
export class BootstrapInputDateComponent extends AbstractDynamicControl { }

@Component({
    template: `<input type='email' [rxwebError]="formControl.errorMessage" [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl" />
                <span [rxwebError]="formControl.errorMessage" ></span>
            `
})
export class BootstrapInputEmailComponent extends AbstractDynamicControl { }

@Component({
    template: `<input type='password' [rxwebError]="formControl.errorMessage" [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl" />
                <span [rxwebError]="formControl.errorMessage" ></span>
            `
})
export class BootstrapInputPasswordComponent extends AbstractDynamicControl { }

@Component({
    template: `<input type='url' [rxwebError]="formControl.errorMessage" [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl" />
                <span [rxwebError]="formControl.errorMessage" ></span>
            `
})
export class BootstrapInputUrlComponent extends AbstractDynamicControl { }



@Component({
    template: `
    <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text">{{controlConfig.prependText.left}}</div>
        </div>
      <input type='text' [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl"/>
      <span [rxwebError]="formControl.errorMessage" ></span>
      </div>
`
})
export class BootstrapPrependLeftInputComponent extends AbstractDynamicControl { }



@Component({
    template: ` <select class="form-control" [formControl]="formControl">
        <option hideIfNoValue="placeholder" [rxwebAction]="['placeholder']" value="null"></option>
        <option *ngFor="let item of controlConfig.source" [value]="item[controlConfig.config.valuePropName || 'value']">{{item[controlConfig.config.textPropName || 'key']}}</option>
    </select>
    <span [rxwebError]="formControl.errorMessage" ></span>
`
})
export class BootstrapSelectComponent extends AbstractDynamicControl { }

@Component({
    template: `<textarea [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl"></textarea>
                <span [rxwebError]="formControl.errorMessage" ></span>
`
})
export class BootstrapTextareaComponent extends AbstractDynamicControl { }

@Component({
    template: `<input type="file" [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl"/>
                <span [rxwebError]="formControl.errorMessage" ></span>
`
})
export class BootstrapFileComponent extends AbstractDynamicControl { }

@Component({
    template: `<input type="range" [rxwebAction]="['placeholder','focus','readonly','cssClassNames']" [formControl]="formControl"/>
               <span [rxwebError]="formControl.errorMessage" ></span>
`
})
export class BootstrapRangeComponent extends AbstractDynamicControl { }

@Component({
    template: `<div [rxwebAction]="['checkBoxAndRadioControlRootElement']" >
                  <input [rxwebAction]="['focus','readonly','cssClassNames']" [formControl]="formControl" type="checkbox" [value]="controlConfig.config[controlConfig.config.valuePropName || 'value']" />
                  <label [rxwebAction]="['checkboxAndRadioControlLabel']">
                    {{controlConfig.config[controlConfig.config.textPropName || 'key']}}
                  </label>
              </div>
            <span [rxwebError]="formControl.errorMessage" ></span>
`
})
export class BootstrapCheckboxComponent extends AbstractDynamicControl { }

@Component({
    template: `<div [rxwebAction]="['checkBoxAndRadioControlRootElement']" *ngFor="let item of controlConfig.source">
                  <input [rxwebAction]="['focus','readonly','cssClassNames']" [formControl]="formControl" type="checkbox" [value]="item[controlConfig.config.valuePropName || 'value']" [checked]="item.checked" />
                  <label [rxwebAction]="['checkboxAndRadioControlLabel']">
                    {{item[controlConfig.config.textPropName || 'key']}}
                  </label>
              </div>
            <span [rxwebError]="formControl.errorMessage" ></span>
`
})
export class BootstrapCheckboxListComponent extends AbstractDynamicControl { }

@Component({
    template: `<div  [rxwebAction]="['checkBoxAndRadioControlRootElement']" *ngFor="let item of controlConfig.source">
                  <input  [rxwebAction]="['focus','readonly','cssClassNames']" [formControl]="formControl" type="radio" [value]="item[controlConfig.config.valuePropName || 'value']" />
                  <label [rxwebAction]="['checkboxAndRadioControlLabel']" >{{item[controlConfig.config.textPropName || 'key']}}</label>
              </div>
                <span [rxwebError]="formControl.errorMessage" ></span>
`
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
      <small hideIfNoValue="description" [rxwebAction]="['description']"></small>
    </div>
  </div>        
`
})
export class BootstrapHorizontalLayoutComponent extends AbstractDynamicControl { }

@Component({
    selector:"rxweb-section",
    template: `
        <form [rxDynamicForm]="{formGroup:sectionConfig.formGroup,controlsConfig:sectionConfig.controlsConfig}">
                    <rxweb-dynamic-form [sectionsConfig]="sectionConfig.sectionsConfig" [viewMode]="sectionConfig.viewMode" [controlsConfig]="sectionConfig.controlsConfig" [bindings]="sectionConfig.uiBindings"></rxweb-dynamic-form>
        </form>
`
})
export class SectionComponent extends AbstractDynamicControl { }

@NgModule({
    declarations: [BootstrapInputComponent, BootstrapPrependLeftInputComponent,
        BootstrapSelectComponent,
        BootstrapTextareaComponent,
        BootstrapFileComponent,
        BootstrapRangeComponent,
        BootstrapCheckboxComponent,
        BootstrapRadioButtonComponent,
        BootstrapBasicLayoutComponent,
        BootstrapHorizontalLayoutComponent, SectionComponent, BootstrapInputColorComponent, BootstrapInputDateComponent, BootstrapInputEmailComponent, BootstrapInputPasswordComponent, BootstrapInputUrlComponent, BootstrapCheckboxListComponent ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RxDynamicReactiveFormsModule, RxReactiveFormsModule],
    providers: [],
    exports: [BootstrapInputComponent, BootstrapPrependLeftInputComponent,
        BootstrapSelectComponent,
        BootstrapTextareaComponent,
        BootstrapFileComponent,
        BootstrapRangeComponent,
        BootstrapCheckboxComponent,
        BootstrapRadioButtonComponent,
        BootstrapBasicLayoutComponent,
        BootstrapHorizontalLayoutComponent, SectionComponent, BootstrapInputColorComponent, BootstrapInputDateComponent, BootstrapInputEmailComponent, BootstrapInputPasswordComponent, BootstrapInputUrlComponent, BootstrapCheckboxListComponent ],
    entryComponents: [
        DynamicReactiveFormConfig.registerComponent({
            'file': { component: BootstrapFileComponent },
            'color': { component: BootstrapInputColorComponent },
            'date': { component: BootstrapInputDateComponent },
            'email': { component: BootstrapInputEmailComponent },
            'password': { component: BootstrapInputPasswordComponent },
            'url': { component: BootstrapInputUrlComponent },
            'prepend-left-textbox': { component: BootstrapPrependLeftInputComponent },
            "bootstrap-horizontal": { component: BootstrapHorizontalLayoutComponent },
            "checkbox": { component: BootstrapCheckboxComponent },
            "bootstrap-basic": { component: BootstrapBasicLayoutComponent },
            "bootstrap-advance": { component: BootstrapBasicLayoutComponent },
            'textbox': { component: BootstrapInputComponent },
            'select': { component: BootstrapSelectComponent },
            'section': { component: SectionComponent },
            'textarea': { component: BootstrapTextareaComponent },
            "range": { component: BootstrapRangeComponent },
            "checkbox-list": { component: BootstrapCheckboxListComponent }
        })
    ]
})
export class RxwebBootstrapModule {
    static forRoot(): ModuleWithProviders { return { ngModule: RxwebBootstrapModule, providers: [] }; }
}