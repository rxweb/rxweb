export * from './module/translate.module'
export * from './services/translate.service';
export * from './pipes/translate.pipe';
export * from './services/request.state';
export {
    DefaultLangChangeEvent, DEFAULT_LANGUAGE, FakeMissingTranslationHandler, LangChangeEvent,
    MissingTranslationHandler, MissingTranslationHandlerParams, TranslateCompiler, TranslateDefaultParser,
    TranslateFakeCompiler, TranslateFakeLoader, TranslateLoader, TranslateModuleConfig, TranslateParser,
    TranslateStore, TranslationChangeEvent, USE_DEFAULT_LANG, USE_EXTEND, USE_STORE
} from "@ngx-translate/core"
export * from './decorators/translateComponent.decorator'
export * from './services/translate-http-loader'
export { NGX_TRANSLATE_EXTENSION_CONFIG } from './const/app.const'
