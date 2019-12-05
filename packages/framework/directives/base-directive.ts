import { MultiLingualData } from "@rxweb/core"

export abstract class BaseDirective{
    private subscriptionId: number;

    protected subscribe(func: Function) {
        this.subscriptionId = MultiLingualData.subscribe(func);
    }

    destroy() {
        MultiLingualData.unsubscribe(this.subscriptionId);
    }

}