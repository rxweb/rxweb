import { OverlayDesign } from '../models/overlay-design'

export class DialogClass{
    root: any[] = [];
    rootStyle: { [key: string]: any };
    overlay: OverlayDesign;
    nestedDiv: any[] = [];
    heading: any[] = [];
    paragraph: any[] = [];
    button: DialogButtonClass;
}

export class DialogButtonClass {
    ok: any[] = [];
    cancel: any[] = [];
    save: any[] = [];
    dontSave: any[] = [];
}

