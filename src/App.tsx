import { actionCheckAuth } from '@store/actions/authAction';
import { actionHandler } from '@store/actions/actionHandler';
import { store } from '@store/index';
import { useDispatch } from 'react-redux';
import Loader from '@shared/Loader/Loader';
import Message from '@shared/Message/Message';
import React, { useState } from 'react';
import Routes from '@src/Routes';

const App: React.FC = () => {
    console.info('App');
    const dispatch = useDispatch();
    const checkAuth = actionCheckAuth(dispatch);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function tokenRecovery() {
        if (localStorage.getItem('token')) {
            await actionHandler(dispatch, checkAuth);
        }
        setIsLoading(false);
    }
    if (isLoading) {
        tokenRecovery();
        return <Loader />;
    }

    console.info('state', store.getState());
    return (
        <>
            <Loader />
            <Routes />
            <Message />
        </>
    );
};

export default App;
