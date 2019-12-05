import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common"
import { RxFocusDirective, RxPlaceholderDirective, RxSpinnerDirective, RxTextDirective } from '../directives'
@NgModule({
    declarations: [RxFocusDirective, RxPlaceholderDirective, RxSpinnerDirective, RxTextDirective ],
    imports: [CommonModule],
    providers: [],
    exports: [RxFocusDirective, RxPlaceholderDirective, RxSpinnerDirective, RxTextDirective ]
})
export class RxDirectivesModule {
    static forRoot(): ModuleWithProviders { return { ngModule: RxDirectivesModule, providers: [] }; }
}
