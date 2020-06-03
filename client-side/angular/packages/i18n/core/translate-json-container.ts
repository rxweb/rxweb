
export const translateJsonContainer:
    {
        languageFolderNames: string[];
        scopedTranslation: { [key: string]: any };
        modifiedScopedTranslations: { [key: string]: any };
        scopedTranslationSyntaxs: { [key: string]: string[]};
    } = new (class {
        languageFolderNames: string[] = [];
        scopedTranslation: { [key: string]: any } = {}
        modifiedScopedTranslations: { [key: string]: any } = {}
        scopedTranslationSyntaxs: { [key: string]: string[] } = {};

    })();
