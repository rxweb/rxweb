import { MultiLingualData } from "../storage/multilingual-data";

export class RxWebConfig {

    static addOrUpdateMultilingualData(key: string, data: { [key: string]: any }) {
        MultiLingualData.addOrUpdate(key, data);
    }

    static isExitsMultilingualKey(key: string) {
        return MultiLingualData.isExits(key);
    }
}
