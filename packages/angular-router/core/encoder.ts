export const encoder:
    {
        encode(value:string),
        decode(value:string),
    } = new (class {

        decode(value: string) {
            value = value.replace("00", "=").replace("00", "=")
            var text = atob(value);
            return text;
        }

        encode(value:string) {
            let text = btoa(value).replace("=", "00").replace("=", "00");
            return text;
        }

    })();
