import { DialogSize } from '@models/store/reducer/dialogReducer';
import { showMessage } from '@store/reducer/messageReducer';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Dialog from '@shared/Dialog/Dialog';
import React from 'react';

const Message: React.FC = () => {
    console.info('Message');
    const dispatch = useDispatch();

    const { isOpen, title, content } = useTypedSelector((state) => state.messageReducer);

    const onClickCloseDialog = (): void => {
        dispatch(showMessage(false, '', ''));
    };
    return (
        <Dialog
            isOpen={isOpen}
            onClickCloseDialog={onClickCloseDialog}
            title={title}
            content={<div>{content}</div>}
            dialogSize={DialogSize.auto}
            footer=""
        />
    );
};

export default Message;
