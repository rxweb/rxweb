export class EventSubscriber{

    private listners: { [key: string]: Function[] } = {};

    subscribe(key: string, func: Function) {
        if (!this.listners[key])
            this.listners[key] = [];
        this.listners[key].push(func);
    }

    dispatch(key: string, data: any) {
        if (this.listners[key])
            this.listners[key].forEach(t => { t.call(data, data); })
    }
}