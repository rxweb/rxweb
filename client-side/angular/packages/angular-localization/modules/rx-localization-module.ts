import { NgModule } from "@angular/core";
import { RxPlaceholderDirective } from '../directives/rx-placeholder.directive';
import { RxTextDirective } from '../directives/rx-text.directive'

@NgModule({
    declarations: [RxPlaceholderDirective,RxTextDirective],
    exports: [RxPlaceholderDirective, RxTextDirective],
})
export class RxLocalizationModule {

}
