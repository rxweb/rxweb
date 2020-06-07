import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';

import { L10nTranslationModule, L10nIntlModule, L10nValidationModule } from 'angular-l10n';

@NgModule({
    declarations: [LazyComponent],
    imports: [
        CommonModule,
        LazyRoutingModule,
        L10nTranslationModule,
        // L10nIntlModule,
        // L10nValidationModule
    ]
})
export class LazyModule { }
