import { translateConfigContainer } from "../core/translate-config-container";
import { PIPE_CONFIG } from "../const/pipe-config.const";
import { getInstanceValue } from "./get-instance-value";

export function runPipe(text, componentData: any, parentData: any) {
    let pipeName: string = '';
    if (text.indexOf("|")) {
        let splitText = text.split("|");
        let leftText = getInstanceValue(splitText[0].trim(), componentData, parentData);
        let rightText = splitText[1].split(new RegExp(":(?=([^\"]*\"[^\"]*\")*[^\"]*$)")).filter(t => t !== undefined).map(t => getInstanceValue(t, componentData, parentData));
        pipeName = rightText[0].trim();
        rightText.splice(0, 1);
        if (translateConfigContainer.injector && pipeName && PIPE_CONFIG[pipeName]) {
            let resolve = translateConfigContainer.injector.get(PIPE_CONFIG[pipeName]);
            text = resolve.transform.apply(resolve, [leftText, ...rightText]);
        }
    }
    return text;
}