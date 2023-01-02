export interface DialogState {
    isOpen: boolean,
    title: string,
    content: JSX.Element | string,
    dialogSize: DialogSize,
    footer: JSX.Element | string,
}
export enum DialogActionType {
    OPEN_DIALOG = 'OPEN_DIALOG',
    CLOSE_DIALOG = 'CLOSE_DIALOG',
}

export enum DialogSize {
    S90 = 'dialog_90',
    S50 = 'dialog_50',
    auto = 'dialog_auto',
}

export interface OpenDialog {
    type: DialogActionType.OPEN_DIALOG,
    title: string,
    content: JSX.Element | string,
    dialogSize: DialogSize,
    footer?: JSX.Element
}

export interface CloseDialog {
    type: DialogActionType.CLOSE_DIALOG
}

export type DialogAction = OpenDialog | CloseDialog;
