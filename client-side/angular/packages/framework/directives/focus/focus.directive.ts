
export class FocusDirective {
    private focus: any;
    constructor(private element: HTMLInputElement) {
    }

    bind(value: boolean) {
        this.focus = value;
        if (this.focus && this.focus != "false")
            this.setFocus();
    }

    private setFocus(): void {
        var t = setTimeout(() => {
            if (this.element.focus)
                this.element.focus();
        }, 100);
    }

    destroy() {
    }
}