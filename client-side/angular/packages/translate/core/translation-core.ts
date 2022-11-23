import { getKeyName } from "../functions/get-key-name";
import { MultiLingualData } from "./multilingual-data";
import { Observable, Subject } from 'rxjs';

export const TranslationCore:
    {
        languageChangedSubject: Subject<boolean>;
        languageChanged: Observable<boolean>;
        getText(path: string);
    } = new (class {
        languageChangedSubject: Subject<boolean> = new Subject<boolean>();
        languageChanged: Observable<boolean> = this.languageChangedSubject.asObservable();

        getText(path: string) {
            let splitText = path.split('.');
            let keyName = getKeyName(splitText[0]);
            let data = MultiLingualData.get(keyName);
            let text = '';
            if (data) {
                splitText.splice(0, 1);
                for (var col of splitText)
                    text = text ? text[col] : data[col];
            }
            return text;
        }
    });