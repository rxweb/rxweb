import { CurrencyPipe, DatePipe, DecimalPipe, I18nPluralPipe, I18nSelectPipe, SlicePipe, LowerCasePipe, UpperCasePipe, PercentPipe, TitleCasePipe } from "@angular/common";

export const PIPE_CONFIG: { [key: string]: Function } = {
    'currency': CurrencyPipe,
    'date': DatePipe,
    'decimal': DecimalPipe,
    'i18nPlural': I18nPluralPipe,
    'i18nSelect': I18nSelectPipe,
    'slice': SlicePipe,
    'lowercase': LowerCasePipe,
    'uppercase': UpperCasePipe,
    'percent': PercentPipe,
    'titlecase': TitleCasePipe
}