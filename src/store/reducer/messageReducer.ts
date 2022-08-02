import {
    MessageAction, MessageActionType, MessageState, ShowMessage,
} from '@models/store/reducer/messageReducer';

const initialState: MessageState = {
    isOpen: false,
    title: '',
    content: '',
};

export const messageReducer = (state = initialState, action: MessageAction): MessageState => {
    switch (action.type) {
    case MessageActionType.SHOW_MESSAGE:
        return { isOpen: action.isOpen, title: action.title, content: action.content };
    default:
        return state;
    }
};

export const showMessage = (isOpen:boolean, title: string, content: string): ShowMessage => ({
    type: MessageActionType.SHOW_MESSAGE,
    isOpen,
    title,
    content,
});
