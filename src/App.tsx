import { refreshToken } from '@store/actions/actionHandler';
import { setPersonalData } from '@store/reducer/personalDataReducer';
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
        const result = await refreshToken(dispatch);
        if (result) {
            dispatch(setPersonalData(true, result));
        } else {
            dispatch(setPersonalData(false));
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
