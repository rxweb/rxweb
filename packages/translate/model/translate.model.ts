export class TranslateModel {
    constructor(private data: { [key: string]: any },private componentData:any) {
        if (data)
            Object.keys(data).forEach(key => {
                Object.defineProperty(this, key, {
                    get: function () {
                        let text = data[key];
                        return text.indexOf("{{") !== -1 ? this.getText(text) : text;
                    },
                    enumerable: true,
                    configurable: true
                })
            })
    }

    private extract([start, end]) {
        const matcher = new RegExp(`${start}(.*?)${end}`, 'gm');
        const normalise = (str) => str.slice(start.length, end.length * -1);
        return function (str) {
            return str.match(matcher).map(normalise);
        }
    }

    private getText(text: string) {
        let stringExtractor = this.extract(['{{', '}}']);
        let keys = stringExtractor(text);
        keys.forEach(key => {
            text = text.replace(`{{${key}}}`, this.getValue(key));
        })
        return text;
    }

    private getValue(key) {
        let isObjectKey = key.indexOf(".") !== -1;
        if (isObjectKey) {
            let keys = key.split('.');
            let jObject = this.componentData;
            for (let column of keys) {
                if (jObject[column])
                    jObject = jObject[column]
                else {
                    jObject = "";
                    break;
                }
            }
            return jObject;
        }
        let value = this.componentData[key];
        return value == undefined ? '' : value;
    }
}
