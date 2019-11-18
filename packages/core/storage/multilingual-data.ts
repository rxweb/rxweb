export const MultiLingualData:
    {
        addOrUpdate(key: string, data: { [key: string]: any }): any,
        get(path: string): string,
    } = new (class {

        private data: { [key: string]: any } = {};

        current: { [key: string]: any } = {};

        addOrUpdate(key: string, data: { [key: string]: any }) {
            this.current = this.data[key] = data;
        }

        isExits(key: string) {
            return this.data[key] !== undefined;
        }


         get(path: string): string {
            if (!this.data) return;
            var currentObject: any = this.data;
            let props = path.split(".");
            for (let prop of props) {
                currentObject = currentObject[prop]
                if (currentObject === undefined)
                    break;
            }
            return currentObject === undefined ? '' : currentObject;
        }
    });