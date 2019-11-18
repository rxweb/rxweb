import { ElementBinder } from "../interface/element-binder";
import { SpinnerDirective } from "../directives/spinner/spinner.directive";
import { PlaceholderDirective } from "../directives/placeholder/placeholder.directive";
import { TextDirective } from "../directives/text/text.directive";

export const DIRECTIVE_MODEL_REFERENCE: { [key: string]: any } = {
    'rxSpinner': SpinnerDirective,
    'rxPlaceholder': PlaceholderDirective,
    "rxText": TextDirective
}