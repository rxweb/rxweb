import { Item } from "@rxweb/dom"
import {
    TranslationCore
} from "@rxweb/translate"
export function translatedText(columns: Item[],keyColumn:string,valueColumn:string) {
    columns.forEach(t => {
        if (t.value[keyColumn])
            t.value[valueColumn] = TranslationCore.getText(t.value[keyColumn]);
    })
}