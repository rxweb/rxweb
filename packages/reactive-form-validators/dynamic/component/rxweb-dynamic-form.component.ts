import { Input,Component,QueryList } from "@angular/core"
import { ControlTemplateDirective } from '../directives/control-template.directive';

@Component({
    selector:'rxweb-dynamic-form',
    template: `
     <div class="{{formRow}}" *ngFor="let row of uiBindings">
        <rxweb-control *ngFor="let name of row.cols" [viewMode]="viewMode" [name]="name" [controlTemplates]="controlTemplates" [controlsConfig]="controlsConfig"></rxweb-control>
     </div>        
`
})
export class RxwebDynamicFormComponent {
    private uiBindings: string[];
    private _controlTemplates: QueryList<ControlTemplateDirective>
    private _viewMode: string;
    private formRow: string;
    private isChangedMode: boolean = false;
    @Input() uiFramework: string;
    @Input() set viewMode(value: string) {
        this.isChangedMode = this.viewMode && this.viewMode != value;
        this._viewMode = value;
        this.formRow = value == "bootstrap-advance" ? 'form-row' : '';
        if (this.isChangedMode)
            this.uiBindings = this.designRows(this.bindings);

    }
    get viewMode() {
        return this._viewMode;
    }
    @Input() controlsConfig: any;

    @Input() bindings:string[]

    @Input() set controlTemplates(value: QueryList<ControlTemplateDirective>) {
        this.uiBindings = this.designRows(this.bindings);
        this._controlTemplates = value;
    }
    get controlTemplates() {
        return this._controlTemplates;
    }

    designRows(bindings: string[]) {
        let rows = [];
        for (var item of bindings) {
            let jObject = { cols: [] };
            if (Array.isArray(item)) {
                for (var text of item) {
                    if (this.viewMode == "bootstrap-advance")
                        jObject.cols.push(text);
                    else
                        rows.push({ cols: [text] });
                }
            } else
            {
                jObject.cols.push(item);
            }
            rows.push(jObject);
        }
        return rows;
    }
}