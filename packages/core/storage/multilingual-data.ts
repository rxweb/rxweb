export class MultiLingualData{
    private static data: { [key: string]: any } = {};

    static current: { [key: string]: any } = {};

    static addOrUpdate(key: string, data: { [key: string]: any }) {
        this.current = this.data[key] = data;
    }

    static setAsCurrent(key: string) {
        this.current = this.data[key];
    }

    static isExits(key:string) {
        return this.data[key] !== undefined;
    }
}