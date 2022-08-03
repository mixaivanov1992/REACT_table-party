import { AiFillSave, AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { PageRoute } from '@models/accessiblePage';
import { actionHandler } from '@store/actions/actionHandler';
import { saveRuleAction } from '@store/actions/ruleAction';
import { showMessage } from '@store/reducer/messageReducer';
import { useDeleteAllChapters } from '@hooks/useDeleteAllChapters';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { usePrepareRuleDataForSave } from '@hooks/usePrepareRuleDataForSave';
import Localization from '@localization/components/shared/ruleEdit/menu';
import React from 'react';
import styles from '@css/shared/ruleEdit/menu/Menu.module.scss';

interface Props{
    ruleUid: string,
    gameName: string,
    username: string,
    cover: string
}

const Menu: React.FC<Props> = (props) => {
    console.info('Menu');
    const dispatch = useDispatch();
    Localization.setLanguage(navigator.language);
    const {
        ruleUid, gameName, username, cover,
    } = props;

    const prepareRuleDataForSave = usePrepareRuleDataForSave(ruleUid, username, gameName, cover);
    const deleteAllChapters = useDeleteAllChapters(ruleUid);
    const history = useHistory();

    async function onClickSave(): Promise<void> {
        const result = await actionHandler(dispatch, saveRuleAction, prepareRuleDataForSave());

        if (result.isSuccess) {
            if (ruleUid === DefaultRuleKey) {
                deleteAllChapters();
            }
            const baseUrl = PageRoute.ruleEdit.split(':')[0];
            history.push(`${baseUrl}123`);
            dispatch(showMessage(true, Localization.dataSaved, result.message));
        } else {
            dispatch(showMessage(true, Localization.error, result.message));
        }
    }

    return (
        <div className={styles.menu}>
            {gameName
                ? (
                    <div>
                        <button type="button" onClick={onClickSave}>
                            <AiFillSave />
                            &#8203;
                        </button>
                    </div>
                )
                : (
                    <div>
                        <button type="button" disabled>
                            <AiFillSave />
                            &#8203;
                        </button>
                    </div>
                )}
        </div>
    );
};

export default Menu;
