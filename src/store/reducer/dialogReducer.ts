import {
    CloseDialog, DialogAction, DialogActionType, DialogSize, DialogState, OpenDialog,
} from '@models/store/reducer/dialogReducer';

const initialState: DialogState = {
    isOpen: false,
    title: '',
    content: '',
    dialogSize: DialogSize.auto,
    footer: '',
};

export const dialogReducer = (state = initialState, action: DialogAction): DialogState => {
    switch (action.type) {
    case DialogActionType.OPEN_DIALOG:
        return {
            isOpen: true, title: action.title, content: action.content, dialogSize: action.dialogSize, footer: action.footer || '',
        };
    case DialogActionType.CLOSE_DIALOG:
        return {
            isOpen: false, title: '', content: '', dialogSize: DialogSize.auto, footer: '',
        };
    default:
        return state;
    }
};

export const openDialog = (title: string, content: JSX.Element | string, dialogSize: DialogSize, footer?: JSX.Element): OpenDialog => ({
    type: DialogActionType.OPEN_DIALOG,
    title,
    content,
    dialogSize,
    footer,
});

export const closeDialog = (): CloseDialog => ({
    type: DialogActionType.CLOSE_DIALOG,
});
