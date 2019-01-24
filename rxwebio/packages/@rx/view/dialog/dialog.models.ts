export class DialogDataModel {
    title: string;
    message: string;
    showPrimaryOk: boolean;
    showSecondaryOk: boolean;
    showCancel: boolean;
    primaryOkText: string;
    secondaryOkText: string;
    cancelText: string;
}

export class DialogStyle {
    main: string;
    header: string;
    body: string;
    footer: string;
    okClick: string;
    cancelClick: string;
    secondaryClick: string;
}

export enum DialogClick {
    PrimaryOk,
    SecondaryOk,
    Cancel
}

