import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule} from '@angular/router';

import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import {  RxRoutingModule} from "@rxweb/angular-router"

import { CommonModule } from '@angular/common';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';


@NgModule({
    declarations: [DashboardComponent],
    imports: [FormsModule, ReactiveFormsModule, RxReactiveFormsModule,
        RouterModule.forChild(DASHBOARD_ROUTES), RxRoutingModule, CommonModule
    ],
    exports: [RouterModule]
})
export class DashboardModule { }