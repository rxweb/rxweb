import { OverlayDesign } from "../models/overlay-design";

export class ModalClassConfig {
    constructor() {
        this.overlay = new OverlayDesign();
    }
    class: any[] = [];
    style: { [key: string]: any };
    overlay: OverlayDesign;
    showIn: any[] = [];
    showOut: any[] = [];
    backDropClass: any[] = [];
}