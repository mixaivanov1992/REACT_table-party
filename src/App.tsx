import { actionCheckAuth } from '@store/actions/authAction';
import { actionHandler } from '@store/actions/actionHandler';
import { store } from '@store/index';
import { useDispatch } from 'react-redux';
import Loader from '@shared/Loader/Loader';
import Message from '@shared/Message/Message';
import React, { useEffect } from 'react';
import Routes from '@src/Routes';

const App: React.FC = () => {
    console.info('App');
    console.info('state', store.getState());
    const dispatch = useDispatch();
    const checkAuth = actionCheckAuth(dispatch);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            actionHandler(dispatch, checkAuth);
        }
    }, []);

    return (
        <>
            <Loader />
            <Routes />
            <Message />
        </>
    );
};

export default App;
