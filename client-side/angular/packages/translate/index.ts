export * from './decorators/translate.decorator';
export * from './decorators/async-translate.decorator'
export * from './service/rx-translation'
export * from './module/rx-translate-module';
export * from './interface/translate-config';
export * from './core/translation-resolver';
export * from './functions/equals';
export * from './pure-pipes/rx-translate.pipe';
export * from './module/rx-sanitize-module';
export * from './decorators/translate-sanitizer.decorator'

//change(languageCode, onComplete) {
//    var baseResolver = new BaseResolver(translateConfigContainer.config, this.httpClient);
//    baseResolver.languageChanged(languageCode, () => {
//        //componentData.__proto__.data = componentData.__proto__.data == "a" ? "b" : "a";
//        //console.log(componentData)
//        //console.log(componentData.__proto__.data)
//        debugger; if (onComplete)
//            onComplete();
//        console.log(componentData)
//        var t = setTimeout(() => componentData.markForCheck())
//    });
//}
