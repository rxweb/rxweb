import { PIPE_CONFIG } from '../const/pipe-config.const'
import { getInstanceValue } from "./get-instance-value";
import { errorMessageContainer } from "../core/error-message.containter";

export function runPipe(text, componentData: any) {
    let pipeName: string = '';
    if (text.indexOf("|") !== -1) {
        let splitText = text.split("|");
        let leftText = getInstanceValue(splitText[0].trim(), componentData);
        let rightText = splitText[1].split(new RegExp(":(?=([^\"]*\"[^\"]*\")*[^\"]*$)")).filter(t => t !== undefined).map(t => getInstanceValue(t, componentData));
        pipeName = rightText[0].trim();
        rightText.splice(0, 1);
        if (errorMessageContainer.injector && pipeName && PIPE_CONFIG[pipeName]) {
            let resolve = errorMessageContainer.injector.get(PIPE_CONFIG[pipeName]);
            text = resolve.transform.apply(resolve, [leftText, ...rightText]);
        }
    }
    return text;
}