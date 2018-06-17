import { RxStorage } from "@rx/storage";
import { Injectable, Inject, ReflectiveInjector } from "@angular/core"

const DOT_CHARACTER = ".";
export class ApplicationConfiguration {
    private static storage: RxStorage;
    private static injector: any;
    public static Init() {
        if (!this.storage) {
            this.injector = ReflectiveInjector.resolveAndCreate([RxStorage]);
            this.storage = this.injector.get(RxStorage);
        }
    }

    public static set(jObject: any): void {
        if (!this.configuration)
            this.configuration = {};
        for (var col in jObject) {
            this.configuration[col] = jObject[col];
        }
        this.configuration.cachedKeys = {};
    }

    public static setLanguages(languages: any): void {
        this.configuration.languages = languages;
    }

    public static setDefaultLanguage(languageName: string): void {
        this.Init();
        this.storage.local.save("defaultLanguage", languageName);
        this.set({});
        if (languageName)
            this.configuration.defaultLanguage = languageName;
    }

    public static getDefaultLanguage(): string {
        this.Init();
      
        return this.storage.local.get("defaultLanguage") || "en";
    }

    public static get(key: string): any {
        if (!this.configuration) return;
        var currentObject = this.configuration;
        let props = key.split(DOT_CHARACTER);
        for (let prop of props) {
            currentObject = currentObject[prop]
            if (currentObject === undefined)
                break;
        }
        return currentObject;
    }

    public static setCachedKeys(keys: any) {
        if (!this.configuration)
            this.configuration = {};
        if (!this.configuration.cachedKeys)
            this.configuration.cachedKeys = {};
        for (var column in keys) {
            this.configuration.cachedKeys[window.atob(column)] = keys[column];
        }
        this.cachedKeys = this.configuration.cachedKeys;
    }

    public static getCacheKey(keyName: string): string {
        var keyValue = "";
        if (this.configuration && this.configuration.cachedKeys && this.configuration.cachedKeys[keyName]) {
            keyValue = this.configuration.cachedKeys[keyName];
        }
        return keyValue
       
    }

    public static isDataExits() {
        return this.configuration != undefined;
    }

    private static configuration: any;
    private static cachedKeys: any
}
