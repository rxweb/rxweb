export interface TranslateConfig {
    translationName: string;
    language?: string;
    filePath?: string;
    inlineTranslations?: { [key: string]: ()=> Promise<any> };
}