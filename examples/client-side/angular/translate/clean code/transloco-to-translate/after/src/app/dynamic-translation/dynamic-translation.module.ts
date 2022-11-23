import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxTranslateModule } from '@rxweb/translate';

import { DynamicTranslationRoutingModule } from './dynamic-translation-routing.module';
import { DynamicTranslationComponent } from './dynamic-translation/dynamic-translation.component';

@NgModule({
    declarations: [DynamicTranslationComponent],
    imports: [CommonModule, DynamicTranslationRoutingModule, RxTranslateModule],
})
export class DynamicTranslationModule {
}
