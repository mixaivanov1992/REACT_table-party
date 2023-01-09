import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { DefaultRuleKey } from '@models/store/reducer/ruleReducer';
import { PageAlias } from '@models/accessiblePage';
import ChapterContent from '@shared/RuleEdit/Content/ChapterContent';
import Default from '@shared/RuleEdit/Menu/Default';
import GameElement from '@shared/RuleEdit/Menu/GameElement';
import Header from '@components/Content/Header/Header';
import Localization from '@localization/components/shared/ruleEdit';
import React, { useState } from 'react';
import RuleSettings from '@shared/RuleEdit/Settings/RuleSettings';
import Save from '@shared/RuleEdit/Menu/Save';
import styles from '@css/shared/ruleEdit/RuleEdit.module.scss';

interface Props{
    ruleUid: string,
    pageAlias: PageAlias
}

const RuleEdit: React.FC<Props> = (props) => {
    console.info('RuleEdit');
    Localization.setLanguage(navigator.language);
    const { ruleUid, pageAlias } = props;
    const [isFullScreen, setIsFullscreen] = useState<boolean>(false);
    return (
        <main className={`${styles.ruleEdit} ${isFullScreen ? styles.fullscreen : ''}`}>
            <div className={styles.top_menu}>
                <button title={Localization.fullscreen} type="button" onClick={() => setIsFullscreen(!isFullScreen)}>
                    {isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
                    &#8203;
                </button>
                {DefaultRuleKey !== ruleUid && <Default ruleUid={ruleUid} />}
                <GameElement ruleUid={ruleUid} />
                <Save ruleUid={ruleUid} />
            </div>
            <div className={styles.container}>
                <Header pageAlias={pageAlias} />
                <div>
                    <RuleSettings ruleUid={ruleUid} />
                    <ChapterContent ruleUid={ruleUid} />
                </div>
            </div>
        </main>
    );
};

export default RuleEdit;
