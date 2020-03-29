import { RxTranslateConfig } from "../interface/rx-translate-config";

export const MultiLingualData:
    {
        addOrUpdate(key: string, data: { [key: string]: any });
        remove(key: string);
        get(key: string);
        clearInActives(config: RxTranslateConfig);
        getActiveKeys();
        contains(key: string);
    } = new (class {

        private data: { [key: string]: any } = {};
        private keys: { [key: string]: boolean } = {};

        addOrUpdate(key: string, data: { [key: string]: any }) {
            this.data[key] = data;
            this.keys[key] = true;
        }

        contains(key: string) {
            return this.data[key] !== undefined;
        }

        get(key: string): string {
            return this.data[key] ? this.data[key] : {};
        }

        clearInActives(config: RxTranslateConfig) {
            if (!config.isCache)
                Object.keys(this.keys).forEach(t => {
                    if (!this.keys[t] && this.data[t]) {
                        delete this.data[t];
                    }
                })
        }

        getActiveKeys(): string[] {
            return Object.keys(this.keys);
        }

        remove(key: string) {
            this.keys[key] = false;
        }
    });