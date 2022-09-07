import { actionCheckAuth } from '@store/actions/authAction';
import { showLoader } from '@store/reducer/loaderReducer';
import { store } from '@store/index';
import { useDispatch } from 'react-redux';
import Loader from '@shared/Loader/Loader';
import Message from '@shared/Message/Message';
import React, { useState } from 'react';
import Routes from '@src/Routes';

const App: React.FC = () => {
    console.info('App');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function tokenRecovery() {
        dispatch(showLoader(true));
        if (localStorage.getItem('token')) {
            await actionCheckAuth(dispatch);
        }
        setIsLoading(false);
        dispatch(showLoader(false));
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
