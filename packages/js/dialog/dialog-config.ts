import { MultiLingualData } from "@rxweb/core"
export class DialogConfig {

    constructor() {
        this.text = new DialogTextConfig();
    }

    showIcon: boolean = false;
    text: DialogTextConfig;
    data: any;  

}

export class DialogTextConfig {

    constructor() {
        this.ok = MultiLingualData.get("global.dialog-ok");
        this.cancel = MultiLingualData.get("global.dialog-cancel");
        this.save = MultiLingualData.get("global.dialog-save");
        this.dontSave = MultiLingualData.get("global.dialog-dontsave");
        this.heading = MultiLingualData.get("global.dialog-heading");
        this.message = MultiLingualData.get("global.dialog-message");
    }
    heading: string;
    message: string;
    ok: string;
    cancel: string;
    save: string;
    dontSave: string;
}