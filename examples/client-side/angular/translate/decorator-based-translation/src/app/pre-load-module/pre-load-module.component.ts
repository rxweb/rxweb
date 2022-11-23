import { Component, NgModule } from '@angular/core';
import { translate } from '@rxweb/translate';
import { RouterModule } from '@angular/router';

@Component({
    templateUrl: './pre-load-module.component.html',
})
export class PreLoadModuleComponent {
    @translate() global: any;

}


@NgModule({
    declarations: [PreLoadModuleComponent],
    imports: [RouterModule.forChild([{ path: '', component: PreLoadModuleComponent }])],
})
export class PreLoadModule { }
