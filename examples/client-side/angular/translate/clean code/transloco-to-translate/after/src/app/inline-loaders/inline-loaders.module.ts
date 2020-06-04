import { NgModule } from '@angular/core';

import { InlineLoadersRoutingModule } from './inline-loaders-routing.module';
import { InlineComponent } from './inline/inline.component';
import { RxTranslateModule } from "@rxweb/translate"


@NgModule({
    declarations: [InlineComponent],
    imports: [InlineLoadersRoutingModule, RxTranslateModule]
})
export class InlineLoadersModule {}
