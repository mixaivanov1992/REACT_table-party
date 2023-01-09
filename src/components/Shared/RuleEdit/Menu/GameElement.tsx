import { DialogSize } from '@models/store/reducer/dialogReducer';
import { GiSecretBook } from 'react-icons/gi';
import { openDialog } from '@store/reducer/dialogReducer';
import { useDispatch } from 'react-redux';
import Localization from '@localization/components/shared/ruleEdit/menu/gameElement';
import React from 'react';

interface Props{
    ruleUid: string
}

const GameElement: React.FC<Props> = (props) => {
    Localization.setLanguage(navigator.language);
    const dispatch = useDispatch();
    const { ruleUid } = props;

    const onClickGameElements = () => {
        dispatch(openDialog(Localization.gameElements, 'In development', DialogSize.S90));
    };

    return (
        <button title={Localization.gameElements} type="button" onClick={onClickGameElements}>
            <GiSecretBook />
            &#8203;
        </button>
    );
};

export default GameElement;
