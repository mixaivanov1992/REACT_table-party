import { useTypedSelector } from '@hooks/useTypedSelector';
import Localization from '@localization/components/content/newRule/chapter';
import Paginate from '@shared/Paginate/Paginate';
import React from 'react';
import Settings from '@components/Content/NewRule/Chapters/Settings/Settings';
import Sheets from '@components/Content/NewRule/Chapters/Sheets/Sheets';
import styles from '@css/content/newRule/chapters/Chapters.module.scss';

interface Props{
    ruleUid: string,
}

const Chapter: React.FC<Props> = (props) => {
    console.info('Chapter');
    Localization.setLanguage(navigator.language);

    const { ruleUid } = props;
    const chapterCount = useTypedSelector((state) => state.chapterReducer[ruleUid]?.length || 0);
    const itemsPerPage = 5;

    const renderContent = (index: number): JSX.Element => (
        <div className={styles.container}>
            <Settings ruleUid={ruleUid} chapterIndex={index} />
            <Sheets ruleUid={ruleUid} chapterIndex={index} />
        </div>
    );

    return (
        <div className={styles.chapter}>
            {chapterCount
                ? (
                    <>
                        <Paginate renderContent={renderContent} itemCount={chapterCount} itemsPerPage={itemsPerPage} />
                        <div className={styles.chapter_navigation}>{Localization.chapterNavigation}</div>
                    </>
                )
                : <div className={styles.noData}>{Localization.noData}</div>}
        </div>
    );
};

export default Chapter;
