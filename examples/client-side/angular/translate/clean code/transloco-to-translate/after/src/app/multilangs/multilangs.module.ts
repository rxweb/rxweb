import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultilangsRoutingModule } from './multilangs-routing.module';
import { MultilangsComponent } from './multilangs.component';
import { RxTranslateModule } from '@rxweb/translate';
import { ProviderLangComponent } from './provider-lang/provider-lang.component';

@NgModule({
    declarations: [MultilangsComponent, ProviderLangComponent],
    imports: [
        CommonModule,
        RxTranslateModule,
        MultilangsRoutingModule
    ]
})
export class MultilangsModule {
}
