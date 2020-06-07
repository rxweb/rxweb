import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';

import { RxTranslateModule } from "@rxweb/translate"
@NgModule({
    declarations: [LazyComponent],
    imports: [
        CommonModule,
        LazyRoutingModule,
        RxTranslateModule
    ]
})
export class LazyModule { }
