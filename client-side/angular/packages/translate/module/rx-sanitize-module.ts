import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, I18nPluralPipe, I18nSelectPipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    providers: [CurrencyPipe, DatePipe, DecimalPipe, I18nPluralPipe, I18nSelectPipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe],
})
export class RxTranslateSanitizeModule {
}