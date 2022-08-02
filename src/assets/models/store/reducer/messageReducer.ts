export interface MessageState {
    isOpen: boolean,
    title: string,
    content: string
}
export enum MessageActionType {
    SHOW_MESSAGE = 'SHOW_MESSAGE',
}

export interface ShowMessage {
    type: MessageActionType.SHOW_MESSAGE,
    isOpen: boolean,
    title: string,
    content: string
}

export type MessageAction = ShowMessage;
