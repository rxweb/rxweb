import {NgModule, ModuleWithProviders,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {CommonModule, CurrencyPipe, DecimalPipe  } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {RxCoreModule, RegularExpression } from "../core";

import {RxPlaceholderDirective, RxTabindexDirective,
    RxCurrencyDirective, RxDecimalDirective ,
    RxFocusDirective, RxControlIndexDirective,
    RxMaskDirective,
    RxDateComponent,
    RxPickerComponent,
    RxDatePickerComponent,
    RxMonthPicker,
    RxTimeComponent, RxTagComponent, RxMessageComponent, RxMessageDirective,
    RxSelectComponent, RxDirtyDirective
} from './forms'
import { RxHttp } from "../http";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [RxPlaceholderDirective, RxTabindexDirective,
        RxFocusDirective, RxControlIndexDirective, RxMaskDirective
        , RxCurrencyDirective, RxDecimalDirective, RxDateComponent,
        RxPickerComponent,
        RxDatePickerComponent,
        RxMonthPicker,
      RxTimeComponent, RxTagComponent, RxMessageComponent, RxMessageDirective,
      RxSelectComponent, RxDirtyDirective
    ],
    exports: [RxPlaceholderDirective, RxTabindexDirective,
        RxCurrencyDirective, RxDecimalDirective, RxFocusDirective, RxControlIndexDirective,
        RxMaskDirective,
        RxDateComponent,
        RxPickerComponent,
        RxDatePickerComponent,
        RxMonthPicker,
      RxTimeComponent, RxTagComponent, RxMessageDirective, RxSelectComponent, RxDirtyDirective
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpModule],
    providers: [CurrencyPipe, DecimalPipe, RegularExpression
      , { provide: RxHttp, useClass: RxHttp }
    ],
    entryComponents: [RxMessageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RxFormsModule {
    static forRoot(): ModuleWithProviders { return { ngModule: RxFormsModule, providers: [] }; }
}
