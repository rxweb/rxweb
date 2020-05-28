export * from './module/translate.module'
export * from './services/translate.service';
export * from './pipes/translate.pipe';
export * from './services/request.state';
export * from './decorators/translateComponent.decorator'
export {
    DefaultLangChangeEvent, DEFAULT_LANGUAGE, FakeMissingTranslationHandler, LangChangeEvent,
    MissingTranslationHandler, MissingTranslationHandlerParams, TranslateCompiler, TranslateDefaultParser,
    TranslateFakeCompiler, TranslateFakeLoader, TranslateLoader, TranslateModuleConfig, TranslateParser,
    TranslateStore, TranslationChangeEvent, USE_DEFAULT_LANG, USE_EXTEND, USE_STORE
} from "@ngx-translate/core"
