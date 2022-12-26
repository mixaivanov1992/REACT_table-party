import { refreshToken } from '@store/actions/actionHandler';
import { setPersonalData } from '@store/reducer/personalDataReducer';
import { store } from '@store/index';
import { useDispatch } from 'react-redux';
import Loader from '@shared/Loader/Loader';
import Message from '@shared/Message/Message';
import React from 'react';
import Routes from '@src/Routes';

const App: React.FC = () => {
    console.info('App');
    const dispatch = useDispatch();

    (async () => {
        const result = await refreshToken(dispatch);
        const isAuthorized = !!result;
        if (result) {
            dispatch(setPersonalData(isAuthorized, result));
        } else {
            dispatch(setPersonalData(isAuthorized));
        }
    })();

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
