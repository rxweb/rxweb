import { MultiLingualData } from "@rxweb/localization"
export class DialogConfig {

    constructor(message:string) {
        this.text = new DialogTextConfig(message);
    }

    showIcon: boolean = false;
    text: DialogTextConfig;
    data: any;  

}

export class DialogTextConfig {

    constructor(message:string) {
        this.ok = MultiLingualData.get("global.dialog-ok");
        this.cancel = MultiLingualData.get("global.dialog-cancel");
        this.save = MultiLingualData.get("global.dialog-save");
        this.dontSave = MultiLingualData.get("global.dialog-dontsave");
        this.heading = MultiLingualData.get("global.dialog-heading");
        this.message = message.charAt(0) == ":" ? MultiLingualData.get(message.replace(":", "")) : message;
    }
    heading: string;
    message: string;
    ok: string;
    cancel: string;
    save: string;
    dontSave: string;
}