import { closeDialog } from '@store/reducer/dialogReducer';
import { refreshToken } from '@store/actions/actionHandler';
import { setPersonalData } from '@store/reducer/personalDataReducer';
import { store } from '@store/index';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@hooks/useTypedSelector';
import Dialog from '@shared/Dialog/Dialog';
import Loader from '@shared/Loader/Loader';
import Message from '@shared/Message/Message';
import React, { useEffect, useMemo, useState } from 'react';
import Routes from '@src/Routes';

const App: React.FC = () => {
    console.info('App');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const {
        isOpen, title, content, footer, dialogSize,
    } = useTypedSelector((state) => state.dialogReducer);

    const elements = useMemo(() => (
        <>
            <Loader />
            <Message />
            <Routes />
        </>
    ), []);

    useEffect(() => {
        (async () => {
            const result = await refreshToken(dispatch);
            const isAuthorized = !!result;
            if (result) {
                dispatch(setPersonalData(isAuthorized, result));
            } else {
                dispatch(setPersonalData(isAuthorized));
            }
            setIsLoading(true);
            console.info('state', store.getState());
        })();
    }, []);

    if (!isLoading) {
        return <Loader />;
    }

    return (
        <>
            {elements}
            <Dialog
                onClickCloseDialog={() => { dispatch(closeDialog()); }}
                isOpen={isOpen}
                title={title}
                content={content}
                footer={footer}
                dialogSize={dialogSize}
            />
        </>
    );
};

export default App;
